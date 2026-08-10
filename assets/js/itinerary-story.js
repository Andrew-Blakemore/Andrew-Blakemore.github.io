const initializeItineraryStories = () => {
  document.querySelectorAll("[data-itinerary-visit-switcher]").forEach((story) => {
    const navigation = story.querySelector("[data-itinerary-visit-nav]");
    const links = navigation
      ? Array.from(navigation.querySelectorAll("a[href^='#']"))
      : [];
    const visitSections = Array.from(
      story.querySelectorAll("[data-itinerary-visit]")
    );
    const visitGroups = Array.from(
      story.querySelectorAll("[data-itinerary-visit-group]")
    );

    if (!navigation || links.length === 0 || visitSections.length === 0) return;

    const visitForLink = (link) => {
      const target = story.querySelector(link.getAttribute("href"));
      return target?.dataset.itineraryVisit || "";
    };

    const availableVisits = new Set(
      visitSections.map((section) => section.dataset.itineraryVisit)
    );
    const defaultVisit =
      visitForLink(links.find((link) => link.classList.contains("is-active"))) ||
      visitForLink(links[0]);

    const updateGroups = () => {
      visitGroups.forEach((group) => {
        const directVisits = Array.from(group.children).filter((child) =>
          child.matches("[data-itinerary-visit]")
        );
        group.hidden =
          directVisits.length > 0 && directVisits.every((visit) => visit.hidden);
      });
    };

    const showVisit = (requestedVisit, focusTab = false) => {
      const activeVisit = availableVisits.has(requestedVisit)
        ? requestedVisit
        : defaultVisit;

      story.dataset.activeVisit = activeVisit;

      visitSections.forEach((section) => {
        section.hidden = section.dataset.itineraryVisit !== activeVisit;
      });

      updateGroups();

      links.forEach((link) => {
        const isActive = visitForLink(link) === activeVisit;
        link.classList.toggle("is-active", isActive);
        link.setAttribute("aria-selected", String(isActive));
        link.setAttribute("tabindex", isActive ? "0" : "-1");
        if (isActive && focusTab) link.focus();
      });
    };

    navigation.setAttribute("role", "tablist");

    links.forEach((link, index) => {
      link.setAttribute("role", "tab");
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showVisit(visitForLink(link));
      });
      link.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + direction + links.length) % links.length;
        showVisit(visitForLink(links[nextIndex]), true);
      });
    });

    showVisit(defaultVisit);
  });
};

const initializeItineraryScene = () => {
  const hero = document.querySelector(".travel-hero");
  const article = document.querySelector(".travel-page");

  if (hero && article) {
    const updateScene = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.25), 1);

      hero.style.setProperty("--hero-opacity", 1);
      article.style.setProperty("--article-opacity", progress);
    };

    updateScene();
    window.addEventListener("scroll", updateScene, { passive: true });
    window.addEventListener("resize", updateScene);
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });
};

const initializeItineraryFooterLabel = () => {
  const footer = document.querySelector(".page__footer, footer");
  if (!footer) return;

  const headings = Array.from(document.querySelectorAll("h1, h2, h3")).filter(
    (heading) => {
      if (heading.closest(".itinerary-story, .masthead, .page__footer, footer")) {
        return false;
      }

      const text = heading.textContent.replace(/\s+/g, " ").trim();
      return text.length > 0 && text.length < 55;
    }
  );
  const locationHeading = headings[headings.length - 1];
  if (!locationHeading) return;

  const labelElements = [locationHeading];
  const parent = locationHeading.parentElement;

  if (parent) {
    Array.from(parent.children).forEach((child) => {
      if (child === locationHeading) return;
      const text = child.textContent.replace(/\s+/g, " ").trim();
      if (text && text.length < 55 && !child.querySelector("img, video")) {
        labelElements.push(child);
      }
    });
  }

  const footerObserver = new IntersectionObserver(
    (entries) => {
      const hide = entries[0].isIntersecting;
      labelElements.forEach((element) => {
        element.classList.toggle("itinerary-location--footer-hidden", hide);
      });
    },
    { rootMargin: "140px 0px 0px 0px", threshold: 0 }
  );

  footerObserver.observe(footer);
};

const initializeItineraryPage = () => {
  initializeItineraryStories();
  initializeItineraryScene();
  initializeItineraryFooterLabel();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeItineraryPage, {
    once: true,
  });
} else {
  initializeItineraryPage();
}
