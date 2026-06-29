---
title: "At the Intersection of Design and Discovery"
layout: splash
---
<div class="home-hero">
  <div class="home-hero__overlay">

    <!-- Keegan -->
    <div class="home-slide"
          style="background-image:url('/assets/img/print-bed.jpg');">
          
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
    <div class="home-slide active"
          style="background-image:url('/assets/img/print-bed.jpg');">
      
      <div class="home-slide-content">
        <h1>Engineering Solutions from Concept to Prototype</h1>

        <p>
          Biomedical engineering projects spanning medical devices,
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
          style="background-image:url('/assets/img/photography/Mustang_at_night.jpg');">
          
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

feature_row:
  - image_path: assets/img/lamp.jpg
    alt: "Rewiring Exam Lights in Guatemala"
    title: "Repairing Clinical Equipment in the Field"
    excerpt: "Rewiring exam lights to restore patient care in Guatemala."
  - image_path: assets/img/endo.jpg
    alt: "Stryker 1288 HD Endoscopy Camera System"
    title: "Diagnosing an Endoscopy Camera System"
    excerpt: "Isolating failures in critical imaging hardware."
  - image_path: assets/img/OR.jpg
    alt: "Steris 4085 OR Table"
    title: "Maintaining a Surgical OR Table"
    excerpt: "Preventive maintenance to ensure safe operation. "
  - image_path: assets/img/xray.jpg
    alt: "Source-Ray PowerMax 1260 Portable X-ray System"
    title: "Troubleshooting a Portable X-ray System"
    excerpt: "Tracing faults to restore reliable imaging."
---

{% include feature_row %}
