document.addEventListener("DOMContentLoaded", function () {
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("fitnessPlanForm");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const workoutDaysSlider = document.getElementById("workout_days_per_week");
  const workoutDaysOutput = document.getElementById("workout-days-output");

  let currentStep = 0;
  const totalSteps = steps.length;

  async function prefillFormFromProfile() {
    try {
      const response = await fetch("/workout/api/profile-json/", {
        method: "GET",
        credentials: "same-origin",
      });

      if (!response.ok) throw new Error("Failed to fetch profile data");

      const data = await response.json();
      console.log(data);

      document.getElementById("age").value = data.age || "";
      document.getElementById("height_cm").value = data.height || "";
      document.getElementById("weight_kg").value = data.weight || "";

      // Corrected radio ID matching
      const genderInput = document.getElementById(
        data.gender?.toLowerCase() || ""
      );
      if (genderInput) genderInput.checked = true;

      const goalInput = document.getElementById(data.goal?.toLowerCase() || "");
      if (goalInput) goalInput.checked = true;

      const activityInput = document.getElementById(
        data.activity_level?.toLowerCase() || ""
      );
      if (activityInput) activityInput.checked = true;
    } catch (err) {
      console.error("Error pre-filling form:", err);
    }
  }

  function updateFormSteps() {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
      step.classList.toggle("hidden", index !== currentStep);
    });

    const progress = ((currentStep + 1) / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Step ${currentStep + 1} of ${totalSteps}`;

    prevBtn.classList.toggle("invisible", currentStep === 0);
    nextBtn.classList.toggle("hidden", currentStep === totalSteps - 1);
    submitBtn.classList.toggle("hidden", currentStep !== totalSteps - 1);
  }

  function validateStep(stepIndex) {
    const currentStepElement = steps[stepIndex];
    let isValid = true;

    // Validate required text/textarea fields
    const inputs = currentStepElement.querySelectorAll(
      "input[required], textarea[required]"
    );
    inputs.forEach((input) => {
      if (input.type !== "radio") {
        if (!input.value.trim()) {
          input.classList.add("border-red-500");
          isValid = false;
        } else {
          input.classList.remove("border-red-500");
        }
      }
    });

    // Validate radio groups in current step
    const radioGroups = [
      "gender",
      "activity_level",
      "goal",
      "workout_duration",
    ];
    radioGroups.forEach((groupName) => {
      const radios = currentStepElement.querySelectorAll(
        `input[name="${groupName}"]`
      );
      if (radios.length > 0) {
        const isChecked = Array.from(radios).some((radio) => radio.checked);
        if (!isChecked) {
          isValid = false;
          radios.forEach((radio) => {
            const label = currentStepElement.querySelector(
              `label[for="${radio.id}"]`
            );
            if (label) label.classList.add("border-red-500");
          });
        } else {
          radios.forEach((radio) => {
            const label = currentStepElement.querySelector(
              `label[for="${radio.id}"]`
            );
            if (label) label.classList.remove("border-red-500");
          });
        }
      }
    });

    return isValid;
  }

  async function init() {
    await prefillFormFromProfile(); // Wait for data to prefill
    updateFormSteps(); // Render first step

    // Show the form
    document
      .getElementById("fitnessPlanForm")
      ?.classList.remove("hidden-until-loaded");

    // Next button logic
    nextBtn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps - 1) {
          currentStep++;
          updateFormSteps();
        }
      } else {
        alert("Please fill in all required fields before proceeding.");
      }
    });

    // Previous button logic
    prevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateFormSteps();
      }
    });

    // Final form submission
    form.addEventListener("submit", function (event) {
      if (!validateStep(currentStep)) {
        event.preventDefault();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Generating...";
    });

    // Real-time workout days slider preview
    if (workoutDaysSlider) {
      workoutDaysSlider.addEventListener("input", () => {
        workoutDaysOutput.textContent = workoutDaysSlider.value;
      });

      workoutDaysOutput.textContent = workoutDaysSlider.value;
    }

    // Remove error border on radio change
    document.querySelectorAll("input[type='radio']").forEach((radio) => {
      radio.addEventListener("change", () => {
        const label = document.querySelector(`label[for="${radio.id}"]`);
        if (label) label.classList.remove("border-red-500");
      });
    });
  }

  init();
});
