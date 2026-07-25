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
    const minimumDistanceSquared = 0.45 * 0.45;

    polygons.forEach((polygon) => {
      polygon.forEach((ring) => {
        context.beginPath();
        let drawing = false;
        let previousX = 0;
        let previousY = 0;

        ring.forEach(([longitude, latitude], index) => {
          const point = projection(longitude, latitude, centerLongitude, radius);
          if (!point.visible) {
            drawing = false;
            return;
          }

          if (!drawing) {
            context.moveTo(point.x, point.y);
            previousX = point.x;
            previousY = point.y;
            drawing = true;
            return;
          }

          const xDifference = point.x - previousX;
          const yDifference = point.y - previousY;
          const isLastPoint = index === ring.length - 1;

          // Retain the detailed source map, but skip vertices that would occupy
          // the same subpixel area on the displayed globe.
          if (
            !isLastPoint &&
            xDifference * xDifference + yDifference * yDifference <
              minimumDistanceSquared
          ) {
            return;
          }

          context.lineTo(point.x, point.y);
          previousX = point.x;
          previousY = point.y;
        });

        context.closePath();
        context.fill();
        context.stroke();
      });
    });
  }

  function routeCoordinates(start, end, amount, steps = 28) {
    let longitudeDifference = end.lon - start.lon;
    if (longitudeDifference > 180) longitudeDifference -= 360;
    if (longitudeDifference < -180) longitudeDifference += 360;

    const coordinates = [];
    const samples = Math.max(2, Math.ceil(steps * amount));

    for (let index = 0; index <= samples; index += 1) {
      const segmentProgress = (index / samples) * amount;
      coordinates.push([
        start.lon + longitudeDifference * segmentProgress,
        start.lat + (end.lat - start.lat) * segmentProgress,
      ]);
    }

    return coordinates;
  }

  function drawGlobe() {
    const size = canvas.clientWidth;
    // Two device pixels per CSS pixel stays crisp while making each animated
    // redraw substantially lighter than the previous 3x canvas.
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
      context.fillStyle = "rgba(36, 132, 170, 0.34)";
      context.strokeStyle = "rgba(125, 211, 252, 0.48)";
      context.lineWidth = 0.72;
      context.lineJoin = "round";
      context.lineCap = "round";
      drawGeometry(feature.geometry, centerLongitude, radius);
    });

    context.strokeStyle = "rgba(253, 224, 71, 0.82)";
    context.lineWidth = 1.6;
    context.setLineDash([4, 5]);
    context.lineCap = "round";

    const routePosition = routeProgress * Math.max(itinerary.length - 1, 0);
    const completedSegments = Math.floor(routePosition);
    const currentSegmentProgress = routePosition - completedSegments;

    for (
      let segmentIndex = 0;
      segmentIndex < itinerary.length - 1;
      segmentIndex += 1
    ) {
      const segmentProgress =
        segmentIndex < completedSegments
          ? 1
          : segmentIndex === completedSegments
            ? currentSegmentProgress
            : 0;

      if (segmentProgress <= 0) continue;

      drawCoordinateLine(
        routeCoordinates(
          itinerary[segmentIndex],
          itinerary[segmentIndex + 1],
          segmentProgress
        ),
        centerLongitude,
        radius
      );
    }

    context.setLineDash([]);

    const visibleStopCount = Math.min(
      itinerary.length,
      completedSegments + (routeProgress > 0 ? 1 : 0)
    );

    itinerary.slice(0, visibleStopCount).forEach((stop) => {
      const point = projection(stop.lon, stop.lat, centerLongitude, radius);
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
      "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/50m/cultural/ne_50m_admin_0_countries.json"
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
