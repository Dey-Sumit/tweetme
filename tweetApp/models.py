from django.db import models
from django.conf import settings
from django.db.models import Q

User = settings.AUTH_USER_MODEL

class TweetLike(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetComment(models.Model):
    content = models.CharField(max_length=50)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet",on_delete=models.CASCADE)
    parent = models.ForeignKey("self",null=True,blank=True,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[0:15]+"...by "+self.user.username

    @property
    def is_reply(self):
        return self.parent is not None

class TweetQuerySet(models.QuerySet):
    def feed(self,user):
        followed_users_exists = user.following.exists() # user I follow

        followed_users_id = []
        if followed_users_exists:
            followed_users_id = user.following.values_list("user__id",flat=True) # [x.user.id for x in profiles]
        
        return self.filter(
            Q(user__id__in=followed_users_id) |
            Q(user=user)
        ).distinct().order_by("-timestamp") #self= model.objects

class TweetManager(models.Manager):
    def get_queryset(self,*args,**kwargs):
        return TweetQuerySet(self.model,using=self._db)
    
    def feed(self,user):
        return self.get_queryset().feed(user)


class Tweet(models.Model):
    user = models.ForeignKey(User,default=1,on_delete=models.CASCADE,related_name='tweets')
    # self means same model
    # parent != None means this tweet is a retweet (retweet of the parent object(=original tweet))
    parent = models.ForeignKey("self",null=True,blank=True,on_delete=models.SET_NULL)
    content = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    likes = models.ManyToManyField(User,related_name='tweet_user',blank=True, through=TweetLike)
    comments= models.ManyToManyField(User,related_name='tweet_comment',blank=True, through=TweetComment)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = TweetManager()
    
    @property
    def is_retweet(self):
        return self.parent is not None

    class Meta():
        ordering = ['-id']

    