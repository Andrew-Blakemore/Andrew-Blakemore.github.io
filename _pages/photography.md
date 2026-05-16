---
layout: single
title: "Photography"
permalink: /photography/
classes: wide custom-page
author_profile: false
---

<div class="custom-intro">
  <p>
    I began practicing photography in the Summer of 2022, initially drawn to the way pictures can capture people's emotions. That interest quickly became more defined through a structured photography course at BYU, where I developed a technical foundation and shifted toward visual storytelling.
  </p>
  <p>
    After transferring to Vanderbilt University in 2023, I joined the Vanderbilt Photo Society as one of its original members and served on the organization’s inaugural board. Since then, my work has expanded across a wide range of genres, including portrait, studio, abstract, street, fashion, automative, animal, and food photography.
  </p>
</div>

<div class="custom-divider"></div>

<div class="custom-filters" id="custom-filters">
  <button type="button" class="filter-btn active" data-filter="all">All</button>
  <button type="button" class="filter-btn" data-filter="portraits">Portraits</button>
  <button type="button" class="filter-btn" data-filter="abstract">Abstracts</button>
  <button type="button" class="filter-btn" data-filter="animals">Animals</button>
  <button type="button" class="filter-btn" data-filter="cars">Cars</button>
</div>

<div class="custom-divider"></div>

<div class="gallery">
  {% for photo in site.data.photography %}
    <a href="{{ photo.src }}" class="reveal gallery-item" data-category="{{ photo.category | default: '' | strip | downcase }}">
      <img src="{{ photo.src }}" alt="{{ photo.title }}">
    </a>
  {% endfor %}
</div>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter.trim().toLowerCase();

      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      items.forEach(item => {
        const category = (item.dataset.category || '').trim().toLowerCase();
        const show = filter === 'all' || category === filter;
        item.style.display = show ? 'inline-block' : 'none';
      });
    });
  });
</script>
