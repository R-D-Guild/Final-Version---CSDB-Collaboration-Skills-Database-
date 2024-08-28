# from django.contrib import admin
# from django.urls import include, path

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('members/', include('members.urls')),
# ]

# SkillsDatabase/urls.py

from django.urls import path, include
from members.admin import my_admin_site  # Import your custom admin site

urlpatterns = [
    path('myadmin/', my_admin_site.urls),  # Use the custom admin site at /myadmin/
    
    path('members/', include('members.urls')),  # Include URLs from the members app
]

