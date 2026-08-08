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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeItineraryStories, {
    once: true,
  });
} else {
  initializeItineraryStories();
}
