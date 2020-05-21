from django import forms
from .models import Tweet


class TweetForm(forms.ModelForm):
    MAX_TWEET_SIZE = 100

    class Meta:
        model = Tweet
        fields = ['content']

    # clean_<'field_name'> does any cleaning that is specific to the patricular field
    # these method are executed when is_valid() is called
    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > self.MAX_TWEET_SIZE:
            raise forms.ValidationError("This tweet is too long")
        return content
