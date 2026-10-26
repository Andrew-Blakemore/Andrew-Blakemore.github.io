document.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.getElementById("keegan-map");
  const indexEl = document.getElementById("keegan-index");
  const filterBar = document.querySelector(".keegan-filter-bar");
  const stops = Array.isArray(window.keeganStops) ? window.keeganStops : [];
  const routeAnimationDuration = Number(mapEl?.dataset.routeDuration) || 4800;

  if (!mapEl || !indexEl || stops.length === 0 || typeof L === "undefined") {
    return;
  }

  const map = L.map("keegan-map", {
    worldCopyJump: true,
    scrollWheelZoom: false,
  });

  map.attributionControl.setPrefix(false);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 6,
    minZoom: 2,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const routeLayer = L.layerGroup().addTo(map);
  let routeAnimationFrame = null;

  const routeStops = stops.filter((s) => s.route !== false);
  // Both experience types use explicit entries in keegan.md.
  function experiencesFor(stop) {
    return Array.isArray(stop.experiences)
      ? stop.experiences.filter(
          (story) =>
            story &&
            story.published === true &&
            (story.type === "project" || story.type === "beyond") &&
            typeof story.title === "string" &&
            typeof story.url === "string" &&
            story.url.length > 0
        )
      : [];
  }

  const STORY_TYPES = {
    project: { label: "Designed for Living", color: "#356d8a" },
    beyond: { label: "Beyond My Project", color: "#995238" },
  };

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);
  }

  // Each published story gets one clickable, color-coded category badge.
  function storyBadge(story) {
    const info = STORY_TYPES[story.type];
    if (!info) return "";
    const accessibleLabel = `${info.label}: ${story.title}`;
    return `<a class="keegan-type keegan-type--${story.type} keegan-type--link" href="${escapeHtml(story.url)}" aria-label="${escapeHtml(accessibleLabel)}">${escapeHtml(info.label)}</a>`;
  }

  function markerBackground(stop) {
    const kinds = new Set(experiencesFor(stop).map((story) => story.type));
    if (kinds.has("project") && kinds.has("beyond")) {
      return "linear-gradient(90deg, #356d8a 50%, #995238 50%)";
    }
    if (kinds.has("project")) return STORY_TYPES.project.color;
    if (kinds.has("beyond")) return STORY_TYPES.beyond.color;
    return "#111827"; // No published stories yet.
  }

  function makeMarkerIcon(order, stop) {
    return L.divIcon({
      className: "keegan-pin",
      html: `
        <div style="
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: ${markerBackground(stop)};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          border: 2px solid white;
        ">${order}</div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
  }

  function setActiveButton(activeLeg) {
    if (!filterBar) return;
    filterBar.querySelectorAll("button[data-leg]").forEach((button) => {
      button.classList.toggle("active", button.dataset.leg === activeLeg);
    });
  }

  function getFilteredStops(activeLeg) {
    if (activeLeg === "overview") {
      return routeStops;
    }
    return routeStops.filter((stop) => stop.leg === activeLeg);
  }

  function pulseContainers() {
    mapEl.classList.add("is-updating");
    indexEl.classList.add("is-updating");

    setTimeout(() => {
      mapEl.classList.remove("is-updating");
      indexEl.classList.remove("is-updating");
    }, 180);
  }

  function flagImage(code, name) {
    if (!code) return "";
    return `<img src="https://flagcdn.com/w40/${escapeHtml(code)}.png" alt="${escapeHtml(name)} flag">`;
  }

  function renderIndex(filteredStops) {
    indexEl.innerHTML = "";

    if (filteredStops.length === 0) {
      indexEl.innerHTML = `
        <div class="keegan-empty">
          No stops have been added for this travel leg yet.
        </div>
      `;
      return;
    }

    filteredStops.forEach((stop, idx) => {
      const stories = experiencesFor(stop);
      // An article (not a wrapping anchor) allows multiple independent story links.
      const card = document.createElement("article");
      card.className = "keegan-card";
      const storyItems = stories.map((story) => `
        <li class="keegan-card__story">
          ${storyBadge(story)}
          ${story.place ? `<span class="keegan-card__place">${escapeHtml(story.place)}</span>` : ""}
        </li>
      `).join("");

      card.innerHTML = `
        <div class="keegan-card__meta">
          <span class="flag">${flagImage(stop.country, stop.name)}</span>
          <span class="order">${idx + 1}</span>
        </div>
        <h3>${escapeHtml(stop.name)}</h3>
        <p>${escapeHtml(stop.summary || "")}</p>
        ${stories.length
          ? `<ul class="keegan-card__stories">${storyItems}</ul>`
          : `<p class="keegan-card__upcoming">Stories coming soon</p>`}
      `;

      indexEl.appendChild(card);
    });
  }

  function routeStyle() {
    return {
      color: "#111827",
      weight: 3,
      opacity: 0.65,
      dashArray: "6,8",
      lineCap: "round",
    };
  }

  function drawRoute(latlngs) {
    if (routeAnimationFrame) {
      window.cancelAnimationFrame(routeAnimationFrame);
      routeAnimationFrame = null;
    }

    routeLayer.clearLayers();
    if (latlngs.length < 2) return;

    const points = latlngs.map((latlng) => map.latLngToLayerPoint(latlng));
    const segments = points.slice(1).map((point, index) => {
      const start = points[index];
      return {
        start,
        end: point,
        length: start.distanceTo(point),
      };
    });
    const pathLength = segments.reduce(
      (total, segment) => total + segment.length,
      0
    );
    const line = L.polyline([latlngs[0]], routeStyle()).addTo(routeLayer);
    const duration = routeAnimationDuration;
    let startTime;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      let remaining = pathLength * progress;
      const visibleLatLngs = [latlngs[0]];

      for (let index = 0; index < segments.length; index += 1) {
        const segment = segments[index];

        if (remaining >= segment.length) {
          visibleLatLngs.push(latlngs[index + 1]);
          remaining -= segment.length;
          continue;
        }

        if (remaining > 0 && segment.length > 0) {
          const ratio = remaining / segment.length;
          const currentPoint = L.point(
            segment.start.x + (segment.end.x - segment.start.x) * ratio,
            segment.start.y + (segment.end.y - segment.start.y) * ratio
          );
          visibleLatLngs.push(map.layerPointToLatLng(currentPoint));
        }
        break;
      }

      line.setLatLngs(visibleLatLngs);

      if (progress < 1) {
        routeAnimationFrame = window.requestAnimationFrame(animate);
      } else {
        line.setLatLngs(latlngs);
        routeAnimationFrame = null;
      }
    }

    routeAnimationFrame = window.requestAnimationFrame(animate);
  }

  function renderMap(activeLeg, animate = false) {
    const filteredStops = getFilteredStops(activeLeg);

    markerLayer.clearLayers();
    routeLayer.clearLayers();

    if (animate) pulseContainers();

    if (filteredStops.length === 0) {
      map.setView([20, 0], 2);
      renderIndex(filteredStops);
      setActiveButton(activeLeg);
      return;
    }

    const latlngs = filteredStops.map((stop, idx) => {
      const latlng = [stop.lat, stop.lon];
      const stories = experiencesFor(stop);

      const marker = L.marker(latlng, {
        icon: makeMarkerIcon(idx + 1, stop),
      }).addTo(markerLayer);

      const popupStories = stories.map((story) => `
        <li class="keegan-popup__story">
          ${storyBadge(story)}
        </li>
      `).join("");

      const popupContent = `
        <strong>${idx + 1}. ${escapeHtml(stop.name)}</strong><br/>
        ${stop.name === "Kentucky, USA"
          ? "<span>Starting Point</span>"
          : stories.length
            ? `<ul class="keegan-popup__stories">${popupStories}</ul>`
            : "<span>Coming Soon</span>"}
      `;

      marker.bindPopup(popupContent);

      return latlng;
    });

    if (activeLeg === "overview") {
      map.setView([20, 0], 2);
    } else {
      map.fitBounds(latlngs, { padding: [40, 40] });
    }

    if (animate) {
      window.requestAnimationFrame(() => drawRoute(latlngs));
    }

    renderIndex(filteredStops);
    setActiveButton(activeLeg);
  }

  if (filterBar) {
    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-leg]");
      if (!button) return;
      renderMap(button.dataset.leg, true);
    });
  }

  renderMap("overview", false);

  const routeObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      const overviewLatLngs = getFilteredStops("overview").map((stop) => [
        stop.lat,
        stop.lon,
      ]);
      drawRoute(overviewLatLngs);
      routeObserver.disconnect();
    },
    {
      threshold: 0.02,
      rootMargin: "0px 0px -15% 0px",
    }
  );

  routeObserver.observe(mapEl);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.02,
      rootMargin: "0px 0px -30% 0px"
    }
  );

  document
    .querySelectorAll(".keegan-reveal")
    .forEach((element) => revealObserver.observe(element));
});
