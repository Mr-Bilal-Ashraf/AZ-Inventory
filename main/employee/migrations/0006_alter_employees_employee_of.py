# Generated by Django 3.2.8 on 2021-11-17 18:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('employee', '0005_auto_20211117_2307'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employees',
            name='employee_of',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]