document.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.getElementById("keegan-map");
  const indexEl = document.getElementById("keegan-index");
  const filterBar = document.querySelector(".keegan-filter-bar");
  const stops = Array.isArray(window.keeganStops) ? window.keeganStops : [];

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

  function setActiveButton(activeLeg) {
    if (!filterBar) return;
    filterBar.querySelectorAll("button[data-leg]").forEach((button) => {
      button.classList.toggle("active", button.dataset.leg === activeLeg);
    });
  }

  function getFilteredStops(activeLeg) {
    if (activeLeg === "overview") {
      return stops.slice();
    }
    return stops.filter((stop) => stop.leg === activeLeg);
  }

  function pulseContainers() {
    mapEl.classList.add("is-updating");
    indexEl.classList.add("is-updating");

    window.setTimeout(() => {
      mapEl.classList.remove("is-updating");
      indexEl.classList.remove("is-updating");
    }, 180);
  }

  function flagImage(countryCode, placeName) {
    if (!countryCode) return "";
    const code = String(countryCode).toLowerCase();
    const label = placeName ? `${placeName} flag` : "Flag";
    return `<img src="https://flagcdn.com/w40/${code}.png" alt="${label}">`;
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
      const card = document.createElement("a");
      card.className = "keegan-card";
      card.href = stop.url;
      card.innerHTML = `
        <span class="flag">${flagImage(stop.country, stop.name)}</span><br />
        <span class="order">${idx + 1}</span>
        <h3>${stop.name}</h3>
        <p>${stop.summary || ""}</p>
      `;
      indexEl.appendChild(card);
    });
  }

  function renderMap(activeLeg, animate = false) {
    const filteredStops = getFilteredStops(activeLeg);

    markerLayer.clearLayers();
    routeLayer.clearLayers();

    if (animate) {
      pulseContainers();
    }

    if (filteredStops.length === 0) {
      map.setView([20, 0], 2);
      renderIndex(filteredStops);
      setActiveButton(activeLeg);
      return;
    }

    const latlngs = filteredStops.map((stop, idx) => {
      const latlng = [stop.lat, stop.lon];

      const marker = L.marker(latlng, {
        icon: makeMarkerIcon(idx + 1),
      }).addTo(markerLayer);

      marker.bindPopup(`
        <div style="min-width: 160px;">
          <strong>${idx + 1}. ${stop.name}</strong><br />
          <a href="${stop.url}">Open destination page</a>
        </div>
      `);

      return latlng;
    });

    if (latlngs.length > 1) {
      L.polyline(latlngs, {
        color: "#111827",
        weight: 3,
        opacity: 0.65,
        dashArray: "6,8",
      }).addTo(routeLayer);
    }

    if (activeLeg === "overview") {
      map.setView([20, 0], 2);
    } else {
      map.fitBounds(latlngs, { padding: [40, 40] });
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
});
