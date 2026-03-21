/* eslint-disable max-lines-per-function */
document.addEventListener("DOMContentLoaded", () => {

const productPage = document.querySelector(".product-detail-page");
if (!productPage) return;


/* =========================
GET PRODUCT ID
========================= */

const productId = window.location.pathname.split("/").pop();

if (!productId) {
	console.error("No product id in URL");
	return;
}


/* =========================
FETCH PRODUCT DATA
========================= */

fetch((`http://localhost:8001/api/products/${productId}`), { credentials: "include" })
.then(res => res.json())
.then(product => {

console.log("Loaded product:", product);


/* =========================
PRODUCT IMAGE
========================= */

const image = document.getElementById("productImage");
const thumbs = document.querySelectorAll(".product-thumbnails .thumb");

const mainImg = `http://localhost:8002${product.image_url}`;

if(image){
	image.src = mainImg;
}

if(thumbs){

	const gallery = product.image_urls || [mainImg, mainImg, mainImg, mainImg];

	thumbs.forEach((thumb,i)=>{

		thumb.src = `http://localhost:8002${gallery[i] || gallery[0]}`;

		thumb.addEventListener("click",()=>{

			image.src = thumb.src;

			thumbs.forEach(t=>t.classList.remove("active"));
			thumb.classList.add("active");

		});

	});
}


/* =========================
BASIC PRODUCT INFO
========================= */

document.getElementById("productName").textContent = product.product_name;
document.getElementById("productNameBreadcrumb").textContent = product.product_name;

document.getElementById("productCategory").textContent = product.category_name;

document.getElementById("productPrice").textContent =
Number(product.price).toFixed(2);

document.getElementById("productRating").textContent = product.rating || "4.5";

/* =========================
STAR ANIMATION
========================= */

setTimeout(()=>{

const rating = parseFloat(product.rating || 4.5);

const stars = document.querySelectorAll("#productStars svg");

stars.forEach((star,index)=>{

star.style.opacity = "0.3";

setTimeout(()=>{

if(index < Math.floor(rating)){

star.style.opacity = "1";
star.style.color = "#ffd400";
star.style.fill = "#ffd400";
star.style.transform = "scale(1.15)";

}

}, index * 400);

});

},200);


/* =========================
STOCK STATUS
========================= */

const stock = document.getElementById("stockStatus");

const stockValue = product.stock ?? 0;

if (stockValue > 0) {

    stock.textContent = `In Stock — ${stockValue} available`;
    stock.classList.add("in-stock");

} else {

    stock.textContent = "Out of Stock";
    stock.classList.add("out-of-stock");

}


/* =========================
TECH SPECS
========================= */

const specGrid = document.getElementById("specGrid");

const iconMap = {
tdp: "zap",
cores: "cpu",
threads: "layers",
socket: "plug",
base_clock: "activity",
boost_clock: "gauge",
memory: "database",
bandwidth: "bar-chart",
architecture: "cpu",
cache: "server"
};

if(product.specs){

specGrid.innerHTML = "";

for(const key in product.specs){

const value = product.specs[key];
const icon = iconMap[key] || "circle";

const card = document.createElement("div");
card.className = "spec-card";

card.innerHTML = `
<div class="spec-icon">
<i data-lucide="${icon}"></i>
</div>

<div class="spec-label">
${key.replace(/_/g," ").toUpperCase()}
</div>

<div class="spec-value">
${value}
</div>
`;

specGrid.appendChild(card);

}

if(window.lucide){
lucide.createIcons();
}

}

/* =========================
PERFORMANCE ANALYSIS
(scroll triggered)
========================= */

function startPerformanceAnimation(product){

const cores = parseInt(product.specs.cores) || 0;
const boost = parseFloat(product.specs.boost_clock) || 0;
const tdp = parseInt(product.specs.tdp) || 0;

const coresScore = Math.min((cores / 32) * 100,100);
const clockScore = Math.min((boost / 6) * 100,100);
const tdpScore = Math.min((tdp / 300) * 100,100);

document.getElementById("coresBar").style.width = coresScore + "%";
document.getElementById("clockBar").style.width = clockScore + "%";
document.getElementById("tdpBar").style.width = tdpScore + "%";

}

if(product.specs){

const cores = parseInt(product.specs.cores) || 0;
const boost = parseFloat(product.specs.boost_clock) || 0;
const tdp = parseInt(product.specs.tdp) || 0;

/* Normalize values */

const coresScore = Math.min((cores / 32) * 100,100);
const clockScore = Math.min((boost / 6) * 100,100);
const tdpScore = Math.min((tdp / 300) * 100,100);

const perfSection = document.querySelector(".performance-section");

if(perfSection){

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startPerformanceAnimation(product);
observer.disconnect();

}

});

},{threshold:0.4});

observer.observe(perfSection);

}


/* Performance Tier */

let tier = "Entry Level";

if(cores >= 8) tier = "Mid Range";
if(cores >= 16) tier = "High Performance";
if(cores >= 24) tier = "Enthusiast Grade";

document.querySelector("#performanceTier .tier-value").textContent = tier;

}

/* =========================
ICONS
========================= */

if(window.lucide){
	window.lucide.createIcons();
}

/* =========================
SIMILAR PRODUCTS
========================= */

fetch(("http://localhost:8001/api/products"), { credentials: "include" })
.then(res=>res.json())
.then(products=>{

const grid = document.getElementById("similarGrid");

if(!grid) return;

const similar = products
.filter(p => p.category_name === product.category_name && p.id !== product.id)
.slice(0,4);

grid.innerHTML = "";

similar.forEach(p=>{

const card = document.createElement("div");
card.className = "similar-card";

card.innerHTML = `
<img src="http://localhost:8002${p.image_url}" />

<div class="similar-name">${p.product_name}</div>

<div class="similar-price">
$${Number(p.price).toFixed(2)}
</div>
`;

card.addEventListener("click",()=>{
window.location.href = "/products/" + p.id;
});

grid.appendChild(card);

});

});

})
.catch(err=>console.error("Product load error:", err));



/* =========================
QUANTITY BUTTONS
========================= */

const minus = document.querySelector(".qty-btn.minus");
const plus = document.querySelector(".qty-btn.plus");
const input = document.querySelector(".qty-input");

if(minus && plus && input){

minus.addEventListener("click",()=>{

	let val = parseInt(input.value) || 1;
	if(val > 1) input.value = val - 1;

});

plus.addEventListener("click",()=>{

	let val = parseInt(input.value) || 1;
	input.value = val + 1;

});

}



/* =========================
ADD TO CART ANIMATION
========================= */

const addBtn = document.querySelector(".add-to-cart-btn");

if (addBtn) {

    addBtn.addEventListener("click", () => {

        // animation
        addBtn.innerHTML = `
        <i data-lucide="check"></i>
        Added to Cart
        `;
        lucide.createIcons();

        // open drawer
        const drawer = document.getElementById("cartDrawer");
        const backdrop = document.getElementById("cartBackdrop");

        if (drawer && backdrop) {
            drawer.classList.add("is-open");
            backdrop.classList.add("is-open");
        }

        setTimeout(() => {
            addBtn.innerHTML = `
            <i data-lucide="shopping-cart"></i>
            Add to Cart
            `;
            lucide.createIcons();
        }, 3000);

    });

}

/* =========================
WISHLIST BUTTON
========================= */

const wishBtns = document.querySelectorAll(".wishlist-btn");

wishBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

btn.classList.toggle("active");

const icon = btn.querySelector("svg");

if(icon){

if(btn.classList.contains("active")){

icon.style.fill = "#ffd400";
icon.style.color = "#ffd400";
icon.style.transform = "scale(1.2)";

}else{

icon.style.fill = "none";
icon.style.color = "";
icon.style.transform = "scale(1)";

}

}

});

});
});

/* =========================
REVIEW MODAL
========================= */

const reviewBtn = document.querySelector(".write-review-btn");
const modal = document.getElementById("reviewModal");
const closeBtn = document.getElementById("closeReview");
const submitBtn = document.getElementById("submitReview");

if(reviewBtn){

reviewBtn.addEventListener("click",()=>{

modal.style.display="flex";

});

}

if(closeBtn){

closeBtn.addEventListener("click",()=>{

modal.style.display="none";

});

}

if(submitBtn){

submitBtn.addEventListener("click",()=>{

const name = document.getElementById("reviewName").value;
const rating = document.getElementById("reviewRating").value;
const text = document.getElementById("reviewText").value;

if(!name || !text) return;

const reviewSection = document.querySelector(".review-section");

const card = document.createElement("div");
card.className="review-card";

card.innerHTML=`

<div class="review-name">
${name} • Just now
</div>

<div class="review-stars">
${"★".repeat(rating)}
</div>

<p class="review-text">
${text}
</p>
`;

reviewSection.appendChild(card);

modal.style.display="none";

});

}