from fastapi import Request, HTTPException
from firebase_admin import auth

async def verify_token (request: Request): 
    auth_header = request.headers.get("Authorization") # extract authorization

    if not auth_header or not auth_header.startswith("Bearer "): # if the header is missing or doesn’t start with bareer
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")
     
    id_token = auth_header.split(" ")[1] # it extracts the actual Firebase ID token 

    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")