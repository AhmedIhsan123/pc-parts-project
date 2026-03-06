const grid = document.getElementById("products-grid");
const count = document.getElementById("products-count");
const pagination = document.querySelector(".products-pagination");
const itemsPerPage = 20;

function showPage(products, pageNumber) {
  grid.innerHTML = "";

  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = products.slice(start, end);

  pageItems.forEach((p) => {
    const li = document.createElement("li");
    li.className = "product-card products-card";
    li.dataset.category = p.category_name.toLowerCase();

    li.innerHTML = `
      <div class="product-card__top">
        <span class="product-badge">${p.rating} ★</span>
        <span class="product-category">${p.category_name}</span>
      </div>

      <div class="products-card__image">
        <img src="${p.image_url}" alt="${p.product_name}" loading="lazy">
      </div>

      <h3 class="products-card__name">${p.product_name}</h3>
      <p class="products-card__desc">${p.product_description}</p>

      <div class="product-card__bottom">
        <span class="price">$${p.price}</span>
        <a href="#" class="product-link">View →</a>
      </div>
    `;

    grid.appendChild(li);
  });
}

function renderPagination(products) {
  if (!pagination) return;
  pagination.innerHTML = "";

  const pageCount = Math.ceil(products.length / itemsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "pagination-btn";
    btn.addEventListener("click", () => showPage(products, i));
    pagination.appendChild(btn);
  }
}

fetch("http://localhost:8001/api/products")
  .then((res) => res.json())
  .then((products) => {
    count.textContent = products.length;
    showPage(products, 1);
    renderPagination(products);
  })
  .catch((err) => console.error(err));