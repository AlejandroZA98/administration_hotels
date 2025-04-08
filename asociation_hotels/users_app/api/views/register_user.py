from users_app.models import CustomUser
from users_app.api.serializers.users_serializer import UserSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken# type: ignore


class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account=serializer.save()
            
            data['response']="Registro Exitoso"
            data['username']=account.username
            data['email']=account.email
            
            
            refresh = RefreshToken.for_user(account)
        
            data['token']= {
                   'refresh': str(refresh),
                   'access': str(refresh.access_token),
                   'id': account.id,
                   }
            return Response(data)
        
        return Response({
            'error': 'Registro fallido',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)