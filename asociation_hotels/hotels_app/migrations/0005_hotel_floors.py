# Generated by Django 4.2.20 on 2025-06-03 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels_app', '0004_room_floor_alter_room_room_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='floors',
            field=models.IntegerField(default=1),
        ),
    ]
