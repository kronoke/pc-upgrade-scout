(function(){
  const boardName='ASUS Prime Z590-V';
  if(typeof boards!=='undefined'&&!boards.some(item=>item.name.toLowerCase()===boardName.toLowerCase())){
    boards.push({name:boardName,socket:'LGA1200',memory:'DDR4'});
    boards.sort((a,b)=>a.name.localeCompare(b.name));
    if(typeof populate==='function')populate('boardOptions',boards);
  }

  const form=document.getElementById('builderForm');
  const button=document.getElementById('calculateButton');
  const panel=document.getElementById('resultsPanel');
  if(!form||!button||!panel)return;

  const fieldGrid=form.querySelector('.field-grid');
  if(fieldGrid&&!form.querySelector('.bios-guide-inline')){
    const note=document.createElement('div');note.className='bios-guide-inline';note.innerHTML='<strong>CPU fits the socket—but will it boot?</strong><span>Some motherboard and CPU combinations require a BIOS update first.</span><a href="cpu-motherboard-bios-compatibility-guide.html">Learn how to check BIOS support safely →</a>';fieldGrid.insertAdjacentElement('afterend',note);
  }
  const biosScript=document.createElement('script');biosScript.src='calculator-bios-support.js';biosScript.defer=true;document.head.appendChild(biosScript);
  let hasCalculated=false,timer=null;
  function addEditControl(){if(panel.querySelector('.empty-results')||panel.querySelector('.edit-parts-button'))return;const edit=document.createElement('button');edit.type='button';edit.className='edit-parts-button';edit.textContent='Change parts';edit.addEventListener('click',()=>{form.scrollIntoView({behavior:'smooth',block:'start'});const first=form.querySelector('input,select');if(first)setTimeout(()=>first.focus({preventScroll:true}),450)});panel.prepend(edit);}
  button.addEventListener('click',()=>{hasCalculated=true;setTimeout(addEditControl,0)});
  form.addEventListener('input',event=>{if(!hasCalculated||event.target.id==='calculateButton')return;clearTimeout(timer);timer=setTimeout(()=>button.click(),350)});
  form.addEventListener('change',event=>{if(!hasCalculated||event.target.id==='calculateButton')return;clearTimeout(timer);timer=setTimeout(()=>button.click(),50)});
  new MutationObserver(()=>{if(hasCalculated)addEditControl()}).observe(panel,{childList:true});
  const style=document.createElement('style');style.textContent='.edit-parts-button{margin:0 0 16px;padding:10px 15px;border:1px solid rgba(241,224,198,.3);border-radius:999px;background:rgba(255,255,255,.06);color:#f2d19a;font:inherit;font-weight:800;cursor:pointer}.edit-parts-button:hover{background:rgba(255,255,255,.1)}.bios-guide-inline{grid-column:1/-1;margin:0 0 20px;padding:16px 18px;border:1px solid rgba(241,224,198,.18);border-radius:16px;background:rgba(255,255,255,.04);display:flex;gap:9px;flex-direction:column}.bios-guide-inline span{color:#d8d0e1}.bios-guide-inline a,.bios-actions a{color:#f2d19a;font-weight:800}.bios-support-result{margin-top:18px;padding:20px;border:1px solid rgba(241,224,198,.18);border-radius:18px;background:rgba(255,255,255,.04)}.bios-support-result.warn{border-color:rgba(245,190,86,.5)}.bios-support-result.bad{border-color:rgba(239,112,112,.55)}.bios-support-result.good{border-color:rgba(105,211,160,.4)}.bios-support-result>span{font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:#8ed6d0;font-weight:800}.bios-support-result h3{margin:8px 0}.bios-support-result p,.bios-support-result small{line-height:1.65}.bios-actions{display:flex;gap:10px;flex-wrap:wrap;margin:15px 0}.bios-actions a{padding:9px 12px;border:1px solid rgba(241,224,198,.2);border-radius:999px;text-decoration:none}';document.head.appendChild(style);
  function loadRecommendationCards(){if(document.querySelector('script[data-calculator-affiliate]'))return;const script=document.createElement('script');script.src='calculator-affiliate-recommendation.js';script.dataset.calculatorAffiliate='true';document.body.appendChild(script);}
  if(window.PC_AFFILIATE_LINKS){loadRecommendationCards()}else{const catalog=document.createElement('script');catalog.src='affiliate-products.js';catalog.onload=loadRecommendationCards;document.body.appendChild(catalog)}
  const help=document.createElement('script');help.src='help-feedback.js';help.defer=true;document.body.appendChild(help);
})();