from django.urls import path
from . import views

urlpatterns = [
    path('', views.PASSWORD.as_view(), name="password"),
    path('<int:pk>/', views.PASSWORD.as_view(), name="update_password"),
    path('rpass/', views.return_password, name="Return_Password"),

    path('con/', views.CONTACT.as_view(), name="contact"),
    path('con/<int:pk>/', views.CONTACT.as_view(), name="update_contact"),

]

#aaaa