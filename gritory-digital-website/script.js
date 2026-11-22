/* ---- Edit these two lines before going live ---- */
const CONTACT_EMAIL = "hello@example.com"; // replace with your real business email
const SITE = { reduce: matchMedia("(prefers-reduced-motion: reduce)").matches };

/* Pricing (from the client presentation rate card) */
const PLANS = [
 ["Landing Page","One focused page for a product, service or campaign.",4999,99,""],
 ["Portfolio Website","A polished way to present your work and experience.",6999,149,""],
 ["Starter Business","A simple website introducing your business.",8999,179,""],
 ["Professional","A more complete website for growing businesses.",14999,299,""],
 ["Advanced","More pages, more features and custom requirements.",24999,499,""],
 ["E-commerce","An online store with product and shopping functionality.",34999,699,"+"]];
const plansEl = document.getElementById("plans");
function renderPlans(r){
  plansEl.innerHTML = PLANS.map(p=>{
    const v = r==="in" ? "₹"+p[2].toLocaleString("en-IN") : "$"+p[3];
    return `<article class="card"><h3>${p[0]}</h3><p class="price">${v}${p[4]}<small> starting</small></p><p>${p[1]}</p></article>`;
  }).join("");
}
renderPlans("in");
document.querySelectorAll(".toggle button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".toggle button").forEach(x=>x.classList.toggle("on",x===b));
  renderPlans(b.dataset.r);
});

/* Nav, year, reveal */
const burger=document.querySelector(".burger"),menu=document.getElementById("menu");
burger.onclick=()=>burger.setAttribute("aria-expanded",menu.classList.toggle("open"));
menu.addEventListener("click",e=>{if(e.target.tagName==="A"){menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}});
document.getElementById("yr").textContent=new Date().getFullYear();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll("#services h2,#process li,#care .card,.contact>*").forEach(el=>{el.classList.add("rv");io.observe(el)});

/* 3D tilt on service cards (responds to the pointer) */
if(!SITE.reduce) document.querySelectorAll(".tilt").forEach(c=>{
  c.addEventListener("pointermove",e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;
    c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(6px)`});
  c.addEventListener("pointerleave",()=>c.style.transform="");
});

/* Enquiry form: opens the visitor's email app. Swap for Formspree/Netlify Forms later if preferred. */
document.getElementById("form").addEventListener("submit",e=>{
  e.preventDefault();const f=new FormData(e.target);
  const body=`Name: ${f.get("name")}\nEmail: ${f.get("email")}\nNeed: ${f.get("type")}\n\n${f.get("msg")}`;
  location.href=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website enquiry: "+f.get("type"))}&body=${encodeURIComponent(body)}`;
  document.getElementById("status").textContent="Your email app should open with the enquiry ready to send.";
});

/* ---- Hero 3D: a website built from layered wireframe panels ---- */
(function(){
  const cv=document.getElementById("scene");
  if(!window.THREE){return}
  let R;try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return}
  R.setPixelRatio(Math.min(devicePixelRatio,2));
  const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);C.position.z=9;
  const G=new THREE.Group();S.add(G);
  const mats={i:new THREE.LineBasicMaterial({color:0x7a5cff}),s:new THREE.LineBasicMaterial({color:0xb04dff}),c:new THREE.LineBasicMaterial({color:0xffbf01})};
  function panel(w,h,z,m,fill){
    const g=new THREE.BoxGeometry(w,h,.02),e=new THREE.LineSegments(new THREE.EdgesGeometry(g),m);e.position.z=z;
    if(fill){const f=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:fill,transparent:true,opacity:.1}));f.position.copy(e.position);G.add(f)}
    G.add(e);return e;
  }
  // page layers: frame, header, hero block, three cards, button
  panel(4.2,5.4,0,mats.i,0x7a5cff);
  panel(3.8,.4,.5,mats.s,0xb04dff);
  panel(3.8,1.6,1,mats.i,0x7a5cff);
  [-1.3,0,1.3].forEach((x,i)=>panel(1.1,1.2,1.5+i*.35,mats.s,0xb04dff).position.set(x,-1.4,1.5+i*.35));
  panel(1.1,.4,2.6,mats.c,0xffbf01).position.set(-1.2,-.1,2.6);
  const P=new THREE.BufferGeometry(),n=500,a=new Float32Array(n*3);
  for(let i=0;i<n*3;i++)a[i]=(Math.random()-.5)*16;
  P.setAttribute("position",new THREE.BufferAttribute(a,3));
  const pts=new THREE.Points(P,new THREE.PointsMaterial({color:0xd5c6ff,size:.04,transparent:true,opacity:.7}));S.add(pts);
  let mx=0,my=0,sy=0;
  addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
  addEventListener("scroll",()=>sy=scrollY/Math.max(1,document.body.scrollHeight-innerHeight),{passive:true});
  function size(){const w=innerWidth,h=innerHeight;R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();G.position.x=w>820?2.6:0;G.position.y=w>820?0:1.6;G.scale.setScalar(w>820?1:.7)}
  addEventListener("resize",size);size();
  let t=0;
  (function loop(){
    requestAnimationFrame(loop);if(!SITE.reduce)t+=.01;
    G.rotation.y+=((-.5+mx*.9+Math.sin(t)*.15+sy*Math.PI*2)-G.rotation.y)*.05;
    G.rotation.x+=((my*.5+.15)-G.rotation.x)*.05;
    G.position.z=-sy*3;pts.rotation.y=t*.15+sy;
    R.render(S,C);
  })();
})();
