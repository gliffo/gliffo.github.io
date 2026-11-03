(function(){
 'use strict';
 var frame=document.querySelector('iframe[data-tally-src]'),direct=document.getElementById('tally-direct');
 if(!frame||!direct){return;}
 var query=new URLSearchParams(window.location.search);
 var embed=new URL(frame.getAttribute('data-tally-src')),link=new URL(direct.href),changed=false;
 ['app','version','os','illustrator'].forEach(function(name){var value=query.get(name);if(value){value=value.slice(0,120);embed.searchParams.set(name,value);link.searchParams.set(name,value);changed=true;}});
 frame.setAttribute('data-tally-src',embed.href);direct.href=link.href;
 // HTML already loads the real form, including when JS or the SDK is blocked.
 if(changed){frame.src=embed.href;}
 function ensureFrame(){var src=frame.getAttribute('src');if(!src||src==='about:blank'){frame.src=embed.href;}}
 function enhance(){
  try{if(window.Tally&&typeof window.Tally.loadEmbeds==='function'){window.Tally.loadEmbeds();}}
  catch(_){/* The working native iframe and direct link remain available. */}
  ensureFrame();
 }
 if(window.Tally&&typeof window.Tally.loadEmbeds==='function'){enhance();return;}
 var script=document.createElement('script');script.src='https://tally.so/widgets/embed.js';script.async=true;
 script.onload=enhance;script.onerror=ensureFrame;document.body.appendChild(script);
}());
