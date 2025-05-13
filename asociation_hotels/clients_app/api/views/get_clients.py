from clients_app.api.serializers.clients_serializer import ClientsSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class GetClientsView(APIView):
    def get(self, request):
      
        clients = ClientsSerializer.Meta.model.objects.all()
        serializer = ClientsSerializer(clients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)