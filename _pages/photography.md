---
layout: single
title: "Photography"
permalink: /photography/
classes: wide custom-page
author_profile: false
---

<div class="custom-hero" style="background-image: url('/assets/img/heroes/photography.webp');">
  <div class="custom-hero__overlay">
    <div class="custom-hero__text">
      <p>
        I began practicing photography in the summer of 2022, drawn to its ability to capture emotion and tell stories through a single image. After building a technical foundation through an introductory photography class at BYU, I developed a deeper interest in visual storytelling and creative expression.
      </p>
      <p>
        Following my transfer to Vanderbilt in 2023, I joined the Vanderbilt Photo Society and served on its inaugural executive board. Since then, I've explored a diverse range of photographic styles, including portrait, studio, street, automotive, and abstract photography, while continuing to refine my technical skills and artistic perspective.
      </p>
    </div>
  </div>
</div>

<div class="custom-divider"></div>

<div class="custom-filters" id="custom-filters">
  <button type="button" class="filter-btn active" data-filter="featured" aria-pressed="true">Featured</button>
  <button type="button" class="filter-btn" data-filter="portraits" aria-pressed="false">Portraits</button>
  <button type="button" class="filter-btn" data-filter="abstract" aria-pressed="false">Abstracts</button>
  <button type="button" class="filter-btn" data-filter="cars" aria-pressed="false">Cars</button>
  <button type="button" class="filter-btn" data-filter="animals" aria-pressed="false">Animals</button>
  <button type="button" class="filter-btn" data-filter="food" aria-pressed="false">Food</button>
</div>

<div class="custom-divider"></div>

<div class="gallery">
  {% for photo in site.data.photography %}
    <a
      href="{{ photo.gallery | relative_url }}"
      class="reveal gallery-item"
      data-category="{{ photo.category | default: '' | strip | downcase }}"
      data-featured="{{ photo.featured }}"
      hidden
    >
      <img
        {% if photo.featured %}src="{{ photo.thumbnail | relative_url }}" srcset="{{ photo.thumbnail | relative_url }} 800w"{% endif %}
        data-src="{{ photo.thumbnail | relative_url }}"
        data-srcset="{{ photo.thumbnail | relative_url }} 800w"
        alt="{{ photo.title }}"
        width="{{ photo.width }}"
        height="{{ photo.height }}"
        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
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

  function loadThumbnail(item) {
    const image = item.querySelector('img');
    if (!image || image.hasAttribute('src')) return;

    image.src = image.dataset.src;
    image.srcset = image.dataset.srcset;
  }

  function applyFilter(filter) {
    buttons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    const activeButton = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
      activeButton.setAttribute('aria-pressed', 'true');
    }

    items.forEach(item => {
      const category = (item.dataset.category || '').trim().toLowerCase();
      const featured = item.dataset.featured === 'true';

      let show = false;

      if (filter === 'featured') {
        show = featured;
      } else {
        show = category === filter;
      }

      item.hidden = !show;
      if (show) {
        loadThumbnail(item);
        observer.observe(item);
      } else {
        item.classList.remove('is-visible');
        observer.unobserve(item);
      }
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter.trim().toLowerCase();
      applyFilter(filter);
      button.blur();
    });
  });

  applyFilter('featured');
</script>
