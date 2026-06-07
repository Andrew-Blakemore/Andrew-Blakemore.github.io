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
  <button type="button" class="filter-btn" data-filter="cars">Cars</button>
  <button type="button" class="filter-btn" data-filter="graduation">Graduation</button>
</div>

<div class="custom-divider"></div>

<div class="gallery">
  {% for photo in site.data.photography %}
    <a
      href="{{ photo.src }}"
      class="reveal gallery-item"
      data-category="{{ photo.category | default: '' | strip | downcase }}"
      data-featured="{{ photo.featured }}"
    >
      <img
        src="{{ photo.src }}"
        alt="{{ photo.title }}"
        width="{{ photo.width }}"
        height="{{ photo.height }}"
        loading="lazy"
        decoding="async"
      >
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

  function applyFilter(filter) {
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeButton = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }

    items.forEach(item => {
      const category = (item.dataset.category || '').trim().toLowerCase();
      const featured = item.dataset.featured === 'true';

      let show = false;

      if (filter === 'all') {
        show = featured;
      } else {
        show = category === filter;
      }

      item.style.display = show ? 'inline-block' : 'none';
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter.trim().toLowerCase();
      applyFilter(filter);
      button.blur();
    });
  });

  applyFilter('all');
</script>
