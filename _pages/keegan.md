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
  .keegan-wide {
    max-width: 1500px;
    margin: 0 auto;
  }

  /* Keep intro readable while map is wide */
  .keegan-intro {
    max-width: 75ch;
    margin-bottom: 1rem;
  }

  /* Chevron filter bar */
  .keegan-filter-bar {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0;
    margin: 1rem 0 1rem 0;
    overflow-x: auto;
    white-space: nowrap;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .keegan-filter-bar::-webkit-scrollbar {
    display: none;
  }

  .keegan-filter-bar button {
    position: relative;
    appearance: none;
    border: 0;
    background: #f8fafc;
    color: #111827;
    padding: 0.65rem 0.95rem;
    padding-right: 1.8rem;
    margin-right: 14px;
    font-size: 0.88rem;
    line-height: 1;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .keegan-filter-bar button::after {
    content: "";
    position: absolute;
    top: 0;
    right: -14px;
    width: 0;
    height: 0;
    border-top: 19px solid transparent;
    border-bottom: 19px solid transparent;
    border-left: 14px solid #f8fafc;
    transition: border-left-color 0.15s ease;
    z-index: 1;
  }

  .keegan-filter-bar button:hover:not(.active) {
    background: #eef2f7;
  }

  .keegan-filter-bar button:hover:not(.active)::after {
    border-left-color: #eef2f7;
  }

  .keegan-filter-bar button.active {
    background: #111827;
    color: #fff;
  }

  .keegan-filter-bar button.active::after {
    border-left-color: #111827;
  }

  .keegan-filter-bar button:first-child {
    border-top-left-radius: 999px;
    border-bottom-left-radius: 999px;
    padding-left: 1.2rem;
  }

  .keegan-filter-bar button:last-child {
    border-top-right-radius: 999px;
    border-bottom-right-radius: 999px;
    margin-right: 0;
  }

  .keegan-filter-bar button:last-child::after {
    display: none;
  }

  /* Bigger, more dominant map */
  #keegan-map {
    width: 100%;
    height: 820px;
    border-radius: 20px;
    overflow: hidden;
    margin: 1rem 0 1rem 0;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.1);
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

<div class="keegan-wide">

## Keegan

<div class="keegan-intro">
  A visual index of the places I have visited, organized by travel leg and linked to individual destination pages. The map below shows the route order within each leg, and the filter lets you switch between the full overview and each region.
</div>

<div class="keegan-filter-bar" aria-label="Travel leg filter">
  <button type="button" data-leg="overview" class="active">Overview</button>
  <button type="button" data-leg="europe">Europe</button>
  <button type="button" data-leg="africa">Africa</button>
  <button type="button" data-leg="asia">Asia</button>
  <button type="button" data-leg="south-america">South America</button>
  <button type="button" data-leg="oceania">Oceania</button>
</div>

<div id="keegan-map"></div>

<p class="keegan-note">
  Route order is shown with numbered markers and a connecting dotted line.
</p>

<div id="keegan-index" class="keegan-index"></div>

</div>

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
