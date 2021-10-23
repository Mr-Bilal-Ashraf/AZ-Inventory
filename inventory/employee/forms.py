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