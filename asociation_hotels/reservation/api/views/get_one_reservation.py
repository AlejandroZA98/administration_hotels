from reservation.api.serializers.reservation_serializer import ReservationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class GetOneReservationView(APIView):
    def get(self, request, pk):
        try:
            reservation = ReservationSerializer.Meta.model.objects.get(id=pk)
        except ReservationSerializer.Meta.model.DoesNotExist:
            return Response({"message": "Reservation not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ReservationSerializer(reservation, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    def patch(self, request, pk):
        try:
            reservation = ReservationSerializer.Meta.model.objects.get(id=pk)
        except ReservationSerializer.Meta.model.DoesNotExist:
            return Response({"message": "Reservation not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ReservationSerializer(reservation, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        try:
            reservation = ReservationSerializer.Meta.model.objects.get(id=pk)
        except ReservationSerializer.Meta.model.DoesNotExist:
            return Response({"message": "Reservation not found"}, status=status.HTTP_404_NOT_FOUND)
        
        reservation.delete()
        return Response({"message": "Reservation deleted"}, status=status.HTTP_204_NO_CONTENT)