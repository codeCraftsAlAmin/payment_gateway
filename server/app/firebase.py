import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Only initialize once
if not firebase_admin._apps:
    cred = credentials.Certificate(os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))
    firebase_admin.initialize_app(cred)