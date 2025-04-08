from hotels_app.api.models.room_model import Room  
from hotels_app.api.serializer.room_serializer import RoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class RoomListView(APIView):
    def get(self, request,pk):
        rooms = Room.objects.all().filter(hotel_id=pk)
        serializer = RoomSerializer(rooms, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)