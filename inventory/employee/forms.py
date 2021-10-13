from django import forms
from django.forms import fields, models
from django.forms import widgets
from django.forms.widgets import EmailInput, FileInput, PasswordInput, TextInput, Textarea, DateInput
from .models import employees

class addEmployee(forms.ModelForm):
    class Meta:
        model = employees
        fields="__all__"

        widgets={'reg_date': DateInput(attrs={'type':'date'})}
    # profile = forms.ImageField(required=False)
    # reg_date = forms.CharField(widget=DateInput(attrs={'type': 'date'}))
    # designation = forms.CharField()
    # salary_type = forms.ChoiceField(choices=(('monthly','Monthly'),('weekly', 'Weekly'),('daily', 'Daily')))
    # salary = forms.IntegerField()
    # commission = forms.IntegerField(max_value=100)
    # cnic = forms.CharField(max_length=15)
    # email = forms.EmailField()
    # mobile = forms.CharField(max_length=12)
    # address = forms.CharField(widget=Textarea())
    # Bank_Name = forms.CharField(max_length=50)
    # account_num = forms.CharField(max_length=30)


