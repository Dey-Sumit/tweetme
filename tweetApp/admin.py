from django.contrib import admin

from .models import Tweet,TweetLike

class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike


class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin]
    list_display = ('id','content', 'user')
    search_fields = ['content']

    class Meta:
        model = Tweet


admin.site.register(Tweet,TweetAdmin)
