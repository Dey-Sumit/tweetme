from django.urls import path

from Account.views import login_view,logout_view,register_view

urlpatterns = [
    path('login',login_view),
    path('logout',logout_view),
    path('signup',register_view),
]

