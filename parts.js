(function(){
 const links=window.PC_AFFILIATE_LINKS||{};
 const topSellers=[
  {name:'AMD Ryzen 7 9800X3D',label:'Top gaming CPU seller',reason:'It combines elite gaming performance with the established AM5 platform, so buyers see it as a high-end upgrade without moving to an entirely different ecosystem.'},
  {name:'AMD Ryzen 5 5600',label:'Popular low-cost AM4 upgrade',reason:'It remains attractive because many existing AM4 owners can gain a meaningful CPU upgrade while keeping their motherboard and DDR4 memory.'},
  {name:'AMD Ryzen 5 9600X',label:'Current-value AM5 CPU',reason:'It offers a modern Zen 5 platform, strong gaming performance and a lower entry price than premium X3D processors.'},
  {name:'NVIDIA GeForce RTX 5070',label:'High-interest 1440p GPU',reason:'It targets the widely shopped high-refresh 1440p tier and includes current-generation NVIDIA features without reaching flagship pricing.'},
  {name:'NVIDIA GeForce RTX 5070 Ti',label:'Popular 16GB performance tier',reason:'Buyers seeking stronger 1440p and usable 4K performance are drawn to its 16GB memory and step up over the standard RTX 5070.'},
  {name:'AMD Radeon RX 9060 XT 16GB',label:'Popular midrange 16GB option',reason:'Its 16GB memory makes it appealing to shoppers who want a current midrange card with more VRAM than many similarly positioned alternatives.'},
  {name:'AMD Radeon RX 9070 XT',label:'Strong-selling Radeon upgrade',reason:'It attracts buyers looking for high raster performance, 16GB of memory and a competitive high-refresh 1440p or 4K option.'},
  {name:'NVIDIA GeForce RTX 3060 12GB',label:'Long-running budget seller',reason:'Its broad availability, 12GB memory and familiar performance keep it popular with value-focused buyers and older-system upgrades.'}
 ].filter(item=>links[item.name]);
 const category=name=>name.startsWith('AMD Ryzen')?'amd-cpu':name.startsWith('Intel ')?'intel-cpu':name.startsWith('NVIDIA ')?'nvidia-gpu':name.startsWith('AMD Radeon')?'amd-gpu':name.startsWith('Intel Arc')?'intel-gpu':'motherboard';
 const categoryLabel={
  'amd-cpu':'AMD CPU','intel-cpu':'Intel CPU','nvidia-gpu':'NVIDIA GPU','amd-gpu':'AMD GPU','intel-gpu':'Intel GPU','motherboard':'Motherboard'
 };
 const reasonFor=name=>{
  const c=category(name);
  if(c==='amd-cpu')return name.includes('X3D')?'Gaming-focused processor with extra cache and an upgrade path tied to its AMD socket platform.':'Desktop Ryzen processor for gaming, upgrades or general-purpose builds.';
  if(c==='intel-cpu')return name.includes('Core Ultra')?'Current Intel desktop platform option for new LGA1851 builds.':'Intel desktop processor commonly considered for gaming and mixed-use systems.';
  if(c==='nvidia-gpu')return 'GeForce graphics option for gaming, streaming and NVIDIA feature support; compare exact card dimensions and power requirements.';
  if(c==='amd-gpu')return 'Radeon graphics option emphasizing gaming performance and VRAM value; verify the exact board model before purchase.';
  if(c==='intel-gpu')return 'Intel Arc graphics option for budget-conscious builds; current drivers and game support should be checked.';
  return 'Retail motherboard option from the submitted affiliate catalog. Verify CPU support, BIOS version, memory type and exact board revision.';
 };
 const products=Object.entries(links).map(([name,url])=>({name,url,category:category(name)})).sort((a,b)=>a.name.localeCompare(b.name));
 const sellerRoot=document.getElementById('sellerGrid');
 sellerRoot.innerHTML=topSellers.map(item=>`<article class="seller-card"><small>${item.label}</small><h3>${item.name}</h3><p class="seller-reason"><strong>Why it is selling:</strong> ${item.reason}</p><a href="${links[item.name]}" target="_blank" rel="sponsored nofollow noopener">Check current price on Amazon</a></article>`).join('');
 document.getElementById('partsTotal').textContent=products.length;
 const grid=document.getElementById('partsGrid'),count=document.getElementById('partsCount'),search=document.getElementById('partsSearch'),buttons=[...document.querySelectorAll('[data-filter]')];
 let active='all';
 function render(){
  const q=search.value.trim().toLowerCase();
  const shown=products.filter(item=>(active==='all'||item.category===active)&&item.name.toLowerCase().includes(q));
  count.textContent=`${shown.length} product${shown.length===1?'':'s'} shown`;
  grid.innerHTML=shown.length?shown.map(item=>`<article class="part-card"><span class="part-type">${categoryLabel[item.category]}</span><h3>${item.name}</h3><p>${reasonFor(item.name)}</p><a href="${item.url}" target="_blank" rel="sponsored nofollow noopener">Check current price on Amazon</a></article>`).join(''):'<div class="empty-parts">No products match this search and filter.</div>';
 }
 buttons.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;buttons.forEach(x=>x.classList.toggle('active',x===button));render()}));
 search.addEventListener('input',render);
 const menuButton=document.getElementById('menuButton'),mainNav=document.getElementById('mainNav');
 menuButton?.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});
 mainNav?.addEventListener('click',e=>{if(e.target.matches('a')){mainNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}});
 document.getElementById('currentYear').textContent=new Date().getFullYear();
 render();
})();