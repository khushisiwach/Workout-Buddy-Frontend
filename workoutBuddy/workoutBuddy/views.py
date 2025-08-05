from django.http import HttpResponse
from django.shortcuts import render


def HomePage(request):
    return render(request, 'mainPage/home.html')

def AboutPage(request):
    return render(request,'mainPage/about.html' )