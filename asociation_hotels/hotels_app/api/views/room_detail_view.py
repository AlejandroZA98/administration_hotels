from hotels_app.api.models.room_model import Room
from hotels_app.api.serializer.room_serializer import RoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class RoomDetailView(APIView):
    def get(self, request, pk):
        try:
            room = Room.objects.get(id=pk)
        except Room.DoesNotExist:
            return Response({"message": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = RoomSerializer(room, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        try:
            room = Room.objects.get(id=pk)
        except Room.DoesNotExist:
            return Response({"message": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = RoomSerializer(room, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            room = Room.objects.get(id=pk)
        except Room.DoesNotExist:
            return Response({"message": "Room not found"}, status=status.HTTP_404_NOT_FOUND)
        
        room.delete()
        return Response({"message": "Room deleted"}, status=status.HTTP_204_NO_CONTENT)