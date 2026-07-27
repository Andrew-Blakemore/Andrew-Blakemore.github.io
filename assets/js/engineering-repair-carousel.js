document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-repair-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".repair-slide"));
    const previousButton = carousel.querySelector(
      ".repair-carousel__button--previous"
    );
    const nextButton = carousel.querySelector(".repair-carousel__button--next");
    const currentLabel = carousel.querySelector("[data-repair-current]");
    const totalLabel = carousel.querySelector("[data-repair-total]");

    if (slides.length === 0 || !previousButton || !nextButton) return;

    let activeIndex = 0;

    if (totalLabel) totalLabel.textContent = String(slides.length);

    function showSlide(nextIndex, direction) {
      slides[activeIndex].hidden = true;
      slides[activeIndex].classList.remove("is-entering");

      activeIndex = (nextIndex + slides.length) % slides.length;
      carousel.dataset.direction = direction;

      const nextSlide = slides[activeIndex];
      nextSlide.hidden = false;
      nextSlide.classList.remove("is-entering");
      void nextSlide.offsetWidth;
      nextSlide.classList.add("is-entering");

      if (currentLabel) currentLabel.textContent = String(activeIndex + 1);
    }

    previousButton.addEventListener("click", () => {
      showSlide(activeIndex - 1, "previous");
    });

    nextButton.addEventListener("click", () => {
      showSlide(activeIndex + 1, "next");
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showSlide(activeIndex - 1, "previous");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(activeIndex + 1, "next");
      }
    });
  });
});
