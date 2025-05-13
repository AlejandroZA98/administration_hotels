from clients_app.api.serializers.clients_serializer import ClientsSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class RegisterClientView(APIView):
    def post(self,request):
        data=request.data
        serializer= ClientsSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({
            'error': 'Registro fallido',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)