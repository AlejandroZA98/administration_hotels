from clients_app.api.models.clients_model import Client
from rest_framework import serializers

class ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields ='__all__'
       