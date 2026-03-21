---
layout: single
title: "Photography"
permalink: /photography/
classes: wide
author_profile: false
---

<div class="gallery">
  {% for file in site.static_files %}
    {% if file.path contains '/assets/img/photography' %}
      <a href="{{ file.path }}" class="glightbox">
        <img src="{{ file.path }}" alt="">
      </a>
    {% endif %}
  {% endfor %}
</div>

<link href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>

<script>
  const lightbox = GLightbox();
</script>
