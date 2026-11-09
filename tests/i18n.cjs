const fs=require('fs'),assert=require('assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..');
for(const [it,en] of [['index.html','en/index.html'],['beta/download/index.html','en/beta/download/index.html'],['feedback/index.html','en/feedback/index.html']]){
 const original=fs.readFileSync(path.join(root,it),'utf8'),translated=fs.readFileSync(path.join(root,en),'utf8');
 assert(original.includes('<html lang="it"'));assert(translated.includes('<html lang="en"'));
 for(const page of [original,translated]){assert(page.includes('hreflang="it"'));assert(page.includes('hreflang="en"'));assert(page.includes('rel="canonical"'));assert(page.includes('language-switch'));}
 assert(!translated.includes('>Prova la Beta<'));assert(!translated.includes('>Navigazione principale<'));
 for(const match of translated.matchAll(/(?:href|src)="(\/(?!\/)[^"?#]+)(?:[?#][^"]*)?"/g)){
  let target=path.join(root,decodeURIComponent(match[1]));if(target.endsWith('/'))target+='index.html';assert(fs.existsSync(target),'Broken English resource '+match[1]);
 }
}
const en=fs.readFileSync(path.join(root,'en/index.html'),'utf8');assert(en.includes('name="language" value="en"'));assert(en.includes('GLIFFO_BETA_mgaarvej'));assert(en.includes('https://formspree.io/f/mgaarvej'));assert(en.includes('welcome email are currently in Italian'));
assert(fs.readFileSync(path.join(root,'en/feedback/index.html'),'utf8').includes('feedback form is currently in Italian'));
for(const file of ['landing.js','gallery.js','screenshots.js','beta-email.js'])assert(fs.readFileSync(path.join(root,file),'utf8').includes('var tr='));
console.log('PASS: three static English routes, language metadata/switches, linked resources, provider marker, language field and clear Italian-interface notices.');
