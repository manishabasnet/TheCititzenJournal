from django.urls import path
from .views import UserListView, UserSignupView, UserLoginView

urlpatterns = [
    path('api/users/', UserListView.as_view(), name='user_list'),
    path('api/signup/', UserSignupView.as_view(), name='signup'),
    path('api/login/', UserLoginView.as_view(), name='login'),
]
