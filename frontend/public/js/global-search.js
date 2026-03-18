document.addEventListener("DOMContentLoaded", () => {
	const navSearch = document.querySelector(".nav-search");
	const input = document.getElementById("globalSearchInput");
	const dropdown = document.getElementById("searchResultsDropdown");
	const clearBtn = document.getElementById("clearSearchBtn");

	if (!input || !dropdown || !clearBtn || !navSearch) return;

	if (window.lucide) {
		lucide.createIcons();
	}

	let timeout;
	let selectedIndex = -1;
	let currentResults = [];

	// =========================
	// DROPDOWN CONTROL
	// =========================

	function hideDropdown() {
		dropdown.style.display = "none";
		dropdown.innerHTML = "";
		selectedIndex = -1;
	}

	function showDropdown() {
		dropdown.style.display = "block";
	}

	function updateClearButton() {
		if (input.value.trim()) {
			navSearch.classList.add("has-value");
		} else {
			navSearch.classList.remove("has-value");
		}
	}

	// =========================
	// HIGHLIGHT MATCH
	// =========================

	function highlight(text, query) {
		const regex = new RegExp(`(${query})`, "gi");
		return text.replace(regex, `<span class="search-highlight">$1</span>`);
	}

	// =========================
	// FETCH + SEARCH
	// =========================

	input.addEventListener("input", () => {
		const query = input.value.trim();
		updateClearButton();

		clearTimeout(timeout);

		if (!query) {
			hideDropdown();
			return;
		}

		timeout = setTimeout(async () => {
			try {
				const res = await fetch(
					`http://localhost:8001/api/products/search-global?search=${encodeURIComponent(query)}`
				);

				const data = await res.json();

				const fuse = new Fuse(data, {
					keys: ["product_name"],
					threshold: 0.4,
				});

				currentResults = fuse.search(query).map((r) => r.item);

				dropdown.innerHTML = "";

				if (!currentResults.length) {
					dropdown.innerHTML = `<div class="search-empty">No products found</div>`;
					showDropdown();
					return;
				}

				currentResults.slice(0, 6).forEach((p, index) => {
					const item = document.createElement("a");
					item.href = `/products/${p.id}`;
					item.className = "search-result";

					const imageSrc = p.image_url || "/images/default.webp";

					item.innerHTML = `
						<img src="${imageSrc}" class="search-img" />
						<div class="search-info">
							<div class="search-name">${highlight(p.product_name, query)}</div>
							<div class="search-price">$${p.price}</div>
						</div>
					`;

					if (index === selectedIndex) {
						item.classList.add("active");
					}

					dropdown.appendChild(item);
				});

				showDropdown();
			} catch (err) {
				console.error("Search error:", err);
				dropdown.innerHTML = `<div class="search-empty">Search failed</div>`;
				showDropdown();
			}
		}, 150);
	});

	// =========================
	// KEYBOARD NAVIGATION
	// =========================

	input.addEventListener("keydown", (e) => {
		const items = dropdown.querySelectorAll(".search-result");

		if (!items.length) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % items.length;
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + items.length) % items.length;
		}

		if (e.key === "Enter") {
			if (selectedIndex >= 0 && items[selectedIndex]) {
				window.location.href = items[selectedIndex].href;
			}
		}

		items.forEach((el, i) => {
			el.classList.toggle("active", i === selectedIndex);
		});
	});

	// =========================
	// CLEAR BUTTON
	// =========================

	clearBtn.addEventListener("click", () => {
		input.value = "";
		updateClearButton();
		hideDropdown();
		input.focus();
	});

	// =========================
	// CLICK OUTSIDE
	// =========================

	document.addEventListener("click", (e) => {
		if (!e.target.closest(".nav-search")) {
			hideDropdown();
		}
	});

	// =========================
	// MIC SEARCH 🎤
	// =========================	

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;


	if (SpeechRecognition) {
		const micBtn = document.createElement("button");
		micBtn.className = "search-mic-btn";
		micBtn.innerHTML = `<i data-lucide="mic"></i>`;

		document.querySelector(".search-wrapper").appendChild(micBtn);
		lucide.createIcons();

		const recognition = new SpeechRecognition();
		recognition.lang = "en-US";

		micBtn.addEventListener("click", () => {
			recognition.start();
			micBtn.classList.add("listening");
		});

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript;
			input.value = transcript;
			input.dispatchEvent(new Event("input"));
		};

		recognition.onend = () => {
			micBtn.classList.remove("listening");
		};
	}

	const micBtn = document.getElementById("micBtn");

	// when voice starts
	recognition.onstart = () => {
	micBtn.classList.add("listening");
	};

	// when voice stops
	recognition.onend = () => {
	micBtn.classList.remove("listening");
	};

	updateClearButton();
});