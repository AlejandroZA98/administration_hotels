# users_app/serializers.py

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['role'] = user.role
        token['user_id'] = str(user.id)
        token['name'] = user.name

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['role'] = self.user.role
        data['user_id'] = str(self.user.id)
        data['name'] = self.user.name

        return data
