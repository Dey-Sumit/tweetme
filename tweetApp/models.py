from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL


class TweetLike(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    user = models.ForeignKey(User,default=1,on_delete=models.CASCADE)
    # self means same model
    # parent != None means this tweet is a retweet (retweet of the parent object(=og tweet))
    parent = models.ForeignKey("self",null=True,on_delete=models.SET_NULL)
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    likes = models.ManyToManyField(User,related_name='tweet_user',blank=True, through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)

    @property
    def is_retweet(self):
        return self.parent is not None
    # def __str__(self):
    #     return self.content
    '''
    # serializing of data:convert structured data in a formatted way(here as of dictionary)
    def serialize(self):
        return {
            "id":self.id,
            "content":self.content,
            "likes":random.randint(30,300)
        }
    '''

    class Meta():
        ordering = ['-id']
