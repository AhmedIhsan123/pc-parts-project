/* =========================================
   PRODUCTS PAGE JS — SurgeForge
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  const cards = Array.from(grid.querySelectorAll(".pcard"));
  const countEl = document.getElementById("products-count");
  const noResults = document.getElementById("noResults");
  const activeFiltersEl = document.getElementById("activeFilters");
  const sortSelect = document.getElementById("sort-select");
  const clearBtns = document.querySelectorAll("#clearFilters, #clearFiltersAlt");
  const viewBtns = document.querySelectorAll(".view-btn");
  const filterMobileToggle = document.getElementById("filterMobileToggle");
  const sidebar = document.querySelector(".filter-sidebar");

  let activeFilters = {
    category: [],
    brand: [],
    rating: null,
    priceMin: 0,
    priceMax: 2000,
    availability: [],
  };

  /* ---- FILTER GROUP TOGGLES ---- */
  document.querySelectorAll(".filter-group__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (panel) panel.hidden = expanded;
    });
  });

  /* ---- CHECKBOXES / RADIO ---- */
  document.querySelectorAll('input[name="category"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      activeFilters.category = Array.from(
        document.querySelectorAll('input[name="category"]:checked')
      ).map((i) => i.value);
      applyFilters();
    });
  });

  document.querySelectorAll('input[name="brand"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      activeFilters.brand = Array.from(
        document.querySelectorAll('input[name="brand"]:checked')
      ).map((i) => i.value);
      applyFilters();
    });
  });

  document.querySelectorAll('input[name="rating"]').forEach((rb) => {
    rb.addEventListener("change", () => {
      activeFilters.rating = parseFloat(rb.value);
      applyFilters();
    });
  });

  document.querySelectorAll('input[name="availability"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      activeFilters.availability = Array.from(
        document.querySelectorAll('input[name="availability"]:checked')
      ).map((i) => i.value);
      applyFilters();
    });
  });

  /* ---- PRICE RANGE ---- */
  const priceMin = document.getElementById("price-min");
  const priceMax = document.getElementById("price-max");
  const priceMinLabel = document.getElementById("price-min-label");
  const priceMaxLabel = document.getElementById("price-max-label");

  function updatePriceLabels() {
    let min = parseInt(priceMin.value);
    let max = parseInt(priceMax.value);
    if (min > max) [min, max] = [max, min];
    priceMinLabel.textContent = `$${min.toLocaleString()}`;
    priceMaxLabel.textContent = `$${max.toLocaleString()}`;
    activeFilters.priceMin = min;
    activeFilters.priceMax = max;
    applyFilters();
  }

  priceMin.addEventListener("input", updatePriceLabels);
  priceMax.addEventListener("input", updatePriceLabels);

  /* ---- SORT ---- */
  sortSelect.addEventListener("change", () => applyFilters());

  /* ---- CLEAR FILTERS ---- */
  clearBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilters = { category: [], brand: [], rating: null, priceMin: 0, priceMax: 2000, availability: [] };
      document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach((cb) => (cb.checked = false));
      document.querySelectorAll('.filter-sidebar input[type="radio"]').forEach((rb) => (rb.checked = false));
      priceMin.value = 0;
      priceMax.value = 2000;
      updatePriceLabels();
      applyFilters();
    });
  });

  /* ---- VIEW TOGGLE ---- */
  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewBtns.forEach((b) => b.classList.remove("view-btn--active"));
      btn.classList.add("view-btn--active");
      const view = btn.dataset.view;
      if (view === "list") {
        grid.classList.add("products-grid--list");
      } else {
        grid.classList.remove("products-grid--list");
      }
    });
  });

  /* ---- MOBILE FILTER TOGGLE ---- */
  filterMobileToggle?.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    filterMobileToggle.setAttribute("aria-expanded", String(open));
  });

  /* ---- CORE FILTER + SORT FUNCTION ---- */
  function applyFilters() {
    let visible = cards.filter((card) => {
      const cat = card.dataset.category;
      const brand = card.dataset.brand;
      const price = parseFloat(card.dataset.price);
      const rating = parseFloat(card.dataset.rating);

      if (activeFilters.category.length && !activeFilters.category.includes(cat)) return false;
      if (activeFilters.brand.length && !activeFilters.brand.includes(brand)) return false;
      if (price < activeFilters.priceMin || price > activeFilters.priceMax) return false;
      if (activeFilters.rating && rating < activeFilters.rating) return false;

      return true;
    });

    // Sort
    const sort = sortSelect.value;
    visible.sort((a, b) => {
      if (sort === "price-asc") return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
      if (sort === "price-desc") return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
      if (sort === "rating") return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
      return 0;
    });

    // Show/hide
    cards.forEach((c) => (c.hidden = true));
    visible.forEach((c) => {
      c.hidden = false;
      grid.appendChild(c); // re-order for sort
    });

    // Count
    countEl.textContent = `${visible.length} result${visible.length !== 1 ? "s" : ""}`;

    // No results
    noResults.hidden = visible.length > 0;

    // Active filter pills
    renderActivePills();
  }

  /* ---- ACTIVE FILTER PILLS ---- */
  function renderActivePills() {
    activeFiltersEl.innerHTML = "";

    const addPill = (label, onRemove) => {
      const pill = document.createElement("span");
      pill.className = "active-filter-pill";
      pill.innerHTML = `${label} <button aria-label="Remove filter: ${label}">✕</button>`;
      pill.querySelector("button").addEventListener("click", onRemove);
      activeFiltersEl.appendChild(pill);
    };

    activeFilters.category.forEach((val) => {
      addPill(val.toUpperCase(), () => {
        document.querySelector(`input[name="category"][value="${val}"]`).checked = false;
        activeFilters.category = activeFilters.category.filter((v) => v !== val);
        applyFilters();
      });
    });

    activeFilters.brand.forEach((val) => {
      addPill(val.charAt(0).toUpperCase() + val.slice(1), () => {
        document.querySelector(`input[name="brand"][value="${val}"]`).checked = false;
        activeFilters.brand = activeFilters.brand.filter((v) => v !== val);
        applyFilters();
      });
    });

    if (activeFilters.rating) {
      addPill(`${activeFilters.rating}+ ★`, () => {
        document.querySelectorAll('input[name="rating"]').forEach((r) => (r.checked = false));
        activeFilters.rating = null;
        applyFilters();
      });
    }

    if (activeFilters.priceMin > 0 || activeFilters.priceMax < 2000) {
      addPill(`$${activeFilters.priceMin}–$${activeFilters.priceMax}`, () => {
        priceMin.value = 0;
        priceMax.value = 2000;
        updatePriceLabels();
      });
    }
  }
});
