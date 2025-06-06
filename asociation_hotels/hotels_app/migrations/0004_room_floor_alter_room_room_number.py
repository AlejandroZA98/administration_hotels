# Generated by Django 4.2.20 on 2025-06-03 07:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels_app', '0003_alter_room_room_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='floor',
            field=models.IntegerField(default=None),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='room',
            name='room_number',
            field=models.IntegerField(unique=True),
        ),
    ]
