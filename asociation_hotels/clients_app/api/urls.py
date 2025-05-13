from django.urls import path
from clients_app.api.views.register_client import RegisterClientView
from clients_app.api.views.get_clients import GetClientsView
# 
urlpatterns = [
    path('register/', RegisterClientView.as_view(), name='register_client'),
    path('clients/', GetClientsView.as_view(), name='get_clients')
]
