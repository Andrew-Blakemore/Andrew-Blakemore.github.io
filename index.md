---
title: "Andrew Blakemore | Biomedical Engineer"
layout: splash
---
<div class="home-hero">
  <div class="home-hero__overlay">

    <!-- Keegan -->
    <div class="home-slide active"
          style="background-image:url('/assets/img/globe-hero.jpg');">
          
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
          style="background-image:url('/assets/img/print-bed.jpg');">
      
      <div class="home-slide-content">
        <h1>From Concept to Prototype</h1>

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
       background-image:url('/assets/img/car-hero.jpg');">
          
      <div class="home-slide-content">
      
        <h1>Photography that Tells Stories</h1>

        <p>
          An assortment of photos capturing people and their stories through thoughtful composition and visual storytelling.
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

<div class="custom-divider"></div>

<div class="home-about">

  <div class="home-about__image">

    <img
      src="/assets/img/Andrew_Blakemore_Headshot_1a.jpg"
      alt="Andrew Blakemore"
    >

  </div>

  <div class="home-about__content">

      <p>
      Hi, my name is Andrew.
    </p>

    <p>
      I'm a biomedical engineer from Lexington, Kentucky, with experience in clinical technology and additive manufacturing. Beyond engineering, I'm also a photographer and a 2026–27 Keegan Traveling Fellow. Across these disciplines, I'm driven by an interest in thoughtful design, innovation, and the stories behind the people and technologies that shape everyday life.
    </p>

    <a href="/_pages/about/" class="btn btn--primary">
      About Me
    </a>

  </div>

</div>

<div class="custom-divider"></div>

<section class="featured-pages">

    <h2>Featured Work</h2>

    <p class="featured-subtitle">
        A selection of engineering projects, photography, and travel stories.
    </p>

    <div class="featured-grid">

        <a class="featured-card"
           href="/portfolio/Pliers/">

            <img src="/assets/img/pliers-cover.jpg">

            <div class="featured-card-content">

                <h3>Parallel Action Pliers</h3>

                <p>
                    A custom-designed surgical instrument developed through
                    iterative CAD and additive manufacturing.
                </p>

                <span>Read More →</span>

            </div>

        </a>

        <a class="featured-card"
           href="/keegan-itinerary/reykjavik/">

            <img src="/assets/img/keegan/reykjavik-cover.jpg">

            <div class="featured-card-content">

                <h3>Reykjavík</h3>

                <p>
                    The first destination of my Keegan Traveling Fellowship
                    exploring prosthetics in Iceland.
                </p>

                <span>Explore →</span>

            </div>

        </a>

        <a class="featured-card"
           href="/portfolio/TissuePressureMonitoringRetractor/">

            <img src="/assets/img/retractor_header.jpg">

            <div class="featured-card-content">

                <h3>Tissue Pressure Monitoring Retractor</h3>

                <p>
                    A pressure-sensing cervical retractor developed alongside
                    Medtronic Spine R&D.
                </p>

                <span>View Project →</span>

            </div>

        </a>

    </div>

</section>

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
