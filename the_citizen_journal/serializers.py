from rest_framework import serializers
from bson import ObjectId

class UserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    # Add other fields based on your MongoDB documents

class ArtifactSerializer(serializers.Serializer):
    _id = serializers.SerializerMethodField()
    title = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=200)
    owner = serializers.CharField()
    upvotes = serializers.IntegerField()

    def get__id(self, obj):
        # obj is a dict, so use _id as key
        return str(obj.get('_id'))