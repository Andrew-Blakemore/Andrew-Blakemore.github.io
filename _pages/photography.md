---
layout: single
title: "Photography"
permalink: /photography/
classes: wide custom-page
author_profile: false
---

<div class="custom-intro">
  <p>
    I began pursuing photography in the summer of 2022, drawn to its ability to capture emotion and tell stories through a single image. After building a strong technical foundation through formal coursework at Brigham Young University, I developed a deeper interest in visual storytelling and creative expression.
  </p>
  <p>
    Following my transfer to Vanderbilt University in 2023, I joined the Vanderbilt Photo Society and served on its inaugural executive board. Since then, I have explored a diverse range of photographic styles, including portrait, studio, street, automotive, food, and abstract photography, while continuing to refine both my technical skills and artistic perspective.
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
