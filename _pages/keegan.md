---
title: "Keegan"
excerpt: "An interactive map of places visited, with linked destination pages and a simple travel path."
permalink: /keegan/
layout: single
author_profile: false
---

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<style>
  .keegan-intro {
    max-width: 70ch;
    margin-bottom: 1rem;
  }

  .keegan-filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0 1rem 0;
  }

  .keegan-filter-bar button {
    appearance: none;
    border: 1px solid #d1d5db;
    background: #fff;
    color: #111827;
    border-radius: 999px;
    padding: 0.55rem 0.9rem;
    font-size: 0.95rem;
    line-height: 1;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .keegan-filter-bar button:hover {
    border-color: #111827;
    transform: translateY(-1px);
  }

  .keegan-filter-bar button.active {
    background: #111827;
    color: #fff;
    border-color: #111827;
  }

  #keegan-map {
    width: 100%;
    height: 620px;
    border-radius: 16px;
    overflow: hidden;
    margin: 1rem 0 1rem 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  .keegan-note {
    color: #6b7280;
    margin-top: 0.25rem;
    margin-bottom: 1.25rem;
  }

  .keegan-index {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    margin-top: 1.25rem;
  }

  .keegan-card {
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    padding: 1rem 1.1rem;
    background: #fff;
    text-decoration: none;
    color: inherit;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .keegan-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  }

  .keegan-card .order {
    display: inline-block;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  .keegan-card h3 {
    margin: 0 0 0.35rem 0;
    font-size: 1.05rem;
  }

  .keegan-card p {
    margin: 0;
    color: #6b7280;
    font-size: 0.95rem;
  }

  .keegan-empty {
    border: 1px dashed #d1d5db;
    border-radius: 14px;
    padding: 1rem 1.1rem;
    color: #6b7280;
    background: #fafafa;
  }
</style>

## Keegan

<div class="keegan-intro">
  A visual index of the places I have visited, organized by travel leg and linked to individual destination pages. The map below shows the route order within each leg, and the filter lets you switch between the full overview and each region.
</div>

<div class="keegan-filter-bar" aria-label="Travel leg filter">
  <button type="button" data-leg="overview" class="active">Overview</button>
  <button type="button" data-leg="europe">Europe</button>
  <button type="button" data-leg="africa">Africa</button>
  <button type="button" data-leg="south-america">South America</button>
</div>

<div id="keegan-map"></div>

<p class="keegan-note">
  Route order is shown with numbered markers and a connecting dotted line.
</p>

<div id="keegan-index" class="keegan-index"></div>

<script>
  window.keeganStops = [
    {
      name: "London",
      leg: "europe",
      lat: 51.5074,
      lon: -0.1278,
      url: "{{ '/keegan/london/' | relative_url }}",
      summary: "First stop on the map."
    },
    {
      name: "Berlin",
      leg: "europe",
      lat: 52.52,
      lon: 13.405,
      url: "{{ '/keegan/berlin/' | relative_url }}",
      summary: "Second stop on the map."
    },
    {
      name: "Athens",
      leg: "europe",
      lat: 37.9838,
      lon: 23.7275,
      url: "{{ '/keegan/athens/' | relative_url }}",
      summary: "Third stop on the map."
    }
  ];
</script>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="{{ '/assets/js/keegan-map.js' | relative_url }}"></script>
