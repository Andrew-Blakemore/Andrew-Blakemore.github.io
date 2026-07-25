// Scroll-driven finger motion used by the Keegan fellowship prototype header.
document.addEventListener("DOMContentLoaded", () => {
  const story = document.getElementById("prosthetic-story");
  const hand = story?.querySelector(".prosthetic-hand");
  const prompt = story?.querySelector(".prosthetic-story__prompt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!story || !hand || !prompt) return;

  let frameRequested = false;

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  function update() {
    frameRequested = false;

    const rect = story.getBoundingClientRect();
    const distance = Math.max(story.offsetHeight - window.innerHeight, 1);
    const progress = reducedMotion.matches ? 0 : clamp(-rect.top / distance);

    // A single gentle close-and-open cycle avoids the abrupt geometry changes
    // of a fully clenched 2D fist.
    const flexion = Math.sin(progress * Math.PI);
    hand.style.setProperty("--finger-flex", `${flexion * 13}deg`);
    hand.style.setProperty("--tip-flex", `${flexion * 19}deg`);
    hand.style.setProperty("--thumb-flex", `${flexion * 12}deg`);
    hand.style.setProperty("--thumb-tip-flex", `${flexion * -10}deg`);
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
