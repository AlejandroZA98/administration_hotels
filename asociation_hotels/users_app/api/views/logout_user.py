from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError# type: ignore
from rest_framework_simplejwt.tokens import RefreshToken# type: ignore


class LogoutUser(APIView):
    def post(self, request):
        print(request.data)

        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({'detail': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except TokenError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'User logged out successfully'}, status=status.HTTP_200_OK)