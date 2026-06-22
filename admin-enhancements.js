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
        if (value.session?.access_token) return value.session;
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
    const text = await response.text();
    let payload = [];
    try {
      payload = text ? JSON.parse(text) : [];
    } catch {
      payload = { message: text || "Raspuns invalid de la server." };
    }
    if (response.status === 401) throw new Error("Sesiunea a expirat. Autentifica-te din nou.");
    if (!response.ok) throw new Error([payload.message, payload.details, payload.hint].filter(Boolean).join(" ") || "Operatia nu a reusit.");
    return payload;
  };

  const activePage = () => document.querySelector(".nav-item-active span")?.textContent?.trim() || "";
  const content = () => document.querySelector("main section.px-4.py-6");
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const normalize = (values, nullable = [], numeric = []) => {
    const result = { ...values };
    nullable.forEach((key) => { if (result[key] === "") result[key] = null; });
    numeric.forEach((key) => { result[key] = result[key] === "" || result[key] === null ? null : Number(result[key]); });
    return result;
  };

  const style = document.createElement("style");
  style.textContent = `
    .fc-tools{margin-bottom:20px;border:1px solid rgba(255,255,255,.1);background:#18181bcc;padding:20px;border-radius:16px}
    .fc-tools-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}
    .fc-tools h2{margin:0;font-size:19px}.fc-tools p{color:#a1a1aa}.fc-grid{display:grid;gap:10px}
    .fc-row{display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:10px;align-items:center;padding:12px;border:1px solid rgba(255,255,255,.08);border-radius:12px}
    .fc-btn{border:0;border-radius:10px;padding:9px 12px;background:#06b6d4;color:#09090b;font-weight:700;cursor:pointer}
    .fc-btn-danger{background:#7f1d1d;color:#fff}.fc-input{width:100%;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:#27272a;color:#fafafa;padding:10px}
    .fc-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.fc-form label{color:#a1a1aa;font-size:13px}.fc-form .wide{grid-column:1/-1}
    .fc-inline-form{grid-column:1/-1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;width:100%}.fc-inline-form label{color:#a1a1aa;font-size:12px}.fc-inline-actions{grid-column:1/-1;display:flex;gap:8px}.fc-inline-message{grid-column:1/-1;margin:0;color:#22c55e;font-size:13px}.fc-inline-error{color:#fca5a5}.fc-editable{cursor:pointer}.fc-editable:hover{border-color:rgba(6,182,212,.45)}
    .fc-command{margin-bottom:20px;overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#18181b}
    .fc-command-inner{display:grid;grid-template-columns:1.2fr .8fr;gap:24px;padding:26px}.fc-command-logo{width:76px;height:76px;object-fit:contain}
    .fc-command-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.fc-command-stat{padding:14px;border-radius:12px;background:rgba(255,255,255,.04)}
    @media(max-width:760px){.fc-row{grid-template-columns:1fr}.fc-form,.fc-command-inner{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const inlineEditor = (row, fields, save) => {
    if (row.querySelector("form")) return;
    const original = row.innerHTML;
    row.innerHTML = `<form class="fc-inline-form">${fields.map((field) => `<label>${esc(field.label)}${field.type === "select" ? `<select class="fc-input" name="${field.name}">${field.options.map((option) => `<option value="${esc(option.value)}" ${option.value === field.value ? "selected" : ""}>${esc(option.label)}</option>`).join("")}</select>` : `<input class="fc-input" name="${field.name}" type="${field.type || "text"}" value="${esc(field.value)}">`}</label>`).join("")}<div class="fc-inline-actions"><button class="fc-btn" type="submit">Salveaza</button><button class="fc-btn fc-btn-danger fc-cancel" type="button">Anuleaza</button></div></form>`;
    row.querySelector(".fc-cancel").onclick = () => { row.innerHTML = original; bindDoubleClick(row); };
    row.querySelector("form").onsubmit = async (event) => {
      event.preventDefault();
      try {
        await save(Object.fromEntries(new FormData(event.currentTarget)));
        await render(true);
      } catch (error) { alert(error.message); }
    };
  };

  const bindDoubleClick = (row, handler = row._fcEditHandler) => {
    row._fcEditHandler = handler;
    row.ondblclick = (event) => {
      if (event.target.closest("button,input,select")) return;
      handler?.();
    };
  };

  const panel = (title) => {
    const node = document.createElement("div");
    node.className = "fc-tools";
    node.dataset.fcAdminTools = "true";
    node.innerHTML = `<div class="fc-tools-head"><div><h2>${title}</h2><p style="margin:5px 0 0;font-size:13px">Modificarile sunt salvate direct in Supabase.</p></div></div><div class="fc-grid">Se incarca...</div>`;
    content()?.prepend(node);
    return node.querySelector(".fc-grid");
  };

  const dashboard = async () => {
    const host = content();
    if (!host || host.querySelector("[data-fc-command]")) return;
    const now = new Date().toISOString();
    const [players, stats, profiles, matches] = await Promise.all([
      request("/rest/v1/players?select=first_name,last_name,birth_date,position,team_id,registration_status&registration_status=eq.active"),
      request("/rest/v1/player_stats?select=training_attendance"),
      request("/rest/v1/profiles?select=role"),
      request(`/rest/v1/matches?select=opponent,starts_at&starts_at=gte.${encodeURIComponent(now)}&order=starts_at.asc&limit=1`),
    ]);
    const completenessFields = ["first_name", "last_name", "birth_date", "position", "team_id"];
    const completeness = players.length
      ? Math.round(players.reduce((sum, player) => sum + completenessFields.filter((field) => player[field]).length / completenessFields.length, 0) / players.length * 100)
      : 0;
    const attendanceAverage = stats.length
      ? Math.round(stats.reduce((sum, row) => sum + Number(row.training_attendance || 0), 0) / stats.length)
      : 0;
    const activeRoles = new Set(profiles.map((profile) => profile.role).filter(Boolean)).size;
    const nextMatch = matches[0]
      ? `${matches[0].opponent} · ${new Date(matches[0].starts_at).toLocaleDateString("ro-RO", { day: "2-digit", month: "short" })}`
      : "Neprogramat";
    const node = document.createElement("div");
    node.className = "fc-command";
    node.dataset.fcCommand = "true";
    node.innerHTML = `<div class="fc-command-inner"><div><div style="display:flex;align-items:center;gap:16px"><img class="fc-command-logo" src="./fc-autentic-logo-small.png" alt="FC Autentic logo"><span style="color:#06b6d4;font-size:12px;font-weight:700">Live academy operating system</span></div><h1 style="margin:18px 0 0;font-size:34px">FC Autentic Command Center</h1><p style="margin:10px 0 0;line-height:1.7">Platforma premium pentru loturi, antrenamente, meciuri, documente, roluri si comunicare in timp real.</p></div><div class="fc-command-stats"><div class="fc-command-stat"><small>Completare profiluri</small><strong style="display:block;font-size:22px;margin-top:8px">${completeness}%</strong></div><div class="fc-command-stat"><small>Prezenta medie</small><strong style="display:block;font-size:22px;margin-top:8px">${attendanceAverage}%</strong></div><div class="fc-command-stat"><small>Roluri active</small><strong style="display:block;font-size:22px;margin-top:8px">${activeRoles}</strong></div><div class="fc-command-stat"><small>Urmatorul meci</small><strong style="display:block;font-size:16px;margin-top:8px">${esc(nextMatch)}</strong></div></div></div>`;
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
    grid.innerHTML = rows.map((row) => `<div class="fc-row fc-editable" title="Dublu click pentru schimbarea rolului"><strong>${esc(row.full_name || row.email)}</strong><span>${esc(row.email)}</span><span>${esc(row.role)}</span><small style="color:#a1a1aa">Dublu click</small></div>`).join("");
    [...grid.children].forEach((node, index) => bindDoubleClick(node, () => inlineEditor(node, [{ name: "role", label: "Rol", type: "select", value: rows[index].role, options: ["administrator","director_sportiv","antrenor","jucator","parinte"].map((role) => ({ value: role, label: role })) }], async ({ role }) => {
      await request(`/rest/v1/profiles?id=eq.${rows[index].id}`, { method: "PATCH", body: JSON.stringify({ role }) });
      alert("Rol salvat. Utilizatorul trebuie sa se autentifice din nou.");
    })));
  };

  const players = async (parentsOnly = false) => {
    const grid = panel(parentsOnly ? "Editare parinti si tutori" : "Editare jucatori");
    const rows = await request("/rest/v1/players?select=id,first_name,last_name,birth_date,position,shirt_number,height_cm,weight_kg,dominant_foot,phone,email,guardian_name,guardian_phone,registration_status&order=last_name");
    grid.innerHTML = rows.map((row) => `<div class="fc-row fc-editable" title="Dublu click pentru redactare"><strong>${esc(row.first_name)} ${esc(row.last_name)}</strong><span>${esc(parentsOnly ? row.guardian_name || "Fara tutore" : row.position || "-")}</span><span>${esc(parentsOnly ? row.guardian_phone || "-" : row.email || "-")}</span><small style="color:#a1a1aa">Dublu click</small></div>`).join("");
    [...grid.children].forEach((node, index) => bindDoubleClick(node, () => {
      const row = rows[index];
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
      inlineEditor(node, fields, (values) => request(`/rest/v1/players?id=eq.${row.id}`, { method: "PATCH", body: JSON.stringify(values) }));
    }));
  };

  const originalPlayerTable = async () => {
    const host = content();
    const table = [...(host?.querySelectorAll("table") || [])].find((candidate) =>
      candidate.textContent?.includes("Jucator") &&
      candidate.textContent?.includes("Categorie") &&
      candidate.textContent?.includes("Statistici"),
    );
    if (!table) return;

    const [players, teams] = await Promise.all([
      request("/rest/v1/players?select=id,first_name,last_name,birth_date,position,shirt_number,height_cm,weight_kg,dominant_foot,phone,email,guardian_name,guardian_phone,team_id&registration_status=eq.active&order=last_name"),
      request("/rest/v1/teams?select=id,category,name&order=category"),
    ]);
    const tableRows = [...table.querySelectorAll("tbody tr")];

    tableRows.forEach((tableRow) => {
      if (tableRow.dataset.fcInlineReady === "true") return;
      const email = [...tableRow.querySelectorAll("td")].map((cell) => cell.textContent || "").join(" ");
      const player = players.find((item) => item.email && email.includes(item.email)) ||
        players.find((item) => email.toLowerCase().includes(`${item.first_name} ${item.last_name}`.toLowerCase()));
      if (!player) return;

      tableRow.dataset.fcInlineReady = "true";
      tableRow.classList.add("fc-editable");
      tableRow.title = "Dublu click pentru redactarea jucatorului";
      tableRow.ondblclick = (event) => {
        if (event.target.closest("button,input,select")) return;
        if (tableRow.querySelector("form")) return;
        const original = tableRow.innerHTML;
        const columnCount = table.querySelectorAll("thead th").length || 6;
        tableRow.innerHTML = `<td colspan="${columnCount}" style="padding:16px"><form class="fc-inline-form">
          <label>Prenume<input class="fc-input" name="first_name" value="${esc(player.first_name)}"></label>
          <label>Nume<input class="fc-input" name="last_name" value="${esc(player.last_name)}"></label>
          <label>Data nasterii<input class="fc-input" name="birth_date" type="date" value="${esc(player.birth_date || "")}"></label>
          <label>Categorie<select class="fc-input" name="team_id">
            <option value="">Fara categorie</option>
            ${teams.map((team) => `<option value="${team.id}" ${team.id === player.team_id ? "selected" : ""}>${esc(team.category)} - ${esc(team.name)}</option>`).join("")}
          </select></label>
          <label>Pozitie<input class="fc-input" name="position" value="${esc(player.position || "")}"></label>
          <label>Numar tricou<input class="fc-input" name="shirt_number" type="number" min="1" max="99" value="${esc(player.shirt_number || "")}"></label>
          <label>Inaltime (cm)<input class="fc-input" name="height_cm" type="number" value="${esc(player.height_cm || "")}"></label>
          <label>Greutate (kg)<input class="fc-input" name="weight_kg" type="number" step="0.1" value="${esc(player.weight_kg || "")}"></label>
          <label>Picior dominant<select class="fc-input" name="dominant_foot">
            <option value="">Alege</option>
            <option value="drept" ${player.dominant_foot === "drept" ? "selected" : ""}>Drept</option>
            <option value="stang" ${player.dominant_foot === "stang" ? "selected" : ""}>Stang</option>
            <option value="ambele" ${player.dominant_foot === "ambele" ? "selected" : ""}>Ambele</option>
          </select></label>
          <label>Telefon<input class="fc-input" name="phone" value="${esc(player.phone || "")}"></label>
          <label>Email<input class="fc-input" name="email" type="email" value="${esc(player.email || "")}"></label>
          <label>Tutore<input class="fc-input" name="guardian_name" value="${esc(player.guardian_name || "")}"></label>
          <label>Telefon tutore<input class="fc-input" name="guardian_phone" value="${esc(player.guardian_phone || "")}"></label>
          <div class="fc-inline-actions"><button class="fc-btn" type="submit">Salveaza</button><button class="fc-btn fc-btn-danger fc-cancel" type="button">Anuleaza</button></div>
          <p class="fc-inline-message"></p>
        </form></td>`;
        tableRow.querySelector(".fc-cancel").onclick = () => {
          tableRow.innerHTML = original;
          tableRow.dataset.fcInlineReady = "";
          void originalPlayerTable();
        };
        tableRow.querySelector("form").onsubmit = async (submitEvent) => {
          submitEvent.preventDefault();
          const form = submitEvent.currentTarget;
          const message = form.querySelector(".fc-inline-message");
          const saveButton = form.querySelector('button[type="submit"]');
          const values = normalize(
            Object.fromEntries(new FormData(form)),
            ["birth_date", "team_id", "position", "dominant_foot", "phone", "email", "guardian_name", "guardian_phone"],
            ["shirt_number", "height_cm", "weight_kg"],
          );
          try {
            saveButton.disabled = true;
            saveButton.textContent = "Se salveaza...";
            message.classList.remove("fc-inline-error");
            message.textContent = "";
            await request(`/rest/v1/players?id=eq.${player.id}`, { method: "PATCH", body: JSON.stringify(values) });
            message.textContent = "Modificarile au fost salvate.";
            window.setTimeout(() => window.location.reload(), 500);
          } catch (error) {
            message.classList.add("fc-inline-error");
            message.textContent = error.message;
            saveButton.disabled = false;
            saveButton.textContent = "Salveaza";
          }
        };
      };
    });
  };

  const findTable = (...terms) => [...(content()?.querySelectorAll("table") || [])].find((table) =>
    terms.every((term) => table.textContent?.toLowerCase().includes(term.toLowerCase())),
  );

  const originalUsersTable = async () => {
    const table = findTable("rol", "status");
    if (!table) return;
    const users = await request("/rest/v1/profiles?select=id,full_name,email,phone,role&order=created_at.desc");
    [...table.querySelectorAll("tbody tr")].forEach((row) => {
      if (row.dataset.fcInlineReady) return;
      const text = row.textContent || "";
      const user = users.find((item) => item.email && text.includes(item.email));
      if (!user) return;
      row.dataset.fcInlineReady = "true";
      row.classList.add("fc-editable");
      row.title = "Dublu click pentru redactarea utilizatorului";
      row.ondblclick = (event) => {
        if (event.target.closest("button,input,select") || row.querySelector("form")) return;
        const original = row.innerHTML;
        row.innerHTML = `<td colspan="${table.querySelectorAll("thead th").length || 4}" style="padding:16px"><form class="fc-inline-form">
          <label>Nume<input class="fc-input" name="full_name" value="${esc(user.full_name || "")}"></label>
          <label>Telefon<input class="fc-input" name="phone" value="${esc(user.phone || "")}"></label>
          <label>Rol<select class="fc-input" name="role">${["administrator","director_sportiv","antrenor","jucator","parinte"].map((role) => `<option value="${role}" ${role === user.role ? "selected" : ""}>${role}</option>`).join("")}</select></label>
          <div class="fc-inline-actions"><button class="fc-btn" type="submit">Salveaza</button><button class="fc-btn fc-btn-danger fc-cancel" type="button">Anuleaza</button></div><p class="fc-inline-message"></p>
        </form></td>`;
        row.querySelector(".fc-cancel").onclick = () => { row.innerHTML = original; row.dataset.fcInlineReady = ""; void originalUsersTable(); };
        row.querySelector("form").onsubmit = async (submitEvent) => {
          submitEvent.preventDefault();
          const form = submitEvent.currentTarget;
          const values = normalize(Object.fromEntries(new FormData(form)), ["full_name", "phone"]);
          try {
            await request(`/rest/v1/profiles?id=eq.${user.id}`, { method: "PATCH", body: JSON.stringify(values) });
            form.querySelector(".fc-inline-message").textContent = "Utilizator actualizat. Rolul devine activ la urmatoarea autentificare.";
            setTimeout(() => location.reload(), 700);
          } catch (error) { form.querySelector(".fc-inline-message").classList.add("fc-inline-error"); form.querySelector(".fc-inline-message").textContent = error.message; }
        };
      };
    });
  };

  const originalCoachesTable = async () => {
    const table = findTable("program", "permisiuni");
    if (!table) return;
    const coaches = await request("/rest/v1/coaches?select=*&order=full_name");
    [...table.querySelectorAll("tbody tr")].forEach((row) => {
      if (row.dataset.fcInlineReady) return;
      const text = row.textContent || "";
      const coach = coaches.find((item) => text.toLowerCase().includes(item.full_name.toLowerCase()));
      if (!coach) return;
      row.dataset.fcInlineReady = "true";
      row.classList.add("fc-editable");
      row.title = "Dublu click pentru redactarea antrenorului";
      row.ondblclick = (event) => {
        if (event.target.closest("button,input,select") || row.querySelector("form")) return;
        const original = row.innerHTML;
        row.innerHTML = `<td colspan="${table.querySelectorAll("thead th").length || 6}" style="padding:16px"><form class="fc-inline-form">
          <label>Nume<input class="fc-input" name="full_name" value="${esc(coach.full_name)}"></label><label>Rol<input class="fc-input" name="role_title" value="${esc(coach.role_title)}"></label>
          <label>Telefon<input class="fc-input" name="phone" value="${esc(coach.phone || "")}"></label><label>Email<input class="fc-input" name="email" value="${esc(coach.email || "")}"></label>
          <label>Program<input class="fc-input" name="schedule" value="${esc(coach.schedule || "")}"></label><label>Permisiuni<input class="fc-input" name="permissions" value="${esc(coach.permissions || "")}"></label>
          <div class="fc-inline-actions"><button class="fc-btn" type="submit">Salveaza</button><button class="fc-btn fc-btn-danger fc-cancel" type="button">Anuleaza</button></div><p class="fc-inline-message"></p>
        </form></td>`;
        row.querySelector(".fc-cancel").onclick = () => { row.innerHTML = original; row.dataset.fcInlineReady = ""; void originalCoachesTable(); };
        row.querySelector("form").onsubmit = async (submitEvent) => {
          submitEvent.preventDefault();
          const form = submitEvent.currentTarget;
          try {
            await request(`/rest/v1/coaches?id=eq.${coach.id}`, { method: "PATCH", body: JSON.stringify(normalize(Object.fromEntries(new FormData(form)), ["phone","email","schedule","permissions"])) });
            form.querySelector(".fc-inline-message").textContent = "Antrenor salvat.";
            setTimeout(() => location.reload(), 500);
          } catch (error) { form.querySelector(".fc-inline-message").classList.add("fc-inline-error"); form.querySelector(".fc-inline-message").textContent = error.message; }
        };
      };
    });
  };

  const originalParentsTable = async () => {
    const table = findTable("tutore", "copil") || findTable("guardian", "child");
    if (!table) return;
    const players = await request("/rest/v1/players?select=id,first_name,last_name,email,guardian_name,guardian_phone&order=last_name");
    [...table.querySelectorAll("tbody tr")].forEach((row) => {
      if (row.dataset.fcInlineReady) return;
      const text = row.textContent || "";
      const player = players.find((item) => text.toLowerCase().includes(`${item.first_name} ${item.last_name}`.toLowerCase()) || (item.email && text.includes(item.email)));
      if (!player) return;
      row.dataset.fcInlineReady = "true";
      row.classList.add("fc-editable");
      row.title = "Dublu click pentru redactarea tutorelui";
      row.ondblclick = (event) => {
        if (event.target.closest("button,input") || row.querySelector("form")) return;
        const original = row.innerHTML;
        row.innerHTML = `<td colspan="${table.querySelectorAll("thead th").length || 5}" style="padding:16px"><form class="fc-inline-form">
          <label>Parinte / tutore<input class="fc-input" name="guardian_name" value="${esc(player.guardian_name || "")}"></label>
          <label>Telefon tutore<input class="fc-input" name="guardian_phone" value="${esc(player.guardian_phone || "")}"></label>
          <div class="fc-inline-actions"><button class="fc-btn" type="submit">Salveaza</button><button class="fc-btn fc-btn-danger fc-cancel" type="button">Anuleaza</button></div><p class="fc-inline-message"></p>
        </form></td>`;
        row.querySelector(".fc-cancel").onclick = () => { row.innerHTML = original; row.dataset.fcInlineReady = ""; void originalParentsTable(); };
        row.querySelector("form").onsubmit = async (submitEvent) => {
          submitEvent.preventDefault();
          const form = submitEvent.currentTarget;
          try {
            await request(`/rest/v1/players?id=eq.${player.id}`, { method: "PATCH", body: JSON.stringify(normalize(Object.fromEntries(new FormData(form)), ["guardian_name","guardian_phone"])) });
            form.querySelector(".fc-inline-message").textContent = "Datele tutorelui au fost salvate.";
            setTimeout(() => location.reload(), 500);
          } catch (error) { form.querySelector(".fc-inline-message").classList.add("fc-inline-error"); form.querySelector(".fc-inline-message").textContent = error.message; }
        };
      };
    });
  };

  const originalAttendanceCards = async () => {
    const players = await request("/rest/v1/players?select=id,first_name,last_name,player_stats(training_attendance)&registration_status=eq.active&order=last_name");
    const host = content();
    players.forEach((player) => {
      const card = [...(host?.querySelectorAll("button,div") || [])].find((node) =>
        !node.dataset.fcAttendance &&
        node.children.length > 0 &&
        node.textContent?.toLowerCase().includes(`${player.first_name} ${player.last_name}`.toLowerCase()) &&
        node.textContent?.includes("%"),
      );
      if (!card) return;
      card.dataset.fcAttendance = "true";
      card.title = "Dublu click pentru modificarea prezentei";
      card.ondblclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (card.querySelector(".fc-att-controls")) return;
        const controls = document.createElement("div");
        controls.className = "fc-att-controls";
        controls.style.cssText = "display:flex;gap:7px;margin-top:12px";
        controls.innerHTML = [0,25,50,75,100].map((value) => `<button type="button" class="fc-btn" data-value="${value}">${value}%</button>`).join("");
        controls.querySelectorAll("button").forEach((button) => button.onclick = async (clickEvent) => {
          clickEvent.stopPropagation();
          try {
            await request(`/rest/v1/player_stats?player_id=eq.${player.id}`, { method: "PATCH", body: JSON.stringify({ training_attendance: Number(button.dataset.value), updated_at: new Date().toISOString() }) });
            location.reload();
          } catch (error) { alert(error.message); }
        });
        card.appendChild(controls);
      };
    });
  };

  const originalStatisticsTable = async () => {
    const table = findTable("meciuri", "goluri", "assisturi");
    if (!table) return;
    const players = await request("/rest/v1/players?select=id,first_name,last_name,player_stats(*),player_performance(*)&registration_status=eq.active&order=last_name");
    [...table.querySelectorAll("tbody tr")].forEach((row) => {
      if (row.dataset.fcStatistics) return;
      const text = (row.textContent || "").toLowerCase();
      const player = players.find((item) => text.includes(`${item.first_name} ${item.last_name}`.toLowerCase()));
      if (!player) return;
      const totals = player.player_stats?.[0] || {};
      const performance = player.player_performance?.[0] || {};
      row.dataset.fcStatistics = "true";
      row.classList.add("fc-editable");
      row.title = "Dublu click pentru actualizarea statisticilor";
      row.ondblclick = (event) => {
        if (event.target.closest("button,input") || row.querySelector("form")) return;
        const original = row.innerHTML;
        row.innerHTML = `<td colspan="${table.querySelectorAll("thead th").length || 7}" style="padding:16px"><form class="fc-inline-form">
          <label>Meciuri<input class="fc-input" name="matches" type="number" min="0" value="${Number(totals.matches || 0)}"></label>
          <label>Goluri<input class="fc-input" name="goals" type="number" min="0" value="${Number(totals.goals || 0)}"></label>
          <label>Assisturi<input class="fc-input" name="assists" type="number" min="0" value="${Number(totals.assists || 0)}"></label>
          <label>Cartonase<input class="fc-input" name="cards" type="number" min="0" value="${Number(totals.cards || 0)}"></label>
          <label>Prezenta (%)<input class="fc-input" name="training_attendance" type="number" min="0" max="100" step="0.1" value="${Number(totals.training_attendance || 0)}"></label>
          <label>Rating general<input class="fc-input" name="overall_rating" type="number" min="1" max="99" value="${Number(performance.overall_rating || 60)}"></label>
          <label>Rating mediu<input class="fc-input" name="average_rating" type="number" min="0" max="10" step="0.1" value="${Number(performance.average_rating || 0)}"></label>
          <label>Minute jucate<input class="fc-input" name="minutes_played" type="number" min="0" value="${Number(performance.minutes_played || 0)}"></label>
          <div class="fc-inline-actions"><button class="fc-btn" type="submit">Salveaza</button><button class="fc-btn fc-btn-danger fc-cancel" type="button">Anuleaza</button></div><p class="fc-inline-message"></p>
        </form></td>`;
        row.querySelector(".fc-cancel").onclick = () => { row.innerHTML = original; row.dataset.fcStatistics = ""; void originalStatisticsTable(); };
        row.querySelector("form").onsubmit = async (submitEvent) => {
          submitEvent.preventDefault();
          const form = submitEvent.currentTarget;
          const values = Object.fromEntries(new FormData(form));
          const totalValues = normalize({
            matches: values.matches,
            goals: values.goals,
            assists: values.assists,
            cards: values.cards,
            training_attendance: values.training_attendance,
          }, [], ["matches", "goals", "assists", "cards", "training_attendance"]);
          const performanceValues = normalize({
            overall_rating: values.overall_rating,
            average_rating: values.average_rating,
            minutes_played: values.minutes_played,
          }, [], ["overall_rating", "average_rating", "minutes_played"]);
          try {
            await Promise.all([
              request(`/rest/v1/player_stats?player_id=eq.${player.id}`, { method: "PATCH", body: JSON.stringify({ ...totalValues, updated_at: new Date().toISOString() }) }),
              request(`/rest/v1/player_performance?player_id=eq.${player.id}`, { method: "PATCH", body: JSON.stringify({ ...performanceValues, updated_at: new Date().toISOString() }) }),
            ]);
            form.querySelector(".fc-inline-message").textContent = "Statisticile au fost salvate.";
            setTimeout(() => location.reload(), 600);
          } catch (error) {
            form.querySelector(".fc-inline-message").classList.add("fc-inline-error");
            form.querySelector(".fc-inline-message").textContent = error.message;
          }
        };
      };
    });
  };

  const originalDocumentsTable = async () => {
    const table = findTable("categorie", "creat") || findTable("categorie", "tip");
    if (!table) return;
    const documents = await request("/rest/v1/documents?select=id,name,category,file_type,storage_path&order=created_at.desc");
    [...table.querySelectorAll("tbody tr")].forEach((row) => {
      if (row.dataset.fcDocument) return;
      const documentRow = documents.find((item) => row.textContent?.includes(item.name));
      if (!documentRow) return;
      row.dataset.fcDocument = "true";
      row.classList.add("fc-editable");
      row.title = "Dublu click pentru redactare";
      const actionCell = document.createElement("td");
      actionCell.style.padding = "12px";
      actionCell.innerHTML = '<button type="button" class="fc-btn fc-btn-danger">Sterge</button>';
      actionCell.querySelector("button").onclick = async (event) => {
        event.stopPropagation();
        if (!confirm(`Stergi documentul ${documentRow.name}?`)) return;
        try {
          if (documentRow.storage_path) await request(`/storage/v1/object/club-documents/${documentRow.storage_path.split("/").map(encodeURIComponent).join("/")}`, { method: "DELETE" });
          await request(`/rest/v1/documents?id=eq.${documentRow.id}`, { method: "DELETE" });
          location.reload();
        } catch (error) { alert(error.message); }
      };
      row.appendChild(actionCell);
      row.ondblclick = (event) => {
        if (event.target.closest("button,input") || row.querySelector("form")) return;
        const original = row.innerHTML;
        row.innerHTML = `<td colspan="${table.querySelectorAll("thead th").length + 1}" style="padding:16px"><form class="fc-inline-form">
          <label>Nume document<input class="fc-input" name="name" value="${esc(documentRow.name)}"></label>
          <label>Categorie<input class="fc-input" name="category" value="${esc(documentRow.category)}"></label>
          <label>Tip<input class="fc-input" name="file_type" value="${esc(documentRow.file_type || "")}"></label>
          <div class="fc-inline-actions"><button class="fc-btn" type="submit">Salveaza</button><button class="fc-btn fc-btn-danger fc-cancel" type="button">Anuleaza</button></div><p class="fc-inline-message"></p>
        </form></td>`;
        row.querySelector(".fc-cancel").onclick = () => { row.innerHTML = original; row.dataset.fcDocument = ""; void originalDocumentsTable(); };
        row.querySelector("form").onsubmit = async (submitEvent) => {
          submitEvent.preventDefault();
          const form = submitEvent.currentTarget;
          try {
            await request(`/rest/v1/documents?id=eq.${documentRow.id}`, { method: "PATCH", body: JSON.stringify(normalize(Object.fromEntries(new FormData(form)), ["file_type"])) });
            location.reload();
          } catch (error) { form.querySelector(".fc-inline-message").classList.add("fc-inline-error"); form.querySelector(".fc-inline-message").textContent = error.message; }
        };
      };
    });
  };

  const coaches = async () => {
    const grid = panel("Editare antrenori");
    const rows = await request("/rest/v1/coaches?select=*&order=full_name");
    grid.innerHTML = rows.map((row) => `<div class="fc-row fc-editable" title="Dublu click pentru redactare"><strong>${esc(row.full_name)}</strong><span>${esc(row.role_title)}</span><span>${esc(row.phone || row.email || "-")}</span><small style="color:#a1a1aa">Dublu click</small></div>`).join("");
    [...grid.children].forEach((node, index) => bindDoubleClick(node, () => {
      const row = rows[index];
      inlineEditor(node, [
        { name: "full_name", label: "Nume", value: row.full_name }, { name: "role_title", label: "Rol", value: row.role_title },
        { name: "phone", label: "Telefon", value: row.phone || "" }, { name: "email", label: "Email", value: row.email || "" },
        { name: "schedule", label: "Program", value: row.schedule || "", wide: true }, { name: "permissions", label: "Permisiuni", value: row.permissions || "", wide: true },
      ], (values) => request(`/rest/v1/coaches?id=eq.${row.id}`, { method: "PATCH", body: JSON.stringify(values) }));
    }));
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

  const publicPublishing = async (type) => {
    const isMatch = type === "matches";
    const grid = panel(isMatch ? "Publicare meciuri pe site" : "Publicare program pe site");
    const path = isMatch
      ? "/rest/v1/matches?select=id,opponent,starts_at,is_public&order=starts_at.desc"
      : "/rest/v1/calendar_events?select=id,title,starts_at,event_type,is_public&order=starts_at.desc";
    const rows = await request(path);
    grid.innerHTML = rows.length ? rows.map((row) => `<div class="fc-row">
      <strong>${esc(isMatch ? row.opponent : row.title)}</strong>
      <span>${esc(new Date(row.starts_at).toLocaleString("ro-RO"))}</span>
      <span>${row.is_public ? "Vizibil pe site" : "Doar intern"}</span>
      <button class="fc-btn ${row.is_public ? "fc-btn-danger" : ""}" data-id="${row.id}" data-public="${row.is_public}">${row.is_public ? "Ascunde" : "Publica"}</button>
    </div>`).join("") : '<p style="color:#a1a1aa">Nu exista inregistrari.</p>';
    grid.querySelectorAll("button[data-id]").forEach((button) => {
      button.onclick = async () => {
        const next = button.dataset.public !== "true";
        await request(`/rest/v1/${type}?id=eq.${button.dataset.id}`, {
          method: "PATCH",
          body: JSON.stringify({ is_public: next, updated_at: new Date().toISOString() }),
        });
        await render(true);
      };
    });
  };

  const publicAnnouncements = async () => {
    const grid = panel("Anunturi pe site-ul public");
    const rows = await request("/rest/v1/public_announcements?select=*&order=created_at.desc");
    grid.innerHTML = `<form class="fc-inline-form fc-announcement-create">
      <label>Titlu<input class="fc-input" name="title" required></label>
      <label>Text<input class="fc-input" name="body" required></label>
      <label>Text buton<input class="fc-input" name="link_label"></label>
      <label>Link<input class="fc-input" name="link_url" type="url"></label>
      <div class="fc-inline-actions"><button class="fc-btn" type="submit">Publica anunt</button></div>
      <p class="fc-inline-message"></p>
    </form>
    ${rows.map((row) => `<div class="fc-row">
      <strong>${esc(row.title)}</strong><span>${esc(row.body)}</span>
      <span>${row.is_active ? "Activ" : "Inactiv"}</span>
      <div style="display:flex;gap:6px"><button class="fc-btn fc-toggle-announcement" data-id="${row.id}" data-active="${row.is_active}">${row.is_active ? "Dezactiveaza" : "Activeaza"}</button><button class="fc-btn fc-btn-danger fc-delete-announcement" data-id="${row.id}">Sterge</button></div>
    </div>`).join("")}`;
    grid.querySelector(".fc-announcement-create").onsubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const values = normalize(Object.fromEntries(new FormData(form)), ["link_label", "link_url"]);
      try {
        await request("/rest/v1/public_announcements", { method: "POST", body: JSON.stringify(values) });
        await render(true);
      } catch (error) {
        form.querySelector(".fc-inline-message").classList.add("fc-inline-error");
        form.querySelector(".fc-inline-message").textContent = error.message;
      }
    };
    grid.querySelectorAll(".fc-toggle-announcement").forEach((button) => {
      button.onclick = async () => {
        await request(`/rest/v1/public_announcements?id=eq.${button.dataset.id}`, {
          method: "PATCH",
          body: JSON.stringify({ is_active: button.dataset.active !== "true", updated_at: new Date().toISOString() }),
        });
        await render(true);
      };
    });
    grid.querySelectorAll(".fc-delete-announcement").forEach((button) => {
      button.onclick = async () => {
        if (!confirm("Stergi acest anunt public?")) return;
        await request(`/rest/v1/public_announcements?id=eq.${button.dataset.id}`, { method: "DELETE" });
        await render(true);
      };
    });
  };

  const render = async (force = false) => {
    if (rendering || !document.querySelector("button") || !document.body.textContent?.includes("Admin ON")) return;
    rendering = true;
    try {
      const page = activePage();
      if (page === "Dashboard") await dashboard();
      else removeCommandFromSecondaryPages();
      const host = content();
      if (!host || (!force && host.querySelector("[data-fc-admin-tools]"))) return;
      host.querySelectorAll("[data-fc-admin-tools]").forEach((node) => node.remove());
      if (page === "Utilizatori") await originalUsersTable();
      if (page === "Jucatori") await originalPlayerTable();
      if (page === "Antrenori") await originalCoachesTable();
      if (page === "Parinti") await originalParentsTable();
      if (page === "Prezente") await originalAttendanceCards();
      if (page === "Statistici") await originalStatisticsTable();
      if (page === "Documente") await originalDocumentsTable();
      if (page === "Calendar") await publicPublishing("calendar_events");
      if (page === "Meciuri") await publicPublishing("matches");
      if (page === "Notificari") await publicAnnouncements();
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
