# Generated by Django 3.1.5 on 2021-02-08 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0013_auto_20210206_2230'),
    ]

    operations = [
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiver', models.CharField(max_length=128, unique=True)),
                ('sender', models.CharField(max_length=128, unique=True)),
                ('approved', models.BooleanField()),
            ],
        ),
    ]