from rest_framework import serializers
from hotels_app.api.models.room_model import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'hotel', 'room_type', 'room_number', 'status','floor', 'created_at', 'updated_at']

    def validate_room_number(self, value):
        # Validación extra para el número de habitación (si deseas alguna validación personalizada)
        if value <= 1:
            raise serializers.ValidationError("El número de habitación no puede estar vacío.")
        return value
