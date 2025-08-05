document.addEventListener("DOMContentLoaded", () => {
  const flipContainer = document.getElementById("form-container");
  const showSignupBtn = document.getElementById("show-signup");
  const showLoginBtn = document.getElementById("show-login");

  const monkeyFace = document.querySelector(".monkey-face");
  const monkeyHand = document.querySelector(".monkey-hand");
  const monkeyThought = document.querySelector(".monkey-thought");
  const monkeyEyesBrows = document.querySelectorAll(".eye-brow");
  const loginEmail = document.getElementById("login-email");
  const signupEmail = document.getElementById("signup-email");
  const passwordInputs = document.querySelectorAll(".password-input");

  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let degree = 13;
  let inputPrevLength = [];

  // Flip animation with route change
  if (showSignupBtn) {
    showSignupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      flipContainer.classList.add("flipped");
      window.history.pushState(null, "", "/register");
    });
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      flipContainer.classList.remove("flipped");
      window.history.pushState(null, "", "/login");
    });
  }

  // Flip based on browser navigation
  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    flipContainer.classList.toggle("flipped", path === "/register");
  });

  // Monkey hand show/hide
  const showMonkeyHand = () => {
    if (monkeyHand) monkeyHand.style.transform = "translateY(35%)";
  };

  const hideMonkeyHand = () => {
    if (monkeyHand) monkeyHand.style.transform = "translateY(120%)";
  };

  document.addEventListener("click", (e) => {
    if (e.target.type === "password") {
      showMonkeyHand();
    } else {
      hideMonkeyHand();
    }

    if (e.target.type !== "email") {
      if (monkeyFace) monkeyFace.style.transform = `perspective(800px) rotateZ(0deg)`;
      monkeyEyesBrows.forEach((eyeBrow) => {
        eyeBrow.style.transform = "translateY(-2px)";
      });
    }
  });

  // Monkey face rotation on email input
  const handleEmailInput = (emailInput) => {
    emailInput.addEventListener("input", (e) => {
      const currentLength = String(e.target.value).length;
      const isDecrement = inputPrevLength.includes(currentLength);

      if (!isDecrement && degree >= -10) {
        degree -= 1;
        inputPrevLength.push(currentLength);
      } else if (isDecrement && degree < 13) {
        degree += 1;
      }

      if (!emailInput.value.match(mailformat)) {
        if (monkeyThought) monkeyThought.style.opacity = "1";
        monkeyEyesBrows.forEach((eyeBrow) => {
          eyeBrow.style.transform = "translateY(3px)";
        });
      } else {
        if (monkeyThought) monkeyThought.style.opacity = "0";
        monkeyEyesBrows.forEach((eyeBrow) => {
          eyeBrow.style.transform = "translateY(-3px)";
        });
      }

      if (monkeyFace) monkeyFace.style.transform = `perspective(800px) rotateZ(${degree}deg)`;
    });
  };

  if (loginEmail) handleEmailInput(loginEmail);
  if (signupEmail) handleEmailInput(signupEmail);

  // Password field focus/blur
  passwordInputs.forEach((input) => {
    input.addEventListener("focus", showMonkeyHand);
    input.addEventListener("blur", hideMonkeyHand);
  });

  // Initial flip based on URL path
  const path = window.location.pathname.replace(/\/$/, "");
  flipContainer.classList.toggle("flipped", path === "/register");

  // Input error clearing logic
  const fields = ['login-email', 'login-password', 'signup-email', 'signup-password'];
  fields.forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener("input", () => {
        const parent = input.closest(".input-group");
        if (parent) {
          parent.querySelectorAll(".error-text").forEach((e) => e.remove());
          input.classList.remove("border-red-500");
        }
        const nonFieldErrors = parent?.parentElement?.querySelector(".text-red-500.text-sm.mt-1");
        if (nonFieldErrors) nonFieldErrors.remove();
      });
    }
  });

  // Login form loading state
  const loginForm = document.querySelector('form[action*="login"]');
  const loginBtn = document.getElementById("login-button");
  const loginText = document.getElementById("login-button-text");
  const loginSpinner = document.getElementById("login-spinner");

  if (loginForm) {
    loginForm.addEventListener("submit", () => {
      if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.classList.add("opacity-60", "cursor-not-allowed");
      }
      if (loginText) loginText.textContent = "Logging in...";
      if (loginSpinner) loginSpinner.classList.remove("hidden");
    });
  }

  // Signup form loading state
  const signupForm = document.querySelector('form[action*="register"]');
  const signupBtn = document.getElementById("signup-button");
  const signupText = document.getElementById("signup-button-text");
  const signupSpinner = document.getElementById("signup-spinner");

  if (signupForm) {
    signupForm.addEventListener("submit", () => {
      if (signupBtn) {
        signupBtn.disabled = true;
        signupBtn.classList.add("opacity-60", "cursor-not-allowed");
      }
      if (signupText) signupText.textContent = "Signing up...";
      if (signupSpinner) signupSpinner.classList.remove("hidden");
    });
  }
});

  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');

    if (toggleBtn && passwordInput && eyeOpen && eyeClosed) {
      toggleBtn.addEventListener('click', function () {
        const isPasswordVisible = passwordInput.type === 'text';
        passwordInput.type = isPasswordVisible ? 'password' : 'text';

        eyeOpen.classList.toggle('hidden', isPasswordVisible);   // Show when visible
        eyeClosed.classList.toggle('hidden', !isPasswordVisible); // Hide when visible
      });
    }
  });
