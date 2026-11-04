const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('fs');
const html='<!doctype html><html><head><meta charset="utf8"></head><body>'+fs.readFileSync('../index.html','utf8')+'</body></html>';
const errs=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push('jsdomError: '+(e.detail&&e.detail.stack||e.message)));vc.on('error',e=>errs.push('console.error: '+e));
const dom=new JSDOM(html,{runScripts:'dangerously',virtualConsole:vc,url:'https://example.test/',pretendToBeVisual:true,beforeParse(w){w.matchMedia=()=>({matches:false,addEventListener(){}})}});
const w=dom.window,d=w.document;
w.addEventListener('error',e=>errs.push('window error: '+e.message));
const click=el=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
const steps=[...d.querySelectorAll('.step')];
console.log('lessons in path:',steps.length,'| phases in map:',d.querySelectorAll('.ph').length,'| live:',d.querySelectorAll('.ph.has').length);
steps.forEach((s,i)=>{
  click(s);
  const title=d.querySelector('#lesson-title').textContent;
  // demo buttons + chips
  d.querySelectorAll('#demo button').forEach(b=>{ if(!b.disabled)click(b); });
  d.querySelectorAll('#demo input[type=range]').forEach(r=>{const mid=(+r.min+ +r.max)/2;r.value=mid;r.dispatchEvent(new w.Event('input',{bubbles:true}))});
  d.querySelectorAll('#demo button').forEach(b=>{ if(!b.disabled)click(b); });
  // quiz: click wrong first then right via text hints: try each option until all q solved
  d.querySelectorAll('.q').forEach(q=>{ [...q.querySelectorAll('.opt')].forEach(o=>{ if(!o.disabled) click(o); }); });
  const banner=d.querySelector('#banner').textContent;
  console.log(i+1,title,'| banner:',banner.slice(0,45));
});
console.log('xp',d.querySelector('#st-xp').textContent,'streak',d.querySelector('#st-streak').textContent,'done',d.querySelector('#st-done').textContent+'/'+d.querySelector('#st-total').textContent);
// phase map interactions
d.querySelectorAll('.ph').forEach(b=>click(b));
d.querySelectorAll('#phdetail .chip').forEach(b=>click(b));
click(d.querySelector('#theme'));
click(d.querySelector('#reset'));
console.log('after reset xp',d.querySelector('#st-xp').textContent);
console.log('ERRORS:',errs.length?errs:'none');
