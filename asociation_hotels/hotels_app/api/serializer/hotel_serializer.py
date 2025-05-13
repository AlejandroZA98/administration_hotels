from rest_framework import serializers
from hotels_app.api.models.hotel_model import Hotel
from users_app.models import CustomUser

class HotelSerializer(serializers.ModelSerializer):
    # El serializer puede incluir un campo para las habitaciones, y puedes usar `get_room_details` si deseas incluir la cantidad de habitaciones por tipo
    room_details = serializers.SerializerMethodField()
    total_rooms = serializers.SerializerMethodField()

    administrador=serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(),many=False)
    administrador_name = serializers.StringRelatedField(source='administrador', read_only=True)
    url=serializers.HyperlinkedIdentityField(view_name='hotel_detail')
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address', 'email', 'phone', 'administrador',
                  'created_at', 'updated_at', 'room_details','total_rooms','administrador_name','url']

    def get_room_details(self, obj):
        return obj.get_room_details()
    def get_total_rooms(self, obj):
        # Accede al método count_rooms() del modelo Hotel
        return obj.count_rooms()