# Generated by Django 3.1.5 on 2021-02-08 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0014_follow'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follow',
            name='receiver',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name='follow',
            name='sender',
            field=models.CharField(max_length=128),
        ),
    ]