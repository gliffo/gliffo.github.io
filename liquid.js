(function(){
 'use strict';
 var canvas=document.getElementById('liquid-canvas'),world=document.querySelector('.hero-world'),hero=document.querySelector('.hero'),lab=document.getElementById('laboratory');
 if(!canvas||!world||!hero||!lab)return;
 var gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return;
 var vertex='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
 var fragment=`precision mediump float;
 uniform vec2 resolution;uniform float time;uniform vec2 pointer;uniform vec4 specimen;uniform sampler2D mark;uniform vec3 accent;uniform float loaded;
 float mask(vec2 p){if(p.x<0.||p.y<0.||p.x>1.||p.y>1.)return 0.;return texture2D(mark,p).a;}
 vec3 liquid(vec2 p,float t){
  p+=vec2(sin(p.y*5.+t*.31),cos(p.x*4.-t*.27))*.16;
  float ribbons=sin(p.x*6.+p.y*3.+sin(p.y*4.+t*.22)*1.7-t*.15);
  vec3 c=mix(vec3(.38,.12,.72),vec3(.97,.43,.33),smoothstep(-.8,.9,ribbons));
  c=mix(c,vec3(.36,.83,.68),pow(max(0.,sin(p.x*5.-p.y*4.+t*.11)),7.)*.75);
  c=mix(c,accent,.13);return c;
 }
 void main(){
  vec2 uv=gl_FragCoord.xy/resolution;uv.y=1.-uv.y;
  float t=time;
  bool mobile=resolution.x<resolution.y*.85;
  vec2 p=uv+pointer*.025;
  float energy=mobile?smoothstep(.24,.7,uv.y):smoothstep(.28,.83,uv.x);
  vec3 night=vec3(.063,.051,.098);
  vec3 bg=mix(night,liquid(p,t),energy*.88);
  float fold=sin(p.x*7.-p.y*4.+sin(p.y*5.+t*.18)*1.4);
  bg+=vec3(.21,.12,.26)*pow(max(0.,fold),15.)*energy;
  float end=smoothstep(.78,1.,uv.y);bg=mix(bg,night,end*.7);
  vec2 q=(uv-specimen.xy)/specimen.zw;
  q-=.5;
  float angle=-.20+pointer.x*.07;
  q=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*q;
  q.y+=sin(q.x*4.+t*.35)*.012;
  vec2 lensCenter=vec2(.25+pointer.x*.15,-.12+pointer.y*.14);
  vec2 d=q-lensCenter;d.x*=1.27;
  float radius=.245;float dist=length(d);
  float inside=1.-smoothstep(radius-.012,radius,dist);
  vec2 refractQ=q+(q-lensCenter)*(.13*inside);
  vec2 s=refractQ+.5;
  float face=mask(s)*loaded;
  float depth=0.;
  for(int i=1;i<=12;i++){float k=float(i)/12.;depth=max(depth,mask(s-vec2(.035,.09)*k));}
  float shadow=mask(s-vec2(.055,.125));
  bg*=1.-shadow*.24*loaded;
  vec3 edge=mix(vec3(.14,.10,.25),vec3(.66,.48,.90),smoothstep(-.3,.4,q.x+q.y));
  edge*=.6+.4*sin(q.y*22.+q.x*4.);
  bg=mix(bg,edge,depth*loaded);
  float nx=mask(s-vec2(.007,0.))-mask(s+vec2(.007,0.));
  float ny=mask(s-vec2(0.,.007))-mask(s+vec2(0.,.007));
  float slope=q.y*.93+q.x*.47+sin(q.x*4.+t*.25)*.13+pointer.y*.1;
  float bands=sin(slope*14.+sin(q.x*7.+t*.2)*.5);
  vec3 chrome=mix(vec3(.13,.10,.21),vec3(.91,.94,.93),smoothstep(-.6,.6,bands));
  chrome=mix(chrome,liquid(q*.7+.6,t),.22+.2*pow(max(0.,-bands),2.));
  chrome+=vec3(.55,.49,.66)*pow(max(0.,sin(slope*24.+.8)),20.)*.7;
  chrome+=max(0.,nx*.8-ny*.9)*vec3(.8,.85,.78);
  chrome*=1.-max(0.,ny+nx)*.6;
  vec4 tex=texture2D(mark,clamp(s,0.,1.));
  if(tex.r>tex.g*1.3)chrome=mix(chrome,vec3(.97,.29,.24),.84);
  bg=mix(bg,chrome,face);
  float rim=exp(-abs(dist-radius)*240.);
  float outer=exp(-abs(dist-radius-.008)*340.);
  float gleam=pow(max(0.,dot(normalize(d+vec2(.001)),normalize(vec2(-.7,-.8)))),12.);
  bg=mix(bg,bg*.75+vec3(.10,.08,.15),inside*.12*loaded);
  bg+=rim*vec3(.7,.75,.83)*(.15+.75*gleam)*loaded;
  bg+=outer*vec3(.55,.35,.65)*.24*loaded;
  float quiet=mobile?1.-smoothstep(.25,.50,uv.y):1.-smoothstep(.25,.52,uv.x);
  bg=mix(bg,night,quiet*.82);
  gl_FragColor=vec4(bg,1.);
 }`;
 function shader(type,source){var s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}return s;}
 var v=shader(gl.VERTEX_SHADER,vertex),f=shader(gl.FRAGMENT_SHADER,fragment);if(!v||!f)return;
 var program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
 gl.useProgram(program);var buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);var a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 var uR=gl.getUniformLocation(program,'resolution'),uT=gl.getUniformLocation(program,'time'),uP=gl.getUniformLocation(program,'pointer'),uS=gl.getUniformLocation(program,'specimen'),uA=gl.getUniformLocation(program,'accent'),uL=gl.getUniformLocation(program,'loaded');
 var texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 var reduced=matchMedia('(prefers-reduced-motion: reduce)'),visible=true,frame=0,last=0,elapsed=0,mx=0,my=0,tx=0,ty=0,lost=false,loaded=0,rect=[.5,.2,.5,.5],accent=[.49,.53,.76];
 function draw(){if(lost)return;gl.uniform2f(uR,canvas.width,canvas.height);gl.uniform1f(uT,reduced.matches?0:elapsed);gl.uniform2f(uP,reduced.matches?0:mx,reduced.matches?0:my);gl.uniform4fv(uS,rect);gl.uniform3fv(uA,accent);gl.uniform1f(uL,loaded);gl.drawArrays(gl.TRIANGLES,0,6);}
 function tick(now){frame=0;if(!visible||document.hidden||reduced.matches||lost){last=0;return;}if(now-last>=32){elapsed+=last?Math.min((now-last)/1000,.06):0;last=now;mx+=(tx-mx)*.09;my+=(ty-my)*.09;draw();}frame=requestAnimationFrame(tick);}
 function sync(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!document.hidden&&!reduced.matches&&!lost)frame=requestAnimationFrame(tick);else draw();}
 function resize(){var width=world.clientWidth,height=Math.ceil(hero.getBoundingClientRect().bottom+scrollY);world.style.height=height+'px';var scale=Math.min(devicePixelRatio||1,1.4,Math.sqrt(1200000/(width*height)));canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));gl.viewport(0,0,canvas.width,canvas.height);var b=lab.getBoundingClientRect(),s=Math.min(1,b.width/640),cx=b.left+b.width/2,cy=b.top+scrollY+b.height/2;rect=[(cx-240*s)/width,(cy-190*s)/height,480*s/width,380*s/height];draw();}
 var image=new Image();image.onload=function(){if(lost)return;try{gl.bindTexture(gl.TEXTURE_2D,texture);var raster=document.createElement('canvas');raster.width=1060;raster.height=835;var ctx=raster.getContext('2d');ctx.clearRect(0,0,raster.width,raster.height);ctx.drawImage(image,0,0,raster.width,raster.height);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,raster);loaded=1;world.dataset.sculpture='ready';resize();draw();}catch(e){loaded=0;}};image.src='/assets/gliffo-icon.svg';
 hero.addEventListener('pointermove',function(e){if(reduced.matches||e.pointerType==='touch')return;var b=lab.getBoundingClientRect();tx=Math.max(-1,Math.min(1,(e.clientX-b.left)/b.width*2-1));ty=Math.max(-1,Math.min(1,(e.clientY-b.top)/b.height*2-1));});hero.addEventListener('pointerleave',function(){tx=0;ty=0;});
 new MutationObserver(function(){var color=getComputedStyle(lab).getPropertyValue('--active').trim();if(/^#[\da-f]{6}$/i.test(color))accent=[parseInt(color.slice(1,3),16)/255,parseInt(color.slice(3,5),16)/255,parseInt(color.slice(5,7),16)/255];if(reduced.matches)draw();}).observe(lab,{attributes:true,attributeFilter:['data-active']});
 canvas.addEventListener('webglcontextlost',function(e){e.preventDefault();lost=true;canvas.style.opacity='0';delete world.dataset.sculpture;if(frame)cancelAnimationFrame(frame);});
 document.addEventListener('visibilitychange',sync);if(reduced.addEventListener)reduced.addEventListener('change',sync);
 if(window.IntersectionObserver)new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;sync();},{rootMargin:'80px'}).observe(hero);
 if(window.ResizeObserver)new ResizeObserver(resize).observe(hero);else window.addEventListener('resize',resize);
 resize();canvas.dataset.rendered='webgl';canvas.style.opacity='1';sync();
}());
