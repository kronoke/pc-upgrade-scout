(function(){
  const support={
    ASUS:{download:'https://www.asus.com/us/support/download-center/',instructions:'https://www.asus.com/us/support/faq/1054166/'},
    MSI:{download:'https://www.msi.com/support/download',instructions:'https://www.msi.com/support/technical_details/MB_BIOS_Update'},
    GIGABYTE:{download:'https://www.gigabyte.com/Support',instructions:'https://www.gigabyte.com/WebPage/20/HowToReflashBIOS.html'},
    ASROCK:{download:'https://www.asrock.com/support/index.asp?cat=BIOS',instructions:'https://www.asrock.com/support/BIOSUI.asp'}
  };
  const exact={
    'asus prime z590-v':'https://www.asus.com/us/motherboards-components/motherboards/prime/prime-z590-v/helpdesk_bios?model2Name=PRIME-Z590-V',
    'gigabyte b650 aorus elite ax':'https://www.gigabyte.com/us/Motherboard/B650-AORUS-ELITE-AX-rev-10-11/support'
  };
  const chipsetMap={A320:'AM4',B350:'AM4',X370:'AM4',B450:'AM4',X470:'AM4',A520:'AM4',B550:'AM4',X570:'AM4',A620:'AM5',B650:'AM5',B650E:'AM5',X670:'AM5',X670E:'AM5',B840:'AM5',B850:'AM5',X870:'AM5',X870E:'AM5',H410:'LGA1200',B460:'LGA1200',H470:'LGA1200',Z490:'LGA1200',H510:'LGA1200',B560:'LGA1200',H570:'LGA1200',Z590:'LGA1200',H610:'LGA1700',B660:'LGA1700',H670:'LGA1700',Z690:'LGA1700',B760:'LGA1700',H770:'LGA1700',Z790:'LGA1700',H810:'LGA1851',B860:'LGA1851',Z890:'LGA1851'};
  function chipset(name){const u=name.toUpperCase();return Object.keys(chipsetMap).sort((a,b)=>b.length-a.length).find(x=>u.includes(x))||''}
  function brand(name){const u=name.toUpperCase();return ['ASUS','MSI','GIGABYTE','ASROCK'].find(x=>u.includes(x))||''}
  function cpuGeneration(name){const u=name.toUpperCase();if(u.includes('RYZEN 9000')||/RYZEN [579] 9\d{3}/.test(u))return'Ryzen 9000';if(/RYZEN [3579] 8\d{3}/.test(u))return'Ryzen 8000';if(/RYZEN [3579] 7\d{3}/.test(u))return'Ryzen 7000';if(/RYZEN [3579] 5\d{3}/.test(u))return'Ryzen 5000';const m=u.match(/I[3579]-(\d{2})\d{3}/);if(m)return`Intel ${Number(m[1])}th Gen`;if(u.includes('CORE ULTRA'))return'Intel Core Ultra';return''}
  function biosAssessment(cpuName,boardName,cpuSocket,boardSocket){
    const c=chipset(boardName),gen=cpuGeneration(cpuName);
    if(cpuSocket&&boardSocket&&cpuSocket.toUpperCase()!==boardSocket.toUpperCase())return{level:'bad',title:'CPU does not fit this motherboard',text:`The CPU uses ${cpuSocket}, while the motherboard uses ${boardSocket}. A BIOS update cannot fix a socket mismatch.`};
    if(!c||!gen)return{level:'warn',title:'Verify the exact CPU support list',text:'The socket may match, but the calculator cannot confirm the required BIOS version for this exact model. Check the motherboard manufacturer’s CPU-support page before buying or flashing.'};
    let may=false;
    if(gen==='Ryzen 5000'&&['A320','B350','X370','B450','X470'].includes(c))may=true;
    if(gen==='Ryzen 9000'&&['A620','B650','B650E','X670','X670E'].includes(c))may=true;
    if(gen==='Intel 11th Gen'&&['Z490','H470'].includes(c))may=true;
    if(gen==='Intel 13th Gen'&&['H610','B660','H670','Z690'].includes(c))may=true;
    if(gen==='Intel 14th Gen'&&['H610','B660','H670','Z690','B760','H770','Z790'].includes(c))may=true;
    return may?{level:'warn',title:'A BIOS update may be required',text:`${gen} on a ${c} motherboard can depend on the board’s current BIOS version. Confirm the exact CPU-support list and minimum BIOS before installing the CPU.`}:{level:'good',title:'Platform is generally supported',text:`The socket and ${c} platform are generally appropriate for ${gen||'this CPU'}, but the exact motherboard CPU-support list remains the final authority.`};
  }
  function render(){
    const panel=document.getElementById('resultsPanel');if(!panel||panel.querySelector('.empty-results'))return;
    panel.querySelector('.bios-support-result')?.remove();
    const cpu=findPart(cpus,$('cpuInput').value),board=findPart(boards,$('boardInput').value);
    const cpuName=$('cpuInput').value.trim(),boardName=$('boardInput').value.trim();
    const cpuSocket=cpu?.socket||$('manualCpuSocket').value.trim(),boardSocket=board?.socket||$('manualBoardSocket').value.trim();
    const result=biosAssessment(cpuName,boardName,cpuSocket,boardSocket),b=brand(boardName),links=support[b];
    const direct=exact[boardName.toLowerCase()];
    const section=document.createElement('section');section.className=`bios-support-result ${result.level}`;
    section.innerHTML=`<span>CPU, chipset & BIOS check</span><h3>${result.title}</h3><p>${result.text}</p><div class="bios-actions">${direct?`<a href="${direct}" target="_blank" rel="noopener">Open this board’s official BIOS page</a>`:''}${links?`<a href="${links.download}" target="_blank" rel="noopener">Find official BIOS downloads</a><a href="${links.instructions}" target="_blank" rel="noopener">Read ${b} update instructions</a>`:''}<a href="cpu-motherboard-bios-compatibility-guide.html">Read the BIOS compatibility guide</a></div><small>Never use a BIOS file for a different motherboard model or revision. Do not interrupt power during an update.</small>`;
    panel.append(section);
  }
  document.getElementById('calculateButton')?.addEventListener('click',render);
  document.getElementById('builderForm')?.addEventListener('change',()=>{if(!document.querySelector('#resultsPanel .empty-results'))setTimeout(render,0)});
})();