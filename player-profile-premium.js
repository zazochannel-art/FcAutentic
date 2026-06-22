(() => {
  const SUPABASE_URL = "https://lbrsuhssjnffgyyjoxan.supabase.co";
  const SUPABASE_KEY = "sb_publishable_fe-Il_S4oyjOWRY3ZXR10Q_Gphxjw5x";
  const ROOT_ID = "fc-player-premium";
  let rendering = false;
  let lastToken = "";

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);

  const getSession = () => {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith("sb-") || !key.endsWith("-auth-token")) continue;
      try {
        const value = JSON.parse(localStorage.getItem(key) || "{}");
        const current = value.access_token
          ? value
          : value.currentSession?.access_token
            ? value.currentSession
            : value.session?.access_token
              ? value.session
              : null;
        if (current) return current;
      } catch {}
    }
    return null;
  };

  const request = async (path, options = {}) => {
    const auth = getSession();
    const isBinary = options.body instanceof Blob || options.body instanceof File;
    const response = await fetch(`${SUPABASE_URL}${path}`, {
      ...options,
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${auth?.access_token || SUPABASE_KEY}`,
        ...(!isBinary ? { "Content-Type": "application/json" } : {}),
        Prefer: "return=representation",
        ...(options.headers || {}),
      },
    });
    const text = await response.text();
    let payload = [];
    try {
      payload = text ? JSON.parse(text) : [];
    } catch {
      payload = text;
    }
    if (response.status === 401) {
      throw new Error("Sesiunea a expirat. Autentifica-te din nou.");
    }
    if (!response.ok) {
      throw new Error(
        [payload?.message, payload?.details, payload?.hint].filter(Boolean).join(" ") ||
          "Operatia nu a reusit.",
      );
    }
    return payload;
  };

  const one = (value) => Array.isArray(value) ? value[0] || null : value || null;
  const number = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const dateRo = (value) => {
    if (!value) return "Necompletat";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Data invalida";
    return new Intl.DateTimeFormat("ro-RO", { day: "2-digit", month: "short", year: "numeric" }).format(date);
  };
  const age = (birthDate) => {
    if (!birthDate) return null;
    const born = new Date(birthDate);
    const now = new Date();
    let result = now.getFullYear() - born.getFullYear();
    if (
      now.getMonth() < born.getMonth() ||
      (now.getMonth() === born.getMonth() && now.getDate() < born.getDate())
    ) result -= 1;
    return result;
  };

  const style = document.createElement("style");
  style.textContent = `
    #${ROOT_ID}{position:fixed;inset:0;z-index:9500;overflow:auto;background:#09090b;color:#fafafa;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;letter-spacing:0}
    #${ROOT_ID} *{box-sizing:border-box}
    .pp-shell{min-height:100%;background:radial-gradient(circle at 75% 0,rgba(6,182,212,.08),transparent 30%),#09090b}
    .pp-topbar{position:sticky;top:0;z-index:30;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:12px clamp(16px,4vw,52px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(9,9,11,.86);backdrop-filter:blur(20px)}
    .pp-brand,.pp-actions,.pp-profile-main,.pp-identity,.pp-tabs,.pp-modal-actions{display:flex;align-items:center}
    .pp-brand{gap:12px;border:0;background:none;color:#fafafa;cursor:pointer;text-align:left}.pp-brand img{width:44px;height:44px;object-fit:contain}.pp-brand strong{display:block;font-size:14px}.pp-brand span{display:block;color:#71717a;font-size:11px}
    .pp-actions{gap:8px}.pp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:42px;padding:0 14px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:#18181b;color:#fafafa;font-weight:750;cursor:pointer;transition:transform .25s,border-color .25s,background .25s}.pp-btn:hover{transform:translateY(-1px);border-color:rgba(6,182,212,.55);background:#202024}.pp-btn-primary{border:0;background:linear-gradient(100deg,#16a34a,#22c55e);color:#061109}.pp-btn-cyan{border:0;background:linear-gradient(100deg,#06b6d4,#8b5cf6);color:#fff}.pp-icon-btn{width:42px;padding:0}
    .pp-main{width:min(1440px,100%);margin:auto;padding:28px clamp(14px,3vw,38px) 70px}
    .pp-hero{position:relative;overflow:hidden;min-height:340px;border:1px solid rgba(255,255,255,.1);border-radius:20px;background:linear-gradient(120deg,rgba(24,24,27,.98),rgba(15,40,33,.92)),url('./hero-football.jpg') center/cover;box-shadow:0 25px 80px rgba(0,0,0,.28)}
    .pp-hero:after{content:"";position:absolute;inset:auto -8% -62% 42%;height:360px;border:1px solid rgba(34,197,94,.18);border-radius:50%}
    .pp-hero-inner{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:28px;min-height:340px;padding:32px}
    .pp-profile-main{align-items:flex-end;gap:26px}.pp-avatar-wrap{position:relative;flex:0 0 auto}.pp-avatar{width:170px;height:205px;border:1px solid rgba(255,255,255,.16);border-radius:18px;object-fit:cover;object-position:center top;background:#27272a;box-shadow:0 24px 54px rgba(0,0,0,.35)}.pp-number{position:absolute;right:-10px;bottom:14px;display:grid;place-items:center;width:58px;height:58px;border:4px solid #18181b;border-radius:50%;background:#22c55e;color:#07120b;font-size:22px;font-weight:900}
    .pp-kicker{margin:0 0 10px;color:#22c55e;font-size:11px;font-weight:850;text-transform:uppercase}.pp-name{margin:0;font-size:clamp(34px,5vw,66px);line-height:.98}.pp-identity{flex-wrap:wrap;gap:8px;margin-top:18px}.pp-pill{padding:7px 10px;border:1px solid rgba(255,255,255,.11);border-radius:999px;background:rgba(9,9,11,.45);color:#d4d4d8;font-size:12px;font-weight:700}.pp-pill-accent{border-color:rgba(34,197,94,.35);color:#86efac}
    .pp-fifa-launch{width:230px;min-height:142px;padding:20px;border:1px solid rgba(6,182,212,.22);border-radius:18px;background:linear-gradient(145deg,rgba(6,182,212,.14),rgba(139,92,246,.12));color:#fafafa;text-align:left;cursor:pointer;transition:transform .25s,border-color .25s}.pp-fifa-launch:hover{transform:translateY(-4px);border-color:#06b6d4}.pp-fifa-launch span{display:block;color:#67e8f9;font-size:11px;font-weight:800;text-transform:uppercase}.pp-fifa-launch strong{display:block;margin-top:12px;font-size:22px}.pp-fifa-launch small{display:block;margin-top:10px;color:#a1a1aa;line-height:1.5}
    .pp-stats{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px;margin-top:14px}.pp-stat{min-height:118px;padding:18px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:#18181b;transition:transform .25s,border-color .25s}.pp-stat:hover{transform:translateY(-3px);border-color:rgba(34,197,94,.3)}.pp-stat-label{color:#a1a1aa;font-size:12px}.pp-stat-value{display:block;margin-top:17px;font-size:29px;line-height:1}.pp-stat-sub{display:block;margin-top:9px;color:#71717a;font-size:11px}
    .pp-tabs{position:sticky;top:69px;z-index:20;gap:6px;margin:22px 0 16px;padding:6px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(24,24,27,.88);backdrop-filter:blur(16px)}.pp-tab{flex:1;min-height:42px;border:0;border-radius:10px;background:transparent;color:#a1a1aa;font-weight:750;cursor:pointer}.pp-tab.active{background:#27272a;color:#fafafa;box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
    .pp-panel{display:none}.pp-panel.active{display:block;animation:ppFade .25s ease}.pp-grid-2{display:grid;grid-template-columns:1.1fr .9fr;gap:14px}.pp-card{padding:22px;border:1px solid rgba(255,255,255,.08);border-radius:20px;background:#18181b}.pp-card h2{margin:0;font-size:18px}.pp-card-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px}.pp-card-head p{margin:5px 0 0;color:#71717a;font-size:12px}
    .pp-details{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:rgba(255,255,255,.07)}.pp-detail{min-height:84px;padding:16px;background:#18181b}.pp-detail span{display:block;color:#71717a;font-size:11px;text-transform:uppercase}.pp-detail strong{display:block;margin-top:9px;font-size:15px}
    .pp-chart{display:flex;align-items:flex-end;gap:10px;height:210px;padding-top:18px}.pp-chart-col{display:flex;flex:1;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;gap:9px}.pp-chart-bar{width:min(42px,70%);min-height:4px;border-radius:7px 7px 2px 2px;background:linear-gradient(#22c55e,#06b6d4);box-shadow:0 0 24px rgba(34,197,94,.12);transition:height .5s}.pp-chart-col small{color:#71717a;font-size:10px}.pp-progress-list{display:grid;gap:16px}.pp-progress-top{display:flex;justify-content:space-between;margin-bottom:7px;font-size:12px}.pp-progress-track{height:8px;border-radius:999px;background:#27272a;overflow:hidden}.pp-progress-fill{height:100%;border-radius:inherit;background:linear-gradient(90deg,#22c55e,#06b6d4)}
    .pp-list{display:grid;gap:10px}.pp-list-item{display:grid;grid-template-columns:minmax(180px,1.4fr) repeat(4,minmax(80px,.5fr));align-items:center;gap:12px;padding:16px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:#18181b}.pp-list-item:hover{border-color:rgba(6,182,212,.3)}.pp-list-main strong{display:block}.pp-list-main span,.pp-list-cell span{display:block;margin-top:5px;color:#71717a;font-size:11px}.pp-list-cell strong{font-size:14px}.pp-result{display:inline-flex!important;width:max-content;padding:5px 8px;border-radius:8px;background:rgba(34,197,94,.12);color:#86efac!important;font-weight:800}.pp-empty{padding:54px 20px;border:1px dashed rgba(255,255,255,.12);border-radius:16px;color:#71717a;text-align:center}
    .pp-modal{position:fixed;inset:0;z-index:9800;display:grid;place-items:center;padding:18px;background:rgba(0,0,0,.78);backdrop-filter:blur(10px)}.pp-modal-card{width:min(760px,100%);max-height:92vh;overflow:auto;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:#18181b;box-shadow:0 30px 100px rgba(0,0,0,.55)}.pp-modal-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(24,24,27,.94);backdrop-filter:blur(14px)}.pp-modal-head h2{margin:0;font-size:18px}.pp-modal-body{padding:22px}.pp-modal-actions{justify-content:flex-end;flex-wrap:wrap;gap:8px;padding:0 22px 22px}
    .pp-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.pp-form label{display:grid;gap:7px;color:#a1a1aa;font-size:12px}.pp-form .wide{grid-column:1/-1}.pp-input{width:100%;min-height:44px;padding:10px 12px;border:1px solid rgba(255,255,255,.12);border-radius:11px;background:#09090b;color:#fafafa;outline:none}.pp-input:focus{border-color:#06b6d4}.pp-switches{display:grid;gap:10px}.pp-switch{display:flex;align-items:center;justify-content:space-between;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:12px}.pp-switch input{width:19px;height:19px;accent-color:#22c55e}
    .pp-settings-nav{display:flex;gap:7px;overflow:auto;margin-bottom:18px}.pp-settings-tab{white-space:nowrap;padding:9px 11px;border:1px solid rgba(255,255,255,.09);border-radius:10px;background:#27272a;color:#a1a1aa;cursor:pointer}.pp-settings-tab.active{border-color:#06b6d4;color:#fafafa}.pp-settings-panel{display:none}.pp-settings-panel.active{display:block}
    .pp-player-card{position:relative;width:min(410px,86vw);aspect-ratio:.72;margin:auto;padding:34px 30px 26px;overflow:hidden;border:1px solid rgba(255,255,255,.3);border-radius:28px;background:radial-gradient(circle at 50% 28%,rgba(103,232,249,.28),transparent 25%),linear-gradient(145deg,#111827 0%,#0e7490 46%,#4c1d95 100%);box-shadow:0 30px 90px rgba(6,182,212,.22)}.pp-player-card:before{content:"";position:absolute;inset:12px;border:1px solid rgba(255,255,255,.28);border-radius:21px;pointer-events:none}.pp-card-rating{position:absolute;z-index:1;top:48px;left:42px;text-align:center}.pp-card-rating strong{display:block;font-size:50px;line-height:.9}.pp-card-rating span{font-size:15px;font-weight:900}.pp-card-photo{display:block;width:69%;height:47%;margin:16px auto 0;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 18px 20px rgba(0,0,0,.4))}.pp-card-name{position:relative;margin:3px 0 12px;text-align:center;font-size:27px;text-transform:uppercase}.pp-card-team{position:relative;text-align:center;color:#cffafe;font-size:12px;font-weight:800}.pp-card-metrics{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:18px;padding-top:16px;border-top:1px solid rgba(255,255,255,.32)}.pp-card-metric{text-align:center}.pp-card-metric strong{display:block;font-size:20px}.pp-card-metric span{font-size:10px;font-weight:800;text-transform:uppercase}.pp-card-logo{position:absolute;right:35px;top:38px;width:46px;height:46px;object-fit:contain}
    .pp-toast{position:fixed;right:18px;bottom:18px;z-index:9900;max-width:360px;padding:14px 17px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:#18181b;color:#fafafa;box-shadow:0 18px 50px rgba(0,0,0,.4);animation:ppFade .25s ease}.pp-toast.error{border-color:rgba(248,113,113,.45);color:#fecaca}
    .pp-loading{display:grid;place-items:center;min-height:100vh;color:#a1a1aa}.pp-spinner{width:38px;height:38px;margin-bottom:15px;border:3px solid #27272a;border-top-color:#22c55e;border-radius:50%;animation:ppSpin .8s linear infinite}
    @keyframes ppSpin{to{transform:rotate(360deg)}}@keyframes ppFade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
    @media(max-width:1100px){.pp-stats{grid-template-columns:repeat(3,1fr)}.pp-grid-2{grid-template-columns:1fr}.pp-list-item{grid-template-columns:minmax(170px,1.3fr) repeat(3,minmax(75px,.5fr))}.pp-list-item>:last-child{display:none}}
    @media(max-width:760px){.pp-topbar{padding:10px 14px}.pp-brand span,.pp-actions .pp-settings-label{display:none}.pp-main{padding:14px 10px 50px}.pp-hero-inner{grid-template-columns:1fr;padding:22px;align-items:start}.pp-profile-main{align-items:center;gap:17px}.pp-avatar{width:108px;height:132px}.pp-number{width:44px;height:44px;font-size:17px}.pp-name{font-size:clamp(28px,9vw,42px)}.pp-fifa-launch{width:100%;min-height:auto}.pp-stats{grid-template-columns:repeat(2,1fr);gap:8px}.pp-stat{min-height:104px;padding:14px}.pp-tabs{top:64px;overflow:auto}.pp-tab{min-width:125px}.pp-card{padding:17px}.pp-details,.pp-form{grid-template-columns:1fr}.pp-form .wide{grid-column:auto}.pp-list-item{grid-template-columns:1fr 1fr}.pp-list-item>:nth-child(n+4){display:none}.pp-list-main{grid-column:1/-1}.pp-modal{padding:8px;align-items:end}.pp-modal-card{max-height:96vh;border-radius:18px 18px 0 0}.pp-player-card{width:min(360px,88vw)}}
  `;
  document.head.appendChild(style);

  const toast = (message, isError = false) => {
    document.querySelector(".pp-toast")?.remove();
    const element = document.createElement("div");
    element.className = `pp-toast${isError ? " error" : ""}`;
    element.textContent = message;
    document.body.appendChild(element);
    window.setTimeout(() => element.remove(), 3200);
  };

  const closeModal = () => document.querySelector(`#${ROOT_ID} .pp-modal`)?.remove();

  const metric = (label, value, sub) => `
    <article class="pp-stat">
      <span class="pp-stat-label">${esc(label)}</span>
      <strong class="pp-stat-value">${esc(value)}</strong>
      <span class="pp-stat-sub">${esc(sub)}</span>
    </article>`;

  const detail = (label, value) => `
    <div class="pp-detail"><span>${esc(label)}</span><strong>${esc(value || "Necompletat")}</strong></div>`;

  const progress = (label, value) => {
    const safe = Math.max(0, Math.min(100, number(value)));
    return `<div><div class="pp-progress-top"><span>${esc(label)}</span><strong>${safe}</strong></div><div class="pp-progress-track"><div class="pp-progress-fill" style="width:${safe}%"></div></div></div>`;
  };

  const loadData = async (uid) => {
    const players = await request(
      `/rest/v1/players?select=*,teams(id,name,category),player_stats(*),player_performance(*)&profile_id=eq.${encodeURIComponent(uid)}&limit=1`,
    );
    const player = players[0];
    if (!player) return null;

    const [profiles, matchStats, matches, attendance] = await Promise.all([
      request(`/rest/v1/profiles?select=*&id=eq.${encodeURIComponent(uid)}&limit=1`),
      request(`/rest/v1/player_match_stats?select=*,matches(*)&player_id=eq.${player.id}&order=created_at.desc`),
      player.team_id
        ? request(`/rest/v1/matches?select=*&team_id=eq.${player.team_id}&order=starts_at.desc`)
        : Promise.resolve([]),
      request(`/rest/v1/attendance_records?select=*,calendar_events(*)&player_id=eq.${player.id}&order=attended_on.desc`),
    ]);

    return {
      player,
      profile: profiles[0] || {},
      team: one(player.teams) || {},
      totals: one(player.player_stats) || {},
      performance: one(player.player_performance) || {},
      matchStats,
      matches,
      attendance,
    };
  };

  const matchRows = (data) => {
    const byMatch = new Map(data.matchStats.map((row) => [row.match_id, row]));
    const source = data.matches.map((match) => ({ match, stats: byMatch.get(match.id) || null }));
    if (!source.length) return `<div class="pp-empty">Meciurile echipei vor aparea aici dupa ce sunt programate.</div>`;
    return source.map(({ match, stats }) => `
      <article class="pp-list-item">
        <div class="pp-list-main"><strong>FC Autentic vs ${esc(match.opponent)}</strong><span>${dateRo(match.starts_at)} · ${esc(match.location || "Locatie necompletata")}</span></div>
        <div class="pp-list-cell"><strong class="pp-result">${esc(match.result || "Programat")}</strong><span>Rezultat</span></div>
        <div class="pp-list-cell"><strong>${stats ? number(stats.minutes_played) : 0}</strong><span>Minute</span></div>
        <div class="pp-list-cell"><strong>${stats?.starter ? "Titular" : "Rezerva"}</strong><span>Rol</span></div>
        <div class="pp-list-cell"><strong>${stats?.is_mvp ? "Da" : "Nu"}</strong><span>MVP</span></div>
      </article>
      ${stats ? `<div class="pp-card" style="margin-top:-10px;border-radius:0 0 14px 14px;padding:13px 16px"><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;text-align:center">${[
        ["Goluri", stats.goals], ["Assisturi", stats.assists], ["Suturi", stats.shots],
        ["Pase", stats.successful_passes], ["Interceptii", stats.interceptions],
        ["Galbene", stats.yellow_cards], ["Rating", stats.rating ?? "-"],
      ].map(([label, value]) => `<div><strong style="display:block">${esc(value)}</strong><small style="color:#71717a">${esc(label)}</small></div>`).join("")}</div></div>` : ""}
    `).join("");
  };

  const trainingRows = (data) => {
    if (!data.attendance.length) return `<div class="pp-empty">Prezenta va aparea dupa primul antrenament inregistrat.</div>`;
    return data.attendance.map((row) => {
      const event = one(row.calendar_events) || {};
      return `
        <article class="pp-list-item">
          <div class="pp-list-main"><strong>${esc(row.training_type || event.title || "Antrenament")}</strong><span>${dateRo(row.attended_on)} · ${esc(event.location || "Baza FC Autentic")}</span></div>
          <div class="pp-list-cell"><strong style="color:${row.present ? "#86efac" : "#fca5a5"}">${row.present ? "Prezent" : "Absent"}</strong><span>Prezenta</span></div>
          <div class="pp-list-cell"><strong>${row.late ? "Da" : "Nu"}</strong><span>Intarziere</span></div>
          <div class="pp-list-cell"><strong>${row.coach_rating ?? "-"}</strong><span>Nota</span></div>
          <div class="pp-list-cell"><strong>${esc(row.notes || "-")}</strong><span>Observatie</span></div>
        </article>`;
    }).join("");
  };

  const renderOverview = (data) => {
    const player = data.player;
    const performance = data.performance;
    const attendance = data.attendance;
    const recentRatings = data.matchStats
      .filter((row) => row.rating !== null && row.rating !== undefined)
      .slice(0, 8)
      .reverse();
    const chartValues = recentRatings.map((row) => ({
      label: dateRo(one(row.matches)?.starts_at).split(" ")[0],
      value: number(row.rating) * 10,
    }));

    return `
      <div class="pp-grid-2">
        <section class="pp-card">
          <div class="pp-card-head"><div><h2>Date profesionale</h2><p>Informatiile oficiale din profilul clubului</p></div></div>
          <div class="pp-details">
            ${detail("Nume complet", `${player.first_name || ""} ${player.last_name || ""}`.trim())}
            ${detail("Data nasterii", dateRo(player.birth_date))}
            ${detail("Categoria", data.team.category || data.team.name)}
            ${detail("Pozitie", player.position)}
            ${detail("Numar tricou", player.shirt_number)}
            ${detail("Data inscrierii", dateRo(player.joined_at || player.created_at))}
            ${detail("Inaltime", player.height_cm ? `${player.height_cm} cm` : null)}
            ${detail("Greutate", player.weight_kg ? `${player.weight_kg} kg` : null)}
            ${detail("Picior dominant", player.dominant_foot)}
            ${detail("Telefon", player.phone || data.profile.phone)}
          </div>
        </section>
        <section class="pp-card">
          <div class="pp-card-head"><div><h2>Evolutia performantei</h2><p>Ratingul ultimelor meciuri</p></div><strong style="color:#67e8f9">${number(performance.average_rating, 0).toFixed(1)}</strong></div>
          ${chartValues.length ? `<div class="pp-chart">${chartValues.map((point) => `<div class="pp-chart-col"><div class="pp-chart-bar" style="height:${Math.max(8, Math.min(100, point.value))}%"></div><small>${esc(point.label)}</small></div>`).join("")}</div>` : `<div class="pp-empty">Graficul va aparea dupa introducerea ratingurilor pe meci.</div>`}
        </section>
        <section class="pp-card">
          <div class="pp-card-head"><div><h2>Profil tehnic</h2><p>Evaluari actualizate de staff</p></div></div>
          <div class="pp-progress-list">
            ${progress("Viteza", performance.pace || 60)}
            ${progress("Tehnica", performance.technique || 60)}
            ${progress("Pase", performance.passing || 60)}
            ${progress("Sut", performance.shooting || 60)}
            ${progress("Aparare", performance.defending || 60)}
            ${progress("Conditie fizica", performance.physical || 60)}
          </div>
        </section>
        <section class="pp-card">
          <div class="pp-card-head"><div><h2>Prezenta recenta</h2><p>Ultimele antrenamente inregistrate</p></div></div>
          ${attendance.length ? `<div class="pp-chart">${attendance.slice(0, 8).reverse().map((row) => `<div class="pp-chart-col"><div class="pp-chart-bar" style="height:${row.present ? 88 : 16}%;background:${row.present ? "linear-gradient(#22c55e,#06b6d4)" : "#3f3f46"}"></div><small>${dateRo(row.attended_on).split(" ")[0]}</small></div>`).join("")}</div>` : `<div class="pp-empty">Graficul va aparea dupa inregistrarea prezentelor.</div>`}
        </section>
      </div>`;
  };

  const openPlayerCard = (data) => {
    const player = data.player;
    const performance = data.performance;
    const modal = document.createElement("div");
    modal.className = "pp-modal";
    modal.innerHTML = `
      <div class="pp-modal-card" style="width:min(620px,100%)">
        <div class="pp-modal-head"><h2>Cardul meu de jucator</h2><button class="pp-btn pp-icon-btn pp-close" aria-label="Inchide">×</button></div>
        <div class="pp-modal-body">
          <div class="pp-player-card" id="pp-export-card">
            <img class="pp-card-logo" src="./fc-autentic-logo-small.png" alt="">
            <div class="pp-card-rating"><strong>${number(performance.overall_rating, 60)}</strong><span>${esc(player.position || "JUC")}</span></div>
            <img class="pp-card-photo" src="${esc(player.photo_url || "./fc-autentic-logo-small.png")}" alt="${esc(player.first_name)}">
            <h3 class="pp-card-name">${esc(`${player.first_name || ""} ${player.last_name || ""}`.trim())}</h3>
            <div class="pp-card-team">${esc(data.team.name || data.team.category || "FC AUTENTIC")} · #${esc(player.shirt_number || "-")}</div>
            <div class="pp-card-metrics">
              ${[["VIT", performance.pace], ["TEH", performance.technique], ["PAS", performance.passing], ["SUT", performance.shooting], ["APA", performance.defending], ["FIZ", performance.physical]].map(([label, value]) => `<div class="pp-card-metric"><strong>${number(value, 60)}</strong><span>${label}</span></div>`).join("")}
            </div>
          </div>
        </div>
        <div class="pp-modal-actions">
          <button class="pp-btn pp-fullscreen">Fullscreen</button>
          <button class="pp-btn pp-download">Descarca PNG</button>
          <button class="pp-btn pp-btn-cyan pp-share">Distribuie</button>
        </div>
      </div>`;
    document.querySelector(`#${ROOT_ID}`)?.appendChild(modal);
    modal.querySelector(".pp-close").onclick = closeModal;
    modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
    modal.querySelector(".pp-fullscreen").onclick = () => modal.querySelector("#pp-export-card")?.requestFullscreen?.();
    modal.querySelector(".pp-download").onclick = () => downloadCard(data);
    modal.querySelector(".pp-share").onclick = async () => {
      const shareData = {
        title: `Card jucator - ${player.first_name} ${player.last_name}`,
        text: `${player.first_name} ${player.last_name}, ${data.team.name || data.team.category || "FC Autentic"}, rating ${number(performance.overall_rating, 60)}.`,
        url: window.location.href,
      };
      try {
        if (navigator.share) await navigator.share(shareData);
        else {
          await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
          toast("Datele cardului au fost copiate.");
        }
      } catch (error) {
        if (error.name !== "AbortError") toast("Distribuirea nu a reusit.", true);
      }
    };
  };

  const loadImage = (source) => new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });

  const downloadCard = async (data) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1500;
    const context = canvas.getContext("2d");
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#111827");
    gradient.addColorStop(.52, "#0e7490");
    gradient.addColorStop(1, "#4c1d95");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "rgba(255,255,255,.55)";
    context.lineWidth = 5;
    context.strokeRect(42, 42, 996, 1416);

    const performance = data.performance;
    const player = data.player;
    const photo = await loadImage(player.photo_url || "./fc-autentic-logo-small.png");
    if (photo) {
      const ratio = Math.min(650 / photo.width, 650 / photo.height);
      const width = photo.width * ratio;
      const height = photo.height * ratio;
      context.drawImage(photo, (1080 - width) / 2, 210 + (650 - height), width, height);
    }

    context.fillStyle = "#ffffff";
    context.textAlign = "left";
    context.font = "900 130px Arial";
    context.fillText(String(number(performance.overall_rating, 60)), 95, 190);
    context.font = "800 44px Arial";
    context.fillText(String(player.position || "JUC").toUpperCase(), 105, 245);
    context.textAlign = "center";
    context.font = "900 62px Arial";
    context.fillText(`${player.first_name || ""} ${player.last_name || ""}`.trim().toUpperCase(), 540, 965);
    context.fillStyle = "#cffafe";
    context.font = "700 30px Arial";
    context.fillText(`${data.team.name || data.team.category || "FC AUTENTIC"} · #${player.shirt_number || "-"}`, 540, 1020);

    const metrics = [
      ["VIT", performance.pace], ["TEH", performance.technique], ["PAS", performance.passing],
      ["SUT", performance.shooting], ["APA", performance.defending], ["FIZ", performance.physical],
    ];
    metrics.forEach(([label, value], index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);
      const x = 220 + column * 320;
      const y = 1160 + row * 150;
      context.fillStyle = "#ffffff";
      context.font = "900 52px Arial";
      context.fillText(String(number(value, 60)), x, y);
      context.fillStyle = "#cffafe";
      context.font = "800 24px Arial";
      context.fillText(label, x, y + 42);
    });

    const link = document.createElement("a");
    link.download = `card-${player.first_name || "jucator"}-${player.last_name || "fc-autentic"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    toast("Cardul a fost descarcat.");
  };

  const openSettings = (data, rerender) => {
    const player = data.player;
    const profile = data.profile;
    const preferences = profile.notification_preferences || {};
    const modal = document.createElement("div");
    modal.className = "pp-modal";
    modal.innerHTML = `
      <div class="pp-modal-card">
        <div class="pp-modal-head"><h2>Setari profil</h2><button class="pp-btn pp-icon-btn pp-close" aria-label="Inchide">×</button></div>
        <div class="pp-modal-body">
          <div class="pp-settings-nav">
            <button class="pp-settings-tab active" data-panel="personal">Date personale</button>
            <button class="pp-settings-tab" data-panel="photo">Poza profil</button>
            <button class="pp-settings-tab" data-panel="password">Parola</button>
            <button class="pp-settings-tab" data-panel="notifications">Notificari</button>
          </div>
          <section class="pp-settings-panel active" data-panel="personal">
            <form class="pp-form pp-personal-form">
              <label>Prenume<input class="pp-input" name="first_name" value="${esc(player.first_name)}" required></label>
              <label>Nume<input class="pp-input" name="last_name" value="${esc(player.last_name)}" required></label>
              <label>Pozitie<input class="pp-input" name="position" value="${esc(player.position)}"></label>
              <label>Telefon<input class="pp-input" name="phone" value="${esc(player.phone || profile.phone)}"></label>
              <label>Inaltime (cm)<input class="pp-input" name="height_cm" type="number" min="80" max="250" value="${esc(player.height_cm)}"></label>
              <label>Greutate (kg)<input class="pp-input" name="weight_kg" type="number" min="20" max="250" step="0.1" value="${esc(player.weight_kg)}"></label>
              <label>Picior dominant<select class="pp-input" name="dominant_foot">${["drept", "stang", "ambele"].map((value) => `<option value="${value}" ${player.dominant_foot === value ? "selected" : ""}>${value}</option>`).join("")}</select></label>
              <label>Email<input class="pp-input" value="${esc(player.email || profile.email)}" disabled></label>
              <div class="wide" style="display:flex;justify-content:flex-end"><button class="pp-btn pp-btn-primary" type="submit">Salveaza modificarile</button></div>
            </form>
          </section>
          <section class="pp-settings-panel" data-panel="photo">
            <form class="pp-form pp-photo-form">
              <label class="wide">Imagine JPG, PNG sau WebP (maxim 5 MB)<input class="pp-input" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required></label>
              <div class="wide" style="display:flex;justify-content:flex-end"><button class="pp-btn pp-btn-primary" type="submit">Schimba poza</button></div>
            </form>
          </section>
          <section class="pp-settings-panel" data-panel="password">
            <form class="pp-form pp-password-form">
              <label class="wide">Parola noua<input class="pp-input" name="password" type="password" minlength="8" autocomplete="new-password" required></label>
              <label class="wide">Confirma parola<input class="pp-input" name="confirm" type="password" minlength="8" autocomplete="new-password" required></label>
              <div class="wide" style="display:flex;justify-content:flex-end"><button class="pp-btn pp-btn-primary" type="submit">Actualizeaza parola</button></div>
            </form>
          </section>
          <section class="pp-settings-panel" data-panel="notifications">
            <form class="pp-notification-form">
              <div class="pp-switches">
                <label class="pp-switch"><span>Notificari in aplicatie</span><input type="checkbox" name="in_app" ${preferences.in_app !== false ? "checked" : ""}></label>
                <label class="pp-switch"><span>Notificari prin email</span><input type="checkbox" name="email" ${preferences.email !== false ? "checked" : ""}></label>
                <label class="pp-switch"><span>Notificari in browser</span><input type="checkbox" name="browser" ${preferences.browser ? "checked" : ""}></label>
              </div>
              <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="pp-btn pp-btn-primary" type="submit">Salveaza preferintele</button></div>
            </form>
          </section>
        </div>
      </div>`;

    document.querySelector(`#${ROOT_ID}`)?.appendChild(modal);
    modal.querySelector(".pp-close").onclick = closeModal;
    modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
    modal.querySelectorAll(".pp-settings-tab").forEach((button) => {
      button.onclick = () => {
        modal.querySelectorAll(".pp-settings-tab,.pp-settings-panel").forEach((element) => element.classList.remove("active"));
        button.classList.add("active");
        modal.querySelector(`.pp-settings-panel[data-panel="${button.dataset.panel}"]`)?.classList.add("active");
      };
    });

    modal.querySelector(".pp-personal-form").onsubmit = async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.currentTarget));
      ["height_cm", "weight_kg"].forEach((key) => { values[key] = values[key] === "" ? null : Number(values[key]); });
      try {
        await request(`/rest/v1/players?id=eq.${player.id}`, { method: "PATCH", body: JSON.stringify(values) });
        toast("Profilul a fost actualizat.");
        closeModal();
        await rerender();
      } catch (error) { toast(error.message, true); }
    };

    modal.querySelector(".pp-photo-form").onsubmit = async (event) => {
      event.preventDefault();
      const file = new FormData(event.currentTarget).get("photo");
      if (!(file instanceof File) || !file.size) return;
      if (file.size > 5 * 1024 * 1024) return toast("Imaginea depaseste 5 MB.", true);
      const auth = getSession();
      const extension = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${auth.user.id}/avatar-${Date.now()}.${extension}`;
      try {
        await request(`/storage/v1/object/player-avatars/${path}`, {
          method: "POST",
          body: file,
          headers: { "Content-Type": file.type, "x-upsert": "true" },
        });
        const photoUrl = `${SUPABASE_URL}/storage/v1/object/public/player-avatars/${path}`;
        await request(`/rest/v1/players?id=eq.${player.id}`, { method: "PATCH", body: JSON.stringify({ photo_url: photoUrl }) });
        toast("Poza de profil a fost schimbata.");
        closeModal();
        await rerender();
      } catch (error) { toast(error.message, true); }
    };

    modal.querySelector(".pp-password-form").onsubmit = async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.currentTarget));
      if (values.password !== values.confirm) return toast("Parolele nu coincid.", true);
      try {
        await request("/auth/v1/user", { method: "PUT", body: JSON.stringify({ password: values.password }) });
        toast("Parola a fost actualizata.");
        event.currentTarget.reset();
      } catch (error) { toast(error.message, true); }
    };

    modal.querySelector(".pp-notification-form").onsubmit = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const notification_preferences = {
        in_app: form.querySelector('[name="in_app"]').checked,
        email: form.querySelector('[name="email"]').checked,
        browser: form.querySelector('[name="browser"]').checked,
      };
      try {
        await request(`/rest/v1/profiles?id=eq.${profile.id}`, { method: "PATCH", body: JSON.stringify({ notification_preferences }) });
        toast("Preferintele au fost salvate.");
      } catch (error) { toast(error.message, true); }
    };
  };

  const bind = (root, data) => {
    root.querySelectorAll(".pp-tab").forEach((button) => {
      button.onclick = () => {
        root.querySelectorAll(".pp-tab,.pp-panel").forEach((element) => element.classList.remove("active"));
        button.classList.add("active");
        root.querySelector(`.pp-panel[data-panel="${button.dataset.panel}"]`)?.classList.add("active");
      };
    });
    root.querySelector(".pp-open-card").onclick = () => openPlayerCard(data);
    root.querySelector(".pp-open-settings").onclick = () => openSettings(data, () => render(true));
    root.querySelector(".pp-home").onclick = () => { window.location.hash = ""; };
    root.querySelector(".pp-logout").onclick = () => {
      const logout = [...document.querySelectorAll("button")].find((button) => button.textContent?.trim() === "Iesire");
      logout?.click();
      root.remove();
    };
  };

  const pageHtml = (data) => {
    const player = data.player;
    const totals = data.totals;
    const performance = data.performance;
    const playerAge = age(player.birth_date);
    const attended = data.attendance.filter((row) => row.present).length;
    const absent = data.attendance.filter((row) => !row.present).length;
    const late = data.attendance.filter((row) => row.late).length;
    const participation = data.attendance.length
      ? Math.round((attended / data.attendance.length) * 100)
      : number(totals.training_attendance);
    const recordedMinutes = data.matchStats.reduce((sum, row) => sum + number(row.minutes_played), 0);
    const totalMinutes = number(performance.minutes_played) || recordedMinutes;

    return `
      <div class="pp-shell">
        <header class="pp-topbar">
          <button class="pp-brand pp-home"><img src="./fc-autentic-logo-small.png" alt="FC Autentic"><span><strong>FC AUTENTIC</strong><span>Portalul jucatorului</span></span></button>
          <div class="pp-actions">
            <button class="pp-btn pp-open-settings"><span aria-hidden="true">⚙</span><span class="pp-settings-label">Setari profil</span></button>
            <button class="pp-btn pp-icon-btn pp-logout" title="Iesire" aria-label="Iesire">↪</button>
          </div>
        </header>
        <main class="pp-main">
          <section class="pp-hero">
            <div class="pp-hero-inner">
              <div class="pp-profile-main">
                <div class="pp-avatar-wrap">
                  <img class="pp-avatar" src="${esc(player.photo_url || "./fc-autentic-logo-small.png")}" alt="${esc(`${player.first_name} ${player.last_name}`)}">
                  <span class="pp-number">${esc(player.shirt_number || "-")}</span>
                </div>
                <div>
                  <p class="pp-kicker">${esc(data.team.name || data.team.category || "FC Autentic Academy")}</p>
                  <h1 class="pp-name">${esc(player.first_name)}<br>${esc(player.last_name)}</h1>
                  <div class="pp-identity">
                    <span class="pp-pill pp-pill-accent">${esc(player.position || "Pozitie necompletata")}</span>
                    <span class="pp-pill">${esc(data.team.category || "Fara categorie")}</span>
                    <span class="pp-pill">${playerAge !== null ? `${playerAge} ani` : "Varsta necompletata"}</span>
                    <span class="pp-pill">${player.height_cm ? `${player.height_cm} cm` : "Inaltime -"}</span>
                    <span class="pp-pill">${player.weight_kg ? `${player.weight_kg} kg` : "Greutate -"}</span>
                    <span class="pp-pill">Picior ${esc(player.dominant_foot || "-")}</span>
                  </div>
                </div>
              </div>
              <button class="pp-fifa-launch pp-open-card">
                <span>Identitate sportiva</span>
                <strong>Cardul Meu de Jucator</strong>
                <small>Vezi ratingul, atributele si descarca imaginea oficiala.</small>
              </button>
            </div>
          </section>

          <section class="pp-stats">
            ${metric("Goluri totale", number(totals.goals), "Cariera la club")}
            ${metric("Assisturi totale", number(totals.assists), "Pase decisive")}
            ${metric("Meciuri jucate", number(totals.matches), "Aparitii oficiale")}
            ${metric("Minute jucate", totalMinutes, "Timp pe teren")}
            ${metric("Rating mediu", number(performance.average_rating).toFixed(1), "Din 10")}
            ${metric("Participare", `${participation}%`, `${attended} prezente`)}
          </section>

          <nav class="pp-tabs" aria-label="Sectiuni profil">
            <button class="pp-tab active" data-panel="overview">Dashboard personal</button>
            <button class="pp-tab" data-panel="matches">Meciurile mele</button>
            <button class="pp-tab" data-panel="training">Antrenamente</button>
          </nav>

          <section class="pp-panel active" data-panel="overview">${renderOverview(data)}</section>
          <section class="pp-panel" data-panel="matches">
            <div class="pp-card">
              <div class="pp-card-head"><div><h2>Meciurile mele</h2><p>Program, rezultate si contributie personala</p></div><strong>${data.matches.length}</strong></div>
              <div class="pp-list">${matchRows(data)}</div>
            </div>
          </section>
          <section class="pp-panel" data-panel="training">
            <div class="pp-stats" style="margin:0 0 14px">
              ${metric("Participare totala", `${participation}%`, "Prezenta la antrenamente")}
              ${metric("Antrenamente", data.attendance.length, "Inregistrate")}
              ${metric("Prezente", attended, "Participari")}
              ${metric("Absente", absent, "Neprezentari")}
              ${metric("Intarzieri", late, "Sosiri intarziate")}
              ${metric("Nota medie", data.attendance.some((row) => row.coach_rating) ? (data.attendance.reduce((sum, row) => sum + number(row.coach_rating), 0) / data.attendance.filter((row) => row.coach_rating).length).toFixed(1) : "-", "Evaluare antrenor")}
            </div>
            <div class="pp-card">
              <div class="pp-card-head"><div><h2>Antrenamente</h2><p>Prezenta, tipul sedintei si feedbackul antrenorului</p></div></div>
              <div class="pp-list">${trainingRows(data)}</div>
            </div>
          </section>
        </main>
      </div>`;
  };

  const shouldRender = () => {
    if (window.location.hash !== "#cont-jucator") return false;
    const auth = getSession();
    if (!auth?.access_token || !auth?.user?.id) return false;
    if (document.body.textContent?.includes("Cont jucator") && !document.body.textContent?.includes("Iesire")) return false;
    return true;
  };

  const render = async (force = false) => {
    if (!shouldRender()) {
      document.getElementById(ROOT_ID)?.remove();
      return;
    }
    const auth = getSession();
    if (!force && document.getElementById(ROOT_ID) && lastToken === auth.access_token) return;
    if (rendering) return;
    rendering = true;
    lastToken = auth.access_token;

    let root = document.getElementById(ROOT_ID);
    if (!root) {
      root = document.createElement("div");
      root.id = ROOT_ID;
      document.body.appendChild(root);
    }
    root.innerHTML = `<div class="pp-loading"><div><div class="pp-spinner"></div>Se incarca profilul...</div></div>`;

    try {
      const data = await loadData(auth.user.id);
      if (!data) {
        root.innerHTML = `<div class="pp-loading"><div style="max-width:480px;text-align:center"><img src="./fc-autentic-logo-small.png" alt="" style="width:90px"><h2 style="color:#fafafa">Profilul de jucator nu este activ</h2><p>Contul exista, dar nu este inca legat de un jucator confirmat. Administratorul clubului trebuie sa aprobe inscrierea.</p><button class="pp-btn pp-logout" style="margin:auto">Iesire</button></div></div>`;
        root.querySelector(".pp-logout").onclick = () => {
          [...document.querySelectorAll("button")].find((button) => button.textContent?.trim() === "Iesire")?.click();
          root.remove();
        };
        return;
      }
      root.innerHTML = pageHtml(data);
      bind(root, data);
    } catch (error) {
      root.innerHTML = `<div class="pp-loading"><div style="max-width:520px;text-align:center"><h2 style="color:#fafafa">Profilul nu a putut fi incarcat</h2><p>${esc(error.message)}</p><button class="pp-btn pp-retry" style="margin:auto">Incearca din nou</button></div></div>`;
      root.querySelector(".pp-retry").onclick = () => render(true);
    } finally {
      rendering = false;
    }
  };

  new MutationObserver(() => render()).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("hashchange", () => render(true));
  window.addEventListener("storage", () => render(true));
  render();
})();
