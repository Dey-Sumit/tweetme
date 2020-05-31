from django.urls import path
from . import views
from .views import user_follow_view,profile_detail_api_view
urlpatterns = [
    #   path('edit/update/',Profile_Update_api_vie),
    path('update/', views.Profile_Update_View.as_view()),
    path('<str:username>/', profile_detail_api_view),
    path('<str:username>/follow/',user_follow_view),
 
]
