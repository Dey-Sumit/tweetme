from django.shortcuts import render
from django.http import JsonResponse,HttpResponseRedirect

from .models import Tweet
from .forms import TweetForm
from django.conf import settings
from .serializers import TweetSerializer,TweetCreateSerializer, TweetActionSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

def home(request, *args, **kwargs):
    return render(request, 'tweets/home.html', context={}, status=200)

# TODO: check if redirectURL is safe

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
        content = data.get("contnet")
        print("from action view")
        print(data)

        obj = Tweet.objects.filter(id=tweet_id)
        if not obj.exists():
            return Response({"message":"you can not trigger action on this tweet"},status=404)

        obj = obj.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
        elif action == "unlike":
            obj.likes.remove(request.user)
        elif action == "retweet":
            # create another tweet and make the currebt tweet it's parent
            parent_object = obj
            new_tweet = Tweet.objects.create(user=request.user,parent=parent_object,content=content)
            serializer = TweetSerializer(new_tweet)
        return Response({"tweet":serializer.data},status=200)


@api_view(['POST'])  # only post method accepts
@permission_classes([IsAuthenticated])
def tweet_create_view(request,*args,**kwargs):
    print("request received")
    serializer = TweetCreateSerializer(data=request.POST)
    print(serializer)

    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return JsonResponse(serializer.data,status=201)

    return Response({},status=400)


@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    print("list tweets")
    qs = Tweet.objects.all()
    serializer = TweetSerializer(qs,many=True)

    # return render(request, 'tweets/tweet_list.html', context={'data':data})
    return Response(serializer.data)  # json.dumps


@api_view(['GET'])
def tweet_detail_view(request,tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({},status=404)
    serializer = TweetSerializer(qs.first())
    return Response(serializer.data,status=200)  # json.dumps


@api_view(['DELETE','GET'])
@permission_classes([IsAuthenticated])
def twitter_delete_view(request,tweet_id,*args,**kwargs):

    # if the tweet exist AND the user owns the tweet
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({"message":"you can not delete this tweet"},status=404)
    print("got the tweet")
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message":"you can not delete this tweet"},status=404)
    print("go ahead owner")
    obj = qs.first()
    obj.delete()
    print("deleted")
    # serializer = TweetSerializer(obj)
    return Response({"message":"Tweet Removed"},status=200)


def tweet_create_view_pure_django(request,*args,**kwargs):
    form = TweetForm()

    if request.method == 'POST':

        if not request.user.is_authenticated:
            if request.is_ajax():
                print("yosss")
                return JsonResponse({},status=401)
            return HttpResponseRedirect(settings.LOGIN_URL)

        form = TweetForm(request.POST)
        next_url = request.POST.get("next")
        # print("post received")
        print(form)
        if form.is_valid():
            # content = form.cleaned_data.get("content")
            # print(content)
            obj = form.save(commit=False)
            # other form realted logic
            obj.save()
            form = TweetForm()
            print("saved")
            print("ajax :",request.is_ajax())
            if request.is_ajax():
                return JsonResponse(obj.serialize(),status=201)
            if next_url:
                return HttpResponseRedirect(next_url)
        else:  # if form.errors()
            if request.is_ajax():
                return JsonResponse(form.errors,status=400)

    return render(request,'tweets/tweet_create.html',{'form':form})


def tweet_list_view_pure_django(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [x.serialize() for x in qs]
    data = {
        "isUser":False,
        "response":tweet_list,
    }
    # return render(request, 'tweets/tweet_list.html', context={'data':data})
    return JsonResponse(data)  # json.dumps


def tweet_detail_view_pure_django(request, tweet_id, *args, **kwargs):
    """
    REST API view
    consumed by jS or any other language

    """
    data = {
        'id': tweet_id,
    }
    try:
        tweet = Tweet.objects.get(id=tweet_id)
        status = 200
        data['content'] = tweet.content
        data['status'] = status

    except Exception as err:
        print("Error:{}".format(err))
        status = 404
        data['message'] = "Does not exist"
        data['status'] = status
        return render(request,'tweets/page_404.html')

    return JsonResponse(data)  # json.dumps
