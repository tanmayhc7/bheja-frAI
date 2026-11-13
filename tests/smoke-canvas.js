const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('fs');
const html='<!doctype html><html><head><meta charset="utf8"></head><body>'+fs.readFileSync('../index.html','utf8')+'</body></html>';
const errs=[];let calls=0;
const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push('jsdomError: '+(e.detail&&e.detail.stack||e.message)));
const dom=new JSDOM(html,{runScripts:'dangerously',virtualConsole:vc,url:'https://example.test/',pretendToBeVisual:true,
 beforeParse(w){
  w.matchMedia=()=>({matches:false,addEventListener(){}});
  const g=new Proxy({},{get:(t,k)=>k in t?t[k]:k==='measureText'?(s=>({width:String(s).length*7})):(...a)=>{calls++},set:(t,k,v)=>{t[k]=v;return true}});
  w.HTMLCanvasElement.prototype.getContext=function(){return g};
  Object.defineProperty(w.HTMLElement.prototype,'clientWidth',{get(){return 640}});
 }});
const w=dom.window,d=w.document;w.addEventListener('error',e=>errs.push('window error: '+e.message));
const stepBy=t=>[...d.querySelectorAll('.step')].find(x=>x.getAttribute('aria-label').indexOf(': '+t)>-1);
const click=el=>el.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
[...d.querySelectorAll('.step')].forEach(s=>{click(s);
  for(let r=0;r<3;r++){
    d.querySelectorAll('#demo input[type=range]').forEach(x=>{x.value=r==0?x.min:(r==1?x.max:(+x.min+ +x.max)/2);x.dispatchEvent(new w.Event('input',{bubbles:true}))});
    d.querySelectorAll('#demo button').forEach(b=>{if(!b.disabled)click(b)});
  }
  // git: spam commits/branches/merge
});
click(stepBy('Git: save points'));
for(let i=0;i<20;i++){['Commit','New branch','Merge into main'].forEach(t=>{const b=[...d.querySelectorAll('#demo button')].find(x=>x.textContent===t);if(b&&!b.disabled)click(b)});
 const chips=[...d.querySelectorAll('#demo .chip')];if(chips.length)click(chips[i%chips.length])}
console.log('git info:',d.querySelector('#demo .readout').textContent);
console.log('git log:',d.querySelector('#demo .term').textContent.replace(/\n/g,' | '));
// venv scenario
click(stepBy('Python environments'));
const btn=t=>[...d.querySelectorAll('#demo button')].find(x=>x.textContent===t);
click(btn('Install Project A'));click(btn('Install Project B'));
console.log('shared:',[...d.querySelectorAll('.pkg .st')].map(x=>x.textContent).join(' || '));
click([...d.querySelectorAll('#demo .chip')][1]);click(btn('Install Project A'));click(btn('Install Project B'));
console.log('isolated:',[...d.querySelectorAll('.pkg .st')].map(x=>x.textContent).join(' || '));
// gpu readout
click(stepBy('Why GPUs?'));console.log('gpu:',d.querySelector('#demo .readout').textContent.replace(/\n/g,' | '));
// vectors readout
click(stepBy('Vectors and similarity'));click([...d.querySelectorAll('#demo button')].find(x=>x.textContent==='Perpendicular'));console.log('vectors:',d.querySelector('#demo .readout').textContent.replace(/\n/g,' | '));
// gd divergence
click(stepBy('Rolling downhill'));const lr=d.querySelector('#glr');lr.value='1.05';lr.dispatchEvent(new w.Event('input',{bubbles:true}));click(btn('Take 10 steps'));console.log('gd:',d.querySelector('#demo .readout').textContent);
console.log('canvas draw calls:',calls,'| ERRORS:',errs.length?errs:'none');
