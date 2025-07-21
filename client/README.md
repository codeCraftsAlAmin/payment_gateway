# initial set up

- install nextjs

- install tailwind

- install firebase and other packages..

# # client side starts here..

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

- user enters their email

- you call sendPasswordResetEmail(auth, email)

- firebase sends them an email with a secure link to reset their password

- firebase handles the reset UI — you don’t have to build it yourself

# # server side starts here..

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

# frontend checkout page (UI only)

- show a list of dummy products

- include a "Buy Now" button

- when clicked → call a backend route to create a Stripe Checkout Session

# backend: create checkout session

- fastAPI route that:

- receives product info from frontend.

- creates a Stripe Checkout session.

- returns the session URL to frontend.

- redirect to stripe checkout page

# success/cancel pages

- after payment, Stripe will redirect users to a success or cancel URL.

# set up stripe checkout session route (FastAPI)

- create a /create-checkout-session route

- receive the product info (or just use fixed price for now)

- use Stripe’s Python SDK to create a session

- return the session URL to the frontend

# collect stripe keys

- Stripe: developers → API keys

- publishable key → for frontend

- secret key → for backend

# to collect webhook key

- install stripe SDKs

- this step connects Stripe's test events to your local FastAPI server

- go to your terminal:

- stripe

- stripe login

- stripe listen --forward-to localhost:8000/payments/webhook

- you will get webhook secret kay

# create checkout session : app -> payments -> routes

# connect with mongo

- pip install motor

# use webhook

- the user might close the browser before reaching/success. so, we can’t trust the frontend to finalize anything.

- instead, Stripe sends a secure request to your backend after payment completes you’ll:

- receive event → e.g. checkout.session.completed

- validate it

- save the purchase in MongoDB

- since your webhook route is now in place, let’s move on to testing it properly with Stripe CLI

# # test your project
