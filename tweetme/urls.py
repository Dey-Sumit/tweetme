
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

from django.views.generic import TemplateView
from tweetApp.views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
    path('api/', include('tweetApp.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
