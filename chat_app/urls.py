from . import views
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token

app_name = "chat_app"

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^chat/$', views.chat, name='chat'),
    url(r'^login/$', views.login_view, name='login_view'),
    url(r'^logout/$', views.logout_view, name='logout'),
    url(r'^chat/register/$', views.register_view, name='register_view'),
    url(r'^token-auth/$', obtain_jwt_token)
]
