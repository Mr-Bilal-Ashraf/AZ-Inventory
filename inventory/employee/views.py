from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
import json

from .forms import addEmployee, pay
from .models import employees


def addEmp(request):
    if request.method == 'POST':
        form = addEmployee(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            cnic = form.cleaned_data['cnic']
            id = User.objects.get(username=request.user).id
            employees.objects.update_or_create(cnic=cnic, defaults={'employee_of':id})
            
        return HttpResponseRedirect('/emp/add/')
    else:
        return render(request, 'checking.html', {'form': addEmployee()})

def listEmp(request):
    if request.user.is_authenticated:
        id = User.objects.get(username=request.user).id
        emps = employees.objects.filter(employee_of = id)

        return render(request, 'checking.html', {'emp': emps})

    else:
        return HttpResponse(f"{request.user} user is not logged in")

def updateEmp(request, id):
    try:
        emps = employees.objects.get(id = id)
        form = addEmployee(instance= emps)
        return render(request, 'checking.html', {'form': form})
    except:
        return HttpResponse("404 Not found")



def delEmp(request, id):
    try:
        # employees.objects.get(pk=id).delete()
        return HttpResponse(json.dumps({'status': 345}), content_type="application/json")
    except:
        return HttpResponse(json.dumps({'status': 345}), content_type="application/json")

def er(request):
    return render(request, '404.html')


def salary(request):
    if request.method == "POST":
        form = pay(request.POST)
        if form.is_valid():
            id = form.cleaned_data["id"]
            emps = employees.objects.get(id = id)
            form = pay(initial= {'id': id, 'name': emps.name, })
            
            return render(request, 'checking.html', {'form': form})
        else:
            return render(request, 'checking.html', {'form': form})
    else:
        form = pay()
        return render(request, 'checking.html', {'form': form})
