---
title: "Keegan"
excerpt: "An interactive map of places visited, with linked destination pages and a simple travel path."
permalink: /keegan/
layout: page
---

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<style>
  #keegan-map {
    width: 100%;
    height: 620px;
    border-radius: 16px;
    overflow: hidden;
    margin: 1rem 0 2rem 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }

  .keegan-index {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    margin-top: 1.5rem;
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

  .keegan-card h3 {
    margin: 0 0 0.35rem 0;
    font-size: 1.05rem;
  }

  .keegan-card p {
    margin: 0;
    color: #6b7280;
    font-size: 0.95rem;
  }

  .keegan-card .order {
    display: inline-block;
    font-weight: 700;
    margin-bottom: 0.35rem;
  }

  .keegan-note {
    color: #6b7280;
    margin-top: -0.25rem;
  }
</style>

## Map

This map is a visual index of places visited. Click a pin to open a destination page.

<div id="keegan-map"></div>

<p class="keegan-note">
  Route order is shown with numbered markers and a connecting line.
</p>

<div class="keegan-index">
  <a class="keegan-card" href="{{ '/keegan/london/' | relative_url }}">
    <span class="order">1</span>
    <h3>London</h3>
    <p>First stop on the map.</p>
  </a>

  <a class="keegan-card" href="{{ '/keegan/berlin/' | relative_url }}">
    <span class="order">2</span>
    <h3>Berlin</h3>
    <p>Second stop on the map.</p>
  </a>

  <a class="keegan-card" href="{{ '/keegan/athens/' | relative_url }}">
    <span class="order">3</span>
    <h3>Athens</h3>
    <p>Third stop on the map.</p>
  </a>
</div>

<script>
  window.keeganStops = [
    {
      order: 1,
      name: "London",
      lat: 51.5074,
      lon: -0.1278,
      url: "{{ '/keegan/london/' | relative_url }}"
    },
    {
      order: 2,
      name: "Berlin",
      lat: 52.52,
      lon: 13.405,
      url: "{{ '/keegan/berlin/' | relative_url }}"
    },
    {
      order: 3,
      name: "Athens",
      lat: 37.9838,
      lon: 23.7275,
      url: "{{ '/keegan/athens/' | relative_url }}"
    }
  ];
</script>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="{{ '/assets/js/keegan-map.js' | relative_url }}"></script>
