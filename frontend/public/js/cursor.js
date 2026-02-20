document.addEventListener("DOMContentLoaded", () => {
	const cursor = document.querySelector(".custom-cursor");
	if (!cursor) return;

	let mouseX = 0,
		mouseY = 0,
		posX = 0,
		posY = 0;

	// Update mouse coordinates
	document.addEventListener("mousemove", (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Animate cursor with smooth trailing
	function animate() {
		posX += (mouseX - posX) * 1;
		posY += (mouseY - posY) * 1;

		cursor.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;

		requestAnimationFrame(animate);
	}
	animate();

	// Hover effect on links/buttons
	document.querySelectorAll("a, button").forEach((el) => {
		el.addEventListener("mouseenter", () => cursor.classList.add("active"));
		el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
	});
});
