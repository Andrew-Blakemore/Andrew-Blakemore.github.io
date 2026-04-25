---
title: "Keegan Traveling Fellow"
excerpt: "An interactive map of places visited, with linked destination pages and a simple travel path."
permalink: /keegan-traveling-fellowship/
classes: wide custom-page
layout: single
author_profile: false
---

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<div class="custom-intro">
  <p>
    As a <a href="https://www.keegantravelingfellowship.org/andrew-blakemore">2026–27 Keegan Traveling Fellow</a>, I’ll spend the year exploring how prosthetics fit into everyday life across different parts of the world.
  </p>

  <p>
    Along the way, I’ll connect with engineers, clinicians, and researchers to understand how these technologies are designed; but more importantly, I’ll learn from prosthetic users about how they actually live with them. Through photography and storytelling, I’ll document moments of work, creativity, and daily life that often go unseen.
  </p>

  <p>
    This site is a place to follow each stop of that journey, as I explore how prosthetics shape independence, identity, and connection around the globe.
  </p>
</div>

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
  This map will expand as the journey begins.
</p>

<!-- Short stops along the route included: Brussels, Vienna, and Dubrovnik. -->

<div id="keegan-index" class="keegan-index"></div>

<script>
  window.keeganStops = [
    {
      name: "London",
      country: "gb",
      leg: "europe",
      lat: 51.5074,
      lon: -0.1278,
      url: "{{ '/keegan/london/' | relative_url }}",
      summary: "DD/MM/YYYY - DD/MM/YYYY"
    },
    {
      name: "Berlin",
      country: "de",
      leg: "europe",
      lat: 52.52,
      lon: 13.405,
      url: "{{ '/keegan/berlin/' | relative_url }}",
      summary: "DD/MM/YYYY - DD/MM/YYYY"
    },
    {
      name: "Athens",
      country: "gr",
      leg: "europe",
      lat: 37.9838,
      lon: 23.7275,
      url: "{{ '/keegan/athens/' | relative_url }}",
      summary: "DD/MM/YYYY - DD/MM/YYYY"
    }
  ];
</script>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="{{ '/assets/js/keegan-map.js' | relative_url }}"></script>
