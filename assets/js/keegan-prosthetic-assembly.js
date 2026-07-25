// Scroll-driven knee motion used by the Keegan fellowship prototype header.
document.addEventListener("DOMContentLoaded", () => {
  const story = document.getElementById("prosthetic-story");
  if (!story) return;

  const lowerLeg = story.querySelector(".prosthetic-leg__lower");
  const groundShadow = story.querySelector(".prosthetic-motion__ground");
  const prompt = story.querySelector(".prosthetic-story__prompt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!lowerLeg || !groundShadow || !prompt) return;

  let frameRequested = false;

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  function update() {
    frameRequested = false;

    const rect = story.getBoundingClientRect();
    const distance = Math.max(story.offsetHeight - window.innerHeight, 1);
    const progress = reducedMotion.matches ? 0 : clamp(-rect.top / distance);
    const flexion = Math.sin(progress * Math.PI);
    const kneeAngle = flexion * 56;

    lowerLeg.style.transform = `
      translateX(-50%)
      rotate(${kneeAngle}deg)
    `;

    groundShadow.style.opacity = String(0.38 - flexion * 0.23);
    groundShadow.style.transform = `
      translateX(calc(-28% + ${flexion * 42}px))
      scaleX(${1 - flexion * 0.24})
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
