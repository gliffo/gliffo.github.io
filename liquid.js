(function(){
 'use strict';
 var canvas=document.getElementById('liquid-canvas'),world=document.querySelector('.hero-world'),hero=document.querySelector('.hero'),lab=document.getElementById('laboratory');
 if(!canvas||!world||!hero||!lab)return;
 var gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power'});if(!gl)return;
 var vertex='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
 var fragment=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 resolution;uniform float time;uniform vec2 pointer;uniform vec4 specimen;uniform sampler2D mark;uniform vec3 accent;uniform float loaded;uniform float pulse;
mat2 rotation(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
float distanceAt(vec2 p){if(p.x<0.||p.y<0.||p.x>1.||p.y>1.)return -.1;return (dot(texture2D(mark,p).rg,vec2(256./257.,1./257.))-.5)*.20;}
float cover(float d,float aa){return smoothstep(-aa,aa,d);}
vec3 spectrum(float x){return .56+.44*cos(6.28318*(vec3(.0,.30,.60)+x));}
vec3 fluid(vec2 p,float t){
 p+=vec2(sin(p.y*4.+t*.16),cos(p.x*5.-t*.18))*.18;
 float wave=sin(p.x*5.-p.y*3.+sin(p.y*4.+t*.17)*1.4);
 vec3 col=mix(vec3(.26,.035,.69),vec3(.98,.29,.19),smoothstep(-.8,.9,wave));
 col=mix(col,vec3(.20,.77,.69),pow(max(0.,cos(p.x*4.+p.y*5.+t*.10)),5.)*.85);
 col=mix(col,accent,.18);
 float caustic=pow(max(0.,sin(p.x*8.+p.y*3.+sin(p.y*5.-t*.12)*1.5)),22.);
 return col+caustic*vec3(.32,.23,.35);
}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;uv.y=1.-uv.y;float t=time;
 bool portrait=resolution.x<resolution.y*.85;
 float energy=portrait?smoothstep(.31,.64,uv.y):smoothstep(.28,.80,uv.x);
 vec3 night=vec3(.045,.035,.075);vec3 bg=mix(night,fluid(uv+pointer*.035,t),energy*.95);
 bg=mix(bg,night,smoothstep(.80,1.,uv.y)*.80);
 vec2 base=(uv-specimen.xy)/specimen.zw-.5;
 float aa=1.2/min(specimen.z*resolution.x,specimen.w*resolution.y);
 vec2 physical=base*vec2(1.,.802);
 vec2 orbit=rotation(-.60+sin(t*.11)*.13+pointer.x*.12)*physical;
 orbit.y/=.66;float orbital=length(orbit);
 float ringDistance=.038-abs(orbital-.49);
 float ringCoverage=cover(ringDistance,aa);
 float ringRound=sqrt(max(0.,1.-pow((orbital-.49)/.038,2.)));
 float ringLight=.5+.5*sin(atan(orbit.y,orbit.x)*3.-t*.16);
 vec3 ringColor=mix(vec3(.12,.08,.22),vec3(.9,.96,.91),pow(ringLight,3.));
 ringColor=mix(ringColor,spectrum(atan(orbit.y,orbit.x)*.16+t*.012),.28);
 ringColor+=pow(ringRound,14.)*.42;
 bg=mix(bg,ringColor,ringCoverage*.82*loaded);
 vec2 q=rotation(-.25+pointer.x*.09)*base;
 q.y+=sin(q.x*3.+t*.18)*.008;
 vec2 lensCenter=vec2(.18+pointer.x*.22,-.035+pointer.y*.24);
 vec2 lensDelta=(q-lensCenter)*vec2(1.,.802);
 float lensRadius=.255;float dist=length(lensDelta);
 float inside=1.-smoothstep(lensRadius-.022,lensRadius,dist);
 vec2 refracted=mix(q,lensCenter+(q-lensCenter)*(.73+.19*pow(dist/lensRadius,2.)),inside);
 float ripple=sin(dist*65.-pulse*8.)*exp(-dist*4.)*exp(-pulse*2.5)*.012;
 if(pulse>0.&&pulse<2.)refracted+=normalize(lensDelta+vec2(.0001))*ripple;
 vec2 sampleAt=refracted+.5;
 float df=distanceAt(sampleAt);float face=cover(df,aa)*loaded;
 float swept=df;
 for(int i=1;i<=8;i++){float k=float(i)/8.;swept=max(swept,distanceAt(sampleAt-vec2(.055,.085)*k));}
 float castShadow=cover(distanceAt(sampleAt-vec2(.07,.14)),aa*5.);
 bg*=1.-castShadow*.23*loaded;
 float side=.5+.5*sin(q.y*9.+q.x*7.+t*.12);
 vec3 sideColor=mix(vec3(.055,.03,.12),vec3(.48,.28,.86),side);
 sideColor=mix(sideColor,accent,.16);
 bg=mix(bg,sideColor,cover(swept,aa)*loaded);
 vec2 e=vec2(.0015,0.);
 vec2 grad=vec2(distanceAt(sampleAt+e)-distanceAt(sampleAt-e),distanceAt(sampleAt+e.yx)-distanceAt(sampleAt-e.yx));
 grad/=max(length(grad),.00001);
 float bevel=1.-smoothstep(.002,.025,max(df,0.));
 vec3 normal=normalize(vec3(-grad*bevel*.92,sqrt(max(.06,1.-bevel*bevel*.8))));
 vec3 light=normalize(vec3(-.6,-.75,1.));
 float lighting=max(0.,dot(normal,light));
 float flow=q.y*10.+q.x*4.5+sin(q.x*3.+t*.19)*1.35+pointer.y*.45;
 float bands=.5+.5*sin(flow);
 vec3 metal=mix(vec3(.045,.035,.09),vec3(.96,.98,.94),smoothstep(.13,.85,bands));
 metal=mix(metal,spectrum(flow*.055+t*.01),.18+.18*bevel);
 metal*=.55+.55*lighting;
 metal+=pow(max(0.,sin(flow*1.8+.6)),18.)*vec3(.48,.56,.57);
 metal+=pow(max(0.,dot(reflect(-light,normal),vec3(0.,0.,1.))),30.)*.65;
 float dotMark=texture2D(mark,clamp(sampleAt,0.,1.)).b;
 metal=mix(metal,vec3(1.,.28,.16)*(.65+.35*lighting),dotMark*.87);
 bg=mix(bg,metal,face);
 // Front arc crosses the sculpture, back arc sits behind it.
 float front=smoothstep(-.03,.07,orbit.y);
 bg=mix(bg,ringColor,ringCoverage*front*.87*loaded);
 float lensRim=exp(-abs(dist-lensRadius)*360.);
 float lensGleam=pow(max(0.,dot(normalize(lensDelta+vec2(.001)),normalize(vec2(-.6,-.8)))),9.);
 bg=mix(bg,bg*.86+vec3(.045,.06,.075),inside*.18*loaded);
 bg+=lensRim*(vec3(.35,.80,.83)*.24+vec3(.7,.62,.9)*lensGleam)*loaded;
 bg+=exp(-abs(dist-lensRadius-.008)*420.)*vec3(.45,.25,.68)*.35*loaded;
 float quiet=portrait?1.-smoothstep(.27,.48,uv.y):1.-smoothstep(.24,.49,uv.x);
 bg=mix(bg,night,quiet*.86);
 gl_FragColor=vec4(bg,1.);
 }`;
 function shader(type,source){var s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);return null;}return s;}
 var v=shader(gl.VERTEX_SHADER,vertex),f=shader(gl.FRAGMENT_SHADER,fragment);if(!v||!f)return;
 var program=gl.createProgram();gl.attachShader(program,v);gl.attachShader(program,f);gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;
 gl.useProgram(program);var buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);var a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
 var uR=gl.getUniformLocation(program,'resolution'),uT=gl.getUniformLocation(program,'time'),uP=gl.getUniformLocation(program,'pointer'),uS=gl.getUniformLocation(program,'specimen'),uA=gl.getUniformLocation(program,'accent'),uL=gl.getUniformLocation(program,'loaded'),uPulse=gl.getUniformLocation(program,'pulse');
 var texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 var reduced=matchMedia('(prefers-reduced-motion: reduce)'),visible=true,frame=0,last=0,elapsed=0,mx=0,my=0,tx=0,ty=0,lost=false,loaded=0,rect=[.5,.2,.5,.5],accent=[.49,.53,.76],pulseStart=-10,quality=1,slowFrames=0;
 function draw(){if(lost)return;gl.uniform2f(uR,canvas.width,canvas.height);gl.uniform1f(uT,reduced.matches?0:elapsed);gl.uniform2f(uP,reduced.matches?0:mx,reduced.matches?0:my);gl.uniform4fv(uS,rect);gl.uniform3fv(uA,accent);gl.uniform1f(uL,loaded);gl.uniform1f(uPulse,reduced.matches?-10:elapsed-pulseStart);gl.drawArrays(gl.TRIANGLES,0,6);}
 function tick(now){frame=0;if(!visible||document.hidden||reduced.matches||lost){last=0;return;}if(now-last>=32){if(last&&now-last>75){slowFrames++;}else{slowFrames=Math.max(0,slowFrames-1);}if(slowFrames>9&&quality>.68){quality*=.82;slowFrames=0;resize();}elapsed+=last?Math.min((now-last)/1000,.06):0;last=now;mx+=(tx-mx)*.09;my+=(ty-my)*.09;draw();}frame=requestAnimationFrame(tick);}
 function sync(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!document.hidden&&!reduced.matches&&!lost)frame=requestAnimationFrame(tick);else draw();}
 function resize(){var width=world.clientWidth,height=Math.ceil(hero.getBoundingClientRect().bottom+scrollY);world.style.height=height+'px';var scale=Math.min(devicePixelRatio||1,2,Math.sqrt((width<760?1800000:5400000)/(width*height)))*quality;canvas.width=Math.max(1,Math.round(width*scale));canvas.height=Math.max(1,Math.round(height*scale));gl.viewport(0,0,canvas.width,canvas.height);var b=lab.getBoundingClientRect(),s=Math.min(1,b.width/640),cx=b.left+b.width/2,cy=b.top+scrollY+b.height/2;rect=[(cx-260*s)/width,(cy-208.46*s)/height,520*s/width,416.92*s/height];canvas.dataset.renderScale=scale.toFixed(2);draw();}
 var image=new Image();image.onload=function(){if(lost)return;try{gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);loaded=1;world.dataset.sculpture='ready';resize();draw();}catch(e){loaded=0;}};image.src='/assets/gliffo-distance.png';
 hero.addEventListener('pointermove',function(e){if(reduced.matches||e.pointerType==='touch')return;var b=lab.getBoundingClientRect();tx=Math.max(-1,Math.min(1,(e.clientX-b.left)/b.width*2-1));ty=Math.max(-1,Math.min(1,(e.clientY-b.top)/b.height*2-1));});hero.addEventListener('pointerleave',function(){tx=0;ty=0;});
 lab.addEventListener('pointerdown',function(e){if(!reduced.matches&&!e.target.closest('a,button'))pulseStart=elapsed;});
 new MutationObserver(function(){var color=getComputedStyle(lab).getPropertyValue('--active').trim();if(/^#[\da-f]{6}$/i.test(color))accent=[parseInt(color.slice(1,3),16)/255,parseInt(color.slice(3,5),16)/255,parseInt(color.slice(5,7),16)/255];if(reduced.matches)draw();}).observe(lab,{attributes:true,attributeFilter:['data-active']});
 canvas.addEventListener('webglcontextlost',function(e){e.preventDefault();lost=true;canvas.style.opacity='0';delete world.dataset.sculpture;if(frame)cancelAnimationFrame(frame);});
 document.addEventListener('visibilitychange',sync);if(reduced.addEventListener)reduced.addEventListener('change',sync);
 if(window.IntersectionObserver)new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;sync();},{rootMargin:'80px'}).observe(hero);
 if(window.ResizeObserver)new ResizeObserver(resize).observe(hero);else window.addEventListener('resize',resize);
 resize();canvas.dataset.rendered='webgl';canvas.style.opacity='1';sync();
}());
