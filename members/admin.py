from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import Member, Skill, Availability

class MyAdminSite(AdminSite):
    site_header = 'SNET Admins'
    site_title = 'Admin Controls'
    index_title = 'Welcome to your Admin Site'

# Create an instance of your custom admin site
my_admin_site = MyAdminSite(name='myadmin')

class SkillInline(admin.TabularInline):
    model = Skill
    extra = 1
    fields = ('soft_skills', 'hard_skills', 'expertise', 'experience_years', 'proficiency')

class AvailabilityInline(admin.TabularInline):
    model = Availability
    extra = 1
    fields = ('hours_per_week',)

class MemberAdmin(admin.ModelAdmin):
    inlines = [SkillInline, AvailabilityInline]
    list_display = ('name', 'biography')
    search_fields = ('name',)

class SkillAdmin(admin.ModelAdmin):
    list_display = ('member', 'soft_skills', 'hard_skills', 'expertise', 'experience_years', 'proficiency')
    search_fields = ('member__name', 'name', 'expertise')
    list_filter = ('proficiency',)

class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('member', 'hours_per_week')
    search_fields = ('member__name',)

# Register models with the custom admin site
my_admin_site.register(Member, MemberAdmin)
my_admin_site.register(Skill, SkillAdmin)
my_admin_site.register(Availability, AvailabilityAdmin)
