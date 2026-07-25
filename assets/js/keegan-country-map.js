document.addEventListener("DOMContentLoaded", async () => {
  const mapEl = document.getElementById("keegan-country-map");
  const indexEl = document.getElementById("keegan-country-index");
  const filterBar = document.querySelector(".keegan-filter-bar");
  const stops = Array.isArray(window.keeganStops) ? window.keeganStops : [];

  if (!mapEl || !indexEl || stops.length === 0 || typeof L === "undefined") {
    return;
  }

  const iso3ByIso2 = {
    us: "USA",
    is: "ISL",
    gb: "GBR",
    de: "DEU",
    pl: "POL",
    tr: "TUR",
    gr: "GRC",
    ma: "MAR",
    sl: "SLE",
    gh: "GHA",
    rw: "RWA",
    ke: "KEN",
  };

  const displayNames = {
    USA: "United States",
    ISL: "Iceland",
    GBR: "United Kingdom",
    DEU: "Germany",
    POL: "Poland",
    TUR: "Turkey",
    GRC: "Greece",
    MAR: "Morocco",
    SLE: "Sierra Leone",
    GHA: "Ghana",
    RWA: "Rwanda",
    KEN: "Kenya",
  };

  // Reuse the test page's itinerary data, but reduce it to one entry per country.
  const countriesByIso3 = new Map();

  stops.forEach((stop) => {
    const iso3 = iso3ByIso2[String(stop.country || "").toLowerCase()];
    if (!iso3) return;

    const existing = countriesByIso3.get(iso3);
    const status =
      stop.status || (stop.current === true ? "current" : "planned");

    if (!existing) {
      countriesByIso3.set(iso3, {
        iso3,
        country: stop.country,
        name: displayNames[iso3] || stop.name,
        leg: stop.leg,
        url: stop.url,
        link_enabled: stop.link_enabled,
        summary: stop.summary,
        status,
      });
      return;
    }

    if (status === "current") existing.status = "current";
    if (!existing.url && stop.url) existing.url = stop.url;
    if (existing.link_enabled === false && stop.link_enabled !== false) {
      existing.link_enabled = true;
    }
  });

  const countries = Array.from(countriesByIso3.values());
  const countryLookup = new Map(countries.map((country) => [country.iso3, country]));

  const map = L.map("keegan-country-map", {
    worldCopyJump: true,
    scrollWheelZoom: false,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 7,
    minZoom: 2,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.setView([20, 0], 2);
  indexEl.innerHTML = '<div class="keegan-empty">Loading country boundaries...</div>';

  let activeLeg = "overview";
  let countryLayer;

  function hasLink(country) {
    return country.link_enabled !== false && !!country.url;
  }

  function flagImage(code, name) {
    if (!code) return "";
    return `<img src="https://flagcdn.com/w40/${code}.png" alt="${name} flag">`;
  }

  function visibleCountries() {
    if (activeLeg === "overview") return countries;
    return countries.filter((country) => country.leg === activeLeg);
  }

  function statusLabel(status) {
    if (status === "current") return "Current";
    if (status === "completed") return "Completed";
    return "Planned";
  }

  function polygonStyle(feature) {
    const country = countryLookup.get(feature.id);
    const visible =
      country && (activeLeg === "overview" || country.leg === activeLeg);

    if (!visible) {
      return {
        color: "#64748b",
        weight: 0.7,
        opacity: 0.22,
        fillColor: "#cbd5e1",
        fillOpacity: 0.04,
      };
    }

    const colors = {
      planned: { stroke: "#9a6700", fill: "#f2c14e" },
      current: { stroke: "#1d4ed8", fill: "#3b82f6" },
      completed: { stroke: "#166534", fill: "#22c55e" },
    };
    const color = colors[country.status] || colors.planned;

    return {
      color: color.stroke,
      weight: 2,
      opacity: 0.95,
      fillColor: color.fill,
      fillOpacity: 0.48,
    };
  }

  function popupMarkup(country) {
    const action = hasLink(country)
      ? `<a href="${country.url}">Explore the country itinerary &rarr;</a>`
      : "<span>Itinerary coming soon</span>";

    return `
      <div class="keegan-country-popup">
        <strong>${country.name}</strong><br>
        <span>${country.summary || ""}</span><br>
        ${action}
      </div>
    `;
  }

  function renderIndex() {
    const filtered = visibleCountries();
    indexEl.innerHTML = "";

    if (filtered.length === 0) {
      indexEl.innerHTML =
        '<div class="keegan-empty">No countries have been added for this travel leg yet.</div>';
      return;
    }

    filtered.forEach((country, index) => {
      const card = document.createElement(hasLink(country) ? "a" : "div");
      card.className = "keegan-card keegan-country-card";
      if (hasLink(country)) card.href = country.url;

      card.innerHTML = `
        <div class="keegan-country-card__topline">
          <span class="flag">${flagImage(country.country, country.name)}</span>
          <span class="keegan-country-status keegan-country-status--${country.status}">
            ${statusLabel(country.status)}
          </span>
        </div>
        <span class="order">${index + 1}</span>
        <h3>${country.name}</h3>
        <p>${country.summary || ""}</p>
      `;

      indexEl.appendChild(card);
    });
  }

  function setActiveButton() {
    if (!filterBar) return;
    filterBar.querySelectorAll("button[data-leg]").forEach((button) => {
      button.classList.toggle("active", button.dataset.leg === activeLeg);
    });
  }

  function fitToVisibleCountries() {
    if (!countryLayer || activeLeg === "overview") {
      map.setView([20, 0], 2);
      return;
    }

    const layers = [];
    countryLayer.eachLayer((layer) => {
      const country = countryLookup.get(layer.feature.id);
      if (country && country.leg === activeLeg) layers.push(layer);
    });

    if (layers.length > 0) {
      map.fitBounds(L.featureGroup(layers).getBounds(), {
        padding: [35, 35],
        maxZoom: 5,
      });
    }
  }

  function render(animate = false) {
    if (animate) {
      mapEl.classList.add("is-updating");
      indexEl.classList.add("is-updating");
      window.setTimeout(() => {
        mapEl.classList.remove("is-updating");
        indexEl.classList.remove("is-updating");
      }, 180);
    }

    if (countryLayer) countryLayer.setStyle(polygonStyle);
    setActiveButton();
    renderIndex();
    fitToVisibleCountries();
  }

  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json"
    );
    if (!response.ok) throw new Error(`Boundary request failed: ${response.status}`);

    countryLayer = L.geoJSON(await response.json(), {
      style: polygonStyle,
      onEachFeature(feature, layer) {
        const country = countryLookup.get(feature.id);
        if (!country) return;

        layer.bindTooltip(country.name, {
          sticky: true,
          direction: "top",
          className: "keegan-country-tooltip",
        });
        layer.bindPopup(popupMarkup(country));

        layer.on({
          mouseover(event) {
            event.target.setStyle({ weight: 3, fillOpacity: 0.68 });
            event.target.bringToFront();
          },
          mouseout(event) {
            countryLayer.resetStyle(event.target);
          },
        });
      },
    }).addTo(map);

    render(false);
  } catch (error) {
    console.error(error);
    indexEl.innerHTML = `
      <div class="keegan-empty">
        The country boundaries could not be loaded. Please refresh the page to try again.
      </div>
    `;
  }

  if (filterBar) {
    filterBar.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-leg]");
      if (!button) return;
      activeLeg = button.dataset.leg;
      render(true);
    });
  }
});
