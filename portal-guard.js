(() => {
  let portalPage;

  const removePortalPage = () => {
    portalPage?.remove();
    portalPage = undefined;
  };

  const openLogin = () => {
    const loginButton = [...document.querySelectorAll("button")].find(
      (button) => button.textContent?.trim() === "Login Admin",
    );
    loginButton?.click();
  };

  const render = () => {
    if (window.location.hash !== "#portal-intern") {
      removePortalPage();
      return;
    }

    const buttonTexts = [...document.querySelectorAll("button")].map(
      (button) => button.textContent?.trim(),
    );
    if (buttonTexts.includes("Admin ON")) {
      removePortalPage();
      return;
    }
    if (!buttonTexts.includes("Login Admin") || portalPage?.isConnected) return;

    portalPage = document.createElement("div");
    portalPage.style.cssText =
      "position:fixed;inset:0;z-index:9999;overflow:auto;background:#09090b;color:#fafafa;font-family:Inter,system-ui,sans-serif";
    portalPage.innerHTML = `
      <header style="position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px clamp(20px,5vw,72px);border-bottom:1px solid rgba(255,255,255,.1);background:rgba(9,9,11,.9);backdrop-filter:blur(18px)">
        <button id="portal-home" style="display:flex;align-items:center;gap:12px;border:0;background:none;color:#fafafa;cursor:pointer;text-align:left">
          <img src="./fc-autentic-logo-small.png" alt="FC Autentic" style="width:50px;height:50px;object-fit:contain">
          <span><strong style="display:block;font-size:15px">FC AUTENTIC</strong><small style="color:#a1a1aa">Portal intern al clubului</small></span>
        </button>
        <button id="portal-login" style="border:0;border-radius:12px;padding:12px 18px;background:linear-gradient(90deg,#06b6d4,#8b5cf6);color:#09090b;font-weight:800;cursor:pointer">Logare Admin</button>
      </header>

      <main>
        <section style="min-height:480px;display:grid;align-items:end;padding:72px clamp(20px,7vw,100px);background:linear-gradient(90deg,rgba(9,9,11,.98),rgba(9,9,11,.55)),url('./hero-football.jpg') center/cover">
          <div style="max-width:760px">
            <p style="margin:0;color:#22c55e;font-size:12px;font-weight:800;text-transform:uppercase">Command Center FC Autentic</p>
            <h1 style="margin:14px 0 0;font-size:clamp(40px,7vw,76px);line-height:1">O singura echipa.<br>Toate informatiile.</h1>
            <p style="max-width:650px;margin:22px 0 0;color:#d4d4d8;font-size:17px;line-height:1.75">Portalul intern reuneste loturile clubului, programul, meciurile, prezenta si dezvoltarea jucatorilor intr-un spatiu protejat pentru administratori si staff.</p>
          </div>
        </section>

        <section style="padding:64px clamp(20px,7vw,100px)">
          <div style="max-width:1200px;margin:auto">
            <p style="margin:0;color:#06b6d4;font-size:12px;font-weight:800;text-transform:uppercase">Structura academiei</p>
            <h2 style="margin:10px 0 30px;font-size:clamp(28px,4vw,44px)">Echipe pentru fiecare etapa de dezvoltare</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px">
              ${["U10", "U13", "U15", "U17", "U19", "Seniori"].map((team) => `
                <div style="min-height:130px;padding:22px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#18181b">
                  <strong style="font-size:28px">${team}</strong>
                  <p style="margin:24px 0 0;color:#a1a1aa;font-size:13px">Lot si program dedicat</p>
                </div>`).join("")}
            </div>
          </div>
        </section>

        <section style="padding:0 clamp(20px,7vw,100px) 72px">
          <div style="max-width:1200px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px">
            ${[
              ["Jucatori", "Profiluri individuale, statistici si documente personale."],
              ["Calendar", "Antrenamente, meciuri, turnee si sedinte organizate."],
              ["Performanta", "Prezenta, goluri, pase decisive si evolutia lotului."],
              ["Administrare", "Cereri de inscriere, roluri si acces protejat."]
            ].map(([title, text]) => `
              <article style="padding:26px;border-top:2px solid #16a34a;background:#18181b">
                <h3 style="margin:0;font-size:20px">${title}</h3>
                <p style="margin:12px 0 0;color:#a1a1aa;line-height:1.65">${text}</p>
              </article>`).join("")}
          </div>
        </section>
      </main>
    `;

    document.body.appendChild(portalPage);
    portalPage.querySelector("#portal-login")?.addEventListener("click", openLogin);
    portalPage.querySelector("#portal-home")?.addEventListener("click", () => {
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
