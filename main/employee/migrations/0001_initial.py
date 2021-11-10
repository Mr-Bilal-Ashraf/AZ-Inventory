# Generated by Django 3.2.8 on 2021-11-03 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='employees',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account_num', models.CharField(blank=True, max_length=30, null=True)),
                ('address', models.CharField(blank=True, max_length=150, null=True)),
                ('blood', models.CharField(blank=True, max_length=4, null=True)),
                ('cnic', models.CharField(blank=True, max_length=15, null=True)),
                ('commission', models.FloatField(blank=True, null=True)),
                ('department', models.CharField(blank=True, max_length=60, null=True)),
                ('designation', models.CharField(blank=True, max_length=30, null=True)),
                ('email', models.CharField(blank=True, max_length=30, null=True)),
                ('employee_of', models.IntegerField(blank=True, null=True)),
                ('father_name', models.CharField(blank=True, max_length=70, null=True)),
                ('gender', models.CharField(blank=True, max_length=10, null=True)),
                ('mobile', models.CharField(blank=True, max_length=12, null=True)),
                ('name', models.CharField(blank=True, max_length=70, null=True)),
                ('other_mobile', models.CharField(blank=True, max_length=12, null=True)),
                ('profile', models.ImageField(blank=True, null=True, upload_to='emp/')),
                ('religion', models.CharField(blank=True, max_length=15, null=True)),
                ('reg_date', models.CharField(blank=True, max_length=11, null=True)),
                ('salary_type', models.CharField(blank=True, max_length=7, null=True)),
                ('salary', models.IntegerField(blank=True, null=True)),
                ('salary_paid', models.IntegerField(blank=True, null=True)),
                ('salary_left', models.IntegerField(blank=True, null=True)),
            ],
        ),
    ]
