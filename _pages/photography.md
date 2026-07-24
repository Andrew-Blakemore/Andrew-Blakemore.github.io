---
permalink: /photography/
classes: wide custom-page photography-camera-page
layout: single
author_profile: false
---

<section
  class="photo-camera-story"
  id="photo-camera-story"
  aria-label="Photography introduction"
>
  <div class="photo-camera-story__sticky">
    <div class="photo-camera-stage">
      <div class="photo-camera" aria-hidden="true">
        <div class="photo-camera__top"></div>
        <div class="photo-camera__viewfinder"></div>
        <div class="photo-camera__flash-window"></div>
        <div class="photo-camera__shutter"></div>
        <div class="photo-camera__grip"></div>

        <div class="photo-camera__lens">
          <div class="photo-camera__lens-ring">
            <div class="photo-camera__glass">
              <div class="photo-camera__aperture"></div>
              <div class="photo-camera__gleam"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="photo-camera-story__prompt" aria-hidden="true">
      <span>Scroll to view the collection</span>
      <i></i>
    </div>
  </div>
</section>

<section class="photography-gallery-shell" aria-label="Photography gallery">
  <div class="custom-filters" id="custom-filters" aria-label="Filter photographs">
    <button type="button" class="filter-btn active" data-filter="featured" aria-pressed="true">Featured</button>
    <button type="button" class="filter-btn" data-filter="portraits" aria-pressed="false">Portraits</button>
    <button type="button" class="filter-btn" data-filter="cars" aria-pressed="false">Cars</button>
    <button type="button" class="filter-btn" data-filter="graduation" aria-pressed="false">Graduation</button>
    <button type="button" class="filter-btn" data-filter="miscellaneous" aria-pressed="false">Miscellaneous</button>
  </div>

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
</section>

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

<script src="{{ '/assets/js/photography-camera-hero.js' | relative_url }}"></script>
