from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User

from .forms import addEmployee
from .models import employees


def form(request):
    if request.method == 'POST':
        form = addEmployee(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            cnic = form.cleaned_data['cnic']
            id = User.objects.get(username=request.user).id
            employees.objects.update_or_create(cnic=cnic, defaults={'employee_of':id})
            

        return HttpResponseRedirect('/emp/check/')
    else:
        return render(request, 'checking.html', {'form': addEmployee()})

def a(request):
    employees.objects.get(pk=1).delete()
    employees.objects.get(pk=2).delete()
    return HttpResponse("Ho gaya")
