from django.urls import path,include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import ObtainAuthToken

from . import views

router = DefaultRouter()
router.register('users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    #path('token',ObtainAuthToken.as_view())
    path('token',views.CustomObtainAuthToken.as_view())
   
]
#"4f2400632b2c7ede6531bf7ee6d501d694cdfaa2",