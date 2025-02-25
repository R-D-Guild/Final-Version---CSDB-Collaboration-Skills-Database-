# from django.contrib import admin
# from django.urls import include, path

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('members/', include('members.urls')),
# ]

# SkillsDatabase/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Use the default admin.site
    path('', include('members.urls')),
]

