from django.db import models
from django.db.models.signals import post_save

from django.conf import settings

User = settings.AUTH_USER_MODEL


class FollowerRelation(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    profile = models.ForeignKey("Profile",on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    location = models.CharField(max_length=220, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    followers = models.ManyToManyField(User,related_name='following',blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    
    """
    profile_obj = Profiles.objects.first()
    profile_obj.followers.all() -> all users follows me
    profile.obj.following.all() -> all user I follow
    """
    def __str__(self):
        return self.user.username

def user_did_save(sender,instance,created,*args, **kwargs):
    # instance :sender model's current instance
    Profile.objects.get_or_create(user=instance)
    # if created:
    #     print("created")
    #     Profile.objects.get_or_create(user=instance)

# connect needs a reciever(embeded in a function) and a sender,
# post_save.connect() exexute the receiver function when the Sender model is saved   
post_save.connect(user_did_save,sender=User)
    
