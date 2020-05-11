"""tweetme URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from tweetApp.views import home
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('api/',include('tweetApp.urls'))
    # path('create_tweet/',tweet_create_view,name='create_tweet'),
    # path('list/', tweet_list_view,name='list_tweet'),
    # path('api/detail/<int:tweet_id>', tweet_detail_view),
    # path('api/delete/<int:tweet_id>',twitter_delete_view,name='delete_tweet'),
    # path('api/tweet/action', tweeet_action_view,name="tweet_action"),
]
