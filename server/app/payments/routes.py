import stripe, os
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from app.database import get_db

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
frontend_url = os.getenv("FRONTEND_URL")

# check-out session route
@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    try:
        data = await request.json()

        # create customer first
        customer = stripe.Customer.create()

        # for now, use a fixed price item
        session = stripe.checkout.Session.create(
            payment_method_types = ["card"],
            line_items = [{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "Premium Course"
                    },
                    "unit_amount": 2999, # 29.99
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=f"{frontend_url}/success",
            cancel_url=f"{frontend_url}/cancel",

            # pass the customer - this forces email collection
            customer=customer.id,
            
            # allow stripe to update customer info including email
            customer_update={"address": "auto", "name": "auto"},
            
            billing_address_collection="required",
        )

        return {"url": session.url}

    except Exception as e:
        print(f"Stripe error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


# webhook listener route
@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")# stripe sends a special header called "stripe-signature" to help you verify the payload is authentic.

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        ) # verifying webhook signature

    except ValueError as e: # handle error
        return JSONResponse(status_code=400, content={"error": str(e)})
    except stripe.error.SignatureVerificationError:
        return JSONResponse(status_code=400, content={"error": "Invalid signature"})

    # handle checkout session completion
    if event["type"] == "checkout.session.completed": # this checks if the stripe event is checkout.session.completed, which means the payment was successfully completed.
        session = event["data"]["object"] # contains the payment info
        db = get_db() # get you db

        # extract customer email
        email = session.get("customer_email") 
        
        if not email and session.get("customer"):
            try:
                # retrieve the customer to get their email
                customer = stripe.Customer.retrieve(session["customer"])
                email = customer.email
                print(f"Retrieved email from customer: {email}")
            except Exception as e:
                print(f"Error retrieving customer: {e}")
                email = "unknown"
        
        if not email:
            email = "unknown"

        # save payment info to mongoDB
        await db["payment"].insert_one({
            "email": email,  # use the retrieved email
            "customer_id": session.get("customer"),  # also store customer ID
            "session_id": session.get("id"),  # store session ID
            "amount_total": session.get("amount_total"),
            "currency": session.get("currency"),
            "status": session.get("payment_status"),
            "created_at": session.get("created"),
        })
    
        print(f"✅ Payment recorded in DB with email: {email}")

    return JSONResponse(status_code=200, content={"message": "Webhook received"}) # You MUST return a 200 OK response to Stripe; otherwise, it will retry sending the webhook.