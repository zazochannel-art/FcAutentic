(() => {
  const allowed = new Set(["#portal-intern", "#cont-jucator"]);
  if (!allowed.has(window.location.hash)) {
    history.replaceState(null, "", `${location.pathname}${location.search}#portal-intern`);
  }
})();
