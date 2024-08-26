from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from pymongo import MongoClient
from .serializers import UserSerializer
import urllib.parse
from dotenv import load_dotenv
import os
import json
import bcrypt

load_dotenv()

username = os.getenv('username')
password = os.getenv('password')

# URL encode the username and password
encoded_username = urllib.parse.quote_plus(username)
encoded_password = urllib.parse.quote_plus(password)

connection_string = f"mongodb+srv://{encoded_username}:{encoded_password}@cluster0.o3z8i.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(connection_string)
db = client['CitizenJournal']
collection = db['Users']

class UserListView(APIView):
    def get(self, request):
        # Fetch data from MongoDB
        data = list(collection.find())
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
            if collection.find_one({'email': email}):
                return JsonResponse({'error': 'User already exists'}, status=400)

            # Hash the password before storing it
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

            # Insert the new user into the MongoDB collection
            user = {
                'name': name,
                'email': email,
                'password': hashed_password, 
            }
            collection.insert_one(user)

            return JsonResponse({'message': 'User signed up successfully!'}, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)