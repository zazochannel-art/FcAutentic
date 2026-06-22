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
    removePortalPage();
    window.setTimeout(() => loginButton?.click(), 0);
  };

  const render = () => {
    if (window.location.hash !== "#portal-intern") {
      removePortalPage();
      return;
    }

    const buttonTexts = [...document.querySelectorAll("button")].map(
      (button) => button.textContent?.trim(),
    );
    const adminLoginIsOpen = document.body.textContent?.includes("Cont administrator");
    if (adminLoginIsOpen) {
      removePortalPage();
      return;
    }
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
              ${[
                ["U10", "Fundamente tehnice", "Coordonare, controlul mingii si bucuria jocului.", "3 antrenamente / saptamana"],
                ["U13", "Formare competitiva", "Tehnica individuala, curaj si inteligenta de joc.", "4 antrenamente / saptamana"],
                ["U15", "Dezvoltare atletica", "Intensitate, disciplina tactica si pregatire fizica.", "4 antrenamente + meci"],
                ["U17", "Performanta", "Decizii rapide, responsabilitate si competitie regionala.", "5 antrenamente + meci"],
                ["U19", "Tranzitie", "Pregatirea pentru fotbalul de seniori si autonomie.", "Program de performanta"],
                ["Seniori", "Rezultate", "Identitate de joc, leadership si obiective de club.", "Ciclu competitional"]
              ].map(([team, title, text, rhythm]) => `
                <div style="min-height:220px;padding:22px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:#18181b">
                  <strong style="font-size:32px">${team}</strong>
                  <h3 style="margin:22px 0 0;font-size:17px">${title}</h3>
                  <p style="margin:10px 0 0;color:#a1a1aa;font-size:14px;line-height:1.6">${text}</p>
                  <p style="margin:20px 0 0;color:#22c55e;font-size:12px;font-weight:700">${rhythm}</p>
                </div>`).join("")}
            </div>
          </div>
        </section>

        <section style="padding:64px clamp(20px,7vw,100px);border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);background:#111113">
          <div style="max-width:1200px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:48px">
            <div>
              <p style="margin:0;color:#22c55e;font-size:12px;font-weight:800;text-transform:uppercase">Despre echipa</p>
              <h2 style="margin:12px 0 0;font-size:clamp(30px,4vw,48px);line-height:1.1">Formam jucatori.<br>Construim caractere.</h2>
            </div>
            <div>
              <p style="margin:0;color:#d4d4d8;font-size:16px;line-height:1.8">FC Autentic este o comunitate sportiva in care performanta, disciplina si credinta lucreaza impreuna. Fiecare jucator primeste un traseu clar, feedback constant si un mediu in care poate evolua cu incredere.</p>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:28px">
                ${[["6","categorii"],["1","filosofie"],["100%","implicare"]].map(([value,label]) => `<div style="padding:18px 10px;border:1px solid rgba(255,255,255,.1);text-align:center"><strong style="display:block;font-size:24px">${value}</strong><span style="color:#a1a1aa;font-size:11px;text-transform:uppercase">${label}</span></div>`).join("")}
              </div>
            </div>
          </div>
        </section>

        <section style="padding:64px clamp(20px,7vw,100px)">
          <div style="max-width:1200px;margin:auto">
            <p style="margin:0;color:#06b6d4;font-size:12px;font-weight:800;text-transform:uppercase">Traseul jucatorului</p>
            <h2 style="margin:10px 0 32px;font-size:clamp(28px,4vw,44px)">De la evaluare la performanta</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:1px;background:rgba(255,255,255,.1)">
              ${[
                ["01", "Evaluare", "Observam nivelul tehnic, motric si comportamental."],
                ["02", "Integrare", "Alegem categoria si obiectivele potrivite jucatorului."],
                ["03", "Dezvoltare", "Urmarim prezenta, progresul si contributia in meciuri."],
                ["04", "Performanta", "Pregatim jucatorul pentru urmatorul nivel competitiv."]
              ].map(([number,title,text]) => `<article style="min-height:230px;padding:26px;background:#18181b"><span style="color:#06b6d4;font-size:12px;font-weight:800">${number}</span><h3 style="margin:54px 0 0;font-size:22px">${title}</h3><p style="margin:12px 0 0;color:#a1a1aa;line-height:1.65">${text}</p></article>`).join("")}
            </div>
          </div>
        </section>

        <section style="padding:64px clamp(20px,7vw,100px);background:#18181b">
          <div style="max-width:1200px;margin:auto;display:grid;grid-template-columns:minmax(240px,.7fr) minmax(300px,1.3fr);gap:48px">
            <div>
              <p style="margin:0;color:#22c55e;font-size:12px;font-weight:800;text-transform:uppercase">Program orientativ</p>
              <h2 style="margin:12px 0 0;font-size:clamp(28px,4vw,44px)">Ritmul saptamanii</h2>
              <p style="color:#a1a1aa;line-height:1.7">Programul exact si modificarile apar in Command Center dupa autentificare.</p>
            </div>
            <div>
              ${[
                ["Luni", "Tehnica individuala", "U10 · U13"],
                ["Marti", "Tactica si intensitate", "U15 · U17"],
                ["Miercuri", "Pregatire competitiva", "U19 · Seniori"],
                ["Joi", "Jocuri aplicative", "Academie"],
                ["Vineri", "Finalizare si faze fixe", "Performanta"]
              ].map(([day,focus,teams]) => `<div style="display:grid;grid-template-columns:80px 1fr auto;gap:16px;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.1)"><strong>${day}</strong><span>${focus}</span><span style="color:#a1a1aa">${teams}</span></div>`).join("")}
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
