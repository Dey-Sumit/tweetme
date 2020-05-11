
from django.urls import path
from .views import (tweet_create_view,tweet_detail_view,tweet_list_view, twitter_delete_view,tweeet_action_view)
urlpatterns = [
    path('', tweet_list_view,name='list_tweet'),
    path('create/',tweet_create_view,name='create_tweet'),
    path('<int:tweet_id>', tweet_detail_view),
    path('delete/<int:tweet_id>',twitter_delete_view,name='delete_tweet'),
    path('action', tweeet_action_view,name="tweet_action"),
]
