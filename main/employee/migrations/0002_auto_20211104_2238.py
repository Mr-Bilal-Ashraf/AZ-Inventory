# Generated by Django 3.2.8 on 2021-11-04 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employees',
            name='daily_leaves',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='employees',
            name='monthly_leaves',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
