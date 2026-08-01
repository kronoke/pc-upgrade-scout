(function(){
 const links=window.PC_AFFILIATE_LINKS||{};
 const gear=document.querySelector('.gear-section');
 if(!gear)return;
 const section=document.createElement('section');
 section.className='market-2026-section';
 const hot=[
  ['AMD Ryzen 7 9800X3D','Top-selling gaming CPU','One of Amazon’s strongest-selling gaming processors and a leading choice for high-FPS builds.'],
  ['AMD Ryzen 7 7800X3D','Popular value X3D CPU','Still widely bought because it delivers excellent gaming performance on AM5.'],
  ['NVIDIA GeForce RTX 5070','Popular current-generation GPU','A frequently purchased 1440p card with current-generation features.'],
  ['NVIDIA GeForce RTX 5070 Ti','High-end 1440p / entry 4K','A strong step up for higher settings, ray tracing and longer upgrade cycles.'],
  ['AMD Radeon RX 9070 XT','Popular 16GB alternative','A strong raster-performance option for high-refresh 1440p and 4K gaming.'],
  ['AMD Radeon RX 9060 XT 16GB','Value-focused 16GB GPU','A current midrange option for buyers prioritizing VRAM and price.']
 ];
 const buy=(name,label='Check current price')=>links[name]?`<a href="${links[name]}" target="_blank" rel="sponsored nofollow noopener">${label}</a>`:'<span class="no-link">Amazon listing not added</span>';
 section.innerHTML=`<div class="container"><div class="section-heading"><div><div class="eyebrow">2026 buying trends</div><h2>Hot-selling PC parts right now</h2></div><p>These are current high-interest retail parts, not permanent rankings. Availability and pricing can change quickly.</p></div><div class="hot-grid">${hot.map(([name,badge,text])=>`<article class="hot-card"><span>${badge}</span><h3>${name}</h3><p>${text}</p>${buy(name)}</article>`).join('')}</div><p style="margin:20px 0 32px"><a class="button secondary" href="parts.html">Browse all linked PC parts</a></p><div class="optimal-build-card"><div class="optimal-copy"><div class="eyebrow">PC Upgrade Scout pick</div><h2>Optimal 2026 gaming PC core</h2><p>Designed for excellent high-refresh 1440p performance with enough graphics power for 4K. This prioritizes gaming performance, a modern AM5 upgrade path and sensible power headroom.</p><div class="optimal-parts"><div><small>CPU</small><strong>AMD Ryzen 7 9800X3D</strong>${buy('AMD Ryzen 7 9800X3D','View CPU')}</div><div><small>GPU</small><strong>AMD Radeon RX 9070 XT 16GB</strong>${buy('AMD Radeon RX 9070 XT','View GPU')}</div><div><small>Motherboard</small><strong>MSI B850 Gaming Plus WiFi</strong>${buy('MSI B850 Gaming Plus WiFi','View motherboard')}</div><div><small>Memory</small><strong>32GB DDR5-6000 CL30</strong><span>Recommended specification</span></div><div><small>Storage</small><strong>2TB PCIe 4.0 NVMe SSD</strong><span>Recommended specification</span></div><div><small>Power</small><strong>850W 80+ Gold ATX 3.1 PSU</strong><span>Recommended specification</span></div><div><small>Cooling</small><strong>Strong dual-tower air cooler or 240mm AIO</strong><span>Recommended specification</span></div><div><small>Case</small><strong>High-airflow ATX case with 340mm+ GPU clearance</strong><span>Recommended specification</span></div></div><p class="optimal-note">The CPU, GPU and motherboard use your submitted affiliate links. The remaining items are specification targets until exact affiliate products are selected.</p></div><div class="optimal-score"><b>9.4</b><span>/ 10 estimated balance</span><ul><li>Excellent gaming CPU</li><li>16GB graphics memory</li><li>Modern AM5 platform</li><li>850W upgrade headroom</li></ul><a class="button primary" href="pc-compatibility-calculator.html">Customize this build</a></div></div></div>`;
 gear.parentNode.insertBefore(section,gear);

 const paths=document.querySelector('.path-section');
 if(paths&&!document.querySelector('.bios-home-feature')){
  const bios=document.createElement('section');bios.className='bios-home-feature';
  bios.innerHTML='<div class="container"><div class="tool-feature-grid"><div><div class="eyebrow">CPU and motherboard help</div><h2>Will this CPU actually boot on your motherboard?</h2><p>A matching socket does not always guarantee immediate support. The chipset and installed BIOS version can still determine whether the system starts.</p><a class="button primary" href="cpu-motherboard-bios-compatibility-guide.html">Check BIOS compatibility safely</a></div><div class="tool-points"><div class="tool-point"><b>Socket compatibility</b><span>Confirm the processor physically fits the motherboard.</span></div><div class="tool-point"><b>Chipset and generation</b><span>See when an older board may need updated firmware for a newer CPU.</span></div><div class="tool-point"><b>Official BIOS downloads</b><span>Use direct manufacturer support resources instead of third-party firmware sites.</span></div></div></div></div>';
  paths.insertAdjacentElement('afterend',bios);
  const style=document.createElement('style');style.textContent='.bios-home-feature{padding:60px 0;background:linear-gradient(135deg,rgba(80,73,124,.18),rgba(23,21,42,.96));border-top:1px solid rgba(241,224,198,.1);border-bottom:1px solid rgba(241,224,198,.1)}';document.head.appendChild(style);
 }
 const nav=document.getElementById('mainNav');
 if(nav&&!nav.querySelector('a[href="parts.html"]')){
  const link=document.createElement('a');link.href='parts.html';link.textContent='PC parts';
  const builds=[...nav.querySelectorAll('a')].find(a=>a.textContent.trim()==='PC builds');
  builds?builds.insertAdjacentElement('beforebegin',link):nav.appendChild(link);
 }
})();