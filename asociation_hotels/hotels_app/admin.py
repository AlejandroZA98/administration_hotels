from django.contrib import admin
from hotels_app.api.models.hotel_model import Hotel
from hotels_app.api.models.room_model import Room
# Register your models here.
admin.site.register(Hotel)
admin.site.register(Room)
