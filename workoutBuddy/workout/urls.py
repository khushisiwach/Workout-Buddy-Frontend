from django.urls import path
from . import views

urlpatterns = [
    path("create/", views.create_workout_plan, name="create_workout_plan"),
    path("view/", views.view_workout_plan, name="view_workout_plan"),
    path("api/profile-json/", views.profile_json_view, name="profile_json"),

]