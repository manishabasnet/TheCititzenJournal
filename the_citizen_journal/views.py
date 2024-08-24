from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
from .serializers import UserSerializer
import urllib.parse
from dotenv import load_dotenv
import os

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