from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView
from django.conf import settings

urlpatterns = [
    # path('list/', views.members_list, name='members_list'),
    path('members-list/', views.members_list, name='members_list'),
    path('success/', views.success_page, name='success_page'),
    path('logout/', LogoutView.as_view(next_page=settings.LOGIN_URL), name='logout'),
]




