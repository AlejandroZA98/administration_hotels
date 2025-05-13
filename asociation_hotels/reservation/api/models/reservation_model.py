from django.db import models
from clients_app.api.models.clients_model import Client
from hotels_app.api.models.room_model import Room
from hotels_app.api.models.hotel_model import Hotel
import uuid

class Reservation(models.Model):
    RESERVATION_TYPE_CHOICES = [
        ('pending', 'Pendiente'),
        ('aproved', 'Aprobada'),
        ('canceled', 'Cancelada'),

    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="client_reservations")
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name="hotel_reservation")
    check_in_date = models.DateTimeField()
    check_out_date = models.DateTimeField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="room_reservation")
    status = models.CharField(max_length=20,choices=RESERVATION_TYPE_CHOICES, default='pending')  # Estatus de la reserva
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Reservation {self.id} - {self.client}"
