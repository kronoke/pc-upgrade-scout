(function(){
  const root=document.getElementById('catalogChecklist');
  if(!root)return;

  const priorityNames=[
    // AMD CPUs: strong current demand, AM4 upgrades, and AM5 gaming picks
    'AMD Ryzen 5 5600','AMD Ryzen 5 5600X','AMD Ryzen 5 5600G','AMD Ryzen 5 5600GT',
    'AMD Ryzen 7 5700X','AMD Ryzen 7 5700X3D','AMD Ryzen 7 5800X','AMD Ryzen 7 5800X3D',
    'AMD Ryzen 9 5900X','AMD Ryzen 9 5950X',
    'AMD Ryzen 5 7600','AMD Ryzen 5 7600X','AMD Ryzen 5 7600X3D',
    'AMD Ryzen 7 7700','AMD Ryzen 7 7700X','AMD Ryzen 7 7800X3D',
    'AMD Ryzen 9 7900','AMD Ryzen 9 7900X','AMD Ryzen 9 7950X','AMD Ryzen 9 7950X3D',
    'AMD Ryzen 5 8600G','AMD Ryzen 7 8700G',
    'AMD Ryzen 5 9600','AMD Ryzen 5 9600X','AMD Ryzen 7 9700X','AMD Ryzen 7 9800X3D',
    'AMD Ryzen 9 9900X','AMD Ryzen 9 9900X3D','AMD Ryzen 9 9950X','AMD Ryzen 9 9950X3D',

    // Intel CPUs: still sensible retail choices and common upgrade searches
    'Intel Core i3-12100F','Intel Core i5-12400F','Intel Core i5-12600K','Intel Core i5-12600KF',
    'Intel Core i7-12700K','Intel Core i7-12700KF',
    'Intel Core i5-13400F','Intel Core i5-13500','Intel Core i5-13600K','Intel Core i5-13600KF',
    'Intel Core i7-13700K','Intel Core i7-13700KF',
    'Intel Core i5-14400F','Intel Core i5-14500','Intel Core i5-14600K','Intel Core i5-14600KF',
    'Intel Core i7-14700K','Intel Core i7-14700KF',
    'Intel Core Ultra 5 245K','Intel Core Ultra 5 245KF','Intel Core Ultra 7 265K','Intel Core Ultra 7 265KF','Intel Core Ultra 9 285K',

    // NVIDIA GPUs: current retail and commonly searched upgrade tiers
    'NVIDIA GeForce RTX 3060 12GB','NVIDIA GeForce RTX 4060','NVIDIA GeForce RTX 4060 Ti 8GB','NVIDIA GeForce RTX 4060 Ti 16GB',
    'NVIDIA GeForce RTX 4070','NVIDIA GeForce RTX 4070 Super','NVIDIA GeForce RTX 4070 Ti Super','NVIDIA GeForce RTX 4080 Super',
    'NVIDIA GeForce RTX 5060','NVIDIA GeForce RTX 5060 Ti 8GB','NVIDIA GeForce RTX 5060 Ti 16GB','NVIDIA GeForce RTX 5070','NVIDIA GeForce RTX 5070 Ti','NVIDIA GeForce RTX 5080','NVIDIA GeForce RTX 5090',

    // AMD and Intel GPUs: currently relevant new-buy options
    'AMD Radeon RX 6600','AMD Radeon RX 6650 XT','AMD Radeon RX 6750 XT','AMD Radeon RX 7600','AMD Radeon RX 7600 XT',
    'AMD Radeon RX 7700 XT','AMD Radeon RX 7800 XT','AMD Radeon RX 7900 GRE','AMD Radeon RX 7900 XT','AMD Radeon RX 7900 XTX',
    'AMD Radeon RX 9060 XT 16GB','AMD Radeon RX 9070','AMD Radeon RX 9070 XT',
    'Intel Arc B580',

    // Motherboards already present in the calculator that are useful affiliate targets
    'MSI B550 Tomahawk','ASUS TUF Gaming B550-Plus','MSI B650 Gaming Plus WiFi','MSI B850 Gaming Plus WiFi',
    'ASUS TUF Gaming B650-Plus WiFi','Gigabyte B650 AORUS Elite AX','ASUS ROG Strix X670E-E Gaming WiFi',
    'MSI PRO B760-P WiFi DDR4','MSI PRO B760-P WiFi DDR5','ASUS TUF Gaming Z790-Plus WiFi','Gigabyte Z790 AORUS Elite AX',
    'ASUS TUF Gaming Z890-Plus WiFi','MSI MAG Z890 Tomahawk WiFi'
  ];

  const prioritySet=new Set(priorityNames.map(name=>name.toLowerCase()));
  const selected=(items)=>items.filter(item=>prioritySet.has(item.name.toLowerCase()));
  const groups=[
    ['AMD CPUs to link',selected(cpus.filter(x=>x.name.startsWith('AMD Ryzen')))],
    ['Intel CPUs to link',selected(cpus.filter(x=>x.name.startsWith('Intel ')))],
    ['NVIDIA GPUs to link',selected(gpus.filter(x=>x.name.startsWith('NVIDIA ')))],
    ['AMD Radeon GPUs to link',selected(gpus.filter(x=>x.name.startsWith('AMD Radeon')))],
    ['Intel Arc GPUs to link',selected(gpus.filter(x=>x.name.startsWith('Intel Arc')))],
    ['Motherboards to link',selected(boards)]
  ].filter(([,items])=>items.length);

  const item=(product)=>`<li><label><input type="checkbox" /><span>${product.name}</span></label><input class="affiliate-entry" type="url" placeholder="Paste Amazon affiliate link" aria-label="Amazon affiliate link for ${product.name}" /></li>`;
  root.innerHTML=groups.map(([title,items])=>`<section class="checklist-group"><div class="checklist-heading"><h2>${title}</h2><span>${items.length} priority products</span></div><ol>${items.sort((a,b)=>a.name.localeCompare(b.name)).map(item).join('')}</ol></section>`).join('');
  document.getElementById('catalogTotal').textContent=String(groups.reduce((sum,g)=>sum+g[1].length,0));
})();