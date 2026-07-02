---
excerpt: "An interactive map of cities visited, with linked destination pages and a basic travel path."
permalink: /keegan-traveling-fellowship/
classes: wide custom-page
layout: single
author_profile: false
---

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<div class="custom-hero">
  <div class="custom-hero__overlay">
    <div class="keegan-title-slide active">
      <div class="keegan-slide-title">
        <h1>Designed for Living</h1>
        <p>
          Exploring the Boundaries of Everyday Life with Modern Prosthetics
        </p>
      </div>
    </div>
    
    <div class="keegan-description-slide">
      <div class="custom-hero__text">
          <p>
            As a
            <a href="https://www.keegantravelingfellowship.org/andrew-blakemore">
              2026–27 Keegan Traveling Fellow
            </a>,
            I'll spend a year abroad exploring how prosthetics impact everyday
            life in communities throughout the world.
          </p>

          <p>
            Along the way, I'll connect with engineers, researchers, and
            clinicians to understand how these technologies are designed, as
            well as prosthetic users to learn how prostheses affect their way
            of life. Through photography and storytelling, I'll document
            moments of daily life that often go unseen.
          </p>

          <p>
            As part of my project, I am compiling an open-access Global
            Prosthetics Atlas that contains data from dozens of countries and
            interviews with prosthetic users, clinicians, engineers, and
            researchers across four continents.
          </p>

          <p>
              Follow along as I explore how prosthetics shape independence, identity, and connection around the globe.
          </p>
        </div>
      </div>
      
    <div class="keegan-slide-indicators">

      <button class="active"></button>
      <button></button>

    </div>

  </div>
</div>

<script>

document.addEventListener("DOMContentLoaded", () => {
  const slides = [document.querySelector(".keegan-title-slide"),document.querySelector(".keegan-description-slide")];
  const dots = document.querySelectorAll(".keegan-slide-indicators button");
  let current = 0;
  function showSlide(index){
    slides.forEach((slide,i)=>{
      slide.classList.toggle("active",i===index);
      dots[i].classList.toggle("active",i===index);
    });
    current=index;
  }
  
  dots.forEach((dot,index)=>{
    dot.addEventListener("click",()=>{
      showSlide(index);
      resetTimer();
    });
  });
  function next(){
    showSlide((current+1)%slides.length);
  }
  
  let timer;
  function resetTimer(){
    clearInterval(timer);
    timer=setInterval(next,10000);
    }
  
  resetTimer();
});

</script>

<div class="custom-divider"></div>

<div class="keegan-filter-wrap">
  <div class="keegan-filter-bar" aria-label="Travel leg filter">
    <button type="button" data-leg="overview" class="active">Overview</button>
    <button type="button" data-leg="europe">Europe</button>
    <button type="button" data-leg="africa">Africa</button>
    <button type="button" data-leg="asia">Asia</button>
    <button type="button" data-leg="south-america">South America</button>
    <button type="button" data-leg="oceania">Oceania</button>
  </div>
</div>

<div class="custom-divider"></div>

<div id="keegan-map"></div>

<p class="keegan-note">
  Drag to explore • Double-click to zoom
</p>

<!-- Short stops along the route included: Brussels, Vienna, and Dubrovnik. -->

<div id="keegan-index" class="keegan-index keegan-reveal"></div>

<script>
  window.keeganStops = [
    {
      name: "Lexington",
      country: "us",
      leg: "north-america",
      lat: 38.0406,
      lon: -84.5037,
      summary: "Resting between travel legs.",
      route: false,
      current: false
    },
    {
      name: "Nashville",
      country: "us",
      leg: "north-america",
      lat: 36.1627,
      lon: -86.7816,
      link_enabled: false,
      summary: "Starting Point",
      route: true,
      current: true
    },
    {
      name: "Reykjavík",
      country: "is",
      leg: "europe",
      lat: 64.1466,
      lon: -21.9426,
      url: "{{ '/keegan-itinerary/reykjavik/' | relative_url }}",
      link_enabled: true,
      summary: "August 25–27, 2026",
      route: true,
      current: false
    },
    {
      name: "London",
      country: "gb",
      leg: "europe",
      lat: 51.5074,
      lon: -0.1278,
      url: "{{ '/keegan-itinerary/london/' | relative_url }}",
      link_enabled: false,
      summary: "August 27 – September 8, 2026",
      route: true,
      current: false
    },
    {
      name: "Berlin",
      country: "de",
      leg: "europe",
      lat: 52.52,
      lon: 13.405,
      url: "{{ '/keegan-itinerary/berlin/' | relative_url }}",
      link_enabled: false,
      summary: "September 8 – TBD, 2026",
      route: true,
      current: false
    },
    {
      name: "Rzeszów",
      country: "pl",
      leg: "europe",
      lat: 50.0413,
      lon: 21.9990,
      url: "{{ '/keegan-itinerary/rzeszow/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    },
    {
      name: "Istanbul",
      country: "tr",
      leg: "europe",
      lat: 41.0082,
      lon: 28.9784,
      url: "{{ '/keegan-itinerary/istanbul/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    },
    {
      name: "Athens",
      country: "gr",
      leg: "europe",
      lat: 37.9838,
      lon: 23.7275,
      url: "{{ '/keegan-itinerary/athens/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    },
    {
      name: "Casablanca",
      country: "ma",
      leg: "africa",
      lat: 33.5731,
      lon: -7.5898,
      url: "{{ '/keegan-itinerary/casablanca/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    },
    {
      name: "Freetown",
      country: "sl",
      leg: "africa",
      lat: 8.4657,
      lon: -13.2317,
      url: "{{ '/keegan-itinerary/freetown/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    },
    {
      name: "Accra",
      country: "gh",
      leg: "africa",
      lat: 5.6037,
      lon: -0.1870,
      url: "{{ '/keegan-itinerary/accra/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    },
    {
      name: "Kigali",
      country: "rw",
      leg: "africa",
      lat: -1.9441,
      lon: 30.0619,
      url: "{{ '/keegan-itinerary/kigali/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    },
    {
      name: "Nairobi",
      country: "ke",
      leg: "africa",
      lat: -1.2921,
      lon: 36.8219,
      url: "{{ '/keegan-itinerary/nairobi/' | relative_url }}",
      link_enabled: false,
      summary: "TBD",
      route: true,
      current: false
    }
  ];
</script>

<div class="custom-divider"></div>

<div class="keegan-blog-cta keegan-reveal">
  <a href="https://theworldofprosthetics.substack.com/" class="keegan-blog-button">
    Read the Stories →
  </a>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="{{ '/assets/js/keegan-map.js' | relative_url }}"></script>

<script>
  const keeganObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        keeganObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.keegan-reveal').forEach(el => keeganObserver.observe(el));
</script>
