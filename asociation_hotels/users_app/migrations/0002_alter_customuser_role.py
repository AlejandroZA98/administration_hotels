# Generated by Django 4.2.20 on 2025-04-04 01:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='role',
            field=models.CharField(choices=[('superadmin', 'Super Administrador'), ('admin_hotel', 'Administrador del Hotel'), ('jefe_camaristas', 'Jefe Camaristas'), ('jefe_mantenimiento', 'Jefe Mantenimiento')], max_length=50),
        ),
    ]
