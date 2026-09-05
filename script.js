(function(){
  // Manila live clock
  const clocks=document.querySelectorAll('.local-time');
  function tick(){
    const t=new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Manila',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
    clocks.forEach(el=>el.textContent=t+' GMT+8');
  } tick(); setInterval(tick,1000);

  // Home intro curtain
  const curtain=document.querySelector('.intro-curtain');
  if(curtain){
    document.body.style.overflow='hidden';
    const video=curtain.querySelector('video');
    if(video){video.play().catch(()=>{});}
    setTimeout(()=>{curtain.classList.add('exit');document.body.style.overflow='';},3000);
    setTimeout(()=>curtain.remove(),4200);
  }

  // Service carousel — keeps three main cards visible at all times on desktop
  const track=document.querySelector('.carousel-track');
  if(track){
    const cards=[...track.querySelectorAll('.service-card')];
    const dots=[...document.querySelectorAll('.dot')];
    let active=0;
    const prev=document.querySelector('[data-prev]');
    const next=document.querySelector('[data-next]');
    const classes=['pos-center','pos-left','pos-right','pos-outer-left','pos-outer-right'];

    function circularDelta(i,a,n){
      let d=(i-a+n)%n;
      if(d>n/2)d-=n;
      return d;
    }

    function render(){
      const n=cards.length;
      cards.forEach((card,i)=>{
        classes.forEach(c=>card.classList.remove(c));
        const d=circularDelta(i,active,n);
        if(d===0) card.classList.add('pos-center');
        else if(d===-1) card.classList.add('pos-left');
        else if(d===1) card.classList.add('pos-right');
        else if(d===-2) card.classList.add('pos-outer-left');
        else if(d===2) card.classList.add('pos-outer-right');
      });
      dots.forEach((d,i)=>d.classList.toggle('active',i===active));
    }

    prev?.addEventListener('click',()=>{active=(active-1+cards.length)%cards.length;render()});
    next?.addEventListener('click',()=>{active=(active+1)%cards.length;render()});
    cards.forEach((card,i)=>card.addEventListener('click',()=>{active=i;render()}));
    render();
  }
})();
