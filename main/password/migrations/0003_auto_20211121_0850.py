# Generated by Django 3.2.8 on 2021-11-21 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('password', '0002_auto_20211118_1557'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='securecontacts',
            name='note',
        ),
        migrations.RemoveField(
            model_name='securecontacts',
            name='website',
        ),
        migrations.AddField(
            model_name='securecontacts',
            name='department',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='securecontacts',
            name='gender',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
    ]