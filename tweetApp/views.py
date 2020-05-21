from django.shortcuts import render
from django.http import JsonResponse,HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist

from .models import Tweet
from .forms import TweetForm
from django.conf import settings
from .serializers import TweetSerializer,TweetCreateSerializer, TweetActionSerializer

def home(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, 'pages/home.html', context={"username": username}, status=200)


def local_tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")

def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweetId": tweet_id})

def local_tweets_profile_view(request, username, *args, **kwargs):
    return render(request, "tweets/profile.html", context={"profile_username": username})

def tweet_create_view_pure_django(request,*args,**kwargs):
    form = TweetForm()

    if request.method == 'POST':

        if not request.user.is_authenticated:
            if request.is_ajax():
                return JsonResponse({},status=401) # 401: lacks valid auth credential
            return HttpResponseRedirect(settings.LOGIN_URL)

        form = TweetForm(request.POST)
        next_url = request.POST.get("next") # access field value

        if form.is_valid():
            obj = form.save(commit=False)
            # perform other form realted logic :)
            obj.save()
            form = TweetForm() # new form instance
    
            if request.is_ajax():
                return JsonResponse(obj.serialize(),status=201) # 201: object created
            if next_url:
                return HttpResponseRedirect(next_url)
            # successfully processed :))

        else:  # if form.errors()
            if request.is_ajax():
                return JsonResponse(form.errors,status=400) #400: bad request,server was unable to process the data

    return render(request,'pages/tweet_create.html',{'form':form})


def tweet_list_view_pure_django(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [x.serialize() for x in qs]
    data = {
        "isUser":False,
        "response":tweet_list,
    }
    # return render(request, 'pages/tweet_list.html', context={'data':data})
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
