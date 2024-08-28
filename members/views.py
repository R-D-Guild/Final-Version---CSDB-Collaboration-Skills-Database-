# from django.shortcuts import render, redirect
# from .forms import MemberForm, SkillForm, AvailabilityForm

# def members_list(request):
#     if request.method == "POST":
#         member_form = MemberForm(request.POST)
#         skill_form = SkillForm(request.POST)
#         availability_form = AvailabilityForm(request.POST)

#         # Print form data for debugging
#         print("Member Form Data:", member_form.data)
#         print("Skill Form Data:", skill_form.data)
#         print("Skill Form Errors:", skill_form.errors)
#         print("Availability Form Data:", availability_form.data)
#         print("Availability Form Errors:", availability_form.errors)

#         if member_form.is_valid() and skill_form.is_valid() and availability_form.is_valid():
#             member = member_form.save()

#             # Attach member to the skill before saving
#             skill = skill_form.save(commit=False)
#             skill.member = member
#             skill.save()

#             # Attach member to availability before saving
#             availability = availability_form.save(commit=False)
#             availability.member = member
#             availability.save()

#             return redirect('success_page')  # Redirect to success page
#         else:
#             # Print errors if form is not valid
#             print("Member Form Errors:", member_form.errors)
#             print("Skill Form Errors:", skill_form.errors)
#             print("Availability Form Errors:", availability_form.errors)

#     else:
#         member_form = MemberForm()
#         skill_form = SkillForm()
#         availability_form = AvailabilityForm()

#     return render(request, 'members/members_list.html', {
#         'member_form': member_form,
#         'skill_form': skill_form,
#         'availability_form': availability_form,
#     })

# def success_page(request):
#     return render(request, 'members/success.html')

from django.shortcuts import render, redirect, get_object_or_404
from .forms import MemberForm, SkillForm, AvailabilityForm
from .models import Member, Skill, Availability

# View to handle the members list and form submissions
def members_list(request):
    if request.method == "POST":
        member_form = MemberForm(request.POST)
        skill_form = SkillForm(request.POST)
        availability_form = AvailabilityForm(request.POST)

        # Debugging: Print form data
        print("Member Form Data:", member_form.data)
        print("Skill Form Data:", skill_form.data)
        print("Skill Form Errors:", skill_form.errors)
        print("Availability Form Data:", availability_form.data)
        print("Availability Form Errors:", availability_form.errors)

        if member_form.is_valid() and skill_form.is_valid() and availability_form.is_valid():
            member = member_form.save()

            # Attach member to the skill and save
            skill = skill_form.save(commit=False)
            skill.member = member
            skill.save()

            # Attach member to availability and save
            availability = availability_form.save(commit=False)
            availability.member = member
            availability.save()

            return redirect('success_page')  # Redirect to success page
        else:
            # Print errors if forms are not valid
            print("Member Form Errors:", member_form.errors)
            print("Skill Form Errors:", skill_form.errors)
            print("Availability Form Errors:", availability_form.errors)

    else:
        member_form = MemberForm()
        skill_form = SkillForm()
        availability_form = AvailabilityForm()

    return render(request, 'members/members_list.html', {
        'member_form': member_form,
        'skill_form': skill_form,
        'availability_form': availability_form,
    })

# View to handle the success page
def success_page(request):
    # Assuming there's a way to retrieve the user's profile after submission
    member = Member.objects.last()  # Example: retrieve the last submitted member, adjust as necessary
    return render(request, 'members/success.html', {'member': member})

# View to handle the user's profile view and edit
def profile(request, member_id):
    member = get_object_or_404(Member, id=member_id)
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
