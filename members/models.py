# from django.db import models

# class Member(models.Model):
#     name = models.CharField(max_length=100)
#     biography = models.TextField()

#     def __str__(self):
#         return self.name

# class Skill(models.Model):
#     PROFICIENCY_LEVELS = [
#         ('beginner', 'Beginner'),
#         ('intermediate', 'Intermediate'),
#         ('advanced', 'Advanced'),
#     ]

#     member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='skills')
#     name = models.CharField(max_length=100)
#     expertise = models.CharField(max_length=100)
#     experience_years = models.IntegerField()
#     proficiency = models.CharField(max_length=20, choices=PROFICIENCY_LEVELS)

#     def __str__(self):
#         return f"{self.name} - {self.expertise} ({self.get_proficiency_display()})"

# class Availability(models.Model):
#     member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='availability')
#     hours_per_week = models.IntegerField()

#     def __str__(self):
#         return f"{self.member.name} - {self.hours_per_week} hours/week"

# models.py
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
    name = models.CharField(max_length=100)
    expertise = models.CharField(max_length=100)
    experience_years = models.IntegerField()
    proficiency = models.CharField(max_length=20, choices=PROFICIENCY_LEVELS)
    soft_skills = models.TextField(blank=True, null=True)  # Field for soft skills
    hard_skills = models.TextField(blank=True, null=True)  # Field for hard skills

    def __str__(self):
        return f"{self.name} - {self.expertise} ({self.get_proficiency_display()})"

class Availability(models.Model):
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='availability')
    hours_per_week = models.IntegerField()

    def __str__(self):
        return f"{self.member.name} - {self.hours_per_week} hours/week"
