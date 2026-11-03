(function(){
 'use strict';
 var frame=document.getElementById('beta-form');
 if(!frame){return;}
 var formId=frame.dataset.formId;
 // The provider stores the response. This page neither stores nor forwards the email.
 // This is a registration flow on public GitHub Pages, not download authentication.
 window.addEventListener('message',function(event){
  if(event.origin!=='https://tally.so'||event.source!==frame.contentWindow){return;}
  var message=event.data;
  if(typeof message==='string'){try{message=JSON.parse(message);}catch(_){return;}}
  if(!message||message.event!=='Tally.FormSubmitted'||!message.payload||message.payload.formId!==formId||typeof message.payload.id!=='string'||!message.payload.id){return;}
  window.location.assign('/beta/download/');
 });
 function load(){
  if(window.Tally&&typeof window.Tally.loadEmbeds==='function'){try{window.Tally.loadEmbeds();return;}catch(_){}}
  if(!frame.getAttribute('src')){frame.src=frame.getAttribute('data-tally-src');}
 }
 if(window.Tally){load();return;}
 var script=document.createElement('script');script.src='https://tally.so/widgets/embed.js';script.onload=load;script.onerror=load;document.body.appendChild(script);
}());
