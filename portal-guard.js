(() => {
  let overlay;

  const removeOverlay = () => {
    overlay?.remove();
    overlay = undefined;
  };

  const openLogin = () => {
    const loginButton = [...document.querySelectorAll("button")].find(
      (button) => button.textContent?.trim() === "Login Admin",
    );
    loginButton?.click();
  };

  const render = () => {
    if (window.location.hash !== "#portal-intern") {
      removeOverlay();
      return;
    }

    const texts = [...document.querySelectorAll("button")].map((button) =>
      button.textContent?.trim(),
    );
    if (texts.includes("Admin ON")) {
      removeOverlay();
      return;
    }
    if (!texts.includes("Login Admin")) return;
    if (overlay?.isConnected) return;

    overlay = document.createElement("div");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.style.cssText =
      "position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:20px;background:#09090b;color:#fafafa;font-family:Inter,system-ui,sans-serif";
    overlay.innerHTML =
      '<div style="width:min(440px,100%);border:1px solid rgba(255,255,255,.1);background:#18181b;padding:28px;border-radius:18px;box-shadow:0 24px 80px rgba(0,0,0,.45)">' +
      '<img src="./fc-autentic-logo-small.png" alt="FC Autentic" style="width:72px;height:72px;object-fit:contain">' +
      '<p style="margin:20px 0 0;color:#06b6d4;font-size:12px;font-weight:700;text-transform:uppercase">Portal protejat</p>' +
      '<h1 style="margin:8px 0 0;font-size:28px">Autentificare administrator</h1>' +
      '<p style="margin:12px 0 22px;color:#a1a1aa;line-height:1.6">Datele reale ale jucatorilor sunt disponibile numai dupa autentificarea contului Admin.</p>' +
      '<button id="fc-admin-login-open" style="width:100%;border:0;border-radius:14px;padding:13px;background:linear-gradient(90deg,#06b6d4,#8b5cf6);color:#09090b;font-weight:700;cursor:pointer">Intra in contul Admin</button>' +
      '<button id="fc-admin-back" style="width:100%;margin-top:10px;border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;background:transparent;color:#fafafa;cursor:pointer">Inapoi la site</button>' +
      "</div>";
    document.body.appendChild(overlay);
    overlay.querySelector("#fc-admin-login-open")?.addEventListener("click", openLogin);
    overlay.querySelector("#fc-admin-back")?.addEventListener("click", () => {
      window.location.hash = "";
    });
  };

  new MutationObserver(render).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  window.addEventListener("hashchange", render);
  render();
})();
