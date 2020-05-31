
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,re_path, include
from rest_framework.authtoken.views import obtain_auth_token 

from django.views.generic import TemplateView
from tweetApp.views import (home_view,
                        local_tweets_detail_view,
                        local_tweets_list_view)

from Account.views import login_view,logout_view,register_view

urlpatterns = [
    # path('',home_view),
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('global/',local_tweets_list_view),
    path('<int:tweet_id>',local_tweets_detail_view),
    path('api/profiles/',include('Profile.api.urls')),
    re_path(r'profiles?/',include('Profile.urls')),
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
    path('api/', include('tweetApp.api.urls')),
    path('api/auth/', include('Account.api.urls')),
    path('account/', include('Account.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
