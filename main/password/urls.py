from django.urls import path
from . import views

urlpatterns = [
    path('', views.PASSWORD.as_view(), name="password"),
    path('<int:pk>/', views.PASSWORD.as_view(), name="update_password"),


    path('rpass/', views.return_password, name="Return_Password"),
    path('note/', views.StoreNote, name="Store_Note"),
    path('get/note/', views.getNotes, name="Get_Notes"),
    path('get/pass/', views.getPass, name="Get_Pass"),
    path('del/<int:n>', views.delete, name="delete_Pass"),
    path('store/contact', views.storeContact, name="store_contact"),
    path('update/contact', views.storeContact, name="update_contact"),
    path('del/contact/<int:n>', views.storeContact, name="delete_contact"),
    path('ser/', views.abcd.as_view()),
]