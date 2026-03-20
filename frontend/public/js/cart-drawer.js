/**
 * cart-drawer.js  —  /js/cart-drawer.js
 *
 * The Express API runs on a separate port from the frontend.
 * CART_API_BASE must point at the Express server so session
 * cookies are sent to the right origin.
 *
 * Every fetch includes credentials: "include" so the browser
 * attaches the session cookie cross-origin.
 *
 * Cart endpoints:
 *   GET    /api/cart
 *   POST   /api/cart/items          body: { id, name, price, image, quantity }
 *   DELETE /api/cart/items/:id
 *   POST   /api/cart/clear
 *
 * "Add to Cart" buttons need:
 *   class="add-to-cart-btn"
 *   data-id, data-name, data-price, data-image (optional)
 */

(function () {
  "use strict";

  /* ─────────────────────────────────────────
     CONFIG — update port if your Express server
     runs somewhere else.
  ───────────────────────────────────────── */
  const CART_API_BASE = "http://localhost:8001/api/cart";

  /* ── DOM refs ── */
  const drawer      = document.getElementById("cartDrawer");
  const backdrop    = document.getElementById("cartBackdrop");
  const closeBtn    = document.getElementById("cartClose");
  const cartTrigger = document.querySelector('a[href="/checkout"]');
  const itemList    = document.getElementById("cartItemList");
  const emptyState  = document.getElementById("cartEmpty");
  const footer      = document.getElementById("cartFooter");
  const subtotalEl  = document.getElementById("cartSubtotal");
  const countEl     = document.getElementById("cartItemCount");

  if (!drawer || !backdrop) return;

  /* ── API helpers ── */

  async function apiFetch(path, options = {}) {
    const res = await fetch(`${CART_API_BASE}${path}`, {
      credentials: "include",                      // send session cookie cross-origin
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `HTTP ${res.status} from ${path}`);
    }
    return res.json();
  }

  const api = {
    getCart:    ()           => apiFetch(""),
    addItem:    (body)       => apiFetch("/items",    { method: "POST",   body: JSON.stringify(body) }),
    removeItem: (id)         => apiFetch(`/items/${id}`, { method: "DELETE" }),
    clearCart:  ()           => apiFetch("/clear",   { method: "POST" }),
  };

  /* ── render ── */

  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function renderCart({ items, subtotal, itemCount }) {
    const hasItems = Array.isArray(items) && items.length > 0;

    emptyState.style.display = hasItems ? "none" : "flex";
    itemList.style.display   = hasItems ? "block" : "none";
    footer.style.display     = hasItems ? "flex" : "none";

    if (countEl) {
      countEl.textContent = hasItems
        ? `${itemCount} item${itemCount !== 1 ? "s" : ""}`
        : "";
    }
    if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;

    itemList.innerHTML = "";

    items.forEach((item) => {
      const li = document.createElement("li");
      li.className  = "cart-item";
      li.dataset.id = item.id;

      li.innerHTML = `
        <div class="cart-item__img-wrap">
          ${item.image
            ? `<img src="${esc(item.image)}" alt="${esc(item.name)}" class="cart-item__img" loading="lazy">`
            : `<div class="cart-item__img-placeholder" aria-hidden="true">📦</div>`}
        </div>
        <div class="cart-item__info">
          <p class="cart-item__name">${esc(item.name)}</p>
          <p class="cart-item__unit-price">$${Number(item.price).toFixed(2)} each</p>
          <p class="cart-item__price">$${(item.price * item.quantity).toFixed(2)}</p>
          <div class="cart-item__controls">
            <button class="cart-qty-btn cart-qty-btn--dec"
              aria-label="Decrease quantity"
              data-id="${esc(item.id)}"
              data-qty="${item.quantity - 1}">−</button>
            <span class="cart-qty-value" aria-live="polite">${item.quantity}</span>
            <button class="cart-qty-btn cart-qty-btn--inc"
              aria-label="Increase quantity"
              data-id="${esc(item.id)}"
              data-qty="${item.quantity + 1}">+</button>
          </div>
        </div>
        <button class="cart-item__remove"
          aria-label="Remove ${esc(item.name)} from cart"
          data-id="${esc(item.id)}">&#x2715;</button>
      `;

      itemList.appendChild(li);
    });
  }

  /* ── button feedback ── */

  function setLoading(btn, on) {
    if (!btn) return;
    btn.disabled      = on;
    btn.style.opacity = on ? "0.5" : "";
  }

  function flashSuccess(btn, originalText) {
    btn.textContent = "Added ✓";
    btn.style.background = "var(--color-accent-deep)";
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
    }, 1200);
  }

  /* ── initial load — fetch cart from server on every page load ── */

  async function loadCart() {
    try {
      renderCart(await api.getCart());
    } catch (e) {
      console.error("[cart] initial load failed:", e.message);
    }
  }

  // Run as soon as the DOM is ready (script is deferred so this fires immediately)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadCart);
  } else {
    loadCart();
  }

  /* ── open / close ── */

  function openCart() {
    // Close mobile filter sidebar if open (products page)
    const filterSidebar = document.getElementById("filters-sidebar");
    if (filterSidebar && filterSidebar.classList.contains("open")) {
      filterSidebar.classList.remove("open");
      const toggle = document.querySelector(".filter-toggle-mobile");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    }

    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    drawer.focus();
  }

  function closeCart() {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (cartTrigger) cartTrigger.focus();
  }

  if (cartTrigger) {
    cartTrigger.addEventListener("click", (e) => { e.preventDefault(); openCart(); });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  backdrop.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) closeCart();
  });

  /* ── Add to Cart — delegated, works for dynamically rendered cards ── */

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;

    const { id, name, price, image } = btn.dataset;

    if (!id || !name || price === undefined || price === "") {
      console.error(
        "[cart] Button is missing required data attributes.",
        { id, name, price },
        btn
      );
      return;
    }

    // On /products/:id, respect the qty stepper value
    const qtyInput = document.querySelector(".qty-input");
    const quantity = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;

    const originalHTML = btn.innerHTML;
    setLoading(btn, true);

    try {
      const payload = await api.addItem({
        id,
        name,
        price: parseFloat(price),
        image: image || null,
        quantity,
      });

      renderCart(payload);
      setLoading(btn, false);
      flashSuccess(btn, originalHTML);
      openCart();
    } catch (err) {
      console.error("[cart] addItem failed:", err.message);
      setLoading(btn, false);
    }
  });

  /* ── Qty +/− and Remove — delegated inside the drawer ── */

  if (itemList) {
    itemList.addEventListener("click", async (e) => {

      // Remove button
      const removeBtn = e.target.closest(".cart-item__remove");
      if (removeBtn) {
        setLoading(removeBtn, true);
        try {
          renderCart(await api.removeItem(removeBtn.dataset.id));
        } catch (err) {
          console.error("[cart] removeItem failed:", err.message);
          setLoading(removeBtn, false);
        }
        return;
      }

      // Qty stepper buttons
      const qtyBtn = e.target.closest(".cart-qty-btn");
      if (!qtyBtn) return;

      const id  = qtyBtn.dataset.id;
      const qty = parseInt(qtyBtn.dataset.qty, 10);

      setLoading(qtyBtn, true);

      try {
        if (qty <= 0) {
          // Decrement to zero = remove
          renderCart(await api.removeItem(id));
        } else {
          // No PATCH in spec: remove then re-add at the new quantity.
          // Grab item data from the rendered row before it disappears.
          const row      = qtyBtn.closest(".cart-item");
          const rowName  = row.querySelector(".cart-item__name").textContent.trim();
          const rowPrice = parseFloat(
            row.querySelector(".cart-item__unit-price").textContent.replace(/[^0-9.]/g, "")
          );
          const imgEl    = row.querySelector(".cart-item__img");
          const rowImage = imgEl ? imgEl.src : null;

          await api.removeItem(id);
          renderCart(await api.addItem({ id, name: rowName, price: rowPrice, image: rowImage, quantity: qty }));
        }
      } catch (err) {
        console.error("[cart] qty update failed:", err.message);
        setLoading(qtyBtn, false);
      }
    });
  }

})();