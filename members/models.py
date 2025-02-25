from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

class Member(models.Model):
    name = models.CharField(max_length=100)
    biography = models.TextField()
    linkedin_profile = models.URLField(
        max_length=255,
        blank=True,
        verbose_name="LinkedIn Profile"
    )
    discord_handle = models.CharField(max_length=100, blank=True, null=True, 
                                 help_text="Your Discord username (e.g., username#1234)")

    def __str__(self):
        return f"{self.name}"

    def clean(self):
        if self.linkedin_profile and not self.linkedin_profile.startswith('https://www.linkedin.com/'):
            raise ValidationError({
                'linkedin_profile': 'Please enter a valid LinkedIn profile URL'
            })

class Skill(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='skills')
    expertise = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField()
    skills = models.TextField()
    languages = models.TextField()

    def __str__(self):
        return f"{self.expertise}"

class Availability(models.Model):
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='availability')
    hours_per_week = models.PositiveIntegerField()  # Ensures positive values only
    join_reason = models.TextField(blank=True)  # Removed null=True for TextField
    interesting_ecosystem = models.TextField(blank=True)
    impact_plan = models.TextField(blank=True)

    def __str__(self):
        return f"{self.member.name} - {self.hours_per_week} hours/week"
