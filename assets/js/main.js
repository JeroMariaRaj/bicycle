/**
 * VELOMETRIX - Core Application Script
 * Interactive UI components, Before/After Slider, Modals, Toasts & Global Helpers
 */

(function () {
  "use strict";

  // 1. Toast Notification System
  const VelometrixToast = {
    container: null,
    init() {
      if (!this.container) {
        this.container = document.createElement("div");
        this.container.id = "velometrix-toast-container";
        this.container.className = "fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none";
        document.body.appendChild(this.container);
      }
    },
    show(message, type = "success", duration = 4000) {
      this.init();
      const toast = document.createElement("div");
      toast.className = `pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border text-sm transition-all duration-300 transform translate-y-4 opacity-0 ${
        type === "success"
          ? "bg-slate-900 border-lime-500 text-white"
          : type === "error"
          ? "bg-slate-900 border-red-500 text-white"
          : type === "warning"
          ? "bg-slate-900 border-amber-500 text-white"
          : "bg-slate-900 border-sky-500 text-white"
      }`;

      const iconClass =
        type === "success"
          ? "bi bi-check-circle-fill text-lime-400 text-xl"
          : type === "error"
          ? "bi bi-x-circle-fill text-red-400 text-xl"
          : type === "warning"
          ? "bi bi-exclamation-triangle-fill text-amber-400 text-xl"
          : "bi bi-info-circle-fill text-sky-400 text-xl";

      toast.innerHTML = `
        <i class="${iconClass}"></i>
        <div class="flex-1 pt-0.5">
          <p class="font-medium text-slate-100">${message}</p>
        </div>
        <button class="text-slate-400 hover:text-white transition-colors p-1" aria-label="Dismiss toast">
          <i class="bi bi-x-lg"></i>
        </button>
      `;

      toast.querySelector("button").addEventListener("click", () => {
        toast.classList.add("opacity-0", "translate-y-4");
        setTimeout(() => toast.remove(), 300);
      });

      this.container.appendChild(toast);

      // Trigger enter animation
      requestAnimationFrame(() => {
        toast.classList.remove("translate-y-4", "opacity-0");
      });

      // Auto dismiss
      setTimeout(() => {
        if (toast.parentElement) {
          toast.classList.add("opacity-0", "translate-y-4");
          setTimeout(() => toast.remove(), 300);
        }
      }, duration);
    }
  };

  // 2. Modal Controller
  const VelometrixModal = {
    open(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Focus first input or button
      const focusable = modal.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      if (focusable) focusable.focus();
    },
    close(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  // 3. Before & After Comparison Slider
  function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll(".before-after-container");
    sliders.forEach((container) => {
      const beforeImgWrapper = container.querySelector(".before-image-wrapper");
      const beforeImg = beforeImgWrapper ? beforeImgWrapper.querySelector("img") : null;
      const handle = container.querySelector(".slider-handle");
      if (!beforeImgWrapper || !handle) return;

      function syncImageWidth() {
        if (beforeImg) {
          beforeImg.style.width = `${container.offsetWidth}px`;
          beforeImg.style.maxWidth = "none";
        }
      }
      syncImageWidth();
      window.addEventListener("resize", syncImageWidth, { passive: true });

      let isDown = false;

      function updateSlider(x) {
        const rect = container.getBoundingClientRect();
        let pos = ((x - rect.left) / rect.width) * 100;
        if (pos < 0) pos = 0;
        if (pos > 100) pos = 100;

        beforeImgWrapper.style.width = `${pos}%`;
        handle.style.left = `${pos}%`;
      }

      function onPointerMove(e) {
        if (!isDown) return;
        updateSlider(e.clientX);
      }

      function onPointerUp() {
        isDown = false;
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      }

      handle.addEventListener("pointerdown", (e) => {
        isDown = true;
        e.preventDefault();
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      });

      container.addEventListener("click", (e) => {
        updateSlider(e.clientX);
      });

      // Touch / mobile drag support
      handle.addEventListener("touchstart", () => { isDown = true; }, { passive: true });
      window.addEventListener("touchmove", (e) => {
        if (!isDown || !e.touches[0]) return;
        updateSlider(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener("touchend", () => { isDown = false; });

      // Keyboard arrow access
      handle.setAttribute("tabindex", "0");
      handle.setAttribute("role", "slider");
      handle.setAttribute("aria-label", "Comparison position");
      handle.addEventListener("keydown", (e) => {
        const current = parseFloat(beforeImgWrapper.style.width || "50");
        if (e.key === "ArrowLeft") {
          const next = Math.max(0, current - 5);
          beforeImgWrapper.style.width = `${next}%`;
          handle.style.left = `${next}%`;
        } else if (e.key === "ArrowRight") {
          const next = Math.min(100, current + 5);
          beforeImgWrapper.style.width = `${next}%`;
          handle.style.left = `${next}%`;
        }
      });
    });
  }

  // 4. Accordion Toggle
  function initAccordions() {
    document.querySelectorAll(".accordion-header").forEach((header) => {
      header.addEventListener("click", () => {
        const item = header.closest(".accordion-item");
        const body = item.querySelector(".accordion-body");
        const icon = header.querySelector(".accordion-icon");
        const isExpanded = header.getAttribute("aria-expanded") === "true";

        // Close other items in same accordion group if requested
        const parentAccordion = header.closest(".accordion-group");
        if (parentAccordion && !isExpanded) {
          parentAccordion.querySelectorAll(".accordion-header").forEach((otherH) => {
            if (otherH !== header) {
              otherH.setAttribute("aria-expanded", "false");
              const otherItem = otherH.closest(".accordion-item");
              const otherBody = otherItem.querySelector(".accordion-body");
              const otherIcon = otherH.querySelector(".accordion-icon");
              if (otherBody) otherBody.classList.add("hidden");
              if (otherIcon) otherIcon.classList.remove("rotate-180");
            }
          });
        }

        if (isExpanded) {
          header.setAttribute("aria-expanded", "false");
          body.classList.add("hidden");
          if (icon) icon.classList.remove("rotate-180");
        } else {
          header.setAttribute("aria-expanded", "true");
          body.classList.remove("hidden");
          if (icon) icon.classList.add("rotate-180");
        }
      });
    });
  }

  // 5. Sticky Header & Mobile Navigation
  function initNavigation() {
    const header = document.querySelector(".site-header");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }
      }, { passive: true });
    }

    // Mobile menu toggle
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu-drawer");
    const backdrop = document.querySelector(".mobile-menu-backdrop");
    const closeBtn = document.querySelector(".mobile-menu-close");

    function openMobileMenu() {
      if (mobileMenu) mobileMenu.classList.remove("translate-x-full", "-translate-x-full");
      if (backdrop) backdrop.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
      if (mobileMenu) {
        const isRtl = document.documentElement.getAttribute("dir") === "rtl";
        mobileMenu.classList.add(isRtl ? "-translate-x-full" : "translate-x-full");
      }
      if (backdrop) backdrop.classList.add("hidden");
      document.body.style.overflow = "";
    }

    if (mobileBtn) mobileBtn.addEventListener("click", openMobileMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMobileMenu);
    if (backdrop) backdrop.addEventListener("click", closeMobileMenu);

    // Mobile Menu Dropdown Accordion Toggle
    document.querySelectorAll(".mobile-dropdown-toggle").forEach((toggleBtn) => {
      toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const menu = this.nextElementSibling;
        const icon = this.querySelector(".bi-chevron-down");
        if (!menu) return;

        const isHidden = menu.classList.contains("hidden");
        if (isHidden) {
          menu.classList.remove("hidden");
          menu.classList.add("flex");
          this.setAttribute("aria-expanded", "true");
          if (icon) icon.classList.add("rotate-180");
        } else {
          menu.classList.add("hidden");
          menu.classList.remove("flex");
          this.setAttribute("aria-expanded", "false");
          if (icon) icon.classList.remove("rotate-180");
        }
      });
    });

    // Dynamic & Click-based Navbar Active Highlighting
    function updateActiveNavLinks() {
      const currentPath = window.location.pathname;
      let currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1).split("#")[0].split("?")[0] || "index.html";
      if (!currentPage || currentPage === "/") currentPage = "index.html";

      // Desktop Nav Links
      const desktopNav = document.querySelector(".site-header nav");
      if (desktopNav) {
        const navLinks = desktopNav.querySelectorAll("a:not(.btn-accent)");
        const homeBtn = desktopNav.querySelector(".relative button");

        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;
          const linkPage = href.substring(href.lastIndexOf("/") + 1).split("#")[0].split("?")[0];
          const isDashboardLink = href.includes("dashboard");
          const isCurrentDashboard = currentPath.includes("/dashboard");

          let isMatch = false;
          if (isDashboardLink) {
            isMatch = isCurrentDashboard;
          } else if (!isCurrentDashboard) {
            isMatch = (currentPage === linkPage) ||
              (linkPage === "services.html" && currentPage === "service-details.html") ||
              (linkPage === "blog.html" && currentPage === "blog-details.html") ||
              ((currentPage === "" || currentPage === "index.html") && linkPage === "index.html");
          }

          if (isMatch) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        // Highlight Home dropdown button if on index.html or home-2.html
        if (homeBtn) {
          const isCurrentDashboard = currentPath.includes("/dashboard");
          if (!isCurrentDashboard && (currentPage === "index.html" || currentPage === "home-2.html" || currentPage === "")) {
            homeBtn.classList.add("active");
          } else {
            homeBtn.classList.remove("active");
          }
        }
      }

      // Mobile Menu Drawer Links
      const mobileNav = document.querySelector(".mobile-menu-drawer nav");
      if (mobileNav) {
        const homeToggle = mobileNav.querySelector(".mobile-dropdown-toggle");
        const homeMenu = mobileNav.querySelector(".mobile-dropdown-menu");
        const homeIcon = homeToggle ? homeToggle.querySelector(".bi-chevron-down") : null;
        const isCurrentDashboard = currentPath.includes("/dashboard");

        mobileNav.querySelectorAll("a").forEach((link) => {
          const href = link.getAttribute("href");
          if (!href) return;
          const linkPage = href.substring(href.lastIndexOf("/") + 1).split("#")[0].split("?")[0];
          const isDashboardLink = href.includes("dashboard");

          let isMatch = false;
          if (isDashboardLink) {
            isMatch = isCurrentDashboard;
          } else if (!isCurrentDashboard) {
            isMatch = (currentPage === linkPage) ||
              (linkPage === "services.html" && currentPage === "service-details.html") ||
              (linkPage === "blog.html" && currentPage === "blog-details.html") ||
              ((currentPage === "" || currentPage === "index.html") && linkPage === "index.html");
          }

          if (isMatch) {
            link.classList.add("active");
            if (link.closest(".mobile-dropdown-menu")) {
              if (homeToggle) homeToggle.classList.add("active");
              if (homeMenu) {
                homeMenu.classList.remove("hidden");
                homeMenu.classList.add("flex");
                if (homeIcon) homeIcon.classList.add("rotate-180");
              }
            }
          } else {
            link.classList.remove("active");
          }
        });

        if (currentPage === "index.html" || currentPage === "home-2.html" || currentPage === "") {
          if (homeToggle) homeToggle.classList.add("active");
          if (homeMenu) {
            homeMenu.classList.remove("hidden");
            homeMenu.classList.add("flex");
            if (homeIcon) homeIcon.classList.add("rotate-180");
          }
        }
      }
    }

    updateActiveNavLinks();

    // Instant click highlight for navbar links
    document.querySelectorAll(".site-header nav a:not(.btn-accent), .mobile-menu-drawer nav a").forEach((link) => {
      link.addEventListener("click", function () {
        document.querySelectorAll(".site-header nav a, .site-header nav button, .mobile-menu-drawer nav a, .mobile-menu-drawer nav button").forEach((el) => {
          el.classList.remove("active");
        });
        this.classList.add("active");
        const desktopParentBtn = this.closest(".relative")?.querySelector("button");
        if (desktopParentBtn) desktopParentBtn.classList.add("active");
        const mobileParentBtn = this.closest(".mobile-dropdown")?.querySelector(".mobile-dropdown-toggle");
        if (mobileParentBtn) mobileParentBtn.classList.add("active");
      });
    });

    // Scroll to Top
    const scrollTopBtn = document.querySelector(".scroll-to-top");
    if (scrollTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
          scrollTopBtn.classList.remove("opacity-0", "pointer-events-none");
        } else {
          scrollTopBtn.classList.add("opacity-0", "pointer-events-none");
        }
      }, { passive: true });

      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Modal close triggers for both generated dialogs and dashboard overlays.
    document.querySelectorAll(".modal-close, [data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = btn.closest(".modal-backdrop, .modal-overlay");
        if (modal) VelometrixModal.close(modal.id);
      });
    });

    document.querySelectorAll(".modal-backdrop, .modal-overlay").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          VelometrixModal.close(backdrop.id);
        }
      });
    });

    // Close modal on ESC key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop:not(.hidden), .modal-overlay:not(.hidden)").forEach((m) => {
          VelometrixModal.close(m.id);
        });
        closeSubscribeModal();
        closeEnquiryModal();
        closeMobileMenu();
      }
    });
  }

  // Centered Modal Popups for Subscribe & Contact Enquiry
  function showSubscribeModal(email) {
    let modal = document.getElementById("subscribe-success-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "subscribe-success-modal";
      modal.className = "modal-backdrop fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = `
        <div class="modal-dialog bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl relative transform transition-all duration-300 scale-95 opacity-0">
          <button type="button" class="close-subscribe-modal absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors" aria-label="Close">
            <i class="bi bi-x-lg text-xs"></i>
          </button>
          
          <div class="w-16 h-16 rounded-2xl bg-lime-400/20 text-lime-600 dark:text-brand-accent text-3xl flex items-center justify-center mx-auto mb-4 border border-lime-400/40 shadow-lg">
            <i class="bi bi-envelope-check-fill"></i>
          </div>

          <span class="inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-lime-400/20 text-lime-700 dark:text-brand-accent border border-lime-400/30 uppercase tracking-wider mb-2">
            VELOMETRIX SCIENTIFIC BULLETIN
          </span>

          <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Subscription Confirmed!
          </h3>

          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
            Welcome to the lab newsletter. We've registered <strong class="text-slate-900 dark:text-white subscriber-email-display"></strong>. You will receive our monthly peer-reviewed cycling biomechanics studies, CdA wind-tunnel case studies, and lab clinic announcements.
          </p>

          <div class="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 text-xs text-left mb-6 flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg bg-lime-400/20 text-lime-600 dark:text-brand-accent flex items-center justify-center flex-shrink-0 text-base">
              <i class="bi bi-file-earmark-pdf-fill"></i>
            </div>
            <div>
              <span class="font-bold text-slate-900 dark:text-white block">Complimentary Whitepaper Dispatched</span>
              <span class="text-slate-500 dark:text-slate-400 text-[11px]">"Preventing Anterior Knee Pain: A Biomechanical Guide to KOPS" has been delivered to your email.</span>
            </div>
          </div>

          <button type="button" class="close-subscribe-modal btn-accent w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold shadow-lg flex items-center justify-center gap-1.5">
            <span>Continue Exploring</span>
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelectorAll(".close-subscribe-modal").forEach((btn) => {
        btn.addEventListener("click", () => closeSubscribeModal());
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeSubscribeModal();
      });
    }

    const emailDisplay = modal.querySelector(".subscriber-email-display");
    if (emailDisplay) emailDisplay.textContent = email;

    document.body.style.overflow = "hidden";
    modal.classList.remove("hidden");
    const dialog = modal.querySelector(".modal-dialog");
    requestAnimationFrame(() => {
      dialog.classList.remove("scale-95", "opacity-0");
      dialog.classList.add("scale-100", "opacity-100");
    });
  }

  function closeSubscribeModal() {
    const modal = document.getElementById("subscribe-success-modal");
    if (!modal) return;
    const dialog = modal.querySelector(".modal-dialog");
    if (dialog) {
      dialog.classList.remove("scale-100", "opacity-100");
      dialog.classList.add("scale-95", "opacity-0");
    }
    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }, 200);
  }

  function showEnquiryModal(data) {
    let modal = document.getElementById("enquiry-success-modal");
    const refId = "VMX-" + Math.floor(1000 + Math.random() * 9000);

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "enquiry-success-modal";
      modal.className = "modal-backdrop fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML = `
        <div class="modal-dialog bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl relative transform transition-all duration-300 scale-95 opacity-0">
          <button type="button" class="close-enquiry-modal absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors" aria-label="Close">
            <i class="bi bi-x-lg text-xs"></i>
          </button>
          
          <div class="w-16 h-16 rounded-2xl bg-lime-400/20 text-lime-600 dark:text-brand-accent text-3xl flex items-center justify-center mx-auto mb-4 border border-lime-400/40 shadow-lg">
            <i class="bi bi-shield-check"></i>
          </div>

          <span class="enquiry-ref-badge inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-lime-400/20 text-lime-700 dark:text-brand-accent border border-lime-400/30 uppercase tracking-wider mb-2">
            STATUS: LOGGED // REF #${refId}
          </span>

          <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Lab Enquiry Transmitted!
          </h3>

          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
            Thank you, <strong class="enquiry-name-display text-slate-900 dark:text-white"></strong>. Your consultation details have been securely transmitted to our sports science department. A clinical biomechanist will review your notes and contact you within 24 hours.
          </p>

          <div class="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 text-left text-xs space-y-2.5 mb-6">
            <div class="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Service Requested:</span>
              <strong class="enquiry-service-display text-slate-900 dark:text-white text-right max-w-[220px] truncate"></strong>
            </div>
            <div class="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Discipline:</span>
              <strong class="enquiry-discipline-display text-slate-900 dark:text-white"></strong>
            </div>
            <div class="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Client Email:</span>
              <strong class="enquiry-email-display text-slate-900 dark:text-white"></strong>
            </div>
            <div class="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Facility Bay:</span>
              <span class="font-bold text-lime-600 dark:text-brand-accent">Boulder Lab Bay 2</span>
            </div>
            <div class="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>Guaranteed Response:</span>
              <span class="font-bold text-slate-800 dark:text-slate-200">&lt; 24 Business Hours</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-3">
            <button type="button" class="close-enquiry-modal w-full sm:flex-1 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors">
              Close Window
            </button>
            <a href="login.html" class="w-full sm:flex-1 py-3.5 rounded-xl btn-accent text-xs font-extrabold uppercase tracking-wider text-center block shadow-lg">
              Book Direct Slot <i class="bi bi-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelectorAll(".close-enquiry-modal").forEach((btn) => {
        btn.addEventListener("click", () => closeEnquiryModal());
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeEnquiryModal();
      });
    }

    const refBadge = modal.querySelector(".enquiry-ref-badge");
    if (refBadge) refBadge.textContent = `STATUS: LOGGED // REF #${refId}`;

    const nameEl = modal.querySelector(".enquiry-name-display");
    if (nameEl) nameEl.textContent = data.name;

    const emailEl = modal.querySelector(".enquiry-email-display");
    if (emailEl) emailEl.textContent = data.email;

    const serviceEl = modal.querySelector(".enquiry-service-display");
    if (serviceEl) serviceEl.textContent = data.service;

    const discEl = modal.querySelector(".enquiry-discipline-display");
    if (discEl) discEl.textContent = data.discipline;

    document.body.style.overflow = "hidden";
    modal.classList.remove("hidden");
    const dialog = modal.querySelector(".modal-dialog");
    requestAnimationFrame(() => {
      dialog.classList.remove("scale-95", "opacity-0");
      dialog.classList.add("scale-100", "opacity-100");
    });
  }

  function closeEnquiryModal() {
    const modal = document.getElementById("enquiry-success-modal");
    if (!modal) return;
    const dialog = modal.querySelector(".modal-dialog");
    if (dialog) {
      dialog.classList.remove("scale-100", "opacity-100");
      dialog.classList.add("scale-95", "opacity-0");
    }
    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    }, 200);
  }

  // 6. Global Newsletter Form Handling
  function initNewsletters() {
    document.querySelectorAll("form.newsletter-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = form.querySelector("input[type='email']");
        const email = emailInput ? emailInput.value.trim() : "";
        if (!email || !email.includes("@")) {
          VelometrixToast.show("Please enter a valid email address.", "error");
          return;
        }
        
        showSubscribeModal(email);
        form.reset();
      });
    });
  }

  // 7. Contact Form Handling
  function initContactForms() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (window.VelometrixValidation && !window.VelometrixValidation.validateForm(contactForm)) {
          VelometrixToast.show("Please correct the highlighted fields.", "error");
          return;
        }

        const nameInput = document.getElementById("contactFullName");
        const emailInput = document.getElementById("contactEmail");
        const serviceSelect = document.getElementById("contactServiceEnquiry");
        const disciplineSelect = document.getElementById("contactBikeCategory");
        const messageInput = document.getElementById("contactMessage");

        const formData = {
          name: nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Valued Cyclist",
          email: emailInput && emailInput.value.trim() ? emailInput.value.trim() : "client@domain.com",
          service: serviceSelect && serviceSelect.value ? serviceSelect.value : "Dynamic Bike Fitting Consultation",
          discipline: disciplineSelect && disciplineSelect.value ? disciplineSelect.value : "Road / Endurance",
          message: messageInput ? messageInput.value.trim() : ""
        };

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalText = submitBtn ? submitBtn.innerHTML : "";
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span class="inline-block animate-spin mr-2"><i class="bi bi-arrow-repeat"></i></span> Transmitting...`;
        }

        setTimeout(() => {
          showEnquiryModal(formData);
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }, 700);
      });
    }
  }

  // 8. Demo User Authentication State Check
  function initDemoAuthBadge() {
    const isLogged = localStorage.getItem("velometrix_logged_in") === "true";
    document.querySelectorAll(".auth-dependent-login").forEach((el) => {
      el.style.display = isLogged ? "none" : "";
    });
    document.querySelectorAll(".auth-dependent-dashboard").forEach((el) => {
      el.style.display = isLogged ? "" : "none";
    });
  }

  // Initialize on DOM load
  document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initBeforeAfterSliders();
    initAccordions();
    initNewsletters();
    initContactForms();
    initDemoAuthBadge();
  });

  window.VelometrixToast = VelometrixToast;
  window.VelometrixModal = VelometrixModal;
})();
