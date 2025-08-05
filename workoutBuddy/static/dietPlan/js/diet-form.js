function revealForm() {
  const card = document.getElementById("flip-card");
  card.classList.add("flipped");
}

function toggleOtherAllergyInput(checkbox) {
  const input = document.getElementById("other-allergy-input");
  input.classList.toggle("hidden", !checkbox.checked);
}

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".form-step");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("dietForm");

  let currentStep = 0;

  function showStep(step) {
    steps.forEach((s, i) => {
      s.classList.toggle("hidden", i !== step);
      s.classList.toggle("active", i === step);
    });

    prevBtn.style.display = step === 0 ? "none" : "inline-block";
    nextBtn.style.display = step === steps.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = step === steps.length - 1 ? "inline-block" : "none";
  }

  function validateStep(stepIndex) {
    const step = steps[stepIndex];
    const inputs = step.querySelectorAll("input, select, textarea");
    let isValid = true;

    inputs.forEach(input => {
      const value = input.value.trim();

      if (input.offsetParent === null || input.disabled) return;

      if (
        (input.tagName === "SELECT" && (value === "select" || value === "")) ||
        ((input.tagName === "INPUT" || input.tagName === "TEXTAREA") && !value)
      ) {
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        input.classList.remove("border-red-500");
      }

      if (input.id === "medical_conditions") {
        const invalidWords = ["tree", "grass", "bush", "weed"];
        const containsInvalid = invalidWords.some(w => value.toLowerCase().includes(w));
        if (containsInvalid) {
          alert("Please enter a valid medical condition (no junk like 'bush' or 'grass').");
          input.classList.add("border-red-500");
          isValid = false;
        }
      }
    });

    return isValid;
  }

  nextBtn?.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    } else {
      alert("Please complete all required fields before proceeding.");
    }
  });

  prevBtn?.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);
  });

  form?.addEventListener("submit", () => {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Generating...";
      submitBtn.classList.add("opacity-60", "cursor-not-allowed");
    }
  });

  showStep(currentStep);
});

window.toggleOtherAllergy = function (checkbox) {
  const input = document.getElementById("otherAllergyInput");
  if (checkbox.value.toLowerCase() === "other" && checkbox.checked) {
    input.classList.remove("hidden");
  } else if (checkbox.value.toLowerCase() === "other" && !checkbox.checked) {
    input.classList.add("hidden");
  }
};
