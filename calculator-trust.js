(function(){
 const hero=document.querySelector('.calculator-hero .container');
 if(hero&&!hero.querySelector('.calculator-review-note')){
  const note=document.createElement('div');
  note.className='calculator-review-note';
  note.innerHTML='<strong>Calculator rules last reviewed August 2, 2026.</strong><span>Results are estimates based on known specifications, compatibility rules and relative performance data.</span><div><a href="methodology.html">Read the scoring methodology</a><a href="pc-compatibility-calculator.html?report=calculator">Report a wrong result</a></div>';
  hero.appendChild(note);
 }
 const footer=document.querySelector('.site-footer .footer-grid');
 if(footer&&!footer.querySelector('a[href="methodology.html"]')){
  const trust=document.createElement('div');
  trust.innerHTML='<h2>Trust</h2><a href="methodology.html">Methodology</a><a href="cpu-motherboard-bios-compatibility-guide.html">BIOS guide</a><a href="pc-compatibility-calculator.html?report=calculator">Report a problem</a>';
  footer.appendChild(trust);
 }
 const style=document.createElement('style');
 style.textContent='.calculator-review-note{margin-top:22px;padding:17px 19px;border:1px solid rgba(241,224,198,.18);border-radius:17px;background:rgba(255,255,255,.04);display:grid;gap:7px}.calculator-review-note span{color:#d8d0e1;line-height:1.55}.calculator-review-note div{display:flex;gap:14px;flex-wrap:wrap;margin-top:3px}.calculator-review-note a{color:#f2d19a;font-weight:800}';
 document.head.appendChild(style);
})();