from reservation.api.serializers.reservation_serializer import ReservationSerializer
from reservation.api.models.reservation_model import Reservation
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from  django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
class GetReservationsView(APIView):
    def get(self, request, pk):
        try:
            reservation = Reservation.objects.filter(hotel=pk)    
        except Reservation.DoesNotExist:
            return Response({"message": "Reservation not found"}, status=status.HTTP_404_NOT_FOUND)
        status_filter = request.query_params.get('status')
        if status_filter:
            reservation = reservation.filter(status=status_filter)
        serializer = ReservationSerializer(reservation, many=True, context={'request': request})
     
        return Response(serializer.data,status=status.HTTP_200_OK)
       