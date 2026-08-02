(function(){
  if(window.PC_SCOUT_ANALYTICS_LOADED)return;
  window.PC_SCOUT_ANALYTICS_LOADED=true;
  const measurementId='G-KFV39DLXB5';
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  window.gtag('js',new Date());
  window.gtag('config',measurementId,{send_page_view:true});
  const tag=document.createElement('script');
  tag.async=true;
  tag.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(measurementId);
  document.head.appendChild(tag);

  function send(name,params){
    try{window.gtag('event',name,params||{});}catch(error){}
  }

  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');
    if(link&&/amzn\.to|amazon\./i.test(link.href)){
      send('affiliate_click',{product_name:(link.getAttribute('aria-label')||link.closest('article')?.querySelector('h3')?.textContent||link.textContent).trim(),link_url:link.href,page_path:location.pathname});
    }
    const recommendation=event.target.closest('[data-rec-type][data-rec-value]');
    if(recommendation){
      send('recommendation_applied',{recommendation_type:recommendation.dataset.recType,recommendation_value:recommendation.dataset.recValue,page_path:location.pathname});
    }
    const calculate=event.target.closest('#calculateButton');
    if(calculate){send('calculator_run',{page_path:location.pathname});}
  });

  document.addEventListener('submit',event=>{
    if(event.target.matches('.feedback-form'))send('feedback_submit_attempt',{page_path:location.pathname});
  });

  window.PCScoutTrack=send;
})();
