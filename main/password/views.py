from django.http import HttpResponseRedirect
from django.http.response import HttpResponse
from cryptography.fernet import Fernet
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.models import User
from login.models import userDetail
from .models import SecureNote, SecureContacts

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.parsers import FormParser, JSONParser
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import SerPass, SerCon

#   password manager starts from here

class PASSWORD(APIView):
    parser_classes = (FormParser, JSONParser)
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        if pk == None:
            try:
                img = userDetail.objects.values("image").get(user_id = request.user.id)
            except:
                return HttpResponseRedirect(reverse('SignUpDetails'))
            contacts = SecureContacts.objects.values("id","name","relationship","company","number").filter(user_id=request.user.id)
            data = SecureNote.objects.values("id","email","account_for").filter(user_id=request.user.id, letter="p")
            return render(request, 'password/password.html', {'pass': data, "contacts":contacts, "image": img["image"]})
        else:
            return Response({'x': "Nothing To Show....!"})

    def post(self, request, format=None):
        a = SerPass(data=request.data)
        if a.is_valid():
            key = Fernet.generate_key()
            hasher = Fernet(key)
            msg = request.data["code"]
            msg = hasher.encrypt(msg.encode())
            instance = User.objects.get(id=request.user.id)
            data = SecureNote(
                user_id=instance, email=request.data["email"], encrypt=msg, key=key, account_for=request.data["used_for"], letter="p")
            data.save()
            obj = SecureNote.objects.values("id").filter(
                user_id=instance, email=request.data["email"])
            return Response({"x": True, "id": obj[len(obj)-1]["id"]})
        else:
            print(a.errors)
            return Response({"x": False})

    def patch(self, request, pk, format=None):
        if request.user.check_password(request.data["code"]):
            key = Fernet.generate_key()
            hasher = Fernet(key)
            msg = request.data["check"]
            msg = hasher.encrypt(msg.encode())
            SecureNote.objects.filter(user_id=request.user.id,letter="p",id=pk).update(key=key,encrypt=msg)
            return Response({"x": True})
        else:
            return Response({"x": False})

    def delete(self, request, pk, format=None):
        try:
            SecureNote.objects.filter(id=pk).delete()
            return Response({"x": True})
        except:
            return Response({"x": False})


@api_view(['POST'])
def return_password(request):
    if request.user.check_password(request.data["code"]):
        data = SecureNote.objects.values("id", "encrypt", "key").filter(
            user_id=request.user.id, letter="p")
        for a in data:
            re_hash = Fernet(a["key"])
            a["encrypt"] = re_hash.decrypt(a["encrypt"]).decode()
        return Response({"x": True, "data": data})
    else:
        return Response({"x": False})

#   password manager ends here



#   contact management starts here

class CONTACT(APIView):
    parser_classes = (FormParser, JSONParser)
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        if pk==None:
            pass
        else:
            pass

    def post(self, request, format=None):
        data = SerCon(data=request.data)
        if data.is_valid():
            obj = data.save()
            return Response({"x":True, "id":obj.id})
        else:
            return Response({"x":False})


    def patch(self, request, pk, format=None):
        pass

    def delete(self, request, pk, format=None):
        try:
            SecureContacts.objects.filter(id=pk).delete()
            return Response({"x": True})
        except:
            return Response({"x": False})


