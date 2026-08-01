(function(){
  const panel=document.getElementById('resultsPanel');
  if(!panel)return;

  let selectedRecommendation=null;

  function currentValueFor(type){
    const ids={board:'boardInput',case:'caseInput',cpu:'cpuInput',gpu:'gpuInput',ram:'ramCapacity',ramType:'ramType',psu:'psuWattage'};
    const field=document.getElementById(ids[type]);
    return field?field.value:'';
  }

  function renderSelectedRecommendation(){
    panel.querySelector('.selected-recommendation-product')?.remove();
    if(!selectedRecommendation)return;
    if(currentValueFor(selectedRecommendation.type)!==selectedRecommendation.value)return;

    const links=window.PC_AFFILIATE_LINKS||{};
    const url=links[selectedRecommendation.value];
    const card=document.createElement('section');
    card.className='selected-recommendation-product';
    card.setAttribute('aria-label','Selected recommended product');
    card.innerHTML=`<div><small>Recommendation applied</small><h3>${selectedRecommendation.value}</h3><p>This item is now included in the configuration above. The compatibility score and checks have been recalculated.</p></div>${url?`<a href="${url}" target="_blank" rel="sponsored nofollow noopener" aria-label="Check current Amazon price for ${selectedRecommendation.value}">Check current price on Amazon</a>`:`<span class="selected-product-unlinked">No verified retailer link is available for this exact item.</span>`}`;

    const recommendations=panel.querySelector('.upgrade-recommendations');
    if(recommendations)recommendations.insertAdjacentElement('beforebegin',card);
    else panel.append(card);
  }

  panel.addEventListener('click',event=>{
    const button=event.target.closest('[data-rec-type][data-rec-value]');
    if(!button)return;
    selectedRecommendation={type:button.dataset.recType,value:button.dataset.recValue};
    setTimeout(renderSelectedRecommendation,80);
  });

  document.getElementById('builderForm')?.addEventListener('input',()=>setTimeout(renderSelectedRecommendation,420));
  document.getElementById('builderForm')?.addEventListener('change',()=>setTimeout(renderSelectedRecommendation,120));
  document.getElementById('resetCalculator')?.addEventListener('click',()=>{selectedRecommendation=null;});

  new MutationObserver(()=>{
    if(selectedRecommendation&&!panel.querySelector('.selected-recommendation-product'))setTimeout(renderSelectedRecommendation,0);
  }).observe(panel,{childList:true,subtree:false});

  const style=document.createElement('style');
  style.textContent=`.selected-recommendation-product{margin:18px 0;padding:20px;border:1px solid rgba(142,214,208,.38);border-radius:20px;background:linear-gradient(135deg,rgba(142,214,208,.12),rgba(255,255,255,.045));display:flex;align-items:center;justify-content:space-between;gap:18px}.selected-recommendation-product small{display:block;color:#8ed6d0;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.selected-recommendation-product h3{margin:7px 0 6px;font-size:1.2rem}.selected-recommendation-product p{margin:0;color:#d8d0e1;line-height:1.55}.selected-recommendation-product a{flex:0 0 auto;padding:11px 15px;border-radius:999px;background:#f4e6ca;color:#17152a;font-weight:800;text-decoration:none;text-align:center}.selected-recommendation-product a:hover{transform:translateY(-1px)}.selected-product-unlinked{max-width:220px;color:#cfc7db;font-size:.88rem;line-height:1.45}@media(max-width:700px){.selected-recommendation-product{align-items:stretch;flex-direction:column}.selected-recommendation-product a{width:100%}.selected-product-unlinked{max-width:none}}`;
  document.head.appendChild(style);
})();
