(function(){
 'use strict';
 var d=document,frame=d.querySelector('iframe[data-tally-src]'),direct=d.getElementById('tally-direct');
 if(!frame||!direct){return;}
 var query=new URLSearchParams(window.location.search),embed=new URL(frame.getAttribute('data-tally-src')),link=new URL(direct.href);
 ['app','version','os','illustrator'].forEach(function(name){var value=query.get(name);if(value){value=value.slice(0,120);embed.searchParams.set(name,value);link.searchParams.set(name,value);}});
 frame.setAttribute('data-tally-src',embed.href);direct.href=link.href;
 // Keep native scrolling available until Tally supplies the complete height.
 var observer=new MutationObserver(function(records){
  var sized=records.some(function(record){return record.attributeName==='height'||(record.attributeName==='style'&&Number.parseFloat(frame.style.height)>0);});
  if(sized){frame.setAttribute('scrolling','no');}
 });
 observer.observe(frame,{attributes:true,attributeFilter:['style','height']});
 // Official Tally bootstrap, with native loading on SDK errors as in its snippet.
 var w='https://tally.so/widgets/embed.js';
 function nativeFallback(){d.querySelectorAll('iframe[data-tally-src]:not([src])').forEach(function(e){e.src=e.getAttribute('data-tally-src');});}
 function load(){
  try{if(typeof window.Tally!=='undefined'){window.Tally.loadEmbeds();}else{nativeFallback();}}
  catch(_){nativeFallback();}
 }
 if(typeof window.Tally!=='undefined'){load();}
 else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement('script');s.src=w;s.onload=load;s.onerror=load;d.body.appendChild(s);}
}());
