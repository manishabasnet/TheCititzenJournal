from rest_framework import serializers
from bson import ObjectId

class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

class CommentSerializer(serializers.Serializer):
    user = ObjectIdField(required=False)
    text = serializers.CharField()
    timestamp = serializers.DateTimeField()

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
    likes = serializers.ListField(child=ObjectIdField(), required=False, default=list)
    comments = serializers.ListField(child=CommentSerializer(), required=False, default=list)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['_id'] = str(instance.get('_id'))
        
        # Handling empty likes
        if 'likes' not in instance or instance['likes'] is None:
            representation['likes'] = []
        
        # Handling empty comments
        if 'comments' not in instance or instance['comments'] is None:
            representation['comments'] = []
        else:
            representation['comments'] = [
                {
                    'user': str(comment.get('user')) if comment.get('user') else None,
                    'text': comment.get('text'),
                    'timestamp': comment.get('timestamp')
                }
                for comment in instance['comments']
            ]
        
        return representation