document.addEventListener("DOMContentLoaded", () => {
  const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

  const frameworkHeading = Array.from(
    document.querySelectorAll("h2, h3, h4")
  ).find(
    (heading) =>
      normalizeText(heading.textContent) ===
      "The sequence is a framework, not a universal recipe."
  );

  if (frameworkHeading) {
    frameworkHeading.classList.add("tn-framework-note__title");
    frameworkHeading.parentElement?.classList.add(
      "tn-framework-note__title-column"
    );
  }

  const addFutureVisitNotice = (organization) => {
    const organizationLabel = Array.from(
      document.querySelectorAll("h2, h3, h4, p, strong, div, span")
    ).find(
      (element) => normalizeText(element.textContent) === organization
    );

    if (!organizationLabel) return;

    let visitTable = organizationLabel.parentElement;

    while (visitTable && visitTable !== document.body) {
      const text = normalizeText(visitTable.textContent);
      const containsVisitDetails =
        text.includes(organization) &&
        (text.includes("Nashville") || text.includes("Chattanooga"));
      const containsBothFutureOrganizations =
        text.includes("Amputee Blade Runners") && text.includes("Fillauer");

      if (containsVisitDetails && !containsBothFutureOrganizations) break;
      visitTable = visitTable.parentElement;
    }

    if (!visitTable || visitTable === document.body) return;
    if (visitTable.nextElementSibling?.classList.contains("tn-future-visit-note")) {
      return;
    }

    const notice = document.createElement("div");
    notice.className = "tn-future-visit-note";
    notice.setAttribute("aria-label", `${organization} visit status`);
    notice.innerHTML = `
      <span class="tn-future-visit-note__line" aria-hidden="true"></span>
      <span class="tn-future-visit-note__text">Coming Winter 2026–27</span>
      <span class="tn-future-visit-note__line" aria-hidden="true"></span>
    `;
    visitTable.insertAdjacentElement("afterend", notice);
  };

  addFutureVisitNotice("Amputee Blade Runners");
  addFutureVisitNotice("Fillauer");

  const carouselImageNames = [
    "socket-lamination-setup.webp",
    "prosthetic-socket-belt-sanding.webp",
    "prosthetic-socket-trimming.webp",
  ];

  const carouselFigures = carouselImageNames
    .map((fileName) =>
      document
        .querySelector(`img[src*="${fileName}"]`)
        ?.closest("figure")
    )
    .filter(Boolean);

  if (carouselFigures.length !== carouselImageNames.length) return;
  if (document.querySelector("[data-tennessee-process-carousel]")) return;

  const originalGallery = carouselFigures[0].parentElement;
  if (!originalGallery) return;

  const carousel = document.createElement("section");
  carousel.className = "tn-process-carousel";
  carousel.dataset.tennesseeProcessCarousel = "";
  carousel.setAttribute("aria-label", "Socket fabrication photographs");
  carousel.setAttribute("tabindex", "0");

  const stage = document.createElement("div");
  stage.className = "tn-process-carousel__stage";

  const previousButton = document.createElement("button");
  previousButton.className =
    "tn-process-carousel__control tn-process-carousel__control--previous";
  previousButton.type = "button";
  previousButton.dataset.processPrevious = "";
  previousButton.setAttribute("aria-label", "Show previous fabrication photograph");
  previousButton.innerHTML = '<span aria-hidden="true">&#8249;</span>';

  const nextButton = document.createElement("button");
  nextButton.className =
    "tn-process-carousel__control tn-process-carousel__control--next";
  nextButton.type = "button";
  nextButton.dataset.processNext = "";
  nextButton.setAttribute("aria-label", "Show next fabrication photograph");
  nextButton.innerHTML = '<span aria-hidden="true">&#8250;</span>';

  const slides = document.createElement("div");
  slides.className = "tn-process-carousel__slides";

  carouselFigures.forEach((figure, index) => {
    const slide = document.createElement("div");
    slide.className = "tn-process-carousel__slide";
    slide.dataset.processSlide = "";
    slide.setAttribute("aria-hidden", String(index !== 0));
    slide.hidden = index !== 0;
    figure.classList.add("tn-process-carousel__figure");
    slide.appendChild(figure);
    slides.appendChild(slide);
  });

  const dots = document.createElement("div");
  dots.className = "tn-process-carousel__dots";
  dots.setAttribute("aria-label", "Choose a fabrication photograph");

  carouselFigures.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "tn-process-carousel__dot";
    dot.type = "button";
    dot.dataset.processDot = "";
    dot.setAttribute("aria-label", `Show fabrication photograph ${index + 1}`);
    dots.appendChild(dot);
  });

  stage.append(previousButton, slides, nextButton);
  carousel.append(stage, dots);
  originalGallery.insertAdjacentElement("beforebegin", carousel);

  const thermoformingFigure = document
    .querySelector('img[src*="thermoplastic-socket-forming.webp"]')
    ?.closest("figure");

  if (thermoformingFigure) {
    thermoformingFigure.classList.add("tn-process-standalone");
    thermoformingFigure.parentElement?.classList.add(
      "tn-process-gallery--standalone"
    );
  }

  if (!originalGallery.querySelector("figure")) originalGallery.remove();

  const slideElements = Array.from(
    carousel.querySelectorAll("[data-process-slide]")
  );
  const dotElements = Array.from(
    carousel.querySelectorAll("[data-process-dot]")
  );
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slideElements.length) % slideElements.length;

    slideElements.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.hidden = !isActive;
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dotElements.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));

  dotElements.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });

  showSlide(0);
});
