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

  let hasCalculated=false;
  let timer=null;

  function addEditControl(){
    if(panel.querySelector('.empty-results')||panel.querySelector('.edit-parts-button'))return;
    const edit=document.createElement('button');
    edit.type='button';
    edit.className='edit-parts-button';
    edit.textContent='Change parts';
    edit.addEventListener('click',()=>{
      form.scrollIntoView({behavior:'smooth',block:'start'});
      const first=form.querySelector('input,select');
      if(first)setTimeout(()=>first.focus({preventScroll:true}),450);
    });
    panel.prepend(edit);
  }

  button.addEventListener('click',()=>{
    hasCalculated=true;
    setTimeout(addEditControl,0);
  });

  form.addEventListener('input',event=>{
    if(!hasCalculated||event.target.id==='calculateButton')return;
    clearTimeout(timer);
    timer=setTimeout(()=>button.click(),350);
  });
  form.addEventListener('change',event=>{
    if(!hasCalculated||event.target.id==='calculateButton')return;
    clearTimeout(timer);
    timer=setTimeout(()=>button.click(),50);
  });

  new MutationObserver(()=>{if(hasCalculated)addEditControl()}).observe(panel,{childList:true});

  const style=document.createElement('style');
  style.textContent='.edit-parts-button{margin:0 0 16px;padding:10px 15px;border:1px solid rgba(241,224,198,.3);border-radius:999px;background:rgba(255,255,255,.06);color:#f2d19a;font:inherit;font-weight:800;cursor:pointer}.edit-parts-button:hover{background:rgba(255,255,255,.1)}';
  document.head.appendChild(style);
})();
