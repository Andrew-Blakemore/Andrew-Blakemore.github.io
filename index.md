---
title: "Andrew Blakemore – Biomedical Engineer"
layout: splash
---
<div class="home-hero">
  <div class="home-hero__overlay">

    <!-- Keegan -->
    <div class="home-slide active"
          style="background-image:url('/assets/img/heroes/travel.webp');">
          
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
          style="background-image:url('/assets/img/heroes/engineering.webp');">
      
      <div class="home-slide-content">
        <h1>From Concept to Prototype</h1>

        <p>
          Engineering projects spanning medical devices,
          additive manufacturing, embedded systems, and product
          development.
        </p>

        <a href="/engineering-portfolio/" class="btn btn--light-outline">
          View Engineering Projects
        </a>
        
      </div>
    </div>

    <!-- Photography -->
    <div class="home-slide"
     style="
       background-image:url('/assets/img/heroes/photo-feature.webp');">
          
      <div class="home-slide-content">
      
        <h1>Photography that Tells Stories</h1>

        <p>
          An assortment of photos capturing people and their stories through thoughtful composition.
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
      src="/assets/img/profile/homepage-portrait.webp"
      alt="Andrew Blakemore"
    >

  </div>

  <div class="home-about__content">

    <p class="home-about__eyebrow">A quick introduction</p>

    <h2>
      Curious by nature.
    </h2>

    <p>
      I’m Andrew, a biomedical engineer and photographer drawn to the
      intersection of technology and human experience.
    </p>

    <p>
      Whether I’m prototyping a new device, working behind a camera, or
      navigating an unfamiliar place, I love to ask questions and see
      where they lead.
    </p>

    <div class="home-about__actions">
      <a href="/about/" class="btn btn--primary">More About Me</a>
    </div>

  </div>

</div>

<div class="custom-divider"></div>

<section class="featured-pages">

    <h2>Featured Work</h2>

    <p class="featured-subtitle">
        A selection of some of my favorite engineering projects and travel stories.
    </p>

    <div class="featured-grid">

        <article class="featured-card">
        <a class="featured-card__link"
           href="/portfolio/MultiMaterialPliers/">

            <img src="/assets/img/projects/multi-material-pliers/multi-material-pliers-hero.webp">

            <div class="featured-card-content">

                <h3>Print-in-Place Pliers</h3>

                <p>
                    Multi-material pliers developed through
                    iterative CAD and additive manufacturing.
                </p>

                <span>Read More →</span>

            </div>

        </a>
        </article>

        <article class="featured-card">
        <a class="featured-card__link"
           href="/keegan-itinerary/iceland/">

            <img src="/assets/img/travel/iceland/reykjavik-hero.webp">

            <div class="featured-card-content">

                <h3>Reykjavík, Iceland</h3>

                <p>
                    The first destination of my Keegan Traveling Fellowship:
                    Exploring prosthetics in Iceland.
                </p>

                <span>Explore →</span>

            </div>

        </a>
        </article>

        <article class="featured-card">
        <a class="featured-card__link"
           href="/portfolio/TissuePressureMonitoringRetractor/">

            <img src="/assets/img/projects/tissue-pressure-retractor/retractor-deployment-thumbnail.webp">

            <div class="featured-card-content">

                <h3>Tissue Pressure Monitoring Retractor</h3>

                <p>
                    A pressure-sensing cervical retractor developed alongside
                    Medtronic Spine R&D.
                </p>

                <span>View Project →</span>

            </div>

        </a>
        </article>

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
