document.addEventListener("DOMContentLoaded", async () => {
  const story = document.getElementById("world-motion");
  if (!story) return;

  const canvas = story.querySelector(".world-motion__canvas");
  const context = canvas?.getContext("2d");
  const prosthetic = story.querySelector(".world-motion__prosthetic");
  const gleam = story.querySelector(".world-motion__gleam");
  const prompt = story.querySelector(".world-motion__prompt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const itinerary = Array.isArray(window.keeganStops)
    ? window.keeganStops.filter((stop) => stop.route !== false)
    : [];

  if (!canvas || !context) return;

  const plannedCountries = new Set(
    itinerary.map((stop) => String(stop.country || "").toLowerCase())
  );
  const iso2ByIso3 = {
    USA: "us", ISL: "is", GBR: "gb", DEU: "de", POL: "pl", TUR: "tr",
    GRC: "gr", MAR: "ma", SLE: "sl", GHA: "gh", RWA: "rw", KEN: "ke",
  };

  let countries = [];
  let progress = 0;
  let frameRequested = false;

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  function projection(longitude, latitude, centerLongitude, radius) {
    const radians = Math.PI / 180;
    const lambda = (longitude - centerLongitude) * radians;
    const phi = latitude * radians;
    const phi0 = 16 * radians;
    const visibility =
      Math.sin(phi0) * Math.sin(phi) +
      Math.cos(phi0) * Math.cos(phi) * Math.cos(lambda);

    return {
      x: radius + radius * Math.cos(phi) * Math.sin(lambda),
      y:
        radius -
        radius *
          (Math.cos(phi0) * Math.sin(phi) -
            Math.sin(phi0) * Math.cos(phi) * Math.cos(lambda)),
      visible: visibility > 0,
    };
  }

  function drawCoordinateLine(coordinates, centerLongitude, radius) {
    context.beginPath();
    let drawing = false;

    coordinates.forEach(([longitude, latitude]) => {
      const point = projection(longitude, latitude, centerLongitude, radius);
      if (!point.visible) {
        drawing = false;
        return;
      }

      if (!drawing) {
        context.moveTo(point.x, point.y);
        drawing = true;
      } else {
        context.lineTo(point.x, point.y);
      }
    });

    context.stroke();
  }

  function drawGeometry(geometry, centerLongitude, radius) {
    const polygons =
      geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;

    polygons.forEach((polygon) => {
      polygon.forEach((ring) => {
        context.beginPath();
        let drawing = false;

        ring.forEach(([longitude, latitude]) => {
          const point = projection(longitude, latitude, centerLongitude, radius);
          if (!point.visible) {
            drawing = false;
            return;
          }

          if (!drawing) {
            context.moveTo(point.x, point.y);
            drawing = true;
          } else {
            context.lineTo(point.x, point.y);
          }
        });

        context.closePath();
        context.fill();
        context.stroke();
      });
    });
  }

  function drawGlobe() {
    const size = canvas.clientWidth;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const targetSize = Math.round(size * pixelRatio);

    if (canvas.width !== targetSize || canvas.height !== targetSize) {
      canvas.width = targetSize;
      canvas.height = targetSize;
    }

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, size, size);

    const radius = size / 2;
    const centerLongitude = -55 + progress * 120;
    const routeProgress = clamp((progress - 0.1) / 0.72);

    const ocean = context.createRadialGradient(
      radius * 0.68,
      radius * 0.55,
      radius * 0.08,
      radius,
      radius,
      radius
    );
    ocean.addColorStop(0, "#153b50");
    ocean.addColorStop(0.62, "#071b2a");
    ocean.addColorStop(1, "#02070c");

    context.beginPath();
    context.arc(radius, radius, radius - 1, 0, Math.PI * 2);
    context.fillStyle = ocean;
    context.fill();
    context.save();
    context.clip();

    context.lineWidth = 0.7;
    context.strokeStyle = "rgba(125, 211, 252, 0.18)";

    for (let latitude = -60; latitude <= 60; latitude += 30) {
      const coordinates = [];
      for (let longitude = -180; longitude <= 180; longitude += 3) {
        coordinates.push([longitude, latitude]);
      }
      drawCoordinateLine(coordinates, centerLongitude, radius);
    }

    for (let longitude = -180; longitude < 180; longitude += 30) {
      const coordinates = [];
      for (let latitude = -90; latitude <= 90; latitude += 3) {
        coordinates.push([longitude, latitude]);
      }
      drawCoordinateLine(coordinates, centerLongitude, radius);
    }

    countries.forEach((feature) => {
      const iso2 = iso2ByIso3[feature.id];
      const highlighted = iso2 && plannedCountries.has(iso2);
      context.fillStyle = highlighted
        ? "rgba(250, 204, 21, 0.34)"
        : "rgba(45, 212, 191, 0.2)";
      context.strokeStyle = highlighted
        ? "rgba(253, 224, 71, 0.78)"
        : "rgba(125, 211, 252, 0.28)";
      context.lineWidth = highlighted ? 1.25 : 0.65;
      drawGeometry(feature.geometry, centerLongitude, radius);
    });

    const visibleStops = itinerary
      .slice(0, Math.ceil(routeProgress * itinerary.length))
      .map((stop) => ({
        stop,
        point: projection(stop.lon, stop.lat, centerLongitude, radius),
      }));

    context.beginPath();
    let routeStarted = false;
    visibleStops.forEach(({ point }) => {
      if (!point.visible) {
        routeStarted = false;
        return;
      }
      if (!routeStarted) {
        context.moveTo(point.x, point.y);
        routeStarted = true;
      } else {
        context.lineTo(point.x, point.y);
      }
    });
    context.strokeStyle = "rgba(253, 224, 71, 0.82)";
    context.lineWidth = 1.6;
    context.setLineDash([4, 5]);
    context.stroke();
    context.setLineDash([]);

    visibleStops.forEach(({ point }) => {
      if (!point.visible) return;
      context.beginPath();
      context.arc(point.x, point.y, 4.2, 0, Math.PI * 2);
      context.fillStyle = "#fde047";
      context.shadowColor = "rgba(253, 224, 71, 0.9)";
      context.shadowBlur = 11;
      context.fill();
      context.shadowBlur = 0;
      context.lineWidth = 1.5;
      context.strokeStyle = "#07111c";
      context.stroke();
    });

    context.restore();
    context.beginPath();
    context.arc(radius, radius, radius - 1, 0, Math.PI * 2);
    context.lineWidth = 1.2;
    context.strokeStyle = "rgba(186, 230, 253, 0.48)";
    context.stroke();
  }

  function update() {
    frameRequested = false;

    if (reducedMotion.matches) {
      progress = 0.72;
      prosthetic.style.opacity = "0.68";
      prosthetic.style.transform = "none";
      gleam.style.transform = "translate3d(58%, 18%, 0) rotate(-24deg)";
      prompt.style.opacity = "0";
      drawGlobe();
      return;
    }

    const rect = story.getBoundingClientRect();
    const distance = Math.max(story.offsetHeight - window.innerHeight, 1);
    progress = clamp(-rect.top / distance);
    const prostheticProgress = clamp((progress - 0.58) / 0.3);

    prosthetic.style.opacity = String(prostheticProgress * 0.72);
    prosthetic.style.transform = `translate3d(0, ${(1 - prostheticProgress) * 18}px, 0)`;
    gleam.style.transform = `
      translate3d(${(-72 + progress * 138)}%, ${(-32 + progress * 48)}%, 0)
      rotate(-24deg)
    `;
    prompt.style.opacity = String(clamp(1 - progress * 5));
    drawGlobe();
  }

  function requestUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(update);
  }

  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json"
    );
    if (!response.ok) throw new Error(`Boundary request failed: ${response.status}`);
    countries = (await response.json()).features || [];
  } catch (error) {
    console.error("The animated globe boundaries could not be loaded.", error);
  }

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reducedMotion.addEventListener?.("change", requestUpdate);
});
