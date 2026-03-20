// ── helpers ──

function getSessionCart(req) {
	if (!req.session.cart) req.session.cart = [];
	return req.session.cart;
}

function buildPayload(cart) {
	const subtotal  = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	return { items: cart, subtotal: subtotal.toFixed(2), itemCount };
}

// ── controllers ──

// GET /api/cart — returns the current session cart
export const getCart = (req, res) => {
	const cart = getSessionCart(req);
	res.json(buildPayload(cart));
};

// POST /api/cart/items — add an item, or increment qty if already present
// Body: { id, name, price, image, quantity }
export const addItem = (req, res) => {
	const { id, name, price, image } = req.body;
	const quantity = parseInt(req.body.quantity, 10) || 1;

	if (!id || !name || price === undefined) {
		return res.status(400).json({ error: "id, name and price are required." });
	}

	const cart     = getSessionCart(req);
	const existing = cart.find((item) => String(item.id) === String(id));

	if (existing) {
		existing.quantity += quantity;
	} else {
		cart.push({
			id:       String(id),
			name,
			price:    parseFloat(price),
			image:    image || null,
			quantity,
		});
	}

	req.session.cart = cart;
	res.json(buildPayload(cart));
};

// DELETE /api/cart/items/:productId — remove a single item entirely
export const removeItem = (req, res) => {
	const { productId } = req.params;
	let cart            = getSessionCart(req);
	const before        = cart.length;

	cart = cart.filter((item) => String(item.id) !== String(productId));

	if (cart.length === before) {
		return res.status(404).json({ error: "Item not found in cart." });
	}

	req.session.cart = cart;
	res.json(buildPayload(cart));
};

// POST /api/cart/clear — clear the entire cart
export const clearCart = (req, res) => {
	req.session.cart = [];
	res.json(buildPayload([]));
};