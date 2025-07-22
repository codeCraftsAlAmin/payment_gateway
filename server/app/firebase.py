import firebase_admin
from firebase_admin import credentials, auth
from dotenv import load_dotenv
import os, json

# Load .env variables
load_dotenv()

# Only initialize once
if not firebase_admin._apps:
    cert_data = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    
    if not cert_data:
        raise ValueError("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set")
    
    try:
        cred = credentials.Certificate(json.loads(cert_data))
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully")
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in Firebase credentials: {e}")
    except Exception as e:
        raise ValueError(f"Firebase initialization failed: {e}")