/**
 * VELOMETRIX - Performance Analytics & Dashboard Charts
 * Chart.js visualizations for Knee Angle Progression, Cockpit Adjustments,
 * Pedaling Efficiency & Biomechanical Radar.
 */

(function () {
  "use strict";

  const chartInstances = {};

  function getThemeColors() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark" || document.documentElement.classList.contains("dark");
    return {
      textColor: isDark ? "#94A3B8" : "#475569",
      gridColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
      limeAccent: "#B7E64A",
      limeGlow: "rgba(183, 230, 74, 0.2)",
      skyAccent: "#38BDF8",
      skyGlow: "rgba(56, 189, 248, 0.2)",
      navyCard: isDark ? "#16222F" : "#FFFFFF"
    };
  }

  // 1. Dashboard Overview Mini Chart
  function initOverviewChart() {
    const canvas = document.getElementById("overviewKneeTrendChart");
    if (!canvas || !window.Chart) return;

    const colors = getThemeColors();
    const fitHistory = Storage.get("fitHistory", DEFAULT_FIT_HISTORY);
    // Reverse to chronological
    const sorted = [...fitHistory].reverse();

    const labels = sorted.map((s) => s.sessionDate);
    const kneeData = sorted.map((s) => s.measurements.kneeAngle);

    if (chartInstances.overviewKnee) {
      chartInstances.overviewKnee.destroy();
    }

    chartInstances.overviewKnee = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Dynamic Knee Flexion (°)",
            data: kneeData,
            borderColor: colors.limeAccent,
            backgroundColor: colors.limeGlow,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: colors.limeAccent,
            pointBorderColor: "#101D2C",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#101D2C",
            titleColor: "#FFFFFF",
            bodyColor: colors.limeAccent,
            borderColor: colors.limeAccent,
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => `Knee Angle: ${ctx.parsed.y}° (Optimal: 35°-38°)`
            }
          }
        },
        scales: {
          x: {
            grid: { color: colors.gridColor },
            ticks: { color: colors.textColor, font: { size: 11 } }
          },
          y: {
            min: 30,
            max: 45,
            grid: { color: colors.gridColor },
            ticks: {
              color: colors.textColor,
              font: { size: 11 },
              callback: (v) => `${v}°`
            }
          }
        }
      }
    });
  }

  // 2. Full Analytics Page Visualizations
  function initAnalyticsCharts() {
    if (!window.Chart) return;
    const colors = getThemeColors();
    const fitHistory = Storage.get("fitHistory", DEFAULT_FIT_HISTORY);
    const sorted = [...fitHistory].reverse();

    // Chart A: Knee Angle & Target Band
    const kneeCanvas = document.getElementById("analyticsKneeChart");
    if (kneeCanvas) {
      if (chartInstances.analyticsKnee) chartInstances.analyticsKnee.destroy();
      chartInstances.analyticsKnee = new Chart(kneeCanvas, {
        type: "line",
        data: {
          labels: sorted.map((s) => `${s.sessionDate} (${s.bikeName.split(" ")[0]})`),
          datasets: [
            {
              label: "Measured Angle",
              data: sorted.map((s) => s.measurements.kneeAngle),
              borderColor: colors.limeAccent,
              backgroundColor: colors.limeGlow,
              borderWidth: 3,
              tension: 0.3,
              fill: true,
              pointRadius: 6
            },
            {
              label: "Ideal Target Upper (38°)",
              data: sorted.map(() => 38),
              borderColor: "#10B981",
              borderDash: [5, 5],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            },
            {
              label: "Ideal Target Lower (35°)",
              data: sorted.map(() => 35),
              borderColor: "#10B981",
              borderDash: [5, 5],
              borderWidth: 1.5,
              pointRadius: 0,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: colors.textColor, font: { size: 12 } }
            }
          },
          scales: {
            x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } },
            y: {
              min: 30,
              max: 46,
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor, callback: (v) => `${v}°` }
            }
          }
        }
      });
    }

    // Chart B: Saddle Height vs Cockpit Reach
    const cockpitCanvas = document.getElementById("analyticsCockpitChart");
    if (cockpitCanvas) {
      if (chartInstances.analyticsCockpit) chartInstances.analyticsCockpit.destroy();
      chartInstances.analyticsCockpit = new Chart(cockpitCanvas, {
        type: "bar",
        data: {
          labels: sorted.map((s) => s.sessionDate),
          datasets: [
            {
              label: "Saddle Height (mm)",
              data: sorted.map((s) => s.measurements.saddleHeight),
              backgroundColor: colors.skyAccent,
              borderRadius: 6
            },
            {
              label: "Handlebar Reach (mm)",
              data: sorted.map((s) => s.measurements.handlebarReach),
              backgroundColor: colors.limeAccent,
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: colors.textColor } }
          },
          scales: {
            x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } },
            y: {
              min: 450,
              max: 800,
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor, callback: (v) => `${v}mm` }
            }
          }
        }
      });
    }

    // Chart C: Pedaling Efficiency (Left/Right Balance)
    const pedalingCanvas = document.getElementById("analyticsPedalingChart");
    if (pedalingCanvas) {
      if (chartInstances.analyticsPedaling) chartInstances.analyticsPedaling.destroy();
      chartInstances.analyticsPedaling = new Chart(pedalingCanvas, {
        type: "line",
        data: {
          labels: ["Jan 2026", "Apr 2026", "Jun 2026", "Aug 2026", "Oct 2026"],
          datasets: [
            {
              label: "Left Leg Balance %",
              data: [54, 52.5, 51.2, 50.4, 50.1],
              borderColor: colors.skyAccent,
              backgroundColor: colors.skyGlow,
              borderWidth: 2,
              tension: 0.3,
              fill: false
            },
            {
              label: "Right Leg Balance %",
              data: [46, 47.5, 48.8, 49.6, 49.9],
              borderColor: colors.limeAccent,
              backgroundColor: colors.limeGlow,
              borderWidth: 2,
              tension: 0.3,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: colors.textColor } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}% (Target: 50.0%)`
              }
            }
          },
          scales: {
            x: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } },
            y: {
              min: 44,
              max: 56,
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor, callback: (v) => `${v}%` }
            }
          }
        }
      });
    }

    // Chart D: Biomechanical Radar
    const radarCanvas = document.getElementById("analyticsRadarChart");
    if (radarCanvas) {
      if (chartInstances.analyticsRadar) chartInstances.analyticsRadar.destroy();
      chartInstances.analyticsRadar = new Chart(radarCanvas, {
        type: "radar",
        data: {
          labels: ["Lumbar Comfort", "Aerodynamic Efficiency", "Knee Tracking", "Pelvic Stability", "Pedal Smoothness", "Thoracic Relief"],
          datasets: [
            {
              label: "Initial Fit (Jan 2026)",
              data: [65, 70, 68, 60, 72, 64],
              borderColor: "#64748B",
              backgroundColor: "rgba(100, 116, 139, 0.2)",
              borderWidth: 2
            },
            {
              label: "Current Optimized Fit",
              data: [94, 91, 96, 92, 88, 95],
              borderColor: colors.limeAccent,
              backgroundColor: colors.limeGlow,
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: colors.textColor } }
          },
          scales: {
            r: {
              angleLines: { color: colors.gridColor },
              grid: { color: colors.gridColor },
              pointLabels: { color: colors.textColor, font: { size: 11, weight: "600" } },
              ticks: { display: false, min: 40, max: 100 }
            }
          }
        }
      });
    }
  }

  function refreshAllCharts() {
    initOverviewChart();
    initAnalyticsCharts();
  }

  document.addEventListener("DOMContentLoaded", refreshAllCharts);
  window.addEventListener("velometrix_theme_changed", refreshAllCharts);
})();
