from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from reservation.api.serializers.reservation_serializer import ReservationSerializer
from reservation.api.models.reservation_model import Reservation
from hotels_app.api.models.room_model import Room

class CreateReservationView(APIView):
    def post(self, request):
        serializer = ReservationSerializer(data=request.data, context={'request': request})
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        room_id = request.data.get('room')
        hotel_id = request.data.get('hotel')

        if not Room.objects.filter(id=room_id, hotel_id=hotel_id).exists():
            return Response(
                {"error": "El cuarto no pertenece al hotel indicado."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
