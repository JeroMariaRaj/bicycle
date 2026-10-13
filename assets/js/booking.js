/**
 * VELOMETRIX - Appointment Booking Engine
 * Interactive booking form with field validation, time slot selection,
 * centered modal confirmation, and persistent localStorage sync with My Appointments.
 */

(function () {
  "use strict";

  function initBookingEngine() {
    const bookingForm = document.getElementById("appointmentBookingForm");
    if (!bookingForm) return;

    const serviceSelect = document.getElementById("bookingServiceSelect");
    const bikeCategorySelect = document.getElementById("bookingBikeCategory");
    const specialistSelect = document.getElementById("bookingSpecialistSelect");
    const dateInput = document.getElementById("bookingDateInput");
    const slotsContainer = document.getElementById("bookingSlotsContainer");
    const slotHiddenInput = document.getElementById("bookingSelectedSlotInput");
    const riderNameInput = document.getElementById("bookingRiderName");
    const riderEmailInput = document.getElementById("bookingRiderEmail");
    const riderPhoneInput = document.getElementById("bookingRiderPhone");
    const notesInput = document.getElementById("bookingNotes");
    const resetBtn = document.getElementById("bookingResetBtn");

    const fallbackSlots = [
      "09:00 AM - 11:30 AM",
      "10:00 AM - 12:30 PM",
      "01:00 PM - 03:30 PM",
      "02:00 PM - 04:30 PM",
      "04:00 PM - 06:30 PM"
    ];

    const timeSlots = (typeof window !== "undefined" && window.MOCK_TIME_SLOTS) ||
      (typeof MOCK_TIME_SLOTS !== "undefined" ? MOCK_TIME_SLOTS : fallbackSlots);

    const servicesList = (typeof window !== "undefined" && window.VELOMETRIX_SERVICES) || 
      (typeof VELOMETRIX_SERVICES !== "undefined" ? VELOMETRIX_SERVICES : []);
    const specialistsList = (typeof window !== "undefined" && window.VELOMETRIX_SPECIALISTS) || 
      (typeof VELOMETRIX_SPECIALISTS !== "undefined" ? VELOMETRIX_SPECIALISTS : []);
    const appStorage = (typeof window !== "undefined" && window.VelometrixStorage) ||
      (typeof VelometrixStorage !== "undefined" ? VelometrixStorage : null) ||
      (typeof Storage !== "undefined" && typeof Storage.get === "function" ? Storage : null) || {
        get(key, defaultVal) {
          try {
            const data = localStorage.getItem(`velometrix_${key}`);
            return data ? JSON.parse(data) : defaultVal;
          } catch (e) {
            return defaultVal;
          }
        },
        set(key, val) {
          try {
            localStorage.setItem(`velometrix_${key}`, JSON.stringify(val));
          } catch (e) {}
        }
      };

    let selectedSlot = "10:00 AM - 12:30 PM";

    // 1. Populate Services Select
    if (serviceSelect && servicesList.length > 0) {
      const getShortServiceTitle = (s) => {
        const titleMap = {
          "3d-motion-fit": "3D Dynamic Motion Fit",
          "saddle-pressure-mapping": "Saddle Pressure Mapping",
          "cleat-pedal-alignment": "Cleat & Pedal Alignment",
          "aero-triathlon-fit": "Aero TT & Triathlon Fit",
          "pedaling-efficiency-analysis": "Pedaling Efficiency",
          "mountain-bike-ergonomic-fit": "Mountain & Enduro Fit",
          "cycling-biomechanics-screening": "Mobility Screening",
          "followup-fit-consultation": "Follow-up Consultation",
          "cda-aerodynamic-profiling": "CdA Aero Profiling"
        };
        const title = titleMap[s.id] || s.title;
        return `${title} ($${s.price})`;
      };

      serviceSelect.innerHTML = '<option value="" selected>-- Choose Fitting Service --</option>' +
        servicesList.map(s => `<option value="${s.id}" data-price="${s.price}">${getShortServiceTitle(s)}</option>`).join("");
      
      // Check query param ?service=...
      const urlParams = new URLSearchParams(window.location.search);
      const preselectService = urlParams.get("service");
      if (preselectService && servicesList.some(s => s.id === preselectService)) {
        serviceSelect.value = preselectService;
      } else {
        serviceSelect.value = "";
      }
    }

    // 2. Populate Specialists
    if (specialistSelect && specialistsList.length > 0) {
      const getShortRole = (role) => {
        if (!role) return "Specialist";
        if (role.includes("Master Bike Fitter")) return "Master Bike Fitter";
        if (role.includes("Biomechanist")) return "Lead Biomechanist";
        if (role.includes("Aero")) return "Aero Specialist";
        if (role.includes("Podiatry")) return "Podiatry Specialist";
        return role.split("&")[0].trim();
      };
      specialistSelect.innerHTML = '<option value="any" selected>First Available Specialist</option>' +
        specialistsList.map(sp => `<option value="${sp.id}">${sp.name.replace(/,\s*[A-Z.]+$/, "")} (${getShortRole(sp.role)})</option>`).join("");
      specialistSelect.value = "any";
    }

    // 3. Pre-populate rider contact if profile exists
    function loadProfileData() {
      const profile = appStorage ? appStorage.get("profile", null) : null;
      if (profile) {
        if (riderNameInput && !riderNameInput.value) riderNameInput.value = profile.fullName || "Marcus Bennett";
        if (riderEmailInput && !riderEmailInput.value) riderEmailInput.value = profile.email || "rider@velometrix-demo.com";
        if (riderPhoneInput && !riderPhoneInput.value) riderPhoneInput.value = profile.phone || "+1 (555) 234-8971";
      } else {
        if (riderNameInput && !riderNameInput.value) riderNameInput.value = "Marcus Bennett";
        if (riderEmailInput && !riderEmailInput.value) riderEmailInput.value = "rider@velometrix-demo.com";
        if (riderPhoneInput && !riderPhoneInput.value) riderPhoneInput.value = "+1 (555) 234-8971";
      }
    }
    loadProfileData();

    // 4. Set Default & Minimum Date
    function setDefaultDate() {
      if (!dateInput) return;
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      
      if (!dateInput.value) {
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 3);
        const defY = defaultDate.getFullYear();
        const defM = String(defaultDate.getMonth() + 1).padStart(2, "0");
        const defD = String(defaultDate.getDate()).padStart(2, "0");
        dateInput.value = `${defY}-${defM}-${defD}`;
      }
    }
    setDefaultDate();

    // 5. Populate and Bind Available Time Slots
    function renderTimeSlots() {
      if (!slotsContainer) return;
      slotsContainer.innerHTML = timeSlots.map((slot) => {
        const isSelected = slot === selectedSlot;
        return `
          <button type="button" class="slot-select-btn w-full p-2.5 sm:p-3 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            isSelected
              ? "bg-lime-400 border-lime-400 text-brand-primary font-bold shadow-md ring-2 ring-lime-400/40"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-lime-400"
          }" data-slot="${slot}">
            <i class="bi bi-clock"></i> <span>${slot}</span>
          </button>
        `;
      }).join("");

      slotsContainer.querySelectorAll(".slot-select-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedSlot = btn.dataset.slot;
          if (slotHiddenInput) slotHiddenInput.value = selectedSlot;
          clearFieldError(slotsContainer);
          renderTimeSlots();
        });
      });
    }

    renderTimeSlots();
    if (slotHiddenInput) slotHiddenInput.value = selectedSlot;

    if (dateInput) {
      dateInput.addEventListener("change", () => {
        clearFieldError(dateInput);
        renderTimeSlots();
      });
    }

    // 6. Inline Field Error Display Helpers
    function setFieldError(element, message) {
      clearFieldError(element);
      element.classList.remove("border-slate-700", "border-slate-300", "focus:border-brand-accent");
      element.classList.add("border-red-500", "focus:border-red-500", "ring-1", "ring-red-500", "is-invalid");
      element.setAttribute("aria-invalid", "true");

      const parent = element.closest("div");
      if (parent) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "field-error-msg text-xs text-red-500 font-semibold mt-1.5 flex items-center gap-1.5 animate-fadeIn";
        errorDiv.setAttribute("role", "alert");
        errorDiv.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> <span>${message}</span>`;
        parent.appendChild(errorDiv);
      }
    }

    function clearFieldError(element) {
      element.classList.remove("border-red-500", "focus:border-red-500", "ring-1", "ring-red-500", "is-invalid");
      element.classList.add("border-slate-700");
      element.setAttribute("aria-invalid", "false");

      const parent = element.closest("div");
      if (parent) {
        const oldMsg = parent.querySelector(".field-error-msg");
        if (oldMsg) oldMsg.remove();
      }
    }

    // Live validation clearing on input
    [serviceSelect, dateInput, riderNameInput, riderEmailInput, riderPhoneInput].forEach((input) => {
      if (input) {
        input.addEventListener("input", () => clearFieldError(input));
        input.addEventListener("change", () => clearFieldError(input));
      }
    });

    // Reset Button handling
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        setTimeout(() => {
          [serviceSelect, dateInput, riderNameInput, riderEmailInput, riderPhoneInput, slotsContainer].forEach((el) => {
            if (el) clearFieldError(el);
          });
          if (serviceSelect) serviceSelect.value = "";
          if (specialistSelect) specialistSelect.value = "any";
          setDefaultDate();
          selectedSlot = timeSlots[1] || timeSlots[0];
          if (slotHiddenInput) slotHiddenInput.value = selectedSlot;
          renderTimeSlots();
          loadProfileData();
        }, 50);
      });
    }

    // 7. Handle Form Submission & Validation
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let hasErrors = false;
      let firstInvalid = null;

      // Validate Service
      if (!serviceSelect.value) {
        setFieldError(serviceSelect, "Please choose a fitting service.");
        hasErrors = true;
        if (!firstInvalid) firstInvalid = serviceSelect;
      } else {
        clearFieldError(serviceSelect);
      }

      // Validate Date
      if (!dateInput.value) {
        setFieldError(dateInput, "Please select an appointment date.");
        hasErrors = true;
        if (!firstInvalid) firstInvalid = dateInput;
      } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          setFieldError(dateInput, "Appointment date cannot be in the past.");
          hasErrors = true;
          if (!firstInvalid) firstInvalid = dateInput;
        } else {
          clearFieldError(dateInput);
        }
      }

      // Validate Time Slot
      if (!selectedSlot) {
        setFieldError(slotsContainer, "Please select an available appointment time slot.");
        hasErrors = true;
        if (!firstInvalid) firstInvalid = slotsContainer;
      } else {
        clearFieldError(slotsContainer);
      }

      // Validate Rider Name
      const nameVal = riderNameInput ? riderNameInput.value.trim() : "";
      if (!nameVal || nameVal.length < 2) {
        setFieldError(riderNameInput, "Please enter your full name (at least 2 characters).");
        hasErrors = true;
        if (!firstInvalid) firstInvalid = riderNameInput;
      } else {
        clearFieldError(riderNameInput);
      }

      // Validate Email
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      const emailVal = riderEmailInput ? riderEmailInput.value.trim() : "";
      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldError(riderEmailInput, "Please enter a valid email address (e.g. name@domain.com).");
        hasErrors = true;
        if (!firstInvalid) firstInvalid = riderEmailInput;
      } else {
        clearFieldError(riderEmailInput);
      }

      // Validate Phone
      const phoneDigits = riderPhoneInput ? riderPhoneInput.value.replace(/[^0-9]/g, "") : "";
      if (!phoneDigits || phoneDigits.length < 7) {
        setFieldError(riderPhoneInput, "Please enter a valid phone number (at least 7 digits).");
        hasErrors = true;
        if (!firstInvalid) firstInvalid = riderPhoneInput;
      } else {
        clearFieldError(riderPhoneInput);
      }

      if (hasErrors) {
        if (window.VelometrixToast) {
          window.VelometrixToast.show("Please complete all required fields highlighted in red.", "error");
        }
        if (firstInvalid && typeof firstInvalid.focus === "function") {
          firstInvalid.focus();
        } else if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      // 8. Construct Appointment Record
      const serviceObj = servicesList.find(s => s.id === serviceSelect.value) || {
        id: serviceSelect.value || "3d-motion-fit",
        title: serviceSelect.options[serviceSelect.selectedIndex]?.text || "3D Dynamic Motion Capture Fit"
      };

      const specialistObj = specialistsList.find(sp => sp.id === specialistSelect.value) || {
        name: specialistSelect.options[specialistSelect.selectedIndex]?.text || "First Available Specialist",
        id: specialistSelect.value || "any"
      };

      const newId = `APT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newAppointment = {
        id: newId,
        serviceId: serviceObj.id,
        serviceTitle: serviceObj.title.replace(/^\[.*?\]\s*/, "").replace(/\s*\(\$\d+\)$/, ""),
        bikeCategory: bikeCategorySelect ? bikeCategorySelect.value : "Road Bike",
        bikeName: `${bikeCategorySelect ? bikeCategorySelect.value : "Road Bike"} (Primary Setup)`,
        specialistId: specialistObj.id,
        specialistName: specialistObj.name.replace(/\s*\(.*?\)$/, ""),
        date: dateInput.value,
        time: selectedSlot,
        status: "Upcoming",
        location: "Studio Bay 01 (Precision Fitting & Telemetry)",
        notes: notesInput ? notesInput.value.trim() : "",
        clientName: riderNameInput.value.trim(),
        clientEmail: riderEmailInput.value.trim(),
        clientPhone: riderPhoneInput.value.trim(),
        createdAt: new Date().toISOString().split("T")[0]
      };

      // 9. Persist to LocalStorage (velometrix_appointments)
      try {
        const storedRaw = localStorage.getItem("velometrix_appointments");
        let currentList = storedRaw ? JSON.parse(storedRaw) : [];
        if (!Array.isArray(currentList) || currentList.length === 0) {
          currentList = (typeof window !== "undefined" && window.DEFAULT_APPOINTMENTS) || 
            (typeof DEFAULT_APPOINTMENTS !== "undefined" ? DEFAULT_APPOINTMENTS : []);
        }
        // Insert new appointment at the very beginning of the list
        currentList.unshift(newAppointment);
        localStorage.setItem("velometrix_appointments", JSON.stringify(currentList));
        if (appStorage) {
          appStorage.set("appointments", currentList);
        }
      } catch (err) {
        console.error("Failed to save appointment to localStorage:", err);
      }

      // 10. Populate Centered Modal and Display
      const modalEl = document.getElementById("bookingConfirmationModal");
      if (modalEl) {
        const confId = document.getElementById("confAppointmentId");
        const confService = document.getElementById("confServiceName");
        const confBike = document.getElementById("confBikeName");
        const confDate = document.getElementById("confDateTime");
        const confFitter = document.getElementById("confSpecialist");
        const confRider = document.getElementById("confRiderName");

        if (confId) confId.textContent = newId;
        if (confService) confService.textContent = newAppointment.serviceTitle;
        if (confBike) confBike.textContent = newAppointment.bikeCategory;
        if (confDate) confDate.textContent = `${newAppointment.date} at ${newAppointment.time}`;
        if (confFitter) confFitter.textContent = newAppointment.specialistName;
        if (confRider) confRider.textContent = newAppointment.clientName;

        if (window.VelometrixModal) {
          window.VelometrixModal.open("bookingConfirmationModal");
        } else {
          modalEl.classList.remove("hidden");
          modalEl.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
        }
      }

      if (window.VelometrixToast) {
        window.VelometrixToast.show(`Lab session ${newId} confirmed and saved to My Appointments!`, "success");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initBookingEngine);
  // Also run if DOM is already loaded
  if (document.readyState === "complete" || document.readyState === "interactive") {
    initBookingEngine();
  }
})();
