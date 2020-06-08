from rest_framework import serializers

from .models import Profile,Post

# testing........
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
#.......
class PublicProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    no_of_tweets = serializers.SerializerMethodField(read_only=True)
    joined_at=serializers.SerializerMethodField(read_only=True)
    last_updated=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            "username",
            "first_name",
            "last_name",
            "id",
            "bio",
            "location",
            "profilePicture",
            "follower_count",
            "following_count",
            "no_of_tweets",
            "is_following",
            "joined_at",
            "last_updated"
        ]

    def get_last_updated(self,obj):
        data = getattr(obj,'updated')
        return data.strftime('%D')

        
    def get_joined_at(self,obj):
        field_name = 'timestamp'
        return getattr(obj, field_name).strftime('%D')


    def get_no_of_tweets(self,obj):
        # profile->user->tweet :)
        return obj.user.tweets.count()

    def get_is_following(self,obj):
        context = self.context
        request = context.get("request")
        is_following = False
        if request.user:
            return request.user in obj.followers.all()
        return is_following

    def get_first_name(self, obj):
        return obj.user.first_name
    
    def get_last_name(self, obj):
        return obj.user.last_name
    
    def get_username(self, obj):
        return obj.user.username
    
    def get_following_count(self, obj):
        return obj.user.following.count()
    
    def get_follower_count(self, obj):
        return obj.followers.count()
 