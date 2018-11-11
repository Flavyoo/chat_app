# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import simplejson

from django.contrib.auth import (authenticate, login, logout)
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, Http404
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

from .models import ChatUserManager, ChatUser

def home(request):
    return render(request, 'frontend/chat_app/home.html')

@login_required
def chat(request):
    return render(request, 'frontend/chat_app/chat.html')

def register_view(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        data = simplejson.loads(body_unicode)
        username = data['username']
        password = data['password']
        display_name = data['displayName']
        userManager = ChatUserManager();
        userManager.model = ChatUser
        user = userManager.create_user(username=username,
                                       display_name=display_name,
                                       password=password)
        new_user = authenticate(username=username, password=password)
        if user is not None and user.is_active:
            login(request, new_user)
            return JsonResponse({'message': 'Logged In'})
        else:
            return JsonResponse({'message': 'Check you username or password'})
    return render(request, 'frontend/chat_app/home.html')


def login_view(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        data = simplejson.loads(body_unicode)
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        print user
        if user is not None and user.is_active:
            login(request, user)
            return JsonResponse({'message': 'Logged In'})
        else:
            return JsonResponse({'message': 'Check you username or password'})
    else:
        return render(request, 'frontend/chat_app/home.html')


def logout_view(request):
    logout(request)
    return redirect('/')
