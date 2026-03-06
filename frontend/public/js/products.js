const grid = document.getElementById("products-grid");
const count = document.getElementById("products-count");

fetch("http://localhost:8001/api/products")
  .then((res) => res.json())
  .then((products) => {
    count.textContent = products.length;

    grid.innerHTML = "";

    products.forEach((p) => {
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
  })
  .catch((err) => console.error(err));