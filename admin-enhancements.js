(() => {
  const URL = "https://lbrsuhssjnffgyyjoxan.supabase.co";
  const KEY = "sb_publishable_fe-Il_S4oyjOWRY3ZXR10Q_Gphxjw5x";
  let rendering = false;

  const session = () => {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith("sb-") || !key.endsWith("-auth-token")) continue;
      try {
        const value = JSON.parse(localStorage.getItem(key) || "{}");
        if (value.access_token) return value;
        if (value.currentSession?.access_token) return value.currentSession;
      } catch {}
    }
    return null;
  };

  const request = async (path, options = {}) => {
    const auth = session();
    const response = await fetch(`${URL}${path}`, {
      ...options,
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${auth?.access_token || KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        ...(options.headers || {}),
      },
    });
    if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || "Operatia nu a reusit.");
    if (response.status === 204) return [];
    return response.json();
  };

  const activePage = () => document.querySelector(".nav-item-active span")?.textContent?.trim() || "";
  const content = () => document.querySelector("main section.px-4.py-6");
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  const style = document.createElement("style");
  style.textContent = `
    .fc-tools{margin-bottom:20px;border:1px solid rgba(255,255,255,.1);background:#18181bcc;padding:20px;border-radius:16px}
    .fc-tools-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}
    .fc-tools h2{margin:0;font-size:19px}.fc-tools p{color:#a1a1aa}.fc-grid{display:grid;gap:10px}
    .fc-row{display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:10px;align-items:center;padding:12px;border:1px solid rgba(255,255,255,.08);border-radius:12px}
    .fc-btn{border:0;border-radius:10px;padding:9px 12px;background:#06b6d4;color:#09090b;font-weight:700;cursor:pointer}
    .fc-btn-danger{background:#7f1d1d;color:#fff}.fc-input{width:100%;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:#27272a;color:#fafafa;padding:10px}
    .fc-modal{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px;background:rgba(0,0,0,.75)}
    .fc-modal-card{width:min(620px,100%);max-height:90vh;overflow:auto;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:#18181b;padding:22px}
    .fc-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.fc-form label{color:#a1a1aa;font-size:13px}.fc-form .wide{grid-column:1/-1}
    .fc-command{margin-bottom:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#18181b}
    .fc-command-inner{display:grid;grid-template-columns:1.2fr .8fr;gap:24px;padding:26px}.fc-command-logo{width:76px;height:76px;object-fit:contain}
    .fc-command-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.fc-command-stat{padding:14px;border-radius:12px;background:rgba(255,255,255,.04)}
    @media(max-width:760px){.fc-row{grid-template-columns:1fr}.fc-form,.fc-command-inner{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const modal = (title, fields, save) => {
    const node = document.createElement("div");
    node.className = "fc-modal";
    node.innerHTML = `<div class="fc-modal-card"><div class="fc-tools-head"><h2>${esc(title)}</h2><button class="fc-btn fc-close">Inchide</button></div><form class="fc-form">${fields.map((field) => `<label class="${field.wide ? "wide" : ""}">${esc(field.label)}${field.type === "select" ? `<select class="fc-input" name="${field.name}">${field.options.map((option) => `<option value="${esc(option.value)}" ${option.value === field.value ? "selected" : ""}>${esc(option.label)}</option>`).join("")}</select>` : `<input class="fc-input" name="${field.name}" type="${field.type || "text"}" value="${esc(field.value)}">`}</label>`).join("")}<button class="fc-btn wide" type="submit">Salveaza modificarile</button></form></div>`;
    node.querySelector(".fc-close").onclick = () => node.remove();
    node.onclick = (event) => { if (event.target === node) node.remove(); };
    node.querySelector("form").onsubmit = async (event) => {
      event.preventDefault();
      try {
        await save(Object.fromEntries(new FormData(event.currentTarget)));
        node.remove();
        await render(true);
      } catch (error) { alert(error.message); }
    };
    document.body.appendChild(node);
  };

  const panel = (title) => {
    const node = document.createElement("div");
    node.className = "fc-tools";
    node.dataset.fcAdminTools = "true";
    node.innerHTML = `<div class="fc-tools-head"><div><h2>${title}</h2><p style="margin:5px 0 0;font-size:13px">Modificarile sunt salvate direct in Supabase.</p></div></div><div class="fc-grid">Se incarca...</div>`;
    content()?.prepend(node);
    return node.querySelector(".fc-grid");
  };

  const dashboard = () => {
    const host = content();
    if (!host || host.querySelector("[data-fc-command]")) return;
    const node = document.createElement("div");
    node.className = "fc-command";
    node.dataset.fcCommand = "true";
    node.innerHTML = `<div class="fc-command-inner"><div><div style="display:flex;align-items:center;gap:16px"><img class="fc-command-logo" src="./fc-autentic-logo-small.png" alt="FC Autentic logo"><span style="color:#06b6d4;font-size:12px;font-weight:700">Live academy operating system</span></div><h1 style="margin:18px 0 0;font-size:34px">FC Autentic Command Center</h1><p style="margin:10px 0 0;line-height:1.7">Platforma premium pentru loturi, antrenamente, meciuri, documente, roluri si comunicare in timp real.</p></div><div class="fc-command-stats"><div class="fc-command-stat"><small>Health score</small><strong style="display:block;font-size:22px;margin-top:8px">96%</strong></div><div class="fc-command-stat"><small>Attendance</small><strong style="display:block;font-size:22px;margin-top:8px">91%</strong></div><div class="fc-command-stat"><small>Active roles</small><strong style="display:block;font-size:22px;margin-top:8px">5</strong></div><div class="fc-command-stat"><small>Next match</small><strong style="display:block;font-size:22px;margin-top:8px">20 Iun</strong></div></div></div>`;
    host.prepend(node);
  };

  const removeCommandFromSecondaryPages = () => {
    [...document.querySelectorAll("div")].filter((node) => node.textContent?.includes("Live academy operating system")).forEach((node) => {
      const block = node.closest(".mb-6");
      if (block) block.remove();
    });
  };

  const users = async () => {
    const grid = panel("Editare roluri utilizatori");
    const rows = await request("/rest/v1/profiles?select=id,full_name,email,role&order=created_at.desc");
    grid.innerHTML = rows.map((row) => `<div class="fc-row"><strong>${esc(row.full_name || row.email)}</strong><span>${esc(row.email)}</span><select class="fc-input fc-role" data-id="${row.id}">${["administrator","director_sportiv","antrenor","jucator","parinte"].map((role) => `<option ${role === row.role ? "selected" : ""}>${role}</option>`).join("")}</select><button class="fc-btn fc-role-save" data-id="${row.id}">Salveaza</button></div>`).join("");
    grid.querySelectorAll(".fc-role-save").forEach((button) => button.onclick = async () => {
      const role = grid.querySelector(`.fc-role[data-id="${button.dataset.id}"]`).value;
      await request(`/rest/v1/profiles?id=eq.${button.dataset.id}`, { method: "PATCH", body: JSON.stringify({ role }) });
      alert("Rol salvat. Utilizatorul trebuie sa se autentifice din nou.");
    });
  };

  const players = async (parentsOnly = false) => {
    const grid = panel(parentsOnly ? "Editare parinti si tutori" : "Editare jucatori");
    const rows = await request("/rest/v1/players?select=id,first_name,last_name,birth_date,position,shirt_number,height_cm,weight_kg,dominant_foot,phone,email,guardian_name,guardian_phone,registration_status&order=last_name");
    grid.innerHTML = rows.map((row) => `<div class="fc-row"><strong>${esc(row.first_name)} ${esc(row.last_name)}</strong><span>${esc(parentsOnly ? row.guardian_name || "Fara tutore" : row.position || "-")}</span><span>${esc(parentsOnly ? row.guardian_phone || "-" : row.email || "-")}</span><button class="fc-btn fc-edit" data-id="${row.id}">Redacteaza</button></div>`).join("");
    grid.querySelectorAll(".fc-edit").forEach((button) => button.onclick = () => {
      const row = rows.find((item) => item.id === button.dataset.id);
      const fields = parentsOnly ? [
        { name: "guardian_name", label: "Parinte / tutore", value: row.guardian_name || "" },
        { name: "guardian_phone", label: "Telefon tutore", value: row.guardian_phone || "" },
      ] : [
        { name: "first_name", label: "Prenume", value: row.first_name }, { name: "last_name", label: "Nume", value: row.last_name },
        { name: "birth_date", label: "Data nasterii", type: "date", value: row.birth_date || "" }, { name: "position", label: "Pozitie", value: row.position || "" },
        { name: "shirt_number", label: "Numar tricou", type: "number", value: row.shirt_number || "" }, { name: "height_cm", label: "Inaltime", type: "number", value: row.height_cm || "" },
        { name: "weight_kg", label: "Greutate", type: "number", value: row.weight_kg || "" }, { name: "phone", label: "Telefon", value: row.phone || "" },
        { name: "guardian_name", label: "Tutore", value: row.guardian_name || "" }, { name: "guardian_phone", label: "Telefon tutore", value: row.guardian_phone || "" },
      ];
      modal(parentsOnly ? "Redacteaza tutorele" : "Redacteaza jucatorul", fields, (values) => request(`/rest/v1/players?id=eq.${row.id}`, { method: "PATCH", body: JSON.stringify(values) }));
    });
  };

  const coaches = async () => {
    const grid = panel("Editare antrenori");
    const rows = await request("/rest/v1/coaches?select=*&order=full_name");
    grid.innerHTML = rows.map((row) => `<div class="fc-row"><strong>${esc(row.full_name)}</strong><span>${esc(row.role_title)}</span><span>${esc(row.phone || row.email || "-")}</span><button class="fc-btn fc-edit" data-id="${row.id}">Redacteaza</button></div>`).join("");
    grid.querySelectorAll(".fc-edit").forEach((button) => button.onclick = () => {
      const row = rows.find((item) => item.id === button.dataset.id);
      modal("Redacteaza antrenorul", [
        { name: "full_name", label: "Nume", value: row.full_name }, { name: "role_title", label: "Rol", value: row.role_title },
        { name: "phone", label: "Telefon", value: row.phone || "" }, { name: "email", label: "Email", value: row.email || "" },
        { name: "schedule", label: "Program", value: row.schedule || "", wide: true }, { name: "permissions", label: "Permisiuni", value: row.permissions || "", wide: true },
      ], (values) => request(`/rest/v1/coaches?id=eq.${row.id}`, { method: "PATCH", body: JSON.stringify(values) }));
    });
  };

  const attendance = async () => {
    const grid = panel("Prezente rapide");
    const rows = await request("/rest/v1/players?select=id,first_name,last_name,player_stats(training_attendance)&registration_status=eq.active&order=last_name");
    grid.innerHTML = rows.map((row) => `<div class="fc-row"><strong>${esc(row.first_name)} ${esc(row.last_name)}</strong><span>Prezenta curenta</span><strong class="fc-att-value" data-id="${row.id}">${Number(row.player_stats?.[0]?.training_attendance || 0)}%</strong><div style="display:flex;gap:6px"><button class="fc-btn fc-att" data-id="${row.id}" data-value="0">0%</button><button class="fc-btn fc-att" data-id="${row.id}" data-value="50">50%</button><button class="fc-btn fc-att" data-id="${row.id}" data-value="100">100%</button></div></div>`).join("");
    grid.querySelectorAll(".fc-att").forEach((button) => button.onclick = async () => {
      await request(`/rest/v1/player_stats?player_id=eq.${button.dataset.id}`, { method: "PATCH", body: JSON.stringify({ training_attendance: Number(button.dataset.value), updated_at: new Date().toISOString() }) });
      grid.querySelector(`.fc-att-value[data-id="${button.dataset.id}"]`).textContent = `${button.dataset.value}%`;
    });
  };

  const documents = async () => {
    const grid = panel("Gestionare documente");
    const rows = await request("/rest/v1/documents?select=id,name,category,storage_path,created_at&order=created_at.desc");
    grid.innerHTML = rows.map((row) => `<div class="fc-row"><strong>${esc(row.name)}</strong><span>${esc(row.category)}</span><span>${new Date(row.created_at).toLocaleDateString("ro-RO")}</span><button class="fc-btn fc-btn-danger fc-delete" data-id="${row.id}">Sterge</button></div>`).join("");
    grid.querySelectorAll(".fc-delete").forEach((button) => button.onclick = async () => {
      const row = rows.find((item) => item.id === button.dataset.id);
      if (!confirm(`Stergi documentul ${row.name}?`)) return;
      if (row.storage_path) await request(`/storage/v1/object/club-documents/${row.storage_path.split("/").map(encodeURIComponent).join("/")}`, { method: "DELETE", headers: { "Content-Type": "application/json" } });
      await request(`/rest/v1/documents?id=eq.${row.id}`, { method: "DELETE" });
      await render(true);
    });
  };

  const render = async (force = false) => {
    if (rendering || !document.querySelector("button") || !document.body.textContent?.includes("Admin ON")) return;
    rendering = true;
    try {
      const page = activePage();
      if (page === "Dashboard") dashboard();
      else removeCommandFromSecondaryPages();
      const host = content();
      if (!host || (!force && host.querySelector("[data-fc-admin-tools]"))) return;
      host.querySelectorAll("[data-fc-admin-tools]").forEach((node) => node.remove());
      if (page === "Utilizatori") await users();
      if (page === "Jucatori") await players();
      if (page === "Antrenori") await coaches();
      if (page === "Parinti") await players(true);
      if (page === "Prezente") await attendance();
      if (page === "Documente") await documents();
    } catch (error) { console.error(error); }
    finally { rendering = false; }
  };

  let timer;
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => render(), 120);
  }).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => render(true));
  render();
})();
