---
title: "Keegan Traveling Fellow"
excerpt: "Follow the Keegan Traveling Fellowship, from the Designed for Living project to experiences beyond the research."
permalink: /keegan-traveling-fellowship/
classes: wide custom-page keegan-page
layout: single
author_profile: false
---

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<section class="keegan-editorial-intro" aria-labelledby="keegan-introduction-title">
  <p class="keegan-editorial-intro__eyebrow">2026-27 Keegan Traveling Fellow</p>
  <h2 id="keegan-introduction-title">
    <span class="keegan-editorial-intro__title-line">
      A year exploring how
    </span>
    <span class="keegan-editorial-intro__title-line">
      prosthetics shape daily life
    </span>
  </h2>
  <p>
    Through conversations with prosthetic users, engineers, clinicians, and
    advocates,
    <a
      class="keegan-editorial-intro__project-link"
      href="https://www.keegantravelingfellowship.org/andrew-blakemore"
    ><em>Designed for Living</em></a>
    documents how these devices impact everyday life
    in diverse communities around the world.
  </p>
  <p class="keegan-editorial-intro__beyond">
    But this year is about more than a single project. Alongside my research,
    I am documenting experiences that take me beyond the world of prosthetics—from
    teaching and volunteering to working alongside people in entirely different
    settings. These experiences offer another way to understand the places I
    visit and the people who call them home.
  </p>
</section>

<div class="keegan-filter-wrap">
  <div class="keegan-filter-bar" aria-label="Travel leg filter">
    <button type="button" data-leg="overview" class="active">Overview</button>
    <button type="button" data-leg="europe">Europe</button>
    <button type="button" data-leg="africa">Africa</button>
    <button type="button" data-leg="asia">Asia</button>
    <button type="button" data-leg="south-america">South America</button>
  </div>
</div>

<div class="custom-divider"></div>

<div class="keegan-experience-legend" aria-label="Experience types shown on the map and story cards">
  <span class="keegan-type keegan-type--project">Designed for Living</span>
  <span class="keegan-type keegan-type--beyond">Beyond the Project</span>
  <span class="keegan-experience-legend__hint">Split-color pins indicate both types of stories at one stop.</span>
</div>

<div
  id="keegan-map"
  data-route-duration="4800"
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
      route: false,
      current: false
    },
    {
      name: "Tennessee, USA",
      country: "us",
      leg: "north-america",
      lat: 36.1627,
      lon: -86.7816,
      url: "{{ '/keegan-traveling-fellowship/tennessee/' | relative_url }}",
      link_enabled: true,
      summary: "Starting Point",
      route: true,
      current: false
    },
    {
      name: "Iceland",
      country: "is",
      leg: "europe",
      lat: 64.1466,
      lon: -21.9426,
      url: "{{ '/keegan-traveling-fellowship/iceland/' | relative_url }}",
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
      url: "{{ '/keegan-traveling-fellowship/united-kingdom/' | relative_url }}",
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
      url: "{{ '/keegan-traveling-fellowship/germany/' | relative_url }}",
      link_enabled: false,
      summary: "September 8 – September 26, 2026",
      route: true,
      current: false
    },
    {
      name: "Poland",
      country: "pl",
      leg: "europe",
      lat: 52.283,
      lon: 16.767,
      url: "{{ '/keegan-traveling-fellowship/poland/' | relative_url }}",
      link_enabled: false,
      summary: "September 26 - October 3, 2026",
      experiences: [
        {
          title: "Tutoring at an English immersion program",
          type: "beyond",
          url: "{{ '/keegan-traveling-fellowship/poland/' | relative_url }}",
          published: true
        }
      ],
      route: true,
      current: false
    },
    {
      name: "Turkey",
      country: "tr",
      leg: "europe",
      lat: 36.7118,
      lon: 27.3912,
      url: "{{ '/keegan-traveling-fellowship/turkey/' | relative_url }}",
      link_enabled: false,
      summary: "October 3 – October 25, 2026",
      experiences: [
        {
          title: "Working on an olive farm",
          type: "beyond",
          url: "{{ '/keegan-traveling-fellowship/turkey/' | relative_url }}",
          published: true
        }
      ],
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
      summary: "October 25 – TBD, 2026",
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
      name: "Liberia",
      country: "lr",
      leg: "africa",
      lat: 6.3008,
      lon: -10.7972,
      url: "{{ '/keegan-itinerary/liberia/' | relative_url }}",
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
      url: "{{ '/keegan-itinerary/rwanda/' | relative_url }}",
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
      url: "{{ '/keegan-itinerary/kenya/' | relative_url }}",
      link_enabled: false,
      summary: "TBD – February 16, 2027",
      route: true,
      current: false
    }
  ];
</script>

<div class="keegan-blog-cta keegan-reveal">
  <a href="https://theworldofprosthetics.substack.com/" class="keegan-blog-button">
    Follow the Journey on Substack &rarr;
  </a>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="{{ '/assets/js/keegan-map.js' | relative_url }}"></script>
