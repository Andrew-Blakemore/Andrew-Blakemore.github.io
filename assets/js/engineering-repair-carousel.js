document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-repair-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".repair-slide"));
    const previousButton = carousel.querySelector(
      ".repair-carousel__button--previous"
    );
    const nextButton = carousel.querySelector(".repair-carousel__button--next");
    const dots = Array.from(carousel.querySelectorAll("[data-repair-dot]"));

    if (slides.length === 0 || !previousButton || !nextButton) return;

    let activeIndex = 0;

    slides.forEach((slide) => {
      const image = slide.querySelector("img");
      if (!image) return;

      const setOrientation = () => {
        slide.classList.toggle(
          "is-portrait",
          image.naturalHeight > image.naturalWidth
        );
      };

      if (image.complete) {
        setOrientation();
      } else {
        image.addEventListener("load", setOrientation, { once: true });
      }
    });

    function updateDots() {
      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle("is-active", isActive);

        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    }

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

      updateDots();
    }

    previousButton.addEventListener("click", () => {
      showSlide(activeIndex - 1, "previous");
    });

    nextButton.addEventListener("click", () => {
      showSlide(activeIndex + 1, "next");
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (index === activeIndex) return;
        showSlide(index, index > activeIndex ? "next" : "previous");
      });
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
