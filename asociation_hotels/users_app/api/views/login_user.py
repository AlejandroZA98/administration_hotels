from rest_framework_simplejwt.views import TokenObtainPairView
from users_app.api.serializers.login_serializer import CustomTokenObtainPairSerializer

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
