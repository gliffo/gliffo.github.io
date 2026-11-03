(function(){
 'use strict';
 var dialog=document.getElementById('screenshot-dialog');
 if(!dialog){return;}
 var image=document.getElementById('screenshot-full'),title=document.getElementById('screenshot-title'),file=document.getElementById('screenshot-file'),lastTrigger=null,previousOverflow='';
 function open(trigger,source,label){
  if(!source){return;}
  if(typeof dialog.showModal!=='function'){window.open(source,'_blank','noopener,noreferrer');return;}
  lastTrigger=trigger;image.src=source;image.alt=label;title.textContent=label;file.href=source;
  previousOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
  dialog.showModal();dialog.querySelector('.screenshot-scroll').scrollTop=0;
 }
 var appButton=document.getElementById('preview-zoom'),suiteButton=document.getElementById('suite-zoom');
 if(appButton){appButton.addEventListener('click',function(){var current=document.getElementById('app-screenshot');open(appButton,current.currentSrc||current.src,current.alt);});}
 if(suiteButton){suiteButton.addEventListener('click',function(){var current=document.querySelector('.suite-window img');open(suiteButton,current.currentSrc||current.src,'Gliffo Suite — interfaccia della Beta');});}
 dialog.querySelector('[data-close-screenshot]').addEventListener('click',function(){dialog.close();});
 dialog.addEventListener('click',function(event){if(event.target!==dialog){return;}var r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom){dialog.close();}});
 dialog.addEventListener('close',function(){document.documentElement.style.overflow=previousOverflow;image.removeAttribute('src');if(lastTrigger){lastTrigger.focus({preventScroll:true});}});
}());
