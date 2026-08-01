function clampRating(value){return Math.max(1,Math.min(10,Math.round(value*10)/10))}
function ratingClass(score){if(score>=9)return'excellent';if(score>=7)return'good';if(score>=5)return'fair';if(score>=3)return'poor';return'bad'}
function ratingLabel(score){if(score>=9)return'Excellent match';if(score>=7)return'Good match';if(score>=5)return'Workable with tradeoffs';if(score>=3)return'Poor match';return'Major problems'}
function calculateCompatibilityRating(){
  const cpuKnown=findPart(cpus,$('cpuInput').value),gpuKnown=findPart(gpus,$('gpuInput').value),boardKnown=findPart(boards,$('boardInput').value),caseKnown=findPart(cases,$('caseInput').value);
  const cpu={socket:cpuKnown?.socket||$('manualCpuSocket').value.trim(),score:cpuKnown?.score||num('manualCpuScore'),power:cpuKnown?.power||num('manualCpuPower')};
  const gpu={score:gpuKnown?.score||num('manualGpuScore'),power:gpuKnown?.power||num('manualGpuPower'),length:gpuKnown?.length||num('manualGpuLength')};
  const board={socket:boardKnown?.socket||$('manualBoardSocket').value.trim(),memory:boardKnown?.memory||$('manualBoardMemory').value};
  const pcCase={clearance:caseKnown?.clearance||num('manualCaseClearance')};
  const resolution=Number($('resolution').value),fps=Number($('targetFps').value),game=$('gameType').value,ram=Number($('ramCapacity').value),ramType=$('ramType').value,psu=Number($('psuWattage').value);
  let score=10;
  let hardFailure=false;
  let missing=0;

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
    const cpuAdjusted=cpu.score/(fpsCpu*gameCpu),gpuAdjusted=gpu.score/(resolutionGpu*gameGpu);
    const ratio=cpuAdjusted/gpuAdjusted;
    const imbalance=Math.abs(Math.log(ratio));
    score-=Math.min(3.2,imbalance*3.8);
  }else{score-=1;missing++}

  if(hardFailure)score=Math.min(score,3.5);
  if(missing>=4)score=Math.min(score,6.5);
  return clampRating(score);
}
function renderCompatibilityRating(){
  const panel=$('resultsPanel');
  if(!panel||panel.querySelector('.compatibility-rating'))return;
  const score=calculateCompatibilityRating();
  const level=ratingClass(score),label=ratingLabel(score);
  const block=document.createElement('section');
  block.className=`compatibility-rating ${level}`;
  block.setAttribute('aria-label',`Overall compatibility rating ${score} out of 10, ${label}`);
  block.innerHTML=`<div class="rating-copy"><span>Overall compatibility</span><strong>${label}</strong><p>This score combines platform fit, RAM type, case clearance, power headroom, memory capacity, and CPU/GPU balance for the selected target.</p></div><div class="rating-number"><b>${score}</b><span>/ 10</span></div><div class="rating-scale" aria-hidden="true"><i style="width:${score*10}%"></i></div><div class="rating-legend"><span>1 · Poor</span><span>5 · Fair</span><span>10 · Excellent</span></div>`;
  panel.prepend(block);
}
$('calculateButton').addEventListener('click',renderCompatibilityRating);
