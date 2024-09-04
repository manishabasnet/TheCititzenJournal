from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime, timedelta, timezone
import os
import jwt
import logging
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')
class CustomJWTCreate:
    def create_jwt(self, user):
        payload = {
            'user_id': str(user['_id']),
            'email': user['email'],
            'exp': datetime.now(tz=timezone.utc) + timedelta(hours=1),
            'iat': datetime.now(tz=timezone.utc),
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return token

class CustomUser:
    def __init__(self, user_id, email):
        self.user_id = user_id
        self.email = email
        self.is_authenticated = False

class CustomJWTAuthentication(BaseAuthentication):

    def authenticate(self, request):
        token = request.headers.get('Authorization')
        if not token:
            return None

        try:
            token = token.split(' ')[1]
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except (IndexError, jwt.ExpiredSignatureError, jwt.InvalidTokenError) as e:
            print(f"Authentication Error: {str(e)}")
            raise AuthenticationFailed('Invalid or expired token.')

        user = CustomUser(user_id=payload['user_id'], email=payload['email'])
        user.is_authenticated = True
        return (user, token)

    def authenticate_header(self, request):
        return 'Bearer'
    
    
