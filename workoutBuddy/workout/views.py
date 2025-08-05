import requests
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt  # only for development
from .forms import CreateWorkoutForm
from django.http import JsonResponse
from django.conf import settings

FASTAPI_BASE_URL = settings.FASTAPI_BASE_URL

# views.py


def profile_json_view(request):
    token = request.session.get('token')
    print(token)
    if not token:
        return JsonResponse({"error": "Unauthorized"}, status=401)
    
    headers = {
        "Authorization": f"Bearer {token}"
    }
    try:
        response = requests.get(f"{FASTAPI_BASE_URL}/api/user/profile", headers=headers)
        print(response)
        if response.status_code == 200:
            json_data = response.json()
            return JsonResponse(json_data.get("data", {}))
        return JsonResponse({"error": "Failed to fetch profile"}, status=response.status_code)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def create_workout_plan(request):
    if request.method == "POST":
        form = CreateWorkoutForm(request.POST)
        if form.is_valid():
            try:
                # Extract list fields safely
                medical_conditions_raw = form.cleaned_data.get("medical_conditions", "")
                injuries_raw = form.cleaned_data.get("injuries_or_limitations", "")

                medical_conditions = [s.strip() for s in medical_conditions_raw.split(",") if s.strip()]
                injuries = [s.strip() for s in injuries_raw.split(",") if s.strip()]

                payload = {
                    "age": form.cleaned_data["age"],
                    "gender": form.cleaned_data["gender"],
                    "height_cm": form.cleaned_data["height_cm"],
                    "weight_kg": form.cleaned_data["weight_kg"],
                    "goal": form.cleaned_data["goal"],
                    "activity_level": form.cleaned_data["activity_level"],
                    "workout_days_per_week": form.cleaned_data["workout_days_per_week"],
                    "workout_duration": form.cleaned_data["workout_duration"],
                    "medical_conditions": medical_conditions,
                    "injuries_or_limitations": injuries,
                }

                print("Sending payload to FastAPI:", payload)

                token = request.session.get("token")
                print(token)
                if not token:
                    messages.error(request, "You must be logged in to generate your plan.")
                    return redirect("login")

                headers = {"Authorization": f"Bearer {token}"}
                response = requests.post(
                    f"{FASTAPI_BASE_URL}/api/workout/plan/week",
                    headers=headers,
                    json=payload
                )
                


                if response.status_code == 200:
                    # response_data = response.json()["data"]
                    # plan_id = response_data.get("plan_id")
                    # plan = response_data.get("plan")

                    # context = {
                    #     "plan_data": {
                    #         "plan": plan  # Wrap as `plan_data.plan` for template
                    #     },
                    #     "plan_id": plan_id
                    # }
                    return redirect( "view_workout_plan")

                else:
                    messages.error(request, f"FastAPI Error {response.status_code}: {response.text}")
                    return render(request, "create-workout.html", {"form": form})

            except Exception as e:
                print("Exception occurred:", e)
                messages.error(request, f"An internal error occurred: {e}")
                return render(request, "create-workout.html", {"form": form})

        else:
            print("Form validation errors:", form.errors)
            messages.error(request, "Please fix the errors below.")
            return render(request, "create-workout.html", {"form": form})

    # GET: show empty form
    form = CreateWorkoutForm()
    return render(request, "create-workout.html", {"form": form})


def view_workout_plan(request):
    token = request.session.get("token")

    if not token:
        messages.error(request, "You must be logged in to view your plan.")
        return redirect("login")

    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{FASTAPI_BASE_URL}/api/workout/plans/user", headers=headers)

    if response.status_code != 200:
        messages.error(request, "Failed to fetch workout plans.")
        return redirect("create_workout_plan")

    try:
        response_data = response.json()
        plans = response_data.get("data", [])

        if plans:
            latest_plan = sorted(plans, key=lambda x: x.get('created_at', ""), reverse=True)[0]

            context = {
                "plan_data": {
                    "plan": latest_plan.get("plan", [])
                },
                "plan_id": latest_plan.get("_id")
            }
            return render(request, "view-workout.html", context)

        else:
            messages.error(request, "No workout plans found.")
            return redirect("create_workout_plan")

    except Exception as e:
        print("Error parsing FastAPI response:", e)
        messages.error(request, "Error parsing workout plans.")
        return redirect("create_workout_plan")