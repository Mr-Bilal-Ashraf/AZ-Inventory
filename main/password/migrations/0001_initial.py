# Generated by Django 3.2.8 on 2021-11-03 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SecureContacts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('name', models.CharField(max_length=75)),
                ('number', models.CharField(max_length=12)),
                ('email', models.CharField(blank=True, max_length=40, null=True)),
                ('company', models.CharField(blank=True, max_length=40, null=True)),
                ('designation', models.CharField(blank=True, max_length=30, null=True)),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('website', models.CharField(blank=True, max_length=80, null=True)),
                ('relationship', models.CharField(blank=True, max_length=30, null=True)),
                ('note', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SecureNote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('encrypt', models.BinaryField()),
                ('key', models.BinaryField()),
                ('account_for', models.CharField(max_length=30)),
                ('letter', models.CharField(max_length=1)),
            ],
        ),
    ]
