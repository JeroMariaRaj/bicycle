/**
 * VELOMETRIX - Rider Dashboard Master Controller
 * Handles Overview, Appointments Management, Bike Inventory,
 * Fit Comparison, Reports & Profile Persistence.
 */

(function () {
  "use strict";

  const Storage = (typeof window !== "undefined" && window.VelometrixStorage) ||
    (typeof VelometrixStorage !== "undefined" ? VelometrixStorage : null) ||
    (typeof window !== "undefined" && typeof window.Storage !== "undefined" && typeof window.Storage.get === "function" ? window.Storage : null) || {
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

  const DEFAULT_APPOINTMENTS = (typeof window !== "undefined" && window.DEFAULT_APPOINTMENTS) ||
    (typeof window.DEFAULT_APPOINTMENTS !== "undefined" ? window.DEFAULT_APPOINTMENTS : []);
  const DEFAULT_BIKES = (typeof window !== "undefined" && window.DEFAULT_BIKES) ||
    (typeof window.DEFAULT_BIKES !== "undefined" ? window.DEFAULT_BIKES : []);
  const DEFAULT_FIT_HISTORY = (typeof window !== "undefined" && window.DEFAULT_FIT_HISTORY) ||
    (typeof window.DEFAULT_FIT_HISTORY !== "undefined" ? window.DEFAULT_FIT_HISTORY : []);
  const DEFAULT_RIDER_PROFILE = (typeof window !== "undefined" && window.DEFAULT_RIDER_PROFILE) ||
    (typeof window.DEFAULT_RIDER_PROFILE !== "undefined" ? window.DEFAULT_RIDER_PROFILE : {});

  // 1. Dashboard Overview Initializer
  function initDashboardOverview() {
    const overviewContainer = document.getElementById("dashboardOverviewApp");
    if (!overviewContainer) return;

    const profile = Storage.get("profile", DEFAULT_RIDER_PROFILE);
    const appointments = Storage.get("appointments", DEFAULT_APPOINTMENTS);
    const bikes = Storage.get("bikes", DEFAULT_BIKES);
    const fitHistory = Storage.get("fitHistory", DEFAULT_FIT_HISTORY);

    // Welcome greeting
    const welcomeName = document.getElementById("overviewRiderName");
    if (welcomeName) welcomeName.textContent = profile.fullName;

    // Stat cards
    const totalSessions = appointments.filter((a) => a.status === "Completed").length;
    const statSessions = document.getElementById("statTotalSessions");
    if (statSessions) statSessions.textContent = totalSessions;

    const statBikes = document.getElementById("statTotalBikes");
    if (statBikes) statBikes.textContent = bikes.length;

    const statFtp = document.getElementById("statRiderFtp");
    if (statFtp) statFtp.textContent = `${profile.ftpWatts} W`;

    const statComfort = document.getElementById("statLatestComfort");
    if (statComfort && fitHistory.length > 0) {
      statComfort.textContent = `${fitHistory[0].comfortScore}%`;
    }

    // Next Appointment Card
    const nextAptCard = document.getElementById("overviewNextAppointment");
    if (nextAptCard) {
      const upcoming = appointments.filter((a) => a.status === "Upcoming");
      if (upcoming.length > 0) {
        const next = upcoming[0];
        nextAptCard.innerHTML = `
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-brand-primary text-white border border-lime-400/40 shadow-xl">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center text-2xl flex-shrink-0">
                <i class="bi bi-calendar2-check"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-lime-400 text-brand-primary uppercase">Confirmed Session</span>
                  <span class="text-xs text-slate-300 font-mono">${next.id}</span>
                </div>
                <h4 class="text-lg font-bold text-white">${next.serviceTitle}</h4>
                <p class="text-xs text-slate-300">${next.bikeName} • Specialist: <strong class="text-lime-300">${next.specialistName}</strong></p>
              </div>
            </div>
            <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-700">
              <div class="text-left md:text-right">
                <div class="text-sm font-bold text-lime-400">${next.date}</div>
                <div class="text-xs text-slate-300">${next.time}</div>
              </div>
              <a href="appointments.html" class="px-4 py-2 rounded-xl text-xs font-bold bg-lime-400 text-brand-primary hover:bg-lime-300 transition-colors">
                Manage
              </a>
            </div>
          </div>
        `;
      } else {
        nextAptCard.innerHTML = `
          <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">No upcoming bike fit appointments scheduled.</p>
            <a href="book-appointment.html" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-400 text-brand-primary font-bold text-xs hover:bg-lime-300 transition-all">
              <i class="bi bi-calendar-plus"></i> Schedule Lab Session
            </a>
          </div>
        `;
      }
    }

    // Latest Measurements Summary
    const measurementsTable = document.getElementById("overviewMeasurementsTable");
    if (measurementsTable && fitHistory.length > 0) {
      const latest = fitHistory[0].measurements;
      const prev = fitHistory.length > 1 ? fitHistory[1].measurements : latest;

      const calcDiff = (curr, old, unit = "mm") => {
        const delta = curr - old;
        if (delta === 0) return `<span class="text-slate-400">0 ${unit}</span>`;
        if (delta > 0) return `<span class="text-lime-500 font-bold">+${delta} ${unit}</span>`;
        return `<span class="text-amber-500 font-bold">${delta} ${unit}</span>`;
      };

      measurementsTable.innerHTML = `
        <tr class="border-b border-slate-100 dark:border-slate-700/50">
          <td class="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200">Saddle Height (BB to Top)</td>
          <td class="py-3 px-4 text-xs font-bold text-slate-900 dark:text-white">${latest.saddleHeight} mm</td>
          <td class="py-3 px-4 text-xs">${calcDiff(latest.saddleHeight, prev.saddleHeight)}</td>
        </tr>
        <tr class="border-b border-slate-100 dark:border-slate-700/50">
          <td class="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200">Saddle Setback</td>
          <td class="py-3 px-4 text-xs font-bold text-slate-900 dark:text-white">${latest.saddleSetback} mm</td>
          <td class="py-3 px-4 text-xs">${calcDiff(latest.saddleSetback, prev.saddleSetback)}</td>
        </tr>
        <tr class="border-b border-slate-100 dark:border-slate-700/50">
          <td class="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200">Handlebar Reach</td>
          <td class="py-3 px-4 text-xs font-bold text-slate-900 dark:text-white">${latest.handlebarReach} mm</td>
          <td class="py-3 px-4 text-xs">${calcDiff(latest.handlebarReach, prev.handlebarReach)}</td>
        </tr>
        <tr class="border-b border-slate-100 dark:border-slate-700/50">
          <td class="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200">Handlebar Drop</td>
          <td class="py-3 px-4 text-xs font-bold text-slate-900 dark:text-white">${latest.handlebarDrop} mm</td>
          <td class="py-3 px-4 text-xs">${calcDiff(latest.handlebarDrop, prev.handlebarDrop)}</td>
        </tr>
        <tr>
          <td class="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200">Dynamic Knee Flexion Angle</td>
          <td class="py-3 px-4 text-xs font-bold text-lime-500">${latest.kneeAngle}°</td>
          <td class="py-3 px-4 text-xs">${calcDiff(latest.kneeAngle, prev.kneeAngle, "°")}</td>
        </tr>
      `;
    }
  }

  // 2. Appointments Management
  function initAppointmentsManager() {
    const container = document.getElementById("appointmentsManagerApp");
    if (!container) return;

    let appointments = Storage.get("appointments", DEFAULT_APPOINTMENTS);
    const listContainer = document.getElementById("appointmentsListGrid");
    const filterTabs = document.querySelectorAll(".appointment-tab-btn");
    let currentFilter = "all";

    function renderList() {
      if (!listContainer) return;
      const filtered = appointments.filter((apt) => {
        if (currentFilter === "all") return true;
        return apt.status.toLowerCase() === currentFilter.toLowerCase();
      });

      if (filtered.length === 0) {
        listContainer.innerHTML = `
          <div class="py-12 text-center bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
            <i class="bi bi-calendar-x text-4xl text-slate-400 mb-2 block"></i>
            <h4 class="text-base font-bold text-slate-800 dark:text-slate-200">No ${currentFilter} appointments found</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Book a session anytime to optimize your riding position.</p>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filtered
        .map(
          (apt) => `
        <div class="appointment-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
              apt.status === "Upcoming"
                ? "bg-lime-400/10 text-lime-500 border border-lime-400/30"
                : apt.status === "Completed"
                ? "bg-sky-400/10 text-sky-400 border border-sky-400/30"
                : "bg-red-400/10 text-red-400 border border-red-400/30"
            }">
              <i class="bi ${apt.status === "Upcoming" ? "bi-calendar-check" : apt.status === "Completed" ? "bi-check2-circle" : "bi-x-circle"}"></i>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono font-bold text-slate-400">${apt.id}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  apt.status === "Upcoming"
                    ? "bg-lime-400/20 text-lime-600 dark:text-lime-400"
                    : apt.status === "Completed"
                    ? "bg-sky-400/20 text-sky-600 dark:text-sky-400"
                    : "bg-red-400/20 text-red-600 dark:text-red-400"
                }">${apt.status}</span>
              </div>
              <h4 class="text-base font-bold text-slate-900 dark:text-white">${apt.serviceTitle}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span class="font-medium text-slate-700 dark:text-slate-300">${apt.bikeName}</span> • Specialist: ${apt.specialistName}
              </p>
              ${apt.notes ? `<p class="text-xs text-slate-500 dark:text-slate-400 mt-2 bg-slate-50 dark:bg-slate-900/40 p-2 rounded-lg italic">"${apt.notes}"</p>` : ""}
            </div>
          </div>
          <div class="flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-700">
            <div class="text-left md:text-right">
              <div class="text-sm font-bold text-slate-900 dark:text-white">${apt.date}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">${apt.time}</div>
            </div>
            <div class="flex items-center gap-2">
              ${
                apt.status === "Upcoming"
                  ? `
                <button class="reschedule-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors" data-id="${apt.id}">
                  Reschedule
                </button>
                <button class="cancel-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors" data-id="${apt.id}">
                  Cancel
                </button>
              `
                  : `
                <a href="reports.html" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors">
                  View Report
                </a>
              `
              }
            </div>
          </div>
        </div>
      `
        )
        .join("");

      // Bind cancel handlers
      listContainer.querySelectorAll(".cancel-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const aptId = btn.dataset.id;
          if (confirm(`Are you sure you want to cancel appointment ${aptId}?`)) {
            appointments = appointments.map((a) => (a.id === aptId ? { ...a, status: "Canceled" } : a));
            Storage.set("appointments", appointments);
            VelometrixToast.show(`Appointment ${aptId} has been canceled.`, "warning");
            renderList();
          }
        });
      });

      // Bind reschedule handlers
      listContainer.querySelectorAll(".reschedule-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const aptId = btn.dataset.id;
          const target = appointments.find((a) => a.id === aptId);
          if (!target) return;

          const modal = document.getElementById("rescheduleModal");
          if (modal) {
            const idInput = document.getElementById("rescheduleAptId");
            const dateInput = document.getElementById("rescheduleDate");
            if (idInput) idInput.value = aptId;
            if (dateInput) {
              const today = new Date().toISOString().split("T")[0];
              dateInput.min = today;
              dateInput.value = target.date;
            }
            VelometrixModal.open("rescheduleModal");
          }
        });
      });
    }

    // Filter tabs
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        filterTabs.forEach((t) => {
          t.classList.remove("active", "border-lime-400", "text-lime-500");
          t.classList.add("border-transparent", "text-slate-500");
        });
        tab.classList.add("active", "border-lime-400", "text-lime-500");
        tab.classList.remove("border-transparent", "text-slate-500");
        currentFilter = tab.dataset.filter;
        renderList();
      });
    });

    // Handle Reschedule form submission
    const rescheduleForm = document.getElementById("rescheduleForm");
    if (rescheduleForm) {
      rescheduleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const aptId = document.getElementById("rescheduleAptId").value;
        const newDate = document.getElementById("rescheduleDate").value;
        const newTime = document.getElementById("rescheduleSlot").value;

        if (!newDate) {
          VelometrixToast.show("Please pick a valid date.", "error");
          return;
        }

        appointments = appointments.map((a) => (a.id === aptId ? { ...a, date: newDate, time: newTime } : a));
        Storage.set("appointments", appointments);
        VelometrixToast.show(`Appointment ${aptId} rescheduled to ${newDate} (${newTime}).`, "success");
        VelometrixModal.close("rescheduleModal");
        renderList();
      });
    }

    renderList();
  }

  // 3. Bikes Management
  function initBikesManager() {
    const container = document.getElementById("bikesManagerApp");
    if (!container) return;

    let bikes = Storage.get("bikes", DEFAULT_BIKES);
    const listGrid = document.getElementById("bikesListGrid");

    function resolveBikeImage(img) {
      if (!img) return "../assets/images/dashboard/bike-road.jpg";
      if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) return img;
      
      // Upgrade any older .svg references to high-res .jpg photography
      img = img.replace(/bike-road\.svg$/i, "bike-road.jpg")
               .replace(/bike-tri\.svg$/i, "bike-tri.jpg")
               .replace(/bike-mtb\.svg$/i, "bike-mtb.jpg");

      // Correct path based on directory location
      const inDashboard = window.location.pathname.includes("/dashboard/") || window.location.href.includes("/dashboard/");
      if (inDashboard) {
        if (img.startsWith("../")) return img;
        if (img.startsWith("assets/")) return "../" + img;
        return "../assets/images/dashboard/" + img;
      } else {
        if (img.startsWith("../assets/")) return img.replace(/^\.\.\//, "");
        return img;
      }
    }

    // Auto-migrate any previously stored bikes with old SVG or broken paths
    let migrated = false;
    bikes = bikes.map((b) => {
      if (b.image && b.image.includes(".svg")) {
        b.image = b.image.replace(/bike-road\.svg$/i, "bike-road.jpg")
                         .replace(/bike-tri\.svg$/i, "bike-tri.jpg")
                         .replace(/bike-mtb\.svg$/i, "bike-mtb.jpg");
        migrated = true;
      }
      return b;
    });
    if (migrated) Storage.set("bikes", bikes);

    function renderBikes() {
      if (!listGrid) return;
      listGrid.innerHTML = bikes
        .map(
          (bike) => `
        <div class="bike-card rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase">
                ${bike.type}
              </span>
              <span class="text-xs text-lime-500 font-bold flex items-center gap-1">
                <i class="bi bi-shield-check"></i> ${bike.fitStatus || "Profile Ready"}
              </span>
            </div>
            <div class="w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-200 dark:border-slate-800 relative group">
              <img src="${resolveBikeImage(bike.image)}" alt="${bike.nickname}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.onerror=null; this.src='../assets/images/dashboard/bike-road.jpg';">
            </div>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white">${bike.nickname}</h4>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">${bike.brand} ${bike.model} (${bike.year})</p>
            <div class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 py-3 border-y border-slate-100 dark:border-slate-700/60 mb-4">
              <div class="flex justify-between"><span>Frame Size:</span> <strong class="text-slate-900 dark:text-white">${bike.frameSize}</strong></div>
              <div class="flex justify-between"><span>Crank Length:</span> <strong class="text-slate-900 dark:text-white">${bike.crankLength || "170 mm"}</strong></div>
              <div class="flex justify-between"><span>Saddle:</span> <strong class="text-slate-900 dark:text-white truncate max-w-[150px]">${bike.saddle || "Default"}</strong></div>
            </div>
            ${bike.notes ? `<p class="text-xs text-slate-500 dark:text-slate-400 italic mb-4">"${bike.notes}"</p>` : ""}
          </div>
          <div class="flex items-center gap-2 pt-2">
            <a href="fit-history.html?bike=${bike.id}" class="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition-colors">
              Fit History
            </a>
            <button class="delete-bike-btn px-3 py-2 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors" data-id="${bike.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `
        )
        .join("");

      // Bind delete
      listGrid.querySelectorAll(".delete-bike-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          if (confirm("Are you sure you want to remove this bike from your profile?")) {
            bikes = bikes.filter((b) => b.id !== id);
            Storage.set("bikes", bikes);
            VelometrixToast.show("Bicycle removed from profile.", "warning");
            renderBikes();
          }
        });
      });
    }

    // Add bike form
    const addBikeForm = document.getElementById("addBikeForm");
    if (addBikeForm) {
      addBikeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (window.VelometrixValidation && !window.VelometrixValidation.validateForm(addBikeForm)) {
          return;
        }

        const nickname = document.getElementById("bikeNickname").value.trim();
        const brand = document.getElementById("bikeBrand").value.trim();
        const model = document.getElementById("bikeModel").value.trim();
        const type = document.getElementById("bikeType").value;
        const frameSize = document.getElementById("bikeFrameSize").value.trim();
        const year = document.getElementById("bikeYear").value.trim();
        const crank = document.getElementById("bikeCrankLength").value.trim() || "170 mm";
        const saddle = document.getElementById("bikeSaddle").value.trim() || "Ergonomic Road";
        const notes = document.getElementById("bikeNotes").value.trim();

        let img = "assets/images/dashboard/bike-road.jpg";
        if (type.includes("Triathlon") || type.includes("TT")) img = "assets/images/dashboard/bike-tri.jpg";
        if (type.includes("Mountain") || type.includes("XC")) img = "assets/images/dashboard/bike-mtb.jpg";

        const newBike = {
          id: `bike-${Date.now()}`,
          nickname,
          brand,
          model,
          type,
          frameSize,
          year,
          crankLength: crank,
          saddle,
          notes,
          image: img,
          fitStatus: "Ready for Assessment"
        };

        bikes.push(newBike);
        Storage.set("bikes", bikes);
        VelometrixToast.show(`${nickname} successfully added to garage!`, "success");
        VelometrixModal.close("addBikeModal");
        addBikeForm.reset();
        renderBikes();
      });
    }

    renderBikes();
  }

  // 4. Fit History & Side-by-Side Comparison
  function initFitHistoryComparison() {
    const container = document.getElementById("fitHistoryApp");
    if (!container) return;

    const fitHistory = Storage.get("fitHistory", DEFAULT_FIT_HISTORY);
    const selectA = document.getElementById("compareSessionA");
    const selectB = document.getElementById("compareSessionB");
    const compareOutput = document.getElementById("comparisonResultsBody");

    // Populate comparison dropdowns
    if (selectA && selectB) {
      const optionsHtml = fitHistory
        .map((f, idx) => `<option value="${f.id}" ${idx === 0 ? "selected" : ""}>${f.sessionDate} – ${f.bikeName}</option>`)
        .join("");
      selectA.innerHTML = optionsHtml;
      selectB.innerHTML = fitHistory
        .map((f, idx) => `<option value="${f.id}" ${idx === 1 ? "selected" : ""}>${f.sessionDate} – ${f.bikeName}</option>`)
        .join("");

      function updateComparison() {
        if (!compareOutput) return;
        const sessionA = fitHistory.find((f) => f.id === selectA.value) || fitHistory[0];
        const sessionB = fitHistory.find((f) => f.id === selectB.value) || fitHistory[1] || fitHistory[0];

        const metrics = [
          { label: "Saddle Height", key: "saddleHeight", unit: "mm" },
          { label: "Saddle Setback", key: "saddleSetback", unit: "mm" },
          { label: "Handlebar Reach", key: "handlebarReach", unit: "mm" },
          { label: "Handlebar Drop", key: "handlebarDrop", unit: "mm" },
          { label: "Dynamic Knee Flexion", key: "kneeAngle", unit: "°" },
          { label: "Hip Angle (TDC)", key: "hipAngle", unit: "°" },
          { label: "Cleat Offset", key: "cleatOffset", unit: "mm" },
          { label: "Crank Arm Length", key: "crankLength", unit: "mm" }
        ];

        compareOutput.innerHTML = metrics
          .map((m) => {
            const valA = sessionA.measurements[m.key];
            const valB = sessionB.measurements[m.key];
            const diff = valA - valB;
            let deltaHtml = `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800">0 ${m.unit}</span>`;
            if (diff > 0) deltaHtml = `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-lime-700 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/40 border border-lime-200 dark:border-lime-700/40">+${diff} ${m.unit}</span>`;
            if (diff < 0) deltaHtml = `<span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700/40">${diff} ${m.unit}</span>`;

            return `
            <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
              <td class="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200 text-xs">${m.label}</td>
              <td class="py-3.5 px-4 text-xs font-bold text-slate-900 dark:text-white font-mono">${valA} ${m.unit}</td>
              <td class="py-3.5 px-4 text-xs font-bold text-slate-900 dark:text-white font-mono">${valB} ${m.unit}</td>
              <td class="py-3.5 px-4 text-xs">${deltaHtml}</td>
            </tr>
          `;
          })
          .join("");
      }

      selectA.addEventListener("change", updateComparison);
      selectB.addEventListener("change", updateComparison);
      updateComparison();
    }

    // Render chronological history table
    const tableBody = document.getElementById("fitHistoryTableBody");
    if (tableBody) {
      tableBody.innerHTML = fitHistory
        .map(
          (fit) => `
        <tr class="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
          <td class="py-4 px-4 text-xs font-mono font-bold text-lime-700 dark:text-lime-400">${fit.id}</td>
          <td class="py-4 px-4 text-xs font-medium text-slate-600 dark:text-slate-300">${fit.sessionDate}</td>
          <td class="py-4 px-4 text-xs font-bold text-slate-900 dark:text-white">${fit.bikeName}</td>
          <td class="py-4 px-4 text-xs font-medium text-slate-600 dark:text-slate-400">${fit.specialist}</td>
          <td class="py-4 px-4 text-xs font-bold text-slate-900 dark:text-white font-mono">${fit.measurements.saddleHeight} mm</td>
          <td class="py-4 px-4 text-xs font-bold text-lime-700 dark:text-lime-400 font-mono">${fit.measurements.kneeAngle}°</td>
          <td class="py-4 px-4 text-xs">
            <span class="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300 border border-lime-200 dark:border-lime-700/40">${fit.comfortScore}% Score</span>
          </td>
          <td class="py-4 px-4 text-xs text-right">
            <a href="reports.html?session=${fit.id}" class="inline-flex items-center gap-1 font-bold text-xs text-lime-600 hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300 transition-colors">
              <span>Report</span> <i class="bi bi-arrow-right"></i>
            </a>
          </td>
        </tr>
      `
        )
        .join("");
    }
  }

  // 5. Profile & Settings Persistence
  function initProfileAndSettings() {
    // Profile form
    const profileForm = document.getElementById("riderProfileForm");
    if (profileForm) {
      const profile = Storage.get("profile", DEFAULT_RIDER_PROFILE);

      // Pre-fill
      const mapField = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.value = val;
      };

      mapField("profileFullName", profile.fullName);
      mapField("profileEmail", profile.email);
      mapField("profilePhone", profile.phone);
      mapField("profileDob", profile.dob);
      mapField("profileGender", profile.gender);
      mapField("profileHeight", profile.heightCm);
      mapField("profileWeight", profile.weightKg);
      mapField("profileInseam", profile.inseamCm);
      mapField("profileDiscipline", profile.discipline);
      mapField("profileExperience", profile.experienceLevel);
      mapField("profileWeeklyHours", profile.weeklyHours);
      mapField("profileFtp", profile.ftpWatts);
      mapField("profileMedical", profile.medicalNotes);
      mapField("profileBio", profile.bio);

      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (window.VelometrixValidation && !window.VelometrixValidation.validateForm(profileForm)) {
          VelometrixToast.show("Please correct the form fields.", "error");
          return;
        }

        const updated = {
          ...profile,
          fullName: document.getElementById("profileFullName").value.trim(),
          phone: document.getElementById("profilePhone").value.trim(),
          dob: document.getElementById("profileDob").value,
          gender: document.getElementById("profileGender").value,
          heightCm: parseFloat(document.getElementById("profileHeight").value) || profile.heightCm,
          weightKg: parseFloat(document.getElementById("profileWeight").value) || profile.weightKg,
          inseamCm: parseFloat(document.getElementById("profileInseam").value) || profile.inseamCm,
          discipline: document.getElementById("profileDiscipline").value,
          experienceLevel: document.getElementById("profileExperience").value,
          weeklyHours: parseInt(document.getElementById("profileWeeklyHours").value) || profile.weeklyHours,
          ftpWatts: parseInt(document.getElementById("profileFtp").value) || profile.ftpWatts,
          medicalNotes: document.getElementById("profileMedical").value.trim(),
          bio: document.getElementById("profileBio").value.trim()
        };

        Storage.set("profile", updated);
        VelometrixToast.show("Rider profile successfully updated and saved locally!", "success");
      });
    }

    // Reset Demo Data
    const resetDataBtn = document.getElementById("resetDemoDataBtn");
    if (resetDataBtn) {
      resetDataBtn.addEventListener("click", () => {
        if (confirm("Reset all appointments, bikes, and measurements to original demo factory defaults?")) {
          Storage.set("appointments", DEFAULT_APPOINTMENTS);
          Storage.set("bikes", DEFAULT_BIKES);
          Storage.set("fitHistory", DEFAULT_FIT_HISTORY);
          Storage.set("profile", DEFAULT_RIDER_PROFILE);
          VelometrixToast.show("All demo records reset to factory defaults.", "info");
          setTimeout(() => window.location.reload(), 1000);
        }
      });
    }
  }

  // 6. Report Printable View Renderer
  function initReportRenderer() {
    const reportApp = document.getElementById("measurementReportApp");
    if (!reportApp) return;

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session") || "FIT-2026-08";

    const fitHistory = Storage.get("fitHistory", DEFAULT_FIT_HISTORY);
    const profile = Storage.get("profile", DEFAULT_RIDER_PROFILE);
    const session = fitHistory.find((f) => f.id === sessionId) || fitHistory[0];

    // Populate report DOM
    const repId = document.getElementById("repSessionId");
    if (repId) repId.textContent = session.id;

    const repDate = document.getElementById("repSessionDate");
    if (repDate) repDate.textContent = session.sessionDate;

    const repFitter = document.getElementById("repSpecialistName");
    if (repFitter) repFitter.textContent = session.specialist;

    const repBike = document.getElementById("repBikeName");
    if (repBike) repBike.textContent = session.bikeName;

    const repRider = document.getElementById("repRiderName");
    if (repRider) repRider.textContent = profile.fullName;

    const repInseam = document.getElementById("repRiderInseam");
    if (repInseam) repInseam.textContent = `${profile.inseamCm} cm`;

    const repHeight = document.getElementById("repRiderHeight");
    if (repHeight) repHeight.textContent = `${profile.heightCm} cm`;

    const repNotes = document.getElementById("repFitterNotes");
    if (repNotes) repNotes.textContent = session.fitterNotes;

    const repAdj = document.getElementById("repSuggestedAdjustments");
    if (repAdj) repAdj.textContent = session.suggestedAdjustments;

    // Fill table
    const m = session.measurements;
    const repTable = document.getElementById("repMeasurementsTable");
    if (repTable) {
      repTable.innerHTML = `
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <td class="py-2.5 px-3 font-semibold text-xs">Saddle Height (BB center to saddle top along angle)</td>
          <td class="py-2.5 px-3 font-bold text-xs text-right">${m.saddleHeight} mm</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">±1.0 mm</td>
        </tr>
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <td class="py-2.5 px-3 font-semibold text-xs">Saddle Setback (BB plumb to saddle nose)</td>
          <td class="py-2.5 px-3 font-bold text-xs text-right">${m.saddleSetback} mm</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">UCI Legal (≥50mm)</td>
        </tr>
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <td class="py-2.5 px-3 font-semibold text-xs">Handlebar Cockpit Reach (Saddle nose to bar clamp)</td>
          <td class="py-2.5 px-3 font-bold text-xs text-right">${m.handlebarReach} mm</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">Neutral Shoulder Angle</td>
        </tr>
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <td class="py-2.5 px-3 font-semibold text-xs">Handlebar Drop (Saddle plane to bar top plane)</td>
          <td class="py-2.5 px-3 font-bold text-xs text-right">${m.handlebarDrop} mm</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">Sustainable Gran Fondo</td>
        </tr>
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <td class="py-2.5 px-3 font-semibold text-xs">Dynamic Knee Flexion Angle (Bottom Dead Center)</td>
          <td class="py-2.5 px-3 font-bold text-xs text-lime-500 text-right">${m.kneeAngle}°</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">Target Window (35°–38°)</td>
        </tr>
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <td class="py-2.5 px-3 font-semibold text-xs">Hip Angle at Top Dead Center</td>
          <td class="py-2.5 px-3 font-bold text-xs text-right">${m.hipAngle}°</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">Open &gt;45° (No Impingement)</td>
        </tr>
        <tr class="border-b border-slate-200 dark:border-slate-700">
          <td class="py-2.5 px-3 font-semibold text-xs">Cleat Fore-Aft Offset (Rear of 1st Metatarsal)</td>
          <td class="py-2.5 px-3 font-bold text-xs text-right">${m.cleatOffset} mm</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">+1.5° Varus Wedge Right</td>
        </tr>
        <tr>
          <td class="py-2.5 px-3 font-semibold text-xs">Crank Arm Length</td>
          <td class="py-2.5 px-3 font-bold text-xs text-right">${m.crankLength} mm</td>
          <td class="py-2.5 px-3 text-xs text-slate-500 text-right">Optimized Cadence Profile</td>
        </tr>
      `;
    }

    // Print trigger
    const printBtn = document.getElementById("printReportBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }
  }

  function initDashboardSidebar() {
    const sidebar = document.getElementById("dashboardSidebar");
    const backdrop = document.getElementById("dashboardSidebarBackdrop");
    const openButton = document.getElementById("mobileDashboardSidebarToggle");
    const closeButton = document.getElementById("closeDashboardSidebarBtn");
    if (!sidebar || !backdrop) return;

    const isMobile = () => window.matchMedia("(max-width: 1023px)").matches;
    const close = () => {
      sidebar.classList.add("closed");
      backdrop.classList.add("hidden");
      document.body.classList.remove("dashboard-sidebar-open");
      document.body.style.overflow = "";
      if (openButton) openButton.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      sidebar.classList.remove("closed");
      backdrop.classList.remove("hidden");
      document.body.classList.add("dashboard-sidebar-open");
      document.body.style.overflow = "hidden";
      if (openButton) openButton.setAttribute("aria-expanded", "true");
    };

    close();
    if (openButton) openButton.addEventListener("click", open);
    if (closeButton) closeButton.addEventListener("click", close);
    backdrop.addEventListener("click", close);
    sidebar.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", () => {
      if (isMobile()) close();
    }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isMobile() && document.body.classList.contains("dashboard-sidebar-open")) close();
    });
    window.addEventListener("resize", () => {
      if (!isMobile()) {
        backdrop.classList.add("hidden");
        document.body.classList.remove("dashboard-sidebar-open");
        document.body.style.overflow = "";
      } else if (sidebar.classList.contains("closed")) {
        backdrop.classList.add("hidden");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initDashboardSidebar();
    initDashboardOverview();
    initAppointmentsManager();
    initBikesManager();
    initFitHistoryComparison();
    initProfileAndSettings();
    initReportRenderer();
  });
})();
