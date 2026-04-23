document.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.getElementById("keegan-map");
  if (!mapEl || !window.keeganStops || !Array.isArray(window.keeganStops)) return;

  const map = L.map("keegan-map", {
    worldCopyJump: true,
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 6,
    minZoom: 2,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const bounds = [];
  const latlngs = [];

  const makeMarkerIcon = (order) =>
    L.divIcon({
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

  window.keeganStops.forEach((stop) => {
    const latlng = [stop.lat, stop.lon];
    latlngs.push(latlng);
    bounds.push(latlng);

    const marker = L.marker(latlng, { icon: makeMarkerIcon(stop.order) }).addTo(map);
    marker.bindPopup(`
      <div style="min-width: 160px;">
        <strong>${stop.order}. ${stop.name}</strong><br />
        <a href="${stop.url}">Open destination page</a>
      </div>
    `);
  });

  if (latlngs.length > 1) {
    L.polyline(latlngs, {
      color: "#111827",
      weight: 3,
      opacity: 0.65,
      dashArray: "6,8",
    }).addTo(map);
  }

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [40, 40] });
  } else {
    map.setView([20, 0], 2);
  }
});
