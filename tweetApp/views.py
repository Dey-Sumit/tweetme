from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse,HttpResponseRedirect
import random

from .models import Tweet
from .forms import TweetForm


def home(request, *args, **kwargs):
    return render(request, 'tweets/home.html', context={}, status=200)


def tweet_create_view(request,*args,**kwargs):
    form = TweetForm()
    if request.method == 'POST':
        form = TweetForm(request.POST)
        print(form)
        if form.is_valid():
            content = form.cleaned_data.get("content")
            print(content)
            obj = form.save(commit=False)
            # other form realted logic
            obj.save()
            form = TweetForm()
            print("saved")
            return HttpResponseRedirect('/')

    return render(request,'tweets/tweet_create.html',{'form':form})


def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweet_list = [{"id": x.id, "content": x.content,"likes":random.randint(0,100)} for x in qs]
    data = {
        "isUser":False,
        "response":tweet_list,
    }
    # return render(request, 'tweets/tweet_list.html', context={'data':data})
    return JsonResponse(data)  # json.dumps


def tweet_detail_view(request, tweet_id, *args, **kwargs):
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

    return JsonResponse(data)  # json.dumps
