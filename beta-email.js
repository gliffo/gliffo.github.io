(function(){
 'use strict';
 var tr=window.GliffoI18n?window.GliffoI18n.t:function(text){return text;};
 var form=document.querySelector('.beta-native-form');
 if(!form||!window.fetch||!window.AbortController){return;}
 var button=form.querySelector('button[type="submit"]'),status=document.getElementById('beta-form-status');
 if(!button||!status){return;}
 var original=button.innerHTML,pending=false;
 form.addEventListener('submit',async function(event){
  event.preventDefault();
  if(pending||!form.reportValidity()){return;}
  var endpoint=new URL(form.action),isFormspree=endpoint.origin==='https://formspree.io'&&/^\/f\/[a-zA-Z0-9]+$/.test(endpoint.pathname);
  if(!isFormspree){status.textContent=tr("Il modulo non è ancora disponibile. Riprova più tardi.");return;}
  var honey=form.querySelector('[name="_honey"]');
  if(honey&&honey.value){status.textContent=tr("Non riusciamo a confermare l’invio. Riprova.");return;}
  pending=true;button.disabled=true;button.textContent=tr("Invio…");form.setAttribute('aria-busy','true');status.textContent=tr("Invio della tua email in corso…");
  var controller=new AbortController(),timer=setTimeout(function(){controller.abort();},12000);
  try{
   var fields=new FormData(form),target=form.action,body=fields,headers={'Accept':'application/json'};
   var response=await fetch(target,{method:'POST',body:body,headers:headers,signal:controller.signal,credentials:'omit',redirect:'error'});
   if(!response.ok){
    if(response.status===429){throw {friendly:tr("Il servizio ha raggiunto un limite temporaneo. Riprova più tardi.")};}
    throw Error('provider-unavailable');
   }
   var result=await response.json();
   var accepted=result&&result.ok===true;
   if(!accepted||result.error||(Array.isArray(result.errors)&&result.errors.length)){
    throw {friendly:tr("Il servizio non ha confermato l’invio. Riprova più tardi.")};
   }
   form.reset();
   status.textContent=tr("Richiesta ricevuta! Controlla la tua email: il link ai download può impiegare circa 5 minuti. Se hai già richiesto la Beta, cerca il messaggio «Benvenuto nella Beta di Gliffo Suite!». Controlla anche Spam.");
   button.disabled=false;button.innerHTML=original;pending=false;
  }catch(error){
   status.textContent=error&&error.friendly?error.friendly:tr("Non riusciamo a confermare l’invio. Riprova tra poco: la tua email è ancora nel campo.");
   button.disabled=false;button.innerHTML=original;pending=false;
  }finally{clearTimeout(timer);form.removeAttribute('aria-busy');}
 });
}());
