from rest_framework import serializers
from reservation.api.models.reservation_model import Reservation
from clients_app.api.models.clients_model import Client
from hotels_app.api.models.hotel_model import Hotel
from hotels_app.api.models.room_model import Room

class ReservationSerializer(serializers.ModelSerializer):
    url=serializers.HyperlinkedIdentityField(view_name='get_one_reservation')
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), many=False)
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all(), many=False)
    room = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all(), many=False)
    
    client_name = serializers.StringRelatedField(source='client', read_only=True)
    hotel_info = serializers.StringRelatedField(source='hotel', read_only=True)
    room_info = serializers.StringRelatedField(source='room', read_only=True)

    class Meta:
        model = Reservation
        fields = ['id', 'client', 'hotel','room','check_in_date',
                  'check_out_date', 'status', 'created_at', 'updated_at', 'url', 'client_name','hotel_info','room_info']

    def validate(self, data):
        check_in = data.get('check_in_date')
        check_out = data.get('check_out_date')

        if self.instance:
            if check_in is None:
                check_in = self.instance.check_in_date
            if check_out is None:
                check_out = self.instance.check_out_date

        if check_in and check_out and check_in >= check_out:
            raise serializers.ValidationError("La fecha de check-out debe ser posterior a la fecha de check-in.")

        return data
