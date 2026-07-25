document.addEventListener("DOMContentLoaded", () => {
  const story = document.getElementById("world-motion");
  if (!story) return;

  const globe = story.querySelector(".world-motion__sphere");
  const grid = story.querySelector(".world-motion__grid");
  const routeLine = story.querySelector(".world-motion__route-line");
  const stops = [...story.querySelectorAll(".world-motion__stop")];
  const prosthetic = story.querySelector(".world-motion__prosthetic");
  const gleam = story.querySelector(".world-motion__gleam");
  const prompt = story.querySelector(".world-motion__prompt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let frameRequested = false;

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  function update() {
    frameRequested = false;

    if (reducedMotion.matches) {
      globe.style.transform = "none";
      grid.style.transform = "none";
      routeLine.style.clipPath = "inset(0 0 0 0)";
      stops.forEach((stop) => {
        stop.style.opacity = "1";
        stop.style.transform = "scale(1)";
      });
      prosthetic.style.opacity = "0.72";
      prosthetic.style.transform = "translate3d(0, 0, 0)";
      gleam.style.transform = "translate3d(58%, 18%, 0) rotate(-24deg)";
      prompt.style.opacity = "0";
      return;
    }

    const rect = story.getBoundingClientRect();
    const distance = Math.max(story.offsetHeight - window.innerHeight, 1);
    const progress = clamp(-rect.top / distance);
    const routeProgress = clamp((progress - 0.12) / 0.68);
    const prostheticProgress = clamp((progress - 0.58) / 0.3);

    globe.style.transform = `rotate(${progress * 8}deg)`;
    grid.style.transform = `rotate(${progress * 28}deg)`;
    routeLine.style.clipPath = `inset(0 ${(1 - routeProgress) * 100}% 0 0)`;

    stops.forEach((stop, index) => {
      const stopProgress = clamp((routeProgress - index * 0.17) / 0.14);
      stop.style.opacity = String(stopProgress);
      stop.style.transform = `scale(${0.45 + stopProgress * 0.55})`;
    });

    prosthetic.style.opacity = String(prostheticProgress * 0.78);
    prosthetic.style.transform = `translate3d(0, ${(1 - prostheticProgress) * 18}px, 0)`;
    gleam.style.transform = `
      translate3d(${(-72 + progress * 138)}%, ${(-32 + progress * 48)}%, 0)
      rotate(-24deg)
    `;
    prompt.style.opacity = String(clamp(1 - progress * 5));
  }

  function requestUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  reducedMotion.addEventListener?.("change", requestUpdate);
});
