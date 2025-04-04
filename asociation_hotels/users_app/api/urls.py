from django.urls import path 
from users_app.api.views.register_user  import RegisterUser
from users_app.api.views.logout_user import LogoutUser
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView # type: ignore

urlpatterns =[
    path('register/',RegisterUser.as_view(),name='register'),
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),#login
    path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('logout/', LogoutUser.as_view(), name='logout')]