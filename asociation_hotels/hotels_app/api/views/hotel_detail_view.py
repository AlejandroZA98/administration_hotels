from hotels_app.api.models.hotel_model import Hotel
from hotels_app.api.serializer.hotel_serializer import HotelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from hotels_app.api.permissions.permissions import IsHotelAdmin, IsSuperAdmin, IsClient

class HotelDetailView(APIView):
   

    def get(self, request, pk):
        try:
            hotel = Hotel.objects.get(id=pk)
        except Hotel.DoesNotExist:
            return Response({"message": "Hotel not found"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        # print(f"User: {user}, Role: {getattr(user, 'role', 'anonymous')}")
        if user.is_authenticated:
            if user.role == 'admin_hotel' and hotel.administrador != user:
                return Response({'detail': 'No tienes permiso para acceder a este hotel.'}, status=status.HTTP_403_FORBIDDEN)
            

        serializer = HotelSerializer(hotel, context={'request': request})
        return Response(serializer.data, status=200)

    def patch(self, request, pk):
        user = request.user

        if not user.is_authenticated:
            return Response({'detail': 'Autenticación requerida.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.role not in ['admin_hotel', 'superadmin']:
            return Response({'detail': 'No tienes permiso para editar este hotel.'}, status=status.HTTP_403_FORBIDDEN)

        try:
            hotel = Hotel.objects.get(id=pk)
        except Hotel.DoesNotExist:
            return Response({"message": "Hotel not found"}, status=status.HTTP_404_NOT_FOUND)

        if user.role == 'admin_hotel' and hotel.administrador != user:
            return Response({'detail': 'No tienes permiso para editar este hotel.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = HotelSerializer(hotel, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = request.user

        if not user.is_authenticated:
            return Response({'detail': 'Autenticación requerida.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.role not in ['admin_hotel', 'superadmin']:
            return Response({'detail': 'No tienes permiso para eliminar este hotel.'}, status=status.HTTP_403_FORBIDDEN)

        try:
            hotel = Hotel.objects.get(id=pk)
        except Hotel.DoesNotExist:
            return Response({"message": "Hotel not found"}, status=status.HTTP_404_NOT_FOUND)

        if user.role == 'admin_hotel' and hotel.administrador != user:
            return Response({'detail': 'No tienes permiso para eliminar este hotel.'}, status=status.HTTP_403_FORBIDDEN)

        hotel.delete()
        return Response({"message": "Hotel deleted"}, status=status.HTTP_204_NO_CONTENT)
