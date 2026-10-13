/**
 * VELOMETRIX - Frontend Routing & Dynamic Page Hydration
 * Renders individual Service Details and Blog Details via query parameters
 * Handles catalog category filtering & instant search
 */

(function () {
  "use strict";

  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // 1. Service Details Page Dynamic Renderer
  function renderServiceDetails() {
    const container = document.getElementById("service-details-app");
    if (!container) return;

    const requestedId = getUrlParam("id") || "3d-motion-fit";
    const service = VELOMETRIX_SERVICES.find((s) => s.id === requestedId) || VELOMETRIX_SERVICES[0];
    const specialist = VELOMETRIX_SPECIALISTS.find((sp) => sp.id === service.specialistId) || VELOMETRIX_SPECIALISTS[0];

    // Page title and breadcrumb
    document.title = `${service.title} | VELOMETRIX Performance Lab`;
    const titleEls = document.querySelectorAll(".dynamic-service-title");
    titleEls.forEach((el) => (el.textContent = service.title));

    const catEls = document.querySelectorAll(".dynamic-service-category");
    catEls.forEach((el) => (el.textContent = service.category));

    const durationEls = document.querySelectorAll(".dynamic-service-duration");
    durationEls.forEach((el) => (el.textContent = service.duration));

    const priceEls = document.querySelectorAll(".dynamic-service-price");
    priceEls.forEach((el) => (el.textContent = `$${service.price}`));

    const badgeEls = document.querySelectorAll(".dynamic-service-badge");
    badgeEls.forEach((el) => (el.textContent = service.badge));

    // Images
    const imgEl = document.getElementById("service-hero-img");
    if (imgEl) {
      imgEl.src = service.image;
      imgEl.alt = `${service.title} session at VELOMETRIX studio`;
    }

    // Overview & Descriptions
    const descEl = document.getElementById("service-short-desc");
    if (descEl) descEl.textContent = service.shortDesc;

    const overviewEl = document.getElementById("service-overview");
    if (overviewEl) overviewEl.textContent = service.overview;

    // Who it's for list
    const whoList = document.getElementById("service-who-list");
    if (whoList) {
      whoList.innerHTML = service.whoItsFor
        .map(
          (item) => `
        <li class="flex items-start gap-3">
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-lime-400/20 text-lime-400 mt-0.5 text-xs flex-shrink-0">
            <i class="bi bi-check-lg"></i>
          </span>
          <span class="text-slate-600 dark:text-slate-300">${item}</span>
        </li>
      `
        )
        .join("");
    }

    // Technology list
    const techList = document.getElementById("service-tech-list");
    if (techList) {
      techList.innerHTML = service.techUsed
        .map(
          (tech) => `
        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
            <i class="bi bi-cpu-fill"></i>
          </div>
          <span class="font-medium text-sm text-slate-800 dark:text-slate-200">${tech}</span>
        </div>
      `
        )
        .join("");
    }

    // Step-by-step Procedure
    const procContainer = document.getElementById("service-procedure-steps");
    if (procContainer) {
      procContainer.innerHTML = service.procedureSteps
        .map(
          (step) => `
        <div class="relative pl-12 pb-8 last:pb-0 border-l border-slate-200 dark:border-slate-800">
          <div class="absolute -left-4 top-0 w-8 h-8 rounded-full bg-brand-primary dark:bg-slate-800 border-2 border-lime-400 text-lime-400 text-xs font-bold flex items-center justify-center">
            ${step.step}
          </div>
          <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">${step.title}</h4>
          <p class="text-sm text-slate-600 dark:text-slate-400">${step.desc}</p>
        </div>
      `
        )
        .join("");
    }

    // Expected Outcomes
    const outcomeList = document.getElementById("service-outcomes-list");
    if (outcomeList) {
      outcomeList.innerHTML = service.expectedOutcomes
        .map(
          (outcome) => `
        <div class="flex items-start gap-3 p-3.5 rounded-xl bg-lime-500/5 dark:bg-lime-500/10 border border-lime-500/20">
          <i class="bi bi-shield-check text-lime-500 text-lg flex-shrink-0"></i>
          <span class="text-sm text-slate-700 dark:text-slate-200 font-medium">${outcome}</span>
        </div>
      `
        )
        .join("");
    }

    // Pricing Packages
    const pkgContainer = document.getElementById("service-pricing-packages");
    if (pkgContainer) {
      pkgContainer.innerHTML = service.pricingPackages
        .map(
          (pkg, idx) => `
        <div class="p-6 rounded-2xl border ${
          idx === 0
            ? "border-lime-400 bg-slate-900 text-white relative shadow-xl"
            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white"
        }">
          ${idx === 0 ? '<span class="absolute -top-3 right-6 bg-lime-400 text-brand-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">Recommended</span>' : ""}
          <h4 class="text-lg font-bold mb-2 ${idx === 0 ? "text-white" : "text-slate-900 dark:text-white"}">${pkg.name}</h4>
          <div class="flex items-baseline gap-1 mb-4">
            <span class="text-3xl font-extrabold text-lime-400">$${pkg.price}</span>
            <span class="text-xs ${idx === 0 ? "text-slate-400" : "text-slate-500 dark:text-slate-400"} font-medium">/ session</span>
          </div>
          <ul class="space-y-2.5 text-xs ${idx === 0 ? "text-slate-300" : "text-slate-600 dark:text-slate-300"} mb-6">
            ${pkg.features.map((f) => `<li class="flex items-center gap-2"><i class="bi bi-check2 text-lime-400"></i> ${f}</li>`).join("")}
          </ul>
          <a href="login.html" class="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm ${
            idx === 0 ? "bg-lime-400 text-brand-primary hover:bg-lime-300" : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200"
          } transition-all">
            Book Package <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      `
        )
        .join("");
    }

    // Preparation Guidance
    const prepEl = document.getElementById("service-prep-guidance");
    if (prepEl) prepEl.textContent = service.prepGuidance;

    // Specialist Info
    const specContainer = document.getElementById("service-specialist-card");
    if (specContainer) {
      specContainer.innerHTML = `
        <div class="flex flex-col sm:flex-row items-center gap-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70">
          <img src="${specialist.image}" alt="${specialist.name}" class="w-24 h-32 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div>
            <div class="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-lime-400/20 text-lime-500 dark:text-lime-400 mb-1">Assigned Fitter</div>
            <h4 class="text-xl font-bold text-slate-900 dark:text-white">${specialist.name}</h4>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">${specialist.role}</p>
            <p class="text-xs text-slate-600 dark:text-slate-300 mb-3">${specialist.bio}</p>
            <div class="text-xs font-medium text-slate-400">${specialist.certifications}</div>
          </div>
        </div>
      `;
    }

    // FAQs
    const faqContainer = document.getElementById("service-faqs-accordion");
    if (faqContainer) {
      faqContainer.innerHTML = service.faqs
        .map(
          (faq, idx) => `
        <div class="accordion-item border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-3">
          <button class="accordion-header w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" aria-expanded="${
            idx === 0 ? "true" : "false"
          }">
            <span class="pr-4 text-sm sm:text-base">${faq.q}</span>
            <i class="bi bi-chevron-down accordion-icon text-slate-400 transition-transform duration-300 ${idx === 0 ? "rotate-180" : ""}"></i>
          </button>
          <div class="accordion-body p-4 text-sm text-slate-600 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800 ${
            idx === 0 ? "" : "hidden"
          }">
            ${faq.a}
          </div>
        </div>
      `
        )
        .join("");
    }

    // Related Services
    const relatedContainer = document.getElementById("service-related-grid");
    if (relatedContainer) {
      const related = VELOMETRIX_SERVICES.filter((s) => s.id !== service.id).slice(0, 3);
      relatedContainer.innerHTML = related
        .map(
          (rel) => `
        <div class="service-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div class="relative aspect-[4/3] overflow-hidden">
            <img src="${rel.image}" alt="${rel.title}" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 bg-brand-primary/90 text-lime-400 text-xs font-bold px-2.5 py-1 rounded-md border border-lime-400/30">${rel.category}</span>
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span><i class="bi bi-clock mr-1"></i> ${rel.duration}</span>
              <span class="text-lime-500 font-bold">$${rel.price}</span>
            </div>
            <h4 class="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">${rel.title}</h4>
            <p class="text-xs text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">${rel.shortDesc}</p>
            <a href="service-details.html?id=${rel.id}" class="text-xs font-bold text-lime-500 dark:text-lime-400 hover:underline inline-flex items-center gap-1">
              Explore Details <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      `
        )
        .join("");
    }

    // Direct booking CTA link
    const bookCta = document.getElementById("service-direct-book-btn");
    if (bookCta) {
      bookCta.href = "login.html";
    }
  }

  // 2. Blog Details Page Dynamic Renderer
  function renderBlogDetails() {
    const container = document.getElementById("blog-details-app");
    if (!container) return;

    const requestedId = getUrlParam("id") || "preventing-anterior-knee-pain";
    const article = VELOMETRIX_ARTICLES.find((a) => a.id === requestedId) || VELOMETRIX_ARTICLES[0];

    document.title = `${article.title} | VELOMETRIX Cycling Lab`;

    // Title and Meta
    const titleEl = document.getElementById("article-title");
    if (titleEl) titleEl.textContent = article.title;

    const catEl = document.getElementById("article-category");
    if (catEl) catEl.textContent = article.category;

    const dateEl = document.getElementById("article-date");
    if (dateEl) dateEl.textContent = article.date;

    const timeEl = document.getElementById("article-read-time");
    if (timeEl) timeEl.textContent = article.readTime;

    const authorEl = document.getElementById("article-author");
    if (authorEl) authorEl.textContent = article.author;

    const authorRoleEl = document.getElementById("article-author-role");
    if (authorRoleEl) authorRoleEl.textContent = article.authorRole;

    const heroImg = document.getElementById("article-hero-img");
    if (heroImg) {
      heroImg.src = article.image;
      heroImg.alt = article.title;
    }

    // Table of Contents
    const tocContainer = document.getElementById("article-toc");
    if (tocContainer && article.toc) {
      tocContainer.innerHTML = article.toc
        .map(
          (item) => `
        <li>
          <a href="#${item.id}" class="text-xs text-slate-600 dark:text-slate-400 hover:text-lime-500 dark:hover:text-lime-400 transition-colors block py-1 border-l-2 border-transparent hover:border-lime-400 pl-3">
            ${item.title}
          </a>
        </li>
      `
        )
        .join("");
    }

    // Article Content HTML
    const contentContainer = document.getElementById("article-content-body");
    if (contentContainer) {
      contentContainer.innerHTML = article.contentHtml;
    }

    // Tags
    const tagsContainer = document.getElementById("article-tags");
    if (tagsContainer && article.tags) {
      tagsContainer.innerHTML = article.tags
        .map(
          (tag) => `
        <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          #${tag}
        </span>
      `
        )
        .join("");
    }

    // Social Share Links
    const shareX = document.getElementById("article-share-x");
    if (shareX) {
      shareX.href = `https://x.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`;
    }
    const shareLinkedIn = document.getElementById("article-share-linkedin");
    if (shareLinkedIn) {
      shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    }

    // Related Posts
    const relatedContainer = document.getElementById("article-related-posts");
    if (relatedContainer) {
      const related = VELOMETRIX_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);
      relatedContainer.innerHTML = related
        .map(
          (rel) => `
        <div class="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 transition-all hover:shadow-lg">
          <div class="aspect-[16/10] overflow-hidden">
            <img src="${rel.image}" alt="${rel.title}" class="w-full h-full object-cover">
          </div>
          <div class="p-4">
            <span class="text-xs font-semibold text-lime-500">${rel.category}</span>
            <h4 class="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2">
              <a href="blog-details.html?id=${rel.id}" class="hover:underline">${rel.title}</a>
            </h4>
            <div class="text-xs text-slate-500 dark:text-slate-400">${rel.readTime}</div>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  // 3. Services Catalog Filtering & Live Search
  function initServicesCatalog() {
    const catalogGrid = document.getElementById("services-catalog-grid");
    if (!catalogGrid) return;

    const filterBtns = document.querySelectorAll(".service-filter-btn");
    const searchInput = document.getElementById("serviceSearchInput");
    let activeCategory = "all";
    let searchQuery = "";

    function renderFilteredServices() {
      const filtered = VELOMETRIX_SERVICES.filter((service) => {
        const matchesCategory = activeCategory === "all" || service.categorySlug === activeCategory;
        const matchesSearch =
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        catalogGrid.innerHTML = `
          <div class="col-span-full py-16 text-center">
            <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4 text-2xl">
              <i class="bi bi-search"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">No Matching Services Found</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Try modifying your search term or selecting another service category.</p>
          </div>
        `;
        return;
      }

      catalogGrid.innerHTML = filtered
        .map(
          (service) => `
        <div class="service-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden bg-slate-900">
            <img src="${service.image}" alt="${service.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
            <span class="absolute top-3 left-3 bg-brand-primary/90 text-lime-400 text-xs font-bold px-3 py-1 rounded-md border border-lime-400/30">
              ${service.category}
            </span>
            ${
              service.badge
                ? `<span class="absolute top-3 right-3 bg-lime-400 text-brand-primary text-xs font-bold px-2.5 py-0.5 rounded shadow">
                    ${service.badge}
                   </span>`
                : ""
            }
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span class="flex items-center gap-1.5"><i class="bi bi-clock-history text-lime-500"></i> ${service.duration}</span>
              <span class="text-lg font-extrabold text-slate-900 dark:text-white">$${service.price}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
              <a href="service-details.html?id=${service.id}" class="hover:text-lime-500 dark:hover:text-lime-400 transition-colors">
                ${service.title}
              </a>
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-2 flex-1">
              ${service.shortDesc}
            </p>
            <div class="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
              <a href="service-details.html?id=${service.id}" class="flex-1 py-2.5 px-3 text-center text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                View Details
              </a>
              <a href="login.html" class="flex-1 py-2.5 px-3 text-center text-xs font-bold rounded-xl bg-lime-400 text-brand-primary hover:bg-lime-300 transition-colors shadow">
                Book Fit
              </a>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => {
          b.classList.remove("active", "bg-lime-400", "text-brand-primary");
          b.classList.add("bg-white", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
        });
        btn.classList.add("active", "bg-lime-400", "text-brand-primary");
        btn.classList.remove("bg-white", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
        activeCategory = btn.dataset.category;
        renderFilteredServices();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderFilteredServices();
      });
    }

    renderFilteredServices();
  }

  // 4. Blog Catalog Filtering & Live Search
  function initBlogCatalog() {
    const blogGrid = document.getElementById("blog-catalog-grid");
    if (!blogGrid) return;

    const filterBtns = document.querySelectorAll(".blog-filter-btn");
    const searchInput = document.getElementById("blogSearchInput");
    let activeCategory = "all";
    let searchQuery = "";

    function renderFilteredArticles() {
      const filtered = VELOMETRIX_ARTICLES.filter((article) => {
        const matchesCategory = activeCategory === "all" || article.category.toLowerCase() === activeCategory.toLowerCase();
        const matchesSearch =
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        blogGrid.innerHTML = `
          <div class="col-span-full py-16 text-center">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">No Articles Found</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Try searching with a different keyword.</p>
          </div>
        `;
        return;
      }

      blogGrid.innerHTML = filtered
        .map(
          (article) => `
        <article class="article-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-900">
            <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
            <span class="absolute top-3 left-3 bg-brand-primary/90 text-lime-400 text-xs font-bold px-3 py-1 rounded-md border border-lime-400/30">
              ${article.category}
            </span>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span><i class="bi bi-calendar3 mr-1"></i> ${article.date}</span>
              <span>•</span>
              <span><i class="bi bi-clock mr-1"></i> ${article.readTime}</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
              <a href="blog-details.html?id=${article.id}" class="hover:text-lime-500 dark:hover:text-lime-400 transition-colors">
                ${article.title}
              </a>
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 flex-1">
              ${article.excerpt}
            </p>
            <div class="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div class="text-xs">
                <span class="font-bold text-slate-800 dark:text-slate-200 block">${article.author}</span>
                <span class="text-slate-500 dark:text-slate-400 text-[11px]">${article.authorRole}</span>
              </div>
              <a href="blog-details.html?id=${article.id}" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center hover:bg-lime-400 hover:text-brand-primary transition-colors">
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </article>
      `
        )
        .join("");
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => {
          b.classList.remove("active", "bg-lime-400", "text-brand-primary");
          b.classList.add("bg-white", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
        });
        btn.classList.add("active", "bg-lime-400", "text-brand-primary");
        btn.classList.remove("bg-white", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
        activeCategory = btn.dataset.category;
        renderFilteredArticles();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim();
        renderFilteredArticles();
      });
    }

    renderFilteredArticles();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderServiceDetails();
    renderBlogDetails();
    initServicesCatalog();
    initBlogCatalog();
  });
})();
