---
title: "Keegan Traveling Fellow"
excerpt: "Follow the Keegan Traveling Fellowship journey exploring how prosthetics shape everyday life."
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
      A year exploring how prosthetics
    </span>
    <span class="keegan-editorial-intro__title-line">
      shape everyday life
    </span>
  </h2>
  <p>
    Through conversations with prosthetic users, engineers, clinicians, and
    researchers,
    <a
      class="keegan-editorial-intro__project-link"
      href="https://www.keegantravelingfellowship.org/andrew-blakemore"
    ><em>Designed for Living</em></a>
    will document how these devices impact daily life
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
  </div>
</div>

<div class="custom-divider"></div>

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
      url: "{{ '/keegan-traveling-fellowship/poland/' | relative_url }}",
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
      summary: "TBD",
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
