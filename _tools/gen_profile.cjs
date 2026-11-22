/* Génère les visuels SVG animés du profil GitHub (Dimi-Sama).
   Usage : node _tools/gen_profile.cjs        (aucune dépendance)
   Tout est original, léger et animé en SMIL (fonctionne dans <img> sur GitHub). */
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..", "assets");
fs.mkdirSync(OUT, { recursive: true });

const C = { bg: "#04060E", panel: "#0A1022", blue: "#1F7BFF", cyan: "#00D0FF", ice: "#BFE3FF", yellow: "#FCEE0A", magenta: "#FF2A6D", violet: "#7A5CFF", mute: "#8FA6D1" };
const MONO = "Consolas, 'Cascadia Mono', 'Courier New', monospace";
const HEAD = "Impact, 'Arial Narrow Bold', 'Arial Black', sans-serif";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const write = (name, svg) => { fs.writeFileSync(path.join(OUT, name), svg.trim() + "\n"); console.log(name, Math.round(Buffer.byteLength(svg) / 1024 * 10) / 10 + " Ko"); };

const DEFS = `
<filter id="glow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" opacity=".30"/></pattern>`;

/* ============================== BANNIÈRE ============================== */
function banner() {
  const W = 1200, H = 310;
  // sol en perspective : lignes qui partent du point de fuite
  let rays = "";
  for (let x = -900; x <= 2100; x += 110) rays += `<line x1="600" y1="168" x2="${x}" y2="${H}"/>`;
  let rows = "";
  for (let k = 0; k < 8; k++) rows += `<line x1="0" y1="${168 + k * 22}" x2="${W}" y2="${168 + k * 22}"/>`;
  const glitch = (color, dx, phase, op) => `<text x="58" y="158" font-family="${HEAD}" font-size="112" letter-spacing="7" fill="${color}" opacity="${op}">DIMI-SAMA<animateTransform attributeName="transform" type="translate" calcMode="discrete" values="0 0;0 0;${dx} 2;${-dx} -3;0 0;0 0" keyTimes="0;${phase};${phase + 0.02};${phase + 0.045};${phase + 0.07};1" dur="4.4s" repeatCount="indefinite"/></text>`;
  // tubes nixie (divergence meter)
  const digits = "1.048596".split("");
  let tubes = "", tx = 800;
  digits.forEach((d, i) => {
    const isDot = d === ".";
    const w = isDot ? 16 : 36;
    tubes += `<g><rect x="${tx}" y="224" width="${w}" height="54" rx="6" fill="#050914" stroke="${C.blue}" stroke-opacity=".5"/>`
      + `<text x="${tx + w / 2}" y="262" text-anchor="middle" font-family="${MONO}" font-size="${isDot ? 30 : 36}" font-weight="700" fill="${C.ice}" filter="url(#glow)">${d}`
      + (isDot ? "" : `<animate attributeName="opacity" calcMode="discrete" values="1;1;.35;1;1" keyTimes="0;.${40 + i * 6};.${41 + i * 6};.${43 + i * 6};1" dur="${5 + i * 0.7}s" repeatCount="indefinite"/>`) + `</text></g>`;
    tx += w + 5;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="DIMI-SAMA, netrunner, Data et IA">
<defs>${DEFS}
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#03050C"/><stop offset=".55" stop-color="#06112A"/><stop offset="1" stop-color="#0B2C74"/></linearGradient>
<linearGradient id="tt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#7FDCFF"/></linearGradient>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".35" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff"/></linearGradient>
<mask id="floorfade"><rect x="0" y="168" width="${W}" height="${H - 168}" fill="url(#fade)"/></mask>
<linearGradient id="sweep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cyan}" stop-opacity="0"/><stop offset=".5" stop-color="${C.cyan}" stop-opacity=".16"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/></linearGradient>
<clipPath id="floor"><rect x="0" y="168" width="${W}" height="${H - 168}"/></clipPath>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<circle cx="960" cy="140" r="150" fill="${C.blue}" opacity=".18" filter="url(#glow)"/>
<g mask="url(#floorfade)"><g clip-path="url(#floor)" stroke="${C.blue}" stroke-opacity=".55" stroke-width="1" fill="none">${rays}
<g>${rows}<animateTransform attributeName="transform" type="translate" from="0 0" to="0 22" dur="1.1s" repeatCount="indefinite"/></g></g></g>
<line x1="0" y1="168" x2="${W}" y2="168" stroke="${C.cyan}" stroke-opacity=".6"/>
<!-- réticule -->
<g transform="translate(985 118)" fill="none" stroke="${C.cyan}" stroke-opacity=".75">
<circle r="86" stroke-dasharray="3 9"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite"/></circle>
<circle r="62" stroke="${C.blue}" stroke-width="2" stroke-dasharray="70 24"><animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="14s" repeatCount="indefinite"/></circle>
<circle r="38" stroke-opacity=".5"/><path d="M-100 0H-46M46 0H100M0 -100V-46M0 46V100" stroke="${C.yellow}" stroke-opacity=".85"/></g>
<text x="1152" y="40" font-family="'Yu Gothic','Noto Sans JP',sans-serif" font-size="17" fill="${C.cyan}" opacity=".65" style="writing-mode:vertical-rl" letter-spacing="9">運命石の扉</text>
${glitch(C.magenta, 7, 0.82, 0.8)}${glitch(C.cyan, -6, 0.835, 0.85)}
<text x="58" y="158" font-family="${HEAD}" font-size="112" letter-spacing="7" fill="url(#tt)" filter="url(#glow)">DIMI-SAMA<animate attributeName="opacity" calcMode="discrete" values="1;1;.8;1;.55;1;1" keyTimes="0;.5;.505;.52;.525;.54;1" dur="6.5s" repeatCount="indefinite"/></text>
<text x="62" y="204" font-family="${MONO}" font-size="19" letter-spacing="3.2" fill="#7FDCFF" textLength="640" lengthAdjust="spacing">NETRUNNER // DATA &amp; IA // DÉV. D'APPLICATIONS</text>
<text x="62" y="236" font-family="${MONO}" font-size="14" letter-spacing="2" fill="${C.yellow}" textLength="520" lengthAdjust="spacing">&gt; ACCÈS ACCORDÉ · BIENVENUE DANS MA ZONE, CHOOM</text>
<text x="800" y="214" font-family="${MONO}" font-size="11" letter-spacing="3" fill="${C.mute}">DIVERGENCE METER</text>${tubes}
<!-- HUD -->
<g fill="none" stroke="${C.yellow}" stroke-width="2"><path d="M14 38V14H38"/><path d="M${W - 38} 14H${W - 14}V38"/><path d="M14 ${H - 38}V${H - 14}H38"/><path d="M${W - 38} ${H - 14}H${W - 14}V${H - 38}"/></g>
<text x="50" y="32" font-family="${MONO}" font-size="12" letter-spacing="2.5" fill="${C.cyan}">SYS://DIMI-SAMA</text>
<circle cx="1010" cy="28" r="4" fill="#3CFF8F"><animate attributeName="opacity" values="1;.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
<text x="1020" y="32" font-family="${MONO}" font-size="12" letter-spacing="2.5" fill="#3CFF8F">ONLINE</text>
<text x="50" y="${H - 22}" font-family="${MONO}" font-size="11" letter-spacing="2" fill="${C.mute}">NIGHT CITY · SECTEUR 07 · ZONE LIBRE</text>
<text x="${W - 50}" y="${H - 22}" text-anchor="end" font-family="${MONO}" font-size="11" letter-spacing="2" fill="${C.mute}">BUILD 2077.22.11 · WORLDLINE α</text>
<rect x="0" y="-70" width="${W}" height="70" fill="url(#sweep)"><animate attributeName="y" from="-70" to="${H}" dur="5s" repeatCount="indefinite"/></rect>
<rect width="${W}" height="${H}" fill="url(#scan)"/>
</svg>`;
}

/* ============================== TEXTE QUI S'ÉCRIT ============================== */
function typing() {
  const lines = [
    "> Développeur d'applications en route vers la Data & IA_",
    "> Je libère des jeux d'arcade de leur borne.",
    "> Je transforme des données en recommandations.",
    "> Création 3D, homelab, et beaucoup trop d'anime.",
    "> Fan de JRPG & d'animes // JRPG & anime fan",
  ];
  const slot = 5.2, total = lines.length * slot, cw = 12.2;
  const W = 900, H = 52;
  let body = "";
  lines.forEach((l, i) => {
    const tw = Math.round(l.length * cw);
    const a = (i * slot) / total, tIn = a + 0.28 * slot / total, tHold = a + 0.86 * slot / total, tOut = a + slot / total;
    const kt = (arr) => arr.map((n) => Math.min(1, +n.toFixed(4))).join(";");
    body += `<g>
<clipPath id="c${i}"><rect x="28" y="0" width="0" height="${H}"><animate attributeName="width" values="0;0;${tw + 4};${tw + 4};0;0" keyTimes="${kt([0, a, tIn, tHold, tOut, 1])}" dur="${total}s" repeatCount="indefinite"/></rect></clipPath>
<text x="28" y="33" font-family="${MONO}" font-size="20" fill="${C.ice}" clip-path="url(#c${i})" textLength="${tw}" lengthAdjust="spacing">${esc(l)}</text>
<rect x="28" y="14" width="10" height="24" fill="${C.yellow}" opacity="0"><animate attributeName="x" values="28;28;${28 + tw};${28 + tw};28;28" keyTimes="${kt([0, a, tIn, tHold, tOut, 1])}" dur="${total}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="${kt([0, a + 0.001, tHold, Math.min(1, tHold + 0.01), 1])}" dur="${total}s" repeatCount="indefinite"/></rect>
</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Développeur d'applications en route vers la Data et IA. Je libère des jeux d'arcade de leur borne. Je transforme des données en recommandations. Création 3D, homelab et beaucoup trop d'anime. Fan de JRPG et d'animes.">
<rect width="${W}" height="${H}" rx="4" fill="${C.bg}" stroke="${C.blue}" stroke-opacity=".55"/>
<text x="8" y="33" font-family="${MONO}" font-size="20" fill="${C.cyan}">$</text>
${body}</svg>`;
}

/* ============================== EN-TÊTES DE SECTION ============================== */
function header(no, title, tag) {
  const W = 900, H = 64;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">
<defs><linearGradient id="sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.cyan}" stop-opacity="0"/><stop offset=".5" stop-color="${C.cyan}" stop-opacity=".28"/><stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/></linearGradient>
<clipPath id="p"><polygon points="0,0 858,0 900,30 900,64 42,64 0,34"/></clipPath></defs>
<polygon points="0,0 858,0 900,30 900,64 42,64 0,34" fill="${C.panel}" stroke="${C.blue}" stroke-width="1.5"/>
<g clip-path="url(#p)"><rect x="-200" y="0" width="200" height="64" fill="url(#sw)"><animate attributeName="x" from="-200" to="900" dur="4.5s" repeatCount="indefinite"/></rect></g>
<text x="26" y="46" font-family="${HEAD}" font-size="40" fill="none" stroke="${C.yellow}" stroke-width="1.3">${no}</text>
<text x="92" y="26" font-family="${MONO}" font-size="11" letter-spacing="3" fill="${C.mute}">// ${esc(tag)}</text>
<text x="92" y="56" font-family="${HEAD}" font-size="25" letter-spacing="3" fill="${C.ice}">${esc(title)}</text>
<rect x="838" y="22" width="40" height="8" fill="${C.yellow}"><animate attributeName="opacity" values="1;.25;1" dur="2.2s" repeatCount="indefinite"/></rect>
<rect x="846" y="36" width="32" height="4" fill="${C.cyan}" opacity=".7"/>
<rect width="${W}" height="${H}" fill="url(#scan)" clip-path="url(#p)"/></svg>`.replace("</defs>", `${DEFS}</defs>`);
}

/* ============================== LOADOUT (compétences) ============================== */
function loadout() {
  const left = [["DATA & IA", [["Python", .6], ["pandas / scikit-learn", .5], ["SQL / PostgreSQL", .7], ["Elasticsearch / Kibana", .65]]],
    ["SYSTÈMES", [["Git / GitHub", .7], ["Docker", .55], ["Linux / Debian", .6], ["TrueNAS / ZFS", .6], ["Réseau NFS · VPN · SSH", .55]]]];
  const right = [["DÉVELOPPEMENT", [["JavaScript / React", .7], ["TypeScript / Next.js", .55], ["PHP / CakePHP", .75], ["Java / Spring Boot", .6], ["Python / FastAPI", .6], ["Flutter / Dart", .45]]],
    ["CRÉATION", [["Blender / 3D", .4]]]];
  const W = 900, rowH = 34, titleH = 46, segs = 12, segW = 14, gap = 4;
  let H = 20, out = "";
  const col = (groups, x0) => {
    let y = 18, delay = 0;
    groups.forEach(([title, rows], gi) => {
      out += `<text x="${x0}" y="${y + 14}" font-family="${HEAD}" font-size="19" letter-spacing="3" fill="${C.cyan}">${esc(title)}</text><line x1="${x0}" y1="${y + 22}" x2="${x0 + 410}" y2="${y + 22}" stroke="${C.blue}" stroke-opacity=".5"/>`;
      y += titleH;
      rows.forEach(([name, lv]) => {
        const lit = Math.round(lv * segs);
        out += `<text x="${x0}" y="${y + 13}" font-family="${MONO}" font-size="14" fill="${C.ice}" textLength="${Math.min(190, name.length * 8.4)}" lengthAdjust="spacing">${esc(name)}</text>`;
        for (let s = 0; s < segs; s++) {
          const sx = x0 + 200 + s * (segW + gap);
          out += `<rect x="${sx}" y="${y + 2}" width="${segW}" height="12" fill="#0E1A36"/>`;
          if (s < lit) {
            const last = s === lit - 1;
            const col2 = s >= lit - 2 ? C.yellow : C.blue;
            out += `<rect x="${sx}" y="${y + 2}" width="${segW}" height="12" fill="${col2}">`
              + (last ? `<animate attributeName="opacity" values="1;.35;1" dur="1.8s" repeatCount="indefinite"/>` : "") + `</rect>`;
          }
        }
        y += rowH; delay++;
      });
      y += 6;
    });
    H = Math.max(H, y + 10);
  };
  col(left, 20); col(right, 470);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Compétences : Python, SQL, pandas, scikit-learn, JavaScript, React, TypeScript, PHP, Java, Docker, Linux, TrueNAS, Blender">
<defs>${DEFS}</defs><rect width="${W}" height="${H}" rx="4" fill="${C.bg}" stroke="${C.blue}" stroke-opacity=".45"/>${out}
<text x="${W - 16}" y="${H - 10}" text-anchor="end" font-family="${MONO}" font-size="10" fill="${C.mute}">niveaux indicatifs</text><rect width="${W}" height="${H}" fill="url(#scan)"/></svg>`;
}

/* ============================== CARTES DE MISSIONS ============================== */
function card(i, accent, title, d1, d2, status, statusColor, reward) {
  const W = 436, H = 172;
  const tw = Math.round(title.length * 13.6);
  const pts = `0,0 ${W - 26},0 ${W},26 ${W},${H} 26,${H} 0,${H - 26}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)} : ${esc(d1 + " " + d2)} Statut : ${esc(status)}. ${esc(reward)}">
<defs>${DEFS}<clipPath id="k"><polygon points="${pts}"/></clipPath>
<linearGradient id="hl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${accent}" stop-opacity="0"/><stop offset=".5" stop-color="${accent}" stop-opacity=".9"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></linearGradient></defs>
<polygon points="${pts}" fill="${C.panel}" stroke="${accent}" stroke-width="1.6"/>
<g clip-path="url(#k)"><rect x="-140" y="0" width="140" height="3" fill="url(#hl)"><animate attributeName="x" from="-140" to="${W}" dur="3.6s" repeatCount="indefinite"/></rect>
<circle cx="${W - 20}" cy="${H - 10}" r="90" fill="${accent}" opacity=".08"/></g>
<text x="22" y="30" font-family="${MONO}" font-size="12" letter-spacing="3" fill="${accent}">CONTRAT // 0${i}</text>
<rect x="${W - 142}" y="14" width="112" height="22" fill="none" stroke="${statusColor}" stroke-width="1.2"/>
<text x="${W - 86}" y="30" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="2.5" fill="${statusColor}">${esc(status)}<animate attributeName="opacity" values="1;.45;1" dur="2.4s" repeatCount="indefinite"/></text>
<text x="22" y="72" font-family="${HEAD}" font-size="25" letter-spacing="1.5" fill="${C.ice}" textLength="${tw}" lengthAdjust="spacingAndGlyphs">${esc(title)}</text>
<text x="22" y="100" font-family="${MONO}" font-size="13" fill="#9FB4D9" textLength="${Math.round(d1.length * 7.75)}" lengthAdjust="spacing">${esc(d1)}</text>
<text x="22" y="120" font-family="${MONO}" font-size="13" fill="#9FB4D9" textLength="${Math.round(d2.length * 7.75)}" lengthAdjust="spacing">${esc(d2)}</text>
<line x1="22" y1="136" x2="${W - 22}" y2="136" stroke="${accent}" stroke-opacity=".35"/>
<text x="22" y="158" font-family="${MONO}" font-size="12" letter-spacing="1.5" fill="${C.mute}">RÉCOMPENSE ▸</text>
<text x="132" y="158" font-family="${MONO}" font-size="13" font-weight="700" fill="${C.yellow}" textLength="${Math.round(reward.length * 7.9)}" lengthAdjust="spacing">${esc(reward)}</text>
<rect width="${W}" height="${H}" fill="url(#scan)" clip-path="url(#k)"/></svg>`;
}

/* ============================== DIVERGENCE (easter egg) ============================== */
function divergence() {
  const W = 520, H = 150;
  const d = "1.130426".split("");
  let t = "", x = 100;
  d.forEach((c, i) => {
    const dot = c === ".";
    const w = dot ? 18 : 44;
    t += `<rect x="${x}" y="48" width="${w}" height="66" rx="7" fill="#050914" stroke="${C.violet}" stroke-opacity=".7"/><text x="${x + w / 2}" y="98" text-anchor="middle" font-family="${MONO}" font-size="${dot ? 36 : 44}" font-weight="700" fill="${C.ice}" filter="url(#glow)">${c}`
      + (dot ? "" : `<animate attributeName="opacity" calcMode="discrete" values="1;1;.3;1;1" keyTimes="0;.${50 + i * 4};.${51 + i * 4};.${54 + i * 4};1" dur="${4 + i * 0.5}s" repeatCount="indefinite"/>`) + `</text>`;
    x += w + 6;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Divergence meter 1.130426 : El Psy Kongroo">
<defs>${DEFS}</defs><rect width="${W}" height="${H}" rx="6" fill="${C.bg}" stroke="${C.violet}" stroke-opacity=".6"/>
<text x="${W / 2}" y="28" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="5" fill="${C.mute}">WORLDLINE SHIFT DETECTED</text>${t}
<text x="${W / 2}" y="138" text-anchor="middle" font-family="${MONO}" font-size="14" letter-spacing="4" fill="${C.yellow}">EL PSY KONGROO</text><rect width="${W}" height="${H}" fill="url(#scan)"/></svg>`;
}

/* ============================== SÉPARATEUR ============================== */
function divider() {
  const W = 900, H = 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="presentation" aria-hidden="true">
<defs><linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.blue}" stop-opacity="0"/><stop offset=".5" stop-color="${C.cyan}"/><stop offset="1" stop-color="${C.blue}" stop-opacity="0"/></linearGradient></defs>
<rect x="40" y="10" width="820" height="2" fill="url(#l)"/>
<rect x="430" y="5" width="40" height="12" fill="${C.yellow}"><animate attributeName="x" values="60;800;60" dur="7s" repeatCount="indefinite"/></rect>
<rect x="30" y="7" width="8" height="8" fill="${C.cyan}"/><rect x="862" y="7" width="8" height="8" fill="${C.cyan}"/></svg>`;
}

write("banner.svg", banner());
write("typing.svg", typing());
write("h-01-roster.svg", header("01", "ROSTER", "MES PERSOS · MON ÂME"));
write("h-02-missions.svg", header("02", "MISSIONS", "CONTRATS EN COURS"));
write("h-03-loadout.svg", header("03", "LOADOUT", "CYBERWARE & COMPÉTENCES"));
write("h-04-acces.svg", header("04", "ACCÈS", "CANAUX DE TRANSMISSION"));
write("loadout.svg", loadout());
write("card-1-oga.svg", card(1, C.cyan, "OPEN GAMES AWARDS", "Vote, dashboard, recommandations IA", "et profils de joueurs (K-Means).", "EN LIGNE", "#3CFF8F", "NDCG ×1,8 vs popularité"));
write("card-2-fgo.svg", card(2, C.yellow, "FGO ARCADE // PORTABLE", "Libérer un jeu d'arcade de sa borne :", "moteur Vulkan maison + lanceur.", "CLASSIFIÉ", C.yellow, "60 FPS · saccades ÷ 4"));
write("card-3-orbitals.svg", card(3, C.magenta, "ORBITALS PC", "Un jeu Switch 2 en natif sur PC,", "sans émulateur. 3 bugs, 1 seule cause.", "CLASSIFIÉ", C.magenta, "3 → 1 cause · 59 shaders"));
write("card-4-homelab.svg", card(4, C.violet, "HOMELAB // NAS + DEBIAN", "Stockage fiable + serveur de calcul,", "accès distant chiffré, tout automatisé.", "EN LIGNE", "#3CFF8F", "16 To · 2 disques de marge"));
write("divergence.svg", divergence());
write("divider.svg", divider());
