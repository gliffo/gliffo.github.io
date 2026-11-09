const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright'),assert=require('assert/strict'),fs=require('fs');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});const base=process.env.TEST_URL||'http://127.0.0.1:8896';const errors=[],results=[];fs.mkdirSync('.review',{recursive:true});
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});await context.route('https://tally.so/**',r=>r.fulfill(r.request().resourceType()==='script'?{status:200,contentType:'application/javascript',body:'window.Tally={loadEmbeds:function(){}};'}:{status:200,contentType:'text/html',body:'<p>Feedback test fixture</p>'}));const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/en/');await page.waitForTimeout(500);assert.equal(await page.locator('html').getAttribute('lang'),'en');assert((await page.locator('h1').innerText()).includes('Fewer clicks.'));
  for(const route of ['/en/','/en/beta/download/','/en/feedback/','/']){
   await page.goto(base+route);await page.waitForTimeout(250);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' overflow '+width);
   for(const link of await page.locator('.language-switch a').all()){assert(await link.isVisible());const b=await link.boundingBox();assert(b.x>=0&&b.x+b.width<=width+1,route+' language switch outside viewport');}
   if(route==='/en/')await page.screenshot({path:'.review/en-home-'+width+'.png'});
   if(route==='/en/beta/download/')await page.screenshot({path:'.review/en-download-'+width+'.png'});
  }
  await page.goto(base+'/en/');await page.locator('[data-gallery-app=trama]').click();await page.waitForFunction(()=>document.querySelector('#gallery-description').textContent.includes('Logo construction'));await page.locator('#gallery-zoom').click();assert(await page.locator('#screenshot-dialog').isVisible());assert((await page.locator('.screenshot-note').innerText()).includes('Screenshot provided by the author'));await page.locator('[data-close-screenshot]').click();
  await page.locator('#app-tono summary').click();await page.waitForTimeout(100);assert((await page.locator('#preview-caption').innerText()).includes('Color'));
  let mode='ok',submissions=0;await page.route('https://formspree.io/f/mgaarvej',async route=>{submissions++;const body=route.request().postData()||'';assert(body.includes('language'));assert(body.includes('GLIFFO_BETA_mgaarvej'));await route.fulfill({status:mode==='ok'?200:429,contentType:'application/json',body:JSON.stringify(mode==='ok'?{ok:true}:{error:'limit'})});});
  await page.locator('input[name=email]').fill('qa@example.invalid');await page.locator('.beta-native-form button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#beta-form-status').textContent.includes('Request received!'));assert.equal(new URL(page.url()).pathname,'/en/');
  mode='error';await page.locator('input[name=email]').fill('qa@example.invalid');await page.locator('.beta-native-form button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#beta-form-status').textContent.includes('temporary limit'));assert.equal(await page.locator('input[name=email]').inputValue(),'qa@example.invalid');assert.equal(submissions,2);
  // Existing Italian welcome-email link follows the stored English preference.
  await page.goto(base+'/beta/download/');await page.waitForURL('**/en/beta/download/');await page.locator('.language-switch a[lang=it]').click();await page.waitForURL('**/beta/download/');assert.equal(await page.locator('html').getAttribute('lang'),'it');
  await page.locator('.language-switch a[lang=en]').click();await page.waitForURL('**/en/beta/download/');await page.locator('a[href="#help-mac"]').first().click();assert(await page.locator('#help-mac').getAttribute('open')!==null);
  await context.close();results.push({width,staticRoutes:true,gallery:true,zoom:true,formMock:true,languagePreference:true,help:true});
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});const p=await nojs.newPage();await p.goto(base+'/en/');assert((await p.locator('h1').innerText()).includes('Fewer clicks.'));assert(await p.locator('.language-switch a[lang=it]').isVisible());await nojs.close();assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:true,results,englishWithoutJavaScript:true,liveSubmissions:0},null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
