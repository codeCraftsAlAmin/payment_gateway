# initial set up

- install nextjs

- install tailwind

- install firebase

# handle register

- collect user info by handle change

- use handle submit to handle firebase

- if user successfully registered then use useRouter to go to login

# handle login

- let users log in with email + password

- check if the user's email is verified

- if vrified → proceed

- if not verified → show message

# handle forget password

- user enters their email.

- you call sendPasswordResetEmail(auth, email).

- firebase sends them an email with a secure link to reset their password.

- firebase handles the reset UI — you don’t have to build it yourself.

# handle forget password

- user enters their email.

- you call sendPasswordResetEmail(auth, email).

- firebase sends them an email with a secure link to reset their password.

- firebase handles the reset UI — you don’t have to build it yourself.

# set up check out flow overview

- frontend (/checkout page):

- calls backend: POST /create-payment-intent

- gets clientSecret from backend

- uses Stripe Elements to show payment form and complete payment

- ackend (FastAPI):

- verifies Firebase user

- calls Stripe API to create a PaymentIntent

- returns the client_secret to frontend

# set up python

- python 3.10+ (the language FastAPI runs on)

- pip (Python package manager)

- (optional, but helpful) virtualenv (for managing dependencies)

# install

- fastapi — your framework

- uvicorn — your development server (like nodemon)

# server site

- set up firebase admin sdk

- firebase-admin → verifies user tokens

- python-dotenv → manage environment variables (like secret keys)

# create a firebase admin SDK key

- go to Firebase Console

- select your project → Project Settings

- go to Service accounts

- click Generate new private key

- it will download a JSON file — rename it as

- update main.py to initialize firebase admin

- firebase id token verification

# firebase.py + Firebase SDK initialization

# auth.py + Firebase token verification logic

# now test you api

- ensure the user is authenticated

- get the Firebase ID token

- check through test-protected route

- use cors to cross platform

# stripe payment flow

# Frontend Checkout Page (UI only)

- show a list of dummy products.

- include a "Buy Now" button.

- when clicked → call a backend route to create a Stripe Checkout Session.

# Backend: Create Checkout Session

- fastAPI route that:

- receives product info from frontend.

- creates a Stripe Checkout session.

- returns the session URL to frontend.

# Redirect to Stripe Checkout Page

- use router.push(stripeSession.url) on frontend.

# Success & Cancel Pages

- after payment, Stripe will redirect users to a success or cancel URL.

# Create Checkout Page (UI Only)

- app/(protected)/checkout/page.tsx

- go to backend

# Set Up Stripe Checkout Session Route (FastAPI)

- create a /create-checkout-session route

- receive the product info (or just use fixed price for now)

- use Stripe’s Python SDK to create a session

- return the session URL to the frontend

# Set up Stripe

- developers → API keys

- publishable key → for frontend

- secret key → for backend

# Get Webhook Secret Key

- install stripe SDKs

- This step connects Stripe's test events to your local FastAPI server: stripe listen --forward-to localhost:8000/webhook

- you will get webhook secret kay

# create checkout session : app -> payments -> routes

# use web hook

- The user might close the browser before reaching /success.
  So, we can’t trust the frontend to finalize anything.

- Instead, Stripe sends a secure request to your backend after payment completes. You’ll:

- Receive event → e.g. checkout.session.completed

- Validate it

- Save the purchase in MongoDB

✅ 1. Enable webhook route in FastAPI
✅ 2. Get STRIPE_WEBHOOK_SECRET
✅ 3. Validate and listen to checkout.session.completed
✅ 4. Insert the payment record into MongoDB

- Since your webhook route is now in place, let’s move on to testing it properly with Stripe CLI


# connect with mongo

- pip install motor

# integrate the frontend flow so users can:

Start a payment (create checkout session)

Redirect to Stripe checkout

Handle success/cancel redirect pages