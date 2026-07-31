const products = [
  {
    id: 1,
    category: "gpu",
    label: "Featured 1440p GPU",
    visual: "RTX 5070",
    name: "PNY GeForce RTX 5070 12GB Overclocked Triple Fan",
    summary: "A factory-overclocked RTX 5070 with 12GB of GDDR7 memory and triple-fan cooling for high-refresh 1440p gaming.",
    price: 599,
    priceLabel: "Check current price",
    bestFor: "High-refresh 1440p gaming",
    fit: "2.4-slot card; 650W PSU recommended",
    pros: ["12GB GDDR7 memory", "Triple-fan cooling", "DLSS 4 support"],
    url: "https://amzn.to/44Ve6K7"
  },
  {
    id: 2,
    category: "ssd",
    label: "Fast storage",
    visual: "M.2",
    name: "2TB Gen 4 NVMe Pick",
    summary: "A fast, roomy SSD tier for game libraries, large downloads, and everyday responsiveness.",
    price: 149,
    priceLabel: "$120–$180",
    bestFor: "Game libraries",
    fit: "M.2 2280 slot",
    pros: ["High sequential speeds", "Comfortable 2TB capacity", "No extra cables"],
    url: "https://example.com/replace-with-affiliate-link-2"
  },
  {
    id: 3,
    category: "ram",
    label: "Safe capacity",
    visual: "32GB",
    name: "32GB Memory Upgrade",
    summary: "A practical capacity target for modern gaming, multitasking, content creation, and heavy browser use.",
    price: 89,
    priceLabel: "$70–$120",
    bestFor: "Gaming + multitasking",
    fit: "Match DDR generation",
    pros: ["Enough capacity for most users", "Reduces memory pressure", "Often better than mixed kits"],
    url: "https://example.com/replace-with-affiliate-link-3"
  },
  {
    id: 4,
    category: "monitor",
    label: "Competitive pick",
    visual: "240Hz",
    name: "High-Refresh 1440p Monitor",
    summary: "A sharp, responsive display tier for competitive games without dropping back to 1080p resolution.",
    price: 399,
    priceLabel: "$300–$500",
    bestFor: "Fast-paced games",
    fit: "DisplayPort preferred",
    pros: ["Smooth motion", "Sharper than 1080p", "Strong all-around setup"],
    url: "https://example.com/replace-with-affiliate-link-4"
  },
  {
    id: 5,
    category: "psu",
    label: "Upgrade headroom",
    visual: "850W",
    name: "850W Gold Power Supply",
    summary: "A sensible wattage tier for many higher-end single-GPU builds with room for component upgrades.",
    price: 139,
    priceLabel: "$110–$180",
    bestFor: "High-end single GPU",
    fit: "ATX case",
    pros: ["Useful power headroom", "Efficiency-focused tier", "Modern cable options"],
    url: "https://example.com/replace-with-affiliate-link-5"
  },
  {
    id: 6,
    category: "gpu",
    label: "Budget upgrade",
    visual: "1080p",
    name: "Efficient 1080p GPU Pick",
    summary: "A lower-cost card tier for esports and mainstream 1080p gaming with modest power requirements.",
    price: 279,
    priceLabel: "$230–$330",
    bestFor: "1080p gaming",
    fit: "Most mid towers",
    pros: ["Lower upfront cost", "Easy PSU requirements", "Solid esports performance"],
    url: "https://example.com/replace-with-affiliate-link-6"
  },
  {
    id: 7,
    category: "ssd",
    label: "Budget storage",
    visual: "1TB",
    name: "1TB NVMe Starter Upgrade",
    summary: "An affordable way to move away from a small boot drive or slower SATA-based game storage.",
    price: 69,
    priceLabel: "$55–$90",
    bestFor: "First NVMe upgrade",
    fit: "M.2 slot required",
    pros: ["Affordable entry point", "Simple installation", "Fast everyday loading"],
    url: "https://example.com/replace-with-affiliate-link-7"
  },
  {
    id: 8,
    category: "monitor",
    label: "Best starter display",
    visual: "165Hz",
    name: "Affordable 1080p 165Hz Monitor",
    summary: "A straightforward first high-refresh display for competitive gaming on a tighter budget.",
    price: 179,
    priceLabel: "$140–$220",
    bestFor: "Budget esports",
    fit: "Desk-friendly size",
    pros: ["Noticeably smoother than 60Hz", "Low entry price", "Easy GPU pairing"],
    url: "https://example.com/replace-with-affiliate-link-8"
  },
  {
    id: 9,
    category: "ram",
    label: "Creator capacity",
    visual: "64GB",
    name: "64GB Heavy-Multitasking Kit",
    summary: "A higher-capacity memory tier for editing, virtual machines, large projects, and demanding multitasking.",
    price: 169,
    priceLabel: "$130–$220",
    bestFor: "Creation workflows",
    fit: "Check board limits",
    pros: ["Large working capacity", "Useful for heavy workloads", "Cleaner than mixed kits"],
    url: "https://example.com/replace-with-affiliate-link-9"
  }
];

const state = {
  category: "all",
  query: "",
  sort: "featured",
  maxBudget: Infinity
};

const productGrid = document.getElementById("productGrid");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
const categoryButtons = [...document.querySelectorAll("[data-category]")];
const productSearch = document.getElementById("productSearch");
const sortProducts = document.getElementById("sortProducts");
const clearFilters = document.getElementById("clearFilters");

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-visual">
        <span class="product-badge">${product.label}</span>
        <div class="product-visual-inner">${product.visual}</div>
      </div>
      <div class="product-content">
        <div class="product-type">${product.category}</div>
        <h3>${product.name}</h3>
        <p class="product-summary">${product.summary}</p>
        <div class="product-meta">
          <div><span>Best for</span><strong>${product.bestFor}</strong></div>
          <div><span>Compatibility</span><strong>${product.fit}</strong></div>
        </div>
        <ul class="product-pros">${product.pros.map(item => `<li>${item}</li>`).join("")}</ul>
        <div class="product-footer">
          <div class="price-band"><span>Typical range</span><strong>${product.priceLabel}</strong></div>
          <a class="product-link" href="${product.url}" target="_blank" rel="sponsored nofollow noopener">Check price</a>
        </div>
      </div>
    </article>
  `;
}

function getFilteredProducts() {
  let filtered = products.filter(product => {
    const categoryMatch = state.category === "all" || product.category === state.category;
    const searchMatch = `${product.name} ${product.summary} ${product.category} ${product.bestFor}`.toLowerCase().includes(state.query);
    const budgetMatch = product.price <= state.maxBudget;
    return categoryMatch && searchMatch && budgetMatch;
  });

  if (state.sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") filtered.sort((a, b) => b.price - a.price);
  return filtered;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productGrid.innerHTML = filtered.map(productCard).join("");
  resultsCount.textContent = `${filtered.length} recommendation${filtered.length === 1 ? "" : "s"}`;
  emptyState.hidden = filtered.length !== 0;
}

function setCategory(category) {
  state.category = category;
  categoryButtons.forEach(button => button.classList.toggle("active", button.dataset.category === category));
  renderProducts();
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    state.maxBudget = Infinity;
    setCategory(button.dataset.category);
    document.getElementById("recommendations").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

productSearch.addEventListener("input", event => {
  state.query = event.target.value.trim().toLowerCase();
  renderProducts();
});

sortProducts.addEventListener("change", event => {
  state.sort = event.target.value;
  renderProducts();
});

clearFilters.addEventListener("click", () => {
  state.category = "all";
  state.query = "";
  state.sort = "featured";
  state.maxBudget = Infinity;
  productSearch.value = "";
  sortProducts.value = "featured";
  categoryButtons.forEach(button => button.classList.toggle("active", button.dataset.category === "all"));
  renderProducts();
});

document.getElementById("upgradeForm").addEventListener("submit", event => {
  event.preventDefault();
  const category = document.getElementById("upgradeType").value;
  const budget = Number(document.getElementById("budget").value);
  state.category = category;
  state.maxBudget = budget;
  state.query = "";
  productSearch.value = "";
  categoryButtons.forEach(button => button.classList.toggle("active", button.dataset.category === category));
  renderProducts();
  const matches = getFilteredProducts().length;
  document.getElementById("formResult").textContent = matches
    ? `${matches} matching recommendation${matches === 1 ? "" : "s"} found below.`
    : "No current pick matches that budget. Add a lower-cost option to the product list.";
  document.getElementById("recommendations").scrollIntoView({ behavior: "smooth", block: "start" });
});

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
menuButton.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
mainNav.addEventListener("click", event => {
  if (event.target.matches("a")) {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
renderProducts();
