# Generated by Django 3.1.5 on 2021-02-05 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0002_auto_20210205_2241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='github',
            field=models.CharField(default='', max_length=50),
        ),
    ]
