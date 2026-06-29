---
title: "Engineer. Photographer. World Traveler"
layout: splash
---
<div class="home-hero">
  <div class="home-hero__overlay">

    <!-- Keegan -->
    <div class="home-slide active"
          style="background-image:url('/assets/img/globe-header.jpg');">
          
      <div class="home-slide-content">

        <h1>Designed for Living</h1>

        <p>
          Follow a year-long journey exploring how prosthetics shape
          everyday life across four continents.
        </p>

        <a href="/keegan-traveling-fellowship/" class="btn btn--light-outline">
          Explore the Fellowship
        </a>

      </div>
    </div>
    
    <!-- Engineering -->
    <div class="home-slide"
          style="background-image:url('/assets/img/pliers_present1.jpg');">
      
      <div class="home-slide-content">
        <h1>Engineering Solutions from Concept to Prototype</h1>

        <p>
          Engineering projects spanning medical devices,
          additive manufacturing, embedded systems, and product
          development.
        </p>

        <a href="/portfolio/" class="btn btn--light-outline">
          View Engineering Projects
        </a>
        
      </div>
    </div>

    <!-- Photography -->
    <div class="home-slide"
     style="
       background-image:url('/assets/img/Veteran's_Bridge_Cover.jpg');">
          
      <div class="home-slide-content">
      
        <h1>Photography that Tells Stories</h1>

        <p>
          Portrait, graduation, automotive, and documentary photography
          focused on authentic moments and visual storytelling.
        </p>

        <a href="/photography/" class="btn btn--light-outline">
          View Photography
        </a>

      </div>
    </div>
    
    <div class="home-slide-indicators">
      <button class="active"></button>
      <button></button>
      <button></button>
    </div>
  </div>
</div>

<div class="home-about">

  <div class="home-about__image">

    <img
      src="/assets/img/Andrew_Blakemore_Headshot_1a.jpg"
      alt="Andrew Blakemore"
    >

  </div>

  <div class="home-about__content">

    <p>
      I'm a biomedical engineer with interests spanning medical device design,
      additive manufacturing, photography, and global health. My work combines
      engineering, design, and storytelling to explore how technology can
      improve people's lives.
    </p>

    <p>
      Whether designing medical devices, documenting communities through
      photography, or studying prosthetics around the world as a Keegan
      Traveling Fellow, I'm driven by curiosity and a desire to understand how
      thoughtful design shapes everyday experiences.
    </p>

    <a href="/about/" class="btn btn--primary">
      Learn More
    </a>

  </div>

</div>

<div class="custom-divider"></div>

<script>

document.addEventListener("DOMContentLoaded",()=>{
  const slides=document.querySelectorAll(".home-slide");
  const dots=document.querySelectorAll(".home-slide-indicators button");

  let current=0;

  function show(index){
    slides.forEach((slide,i)=>{
      slide.classList.toggle("active",i===index);
      dots[i].classList.toggle("active",i===index);
    });
    
    current=index;
  }
  
  function next(){
    show((current+1)%slides.length);
  }
  
  dots.forEach((dot,index)=>{
    dot.addEventListener("click",()=>{
      show(index);
      reset();
    });
  });
  
  let timer;
  
  function reset(){
    clearInterval(timer);
    timer=setInterval(next,9000);
  }
  
  reset();
});
</script>
