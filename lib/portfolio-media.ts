type ProjectVariant =
  | "jarvis"
  | "exocortex"
  | "freshfusion"
  | "raksha"
  | "weeding"
  | "agrinexus"
  | "awr"
  | "sakti"
  | "mind"
  | "travex";

type InterestVariant =
  | "blender"
  | "photo"
  | "sketch"
  | "edit"
  | "gaming"
  | "motion";

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const data = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const projectMotifs: Record<ProjectVariant, string> = {
  jarvis: `
    <circle cx="286" cy="135" r="72" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".55"/>
    <circle cx="286" cy="135" r="48" fill="none" stroke="#e9eef7" stroke-width="1" opacity=".2"/>
    <circle cx="286" cy="135" r="7" fill="currentColor"/>
    <path d="M214 135h144M286 63v144" stroke="#e9eef7" opacity=".16"/>
    <path d="M239 96l-30-27M333 96l29-27M239 174l-30 27M333 174l29 27" stroke="currentColor" opacity=".45"/>
    <circle cx="207" cy="67" r="4" fill="currentColor"/><circle cx="365" cy="67" r="4" fill="currentColor"/><circle cx="207" cy="203" r="4" fill="currentColor"/><circle cx="365" cy="203" r="4" fill="currentColor"/>
  `,
  exocortex: `
    <path d="M226 156c-20-35 3-83 46-83 10-28 56-25 64 6 36 4 47 48 20 69 10 31-20 58-50 47-18 27-61 17-65-15-26-2-38-27-15-46z" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".62"/>
    <path d="M277 80c-10 18-4 34 12 46-18 12-22 28-8 48M322 82c10 18 4 34-12 46 18 12 22 28 8 48M252 120h102M259 154h90" fill="none" stroke="#edf1f7" opacity=".18"/>
    <circle cx="288" cy="126" r="5" fill="currentColor"/><circle cx="312" cy="154" r="5" fill="currentColor"/>
  `,
  freshfusion: `
    <circle cx="292" cy="138" r="67" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".62"/>
    <path d="M292 72c12-22 32-27 48-16-9 14-24 21-42 19" fill="none" stroke="#edf1f7" opacity=".38"/>
    <path d="M225 112h134M221 132h142M224 152h136M232 172h120" stroke="#edf1f7" opacity=".14"/>
    <path d="M267 104c18 14 35 14 51 0M260 160c22-12 42-12 63 0" fill="none" stroke="currentColor" opacity=".48"/>
    <circle cx="292" cy="138" r="8" fill="currentColor"/>
  `,
  raksha: `
    <path d="M213 188l35-81 44 22 33-51 52 33-30 82-49-17-40 30z" fill="none" stroke="#edf1f7" opacity=".22"/>
    <path d="M221 188c35-44 58-28 81-63 18-27 44-24 67-3" fill="none" stroke="currentColor" stroke-width="3" opacity=".65"/>
    <circle cx="221" cy="188" r="6" fill="currentColor"/><circle cx="302" cy="125" r="6" fill="currentColor"/><circle cx="369" cy="122" r="6" fill="currentColor"/>
    <path d="M238 76h47M344 181h31" stroke="currentColor" opacity=".35"/>
  `,
  weeding: `
    <path d="M218 208l28-136M256 208l24-136M294 208l18-136M332 208l12-136M370 208l6-136" stroke="#edf1f7" opacity=".14"/>
    <circle cx="305" cy="136" r="42" fill="none" stroke="currentColor" stroke-width="2" opacity=".65"/>
    <circle cx="305" cy="136" r="14" fill="none" stroke="#edf1f7" opacity=".36"/>
    <path d="M305 86v23M305 163v23M255 136h23M332 136h23" stroke="currentColor" opacity=".7"/>
    <path d="M282 155c8-18 19-26 24-45 5 18 14 28 23 44" fill="none" stroke="#7bc98c" stroke-width="2" opacity=".72"/>
  `,
  agrinexus: `
    <path d="M223 94l37-22 37 22v44l-37 22-37-22zM297 94l37-22 37 22v44l-37 22-37-22zM260 160l37-22 37 22v44l-37 22-37-22z" fill="none" stroke="currentColor" opacity=".48"/>
    <circle cx="260" cy="116" r="5" fill="#edf1f7"/><circle cx="334" cy="116" r="5" fill="#edf1f7"/><circle cx="297" cy="182" r="5" fill="#edf1f7"/>
    <path d="M260 116l74 0M260 116l37 66M334 116l-37 66" stroke="#edf1f7" opacity=".18"/>
  `,
  awr: `
    <path d="M224 188h45l30-56 38 18 31-56" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".62"/>
    <circle cx="269" cy="188" r="13" fill="#0b0e13" stroke="#edf1f7" opacity=".7"/><circle cx="299" cy="132" r="13" fill="#0b0e13" stroke="#edf1f7" opacity=".7"/><circle cx="337" cy="150" r="13" fill="#0b0e13" stroke="#edf1f7" opacity=".7"/>
    <path d="M204 204h180M361 87h28v28" fill="none" stroke="#edf1f7" opacity=".18"/>
  `,
  sakti: `
    <rect x="238" y="92" width="124" height="94" rx="42" fill="none" stroke="currentColor" stroke-width="2" opacity=".6"/>
    <rect x="267" y="113" width="66" height="52" rx="16" fill="none" stroke="#edf1f7" opacity=".25"/>
    <path d="M276 140h12l8-17 12 34 10-18h16" fill="none" stroke="currentColor" stroke-width="2.4"/>
    <circle cx="346" cy="105" r="5" fill="currentColor"/><path d="M346 105c22-16 43-8 47 12" fill="none" stroke="currentColor" opacity=".3"/>
  `,
  mind: `
    <rect x="225" y="75" width="150" height="130" rx="18" fill="none" stroke="currentColor" opacity=".58"/>
    <path d="M247 96h106v26h-73v26h73v35H247v-24h72v-25h-72z" fill="none" stroke="#edf1f7" opacity=".24"/>
    <circle cx="258" cy="109" r="6" fill="currentColor"/><circle cx="343" cy="172" r="6" fill="currentColor"/>
  `,
  travex: `
    <path d="M215 182C260 86 315 208 382 93" fill="none" stroke="currentColor" stroke-width="3" opacity=".62"/>
    <path d="M215 182C278 140 310 140 382 93" fill="none" stroke="#edf1f7" opacity=".17" stroke-dasharray="4 8"/>
    <circle cx="215" cy="182" r="8" fill="currentColor"/><circle cx="292" cy="143" r="6" fill="#edf1f7"/><circle cx="382" cy="93" r="8" fill="currentColor"/>
    <path d="M371 82l20 11-18 13" fill="none" stroke="currentColor" stroke-width="2"/>
  `,
};

const projectAccent: Record<ProjectVariant, string> = {
  jarvis: "#60a5fa",
  exocortex: "#9d7bff",
  freshfusion: "#65c58b",
  raksha: "#ff5c48",
  weeding: "#8bd17c",
  agrinexus: "#d7b84a",
  awr: "#5ec5d8",
  sakti: "#ff725f",
  mind: "#d98cff",
  travex: "#f39a4a",
};

export function projectCover(
  title: string,
  subtitle: string,
  variant: ProjectVariant,
) {
  const accent = projectAccent[variant];
  const safeTitle = esc(title);
  const safeSubtitle = esc(subtitle);
  const titleSize = title.length > 17 ? 29 : title.length > 11 ? 37 : 46;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" role="img" aria-label="${safeTitle}">
    <defs>
      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#ffffff" stroke-opacity=".035"/></pattern>
      <radialGradient id="halo" cx="74%" cy="42%" r="56%"><stop offset="0" stop-color="${accent}" stop-opacity=".2"/><stop offset="1" stop-color="#07090c" stop-opacity="0"/></radialGradient>
      <linearGradient id="edge" x1="0" x2="1"><stop stop-color="${accent}"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="400" height="280" rx="20" fill="#080a0d"/>
    <rect width="400" height="280" rx="20" fill="url(#grid)"/>
    <rect width="400" height="280" rx="20" fill="url(#halo)"/>
    <g color="${accent}">${projectMotifs[variant]}</g>
    <text x="26" y="31" fill="#f2eee6" fill-opacity=".42" font-family="ui-monospace,monospace" font-size="8" letter-spacing="2">SYSTEM / 2026</text>
    <text x="374" y="31" text-anchor="end" fill="${accent}" fill-opacity=".78" font-family="ui-monospace,monospace" font-size="7" letter-spacing="1.4">TARUN // ARCHIVE</text>
    <text x="26" y="214" fill="#f6f2ea" font-family="Arial,Helvetica,sans-serif" font-size="${titleSize}" font-weight="700" letter-spacing="-1.7">${safeTitle}</text>
    <text x="27" y="238" fill="#f6f2ea" fill-opacity=".52" font-family="ui-monospace,monospace" font-size="8" letter-spacing="1">${safeSubtitle}</text>
    <rect x="26" y="254" width="348" height="1" fill="#ffffff" fill-opacity=".1"/>
    <rect x="26" y="254" width="92" height="1" fill="url(#edge)"/>
    <circle cx="374" cy="254" r="3" fill="${accent}"/>
  </svg>`;
  return data(svg);
}

const interestAccent: Record<InterestVariant, string> = {
  blender: "#ff6a50",
  photo: "#8ea4c8",
  sketch: "#f2b35f",
  edit: "#d95b7b",
  gaming: "#8f79ff",
  motion: "#5bc7d8",
};

const interestMotifs: Record<InterestVariant, string> = {
  blender: `<path d="M88 75l104-30 89 54-24 108-111 30-80-65z" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/><path d="M88 75l169 132M192 45l-46 192M281 99L66 172" stroke="#fff" opacity=".12"/><circle cx="192" cy="141" r="42" fill="none" stroke="currentColor" opacity=".4"/>`,
  photo: `<rect x="80" y="54" width="240" height="172" rx="10" fill="none" stroke="#fff" opacity=".16"/><circle cx="200" cy="140" r="62" fill="none" stroke="currentColor" stroke-width="2" opacity=".6"/><circle cx="200" cy="140" r="32" fill="none" stroke="#fff" opacity=".18"/><path d="M80 96h240M122 54v172" stroke="#fff" opacity=".08"/>`,
  sketch: `<path d="M68 202c48-85 112-128 193-104 31 9 54 31 70 61M78 217c63-66 139-96 232-70M109 75l182 126M92 171l218-72" fill="none" stroke="currentColor" stroke-width="2" opacity=".52"/><path d="M82 63h236v170H82z" fill="none" stroke="#fff" opacity=".1"/>`,
  edit: `<rect x="62" y="64" width="276" height="154" rx="10" fill="none" stroke="#fff" opacity=".12"/><path d="M78 178h38v-22h42v36h48v-54h42v30h58v-64h28" fill="none" stroke="currentColor" stroke-width="5" opacity=".56"/><path d="M78 94h226M78 116h176" stroke="#fff" opacity=".09"/>`,
  gaming: `<path d="M112 169c13-65 43-92 88-92 45 0 75 27 88 92 8 38-12 54-39 27l-25-25h-48l-25 25c-27 27-47 11-39-27z" fill="none" stroke="currentColor" stroke-width="3" opacity=".6"/><circle cx="151" cy="138" r="5" fill="currentColor"/><circle cx="248" cy="132" r="5" fill="currentColor"/><circle cx="263" cy="147" r="5" fill="currentColor"/><path d="M137 142h28M151 128v28" stroke="#fff" opacity=".42"/>`,
  motion: `<rect x="70" y="65" width="106" height="150" rx="18" fill="none" stroke="#fff" opacity=".12"/><rect x="145" y="85" width="112" height="132" rx="18" fill="none" stroke="currentColor" stroke-width="2" opacity=".48"/><rect x="224" y="54" width="106" height="150" rx="18" fill="none" stroke="#fff" opacity=".16"/><path d="M86 188c58-88 116-91 226-66" fill="none" stroke="currentColor" stroke-width="3" opacity=".55"/>`,
};

export function interestCover(variant: InterestVariant) {
  const accent = interestAccent[variant];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280">
    <defs>
      <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#fff" stroke-opacity=".035"/></pattern>
      <radialGradient id="glow" cx="55%" cy="48%" r="62%"><stop stop-color="${accent}" stop-opacity=".18"/><stop offset="1" stop-color="#050608" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="400" height="280" fill="#07090b"/>
    <rect width="400" height="280" fill="url(#grid)"/>
    <rect width="400" height="280" fill="url(#glow)"/>
    <g color="${accent}">${interestMotifs[variant]}</g>
    <circle cx="36" cy="34" r="3" fill="${accent}"/>
    <path d="M36 34h46M318 244h46" stroke="${accent}" stroke-opacity=".35"/>
  </svg>`;
  return data(svg);
}
