from django.urls import path
from . import views 

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path("password/", views.password_flow_view, name="password_flow"),
    path('login/google/', views.google_login_redirect, name='google_login'),
    path('login/callback/', views.google_login_callback, name='google_callback'),
    path('google/callback/', views.google_login_callback, name='google_callback_direct'),

    path('profile/', views.view_profile, name='profile'),
    path('profile/create/', views.create_profile, name='create_profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    
    path("verify/", views.verify_otp, name="verify_otp"),
    path("resend-otp/", views.resend_otp, name="resend_otp"),

]
