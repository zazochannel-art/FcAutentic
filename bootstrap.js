(() => {
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }

  window.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) {
      event.target.src = "./fc-autentic-logo-small.png";
      event.target.onerror = null;
    }
  }, true);
})();
