from django.contrib import admin
from .models import Member, Availability, Skill
from django.contrib.auth.models import Group, User
from django.contrib.auth.admin import GroupAdmin, UserAdmin
from django.contrib.admin.sites import AdminSite
from django.http import HttpResponseRedirect
from django.urls import reverse
from django import forms

class MemberAdminForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = '__all__'
        help_texts = {
            'discord_handle': None,  # Remove help text for discord_handle
        }

class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'biography', 'discord_handle')
    search_fields = ('name',)
    form = MemberAdminForm
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'biography', 'discord_handle')
        }),
        ('Social Media', {
            'fields': ('linkedin_profile',)
        }),
    )

class SkillAdmin(admin.ModelAdmin):
    list_display = ('expertise', 'experience_years')
    search_fields = ('expertise',)
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('member', 'hours_per_week')
    search_fields = ('member__name',)
    
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Member, MemberAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Availability, AvailabilityAdmin)

# Customize admin site
admin.site.site_header = 'Collaboration Skills Database Admin'
admin.site.site_title = 'CSD Admin'
admin.site.index_title = 'Members'

# Unregister both models first
admin.site.unregister(Group)
admin.site.unregister(User)

# Custom User Admin
class CustomUserAdmin(UserAdmin):
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

# Custom Group Admin
class CustomGroupAdmin(GroupAdmin):
    list_display = ['name']
    search_fields = ['name']
    ordering = ['name']
    filter_horizontal = ['permissions']
    
    def has_module_permission(self, request):
        return True

    def has_view_permission(self, request, obj=None):
        return True

    def has_add_permission(self, request):
        return True

    def has_change_permission(self, request, obj=None):
        return True

# Register with custom names
admin.site.register(User, CustomUserAdmin)
admin.site.register(Group, CustomGroupAdmin)

# Rename User to Admin Users
User._meta.verbose_name = 'Admin User'
User._meta.verbose_name_plural = 'Admin Users'

class CustomAdminSite(AdminSite):
    # Override the logout method
    def logout(self, request, extra_context=None):
        from django.contrib.auth import REDIRECT_FIELD_NAME, logout
        
        # Log the user out
        logout(request)
        
        # Redirect to our custom logout page
        return HttpResponseRedirect('/admin/custom-logout/')

# Create an instance of the custom admin site
custom_admin_site = CustomAdminSite(name='custom_admin')

# Register your models with the custom admin site
# For example:
# from .models import YourModel
# custom_admin_site.register(YourModel)

