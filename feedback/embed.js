(function(){
 'use strict';
 var frame=document.querySelector('iframe[data-tally-src]'),direct=document.getElementById('tally-direct');
 if(!frame||!direct){return;}
 var query=new URLSearchParams(window.location.search);
 var embed=new URL(frame.getAttribute('data-tally-src')),link=new URL(direct.href);
 // Set context before the official loader starts the iframe and height listener.
 ['app','version','os','illustrator'].forEach(function(name){var value=query.get(name);if(value){value=value.slice(0,120);embed.searchParams.set(name,value);link.searchParams.set(name,value);}});
 frame.setAttribute('data-tally-src',embed.href);direct.href=link.href;
 function fallback(){frame.src=embed.href;}
 function load(){
  if(window.Tally&&typeof window.Tally.loadEmbeds==='function'){window.Tally.loadEmbeds();}
  else{fallback();}
 }
 if(window.Tally&&typeof window.Tally.loadEmbeds==='function'){load();return;}
 var script=document.createElement('script');script.src='https://tally.so/widgets/embed.js';script.async=true;
 script.onload=load;script.onerror=fallback;document.body.appendChild(script);
}());
