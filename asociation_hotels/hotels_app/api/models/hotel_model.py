from django.db import models
from users_app.models import CustomUser
from django.db.models import Count  # Importación de Count

import uuid

class Hotel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    address = models.TextField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)

    administrador = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        limit_choices_to={'role': 'admin_hotel'},  
        related_name='hoteles_administrados'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def count_rooms(self):
        return self.room_set.count()  # Método para contar habitaciones

    def get_room_details(self):
        room_details = self.rooms.values('room_type').annotate(room_count=Count('id'))
        details = {
            "suites": 0,
            "single_rooms": 0,
            "double_rooms": 0,
        }

        for detail in room_details:
            if detail['room_type'] == 'suite':
                details['suites'] = detail['room_count']
            elif detail['room_type'] == 'single':
                details['single_rooms'] = detail['room_count']
            elif detail['room_type'] == 'double':
                details['double_rooms'] = detail['room_count']
            details['total_rooms'] = details['suites'] + details['single_rooms'] + details['double_rooms']

        return details