from django.shortcuts import render
from django.http import JsonResponse,HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from ..models import Tweet
from ..forms import TweetForm
from django.conf import settings
from ..serializers import TweetSerializer,TweetCreateSerializer, TweetActionSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination


def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs,request)
    serializer = TweetSerializer(paginated_qs, many=True,context={"request":request})
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_feed_view(request, *args, **kwargs):
    # feed = user' tweets + whom they follow's tweets
    user = request.user
    qs = Tweet.objects.feed(user)
    return get_paginated_queryset_response(qs,request)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweeet_action_view(request,*args,**kwargs):
    '''
    id is required
    actions options are:like,unlike,retweet

    '''
    # if request data type is json ,use request.data not request.POST

    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("contnet") # for retweet

        obj = Tweet.objects.filter(id=tweet_id) # change to get later
        if not obj.exists():
            return Response({"message":"you can not trigger action on this tweet"},status=404)
        # try:
        #     obj = Tweet.objects.get(id=tweet_id)
        # except ObjectDoesNotExist:
        #     return Response({"message":"you can not trigger action on this tweet"},status=404)

        obj = obj.first()
         # add(),remove()  uses a 'set semantic' in many to many field; so no need to handle if user already liked or not     
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj,context={"request":request})
            return Response(serializer.data,status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj,context={"request":request})
            return Response(serializer.data,status=200)
        elif action == "retweet":
            # create another tweet and make the current tweet it's parent
            parent_object = obj
            new_tweet = Tweet.objects.create(user=request.user,parent=parent_object,content=content)
            serializer = TweetSerializer(new_tweet,context={"request":request})
            return Response(serializer.data,status=201)

        return Response({},status=200)


@api_view(['POST'])  # only post method accepts
@permission_classes([IsAuthenticated])
def tweet_create_view(request,*args,**kwargs):
    serializer = TweetCreateSerializer(data=request.data,context={"request":request}) #** it's request.data not request.POST 
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return JsonResponse(serializer.data,status=201) # status 200: resoures created
    return Response({},status=400)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    # print("tweets-list requested...")
    qs = Tweet.objects.all()

    # get the username from request object :)
    # username = request.user.username    
    username = request.GET.get('username') # ?username=sumax from URL

    if username!=None:
        qs=qs.filter(user__username__exact=username) # select * from Tweet where user.username=username
    ''' without pagination ->
    serializer = TweetSerializer(qs,many=True) # many=True,when multiple objects to be serialized
    return Response(serializer.data)
    '''
    return get_paginated_queryset_response(qs,request)


@api_view(['GET'])
def tweet_detail_view(request,tweet_id, *args, **kwargs):
    try:
        qs = Tweet.objects.get(id=tweet_id)
        serializer = TweetSerializer(qs,context={"request":request})
        return Response(serializer.data,status=200)  # json.dumps status 200:OK,request succeeded
    except ObjectDoesNotExist:
        return Response({'error':'object does not exist'},status=404)

    # qs = Tweet.objects.filter(id=tweet_id)
    # if not qs.exists():
    #     return Response({},status=404)
    # serializer = TweetSerializer(qs.first())
    # return Response(serializer.data,status=200)  # json.dumps


@api_view(['DELETE','GET'])
@permission_classes([IsAuthenticated])
def twitter_delete_view(request,tweet_id,*args,**kwargs):
    # if the tweet exist AND the user owns the tweet
    qs = Tweet.objects.filter(id=tweet_id) # change to objects.get() later :)
    if not qs.exists():
        return Response({"message":"you can not delete this tweet"},status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message":"you can not delete this tweet"},status=404)
    obj = qs.first()
    obj.delete()
    return Response({"message":"Tweet Deleted"},status=200)