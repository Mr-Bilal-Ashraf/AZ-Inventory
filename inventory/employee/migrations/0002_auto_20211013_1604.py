# Generated by Django 3.2.8 on 2021-10-13 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employees',
            name='cnic',
            field=models.CharField(default=1, max_length=15),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='employees',
            name='employee_of',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
