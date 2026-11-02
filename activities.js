/* Penta Court | Spatial Activities & Experiences
   Original procedural SVG studies based on twenty user-provided reference concepts.
   All locations and dimensions are schematic, not construction or egress design. */
(function(){
'use strict';
var P=[
[1,'Arrival Plaza','Arrival','Arrival edge','Threshold plaza with shade, green islands, seating, bicycle approach and a legible arrival marker.','entry portal|shaded seating|planting|bike parking',.12,.12],
[2,'Interpretive Exhibition Walk','Culture','Landscape edge','An outdoor interpretive sequence with freestanding exhibition frames, artwork stops and ecological planting.','exhibition panels|linear walk|shade trees',.33,.10],
[3,'Pedestrian & Cycle Circulation','Mobility','Site perimeter','A separated slow-mobility corridor for walking and bicycles, with planted buffers and cycle markings.','cycle lane|footpath|tree buffer',.60,.11],
[4,'Community Event Plaza','Social','Central court','Flexible hardscape for markets, informal gatherings, temporary events and low-energy lighting.','flexible plaza|string lighting|moveable furniture',.50,.42],
[5,'Terraced Social Spaces','Social','Central court','Stepped places to sit, pause, meet and watch social activities unfold across different levels.','terraced seating|accessible parallel route|shade',.37,.48],
[6,'Community Retail Interface','Social','Street edge','Small kiosks and spill-out areas that connect everyday commerce to the pedestrian landscape.','modular kiosks|canopy|outdoor queuing',.86,.15],
[7,'Interactive Play Landscape','Play','Family courtyard','Playful topography and climbing structures supporting intergenerational everyday recreation.','play tower|slide|climbing|safe surface',.23,.65],
[8,'Hammock Garden & Rest Zone','Landscape','Quiet courtyard','Shaded hammocks and soft planting in a calmer microclimatic zone away from busy circulation.','hammocks|shade canopy|quiet seating',.18,.83],
[9,'Outdoor Workspaces','Productive','Residential courtyard','Work and study tables under a lightweight pergola, with access to shade and fresh air.','pergola|shared tables|power provision',.64,.34],
[10,'Amphitheatre & Performance Space','Culture','Central court','A small stepped performance bowl supporting performances, talks, meetings and community gatherings.','amphitheatre seating|central stage|access route',.56,.60],
[11,'Landscape Viewing Deck','Landscape','Roof garden','Elevated planted deck and viewing edge for landscape observation and casual interaction.','viewing deck|balustrade|landscape outlook',.71,.78],
[12,'Active Play Zone','Play','Family courtyard','Flexible games area supporting table games, swings and informal activity close to homes.','game tables|swings|planting',.79,.53],
[13,'Active Recreation Zone','Play','Active court','Outdoor exercise area with calisthenics frames and resilient surface for low-cost daily movement.','calisthenics bars|exercise ground|trees',.80,.68],
[14,'Interactive Pedestrian Promenade','Mobility','Central connector','A meandering pedestrian connector with integrated sitting edges and landscape pockets.','curving walk|planter seating|social encounters',.50,.27],
[15,'Community Productive Landscape','Productive','Garden courtyard','Raised gardening beds and shared work surface for food-growing, education and communal care.','raised food beds|tool station|irrigation study',.33,.81],
[16,'Ecological Nature Trail','Landscape','Landscape edge','An ecological walking loop with shaded habitats, stormwater landscape and nature observation.','nature path|rain garden|habitat vegetation',.09,.43],
[17,'Social Dining Pavilion','Social','Dining court','A covered outdoor dining pavilion for shared meals, pop-up dining and informal celebrations.','covered structure|shared tables|lighting',.69,.43],
[18,'Informal Social Nodes','Social','Courtyard path','Small distributed seating clusters for spontaneous conversations and resting throughout the site.','integrated benches|trees|small meeting spaces',.40,.62],
[19,'Contemplative Retreat','Landscape','Quiet garden','A compact and sheltered refuge for reading, reflection and slow sensory engagement with planting.','quiet shelter|seating|soft landscape',.10,.68],
[20,'Bicycle Parking Infrastructure','Mobility','Arrival edge','Sheltered bicycle parking that connects residents and visitors to the slow-mobility network.','bike canopy|racks|lighting provision',.90,.32]
].map(function(a){return {id:a[0],title:a[1],category:a[2],zone:a[3],description:a[4],components:a[5].split('|'),x:a[6],y:a[7],enabled:true};});
var colors={red:'#aa4c58',edge:'#a75460',light:'#f4cabf',blush:'#f5ded4',pale:'#f9ece5',green:'#9ead95',green2:'#c9d7b9',gray:'#9fa69b',white:'#fffaf4'};
var selected=1,mode='catalog',filter='All',dragging=null,started=false;
function fmt(n){return Number(n).toFixed(1)}
function point(x,y,z){return [210+(x-y)*1.4,44+(x+y)*.72-(z||0)*1.36]}
function pts(a){return a.map(function(v){return fmt(point(v[0],v[1],v[2]||0)[0])+','+fmt(point(v[0],v[1],v[2]||0)[1])}).join(' ')}
function poly(a,fill,stroke,sw){return '<polygon points="'+pts(a)+'" fill="'+(fill||'none')+'" stroke="'+(stroke||colors.edge)+'" stroke-width="'+(sw||1.2)+'" stroke-linejoin="round"/>'}
function ln(a,b,col,sw){var p=point(a[0],a[1],a[2]),q=point(b[0],b[1],b[2]);return '<line x1="'+fmt(p[0])+'" y1="'+fmt(p[1])+'" x2="'+fmt(q[0])+'" y2="'+fmt(q[1])+'" stroke="'+(col||colors.red)+'" stroke-width="'+(sw||2)+'" stroke-linecap="round"/>'}
function plane(x,y,w,d,fill){return poly([[x,y,0],[x+w,y,0],[x+w,y+d,0],[x,y+d,0]],fill,'#d4a19a',.6)}
function bx(x,y,z,w,d,h,top){var b=[x,y,z],a=[x+w,y,z],c=[x+w,y+d,z],d0=[x,y+d,z];var B=[x,y,z+h],A=[x+w,y,z+h],C=[x+w,y+d,z+h],D=[x,y+d,z+h];return poly([d0,c,C,D],'#d6a49d')+poly([a,c,C,A],'#c58b8c')+poly([B,A,C,D],top||colors.light)}
function post(x,y,h){return ln([x,y,0],[x,y,h],colors.red,3)}
function frame(x,y,w,h,depth){return post(x,y,h)+post(x+w,y,h)+ln([x,y,h],[x+w,y,h],colors.red,3)+(depth?ln([x+w,y,h],[x+w,y+depth,h],colors.red,3):'')}
function shrub(x,y,s){var q=point(x,y,3*s);return '<ellipse cx="'+fmt(q[0])+'" cy="'+fmt(q[1])+'" rx="'+fmt(5*s)+'" ry="'+fmt(2.7*s)+'" fill="#a9bea1" opacity=".9"/>'}
function tree(x,y,s){var base=point(x,y,0),head=point(x,y,13*s);return '<g opacity=".95">'+ln([x,y,0],[x,y,12*s],'#8f8873',1.7)+'<ellipse cx="'+fmt(head[0]-3*s)+'" cy="'+fmt(head[1]+2*s)+'" rx="'+fmt(7*s)+'" ry="'+fmt(6*s)+'" fill="#b7c5a4"/><ellipse cx="'+fmt(head[0]+4*s)+'" cy="'+fmt(head[1]+s)+'" rx="'+fmt(6*s)+'" ry="'+fmt(5*s)+'" fill="#96ab8f"/><ellipse cx="'+fmt(head[0])+'" cy="'+fmt(head[1]-3*s)+'" rx="'+fmt(6*s)+'" ry="'+fmt(5*s)+'" fill="#a7b998"/></g>'}
function human(x,y,scale){var q=point(x,y,0),h=22*scale;var p=point(x,y,h);var hue='#de8892';return '<g stroke="'+hue+'" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="'+fmt(p[0])+'" cy="'+fmt(p[1]-5*scale)+'" rx="'+fmt(3.5*scale)+'" ry="'+fmt(4*scale)+'" fill="#eaa9ab" stroke-width=".7"/>'+ln([x,y,h-5*scale],[x,y,h-14*scale],hue,4*scale)+ln([x,y,h-13*scale],[x-3*scale,y,h-22*scale],hue,2*scale)+ln([x,y,h-13*scale],[x+4*scale,y,h-22*scale],hue,2*scale)+ln([x,y,h-8*scale],[x+6*scale,y,h-12*scale],hue,2*scale)+ln([x,y,h-8*scale],[x-5*scale,y,h-10*scale],hue,2*scale)+'</g>'}
function chair(x,y){return bx(x,y,0,10,4,3,'#edc2b7')+ln([x,y,3],[x,y,11],colors.red,2)+ln([x,y+4,3],[x,y+4,11],colors.red,2)}
function table(x,y){return bx(x-6,y-6,6,12,12,2,'#f8d7c8')+post(x-4,y-4,6)+post(x+4,y+4,6)}
function bike(x,y){var a=point(x,y,2),b=point(x+11,y,2),c=point(x+5,y,6);return '<g fill="none" stroke="#808d82" stroke-width="1.4"><circle cx="'+fmt(a[0])+'" cy="'+fmt(a[1])+'" r="5"/><circle cx="'+fmt(b[0])+'" cy="'+fmt(b[1])+'" r="5"/><polyline points="'+fmt(a[0])+','+fmt(a[1])+' '+fmt(c[0])+','+fmt(c[1])+' '+fmt(b[0])+','+fmt(b[1])+' '+fmt(a[0])+','+fmt(a[1])+'"/></g>'}
function pathline(a,c,w){return '<polyline points="'+pts(a)+'" fill="none" stroke="'+(c||'#e7b3a4')+'" stroke-width="'+(w||9)+'" stroke-linejoin="round" stroke-linecap="round"/>'}
function circ(x,y,r,col){var a=[];for(var i=0;i<=32;i++){var q=i/32*2*Math.PI;a.push([x+Math.cos(q)*r,y+Math.sin(q)*r,0])}return poly(a,col,'#b47672',1)}
function sector(x,y,r0,r1,a0,a1,col){var a=[],i,n=18;for(i=0;i<=n;i++){var t=a0+(a1-a0)*i/n;a.push([x+Math.cos(t)*r1,y+Math.sin(t)*r1,0])}for(i=n;i>=0;i--){var t2=a0+(a1-a0)*i/n;a.push([x+Math.cos(t2)*r0,y+Math.sin(t2)*r0,0])}return poly(a,col,'#b97873',.8)}
function canopy(x,y,w,d,h){return post(x,y,h)+post(x+w,y,h)+post(x+w,y+d,h)+post(x,y+d,h)+poly([[x,y,h],[x+w,y,h],[x+w,y+d,h],[x,y+d,h]],'#f3cbc1',colors.red,2)}
function bed(x,y,w,d){return bx(x,y,0,w,d,4,'#cbd7b9')+plane(x+2,y+2,w-4,d-4,'#9eae95')}
function svgFor(p){var a=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 250" role="img" aria-label="Isometric schematic of '+p.title+'">'];
a.push('<rect width="420" height="250" fill="#fffaf7"/>');
a.push(poly([[0,0,-4],[100,0,-4],[100,100,-4],[0,100,-4]],'#f3c4b8','#bc7373',1.3));
a.push(plane(0,0,100,100,'#f8eee6'));
function B(x,y,w,d,h){a.push(bx(x,y,0,w,d,h))}
function G(x,y,w,d){a.push(plane(x,y,w,d,'#cfdabf'))}
function T(x,y,s){a.push(tree(x,y,s||1))}
function H(x,y,s){a.push(human(x,y,s||.9))}
function L(x,y,w,d){a.push(plane(x,y,w,d,'#efc0b5'))}
switch(p.id){
case 1:
G(10,8,27,24);G(64,10,26,27);L(8,46,83,43);a.push(frame(8,45,42,28));B(45,13,24,15,3);a.push(shrub(47,19,1.2)+shrub(62,24,1));a.push(chair(14,63));a.push(bike(63,72)+bike(68,83));T(18,17,1);T(82,20,.8);H(34,58);H(74,47);break;
case 2:
G(5,5,28,88);G(72,4,23,90);L(40,0,20,100);for(var i=0;i<4;i++){var y=9+i*23;a.push(frame(30,y,40,18));a.push(poly([[34,y,4],[53,y,4],[53,y,16],[34,y,16]],'#ffe7dc','#b25d67',1))}T(17,16,.85);T(81,55,1);T(20,84,.7);H(54,64);break;
case 3:
G(0,0,30,100);L(35,0,31,100);a.push(plane(68,0,20,100,'#e8d5c8'));for(var j=0;j<5;j++)a.push(pathline([[63,j*20+6,0],[63,j*20+16,0]],'#fff7f0',2));T(12,15,.8);T(10,55,.9);T(20,84,.8);a.push(bike(55,46)+bike(76,17));H(42,73);break;
case 4:
G(4,5,18,85);G(78,10,18,80);L(26,13,50,75);a.push(frame(21,21,0,20)+frame(79,23,0,20));a.push(frame(21,75,0,20)+frame(79,75,0,20));a.push(ln([21,21,20],[79,23,20],'#ba5b66',1.4)+ln([21,75,20],[79,75,20],'#ba5b66',1.4));for(var k=0;k<9;k++){var q=25+k*6;a.push(ln([q,22,20],[q+1,22,18],'#e9a57c',2))}B(34,34,9,9,3);B(61,63,9,9,3);T(11,23);T(86,68,.9);H(47,48);H(68,36);break;
case 5:
G(4,2,22,88);G(78,8,18,73);for(var t=0;t<4;t++)a.push(bx(23+t*12,17+t*8,0,51-t*5,11,4+t*3,t%2?'#e4a5a6':'#f2c1b2'));a.push(plane(27,70,55,19,'#e9d0c0'));T(13,12,.85);T(84,73,1.1);H(43,28);H(62,57);H(44,74);break;
case 6:
G(0,0,15,96);G(80,0,16,96);for(var b=0;b<3;b++){var y0=8+b*28;B(27,y0,23,19,11);a.push(poly([[24,y0-2,12],[55,y0-2,12],[55,y0+23,12],[24,y0+23,12]],'#fae8d9',colors.red,1.5));a.push(frame(26,y0-2,29,12))}T(86,16,.9);T(10,77,.8);H(68,36);H(58,70);break;
case 7:
G(4,4,91,90);a.push(plane(24,19,57,60,'#e3b7ab'));a.push(frame(30,34,30,27));a.push(bx(54,37,17,13,13,3,'#efb0aa'));a.push(poly([[65,42,18],[82,66,0],[88,71,0],[70,43,18]],'#f4c1ac',colors.red,1.3));a.push(ln([32,34,25],[49,50,5],colors.red,3));T(13,12);T(80,11,.8);T(11,80,.8);H(32,76);break;
case 8:
G(0,0,100,100);for(var h0=0;h0<3;h0++){var xx=16+h0*29;a.push(post(xx,18,20)+post(xx+21,56,20)+poly([[xx,18,13],[xx+21,56,13],[xx+16,56,7],[xx+4,18,7]],'#f1bdb6','#b77d80',1.4))}T(11,14,.85);T(85,12,.8);T(10,82,.8);T(86,82,.8);H(56,77);break;
case 9:
G(1,2,97,95);L(10,27,74,59);a.push(canopy(11,24,72,58,28));for(var sl=0;sl<8;sl++)a.push(ln([11+sl*9,24,29],[11+sl*9,82,29],colors.red,1.5));a.push(table(38,48)+table(64,63));T(87,20);T(15,88,.75);H(24,72);break;
case 10:
G(0,0,96,98);a.push(circ(50,56,15,'#c4d3b2'));for(var r=19;r<=41;r+=8)a.push(sector(50,56,r,r+6,Math.PI*.12,Math.PI*1.8,r%2?'#f2c6b8':'#f6d8c8'));H(50,58,.9);T(12,17,.9);T(83,19,.8);T(84,84,.7);break;
case 11:
G(0,0,95,95);a.push(bx(24,25,13,59,49,5,'#e0b6ad'));for(var rail=0;rail<7;rail++){a.push(post(24+rail*9,25,30));a.push(ln([24+rail*9,25,30],[24+(rail+1)*9,25,30],colors.red,1.6))}for(var st=0;st<4;st++)a.push(bx(12+st*3,31+st*2,st*3,15,10,3,'#f4cac0'));T(13,17,1);T(89,83,.9);H(53,42);break;
case 12:
G(2,4,96,92);L(15,21,72,54);a.push(table(34,47)+table(64,57));a.push(frame(16,9,44,22));for(var swing=0;swing<2;swing++){var xs=28+swing*21;a.push(ln([xs,9,22],[xs,9,7],colors.red,1.2));a.push(bx(xs-4,9,6,8,4,2,'#e0b5ac'))}T(87,16,.85);T(9,78);H(75,82);break;
case 13:
G(0,0,96,100);L(20,17,58,61);a.push(frame(30,24,30,22)+frame(36,47,40,18)+frame(21,62,25,21));a.push(ln([30,24,17],[60,24,17],colors.red,2)+ln([36,47,14],[76,47,14],colors.red,2));T(10,16,1);T(84,83,.85);H(64,69);break;
case 14:
G(0,0,96,100);a.push(pathline([[18,4,0],[40,25,0],[32,46,0],[57,65,0],[78,89,0]],'#f3d4c5',24));a.push(sector(50,43,14,23,-.5,2.6,'#dca9a4'));a.push(circ(30,52,7,'#9aae96'));a.push(circ(62,66,6,'#b4c9a6'));T(15,14,.9);T(85,18,.8);H(37,25);H(64,77);break;
case 15:
G(0,0,98,98);for(var yy=8;yy<70;yy+=26)for(var xx=7;xx<80;xx+=28){a.push(bed(xx,yy,21,16));for(var q2=0;q2<3;q2++)a.push(shrub(xx+5+q2*5,yy+8,.5))}B(46,78,13,9,5);T(13,84,.8);T(88,78,.9);H(54,45);break;
case 16:
G(0,0,96,98);a.push(poly([[50,54,0],[97,48,0],[97,96,0],[56,92,0]],'#c7dde0','#a3bec2',.5));a.push(pathline([[8,8,0],[35,19,0],[50,43,0],[34,65,0],[59,87,0]],'#f4e5ce',15));for(var e=0;e<7;e++)T(10+(e*31)%77,10+(e*17)%83,.6+(e%3)*.12);H(35,37,.9);break;
case 17:
G(2,0,96,96);L(16,17,69,67);a.push(canopy(18,19,66,63,31));a.push(poly([[18,19,31],[84,19,31],[84,82,31],[18,82,31]],'#f3c7b9',colors.red,2));a.push(table(31,42)+table(66,39)+table(48,71));T(9,14,.85);T(88,87,.8);H(63,66);break;
case 18:
G(0,0,98,96);B(19,19,55,7,11);B(16,22,9,57,10);B(61,29,10,50,9);B(26,73,43,8,9);B(29,41,22,8,5);T(84,17,1);T(12,78,.8);H(45,58);break;
case 19:
G(1,1,97,97);a.push(circ(67,61,15,'#c7d7bb'));a.push(canopy(19,20,35,31,25));a.push(chair(25,35));a.push(pathline([[51,50,0],[62,40,0],[77,24,0]],'#f0d6c7',10));T(15,76,.8);T(77,83,1);T(82,11,.8);H(35,59,.8);break;
case 20:
G(0,0,100,96);L(8,22,82,61);a.push(canopy(15,20,69,48,25));for(var bb=0;bb<5;bb++){a.push(bike(17+bb*12,41)+bike(17+bb*12,66))}T(7,15,.8);T(91,85,.8);H(65,78);break;
}
a.push('<path d="M210 44 L350 116 L210 188 L70 116 Z" fill="none" stroke="#bb7474" stroke-width="1.7"/>');
a.push('</svg>');return a.join('')}
function $ (s){return document.querySelector(s)}
function esc(s){return String(s).replace(/[&<>"']/g,function(x){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]})}
function get(id){return P.find(function(p){return p.id===+id})}
function label(p){return String(p.id).padStart(2,'0')}
function setMode(next){mode=next;document.querySelectorAll('.mode').forEach(function(b){b.classList.toggle('active',b.dataset.mode===next)});document.querySelectorAll('.pane').forEach(function(q){q.classList.toggle('active',q.id===next)});if(next==='site')drawMap();if(next==='schedule')drawSchedule();}
function drawFilters(){var cats=['All','Social','Landscape','Play','Mobility','Culture','Productive','Arrival'];$('#filters').innerHTML=cats.map(function(c){return '<button type="button" class="'+(filter===c?'active':'')+'" data-category="'+c+'">'+c+'</button>'}).join('')}
function drawCatalog(){drawFilters();var items=P.filter(function(p){return filter==='All'||p.category===filter});$('#catalog-summary').textContent=items.length+' spatial studies · '+P.filter(function(p){return p.enabled}).length+' included';$('#tiles').innerHTML=items.map(function(p){return '<button type="button" data-feature="'+p.id+'" aria-label="View '+esc(p.title)+'" class="tile '+(p.id===selected?'selected':'')+'"><div class="image">'+svgFor(p)+'</div><div class="tile-footer"><span class="tile-number">'+label(p)+'</span><span class="tile-cat"> / '+p.category+'</span><span class="tile-title">'+esc(p.title)+'</span></div></button>'}).join('');drawInspector();}
function drawInspector(){var p=get(selected);$('#inspector').innerHTML='<span class="feature-num">ACTIVITY '+label(p)+' / 20</span><h2>'+p.title+'</h2><div class="diagram">'+svgFor(p)+'</div><p class="details">'+p.description+'</p><div class="details"><strong>Primary spatial elements</strong></div><div class="tags">'+p.components.map(function(c){return '<span>'+esc(c)+'</span>'}).join('')+'</div><div class="details"><strong>Suggested location</strong>'+p.zone+'</div><div class="smallbuttons"><button type="button" class="red" id="place-selected">Locate on site</button><button type="button" id="toggle-selected">'+(p.enabled?'Exclude from study':'Include in study')+'</button></div><p class="status">Schematic geometry · not a detailed BIM element or construction model</p>';$('#place-selected').addEventListener('click',function(){setMode('site')});$('#toggle-selected').addEventListener('click',function(){p.enabled=!p.enabled;drawCatalog()});}
function select(id){selected=+id;drawCatalog();if(mode==='site')drawMap()}
function drawMap(){var a=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 660" role="img" aria-label="Conceptual diagram for twenty draggable activity nodes" id="placement-svg">','<rect width="660" height="660" fill="#fafaf7"/>'];for(var i=0;i<=660;i+=55){a.push('<line x1="'+i+'" y1="0" x2="'+i+'" y2="660" stroke="#ecede7" stroke-width="1"/><line x1="0" y1="'+i+'" x2="660" y2="'+i+'" stroke="#ecede7" stroke-width="1"/>')}a.push('<rect x="18" y="18" width="624" height="624" fill="none" stroke="#b1b8a9" stroke-width="2" stroke-dasharray="8 7"/>');a.push('<circle cx="330" cy="330" r="195" fill="#e8efdf" opacity=".27" stroke="#b4c5ad" stroke-width="1.5" stroke-dasharray="5 6"/><path d="M330 18V642 M18 330H642" stroke="#d8dbd2" stroke-width="24" opacity=".6"/>');a.push('<text x="40" y="48" font-size="12" letter-spacing="2" fill="#a1a89e">CONCEPTUAL SITE PLACEMENT / 660 FT</text>');P.filter(function(p){return p.enabled}).forEach(function(p){var cx=Math.round(18+p.x*624),cy=Math.round(18+p.y*624),sel=p.id===selected,eco=p.category==='Landscape'||p.category==='Productive';a.push('<g data-marker="'+p.id+'" tabindex="0" role="button" aria-label="'+esc(p.title)+'" transform="translate('+cx+' '+cy+')"><circle r="'+(sel?22:17)+'" fill="'+(eco?'#8da38d':'#c97884')+'" stroke="'+(sel?'#4f4e4c':'white')+'" stroke-width="'+(sel?4:2)+'"/><text text-anchor="middle" dominant-baseline="middle" font-size="12" font-weight="750" fill="white" pointer-events="none">'+label(p)+'</text></g>')});a.push('</svg>');$('#site-map').innerHTML=a.join('');drawMapInspector();bindMapPointers();}
function drawMapInspector(){var p=get(selected);$('#map-inspector').innerHTML='<span class="eyebrow">NODE '+label(p)+'</span><h2>'+p.title+'</h2><div class="diagram">'+svgFor(p)+'</div><p>'+p.description+'</p><div class="tags">'+p.components.map(function(t){return '<span>'+esc(t)+'</span>'}).join('')+'</div><p><strong>Recommended zone:</strong> '+p.zone+'</p><p><strong>Position on conceptual grid:</strong> '+Math.round(p.x*660)+' × '+Math.round(p.y*660)+' ft</p><p class="status">Drag node to test relationships. Locations are separate from the actual BIM model.</p><button type="button" id="disable-on-map">'+(p.enabled?'Exclude from study':'Include in study')+'</button>';$('#disable-on-map').addEventListener('click',function(){p.enabled=!p.enabled;drawMap()})}
function bindMapPointers(){var svg=$('#placement-svg');function loc(e){var pt=svg.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;var m=svg.getScreenCTM();if(!m)return null;return pt.matrixTransform(m.inverse())}svg.addEventListener('pointerdown',function(e){var g=e.target.closest('[data-marker]');if(!g)return;selected=+g.dataset.marker;dragging=selected;svg.setPointerCapture(e.pointerId);drawMapInspector();svg.querySelectorAll('[data-marker]').forEach(function(n){var on=n.dataset.marker===String(selected);n.querySelector('circle').setAttribute('stroke',on?'#4f4e4c':'white');n.querySelector('circle').setAttribute('stroke-width',on?'4':'2')})});svg.addEventListener('pointermove',function(e){if(dragging===null)return;var q=loc(e);if(!q)return;var p=get(dragging);p.x=Math.max(0,Math.min(1,(q.x-18)/624));p.y=Math.max(0,Math.min(1,(q.y-18)/624));var g=svg.querySelector('[data-marker="'+p.id+'"]');if(g)g.setAttribute('transform','translate('+Math.round(18+p.x*624)+' '+Math.round(18+p.y*624)+')');drawMapInspector()});function end(){dragging=null}svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);svg.addEventListener('lostpointercapture',end);svg.addEventListener('keydown',function(e){var g=e.target.closest('[data-marker]');if(!g)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();selected=+g.dataset.marker;drawMap()}if(e.key.startsWith('Arrow')){e.preventDefault();var p=get(g.dataset.marker),s=e.shiftKey?.03:.01;p.x=Math.max(0,Math.min(1,p.x+(e.key==='ArrowRight'?s:e.key==='ArrowLeft'?-s:0)));p.y=Math.max(0,Math.min(1,p.y+(e.key==='ArrowDown'?s:e.key==='ArrowUp'?-s:0)));selected=p.id;drawMap();var node=$('#placement-svg').querySelector('[data-marker="'+p.id+'"]');if(node)node.focus()}})}
function csv(v){return '"'+String(v).replace(/"/g,'""')+'"'}
function dl(name,data,type){var blob=new Blob([data],{type:type});var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(function(){URL.revokeObjectURL(url)},1000)}
function downloadPlacement(){var data={project:'Penta Court',version:'activity-siting-study-01',coordinate_system:'conceptual feet; no BIM binding',site_ft:[660,660],programs:P.map(function(p){return {id:label(p),name:p.title,category:p.category,zone:p.zone,proposed_x_ft:+(p.x*660).toFixed(1),proposed_y_ft:+(p.y*660).toFixed(1),included:p.enabled,components:p.components}})};dl('penta-court-spatial-activities.json',JSON.stringify(data,null,2),'application/json')}
function drawSchedule(){var active=P.filter(function(p){return p.enabled}),cats=new Set(active.map(function(p){return p.category}));$('#schedule-stats').innerHTML='<div><b>'+active.length+'</b><span>Included programs</span></div><div><b>'+cats.size+'</b><span>Spatial categories</span></div><div><b>'+P.length+'</b><span>Original modules</span></div>';$('#program-rows').innerHTML=P.map(function(p){return '<tr><td>'+label(p)+'</td><td>'+p.title+'</td><td>'+p.category+'</td><td>'+p.zone+'</td><td>'+p.components.join(', ')+'</td><td><input type="checkbox" data-check="'+p.id+'" '+(p.enabled?'checked':'')+' aria-label="Include '+esc(p.title)+'"></td></tr>'}).join('')}
document.querySelectorAll('[data-mode]').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.mode)})});
$('#filters').addEventListener('click',function(e){var b=e.target.closest('[data-category]');if(b){filter=b.dataset.category;drawCatalog()}});
$('#tiles').addEventListener('click',function(e){var b=e.target.closest('[data-feature]');if(b)select(b.dataset.feature)});
$('#reset-placement').addEventListener('click',function(){P.forEach(function(p){var d=defaults[p.id];p.x=d[0];p.y=d[1];p.enabled=true});drawMap()});
$('#download-placement').addEventListener('click',downloadPlacement);
$('#download-schedule').addEventListener('click',function(){var s=[['id','activity','category','zone','components','included']].concat(P.map(function(p){return [label(p),p.title,p.category,p.zone,p.components.join('; '),p.enabled]}));dl('penta-court-activity-schedule.csv',s.map(function(row){return row.map(csv).join(',')}).join('\r\n'),'text/csv')});
$('#program-rows').addEventListener('change',function(e){if(e.target.matches('[data-check]')){get(e.target.dataset.check).enabled=e.target.checked;drawSchedule()}});
var defaults={};P.forEach(function(p){defaults[p.id]=[p.x,p.y]});drawCatalog();
})();