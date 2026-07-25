// Scroll-driven assembly used by the Keegan fellowship prototype header.
document.addEventListener("DOMContentLoaded", () => {
  const story = document.getElementById("prosthetic-story");
  if (!story) return;

  const parts = {
    socket: story.querySelector('[data-part="socket"]'),
    pylon: story.querySelector('[data-part="pylon"]'),
    foot: story.querySelector('[data-part="foot"]'),
  };
  const connections = story.querySelectorAll(
    ".prosthetic-assembly__connections i"
  );
  const person = story.querySelector(".prosthetic-person");
  const caption = story.querySelector(".prosthetic-assembly__caption");
  const guide = story.querySelector(".prosthetic-assembly__guide");
  const prompt = story.querySelector(".prosthetic-story__prompt");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (Object.values(parts).some((part) => !part)) return;

  let frameRequested = false;

  const clamp = (value, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

  const ease = (value) => {
    const bounded = clamp(value);
    return 1 - Math.pow(1 - bounded, 3);
  };

  const stage = (progress, start, end) =>
    ease((progress - start) / (end - start));

  function setPart(part, x, y, rotation, amount) {
    const remaining = 1 - amount;
    part.style.transform = `
      translate3d(
        calc(-50% + ${x * remaining}px),
        ${y * remaining}px,
        0
      )
      rotate(${rotation * remaining}deg)
    `;
  }

  function update() {
    frameRequested = false;

    const rect = story.getBoundingClientRect();
    const distance = Math.max(story.offsetHeight - window.innerHeight, 1);
    const progress = reducedMotion.matches ? 1 : clamp(-rect.top / distance);

    const assemblyProgress = stage(progress, 0.08, 0.68);
    const personProgress = stage(progress, 0.7, 0.96);
    const compact = window.innerWidth <= 700;

    setPart(parts.socket, 0, compact ? -105 : -135, -2, assemblyProgress);
    setPart(parts.pylon, 0, compact ? 35 : 55, 2, assemblyProgress);
    setPart(parts.foot, 0, compact ? 125 : 155, 4, assemblyProgress);

    connections.forEach((connection, index) => {
      const connectionProgress = stage(
        progress,
        0.58 + index * 0.06,
        0.72 + index * 0.06
      );
      connection.style.opacity = String(
        Math.sin(connectionProgress * Math.PI) * 0.9
      );
      connection.style.transform = `
        translate(-50%, -50%)
        scale(${0.3 + connectionProgress * 0.9})
      `;
    });

    guide.style.opacity = String(0.3 * (1 - personProgress));
    person.style.opacity = String(personProgress * 0.82);
    person.style.transform = `
      translateX(-50%)
      translateY(${(1 - personProgress) * 8}px)
    `;
    caption.style.opacity = String(stage(progress, 0.84, 0.97));
    caption.style.transform = `
      translate(-50%, ${(1 - personProgress) * 10}px)
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
