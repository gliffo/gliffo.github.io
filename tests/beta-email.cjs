const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('beta-email.js','utf8');
function setup({reply={ok:true,status:200,json:async()=>({ok:true})},failure,action='https://formspree.io/f/mgaarvej',fetcher}={}){
 let submit,requests=[],navigation=[],timers=[],cleared=[];const button={innerHTML:'Accedi alla Beta',disabled:false,textContent:''},status={textContent:''},honey={value:''};
 const form={action,email:'qa@example.invalid',valid:true,attrs:{},reset(){this.email='';},querySelector:s=>s.startsWith('button')?button:honey,reportValidity(){return this.valid},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]},addEventListener(n,f){assert.equal(n,'submit');submit=f}};
 class FD{constructor(f){this.entries=[['email',f.email],['_honey',honey.value]]}forEach(fn){this.entries.forEach(([k,v])=>fn(v,k))}}
 const fetch=async(...args)=>{requests.push(args);if(failure)throw Error('offline');if(fetcher)return fetcher(...args);return reply};
 const window={fetch,AbortController,location:{assign:x=>navigation.push(x)}},document={querySelector:()=>form,getElementById:()=>status};
 vm.runInNewContext(source,{window,document,URL,FormData:FD,AbortController,fetch,setTimeout:fn=>{timers.push(fn);return timers.length},clearTimeout:id=>cleared.push(id),JSON,Array,Error});
 return {form,button,status,requests,navigation,honey,timers,cleared,submit:()=>submit({preventDefault(){}})};
}
(async()=>{
 for(const reply of [{ok:false,status:522},{ok:false,status:429},{ok:true,status:200,json:async()=>({success:false})},{ok:true,status:200,json:async()=>({success:'false'})},{ok:true,status:200,json:async()=>{throw Error('HTML error page')}}]){const s=setup({reply});await s.submit();assert.deepEqual(s.navigation,[]);assert.equal(s.button.disabled,false);assert(s.status.textContent.length>15);assert.equal(s.form.email,'qa@example.invalid');assert.equal(s.form.attrs['aria-busy'],undefined);assert(s.cleared.length);}
 let s=setup({failure:true});await s.submit();assert.deepEqual(s.navigation,[]);assert.equal(s.button.disabled,false);
 s=setup();s.form.valid=false;await s.submit();assert.equal(s.requests.length,0);
 s=setup();await s.submit();assert.deepEqual(s.navigation,[]);assert(s.status.textContent.includes('Richiesta ricevuta!') && s.status.textContent.includes('Spam'));assert.equal(s.form.email,'');assert.equal(s.button.disabled,false);assert.equal(s.requests[0][0],'https://formspree.io/f/mgaarvej');assert.equal(s.requests[0][1].body.entries[0][1],'qa@example.invalid');
 s=setup({action:'https://formspree.io/f/testendpoint',reply:{ok:true,status:200,json:async()=>({ok:true,next:'https://other.example/'})}});await s.submit();assert.deepEqual(s.navigation,[]);assert(s.status.textContent.includes('Richiesta ricevuta!') && s.status.textContent.includes('Spam'));assert.equal(s.form.email,'');assert.equal(s.button.disabled,false);assert.equal(s.requests[0][1].headers.Accept,'application/json');
 s=setup({action:'https://formspree.io/f/testendpoint',reply:{ok:true,status:200,json:async()=>({ok:false,errors:[{message:'Rejected'}]})}});await s.submit();assert.deepEqual(s.navigation,[]);
 s=setup({fetcher:(_,options)=>new Promise((_,reject)=>options.signal.addEventListener('abort',()=>reject(Error('timeout'))))});const pending=s.submit();await s.submit();assert.equal(s.requests.length,1);s.timers[0]();await pending;assert.deepEqual(s.navigation,[]);assert.equal(s.button.disabled,false);
 console.log('PASS: 522/network/timeout/rate-limit/HTML/false-success errors stay on page, preserve email and allow retry; duplicates prevented; confirmed success shows inbox instructions without revealing or opening downloads. No live submissions sent.');
})().catch(e=>{console.error(e);process.exit(1)});
