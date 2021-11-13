from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import login
from django.urls import path, include
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(url='acc/')),
    path('acc/', include('login.urls')),
    path('emp/', include('employee.urls')),
    path('pass/', include('password.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
