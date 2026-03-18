/**
 * cart-drawer.js
 * Place at: /js/cart-drawer.js
 * Load with <script src="/js/cart-drawer.js" defer></script>
 * in any layout that includes the checkout-drawer partial.
 */

(function () {
	"use strict";

	const drawer   = document.getElementById("cartDrawer");
	const backdrop = document.getElementById("cartBackdrop");
	const closeBtn = document.getElementById("cartClose");

	// The cart icon anchor in the nav — we intercept its click instead of
	// navigating to /checkout.
	const cartTrigger = document.querySelector('a[href="/checkout"]');

	if (!drawer || !backdrop || !cartTrigger) return;

	/* ── helpers ── */

	function openCart() {
		drawer.classList.add("is-open");
		backdrop.classList.add("is-open");

		drawer.setAttribute("aria-hidden", "false");
		backdrop.setAttribute("aria-hidden", "false");

		// Trap focus inside drawer
		document.body.style.overflow = "hidden";

		// Move focus to the drawer for keyboard users
		drawer.focus();
	}

	function closeCart() {
		drawer.classList.remove("is-open");
		backdrop.classList.remove("is-open");

		drawer.setAttribute("aria-hidden", "true");
		backdrop.setAttribute("aria-hidden", "true");

		document.body.style.overflow = "";

		// Return focus to the trigger
		cartTrigger.focus();
	}

	/* ── event listeners ── */

	// Intercept the cart icon link
	cartTrigger.addEventListener("click", function (e) {
		e.preventDefault();
		openCart();
	});

	// Close button inside drawer
	if (closeBtn) {
		closeBtn.addEventListener("click", closeCart);
	}

	// Click on backdrop closes drawer
	backdrop.addEventListener("click", closeCart);

	// Escape key closes drawer
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && drawer.classList.contains("is-open")) {
			closeCart();
		}
	});
})();
