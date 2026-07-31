const products = [
  {
    id: 1,
    order: 1,
    category: "cpu",
    label: "CPU + included cooler",
    visual: "CPU",
    name: "AMD Ryzen 5 9600 with Wraith Stealth Cooler",
    summary: "A beginner-friendly 6-core, 12-thread AM5 processor. The included Wraith Stealth cooler removes the need to choose a separate CPU cooler for this build.",
    bestFor: "1440p gaming and everyday use",
    fit: "AM5 socket · Cooler included",
    pros: ["6 cores and 12 threads", "65W processor", "Works with the selected B850 motherboard"],
    url: "https://amzn.to/4pMuKF8"
  },
  {
    id: 2,
    order: 2,
    category: "motherboard",
    label: "AM5 foundation",
    visual: "B850",
    name: "MSI B850 Gaming Plus WiFi Motherboard",
    summary: "The full-size ATX motherboard that connects the build. It supports Ryzen 9000 processors, DDR5 memory, AMD EXPO profiles, NVMe storage, and built-in wireless networking.",
    bestFor: "A straightforward modern platform",
    fit: "ATX · AM5 · DDR5 · Wi-Fi",
    pros: ["Ryzen 9000 support", "Four DDR5 memory slots", "Built-in Wi-Fi and Bluetooth"],
    url: "https://amzn.to/4fv65l9"
  },
  {
    id: 3,
    order: 3,
    category: "ram",
    label: "Matched memory kit",
    visual: "32GB",
    name: "Kingston FURY Beast 32GB DDR5-6000 CL30 AMD EXPO Kit",
    summary: "A matched 2×16GB DDR5 kit with an AMD EXPO profile. Thirty-two gigabytes is a comfortable target for gaming, multitasking, and background applications.",
    bestFor: "Gaming and multitasking",
    fit: "2×16GB · DDR5-6000 · CL30 · EXPO",
    pros: ["Dual-channel matched kit", "Low CL30 latency", "Designed for AMD EXPO"],
    url: "https://amzn.to/4fLhLio"
  },
  {
    id: 4,
    order: 4,
    category: "ssd",
    label: "Fast 2TB storage",
    visual: "2TB",
    name: "Crucial T500 2TB PCIe Gen4 NVMe M.2 SSD",
    summary: "A roomy PCIe 4.0 NVMe drive for Windows, applications, and a sizable game library. This selection is the version without its own heatsink.",
    bestFor: "Operating system and game library",
    fit: "M.2 2280 · PCIe 4.0 NVMe",
    pros: ["Two-terabyte capacity", "No SATA cables required", "Fits the motherboard M.2 slot"],
    url: "https://amzn.to/4g3gEfg"
  },
  {
    id: 5,
    order: 5,
    category: "gpu",
    label: "1440p graphics card",
    visual: "5070",
    name: "PNY NVIDIA GeForce RTX 5070 OC Triple Fan 12GB",
    summary: "The main gaming component in this build. It provides 12GB of GDDR7 memory and targets high-quality 1440p gaming with modern NVIDIA rendering features.",
    bestFor: "High-quality 1440p gaming",
    fit: "PCIe x16 · Triple-fan card",
    pros: ["12GB GDDR7 memory", "Overclocked triple-fan design", "Paired with a modern ATX 3.1 PSU"],
    url: "https://amzn.to/4yOZadX"
  },
  {
    id: 6,
    order: 6,
    category: "psu",
    label: "Modern power supply",
    visual: "750W",
    name: "Corsair RM750e 750W Fully Modular ATX 3.1 Power Supply",
    summary: "A modern, fully modular power supply selected to provide sensible headroom for the Ryzen 5 and RTX 5070 combination while keeping cable management approachable.",
    bestFor: "Powering the complete build",
    fit: "750W · Fully modular · ATX 3.1",
    pros: ["Modern GPU power support", "Only install the cables you need", "Comfortable capacity for this parts list"],
    url: "https://amzn.to/3RKEhzX"
  },
  {
    id: 7,
    order: 7,
    category: "case",
    label: "Airflow-focused case",
    visual: "ATX",
    name: "Montech AIR 903 MAX Case",
    summary: "A roomy ATX case chosen to make first-time assembly and cable routing less cramped while providing an airflow-focused layout for the selected components.",
    bestFor: "First-time building and airflow",
    fit: "ATX mid-tower",
    pros: ["Supports the selected ATX board", "Roomy internal layout", "Designed around strong airflow"],
    url: "https://amzn.to/4vV2HFb"
  }
];

const categoryLabels = {
  cpu: "Processor",
  motherboard: "Motherboard",
  ram: "Memory",
  ssd: "Storage",
  gpu: "Graphics card",
  psu: "Power supply",
  case: "Case"
};

const state = {
  category: "all",
  query: "",
  sort: "build-order"
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
        <div class="product-type">${categoryLabels[product.category]}</div>
        <h3>${product.name}</h3>
        <p class="product-summary">${product.summary}</p>
        <div class="product-meta">
          <div><span>Best for</span><strong>${product.bestFor}</strong></div>
          <div><span>Compatibility</span><strong>${product.fit}</strong></div>
        </div>
        <ul class="product-pros">${product.pros.map(item => `<li>${item}</li>`).join("")}</ul>
        <div class="product-footer">
          <div class="price-band"><span>Retailer</span><strong>Check current price</strong></div>
          <a class="product-link" href="${product.url}" target="_blank" rel="sponsored nofollow noopener">View on Amazon</a>
        </div>
      </div>
    </article>
  `;
}

function getFilteredProducts() {
  const filtered = products.filter(product => {
    const categoryMatch = state.category === "all" || product.category === state.category;
    const searchable = `${product.name} ${product.summary} ${product.category} ${product.bestFor} ${product.fit}`.toLowerCase();
    return categoryMatch && searchable.includes(state.query);
  });

  if (state.sort === "component") {
    filtered.sort((a, b) => categoryLabels[a.category].localeCompare(categoryLabels[b.category]));
  } else {
    filtered.sort((a, b) => a.order - b.order);
  }

  return filtered;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productGrid.innerHTML = filtered.map(productCard).join("");
  resultsCount.textContent = `${filtered.length} build component${filtered.length === 1 ? "" : "s"}`;
  emptyState.hidden = filtered.length !== 0;
}

function setCategory(category) {
  state.category = category;
  categoryButtons.forEach(button => button.classList.toggle("active", button.dataset.category === category));
  renderProducts();
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
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
  state.sort = "build-order";
  productSearch.value = "";
  sortProducts.value = "build-order";
  categoryButtons.forEach(button => button.classList.toggle("active", button.dataset.category === "all"));
  renderProducts();
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
