from django.urls import path
from .views import UserListView, UserSignupView
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)

urlpatterns = [
    path('api/users/', UserListView.as_view(), name='user_list'),
    path('api/signup/', UserSignupView.as_view(), name='signup'),
]
