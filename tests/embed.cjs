const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const code=fs.readFileSync('feedback/embed.js','utf8'),base='https://tally.so/embed/jeZYO9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';
function run({query='',existing=false,throws=false}={}){
 let appended,loads=0,navigations=0,resize;const attrs={'data-tally-src':base,height:'1354'},frame={style:{},getAttribute:k=>attrs[k],setAttribute:(k,v)=>attrs[k]=v,set src(v){attrs.src=v;navigations++}},direct={href:'https://tally.so/r/jeZYO9'},window={location:{search:query}};
 function sdk(){loads++;if(throws)throw Error('SDK failed');frame.src=attrs['data-tally-src'];frame.style.height='2600px';resize([{attributeName:'style'}]);}
 if(existing)window.Tally={loadEmbeds:sdk};
 const document={querySelector:selector=>selector.startsWith('script[')?null:frame,querySelectorAll:()=>attrs.src?[]:[frame],getElementById:()=>direct,createElement:()=>({}),body:{appendChild(s){appended=s}}};
 function MutationObserver(cb){resize=cb;this.observe=()=>{}}
 vm.runInNewContext(code,{window,document,URL,URLSearchParams,MutationObserver,Number});
 return {attrs,frame,direct,script:appended,get loads(){return loads},get navigations(){return navigations},ready(){window.Tally={loadEmbeds:sdk};appended.onload()},height(h){attrs.height=String(h);resize([{attributeName:'height'}])},unrelatedStyle(){resize([{attributeName:'style'}])}};
}
let r=run();assert.equal(r.attrs.src,undefined);r.unrelatedStyle();assert.equal(r.attrs.scrolling,undefined,'initial 1354px is not proof that content fits');r.ready();assert.equal(r.loads,1);assert.equal(r.frame.style.height,'2600px');assert.equal(r.attrs.scrolling,'no');r.height(900);assert.equal(r.attrs.height,'900');
r=run({query:'?app=Scena&version=Beta+1.0.0&email=private%40example.test'});r.ready();assert(r.attrs.src.includes('app=Scena'));assert(!r.attrs.src.includes('email='));assert(r.direct.href.includes('version='));
r=run({throws:true});r.ready();assert.equal(r.attrs.src,base);assert.equal(r.attrs.scrolling,undefined);
r=run();r.script.onerror();assert.equal(r.attrs.src,base);
r=run({existing:true});assert.equal(r.script,undefined);assert.equal(r.attrs.scrolling,'no');
const html=fs.readFileSync('feedback/index.html','utf8'),css=fs.readFileSync('styles.css','utf8');assert(html.includes('height="1354"'));assert(html.includes('transparentBackground=1&amp;dynamicHeight=1'));assert(html.includes('<script>\n'+code+'</script>'));assert(html.includes('/styles.css?v=5'));assert(!css.includes('height:1100px'));assert(!css.includes('overflow:hidden'));assert(css.includes('.form-surface{background:var(--background)'));console.log('PASS: supplied Tally options + dynamic height; complete 2600px resize, shorter page, no premature scroll suppression, SDK fallback and inline loader (SDK simulated).');
