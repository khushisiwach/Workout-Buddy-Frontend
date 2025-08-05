from django.urls import path
from . import views

urlpatterns = [
    path('log/', views.workout_log, name='workout_logger'),
    path("meal/progress/", views.diet_progress_view, name="diet_progress"),
    path("workout/progress/", views.workout_progress_view, name="workout-progress"),
]
