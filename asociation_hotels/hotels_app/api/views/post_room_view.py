from hotels_app.api.models.room_model import Room  
from hotels_app.api.serializer.room_serializer import RoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class CreateRoomView(APIView):
    def post (self, request):
        data=request.data
        print(data)
        serializer= RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
        
      