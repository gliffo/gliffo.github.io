(function(){
 'use strict';
 var tr=window.GliffoI18n?window.GliffoI18n.t:function(text){return text;};
 var root=document.querySelector('.native-proof'),image=document.getElementById('gallery-image');
 if(!root||!image)return;
 var slides=[
 {id:'tono',name:'Tono',text:tr("La palette, dal pannello alla tavola.")},
 {id:'nesso',name:'Nesso',text:tr("Proporzioni e allineamenti tra simbolo e logotipo.")},
 {id:'trama',name:'Trama',text:tr("La costruzione del logo, con punti, cerchi e maniglie.")},
 {id:'modulo',name:'Modulo',text:tr("Una griglia su cui costruire il segno.")},
 {id:'tipo',name:'Tipo',text:tr("Il campionario dei caratteri, pronto da confrontare.")},
 {id:'soglia',name:'Soglia',text:tr("Il simbolo a diverse dimensioni, su chiaro e scuro.")},
 {id:'capsula',name:'Capsula',text:tr("I file esportati, ordinati per formato.")},
 {id:'scena',name:'Scena',text:tr("L’identità trasformata in una presentazione.")}
 ];
 var buttons=Array.from(root.querySelectorAll('[data-gallery-app]')),logo=document.getElementById('gallery-logo'),description=document.getElementById('gallery-description'),count=document.getElementById('gallery-count'),status=document.getElementById('gallery-status'),zoom=document.getElementById('gallery-zoom'),stage=document.getElementById('gallery-stage'),index=0,requested=0,generation=0;
 function select(next){
  next=(next+slides.length)%slides.length;requested=next;var serial=++generation,slide=slides[next],probe=new Image();status.textContent='';stage.setAttribute('aria-busy','true');
  function finish(){if(serial!==generation)return;index=next;image.src=probe.src;image.width=probe.naturalWidth;image.height=probe.naturalHeight;image.alt=slide.name+': '+slide.text+(slide.id==='capsula'?tr(" Cartella dei file esportati."):tr(" Cattura reale da Adobe Illustrator."));logo.src='/assets/apps/'+slide.id+'.svg';logo.alt=slide.name;description.textContent=slide.text;count.textContent=(index+1)+' / '+slides.length;zoom.dataset.openShot=probe.src;zoom.dataset.shotTitle=slide.name+tr(" — progetto Onda");buttons.forEach(function(button){button.setAttribute('aria-pressed',String(button.dataset.galleryApp===slide.id));});stage.setAttribute('aria-busy','false');}
  probe.onload=finish;probe.onerror=function(){if(serial!==generation)return;requested=index;stage.setAttribute('aria-busy','false');status.textContent=tr("Impossibile caricare questa schermata. Selezionala di nuovo per riprovare.");};probe.src='/assets/onda/'+slide.id+'.webp';
 }
 buttons.forEach(function(button){button.addEventListener('click',function(){select(slides.findIndex(function(slide){return slide.id===button.dataset.galleryApp;}));});});
 root.querySelector('[data-gallery-prev]').addEventListener('click',function(){select(requested-1);});root.querySelector('[data-gallery-next]').addEventListener('click',function(){select(requested+1);});
 root.addEventListener('keydown',function(event){if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||event.target.tagName==='INPUT')return;if(event.key==='ArrowRight'){event.preventDefault();select(requested+1);}else if(event.key==='ArrowLeft'){event.preventDefault();select(requested-1);}});
 var start=null;stage.addEventListener('pointerdown',function(event){if(event.pointerType==='touch')start={x:event.clientX,y:event.clientY};},{passive:true});stage.addEventListener('pointercancel',function(){start=null;});stage.addEventListener('pointerup',function(event){if(!start)return;var dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*2)select(requested+(dx<0?1:-1));},{passive:true});
 root.querySelector('.gallery-tools').hidden=false;root.querySelector('.gallery-arrows').hidden=false;
}());
