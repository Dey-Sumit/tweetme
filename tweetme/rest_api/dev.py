from django.contrib.auth import get_user_model
from rest_framework import authentication


User = get_user_model()

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        print("custom dev auth called")
        qs = User.objects.all()
        user = qs.first()
        return (user, None)