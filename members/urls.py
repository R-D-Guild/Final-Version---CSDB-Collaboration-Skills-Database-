from django.urls import path
from . import views

urlpatterns = [
    # path('list/', views.members_list, name='members_list'),
    path('members-list/', views.members_list, name='members_list'),
    path('success/', views.success_page, name='success_page'),
    

    
]




