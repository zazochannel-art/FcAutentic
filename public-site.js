(() => {
  const portalUrl = window.FC_AUTENTIC_PORTAL_URL || "https://portal.fcautentic.md";
  let timer;

  const isInternalButton = (button) => {
    const text = button.textContent?.trim();
    return text === "Cont jucator" || text === "Portal intern";
  };

  const renderPortalLinks = () => {
    document.querySelectorAll("button").forEach((button) => {
      if (isInternalButton(button)) button.remove();
    });

    const headerActions = document.querySelector(".public-header > div:last-child");
    if (headerActions && !headerActions.querySelector("[data-public-portal]")) {
      const link = document.createElement("a");
      link.dataset.publicPortal = "true";
      link.href = portalUrl;
      link.className = "public-ghost hidden sm:inline-flex";
      link.textContent = "Portal intern";
      headerActions.prepend(link);
    }

    document.querySelectorAll("footer").forEach((footer) => {
      const links = footer.querySelector(".flex.flex-wrap");
      if (!links || links.querySelector("[data-public-portal]")) return;
      const link = document.createElement("a");
      link.dataset.publicPortal = "true";
      link.href = portalUrl;
      link.textContent = "Portal intern";
      links.appendChild(link);
    });
  };

  const enforcePublicRoute = () => {
    if (window.location.hash === "#portal-intern") {
      window.location.replace(`${portalUrl}/#portal-intern`);
      return;
    }
    if (window.location.hash === "#cont-jucator") {
      window.location.replace(`${portalUrl}/#cont-jucator`);
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(renderPortalLinks, 50);
  };

  new MutationObserver(enforcePublicRoute).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  window.addEventListener("hashchange", enforcePublicRoute);
  enforcePublicRoute();
})();
