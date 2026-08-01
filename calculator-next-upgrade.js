const catalogCpuAdditions=[
{name:'Intel Core i3-10100',socket:'LGA1200',score:58,power:65},{name:'Intel Core i3-10100F',socket:'LGA1200',score:58,power:65},{name:'Intel Core i3-10300',socket:'LGA1200',score:61,power:65},{name:'Intel Core i3-10320',socket:'LGA1200',score:63,power:65},{name:'Intel Core i5-10400',socket:'LGA1200',score:72,power:65},{name:'Intel Core i5-10400F',socket:'LGA1200',score:72,power:65},{name:'Intel Core i5-10500',socket:'LGA1200',score:75,power:65},{name:'Intel Core i5-10600',socket:'LGA1200',score:79,power:65},{name:'Intel Core i5-10600K',socket:'LGA1200',score:86,power:125},{name:'Intel Core i5-10600KF',socket:'LGA1200',score:86,power:125},{name:'Intel Core i7-10700',socket:'LGA1200',score:91,power:65},{name:'Intel Core i7-10700F',socket:'LGA1200',score:91,power:65},{name:'Intel Core i7-10700K',socket:'LGA1200',score:98,power:125},{name:'Intel Core i7-10700KF',socket:'LGA1200',score:98,power:125},{name:'Intel Core i9-10850K',socket:'LGA1200',score:102,power:125},{name:'Intel Core i9-10900',socket:'LGA1200',score:101,power:65},{name:'Intel Core i9-10900F',socket:'LGA1200',score:101,power:65},{name:'Intel Core i9-10900K',socket:'LGA1200',score:108,power:125},{name:'Intel Core i9-10900KF',socket:'LGA1200',score:108,power:125},{name:'Intel Core i9-10900KS',socket:'LGA1200',score:111,power:125},{name:'Intel Core i5-11400',socket:'LGA1200',score:80,power:65},{name:'Intel Core i5-11400F',socket:'LGA1200',score:80,power:65},{name:'Intel Core i5-11500',socket:'LGA1200',score:83,power:65},{name:'Intel Core i5-11600',socket:'LGA1200',score:87,power:65},{name:'Intel Core i5-11600K',socket:'LGA1200',score:94,power:125},{name:'Intel Core i5-11600KF',socket:'LGA1200',score:94,power:125},{name:'Intel Core i7-11700',socket:'LGA1200',score:98,power:65},{name:'Intel Core i7-11700F',socket:'LGA1200',score:98,power:65},{name:'Intel Core i7-11700K',socket:'LGA1200',score:104,power:125},{name:'Intel Core i7-11700KF',socket:'LGA1200',score:104,power:125},{name:'Intel Core i9-11900',socket:'LGA1200',score:103,power:65},{name:'Intel Core i9-11900F',socket:'LGA1200',score:103,power:65},{name:'Intel Core i9-11900K',socket:'LGA1200',score:110,power:125},{name:'Intel Core i9-11900KF',socket:'LGA1200',score:110,power:125}
];
const catalogBoardAdditions=[
{name:'ASUS Prime Z490-P',socket:'LGA1200',memory:'DDR4'},{name:'ASUS ROG Strix Z490-E Gaming',socket:'LGA1200',memory:'DDR4'},{name:'MSI MPG Z490 Gaming Edge WiFi',socket:'LGA1200',memory:'DDR4'},{name:'MSI B460 Tomahawk',socket:'LGA1200',memory:'DDR4'},{name:'ASUS TUF Gaming B460-Plus',socket:'LGA1200',memory:'DDR4'},{name:'Gigabyte H470 AORUS Pro AX',socket:'LGA1200',memory:'DDR4'},{name:'ASUS Prime Z590-P',socket:'LGA1200',memory:'DDR4'},{name:'ASUS ROG Strix Z590-E Gaming WiFi',socket:'LGA1200',memory:'DDR4'},{name:'MSI Z590-A PRO',socket:'LGA1200',memory:'DDR4'},{name:'MSI MAG B560 Tomahawk WiFi',socket:'LGA1200',memory:'DDR4'},{name:'ASUS TUF Gaming B560-Plus WiFi',socket:'LGA1200',memory:'DDR4'},{name:'Gigabyte B560 AORUS Pro AX',socket:'LGA1200',memory:'DDR4'},{name:'ASUS Prime H570-Plus',socket:'LGA1200',memory:'DDR4'}
];
function mergeCatalog(target,items){const names=new Set(target.map(x=>x.name.toLowerCase()));items.forEach(x=>{if(!names.has(x.name.toLowerCase()))target.push(x)})}
mergeCatalog(cpus,catalogCpuAdditions);mergeCatalog(boards,catalogBoardAdditions);cpus.sort((a,b)=>a.name.localeCompare(b.name));boards.sort((a,b)=>a.name.localeCompare(b.name));populate('cpuOptions',cpus);populate('boardOptions',boards);

function getSelectedParts(){
  const cpuKnown=findPart(cpus,$('cpuInput').value),gpuKnown=findPart(gpus,$('gpuInput').value),boardKnown=findPart(boards,$('boardInput').value),caseKnown=findPart(cases,$('caseInput').value);
  return {
    cpu:{known:cpuKnown,name:$('cpuInput').value||'Unspecified CPU',socket:cpuKnown?.socket||$('manualCpuSocket').value.trim(),score:cpuKnown?.score||num('manualCpuScore'),power:cpuKnown?.power||num('manualCpuPower')},
    gpu:{known:gpuKnown,name:$('gpuInput').value||'Unspecified GPU',score:gpuKnown?.score||num('manualGpuScore'),power:gpuKnown?.power||num('manualGpuPower'),length:gpuKnown?.length||num('manualGpuLength')},
    board:{known:boardKnown,name:$('boardInput').value||'Unspecified motherboard',socket:boardKnown?.socket||$('manualBoardSocket').value.trim(),memory:boardKnown?.memory||$('manualBoardMemory').value},
    pcCase:{known:caseKnown,name:$('caseInput').value||'Unspecified case',clearance:caseKnown?.clearance||num('manualCaseClearance')},
    ram:Number($('ramCapacity').value),ramType:$('ramType').value,psu:Number($('psuWattage').value),resolution:Number($('resolution').value),fps:Number($('targetFps').value),game:$('gameType').value
  };
}
function bestCpuUpgrade(parts){
  if(!parts.cpu.socket||!parts.cpu.score)return null;
  return cpus.filter(x=>x.socket===parts.cpu.socket&&x.score>parts.cpu.score*1.18).sort((a,b)=>a.score-b.score)[0]||null;
}
function bestGpuUpgrade(parts){
  if(!parts.gpu.score)return null;
  return gpus.filter(x=>x.score>parts.gpu.score*1.18&&(!parts.pcCase.clearance||x.length<=parts.pcCase.clearance)).sort((a,b)=>a.score-b.score)[0]||null;
}
function renderNextUpgrade(){
  const panel=$('resultsPanel');
  if(!panel||panel.querySelector('.empty-results'))return;
  panel.querySelectorAll('.next-upgrade,.secondary-upgrades').forEach(x=>x.remove());
  const p=getSelectedParts(),ideas=[];
  let primary=null;

  if(p.cpu.socket&&p.board.socket&&p.cpu.socket.toUpperCase()!==p.board.socket.toUpperCase()){
    const board=boards.find(x=>x.socket===p.cpu.socket&&(!p.ramType||x.memory===p.ramType))||boards.find(x=>x.socket===p.cpu.socket);
    primary=board?{title:`Buy a compatible ${p.cpu.socket} motherboard`,text:`Your CPU cannot work in the selected ${p.board.socket||'other-socket'} motherboard. ${board.name} matches the CPU socket${board.memory?` and uses ${board.memory}`:''}.`,type:'board',value:board.name}:{title:`Replace the motherboard with a ${p.cpu.socket} model`,text:'The CPU and motherboard sockets do not match. Fix this before considering a performance upgrade.'};
  } else if(p.board.memory&&p.board.memory!==p.ramType){
    primary={title:`Buy ${p.board.memory} memory`,text:`The selected motherboard requires ${p.board.memory}. Replace the current ${p.ramType} selection before the system can work.`,type:'ramType',value:p.board.memory};
  } else if(p.gpu.length&&p.pcCase.clearance&&p.gpu.length>p.pcCase.clearance){
    const pcCase=cases.filter(x=>x.clearance>=p.gpu.length+20).sort((a,b)=>a.clearance-b.clearance)[0];
    primary=pcCase?{title:`Buy a case with more GPU clearance`,text:`The graphics card is ${p.gpu.length}mm long, but the selected case allows ${p.pcCase.clearance}mm. ${pcCase.name} provides ${pcCase.clearance}mm of listed clearance.`,type:'case',value:pcCase.name}:{title:'Choose a larger case or shorter graphics card',text:'The selected graphics card does not physically fit in the case.'};
  } else if(p.cpu.power&&p.gpu.power){
    const recommended=Math.ceil((p.cpu.power+p.gpu.power+100)*1.35/50)*50;
    if(p.psu<recommended){
      const wattages=[550,650,750,850,1000,1200,1600];
      const next=wattages.find(x=>x>=recommended)||recommended;
      primary={title:`Buy at least a ${next}W quality power supply`,text:`This configuration’s planning target is about ${recommended}W. More headroom helps with transient loads and future upgrades.`,type:'psu',value:String(next)};
    }
  }

  if(!primary&&p.ram<16)primary={title:'Upgrade to 32GB of RAM',text:'8GB is restrictive for modern gaming. Moving to 32GB is the most practical next purchase for smoother gaming and multitasking.',type:'ram',value:'32'};
  if(!primary&&p.ram<32)ideas.push('Move from 16GB to 32GB RAM for more comfortable modern gaming and multitasking.');

  if(!primary&&p.cpu.score&&p.gpu.score){
    const resolutionGpu={1080:.82,1440:1,2160:1.33}[p.resolution];
    const fpsCpu=Math.max(.72,Math.min(1.55,p.fps/144));
    const gameCpu={balanced:1,esports:1.22,aaa:.86,simulation:1.32}[p.game];
    const gameGpu={balanced:1,esports:.86,aaa:1.22,simulation:.9}[p.game];
    const ratio=(p.cpu.score/(fpsCpu*gameCpu))/(p.gpu.score/(resolutionGpu*gameGpu));
    if(ratio<.82){
      const next=bestCpuUpgrade(p);
      if(next)primary={title:`Upgrade the CPU next: ${next.name}`,text:`Your selected target leans CPU-limited. This keeps the ${p.cpu.socket} platform while providing a meaningful step up in the calculator’s gaming score.`,type:'cpu',value:next.name};
      else primary={title:'Upgrade the CPU or platform next',text:'The current target is more CPU-limited, but there is no clear same-socket step-up in the built-in list. Consider a newer CPU, motherboard, and RAM platform together.'};
    }else if(ratio>1.22){
      const next=bestGpuUpgrade(p);
      if(next)primary={title:`Upgrade the GPU next: ${next.name}`,text:`Your selected resolution and game type lean GPU-limited. This is the smallest meaningful graphics upgrade in the built-in list that also fits the selected case.`,type:'gpu',value:next.name};
      else primary={title:'Upgrade the graphics card next',text:'The GPU is the main performance limit for this target. Choose a faster card that fits the case and power supply.'};
    }
  }

  if(!primary)primary={title:'No urgent upgrade needed',text:'This configuration is already reasonably compatible and balanced for the selected target. Save for a larger future upgrade instead of replacing a part immediately.'};

  if(p.ram<32&&!primary.title.includes('RAM'))ideas.push('Upgrade to 32GB RAM when budget allows.');
  if(p.cpu.known){const c=bestCpuUpgrade(p);if(c&&!primary.title.includes(c.name))ideas.push(`Possible CPU step-up on the same socket: ${c.name}.`)}
  if(p.gpu.known){const g=bestGpuUpgrade(p);if(g&&!primary.title.includes(g.name))ideas.push(`Possible GPU step-up that fits the selected case: ${g.name}.`)}

  const section=document.createElement('section');section.className='next-upgrade';
  section.innerHTML=`<span class="next-upgrade-label">Best next upgrade</span><h3>${primary.title}</h3><p>${primary.text}</p>${primary.type?`<div class="next-upgrade-actions"><button type="button" data-upgrade-type="${primary.type}" data-upgrade-value="${primary.value}">Use this recommendation</button></div>`:''}<small>Recommendations are based on compatibility and relative performance estimates. Verify exact BIOS support, dimensions, connectors, and manufacturer requirements before buying.</small>`;
  const rating=panel.querySelector('.compatibility-rating');(rating||panel.firstChild).insertAdjacentElement('afterend',section);
  if(ideas.length){const more=document.createElement('section');more.className='secondary-upgrades';more.innerHTML=`<h3>Other upgrades to consider later</h3><ul>${ideas.slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul>`;section.insertAdjacentElement('afterend',more)}
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-upgrade-type]');if(!button)return;const type=button.dataset.upgradeType,value=button.dataset.upgradeValue;if(type==='cpu')$('cpuInput').value=value;if(type==='gpu')$('gpuInput').value=value;if(type==='board')$('boardInput').value=value;if(type==='case')$('caseInput').value=value;if(type==='ram')$('ramCapacity').value=value;if(type==='ramType')$('ramType').value=value;if(type==='psu')$('psuWattage').value=value;$('calculateButton').click();window.scrollTo({top:$('resultsPanel').offsetTop-90,behavior:'smooth'})});
$('calculateButton').addEventListener('click',renderNextUpgrade);
