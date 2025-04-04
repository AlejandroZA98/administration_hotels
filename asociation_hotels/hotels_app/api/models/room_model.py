from django.db import models
from hotels_app.api.models.hotel_model import Hotel
import uuid

class Room(models.Model):
    ROOM_TYPE_CHOICES = [
        ('single', 'Individual'),
        ('double', 'Doble'),
        ('suite', 'Suite'),
    ]
    
    ROOM_STATUS_CHOICES = [
        ('available', 'Disponible'),
        ('occupied', 'Ocupada'),
        ('under_maintenance', 'En mantenimiento'),
        ('cleaning', 'En limpieza'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name="rooms")
    room_type = models.CharField(max_length=10, choices=ROOM_TYPE_CHOICES)
    room_number = models.CharField(max_length=10, unique=True)
    status = models.CharField(max_length=20, choices=ROOM_STATUS_CHOICES, default='available')  # Estatus de la habitación

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Room {self.room_number} - {self.room_type} ({self.status})"
