from hotels_app.api.serializer.hotel_serializer import HotelSerializer
from hotels_app.api.models.hotel_model import Hotel
from rest_framework.views import APIView
from rest_framework.response import Response


class CreateHotelView(APIView):
    def post (self, request):
        data=request.data
        hotel_name=data['name']
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid() and hotel_name is not Hotel.objects.all():
            serializer.save()
            return Response(serializer.data, status=201)
            
        return Response(serializer.errors, status=400)
      