---
layout: single
title: "Photography"
permalink: /photography/
classes: wide photography-page
author_profile: false
---

<div class="photography-intro">
  <p>I began practicing photography in the Summer of 2022, initially drawn to the way pictures can capture people's emotions. That interest quickly became more defined through a photography course at BYU, where I developed a technical foundation and shifted toward visual storytelling.</p>
  <p>After transferring to Vanderbilt University in 2023, I joined the Vanderbilt Photo Society as one of its original members and served on the organization’s inaugural board. Since then, my work has expanded across a wide range of genres, including portrait, studio, abstract, street, fashion, automative, animal, and food photography.</p>
</div>

<div class="photography-divider"></div>

<div class="gallery">
  {% for photo in site.data.photography %}
    <a href="{{ photo.src }}" class="glightbox no-popup">
    <img src="{{ photo.src }}" alt="{{ photo.title }}">
    </a>
  {% endfor %}
</div>

<link href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>

<script>
  const lightbox = GLightbox();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
