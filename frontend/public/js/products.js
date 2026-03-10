const grid = document.getElementById("products-grid");
const countEl = document.getElementById("products-count");
const pagination = document.querySelector(".products-pagination");
const activeFiltersBar = document.getElementById("active-filters");
const clearAllBtn = document.querySelector(".filters-clear");

const API_BASE = "http://localhost:8001/api/products";
const ITEMS_PER_PAGE = 20;
let currentPage = 1;

// ===== DOM helpers =====

function getDbValue(el) {
  return el.dataset.dbValue ?? el.value;
}

function getDisplayLabel(el) {
  const labelSpan = [...el.parentElement.querySelectorAll("span")]
    .find((s) => !s.classList.contains("check-box") && !s.classList.contains("filter-count"));
  return labelSpan ? labelSpan.textContent.trim() : el.value;
}

// ===== Read current filter state from the sidebar =====

function getFilters() {
  const checkedCategories = [
    ...document.querySelectorAll('input[name="category"]:checked'),
  ].map(getDbValue);

  const checkedBrands = [
    ...document.querySelectorAll('input[name="brand"]:checked'),
  ].map(getDbValue);

  const minPrice = document.getElementById("price-min").value.trim();
  const maxPrice = document.getElementById("price-max").value.trim();

  return {
    categories: checkedCategories,
    brands: checkedBrands,
    minPrice: minPrice !== "" ? parseFloat(minPrice) : null,
    maxPrice: maxPrice !== "" ? parseFloat(maxPrice) : null,
  };
}

// ===== Build query params & fetch =====

function buildQueryString(filters) {
  const { categories, brands, minPrice, maxPrice } = filters;
  const parts = [];

  if (categories.length) parts.push(`category=${categories.join(",")}`);
  if (brands.length) parts.push(`brand=${brands.join(",")}`);

  const numericParams = new URLSearchParams();
  if (minPrice !== null) numericParams.set("minPrice", minPrice);
  if (maxPrice !== null) numericParams.set("maxPrice", maxPrice);
  if (numericParams.toString()) parts.push(numericParams.toString());

  return parts.join("&");
}

async function fetchProducts(filters) {
  const { categories, brands, minPrice, maxPrice } = filters;
  const hasFilters =
    categories.length || brands.length || minPrice !== null || maxPrice !== null;

  if (!hasFilters) {
    history.replaceState(null, "", window.location.pathname);
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  }

  const queryString = buildQueryString(filters);

  history.replaceState(null, "", `${window.location.pathname}?${queryString}`);

  const res = await fetch(`${API_BASE}/search?${queryString}`);
  if (!res.ok) return [];
  return res.json();
}

// ===== Render =====

function renderPage(products, page) {
  grid.innerHTML = "";
  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = products.slice(start, start + ITEMS_PER_PAGE);

  if (pageItems.length === 0) {
    grid.innerHTML = `<li class="products-empty">No products match your filters.</li>`;
    return;
  }

  pageItems.forEach((p) => {
    const li = document.createElement("li");
    li.className = "product-card products-card";
    li.dataset.category = p.category_name.toLowerCase();

    li.innerHTML = `
      <div class="product-card__top">
        <span class="product-badge">${p.rating ?? "—"} ★</span>
        <span class="product-category">${p.category_name}</span>
      </div>
      <div class="products-card__image">
        <img src="${p.image_url}" alt="${p.product_name}" loading="lazy">
      </div>
      <h3 class="products-card__name">${p.product_name}</h3>
      <p class="products-card__desc">${p.product_description}</p>
      <div class="product-card__bottom">
        <span class="price">$${Number(p.price).toFixed(2)}</span>
        <a href="#" class="product-link">View →</a>
      </div>
    `;
    grid.appendChild(li);
  });
}

function renderPagination(products) {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);
  if (pageCount <= 1) return;

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "pagination-btn" + (i === currentPage ? " pagination-btn--active" : "");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(products, currentPage);
      renderPagination(products);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    pagination.appendChild(btn);
  }
}

// ===== Active filter tags =====

function renderActiveFilters(filters) {
  activeFiltersBar.innerHTML = "";

  const addTag = (label, onRemove) => {
    const tag = document.createElement("span");
    tag.className = "active-filter-tag";
    tag.innerHTML = `${label} <button class="active-filter-tag__remove" aria-label="Remove ${label} filter">✕</button>`;
    tag.querySelector("button").addEventListener("click", onRemove);
    activeFiltersBar.appendChild(tag);
  };

  // Category tags
  document.querySelectorAll('input[name="category"]:checked').forEach((el) => {
    addTag(getDisplayLabel(el), () => { el.checked = false; applyFilters(); });
  });

  // Brand tags
  document.querySelectorAll('input[name="brand"]:checked').forEach((el) => {
    addTag(getDisplayLabel(el), () => { el.checked = false; applyFilters(); });
  });

  // Price tag
  if (filters.minPrice !== null || filters.maxPrice !== null) {
    const min = filters.minPrice !== null ? `$${filters.minPrice}` : "$0";
    const max = filters.maxPrice !== null ? `$${filters.maxPrice}` : "any";
    addTag(`${min} – ${max}`, () => {
      document.getElementById("price-min").value = "";
      document.getElementById("price-max").value = "";
      applyFilters();
    });
  }
}

// ===== Main apply function =====

async function applyFilters() {
  grid.innerHTML = `<li class="products-loading">Loading...</li>`;
  pagination.innerHTML = "";

  try {
    const filters = getFilters();
    renderActiveFilters(filters);

    const products = await fetchProducts(filters);

    countEl.textContent = products.length;
    currentPage = 1;
    renderPage(products, currentPage);
    renderPagination(products);
  } catch (err) {
    grid.innerHTML = `<li class="products-error">Something went wrong. Please try again.</li>`;
    console.error(err);
  }
}

// ===== Debounce helper =====

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ===== Event listeners =====

// Checkboxes — instant response
document.querySelectorAll('input[name="category"], input[name="brand"]').forEach((el) => {
  el.addEventListener("change", applyFilters);
});

// Price inputs — debounced so we don't fire on every keystroke
const debouncedApply = debounce(applyFilters, 500);
document.getElementById("price-min").addEventListener("input", debouncedApply);
document.getElementById("price-max").addEventListener("input", debouncedApply);

// Clear all
clearAllBtn.addEventListener("click", () => {
  document.querySelectorAll('input[name="category"], input[name="brand"]').forEach((el) => {
    el.checked = false;
  });
  document.getElementById("price-min").value = "";
  document.getElementById("price-max").value = "";
  applyFilters();
});

// ===== Initial load =====

function restoreFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);

  const categoryVals = params.get("category") ? params.get("category").split(",") : [];
  categoryVals.forEach((dbVal) => {
    const el = document.querySelector(`input[name="category"][data-db-value="${dbVal.trim()}"]`);
    if (el) el.checked = true;
  });

  const brandVals = params.get("brand") ? params.get("brand").split(",") : [];
  brandVals.forEach((dbVal) => {
    const el = document.querySelector(`input[name="brand"][data-db-value="${dbVal.trim()}"]`);
    if (el) el.checked = true;
  });

  if (params.has("minPrice")) document.getElementById("price-min").value = params.get("minPrice");
  if (params.has("maxPrice")) document.getElementById("price-max").value = params.get("maxPrice");
}

restoreFiltersFromURL();
applyFilters();