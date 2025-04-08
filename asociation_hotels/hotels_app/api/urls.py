from django.urls import path,include
from hotels_app.api.views.get_hotels_view import HotelListView
from hotels_app.api.views.post_hotel_view import CreateHotelView
from hotels_app.api.views.hotel_detail_view import HotelDetailView
from hotels_app.api.views.get_room_view import RoomListView
from hotels_app.api.views.post_room_view import CreateRoomView
from hotels_app.api.views.room_detail_view import RoomDetailView
urlpatterns = [
    path('hotels-list/',HotelListView.as_view(),name='hotel_list'),  # Listar todos los hoteles
    path('hotels-create/',CreateHotelView.as_view(),name='hotel_create'),  # Crear un nuevo hotel
    path('hotel-detail/<str:pk>/',HotelDetailView.as_view(),name='hotel_detail'),  # Ver un nuevo hotel
    path('rooms-list/<str:pk>/',RoomListView.as_view(),name='room_list'),  # Listar todas las habitaciones
    path('rooms-create/',CreateRoomView.as_view(),name="create_room"),  # Crear una nueva habitación
    path('rooms-detail/<str:pk>/',RoomDetailView.as_view(),name='room_detail'),  # Ver una habitación

]