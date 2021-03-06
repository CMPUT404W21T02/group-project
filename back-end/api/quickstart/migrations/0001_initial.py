# Generated by Django 3.1.5 on 2021-03-28 19:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('displayName', models.TextField()),
                ('host', models.TextField()),
                ('url', models.TextField()),
                ('github', models.TextField()),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.JSONField()),
                ('object', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('host', models.TextField(primary_key=True, serialize=False)),
                ('username', models.TextField()),
                ('password', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.TextField()),
                ('description', models.TextField()),
                ('source', models.TextField(default='')),
                ('origin', models.TextField(default='')),
                ('visibility', models.TextField(choices=[('Public', 'Public'), ('Friends', 'Friends')])),
                ('unlisted', models.BooleanField()),
                ('contentType', models.TextField()),
                ('content', models.TextField(blank=True)),
                ('categories', models.JSONField()),
                ('published', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('commentLink', models.TextField(default='')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quickstart.author')),
            ],
            options={
                'ordering': ['-published'],
            },
        ),
        migrations.CreateModel(
            name='Inbox',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('items', models.JSONField(default=list)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quickstart.author')),
            ],
        ),
        migrations.CreateModel(
            name='Following',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiver', models.JSONField()),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quickstart.author')),
            ],
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.JSONField()),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quickstart.author')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('author', models.JSONField()),
                ('comment', models.TextField()),
                ('published', models.DateTimeField(default=django.utils.timezone.now, editable=False)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='quickstart.post')),
            ],
        ),
    ]
