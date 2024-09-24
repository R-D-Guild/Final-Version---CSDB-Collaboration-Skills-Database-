
from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import Member, Skill, Availability

class MyAdminSite(AdminSite):
    site_header = 'Collaboration Skills Database Admin'
    site_title = 'CSD Admin Portal'
    index_title = 'Welcome to your Admin Portal'

# Custom admin site instance
my_admin_site = MyAdminSite(name='myadmin')

# Inlines for Skill model (inside MemberAdmin)
class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1
    fields = ('soft_skills', 'hard_skills', 'expertise', 'experience_years', 'proficiency', 'languages')

# Inlines for Availability model (inside MemberAdmin)
class AvailabilityInline(admin.TabularInline):
    model = Availability
    extra = 1
    fields = (
        'hours_per_week', 
        'join_reason', 
        'interesting_ecosystem', 
        'impact_plan'
    )

# Admin configuration for Member
class MemberAdmin(admin.ModelAdmin):
    inlines = [SkillInline, AvailabilityInline]
    list_display = ('name', 'biography')
    search_fields = ('name',)
    save_as = True  # Enables object duplication (copy)
    
    # Disable editing and deleting
    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

# Admin configuration for Skill
class SkillAdmin(admin.ModelAdmin):
    list_display = ('member', 'soft_skills', 'hard_skills', 'expertise', 'experience_years', 'proficiency', 'languages')
    search_fields = ('member__name', 'name', 'expertise')
    list_filter = ('proficiency',)
    save_as = True  # Enables object duplication (copy)

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

# Admin configuration for Availability
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = (
        'member', 
        'hours_per_week', 
        'join_reason', 
        'interesting_ecosystem', 
        'impact_plan'
    )
    search_fields = ('member__name',)
    save_as = True  # Enables object duplication (copy)

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

# Registering models with the custom admin site
my_admin_site.register(Member, MemberAdmin)
my_admin_site.register(Skill, SkillAdmin)
my_admin_site.register(Availability, AvailabilityAdmin)

