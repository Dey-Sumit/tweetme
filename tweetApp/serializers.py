from rest_framework import serializers

from .models import Tweet,TweetComment
from Profile.serializer import PublicProfileSerializer

from django.conf import settings
'''
    read_only
    Set this to True to ensure that the field is used when serializing a representation, but is not used when creating or updating an instance during
    deserialization.

    Defaults to False
'''
class TweetCreateSerializer(serializers.ModelSerializer):
    MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
    user = PublicProfileSerializer(source='user.profile', read_only=True) # serializers.SerializerMethodField(read_only=True)
    # likes = serializers.IntegerField()
    likes = serializers.SerializerMethodField(read_only=True)  # MethodField aytomatically calls  get_<field_name> method(default, if not mentioned)
    #
    # def __init__(self):
    #     print("TweetSerializer created")

    class Meta:
        model = Tweet
        fields = ['user','id','content','likes']

    def get_likes(self,obj):
        return obj.likes.count()

    # validate_<field_name> same as clean_<field_name> in django forms
    # executed during serializer.valid() call
    def validate_content(self,value):
        if len(value) > self.MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value

# how it works:
# first it gets the model,then populated the fields;
# comment_by = model_object.user.profile;tweet = model_object.tweet;id = model_object.id and so on.......
class TweetCommentSerializer(serializers.ModelSerializer):
    comment_by=PublicProfileSerializer(source='user.profile', read_only=True)
    # It is redundant to specify `source='tweet'` on field 'TweetSerializer' in serializer 'TweetCommentSerializer', because it is the same as the field name. Remove the `source` keyword argument.
    #tweet = TweetSerializer(read_only=True)
    comment_content = serializers.SerializerMethodField(read_only=True)
    
    class Meta():
        model =TweetComment
        fields=['id','comment_content','comment_by','is_reply','timestamp']

    def get_comment_content(self,obj):
        return obj.content

# read only serializer for retweet
class TweetSerializer(serializers.ModelSerializer):
    MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
    user = PublicProfileSerializer(source='user.profile',read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)  # MethodField aytomatically calls  get_<field_name> method(default, if not mentioned)
    # content = serializers.SerializerMethodField(read_only=True)

    # **The Serializer class is itself a type of Field, and can be used to represent relationships where one object type is nested inside another.
    # ** in this case Name of the field is important
    parent = TweetCreateSerializer(read_only=True)
    no_of_comments = serializers.SerializerMethodField(read_only=True)
    #comments = TweetCommentSerializer(source='tweet.comments',many=True,read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['user','id','content','likes','no_of_comments','comments','is_retweet','parent','timestamp']
        # we can also serialize a property of a model eg: is_retweet :)cool

    def get_comments(self,obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        qs = TweetComment.objects.filter(tweet=obj.id)
        serializer = TweetCommentSerializer(qs,many=True,context={'request':request})
        return serializer.data

    def get_no_of_comments(self,obj):
        return obj.comments.count()
        # qs = TweetComment.objects.filter(tweet=obj.id)
        # serializer = TweetCommentSerializer(qs,many=True)
        # return serializer.data        


    # likes field in model is storing the users who likes the tweet ; so we need to return the total likes
    # instead if we store the no of likes(does not make any sense :( ) in that like field,we dont need to explicitly define this field in serializer 
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

