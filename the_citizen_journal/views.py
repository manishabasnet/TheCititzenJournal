from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from pymongo import MongoClient
from .serializers import UserSerializer, ArtifactSerializer
import urllib.parse
from dotenv import load_dotenv
import jwt
from django.conf import settings
import os
import json
import bcrypt
from rest_framework.permissions import AllowAny
from .authentication import CustomJWTAuthentication, CustomJWTCreate
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage

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

class UserSignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')

            if not name or not email or not password:
                return JsonResponse({'error': 'Missing fields'}, status=400)
            
            if user_collection.find_one({'email': email}):
                return JsonResponse({'error': 'User already exists'}, status=400)

            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

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
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = user_collection.find_one({'email': email})
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            access_token = CustomJWTCreate.create_jwt(self, user)
            return Response({
                'access': access_token,
            })
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ArtifactCollectionView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        artifacts = list(artifact_collection.find())
        serializer = ArtifactSerializer(artifacts, many=True)
        return Response(serializer.data)
    
class AddArtifact(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        try:
            title = request.data.get('title')
            description = request.data.get('description')
            files = request.FILES.getlist('images')

            file_urls = []
            for file in files:
                # Save file to default storage
                file_name = default_storage.save(file.name, file)
                file_url = default_storage.url(file_name)
                file_urls.append(file_url)

            artifact = {
                'title': title,
                'description': description,
                'images': file_urls
            }
            artifact_collection.insert_one(artifact)
            return JsonResponse({'message': 'Artifact added successfully!'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)    