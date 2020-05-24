
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,re_path, include

from django.views.generic import TemplateView
from tweetApp.views import (home,
                        local_tweets_detail_view,
                        local_tweets_list_view,
                        local_tweets_profile_view)

from Account.views import login_view,logout_view,register_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',local_tweets_list_view),
    path('<int:tweet_id>',local_tweets_detail_view),
    re_path(r'profiles?/',include('Profile.urls')),
    re_path(r'profiles?/api/',include('Profile.api.urls')),
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
    path('api/', include('tweetApp.api.urls')),
    path('account/', include('Account.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
