from django.db import models

class Member(models.Model):
    name = models.CharField(max_length=100)
    biography = models.TextField()

    def __str__(self):
        return self.name

class Skill(models.Model):
    PROFICIENCY_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)  # Consider renaming to 'skill_name' for clarity
    expertise = models.CharField(max_length=100)
    experience_years = models.PositiveIntegerField()  # Use PositiveIntegerField for better validation
    proficiency = models.CharField(max_length=20, choices=PROFICIENCY_LEVELS)
    soft_skills = models.TextField(blank=True, null=True)
    hard_skills = models.TextField(blank=True, null=True)
    languages = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.expertise} ({self.get_proficiency_display()})"

class Availability(models.Model):
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='availability')
    hours_per_week = models.PositiveIntegerField()  # Use PositiveIntegerField for better validation
    join_reason = models.TextField(blank=True, null=True)
    interesting_ecosystem = models.TextField(blank=True, null=True)
    impact_plan = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.member.name} - {self.hours_per_week} hours/week"
