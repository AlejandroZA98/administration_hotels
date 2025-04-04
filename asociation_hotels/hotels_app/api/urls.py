from django.urls import path,include
from hotels_app.api.views.get_hotels_view import HotelListView

urlpatterns = [
    path('hotels-list/',HotelListView.as_view(),name='hotel_list'),  # Listar todos los hoteles
]