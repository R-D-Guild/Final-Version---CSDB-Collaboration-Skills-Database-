# from django import forms
# from .models import Member, Skill, Availability

# class MemberForm(forms.ModelForm):
#     class Meta:
#         model = Member
#         fields = ['name', 'biography']

# class SkillForm(forms.ModelForm):
#     class Meta:
#         model = Skill
#         fields = ['name', 'expertise', 'experience_years', 'proficiency']  # Ensure 'skill_type' is removed

# class AvailabilityForm(forms.ModelForm):
#     class Meta:
#         model = Availability
#         fields = ['hours_per_week']

# forms.py
from django import forms
from .models import Member, Skill, Availability

class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['name', 'biography']

class SkillForm(forms.ModelForm):
    soft_skills = forms.CharField(
        required=False, 
        widget=forms.TextInput(attrs={'placeholder': 'e.g., Communication, Teamwork'})
    )
    hard_skills = forms.CharField(
        required=False, 
        widget=forms.TextInput(attrs={'placeholder': 'e.g., Python, Data Analysis'})
    )

    class Meta:
        model = Skill
        fields = ['soft_skills', 'hard_skills', 'expertise', 'experience_years', 'proficiency']

class AvailabilityForm(forms.ModelForm):
    class Meta:
        model = Availability
        fields = ['hours_per_week']
