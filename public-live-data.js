(() => {
  const URL = "https://lbrsuhssjnffgyyjoxan.supabase.co";
  const KEY = "sb_publishable_fe-Il_S4oyjOWRY3ZXR10Q_Gphxjw5x";
  let data = null;
  let timer;
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const safeUrl = (value) => {
    try {
      const url = new URL(value, window.location.origin);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  };

  const request = async (path) => {
    const response = await fetch(`${URL}${path}`, {
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    });
    if (!response.ok) throw new Error("Datele publice nu sunt disponibile.");
    return response.json();
  };

  const setMetric = (label, value) => {
    [...document.querySelectorAll("p")].forEach((node) => {
      if (node.textContent?.trim() !== label) return;
      const valueNode = node.previousElementSibling;
      if (valueNode) valueNode.textContent = value;
    });
  };

  const updateMetrics = () => {
    const metrics = data?.metrics;
    if (!metrics) return;
    setMetric("Jucatori activi", String(metrics.active_players));
    setMetric("Echipe", String(metrics.team_count));
    setMetric("Antrenori", String(metrics.coach_count));
    setMetric("Turnee / sezon", `${metrics.season_tournaments}+`);
  };

  const normalizePublicCategories = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue?.includes("U16")) {
        node.nodeValue = node.nodeValue.replace(/\bU16\b/g, "U15");
      }
    }
  };

  const updateTeams = () => {
    if (!data?.teams?.length) return;
    const preferred = ["U13", "U15", "U19"]
      .map((category) => data.teams.find((team) => team.category === category))
      .filter(Boolean);
    const featured = preferred.length ? preferred : data.teams.slice(0, 3);

    document.querySelectorAll("img[alt^='Echipa ']").forEach((image, index) => {
      const team = featured[index % featured.length];
      if (!team) return;
      const card = image.closest("button,article");
      image.alt = `Echipa ${team.category}`;

      card?.querySelectorAll("p,span").forEach((node) => {
        const text = node.textContent?.trim() || "";
        if (/^U(?:10|13|15|16|17|19)$|^Seniori$/.test(text)) {
          node.textContent = team.category;
        } else if (/^Echipa (?:U\d+|Seniori)$/.test(text)) {
          node.textContent = `Echipa ${team.category}`;
        }
      });

      const detail = card?.querySelector(".border-t");
      if (detail) {
        const values = detail.querySelectorAll("span");
        if (values[0]) values[0].textContent = `${team.player_count} jucatori`;
        if (values[1]) values[1].textContent = team.coach_name || "Staff FC Autentic";
      }

      const valueAfter = (label) => {
        const labelNode = [...(card?.querySelectorAll("p") || [])]
          .find((node) => node.textContent?.trim() === label);
        return labelNode?.nextElementSibling;
      };
      const playerValue = valueAfter("Lot activ");
      const coachValue = valueAfter("Antrenor principal");
      if (playerValue) playerValue.textContent = `${team.player_count} jucatori`;
      if (coachValue) coachValue.textContent = team.coach_name || "Staff FC Autentic";

      const focusHeading = card?.querySelector("h2");
      if (focusHeading && team.focus) focusHeading.textContent = team.focus;
    });
  };

  const updateSchedule = () => {
    const section = document.querySelector("#program");
    const list = section?.querySelector(".divide-y");
    if (!list) return;
    if (!data?.events?.length) {
      list.innerHTML = `<div class="py-8 text-zinc-400">
        Programul public va aparea aici imediat ce este publicat din portalul intern.
      </div>`;
      return;
    }
    list.innerHTML = data.events.slice(0, 6).map((event) => {
      const starts = new Date(event.starts_at);
      const day = starts.toLocaleDateString("ro-RO", { weekday: "long" });
      const time = starts.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });
      const team = data.teams.find((row) => row.team_id === event.team_id);
      return `<div class="grid grid-cols-[80px_1fr_auto] items-center gap-4 py-5">
        <span class="text-sm capitalize text-zinc-500">${esc(day)}</span>
        <div><p class="font-semibold">${esc(team?.category || "Club")}</p><p class="text-sm text-zinc-500">${esc(event.title)}</p></div>
        <span class="font-bold text-green-400">${esc(time)}</span>
      </div>`;
    }).join("");
  };

  const updateAnnouncements = () => {
    document.querySelector("[data-public-announcements]")?.remove();
    if (!data?.announcements?.length) return;
    const hero = document.querySelector(".public-hero");
    if (!hero) return;
    const band = document.createElement("section");
    band.dataset.publicAnnouncements = "true";
    band.style.cssText = "padding:14px 20px;border-bottom:1px solid rgba(255,255,255,.1);background:#052e16;color:#f0fdf4";
    const announcement = data.announcements[0];
    const link = safeUrl(announcement.link_url);
    band.innerHTML = `<div style="max-width:1280px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
      <div><strong>${esc(announcement.title)}</strong><span style="margin-left:10px;color:#bbf7d0">${esc(announcement.body)}</span></div>
      ${link ? `<a href="${esc(link)}" rel="noopener" style="color:#86efac;font-weight:700">${esc(announcement.link_label || "Detalii")}</a>` : ""}
    </div>`;
    hero.after(band);
  };

  const render = () => {
    if (!data) return;
    normalizePublicCategories();
    updateMetrics();
    updateTeams();
    updateSchedule();
    updateAnnouncements();
  };

  const load = async () => {
    try {
      const [metrics, teams, events, matches, announcements] = await Promise.all([
        request("/rest/v1/public_club_metrics?select=*&id=eq.true&limit=1"),
        request("/rest/v1/public_team_summaries?select=*&order=category"),
        request("/rest/v1/calendar_events?select=id,team_id,title,event_type,starts_at,location&is_public=eq.true&starts_at=gte.now()&order=starts_at.asc&limit=6"),
        request("/rest/v1/matches?select=id,team_id,opponent,starts_at,location,result&is_public=eq.true&starts_at=gte.now()&order=starts_at.asc&limit=3"),
        request("/rest/v1/public_announcements?select=*&order=starts_at.desc&limit=3"),
      ]);
      data = { metrics: metrics[0], teams, events, matches, announcements };
      render();
    } catch {}
  };

  new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(render, 80);
  }).observe(document.documentElement, { childList: true, subtree: true });
  load();
  window.setInterval(load, 60000);
})();
