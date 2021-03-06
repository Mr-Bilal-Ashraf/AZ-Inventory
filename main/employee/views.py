from django.http import HttpResponseRedirect
from django.http.response import HttpResponse
from django.urls import reverse
from django.shortcuts import render
from django.contrib.auth import logout

import sys
from PIL import Image, ImageOps
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


from .models import employees, complains
from login.models import userDetail

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializer import SerEmp, SerComplain


class employee(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk = None, format=None):
        try:
            if pk == None:
                try:
                    img = userDetail.objects.values("image").get(user_id = request.user.id)
                except:
                    return HttpResponseRedirect(reverse('SignUpDetails'))
                emps = employees.objects.values("id","name","designation","salary","salary_paid","salary_left","salary_type","daily_leaves","monthly_leaves").filter(employee_of = request.user.id)
                data = SerEmp(emps, many=True)
                dis_name = employees.objects.values("name").filter(employee_of = request.user.id).distinct()
                dis_department = employees.objects.values("department").filter(employee_of = request.user.id).distinct()
                dis_designation = employees.objects.values("designation").filter(employee_of = request.user.id).distinct()
                for x in dis_name:
                    if x["name"] is not None:
                        x["name"] = x["name"].title()

                for x in dis_department:
                    if x["department"] is not None:
                        x["department"] = x["department"].title()

                for x in dis_designation:
                    if x["designation"] is not None:
                        x["designation"] = x["designation"].title()
                # return Response(data.data)
                return render(request, 'employee/employee.html', {'list': data.data,'name':dis_name,'department':dis_department,'designation':dis_designation, "image": img["image"]})
            else:
                emps = employees.objects.get(id = pk)
                data = SerEmp(emps)
                return Response(data.data)
        except:
            return render(request, '404.html')


    def post(self, request, format=None):
        # try:
        request.data._mutable = True
        for x in request.data:
            if request.data[x] == "null":
                request.data[x] = None
            if x == "profile" and request.data[x] != None:
                imageTemproary = Image.open(request.data[x])
                outputIoStream = BytesIO()
                imageTemproary = imageTemproary.resize((150,150),Image.ANTIALIAS)
                imageTemproary = ImageOps.exif_transpose(imageTemproary)
                imageTemproary.save(outputIoStream , format='webp', quality=90)
                outputIoStream.seek(0)
                request.data[x] = InMemoryUploadedFile(outputIoStream,'ImageField', "%s.webp" % request.data[x].name.split('.')[0], 'image/webp', sys.getsizeof(outputIoStream), None)

        ser_emp = SerEmp(data=request.data)
        if ser_emp.is_valid():
            obj = ser_emp.save()
            return Response({"x": True, "id": obj.id})
        else:
            print(ser_emp.errors)
            return Response({"x": False})
        # except:
            # return Response({"x": False})

        
    def patch(self, request, pk, format=None):
        try:
            emp = employees.objects.get(id=pk)
            ser_emp = SerEmp(emp, data=request.data, partial=True)
            if ser_emp.is_valid():
                ser_emp.save()
                data = ser_emp.data
                data["x"] = True
                return Response(data)
            else:
                return Response({"x": False})
        except:
            return Response({"x": False})


    def delete(self, request, pk, format=None):
        try:
            employees.objects.get(pk=pk).delete()
            return Response({"x": True})
        except:
            return Response({"x": False})


@api_view(['POST'])
def srch(request):
    try:
        sr = {}
        sr["employee_of"] = request.user.id
        if request.data["department"] is not None:
            sr["department"] = request.data["department"]
        if request.data["name"] is not None:
            sr["name"] = request.data["name"]
        if request.data["designation"] is not None:
            sr["designation"] = request.data["designation"]

        a = employees.objects.values("id","name","designation","salary","salary_paid","salary_left","salary_type").filter(**sr)
        se = SerEmp(a, many=True)

        return Response({"data": se.data, "x":True})
    except:
        return Response({"x": False})

@api_view(['GET'])
def get_extra(request):
    try:
        emps = employees.objects.values("id","name","designation","salary","salary_paid","salary_left","salary_type").filter(employee_of = request.user.id)
        data = SerEmp(emps, many=True)
        return Response({'data': data.data, 'x':True})
    except:
        return Response({'x': False})


@api_view(['POST'])
def mark_leave(request):
    try:
        employees.objects.filter(id=request.POST["id"], employee_of = request.user.id).update(daily_leaves = request.POST["leaves"])
        return Response({"x": True})
    except:
        return Response({"x": False})


@api_view(['POST'])
def mark_monthly(request):
    try:
        employees.objects.filter(id=request.POST["id"], employee_of = request.user.id).update(monthly_leaves = request.POST["leaves"], daily_leaves = request.POST["daily_le"])
        return Response({"x": True})
    except:
        return Response({"x": False})


@api_view(['POST'])
def complain(request):
    try:
        if(request.user.check_password(request.data["complain_password"])):
            a = SerComplain(data=request.data)
            if a.is_valid():
                a.save()
                return Response({"x": True})
            else:
                return Response({"x": False})
        else:
            return Response({"x": '2'})
    except:
        return Response({"x": False})

@api_view(['GET'])
def logOut(request):
    try:
        logout(request)
        return Response({'x':True})
    except:
        return Response({'x':False})

@api_view(['GET'])
def show_complains(request):
    data = complains.objects.all()
    return render(request, 'employee/complains.html',{'data':data})