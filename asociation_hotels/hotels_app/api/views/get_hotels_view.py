from rest_framework import generics
from hotels_app.api.models.hotel_model import Hotel
from hotels_app.api.serializer.hotel_serializer import HotelSerializer

class HotelListView(generics.ListAPIView):
    queryset = Hotel.objects.all()  # Obtenemos todos los hoteles
    serializer_class = HotelSerializer  # Usamos el serializer de Hotel
