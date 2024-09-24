# from django import forms
# from .models import Member, Skill, Availability

# class MemberForm(forms.ModelForm):
#     class Meta:
#         model = Member
#         fields = ['name', 'biography']

# class SkillForm(forms.ModelForm):
#     soft_skills = forms.CharField(
#         required=False, 
#         widget=forms.TextInput(attrs={'placeholder': 'e.g., Communication, Teamwork'})
#     )
#     hard_skills = forms.CharField(
#         required=False, 
#         widget=forms.TextInput(attrs={'placeholder': 'e.g., Python, Data Analysis'})
#     )
#     languages = forms.CharField(
#         required=False, 
#         widget=forms.TextInput(attrs={'placeholder': 'e.g., English, French'})
#     )

#     class Meta:
#         model = Skill
#         fields = ['soft_skills', 'hard_skills', 'expertise', 'experience_years', 'proficiency', 'languages']

# class AvailabilityForm(forms.ModelForm):
#     join_reason = forms.CharField(
#         required=False,
#         widget=forms.Textarea(attrs={'placeholder': 'Why do you want to join the SingularityNET Ambassador program?'})
#     )
#     interesting_ecosystem = forms.CharField(
#         required=False,
#         widget=forms.Textarea(attrs={'placeholder': 'What do you find interesting about our ecosystem?'})
#     )
#     impact_plan = forms.CharField(
#         required=False,
#         widget=forms.Textarea(attrs={'placeholder': 'How do you plan to impact the ambassador program?'})
#     )

#     class Meta:
#         model = Availability
#         fields = ['hours_per_week', 'join_reason', 'interesting_ecosystem', 'impact_plan']
from django import forms
from .models import Member, Skill, Availability

class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['name', 'biography']

class SkillForm(forms.ModelForm):
    class Meta:
        model = Skill
        fields = ['soft_skills', 'hard_skills', 'expertise', 'experience_years', 'proficiency', 'languages']
        widgets = {
            'soft_skills': forms.TextInput(attrs={'placeholder': 'e.g., Communication, Teamwork'}),
            'hard_skills': forms.TextInput(attrs={'placeholder': 'e.g., Python, Data Analysis'}),
            'expertise': forms.TextInput(attrs={'placeholder': 'e.g., Expert in Python'}),
            'languages': forms.TextInput(attrs={'placeholder': 'e.g., English, French'}),
        }

class AvailabilityForm(forms.ModelForm):
    class Meta:
        model = Availability
        fields = ['hours_per_week', 'join_reason', 'interesting_ecosystem', 'impact_plan']
        widgets = {
            'hours_per_week': forms.NumberInput(attrs={'placeholder': 'e.g., 5'}),
            'join_reason': forms.Textarea(attrs={'placeholder': 'Why do you want to join the SingularityNET Ambassador program?'}),
            'interesting_ecosystem': forms.Textarea(attrs={'placeholder': 'What do you find interesting about our ecosystem?'}),
            'impact_plan': forms.Textarea(attrs={'placeholder': 'How do you plan to impact the ambassador program?'}),
        }
