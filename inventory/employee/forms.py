from django import forms

from django.forms.widgets import DateInput
from .models import employees

class addEmployee(forms.ModelForm):
    class Meta:
        model = employees
        exclude = ("employee_of","salary_paid","salary_left")

        widgets={
            'reg_date': DateInput(attrs={'type':'date'}),
            'address' : forms.Textarea()
        }
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


class pay(forms.Form):
    id = forms.IntegerField()
    name = forms.CharField(max_length=50, required=False)
    salary_type = forms.CharField(max_length=10, required=False)
    name.disabled = True
    t_salary = forms.IntegerField(required=False)
    t_salary.disabled = True
    salary_type.disabled = True
    p_salary = forms.IntegerField(required=False)
    l_salary = forms.IntegerField(required=False)