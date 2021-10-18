from django.urls import path
from . import views

urlpatterns = [
    path('make/<int:l>/<int:u>/<int:n>/<int:s>/<int:num>', views.gen_pass, name="Gen_Pass"),
    path('store/', views.StorePass, name="Store_Pass"),
    path('note/', views.StoreNote, name="Store_Note"),
    path('get/note/', views.getNotes, name="Get_Notes"),
    path('get/pass/', views.getPass, name="Get_Pass"),
]