/* =========================================
   TYPING ANIMATION
   ========================================= */

const textContainer = document.getElementById("typed-text");
const cursor = document.querySelector(".cursor");

if (textContainer) {

	const firstPhrase = "Build With Precision";
	const buildOnly = "Build";
	const finalPhrase = " Without Limits.";

	const typingSpeed = 170;
	const eraseSpeed = 90;
	const pauseAfterFirst = 2000;
	const pauseAfterBuild = 800;

	let index = 0;

	function typePhrase(phrase, callback) {
		if (index < phrase.length) {
			const span = document.createElement("span");
			span.classList.add("typed-letter");
			span.textContent = phrase[index];
			textContainer.appendChild(span);

			index++;
			setTimeout(() => typePhrase(phrase, callback), typingSpeed);
		} else {
			setTimeout(callback, pauseAfterFirst);
		}
	}

	function eraseToBuild(callback) {
		function erase() {
			if (textContainer.textContent.length > buildOnly.length) {
				textContainer.removeChild(textContainer.lastChild);
				setTimeout(erase, eraseSpeed);
			} else {
				setTimeout(callback, pauseAfterBuild);
			}
		}
		erase();
	}

	function typeFinal() {
		index = 0;
		typePhrase(finalPhrase, () => {
			setTimeout(() => {
				if (cursor) cursor.style.display = "none";
			}, 2000);
		});
	}

	typePhrase(firstPhrase, () => {
		eraseToBuild(typeFinal);
	});
}

/* =========================================
   BADGE ROTATION
   ========================================= */

const badge = document.getElementById("badge-text");

if (badge) {

	const messages = [
		"New Arrivals — RTX 50 Series In Stock",
		"Now Shipping — Ryzen 8000 Series",
		"Top Rated — 4.9★ Builder Approved",
		"Free Shipping Over $99"
	];

	let current = 0;

	setInterval(() => {
		badge.classList.add("badge-hidden");

		setTimeout(() => {
			current = (current + 1) % messages.length;
			badge.textContent = messages[current];
			badge.classList.remove("badge-hidden");
		}, 500);

	}, 4000);
}


/* =========================================
   STATS COUNTER ANIMATION
   ========================================= */
const statsSection = document.querySelector(".about-stats");
const counters = document.querySelectorAll(".counter");

if (statsSection && counters.length > 0) {

	let hasAnimated = false;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting && !hasAnimated) {
				statsSection.classList.add("reveal");
				animateCounters();
				hasAnimated = true;
			}
		});
	}, { threshold: 0.4 });

	observer.observe(statsSection);

	function animateCounters() {
	counters.forEach(counter => {
		const target = parseFloat(counter.dataset.target);
		let start = 0;

		const duration = 3000; // change it here to make it faster or slower
		const startTime = performance.now();

		function update(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			let value = target * progress;

			if (target % 1 !== 0) {
				counter.textContent = value.toFixed(1);
			} else {
				counter.textContent = Math.floor(value).toLocaleString();
			}

			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				counter.textContent = target % 1 !== 0
					? target.toFixed(1)
					: target.toLocaleString();
			}
		}

            requestAnimationFrame(update);
        });
    }
}

// Get the elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Add event listener
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});