from django import forms
from .models import Member, Skill, Availability
from urllib.parse import urlparse

class MemberForm(forms.ModelForm):
    # Create a CharField instead of URLField for more flexible input
    linkedin_profile = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'linkedin.com/in/your-profile or just your-profile',
            'class': 'form-control',
        })
    )

    discord_handle = forms.CharField(
        max_length=100, 
        required=False,
        help_text="Your Discord username (e.g., username#1234)",
        widget=forms.TextInput(attrs={
            'placeholder': 'username#1234',
            'class': 'form-control'
        })
    )

    class Meta:
        model = Member
        fields = ['name', 'biography', 'linkedin_profile']  # Use 'biography' field from the Member model
        labels = {
            'biography': 'Tell us about yourself',  # Update label
        }
        widgets = {
            'biography': forms.Textarea(attrs={'placeholder': 'Tell us about yourself.'}),
            'linkedin_profile': forms.TextInput(attrs={
                'placeholder': 'linkedin.com/in/your-profile or just your-profile',
                'class': 'form-control',
            }),
        }
        help_texts = {
            'discord_handle': None,  # This will override the model's help_text
        }

    def clean_linkedin_profile(self):
        profile = self.cleaned_data.get('linkedin_profile', '').strip()
        if not profile:
            return ''

        # If they just entered their profile name
        if '/' not in profile and '.' not in profile:
            return f'https://www.linkedin.com/in/{profile}'

        # If they entered a partial or full URL
        if not profile.startswith(('http://', 'https://')):
            profile = 'https://' + profile.lstrip('/')

        # Ensure www. is present
        if 'www.' not in profile:
            parsed = urlparse(profile)
            profile = profile.replace(parsed.netloc, 'www.' + parsed.netloc)

        # Validate that it's a LinkedIn URL
        if 'linkedin.com' not in profile:
            raise forms.ValidationError('Please enter a valid LinkedIn profile URL or profile name')

        return profile

class SkillForm(forms.ModelForm):
    class Meta:
        model = Skill
        fields = ['expertise', 'experience_years', 'skills', 'languages']
        widgets = {
            'expertise': forms.TextInput(attrs={'placeholder': 'Level of Expertise'}),
            'experience_years': forms.NumberInput(attrs={'placeholder': 'Years of Experience'}),
            'skills': forms.TextInput(attrs={'placeholder': 'Skills'}),
            'languages': forms.TextInput(attrs={'placeholder': 'Languages'})
        }

class AvailabilityForm(forms.ModelForm):
    class Meta:
        model = Availability
        fields = ['hours_per_week', 'join_reason', 'interesting_ecosystem', 'impact_plan']
        widgets = {
            'hours_per_week': forms.NumberInput(attrs={'placeholder': 'e.g., 5'}),
            'join_reason': forms.Textarea(attrs={'placeholder': 'Why do you want to join the program?'}),
            'interesting_ecosystem': forms.Textarea(attrs={'placeholder': 'What do you find interesting about our ecosystem?'}),
            'impact_plan': forms.Textarea(attrs={'placeholder': 'How do you plan to impact the program?'}),
        }
