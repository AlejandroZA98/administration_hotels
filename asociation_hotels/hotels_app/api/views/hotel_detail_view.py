from hotels_app.api.models.hotel_model import Hotel
from hotels_app.api.serializer.hotel_serializer import HotelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HotelDetailView(APIView):
    def get(self,request,pk):
    #    print("pk",pk)
        try:
           hotel=Hotel.objects.get(id=pk)
        except Hotel.DoesNotExist:
           return Response({"message":"Hotel not found"},status=status.HTTP_404_NOT_FOUND)
        serializer=HotelSerializer(hotel, context={'request': request})
        return Response(serializer.data,status=200)
    def patch(self,request,pk):
        try:
            hotel=Hotel.objects.get(id=pk)
        except Hotel.DoesNotExist:
            return Response({"message":"Hotel not found"},status=status.HTTP_404_NOT_FOUND)
        serializer=HotelSerializer(hotel,data=request.data,partial=True,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,pk):
        try:
            hotel=Hotel.objects.get(id=pk)
        except Hotel.DoesNotExist:
            return Response({"message":"Hotel not found"},status=status.HTTP_404_NOT_FOUND)
        hotel.delete()
        return Response({"message":"Hotel deleted"},status=status.HTTP_204_NO_CONTENT) 