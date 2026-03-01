/* =========================================
   PRODUCT DETAIL PAGE JS — SurgeForge
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- IMAGE GALLERY ---- */
  const mainImg = document.getElementById("mainImage");
  const thumbs = document.querySelectorAll(".product-gallery__thumb");

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = thumb.dataset.src;
      mainImg.style.opacity = "0";
      mainImg.style.transform = "scale(0.97)";
      setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = "1";
        mainImg.style.transform = "scale(1)";
      }, 200);
      thumbs.forEach((t) => t.classList.remove("product-gallery__thumb--active"));
      thumb.classList.add("product-gallery__thumb--active");
    });
  });

  mainImg.style.transition = "opacity 0.2s ease, transform 0.2s ease";

  /* ---- QUANTITY CONTROL ---- */
  const qtyValue = document.getElementById("qtyValue");
  const qtyMinus = document.getElementById("qtyMinus");
  const qtyPlus = document.getElementById("qtyPlus");
  let qty = 1;

  qtyMinus?.addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      qtyValue.textContent = qty;
    }
  });

  qtyPlus?.addEventListener("click", () => {
    qty++;
    qtyValue.textContent = qty;
  });

  /* ---- ADD TO CART ---- */
  const addToCartBtn = document.getElementById("addToCart");

  addToCartBtn?.addEventListener("click", () => {
    addToCartBtn.textContent = "✓ Added to Cart";
    addToCartBtn.classList.add("added");
    addToCartBtn.disabled = true;

    setTimeout(() => {
      addToCartBtn.textContent = "Add to Cart";
      addToCartBtn.classList.remove("added");
      addToCartBtn.disabled = false;
    }, 2000);
  });

  /* ---- TABS ---- */
  const tabBtns = document.querySelectorAll(".product-tab-btn");
  const tabPanels = document.querySelectorAll(".product-tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("aria-controls");

      tabBtns.forEach((b) => {
        b.classList.remove("product-tab-btn--active");
        b.setAttribute("aria-selected", "false");
      });

      tabPanels.forEach((panel) => {
        panel.classList.add("product-tab-panel--hidden");
      });

      btn.classList.add("product-tab-btn--active");
      btn.setAttribute("aria-selected", "true");
      document.getElementById(targetId)?.classList.remove("product-tab-panel--hidden");
    });
  });
});
