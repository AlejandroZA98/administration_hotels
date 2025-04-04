from django.contrib.auth.models import AbstractUser
from django.db import models

import uuid

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('superadmin', 'Super Administrador'),
        ('admin_hotel', 'Administrador del Hotel'),
        ('jefe_camaristas', 'Jefe Camaristas'),
        ('jefe_mantenimiento', 'Jefe Mantenimiento')
    ]

    id=models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    username=models.CharField(max_length=150,unique=True)
    name=models.CharField(max_length=150)
    email=models.EmailField(unique=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    role=models.CharField(max_length=50,choices=ROLE_CHOICES)
    REQUIRED_FIELDS = ['email','name', 'role']
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username