function clampRating(value){return Math.max(1,Math.min(10,Math.round(value*10)/10))}
function ratingClass(score){if(score>=9)return'excellent';if(score>=7)return'good';if(score>=5)return'fair';if(score>=3)return'poor';return'bad'}
function ratingLabel(score){if(score>=9)return'Excellent match';if(score>=7)return'Good match';if(score>=5)return'Workable with tradeoffs';if(score>=3)return'Poor match';return'Major problems'}
function getRatingContext(){
  const cpuKnown=findPart(cpus,$('cpuInput').value),gpuKnown=findPart(gpus,$('gpuInput').value),boardKnown=findPart(boards,$('boardInput').value),caseKnown=findPart(cases,$('caseInput').value);
  const cpu={name:$('cpuInput').value||'Unspecified CPU',socket:cpuKnown?.socket||$('manualCpuSocket').value.trim(),score:cpuKnown?.score||num('manualCpuScore'),power:cpuKnown?.power||num('manualCpuPower')};
  const gpu={name:$('gpuInput').value||'Unspecified GPU',score:gpuKnown?.score||num('manualGpuScore'),power:gpuKnown?.power||num('manualGpuPower'),length:gpuKnown?.length||num('manualGpuLength')};
  const board={name:$('boardInput').value||'Unspecified motherboard',socket:boardKnown?.socket||$('manualBoardSocket').value.trim(),memory:boardKnown?.memory||$('manualBoardMemory').value};
  const pcCase={name:$('caseInput').value||'Unspecified case',clearance:caseKnown?.clearance||num('manualCaseClearance')};
  return {cpu,gpu,board,pcCase,resolution:Number($('resolution').value),fps:Number($('targetFps').value),game:$('gameType').value,ram:Number($('ramCapacity').value),ramType:$('ramType').value,psu:Number($('psuWattage').value)};
}
function calculateCompatibilityRating(context=getRatingContext()){
  const {cpu,gpu,board,pcCase,resolution,fps,game,ram,ramType,psu}=context;
  let score=10,hardFailure=false,missing=0;
  if(cpu.socket&&board.socket){if(cpu.socket.toUpperCase()!==board.socket.toUpperCase()){score-=6;hardFailure=true}}else{score-=0.7;missing++}
  if(board.memory){if(board.memory!==ramType){score-=5;hardFailure=true}}else{score-=0.5;missing++}
  if(gpu.length&&pcCase.clearance){const margin=pcCase.clearance-gpu.length;if(margin<0){score-=5;hardFailure=true}else if(margin<15)score-=1.2;else if(margin<30)score-=0.4}else{score-=0.4;missing++}
  if(cpu.power&&gpu.power){const recommended=Math.ceil((cpu.power+gpu.power+100)*1.35/50)*50;const ratio=psu/recommended;if(ratio<.8){score-=4;hardFailure=true}else if(ratio<1)score-=2.2;else if(ratio<1.1)score-=0.6}else{score-=0.5;missing++}
  if(ram<16)score-=2.5;else if(ram<32)score-=0.8;
  if(cpu.score&&gpu.score){
    const resolutionGpu={1080:.82,1440:1,2160:1.33}[resolution];
    const fpsCpu=Math.max(.72,Math.min(1.55,fps/144));
    const gameCpu={balanced:1,esports:1.22,aaa:.86,simulation:1.32}[game];
    const gameGpu={balanced:1,esports:.86,aaa:1.22,simulation:.9}[game];
    const ratio=(cpu.score/(fpsCpu*gameCpu))/(gpu.score/(resolutionGpu*gameGpu));
    score-=Math.min(3.2,Math.abs(Math.log(ratio))*3.8);
  }else{score-=1;missing++}
  if(hardFailure)score=Math.min(score,3.5);
  if(missing>=4)score=Math.min(score,6.5);
  return clampRating(score);
}
function nextPsu(required){return[550,650,750,850,1000,1200,1600].find(w=>w>=required)||1600}
function buildRecommendations(context,score){
  const {cpu,gpu,board,pcCase,resolution,fps,game,ram,ramType,psu}=context;
  const recs=[];
  const add=(priority,type,title,text,value)=>recs.push({priority,type,title,text,value});
  if(cpu.socket&&board.socket&&cpu.socket.toUpperCase()!==board.socket.toUpperCase()){
    const matches=boards.filter(item=>item.socket.toUpperCase()===cpu.socket.toUpperCase()&&item.memory===ramType).slice(0,3);
    if(matches.length)matches.forEach((item,index)=>add(100-index,'board',item.name,`${item.socket} and ${item.memory} match the selected CPU and RAM.`,item.name));
    else add(100,'info','Choose a compatible motherboard',`Look for a ${cpu.socket} motherboard that supports ${ramType}.`,'');
  }
  if(board.memory&&board.memory!==ramType)add(95,'ramType',`Switch to ${board.memory} memory`,`The selected motherboard requires ${board.memory}; changing RAM type fixes this compatibility issue.`,board.memory);
  if(gpu.length&&pcCase.clearance&&gpu.length>pcCase.clearance){
    cases.filter(item=>item.clearance>=gpu.length+20).sort((a,b)=>a.clearance-b.clearance).slice(0,3).forEach((item,index)=>add(90-index,'case',item.name,`${item.clearance}mm GPU clearance gives this card room to fit.`,item.name));
  }
  if(cpu.power&&gpu.power){
    const required=Math.ceil((cpu.power+gpu.power+100)*1.35/50)*50;
    if(psu<required){const wattage=nextPsu(required);add(85,'psu',`${wattage}W power supply`,`The current estimate calls for about ${required}W. A quality ${wattage}W unit adds appropriate headroom.`,String(wattage));}
  }
  if(ram<16)add(80,'ram','Upgrade to 32GB RAM','8GB is restrictive for modern gaming. 32GB improves headroom for games and background apps.','32');
  else if(ram<32)add(60,'ram','Upgrade to 32GB RAM','16GB works, but 32GB provides a more comfortable modern gaming target.','32');
  if(cpu.score&&gpu.score){
    const resolutionGpu={1080:.82,1440:1,2160:1.33}[resolution];
    const fpsCpu=Math.max(.72,Math.min(1.55,fps/144));
    const gameCpu={balanced:1,esports:1.22,aaa:.86,simulation:1.32}[game];
    const gameGpu={balanced:1,esports:.86,aaa:1.22,simulation:.9}[game];
    const ratio=(cpu.score/(fpsCpu*gameCpu))/(gpu.score/(resolutionGpu*gameGpu));
    if(ratio<.76&&cpu.socket){
      cpus.filter(item=>item.socket.toUpperCase()===cpu.socket.toUpperCase()&&item.score>cpu.score*1.18).sort((a,b)=>a.score-b.score).slice(0,3).forEach((item,index)=>add(50-index,'cpu',item.name,`A stronger ${cpu.socket} gaming CPU would better support the selected ${fps} FPS target.`,item.name));
    }else if(ratio>1.32){
      gpus.filter(item=>item.score>gpu.score*1.18&&(!pcCase.clearance||item.length<=pcCase.clearance)).sort((a,b)=>a.score-b.score).slice(0,3).forEach((item,index)=>add(50-index,'gpu',item.name,`A stronger GPU is better suited to ${resolution}p at the selected settings and target.`,item.name));
    }
  }
  if(score>=8&&recs.length===0)return[];
  return recs.sort((a,b)=>b.priority-a.priority).slice(0,5);
}
function applyRecommendation(type,value){
  if(!value)return;
  const ids={board:'boardInput',case:'caseInput',cpu:'cpuInput',gpu:'gpuInput',ram:'ramCapacity',ramType:'ramType',psu:'psuWattage'};
  const target=$(ids[type]);if(!target)return;
  target.value=value;
  analyze();renderCompatibilityRating();
  target.scrollIntoView({behavior:'smooth',block:'center'});
}
function renderCompatibilityRating(){
  const panel=$('resultsPanel');
  if(!panel)return;
  panel.querySelector('.compatibility-rating')?.remove();
  panel.querySelector('.upgrade-recommendations')?.remove();
  const context=getRatingContext(),score=calculateCompatibilityRating(context),level=ratingClass(score),label=ratingLabel(score);
  const block=document.createElement('section');
  block.className=`compatibility-rating ${level}`;
  block.setAttribute('aria-label',`Overall compatibility rating ${score} out of 10, ${label}`);
  block.innerHTML=`<div class="rating-copy"><span>Overall compatibility</span><strong>${label}</strong><p>This score combines platform fit, RAM type, case clearance, power headroom, memory capacity, and CPU/GPU balance for the selected target.</p></div><div class="rating-number"><b>${score}</b><span>/ 10</span></div><div class="rating-scale" aria-hidden="true"><i style="width:${score*10}%"></i></div><div class="rating-legend"><span>1 · Poor</span><span>5 · Fair</span><span>10 · Excellent</span></div>`;
  panel.prepend(block);
  const recs=buildRecommendations(context,score);
  if(score<8&&recs.length){
    const section=document.createElement('section');
    section.className='upgrade-recommendations';
    section.innerHTML=`<div class="recommendation-heading"><span>How to improve this score</span><h3>Recommended changes</h3><p>Fix compatibility problems first, then improve the weakest performance area.</p></div><div class="recommendation-list">${recs.map(rec=>`<article class="recommendation-card"><div><small>${rec.type==='info'?'Compatibility advice':`Suggested ${rec.type==='ramType'?'RAM':rec.type.toUpperCase()}`}</small><strong>${rec.title}</strong><p>${rec.text}</p></div>${rec.value?`<button type="button" data-rec-type="${rec.type}" data-rec-value="${rec.value}">Use this suggestion</button>`:''}</article>`).join('')}</div>`;
    panel.append(section);
    section.querySelectorAll('[data-rec-type]').forEach(button=>button.addEventListener('click',()=>applyRecommendation(button.dataset.recType,button.dataset.recValue)));
  }
}
$('calculateButton').addEventListener('click',renderCompatibilityRating);
