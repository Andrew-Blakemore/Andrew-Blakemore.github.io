---
excerpt: "An interactive country-level map of the Keegan Traveling Fellowship itinerary."
permalink: /keegan-traveling-fellowship-test-page/
classes: wide custom-page keegan-motion-test-page
layout: single
author_profile: false
---

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<section class="prosthetic-story" id="prosthetic-story" aria-label="Designed for Living">
  <div class="prosthetic-story__sticky">
    <div class="prosthetic-story__content">
      <div class="prosthetic-motion" aria-hidden="true">
        <div class="prosthetic-leg">
          <div class="prosthetic-leg__socket">
            <i class="prosthetic-leg__socket-rim"></i>
            <i class="prosthetic-leg__socket-shell"></i>
            <i class="prosthetic-leg__upper-adapter"></i>
          </div>

          <div class="prosthetic-leg__knee">
            <i class="prosthetic-leg__knee-frame"></i>
            <i class="prosthetic-leg__knee-axis"></i>
          </div>

          <div class="prosthetic-leg__lower">
            <i class="prosthetic-leg__shin-adapter"></i>
            <i class="prosthetic-leg__pylon"></i>
            <i class="prosthetic-leg__ankle"></i>
            <i class="prosthetic-leg__foot"></i>
          </div>
        </div>

        <div class="prosthetic-motion__ground"></div>
      </div>
    </div>

    <div class="prosthetic-story__prompt" aria-hidden="true">
      <span>Scroll to move</span>
      <i></i>
    </div>
  </div>
</section>

<script src="{{ '/assets/js/keegan-prosthetic-assembly.js' | relative_url }}"></script>

<section class="keegan-editorial-intro" aria-labelledby="keegan-introduction-title">
  <p class="keegan-editorial-intro__eyebrow">2026-27 Keegan Traveling Fellow</p>
  <h2 id="keegan-introduction-title">
    One year exploring the boundaries of everyday life with prosthetics
  </h2>
  <div class="keegan-editorial-intro__divider" aria-hidden="true"></div>
  <p>
    Through conversations with prosthetic users, engineers, researchers, and
    clinicians,
    <a
      class="keegan-editorial-intro__project-link"
      href="https://www.keegantravelingfellowship.org/andrew-blakemore"
    ><em>Designed for Living</em></a>
    will document how these technologies are created and what they make possible
    in communities around the world.
  </p>
</section>

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

<div
  id="keegan-map"
  data-animate-routes
  data-route-duration="4200"
  aria-label="Interactive map of fellowship destinations"
></div>

<p class="keegan-note">
  Drag to explore • Double-click to zoom
</p>

<div id="keegan-index" class="keegan-index keegan-reveal"></div>

<script>
  window.keeganStops = [
    {
      name: "Kentucky, USA",
      country: "us",
      leg: "north-america",
      lat: 38.0406,
      lon: -84.5037,
      link_enabled: false,
      summary: "Starting Point",
      route: true,
      current: false
    },
    {
      name: "Tennessee, USA",
      country: "us",
      leg: "north-america",
      lat: 36.1627,
      lon: -86.7816,
      link_enabled: false,
      summary: "Starting Point",
      route: false,
      current: true
    },
    {
      name: "Iceland",
      country: "is",
      leg: "europe",
      lat: 64.1466,
      lon: -21.9426,
      url: "{{ '/keegan-itinerary/iceland/' | relative_url }}",
      link_enabled: true,
      summary: "August 25–27, 2026",
      route: true,
      current: false
    },
    {
      name: "United Kingdom",
      country: "gb",
      leg: "europe",
      lat: 51.5074,
      lon: -0.1278,
      url: "{{ '/keegan-itinerary/united-kingdom/' | relative_url }}",
      link_enabled: true,
      summary: "August 27 – September 8, 2026",
      route: true,
      current: false
    },
    {
      name: "Germany",
      country: "de",
      leg: "europe",
      lat: 52.52,
      lon: 13.405,
      url: "{{ '/keegan-itinerary/germany/' | relative_url }}",
      link_enabled: true,
      summary: "September 8 – TBD, 2026",
      route: true,
      current: false
    },
    {
      name: "Poland",
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
      name: "Turkey",
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
      name: "Greece",
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
      name: "Morocco",
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
      name: "Sierra Leone",
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
      name: "Ghana",
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
      name: "Rwanda",
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
      name: "Kenya",
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
