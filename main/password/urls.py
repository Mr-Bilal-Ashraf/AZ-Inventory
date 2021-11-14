from django.urls import path
from . import views

urlpatterns = [
    path('make/<int:l>/<int:u>/<int:n>/<int:s>/<int:num>', views.gen_pass, name="Gen_Pass"),
    path('store/', views.StorePass, name="Store_Pass"),
    path('note/', views.StoreNote, name="Store_Note"),
    path('get/note/', views.getNotes, name="Get_Notes"),
    path('get/pass/', views.getPass, name="Get_Pass"),
    path('del/<int:n>', views.delete, name="delete_Pass"),
    path('store/contact', views.storeContact, name="store_contact"),
    path('update/contact', views.storeContact, name="update_contact"),
    path('del/contact/<int:n>', views.storeContact, name="delete_contact"),
    path('ser/', views.abcd.as_view()),
]

#abcdefg