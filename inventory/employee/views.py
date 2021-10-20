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
            employees.objects.update_or_create(cnic=cnic, defaults={'employee_of':id, 'salary_left': form.cleaned_data['salary']})
            
        return HttpResponseRedirect('/emp/add/')
    else:
        if request.user.is_authenticated:
            return render(request, 'checking.html', {'form': addEmployee()})
        else:
            return render(request, '404.html')


def listEmp(request):
    if request.user.is_authenticated:
        id = User.objects.get(username=request.user).id
        emps = employees.objects.filter(employee_of = id)

        return render(request, 'checking.html', {'emp': emps})
    else:
        return render(request, '404.html')


def updateEmp(request, id):
    if request.method == "POST":
        form = addEmployee(request.POST)
        if form.is_valid():
            if (User.objects.get(username=request.user).id == employees.objects.get(id = id).employee_of):
                profile = form.cleaned_data["profile"]
                name = form.cleaned_data["name"]
                reg_date = form.cleaned_data["reg_date"]
                designation = form.cleaned_data["designation"]
                salary_type = form.cleaned_data["salary_type"]
                salary = form.cleaned_data["salary"]
                commission = form.cleaned_data["commission"]
                cnic = form.cleaned_data["cnic"]
                email = form.cleaned_data["email"]
                mobile = form.cleaned_data["mobile"]
                address = form.cleaned_data["address"]
                Bank_Name = form.cleaned_data["Bank_Name"]
                account_num = form.cleaned_data["account_num"]
                employees.objects.filter(id = id).update(profile = profile, name = name, reg_date = reg_date,designation = designation,salary_type = salary_type,salary = salary,commission = commission,cnic = cnic,email = email,mobile = mobile,address = address, Bank_Name = Bank_Name,account_num = account_num)
                return HttpResponse(f"Ho gaya")
            else:
                return render(request, '404.html')
    else:
        if employees.objects.filter(id = id) and request.user.is_authenticated and (User.objects.get(username=request.user).id == employees.objects.get(id = id).employee_of):
            emps = employees.objects.get(id = id)
            form = addEmployee(instance= emps)
            return render(request, 'checking.html', {'form': form})
        else:
            return render(request, '404.html')


def delEmp(request, id):

    if employees.objects.filter(id = id) and request.user.is_authenticated and (User.objects.get(username=request.user).id == employees.objects.get(id = id).employee_of):
        employees.objects.get(pk=id).delete()
        return HttpResponse(json.dumps({'status': 345}), content_type="application/json")
    else:
        return render(request, '404.html')


def salary(request):
    if request.method == "POST":
        form = pay(request.POST)
        if form.is_valid():
            id = form.cleaned_data["id"]
            if (User.objects.get(username=request.user).id == employees.objects.get(id = id).employee_of):
                emps = employees.objects.get(id = id)
                form = pay(initial= {'id': id, 'name': emps.name, 'salary_type': emps.salary_type ,'t_salary': emps.salary, 'p_salary': emps.salary_paid, 'l_salary': emps.salary_left })
                return render(request, 'checking.html', {'form': form})
            return render(request, '404.html')
        else:
            return render(request, 'checking.html', {'form': form})
    else:
        if request.user.is_authenticated:
            form = pay()
            return render(request, 'checking.html', {'form': form})
        else:
            return render(request, '404.html')


def delete(request):
    employees.objects.get(pk=4).delete()
    employees.objects.get(pk=5).delete()
    employees.objects.get(pk=6).delete()
    employees.objects.get(pk=7).delete()
    employees.objects.get(pk=8).delete()
    return HttpResponse("by by")

