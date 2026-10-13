/**
 * VELOMETRIX - Theme & RTL Controller
 * Handles Light/Dark Mode and LTR/RTL Layout Switching
 */

(function () {
  "use strict";

  const THEME_KEY = "velometrix_theme_v2";
  const DIR_KEY = "velometrix_dir";

  // 1. Initial Theme Application
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Clean legacy dark-mode locks if user didn't explicitly set them
    if (localStorage.getItem("velometrix_theme") === "dark" && !sessionStorage.getItem("velometrix_explicit_dark")) {
      localStorage.removeItem("velometrix_theme");
    }
    // Default to clean Light Mode with pure white navbar
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      sessionStorage.setItem("velometrix_explicit_dark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      sessionStorage.removeItem("velometrix_explicit_dark");
    }
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem("velometrix_theme", theme);

    // Update all theme toggle buttons across the page
    document.querySelectorAll(".theme-toggle-btn, #themeToggleBtn").forEach((btn) => {
      // Clean up any extra icons (e.g. legacy duplicate <i> tags)
      const allIcons = btn.querySelectorAll("i");
      if (allIcons.length > 1) {
        for (let idx = 1; idx < allIcons.length; idx++) {
          allIcons[idx].remove();
        }
      }
      let icon = btn.querySelector("i");
      if (!icon) {
        icon = document.createElement("i");
        btn.appendChild(icon);
      }
      if (theme === "dark") {
        icon.className = "bi bi-sun-fill text-amber-400";
        btn.setAttribute("aria-label", "Switch to light mode");
        btn.setAttribute("title", "Switch to light mode");
      } else {
        icon.className = "bi bi-moon-stars-fill text-slate-700";
        btn.setAttribute("aria-label", "Switch to dark mode");
        btn.setAttribute("title", "Switch to dark mode");
      }
    });

    window.dispatchEvent(new CustomEvent("velometrix_theme_changed", { detail: { theme } }));
  }

  // 2. Initial RTL Application
  function getPreferredDir() {
    return localStorage.getItem(DIR_KEY) || "ltr";
  }

  function applyDir(dir) {
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem(DIR_KEY, dir);

    document.querySelectorAll(".rtl-toggle-btn, #rtlToggleBtn").forEach((btn) => {
      const textSpan = btn.querySelector(".rtl-status-text");
      if (textSpan) {
        textSpan.textContent = dir === "rtl" ? "LTR" : "RTL";
      } else {
        btn.textContent = dir === "rtl" ? "LTR" : "RTL";
      }
      btn.setAttribute("aria-label", dir === "rtl" ? "Switch to Left-to-Right" : "Switch to Right-to-Left (Demo)");
      btn.setAttribute("title", dir === "rtl" ? "Switch to Left-to-Right" : "Switch to Right-to-Left (Demo)");
    });

    window.dispatchEvent(new CustomEvent("velometrix_dir_changed", { detail: { dir } }));
  }

  // Initialize immediately before page render to avoid flash of wrong theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  const initialDir = getPreferredDir();
  applyDir(initialDir);

  // Setup DOM event listeners on load
  document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle buttons
    document.querySelectorAll(".theme-toggle-btn, #themeToggleBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });

    // RTL toggle buttons
    document.querySelectorAll(".rtl-toggle-btn, #rtlToggleBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const current = document.documentElement.getAttribute("dir") || "ltr";
        const next = current === "rtl" ? "ltr" : "rtl";
        applyDir(next);
      });
    });

    // Listen to OS theme changes if user hasn't explicitly set preference
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    }
  });

  // Expose global controller
  window.VelometrixTheme = {
    getTheme: () => document.documentElement.getAttribute("data-theme") || "light",
    setTheme: applyTheme,
    toggleTheme: () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    },
    getDir: () => document.documentElement.getAttribute("dir") || "ltr",
    setDir: applyDir,
    toggleDir: () => {
      const current = document.documentElement.getAttribute("dir") || "ltr";
      applyDir(current === "rtl" ? "ltr" : "rtl");
    }
  };
})();
