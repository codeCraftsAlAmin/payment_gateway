import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
import os, json

# Load .env variables
load_dotenv()

# Only initialize once
if not firebase_admin._apps:
    cert_data = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    try:
        cred = credentials.Certificate(json.loads(cert_data))
    except Exception as e:
        raise ValueError("Invalid Firebase credentials: ", e)

    firebase_admin.initialize_app(cred)