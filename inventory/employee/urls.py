from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.addEmp, name="Add_Emp"),
    path('list/', views.employee.as_view(), name="list_Emp"),
    path('update/<int:id>', views.updateEmp, name="update_Emp"),
    path('del/<int:id>', views.delEmp, name="del_Emp"),
    path('pay/', views.salary, name="pay"),
    path('del/', views.delete, name="pay"),
    path('ch/', views.qwe, name="pay"),
    path('asdf/', views.ch.as_view(), name="pay"),

]