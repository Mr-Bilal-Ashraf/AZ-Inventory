from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
import json, base64

from .models import employees

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializer import SerEmp, nemp

def aa(request):
    return render(request, 'a.html')

class ch(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        qw = nemp(data = request.data)
        if qw.is_valid():
            qw.save()
            return Response({"detail": "Done"})
        else:
            return Response({"detail": qw.errors})


class employee(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk = None, format=None):
        if pk == None:
            emps = employees.objects.filter(employee_of = request.user.id)
            data = SerEmp(emps, many=True)
            dis_name = employees.objects.values("name").filter(employee_of = request.user.id).distinct()
            dis_department = employees.objects.values("department").filter(employee_of = request.user.id).distinct()
            dis_designation = employees.objects.values("designation").filter(employee_of = request.user.id).distinct()
            # return Response(data.data)
            return render(request, 'employee/employee.html', {'list': data.data,'name':dis_name,'department':dis_department,'designation':dis_designation})
        else:
            emps = employees.objects.get(id = pk)
            data = SerEmp(emps)
            return Response(data.data)


    def post(self, request, format=None):
        
        name = request.data["name"]
        if request.data["name"] == "null":
            name = None
            print(type(name))
        ser_emp = SerEmp(data=request.data)
        if ser_emp.is_valid():
            return Response({"x": True})
            # obj = ser_emp.save()
            # return Response({"x": True, "id": obj.id})
        else:
            print(ser_emp.errors)
            return Response({"x": False})
        
    def patch(self, request, pk, format=None):
        emp = employees.objects.get(id=pk)
        ser_emp = SerEmp(emp, data=request.data, partial=True)
        if ser_emp.is_valid():
            ser_emp.save()
            data = ser_emp.data
            data["x"] = True
            return Response(data)
        else:
            print(ser_emp.errors)
            return Response({"x": False})


    def delete(self, request, pk, format=None):
        try:
            employees.objects.get(pk=pk).delete()
            return Response({"x": True})
        except:
            return Response({"x": False})




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



# def listEmp(request):
#     if request.user.is_authenticated:
#         id = User.objects.get(username=request.user).id
#         emps = employees.objects.filter(employee_of = id)

#         return render(request, 'checking.html', {'emp': emps})
#     else:
#         return render(request, '404.html')


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

