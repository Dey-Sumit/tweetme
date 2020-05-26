from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Profile
from ..serializer import PublicProfileSerializer

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request,username,*args,**kwargs):
    me = request.user
    to_follow_qs = User.objects.filter(username=username)
    if me.username == username:
        my_followers = me.profile.followers.all()
        return Response({"count": my_followers.count()}, status=200)

    if not to_follow_qs.exists():
        return Response({},status=404)
    to_follow = to_follow_qs.first()
    to_follow_user_profile = to_follow.profile
    data = request.data or {}
    action = data.get("action")
    if action == "follow":
        to_follow_user_profile.followers.add(me)
    elif action == "unfollow":
        to_follow_user_profile.followers.remove(me)
    else:
        pass
    serializer = PublicProfileSerializer(instance=to_follow_user_profile,context={"request":request})
    return Response(serializer.data, status=200)


@api_view(['GET'])
def profile_detail_api_view(request,username,*args,**kwargs):
    print("got request for username->",username)
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"message":"profile does not exist"},status=404)
    profile_obj = qs.first()
    #send extra data to the serializer using contsxt
    serializer = PublicProfileSerializer(instance=profile_obj,context={"request":request})
    print("ret data-> ",serializer.data)
    return Response(serializer.data,status=200)


    




