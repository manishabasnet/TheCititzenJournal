from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from pymongo import MongoClient
from .serializers import UserSerializer, ArtifactSerializer
import urllib.parse
from dotenv import load_dotenv
import jwt
from datetime import datetime, timedelta, timezone
from django.conf import settings
import os
import json
import bcrypt
from rest_framework.permissions import IsAuthenticated

load_dotenv()

username = os.getenv('username')
password = os.getenv('password')
SECRET_KEY = os.getenv('SECRET_KEY')

# URL encode the username and password
encoded_username = urllib.parse.quote_plus(username)
encoded_password = urllib.parse.quote_plus(password)

connection_string = f"mongodb+srv://{encoded_username}:{encoded_password}@cluster0.o3z8i.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(connection_string)
db = client['CitizenJournal']
user_collection = db['Users']
artifact_collection = db['Artifacts']

class UserListView(APIView):
    def get(self, request):
        # Fetch data from MongoDB
        data = list(user_collection.find())
        # Serialize the data
        serializer = UserSerializer(data, many=True)
        # Return the data as JSON response
        return Response(serializer.data)

class UserSignupView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            # Validate input data
            if not name or not email or not password:
                return JsonResponse({'error': 'Missing fields'}, status=400)
            
            # Check if user already exists
            if user_collection.find_one({'email': email}):
                return JsonResponse({'error': 'User already exists'}, status=400)

            # Hash the password before storing it
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

            # Insert the new user into the MongoDB collection
            user = {
                'name': name,
                'email': email,
                'password': hashed_password, 
            }
            user_collection.insert_one(user)

            return JsonResponse({'message': 'User signed up successfully!'}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
class UserLoginView(APIView):
    def create_jwt(self, user):
        payload = {
            'user_id': str(user['_id']),
            'email': user['email'],
            'exp': datetime.now(tz=timezone.utc) + timedelta(hours=1),
            'iat': datetime.now(tz=timezone.utc),
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        print(token)
        return token

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Fetch user from MongoDB
        user = user_collection.find_one({'email': email})
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            # Authentication successful, manually create JWT
            access_token = self.create_jwt(user)
            return Response({
                'access': access_token,
                #TODO: Implement and return a refresh token similarly if needed
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ArtifactCollectionView(APIView):
    def get(self, request):
        # Fetch data from MongoDB
        artifacts = list(artifact_collection.find())
        # Serialize the data
        serializer = ArtifactSerializer(artifacts, many=True)
        # Return the data as JSON response
        return Response(serializer.data)
    
class AddArtifacts(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body)
            title = data.get('title')
            description = data.get('description')

            artifact = {
                'title': title,
                'description': description,
            }
            artifact_collection.insert_one(artifact)
            return JsonResponse({'message': 'User signed up successfully!'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
  
    

        