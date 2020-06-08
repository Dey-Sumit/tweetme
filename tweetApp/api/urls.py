from django.urls import path
from .views import (tweet_create_view,tweet_detail_view,tweet_list_view,
                    tweet_feed_view,twitter_delete_view,tweeet_action_view,
                    CommentList,CommentDetail)
urlpatterns = [
    path('', tweet_list_view,name='list_tweet'),
    path('<int:tweet_id>', tweet_detail_view),
    path('action', tweeet_action_view,name="tweet_action"),
    path('create/',tweet_create_view,name='create_tweet'),
    path('delete/<int:tweet_id>',twitter_delete_view,name='delete_tweet'),
    path('feed/',tweet_feed_view,name='feed_tweet'),
    path('comments/<int:tweet_id>/',CommentList.as_view(),name='comment_list'),
    path('commentDetail/<int:pk>/',CommentDetail.as_view(),name='comment_list'),
]