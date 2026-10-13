/**
 * VELOMETRIX - Form Validation Engine
 * Accessible, real-time client-side form validation with field-level feedback
 */

(function () {
  "use strict";

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
  const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  function clearFieldError(input) {
    input.classList.remove("border-red-500", "focus:border-red-500", "is-invalid");
    input.classList.add("border-slate-300", "dark:border-slate-700");
    input.setAttribute("aria-invalid", "false");
    const parent = input.closest(".form-group") || input.parentElement;
    if (parent) {
      const errEl = parent.querySelector(".field-error-msg");
      if (errEl) errEl.remove();
    }
  }

  function setFieldError(input, message) {
    clearFieldError(input);
    input.classList.remove("border-slate-300", "dark:border-slate-700");
    input.classList.add("border-red-500", "focus:border-red-500", "is-invalid");
    input.setAttribute("aria-invalid", "true");

    const parent = input.closest(".form-group") || input.parentElement;
    if (parent) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "field-error-msg text-xs text-red-500 font-medium mt-1 flex items-center gap-1.5 animate-fadeIn";
      errorDiv.setAttribute("role", "alert");
      errorDiv.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> <span>${message}</span>`;
      parent.appendChild(errorDiv);
    }
  }

  function validateInput(input) {
    const value = input.value ? input.value.trim() : "";
    const isRequired = input.hasAttribute("required") || input.dataset.required === "true";
    const type = input.type || "text";

    // Required check
    if (isRequired && (!value || (input.type === "checkbox" && !input.checked))) {
      const label = input.dataset.label || "This field";
      setFieldError(input, `${label} is required.`);
      return false;
    }

    if (!isRequired && !value) {
      clearFieldError(input);
      return true;
    }

    // Email check
    if (type === "email" || input.dataset.type === "email") {
      if (!EMAIL_REGEX.test(value)) {
        setFieldError(input, "Please enter a valid email address (e.g. name@domain.com).");
        return false;
      }
    }

    // Phone check
    if (type === "tel" || input.dataset.type === "tel") {
      if (!PHONE_REGEX.test(value)) {
        setFieldError(input, "Please enter a valid phone number with area code.");
        return false;
      }
    }

    // Password check
    if (type === "password" && input.dataset.validateStrength === "true") {
      if (value.length < 8) {
        setFieldError(input, "Password must be at least 8 characters long.");
        return false;
      }
      if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
        setFieldError(input, "Password must contain at least one uppercase letter and one number.");
        return false;
      }
    }

    // Password confirm check
    if (input.dataset.matchPassword) {
      const targetInput = document.querySelector(input.dataset.matchPassword);
      if (targetInput && targetInput.value !== value) {
        setFieldError(input, "Passwords do not match.");
        return false;
      }
    }

    // Date check (e.g., prevent past dates for bookings)
    if (type === "date" && input.dataset.noPast === "true") {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        setFieldError(input, "Selected appointment date cannot be in the past.");
        return false;
      }
    }

    // Min length
    if (input.minLength && input.minLength > 0 && value.length < input.minLength) {
      setFieldError(input, `Must be at least ${input.minLength} characters.`);
      return false;
    }

    clearFieldError(input);
    return true;
  }

  function validateForm(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    let isValid = true;
    let firstInvalidInput = null;

    inputs.forEach((input) => {
      // Skip disabled or hidden inputs
      if (input.disabled || input.type === "hidden") return;
      const valid = validateInput(input);
      if (!valid) {
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = input;
      }
    });

    if (firstInvalidInput) {
      firstInvalidInput.focus();
    }

    return isValid;
  }

  // Auto-bind validation to forms with [data-validate="true"]
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[data-validate='true']").forEach((form) => {
      // Real-time blur feedback
      const inputs = form.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => validateInput(input));
        input.addEventListener("input", () => {
          if (input.classList.contains("is-invalid")) {
            validateInput(input);
          }
        });
      });
    });
  });

  window.VelometrixValidation = {
    validateForm,
    validateInput,
    clearFieldError,
    setFieldError
  };
})();
