from rest_framework import serializers
from bson import ObjectId


class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)
class UserSerializer(serializers.Serializer):
    _id = ObjectIdField()
    name = serializers.CharField(max_length=100)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['_id'] = str(instance.get('_id'))
        return representation

class ArtifactSerializer(serializers.Serializer):
    _id = ObjectIdField()
    title = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=200)
    owner = serializers.CharField(max_length=200)
    images = serializers.ListField(child=serializers.CharField(max_length=200), required=False)
    timestamp = serializers.DateTimeField()
    likes = serializers.ListField(child=ObjectIdField())

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['_id'] = str(instance.get('_id'))
        return representation