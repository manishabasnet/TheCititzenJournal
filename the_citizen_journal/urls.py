from django.urls import path
from .views import UserListView

urlpatterns = [
    path('api/users/', UserListView.as_view(), name='user_list'),
    # Add other URL patterns here if needed
]
