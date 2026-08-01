(function(){
  const root=document.getElementById('catalogChecklist');
  if(!root)return;
  const groups=[
    ['Intel desktop CPUs',cpus.filter(x=>x.name.startsWith('Intel '))],
    ['AMD desktop CPUs',cpus.filter(x=>x.name.startsWith('AMD Ryzen'))],
    ['NVIDIA desktop GPUs',gpus.filter(x=>x.name.startsWith('NVIDIA '))],
    ['AMD Radeon desktop GPUs',gpus.filter(x=>x.name.startsWith('AMD Radeon'))],
    ['Intel Arc desktop GPUs',gpus.filter(x=>x.name.startsWith('Intel Arc'))],
    ['Motherboard platforms',boards]
  ];
  const item=(product,index)=>`<li><label><input type="checkbox" /><span>${product.name}</span></label><input class="affiliate-entry" type="url" placeholder="Paste Amazon affiliate link" aria-label="Amazon affiliate link for ${product.name}" /></li>`;
  root.innerHTML=groups.map(([title,items])=>`<section class="checklist-group"><div class="checklist-heading"><h2>${title}</h2><span>${items.length} entries</span></div><ol>${items.sort((a,b)=>a.name.localeCompare(b.name)).map(item).join('')}</ol></section>`).join('');
  document.getElementById('catalogTotal').textContent=String(groups.reduce((sum,g)=>sum+g[1].length,0));
})();