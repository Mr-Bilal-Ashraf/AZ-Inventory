from django.urls import path
from . import views

urlpatterns = [
    path('', views.employee.as_view(), name="Emp_Home"),
    path('<int:pk>/', views.get_emp, name="Get_Emp"),

    path('add/', views.addEmp, name="Add_Emp"),
    path('update/<int:id>', views.updateEmp, name="update_Emp"),
    path('del/<int:id>', views.delEmp, name="del_Emp"),
    path('pay/', views.salary, name="pay"),
    path('del/', views.delete, name="pay"),
    path('ch/', views.qwe, name="pay"),
    path('asdf/', views.ch.as_view(), name="pay"),

]