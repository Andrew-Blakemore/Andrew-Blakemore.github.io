---
layout: single
title: "Photography"
permalink: /photography/
classes: wide photography-page
author_profile: false
---

<div class="photography-intro">
  <p>
    I use photography to explore light, color, and expression. My work ranges from portraits to experimental studio scenes, with a focus on clean composition and mood.
  </p>
</div>

<div class="photography-divider"></div>

<div class="gallery">
  {% for file in site.static_files %}
    {% if file.path contains '/assets/images/photography' %}
      <a href="{{ file.path }}" class="glightbox reveal">
        <img src="{{ file.path }}" alt="">
      </a>
    {% endif %}
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
