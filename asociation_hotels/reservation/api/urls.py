from django.urls import path,include
from reservation.api.views.post_reservation import CreateReservationView
from reservation.api.views.get_reservations import GetReservationsView
from reservation.api.views.get_one_reservation import GetOneReservationView
urlpatterns = [
    path('reservation-create/',CreateReservationView.as_view(),name='reservation_create'),  
    path('reservations/',GetReservationsView.as_view(),name='get_reservations'),
    path('reservation/<str:pk>/',GetOneReservationView.as_view(),name='get_one_reservation'),
]