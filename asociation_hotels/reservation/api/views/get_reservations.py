from reservation.api.serializers.reservation_serializer import ReservationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class GetReservationsView(APIView):
    def get(self, request):
      
        clients = ReservationSerializer.Meta.model.objects.all()
        serializer = ReservationSerializer(clients, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    