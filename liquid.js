(function(){
 'use strict';
 var canvas=document.getElementById('liquid-canvas'),world=document.querySelector('.hero-world'),hero=document.querySelector('.hero');
 if(!canvas||!world||!hero){return;}
 var gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});
 if(!gl){return;}
 var vertex='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
 var fragment=`precision mediump float;
 uniform vec2 resolution;uniform float time;uniform vec2 pointer;
 vec3 field(vec2 p){
  float t=time*.13;
  p+=vec2(sin(p.y*5.+t)*.065,cos(p.x*6.-t*.8)*.065);
  float a=exp(-length((p-vec2(.73+sin(t)*.12,.39+cos(t*.7)*.16))*vec2(2.7,2.7))*2.7);
  float b=exp(-length((p-vec2(.96+cos(t*.8)*.11,.14+sin(t*.5)*.12))*vec2(2.8,3.3))*2.7);
  float c=exp(-length((p-vec2(.59+sin(t*.6)*.12,.78+cos(t*.9)*.1))*vec2(3.5,3.))*2.9);
  vec3 col=vec3(.065,.045,.105);
  col+=vec3(.52,.22,.78)*a*1.28+vec3(.02,.71,.61)*b*1.15+vec3(.88,.23,.35)*c*1.32;
  float contour=sin(p.x*6.+p.y*4.+sin(p.y*5.-t)+t);
  col+=vec3(.17,.08,.24)*smoothstep(.2,.9,contour)*a;
  return col;
 }
 void main(){
  vec2 uv=gl_FragCoord.xy/resolution;uv.y=1.-uv.y;
  bool portrait=resolution.x<resolution.y;
  vec2 p=uv;if(portrait){p=vec2(uv.x*.65+.36,uv.y);}
  vec2 q=p+pointer*.028;
  vec2 center=portrait?vec2(.68,.72):vec2(.76,.47);
  vec2 delta=(p-center)*vec2(portrait?1.15:1.6,1.);
  float wave=sin(atan(delta.y,delta.x)*3.+time*.17)*.012;
  float lens=1.-smoothstep(.215+wave,.235+wave,length(delta));
  vec2 refractP=q+delta*.19*lens;
  vec3 col=field(refractP);
  float rim=exp(-abs(length(delta)-(.225+wave))*180.);
  col+=rim*vec3(.31,.25,.39);
  col+=lens*pow(max(0.,1.-length(delta-vec2(-.10,-.12))*5.),3.)*.20;
  float quiet=portrait?smoothstep(.10,.57,uv.y):smoothstep(.12,.64,uv.x);
  col=mix(vec3(.065,.045,.105),col,.18+.82*quiet);
  float fade=smoothstep(.77,1.,uv.y);col=mix(col,vec3(.082,.067,.12),fade*.88);
  gl_FragColor=vec4(col,1.);
 }`;
 function shader(type,source){var s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}return s;}
 var v=shader(gl.VERTEX_SHADER,vertex),f=shader(gl.FRAGMENT_SHADER,fragment);if(!v||!f){return;}
 var program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS)){return;}
 gl.useProgram(program);var buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);var a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 var uR=gl.getUniformLocation(program,'resolution'),uT=gl.getUniformLocation(program,'time'),uP=gl.getUniformLocation(program,'pointer');
 var reduced=matchMedia('(prefers-reduced-motion: reduce)'),visible=true,frame=0,last=0,elapsed=0,mx=0,my=0,lost=false;
 function draw(){if(lost){return;}gl.uniform2f(uR,canvas.width,canvas.height);gl.uniform1f(uT,reduced.matches?0:elapsed);gl.uniform2f(uP,reduced.matches?0:mx,reduced.matches?0:my);gl.drawArrays(gl.TRIANGLES,0,6);}
 function tick(now){frame=0;if(!visible||document.hidden||reduced.matches||lost){last=0;return;}if(now-last>=33){elapsed+=Math.min((now-last)/1000,.05);last=now;draw();}frame=requestAnimationFrame(tick);}
 function sync(){if(frame){cancelAnimationFrame(frame);frame=0;}last=0;if(visible&&!document.hidden&&!reduced.matches&&!lost){frame=requestAnimationFrame(tick);}else{draw();}}
 function resize(){var width=world.clientWidth,height=Math.ceil(hero.getBoundingClientRect().bottom+scrollY+80);world.style.height=height+'px';var scale=Math.min(devicePixelRatio||1,1.4,Math.sqrt(1400000/(width*height)));canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));gl.viewport(0,0,canvas.width,canvas.height);draw();}
 hero.addEventListener('pointermove',function(e){if(reduced.matches||e.pointerType==='touch'){return;}var r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;});hero.addEventListener('pointerleave',function(){mx=0;my=0;});
 canvas.addEventListener('webglcontextlost',function(e){e.preventDefault();lost=true;canvas.style.opacity='0';if(frame){cancelAnimationFrame(frame);frame=0;}});
 document.addEventListener('visibilitychange',sync);if(reduced.addEventListener){reduced.addEventListener('change',sync);}
 if(window.IntersectionObserver){new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;sync();},{rootMargin:'80px'}).observe(hero);}
 if(window.ResizeObserver){new ResizeObserver(resize).observe(hero);}else{window.addEventListener('resize',resize);}
 resize();draw();canvas.dataset.rendered='webgl';canvas.style.opacity='1';sync();
}());
