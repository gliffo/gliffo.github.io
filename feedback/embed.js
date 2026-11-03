(function(){
 'use strict';
 var frame=document.querySelector('iframe[data-tally-src]'),direct=document.getElementById('tally-direct');
 var query=new URLSearchParams(window.location.search);
 var embed=new URL(frame.getAttribute('data-tally-src')),link=new URL(direct.href),changed=false;
 // Forward only the explicit, non-personal context used by the Suite.
 ['app','version','os','illustrator'].forEach(function(name){var value=query.get(name);if(value){value=value.slice(0,120);embed.searchParams.set(name,value);link.searchParams.set(name,value);changed=true;}});
 if(changed){frame.setAttribute('data-tally-src',embed.href);frame.src=embed.href;direct.href=link.href;}
 if(window.Tally&&typeof window.Tally.loadEmbeds==='function'){window.Tally.loadEmbeds();}
}());
