/* Penta Court immersive startup: no iframe, model controls remain intact. */
(function(){
'use strict';
let booted=false,growthEnabled=true,timer=null,age=7,stage='Loading BIM...';
const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function el(id){return document.getElementById(id)}
function flash(text){const t=el('pc-trail-text');if(t)t.textContent=text}
function model(){return window.PENTA}
function playBots(yes){const b=el('playrobots');if(!b)return;const playing=/pause robots/i.test(b.textContent);if(yes!==playing)b.click();const q=el('pc-bots');if(q){q.classList.toggle('pc-on',yes);q.textContent=yes?'● Robots on':'○ Robots off'}}
function renderAge(){const a=el('pc-growth');if(a){a.textContent=(growthEnabled?'● ':'○ ')+'Growth '+age.toFixed(1)+'y';a.classList.toggle('pc-on',growthEnabled)}}
function initialize(){
 if(booted||!model())return;
 const host=document.querySelector('main>.viewport'),aside=document.querySelector('main>aside');
 if(!host||!aside)return;
 booted=true;
 host.insertAdjacentHTML('beforeend',`
 <div id="pc-ui" aria-label="Penta Court navigation">
  <div id="pc-brand"><span class="pc-mark">PC</span><strong>Penta Court</strong></div>
  <div id="pc-controls">
   <select id="pc-section" aria-label="Project section">
    <option value="model">3D model</option><option value="apartments">Apartments</option><option value="roof">Roof access</option><option value="garden">Garden</option><option value="growth">Growth</option><option value="robots">Robots</option><option value="elevators">Elevators</option><option value="drawings">Drawings</option>
   </select>
   <button id="pc-growth" type="button">● Growth</button><button id="pc-bots" type="button">● Robots</button>
   <button id="pc-home" type="button">Fit</button><button id="pc-toggle" type="button" aria-pressed="false">Settings</button>
   <a href="activities.html" title="Explore 20 spatial activities">Activities ↗</a>
  </div>
 </div>
 <div id="pc-trail"><span class="pc-dot"></span><span id="pc-trail-text">Living courtyard · loading…</span></div>`);
 aside.insertAdjacentHTML('afterbegin','<button type="button" id="pc-sidebar-close">← Close settings</button>');
 el('pc-sidebar-close').onclick=()=>{document.body.classList.remove('pc-show-aside');el('pc-toggle').setAttribute('aria-pressed','false')};
 el('pc-toggle').onclick=()=>{const open=document.body.classList.toggle('pc-show-aside');el('pc-toggle').setAttribute('aria-pressed',String(open))};
 el('pc-section').onchange=e=>{const section=e.target.value;try{model().tabs.activate(section)}catch(err){console.warn(err)}document.body.classList.add('pc-show-aside');el('pc-toggle').setAttribute('aria-pressed','true');if(section==='model')playBots(!reduced)};
 el('pc-home').onclick=()=>{const view=document.querySelector('[data-view="overview"]');if(view)view.click();document.body.classList.remove('pc-show-aside')};
 el('pc-bots').onclick=()=>{const b=el('playrobots');playBots(!/pause robots/i.test(b?.textContent||''))};
 el('pc-growth').onclick=()=>{growthEnabled=!growthEnabled;renderAge();flash(growthEnabled?'Botanical time-lapse resumed':'Botanical time-lapse paused')};
 try{model().tabs.activate('model');document.querySelector('[data-view="overview"]')?.click()}catch(err){console.warn(err)}
 const select=el('scenario');if(select){select.value='fast';select.dispatchEvent(new Event('change',{bubbles:true}))}
 const season=el('month');if(season){season.value='7';season.dispatchEvent(new Event('input',{bubbles:true}))}
 const speed=el('robotspeed');if(speed){speed.value='28';speed.dispatchEvent(new Event('input',{bubbles:true}))}
 const routes=el('showroutes');if(routes){routes.checked=false;routes.dispatchEvent(new Event('input',{bubbles:true}))}
 age=7;model().setYear(age);growthEnabled=!reduced;renderAge();playBots(!reduced);
 let last=performance.now();timer=setInterval(()=>{
  if(!model()||!document.body.contains(el('pc-ui'))){clearInterval(timer);return}
  const now=performance.now(),dt=Math.min((now-last)/1000,.5);last=now;
  if(growthEnabled){age=(age+dt*1.15)%30;model().setYear(age);renderAge()}
  const running=/pause robots/i.test(el('playrobots')?.textContent||'');
  if(Math.round(now/1600)!==Math.round((now-150)/1600)){
   flash('Concept 15 · '+age.toFixed(1)+' years · '+(running?'robots caring for gardens':'robots paused'));
  }
 },150);
 flash('Explore: drag to orbit · scroll to zoom · '+(reduced?'animations paused':'robots + growth active'));
}
let tries=0;const poll=setInterval(()=>{if(booted){clearInterval(poll);return}try{initialize()}catch(e){console.error('Penta startup error',e)}tries++;if(tries>500){clearInterval(poll);flash('Model startup could not complete')}} ,200);
})();
