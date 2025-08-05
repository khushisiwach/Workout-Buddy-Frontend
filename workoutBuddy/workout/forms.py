from django import forms
from django.core.exceptions import ValidationError
import re

class CreateWorkoutForm(forms.Form):
    DURATION_CHOICES = [
        ("30", "30 min"),
        ("45", "45 min"),
        ("60", "60 min"),
        ("90+", "90+ min"),
    ]
    
    age = forms.IntegerField(
        min_value=10,
        max_value=100,
        error_messages={
            'required': 'Age is required.',
            'min_value': 'Age must be at least 10.',
            'max_value': 'Age must be under 100.',
            'invalid': 'Enter a valid age.'
        },
        widget=forms.NumberInput(attrs={'placeholder': 'Enter your age'})
    )

    gender = forms.ChoiceField(
        choices=[("male", "Male"), ("female", "Female"), ("other", "Other")],
        error_messages={
            'required': 'Please select your gender.',
            'invalid_choice': 'Invalid gender selection.'
        }
    )

    height_cm = forms.FloatField(
        min_value=50,
        max_value=300,
        error_messages={
            'required': 'Height is required.',
            'min_value': 'Height must be at least 50 cm.',
            'max_value': 'Height cannot exceed 300 cm.',
            'invalid': 'Enter a valid height in cm.'
        },
        widget=forms.NumberInput(attrs={'placeholder': 'e.g. 170'})
    )

    weight_kg = forms.FloatField(
        min_value=20.0,
        max_value=200.0,
        error_messages={
            'required': 'Weight is required.',
            'min_value': 'Weight must be at least 20 kg.',
            'max_value': 'Weight cannot exceed 200 kg.',
            'invalid': 'Enter a valid weight in kg.'
        },
        widget=forms.NumberInput(attrs={'placeholder': 'e.g. 65'})
    )

    goal = forms.ChoiceField(
        choices=[
            ("lose_weight", "Lose Weight"),
            ("gain_muscle", "Gain Muscle"),
            ("maintain_fitness", "Maintain Fitness")
        ],
        error_messages={
            'required': 'Please choose your goal.',
            'invalid_choice': 'Invalid goal selection.'
        }
    )

    activity_level = forms.ChoiceField(
        choices=[
            ("sedentary", "Sedentary"),
            ("light", "Light"),
            ("moderate", "Moderate"),
            ("active", "Active"),
            ("very_active", "Very Active")
        ],
        error_messages={
            'required': 'Select your activity level.',
            'invalid_choice': 'Invalid activity level.'
        }
    )

    workout_days_per_week = forms.IntegerField(
        min_value=0,
        max_value=7,
        error_messages={
            'required': 'Enter how many days you work out per week.',
            'min_value': 'Workout days must be at least 0.',
            'max_value': 'You cannot work out more than 7 days a week.',
            'invalid': 'Enter a number between 0 and 7.'
        },
        widget=forms.NumberInput(attrs={'placeholder': 'e.g. 3'})
    )

    workout_duration = forms.ChoiceField(
        choices=DURATION_CHOICES,
        widget=forms.RadioSelect(attrs={'class': 'hidden'}),  # Hide default radio for styling
        error_messages={
            'required': 'Please select a workout duration.',
            'invalid_choice': 'Invalid duration selected.'
        }
    )

    medical_conditions = forms.CharField(
        required=False,
        max_length=500,
        widget=forms.Textarea(attrs={'placeholder': 'Any medical conditions?'}),
        strip=True
    )

    injuries_or_limitations = forms.CharField(
        required=False,
        max_length=500,
        widget=forms.Textarea(attrs={'placeholder': 'Any injuries or limitations?'}),
        strip=True
    )


    def clean_medical_conditions(self):
        data = self.cleaned_data.get('medical_conditions', '').strip()
        if len(data) > 500:
            raise ValidationError("Medical conditions text is too long (max 500 characters).")
        return data

    def clean_injuries_or_limitations(self):
        data = self.cleaned_data.get('injuries_or_limitations', '').strip()
        if len(data) > 500:
            raise ValidationError("Injuries/limitations text is too long (max 500 characters).")
        return data
