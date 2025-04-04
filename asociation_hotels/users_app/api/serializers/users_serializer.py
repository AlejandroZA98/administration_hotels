from users_app.models import CustomUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id','username', 'email', 'name','role','password','password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def validate(self, data):
        passwords = data.get('password')
        password2 = data.get('password2')
        email = data.get('email')
        if passwords != password2:
            raise serializers.ValidationError('Las contraseñas deben coincidir')
        
        if not email:
            raise serializers.ValidationError('El email es obligatorio')
        
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError('El email ya está en uso')
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = CustomUser(**validated_data) 
        user.set_password(password)
        user.save()
        return user
