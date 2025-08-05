# forms.py
from django import forms

class DietPreferenceForm(forms.Form):
    VEG_CHOICES = [
        ("veg", "Vegetarian"),
        ("non-veg", "Non-Vegetarian"),
    ]
    
    ACTIVITY_LEVEL_CHOICES = [
        ("sedentary", "Sedentary (little to no exercise)"),
        ("light", "Light (light exercise 1–3 days/week)"),
        ("moderate", "Moderate (moderate exercise 3–5 days/week)"),
        ("very active", "Very Active (hard exercise 6–7 days/week)"),
        ("athlete", "Athlete (intense training or job)"),
    ]
    
    FITNESS_GOAL_CHOICES = [
        ("weight loss", "Weight Loss"),
        ("muscle gain", "Muscle Gain"),
        ("maintenance", "Maintenance"),
        ("endurance", "Endurance"),
    ]

    EXPERIENCE_LEVEL_CHOICES = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    ]

    WORKOUT_STYLE_CHOICES = [
        ("gym", "Gym"),
        ("home", "Home"),
        ("yoga", "Yoga"),
        ("crossfit", "CrossFit"),
        ("pilates", "Pilates"),
        ("outdoor", "Outdoor/Running"),
    ]

    ALLERGY_CHOICES = [
        ("nuts", "Nuts"),
        ("gluten", "Gluten"),
        ("dairy", "Dairy"),
        ("soy", "Soy"),
        ("eggs", "Eggs"),
        ("shellfish", "Shellfish"),
        ("none", "None"),
        ("other", "Other (specify below)"),
    ]

    veg_or_non_veg = forms.ChoiceField(choices=VEG_CHOICES, label="Diet Type")
    activity_level = forms.ChoiceField(choices=ACTIVITY_LEVEL_CHOICES, label="Activity Level")
    fitness_goal = forms.ChoiceField(choices=FITNESS_GOAL_CHOICES, label="Fitness Goal")
    experience_level = forms.ChoiceField(choices=EXPERIENCE_LEVEL_CHOICES, label="Experience Level", required=False)
    medical_conditions = forms.CharField(label="Medical Conditions", required=False, widget=forms.Textarea(attrs={'rows': 2}))
    
    allergies = forms.MultipleChoiceField(
        choices=ALLERGY_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False,
        label="Allergies (select all that apply)"
    )
    other_allergies = forms.CharField(label="Other Allergies (if any)", required=False)

    preferred_workout_style = forms.ChoiceField(
        choices=WORKOUT_STYLE_CHOICES,
        label="Preferred Workout Style",
        required=False
    )

    preferred_training_days_per_week = forms.IntegerField(
        min_value=1,
        max_value=7,
        label="Preferred Training Days per Week"
    )
