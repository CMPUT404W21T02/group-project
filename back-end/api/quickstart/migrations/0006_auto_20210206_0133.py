# Generated by Django 3.1.6 on 2021-02-06 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0005_auto_20210206_0116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='_id',
            field=models.CharField(max_length=128, unique=True),
        ),
        migrations.AlterField(
            model_name='author',
            name='displayName',
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name='author',
            name='github',
            field=models.CharField(max_length=128),
        ),
        migrations.AlterField(
            model_name='author',
            name='url',
            field=models.CharField(max_length=128, unique=True),
        ),
    ]
