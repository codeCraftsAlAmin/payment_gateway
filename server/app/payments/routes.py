import stripe, os
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from app.database import get_db

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
frontend_url = os.getenv("FRONTEND_URL")

# -----------------check-out session route-----------------
@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    try:
        data = await request.json()

        # ✅ Simple approach that works - create customer first
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

              # ✅ Pass the customer - this forces email collection
            customer=customer.id,
            
            # ✅ Allow Stripe to update customer info including email
            customer_update={"address": "auto", "name": "auto"},
            
            billing_address_collection="required",
        )

        return {"url": session.url}

    except Exception as e:
        print(f"Stripe error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


# -----------------webhook listener route-----------------
@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature") #  Stripe sends a special header called "stripe-signature" to help you verify the payload is authentic.

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        ) # Verifying Webhook Signature

    except ValueError as e: # Handle Error
        return JSONResponse(status_code=400, content={"error": str(e)})
    except stripe.error.SignatureVerificationError:
        return JSONResponse(status_code=400, content={"error": "Invalid signature"})

    # Handle checkout session completion
    if event["type"] == "checkout.session.completed": # This checks if the Stripe event is checkout.session.completed, which means the payment was successfully completed.
        session = event["data"]["object"] # contains the payment info
        db = get_db() # get you db

        # Extract Customer Email
        email = session.get("customer_email") 
        
        if not email and session.get("customer"):
            try:
                # Retrieve the customer to get their email
                customer = stripe.Customer.retrieve(session["customer"])
                email = customer.email
                print(f"Retrieved email from customer: {email}")
            except Exception as e:
                print(f"Error retrieving customer: {e}")
                email = "unknown"
        
        if not email:
            email = "unknown"

        # Save Payment Info to MongoDB
        await db["payment"].insert_one({
            "email": email,  # ✅ Use the retrieved email
            "customer_id": session.get("customer"),  # ✅ Also store customer ID
            "session_id": session.get("id"),  # ✅ Store session ID
            "amount_total": session.get("amount_total"),
            "currency": session.get("currency"),
            "status": session.get("payment_status"),
            "created_at": session.get("created"),
        })
    
        print(f"✅ Payment recorded in DB with email: {email}")

    return JSONResponse(status_code=200, content={"message": "Webhook received"}) # You MUST return a 200 OK response to Stripe; otherwise, it will retry sending the webhook.