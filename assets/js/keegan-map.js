document.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.getElementById("keegan-map");
  const indexEl = document.getElementById("keegan-index");
  const filterBar = document.querySelector(".keegan-filter-bar");
  const stops = Array.isArray(window.keeganStops) ? window.keeganStops : [];
  const animateRoutes = mapEl?.hasAttribute("data-animate-routes");
  const routeAnimationDuration =
    Number(mapEl?.dataset.routeDuration) || 2400;

  if (!mapEl || !indexEl || stops.length === 0 || typeof L === "undefined") {
    return;
  }

  const map = L.map("keegan-map", {
    worldCopyJump: true,
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 6,
    minZoom: 2,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const markerLayer = L.layerGroup().addTo(map);
  const routeLayer = L.layerGroup().addTo(map);
  let routeAnimationFrame = null;

  // Split stops
  const routeStops = stops.filter((s) => s.route !== false);
  const currentStops = stops.filter((s) => s.current === true);

  function hasLink(stop) {
    return stop.link_enabled !== false && !!stop.url;
  }

  function makeMarkerIcon(order) {
    return L.divIcon({
      className: "keegan-pin",
      html: `
        <div style="
          width: 34px;
          height: 34px;
          border-radius: 999px;
          background: #111827;
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

  function makeCurrentIcon() {
    return L.divIcon({
      className: "keegan-current-pin",
      html: `
        <div style="
          width: 18px;
          height: 18px;
          background: #2563eb;
          border-radius: 999px;
          border: 3px solid white;
          box-shadow: 0 0 0 6px rgba(37,99,235,0.25);
        "></div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
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
    return `<img src="https://flagcdn.com/w40/${code}.png" alt="${name} flag">`;
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
      const linkIsEnabled = hasLink(stop);
      const card = document.createElement(linkIsEnabled ? "a" : "div");
      card.className = "keegan-card";

      if (linkIsEnabled) {
        card.href = stop.url;
      }

      card.innerHTML = `
        <span class="flag">${flagImage(stop.country, stop.name)}</span><br/>
        <span class="order">${idx + 1}</span>
        <h3>${stop.name}</h3>
        <p>${stop.summary || ""}</p>
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

  function drawRoute(latlngs, animated = false) {
    if (routeAnimationFrame) {
      window.cancelAnimationFrame(routeAnimationFrame);
      routeAnimationFrame = null;
    }

    routeLayer.clearLayers();
    if (latlngs.length < 2) return;

    if (!animated) {
      L.polyline(latlngs, routeStyle()).addTo(routeLayer);
      return;
    }

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
      const linkIsEnabled = hasLink(stop);

      const marker = L.marker(latlng, {
        icon: makeMarkerIcon(idx + 1),
      }).addTo(markerLayer);

      let popupContent;
      
      if (stop.name === "Kentucky, USA") {
        popupContent = `
          <strong>${idx + 1}. ${stop.name}</strong><br/>
          <span>Starting Point</span>
        `;
      } else if (linkIsEnabled) {
        popupContent = `
          <strong>${idx + 1}. ${stop.name}</strong><br/>
          <a href="${stop.url}">Explore →</a>
        `;
      } else {
        popupContent = `
          <strong>${idx + 1}. ${stop.name}</strong><br/>
          <span>Coming Soon</span>
        `;
      }

      marker.bindPopup(popupContent);

      return latlng;
    });

    // current markers (NOT part of route)
    currentStops.forEach((stop) => {
      const marker = L.marker([stop.lat, stop.lon], {
        icon: makeCurrentIcon(),
      }).addTo(markerLayer);

      marker.bindPopup(`
        <strong>${stop.name}</strong><br/>
        <em>Current Location</em>
      `);
    });

    // zoom behavior
    if (activeLeg === "overview") {
      map.setView([20, 0], 2);
    } else {
      map.fitBounds(latlngs, { padding: [40, 40] });
    }

    // The live page keeps its static route. The test page begins its dashed
    // reveal only after the map view has settled.
    if (!animateRoutes) {
      drawRoute(latlngs, false);
    } else if (animate) {
      window.requestAnimationFrame(() => drawRoute(latlngs, true));
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

  if (animateRoutes) {
    const routeObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        const overviewLatLngs = getFilteredStops("overview").map((stop) => [
          stop.lat,
          stop.lon,
        ]);
        drawRoute(overviewLatLngs, true);
        routeObserver.disconnect();
      },
      { threshold: 0.02 }
    );

    routeObserver.observe(mapEl);
  }
});
