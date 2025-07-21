from fastapi import FastAPI, Request, Depends
from app.auth import verify_token
from fastapi.middleware.cors import CORSMiddleware
from app import firebase # this ensures SDK is initialized
from app.payments.routes import router as payment_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# payment check out route
app.include_router(payment_router, prefix="/payments")

# base route
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}

# protected route
@app.get("/protected")
async def protected_route(decoded_token=Depends(verify_token)):
    return {"message": f"Hello {decoded_token['email']}, you are autorized!"}