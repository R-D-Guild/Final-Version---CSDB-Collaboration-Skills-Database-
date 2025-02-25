import logging
from django.shortcuts import render, redirect, get_object_or_404
from .forms import MemberForm, SkillForm, AvailabilityForm
from .models import Member, Skill, Availability
import time
from django.http import HttpResponseForbidden
from django.views.generic import ListView

# Set up logging
logger = logging.getLogger(__name__)

# View to handle the members list and form submissions
def members_list(request):
    start_time = time.time()
    logger.info("Starting members_list view")
    try:
        if request.method == "POST":
            logger.debug(f"POST data received: {request.POST}")
            member_form = MemberForm(request.POST)
            
            if member_form.is_valid():
                logger.info("Member form is valid")
                member = member_form.save(commit=False)
                member.discord_handle = member_form.cleaned_data.get('discord_handle')
                member.save()
                logger.info(f"Saved member with ID {member.id} and LinkedIn: {member.linkedin_profile}")
                skill_form = SkillForm(request.POST)
                availability_form = AvailabilityForm(request.POST)

                # Log form data and errors
                logger.debug("Member Form Data: %s", member_form.data)
                logger.debug("Skill Form Errors: %s", skill_form.errors)
                logger.debug("Availability Form Errors: %s", availability_form.errors)

                # Log form validation
                if not skill_form.is_valid():
                    logger.error(f"Skill form errors: {skill_form.errors}")
                if not availability_form.is_valid():
                    logger.error(f"Availability form errors: {availability_form.errors}")

                if skill_form.is_valid() and availability_form.is_valid():
                    # Attach member to the skill and save
                    skill = skill_form.save(commit=False)
                    skill.member = member
                    skill.save()
                    logger.info(f"Saved skill for member {member.id}")

                    # Attach member to availability and save
                    availability = availability_form.save(commit=False)
                    availability.member = member
                    availability.save()

                    # Store the member ID in session for success page
                    request.session['member_id'] = member.id
                    return redirect('success_page')  # Redirect to success page
            else:
                logger.warning(f"Member form errors: {member_form.errors}")
    except Exception as e:
        logger.error("Error in members_list view", exc_info=True)
        raise
    else:
        member_form = MemberForm()
        skill_form = SkillForm()
        availability_form = AvailabilityForm()

    end_time = time.time()
    logger.info(f"View execution time: {end_time - start_time:.2f} seconds")

    return render(request, 'members/members_list.html', {
        'member_form': member_form,
        'skill_form': skill_form,
        'availability_form': availability_form,
    })

# View to handle the success page
def success_page(request):
    member_id = request.session.get('member_id')
    if not member_id:
        return redirect('members_list')  # Redirect if no member ID in session
    member = get_object_or_404(Member, id=member_id)
    return render(request, 'members/success.html', {'member': member})

# View to handle the user's profile view and edit
def profile(request, member_id):
    logger.info(f"Profile access attempt for member_id: {member_id}")
    member = get_object_or_404(Member, id=member_id)
    
    if request.user != member.user:
        logger.warning(f"Unauthorized profile access attempt for member_id: {member_id}")
        return HttpResponseForbidden()
    
    skill = get_object_or_404(Skill, member=member)
    availability = get_object_or_404(Availability, member=member)

    if request.method == "POST":
        member_form = MemberForm(request.POST, instance=member)
        skill_form = SkillForm(request.POST, instance=skill)
        availability_form = AvailabilityForm(request.POST, instance=availability)

        if member_form.is_valid() and skill_form.is_valid() and availability_form.is_valid():
            member_form.save()
            skill_form.save()
            availability_form.save()
            return redirect('profile', member_id=member.id)  # Redirect back to profile after saving

    else:
        member_form = MemberForm(instance=member)
        skill_form = SkillForm(instance=skill)
        availability_form = AvailabilityForm(instance=availability)

    return render(request, 'members/profile.html', {
        'member_form': member_form,
        'skill_form': skill_form,
        'availability_form': availability_form,
        'member': member,
    })

# If you're using a ListView
class MemberListView(ListView):
    model = Member
    template_name = 'members/members_list.html'
    context_object_name = 'members'
    
    def get_queryset(self):
        # Make sure you're selecting discord_handle
        return Member.objects.all().select_related('user')

# If you're using a function-based view
def member_list(request):
    members = Member.objects.all()
    return render(request, 'members/members_list.html', {'members': members})
