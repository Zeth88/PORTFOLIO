/* ---------- Preloader ---------- */
window.addEventListener('load',()=>{
  const bar=document.getElementById('plbar');
  let p=0;
  const t=setInterval(()=>{
    p+=Math.random()*18;
    if(p>=100){
      p=100;
      clearInterval(t);
      setTimeout(()=>document.getElementById('preloader').classList.add('done'),250);
    }
    bar.style.width=p+'%';
  },120);
});

/* ---------- Custom cursor ---------- */
const dot=document.getElementById('cdot'), ring=document.getElementById('cring');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.service-card,.project-row').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('big'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('big'));
});

/* ---------- Ink trail scroll progress ---------- */
const inkPath=document.getElementById('ink-path');
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

/* ---------- Header on scroll ---------- */
const header=document.getElementById('siteHeader');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>40);
});

/* ---------- Mobile menu ---------- */
const burger=document.getElementById('burger'), mmenu=document.getElementById('mobileMenu');
burger.addEventListener('click',()=>{burger.classList.toggle('open');mmenu.classList.toggle('open');});
mmenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{burger.classList.remove('open');mmenu.classList.remove('open');}));

/* ---------- Active nav link on scroll ---------- */
const sections=document.querySelectorAll('section[id]');
const navlinks=document.querySelectorAll('.navlink');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY+140>=s.offsetTop)cur=s.id;});
  navlinks.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur));
});

/* ---------- Scroll reveal ---------- */
const rvEls=document.querySelectorAll('.rv,.rv-scale');
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:0.15});
rvEls.forEach(el=>io.observe(el));

/* ---------- Timeline dot reveal ---------- */
const tItems=document.querySelectorAll('.t-item');
const tio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');tio.unobserve(e.target);}});
},{threshold:0.4});
tItems.forEach(el=>tio.observe(el));

/* ---------- Skill rings ---------- */
const skillCards=document.querySelectorAll('.skill-card');
const sio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const val=e.target.dataset.val;
      const circ=2*Math.PI*40;
      const fg=e.target.querySelector('.fg');
      fg.style.strokeDashoffset=circ-(circ*val/100);
      sio.unobserve(e.target);
    }
  });
},{threshold:0.4});
skillCards.forEach(el=>sio.observe(el));

/* ---------- Role rotator ---------- */
const roles=document.querySelectorAll('#roleList li');
let ri=0;
setInterval(()=>{
  roles[ri].style.transition='transform .5s ease, opacity .5s ease';
  roles[ri].style.transform='translateY(-120%)';
  roles[ri].style.opacity='0';
  const next=(ri+1)%roles.length;
  roles[next].style.transform='translateY(0)';
  roles[next].style.opacity='1';
  ri=next;
},2600);
roles.forEach((li,i)=>{
  li.style.position='absolute';li.style.left='0';li.style.top='0';
  li.style.transform=i===0?'translateY(0)':'translateY(120%)';
  li.style.opacity=i===0?'1':'0';
});

/* ---------- Hero parallax ---------- */
const heroVisual=document.getElementById('heroVisual');
window.addEventListener('mousemove',e=>{
  const x=(e.clientX/window.innerWidth-0.5)*18;
  const y=(e.clientY/window.innerHeight-0.5)*18;
  heroVisual.style.transform=`translate(${x}px,${y}px)`;
});

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    btn.style.transform=`translate(${x*0.25}px,${y*0.4}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)';});
});

/* ---------- Testimonial carousel ---------- */
const slides=document.querySelectorAll('.test-slide');
const dots=document.querySelectorAll('.test-dots button');
let ti=0;
function showSlide(i){
  slides.forEach(s=>s.classList.remove('active'));
  dots.forEach(d=>d.classList.remove('active'));
  slides[i].classList.add('active');
  dots[i].classList.add('active');
  ti=i;
}
dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
setInterval(()=>showSlide((ti+1)%slides.length),4500);

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click',()=>{
    const opening=!item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight=null;
    });
    if(opening){
      item.classList.add('open');
      const a=item.querySelector('.faq-a');
      a.style.maxHeight=a.scrollHeight+'px';
    }
  });
});

/* ---------- Contact form validation + toast ---------- */
const form=document.getElementById('contactForm');
form.addEventListener('submit',e=>{
  e.preventDefault();
  const name=form.name.value.trim(), email=form.email.value.trim(), message=form.message.value.trim();
  let valid=true;
  const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  document.getElementById('row-name').classList.toggle('err', name.length<2); if(name.length<2)valid=false;
  document.getElementById('row-email').classList.toggle('err', !emailRe.test(email)); if(!emailRe.test(email))valid=false;
  document.getElementById('row-message').classList.toggle('err', message.length<5); if(message.length<5)valid=false;
  if(!valid)return;

  const toast=document.getElementById('toast');
  const toastMsg=document.getElementById('toastMsg');
  const submitBtn=form.querySelector('button[type="submit"]');
  const originalBtnText=submitBtn.innerHTML;
  submitBtn.disabled=true;
  submitBtn.innerHTML='Sending...';

  fetch(form.action,{
    method:'POST',
    body:new FormData(form),
    headers:{ 'Accept':'application/json' }
  })
  .then(response=>{
    if(response.ok){
      toastMsg.textContent="Message sent — I'll be in touch soon.";
      toast.classList.add('show');
      form.reset();
    } else {
      toastMsg.textContent="Something went wrong. Please try again.";
      toast.classList.add('show');
    }
  })
  .catch(()=>{
    toastMsg.textContent="Something went wrong. Please try again.";
    toast.classList.add('show');
  })
  .finally(()=>{
    submitBtn.disabled=false;
    submitBtn.innerHTML=originalBtnText;
    setTimeout(()=>toast.classList.remove('show'),3500);
  });
});

/* ---------- About carousel ---------- */
(function(){
  const slides = document.querySelectorAll('#aboutCarousel .about-slide');
  if(!slides.length) return;
  let current = 0;
  setInterval(function(){
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 2000);
})();

/* ---------- Project carousels (works for ANY box with class "proj-carousel") ---------- */
(function(){
  const CAROUSEL_SPEED_MS = 2000; // how long each image stays before switching

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