from . import views
from django.conf.urls import url, include

app_name = "chat_app"

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^chat/$', views.chat, name='chat'),
]
