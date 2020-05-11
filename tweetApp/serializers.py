from rest_framework import serializers

from .models import Tweet
from django.conf import settings
'''
    read_only
    Set this to True to ensure that the field is used when serializing a representation, but is not used when creating or updating an instance during
    deserialization.

    Defaults to False
'''
class TweetCreateSerializer(serializers.ModelSerializer):
    MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
    # likes = serializers.IntegerField()
    likes = serializers.SerializerMethodField(read_only=True)  # MethodField aytomatically calls  get_<field_name> method(default, if not mentioned)
    #
    # def __init__(self):
    #     print("TweetSerializer created")

    class Meta:
        model = Tweet
        fields = ['id','content','likes']

    def get_likes(self,obj):
        return obj.likes.count()

    def validate_content(self,value):
        if len(value) > self.MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value

# read only serializer for retweet
class TweetSerializer(serializers.ModelSerializer):
    MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
    # likes = serializers.IntegerField()
    likes = serializers.SerializerMethodField(read_only=True)  # MethodField aytomatically calls  get_<field_name> method(default, if not mentioned)
    # content = serializers.SerializerMethodField(read_only=True)

    # **The Serializer class is itself a type of Field, and can be used to represent relationships where one object type is nested inside another.
    # ** in this case Name of the field is important
    parent = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id','content','likes','is_retweet','parent']
        # we can also serialize a property of a model eg: is_retweet :)cool

    def get_likes(self,obj):
        return obj.likes.count()

    '''
    def get_content(self,obj):
        content = obj.content
        if obj.is_retweet:  # property not callable
            content = obj.parent.content
        return content
    '''
class TweetActionSerializer(serializers.Serializer):
    TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS

    id = serializers.IntegerField()
    action = serializers.CharField()
    # content is for retweet
    content = serializers.CharField(required=False,allow_blank=True)

    def validate_action(self,value):
        value = value.lower().strip()
        if not (value in self.TWEET_ACTION_OPTIONS):
            raise serializers.ValidationError("this action is not valid")
        return value
