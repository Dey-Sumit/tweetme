from django.shortcuts import render,Http404,redirect
from .models import Profile
from .forms import ProfileForm,ProfileBasicForm

def profile_update_view(request,*args,**kwargs):
    if not request.user.is_authenticated:
        redirect('account/login')
    
    user = request.user

    my_profile = user.profile # as Profile is one to one field,sowe can access the user's profile by user.profile
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "bio": my_profile.bio,
        "location": my_profile.location,
    }
    form = ProfileForm(request.POST or None,instance=my_profile,initial=user_data) 
    # instance in ProfileForm():create an instance of the form using existing profile;
    # when form.save() triggered; it will not create a new object with the data,instead it will override the field
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        ''' this part is for change of ordering,use basicForm(forms.Form) 
        bio = form.cleaned_data.get('bio')
        location = form.cleaned_data.get('location')
        my_profile.bio = bio
        my_profile.location = location
        my_profile.save()
        '''
        user.save()
        profile_obj.save()
        
    context = {
        "form": form,
        "btn_label": "Save",
        "title": "Update Profile"
    }
    return render(request, "profiles/form.html", context)


def profile_detail_view(request,username,*args,**kwargs):
    print("profile detail requested not api")

    # try:
    #     profile = Profile.objects.get(user__username=username)
    #     context={
    #         "username":username,
    #         "profile":profile
    #     }
    #     return render(request,'profiles/profile.html',context)
    # except:
    #     raise Http404
      # get the profile for the passed username

    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    print(username,profile_obj)
    user = request.user #me
    # am I following this user
    is_following  = user in profile_obj.followers.all()
    context = {
        "username": username,
        "profile": profile_obj,
        "is_following":is_following
    }
    return render(request, "profiles/profile.html", context)



