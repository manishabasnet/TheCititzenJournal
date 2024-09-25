from django.urls import path
from .views import UserSignupView, UserLoginView, ArtifactCollectionView, AddArtifact, UpdateLikes

urlpatterns = [
    path('api/signup/', UserSignupView.as_view(), name='signup'),
    path('api/login/', UserLoginView.as_view(), name='login'),
    path('api/artifacts/', ArtifactCollectionView.as_view(), name='artifacts'),
    path('api/addartifact/', AddArtifact.as_view(), name='addartifact'),
    path('api/updatelikes/', UpdateLikes.as_view(), name='updatelike'),
]
