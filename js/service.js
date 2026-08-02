/* ---------- Preloader ---------- */
window.addEventListener('load',()=>{
  const preloader=document.getElementById('preloader');
  const bar=document.getElementById('plbar');
  if(!preloader||!bar)return;
  let p=0;
  const t=setInterval(()=>{
    p+=Math.random()*18;
    if(p>=100){
      p=100;
      clearInterval(t);
      setTimeout(()=>preloader.classList.add('done'),250);
    }
    bar.style.width=p+'%';
  },120);
});

/* ---------- Custom cursor ---------- */
const dot=document.getElementById('cdot'), ring=document.getElementById('cring');
if(dot&&ring){
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
  (function loop(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button,.service-card,.project-row').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('big'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('big'));
  });
}

/* ---------- Ink trail scroll progress ---------- */
const inkPath=document.getElementById('ink-path');
if(inkPath){
  function setInk(){
    const h=document.documentElement;
    const total=h.scrollHeight-h.clientHeight;
    const pct=total>0?(h.scrollTop/total):0;
    inkPath.setAttribute('d',`M2.5,0 L2.5,${window.innerHeight}`);
    inkPath.style.strokeDasharray=window.innerHeight;
    inkPath.style.strokeDashoffset=window.innerHeight*(1-pct);
  }
  window.addEventListener('scroll',setInk);
  window.addEventListener('resize',setInk);
  setInk();
}

/* ---------- Header on scroll ---------- */
const header=document.getElementById('siteHeader');
if(header){
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled',window.scrollY>40);
  });
}

/* ---------- Mobile menu ---------- */
const burger=document.getElementById('burger'), mmenu=document.getElementById('mobileMenu');
if(burger&&mmenu){
  burger.addEventListener('click',()=>{burger.classList.toggle('open');mmenu.classList.toggle('open');});
  mmenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');mmenu.classList.remove('open');}));
}

/* ---------- Scroll reveal ---------- */
const rvEls=document.querySelectorAll('.rv,.rv-scale');
if(rvEls.length){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:0.15});
  rvEls.forEach(el=>io.observe(el));
}

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${x*0.25}px,${y*0.4}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)';});
});

/* ---------- Project carousels ---------- */
(function(){
  const CAROUSEL_SPEED_MS = 2000;
  document.querySelectorAll('.proj-carousel').forEach(function(box){
    const slides = box.querySelectorAll('.proj-slide');
    if(!slides.length) return;
    let current = 0;
    setInterval(function(){
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, CAROUSEL_SPEED_MS);
  });
})();