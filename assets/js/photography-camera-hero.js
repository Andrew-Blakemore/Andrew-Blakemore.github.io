document.addEventListener("DOMContentLoaded", () => {
  const story = document.getElementById("photo-camera-story");
  if (!story) return;

  const camera = story.querySelector(".photo-camera");
  const lensRing = story.querySelector(".photo-camera__lens-ring");
  const aperture = story.querySelector(".photo-camera__aperture");
  const gleam = story.querySelector(".photo-camera__gleam");
  const prompt = story.querySelector(".photo-camera-story__prompt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let frameRequested = false;

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  function update() {
    frameRequested = false;

    if (reducedMotion.matches) {
      camera.style.transform = "none";
      camera.style.opacity = "1";
      lensRing.style.transform = "none";
      aperture.style.transform = "none";
      gleam.style.transform = "translate3d(24%, -18%, 0) rotate(-28deg)";
      gleam.style.opacity = "0.72";
      prompt.style.opacity = "0";
      return;
    }

    const rect = story.getBoundingClientRect();
    const distance = Math.max(story.offsetHeight - window.innerHeight, 1);
    const progress = clamp(-rect.top / distance);

    const focusProgress = clamp(progress / 0.98);

    camera.style.transform = "none";
    camera.style.opacity = "1";
    lensRing.style.transform = `rotate(${focusProgress * 22}deg)`;
    aperture.style.transform = `
      rotate(${-focusProgress * 34}deg)
      scale(${1 - Math.sin(focusProgress * Math.PI) * 0.18})
    `;
    gleam.style.transform = `
      translate3d(${(-62 + focusProgress * 112)}%, ${(-42 + focusProgress * 48)}%, 0)
      rotate(-28deg)
    `;
    gleam.style.opacity = String(0.25 + focusProgress * 0.68);
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
