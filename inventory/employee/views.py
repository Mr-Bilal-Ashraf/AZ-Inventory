from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
import json, base64

from .models import employees
from .forms import pay

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializer import SerEmp, nemp


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
        request.data._mutable = True
        for x in request.data:
            if request.data[x] == "null":
                request.data[x] = None
        
        ser_emp = SerEmp(data=request.data)
        if ser_emp.is_valid():
            obj = ser_emp.save()
            return Response({"x": True, "id": obj.id})
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
