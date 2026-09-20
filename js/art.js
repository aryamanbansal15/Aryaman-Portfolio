

const ART = (() => {
  const wrap = (inner) =>
    `<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${inner}</svg>`;

  const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

  return {
    
    speak4u: () => {
      let bars = "";
      const h = [10, 22, 34, 18, 40, 26, 14, 30, 12];
      h.forEach((v, i) => {
        bars += `<rect class="f-acc" x="${158 + i * 11.5}" y="${170 - v / 2}" width="6" height="${v}" rx="3" opacity=".85"/>`;
      });
      return wrap(`
        <path class="s-acc" d="M112 92q-14 28 0 56" fill="none" stroke-width="3" stroke-linecap="round"/>
        <path class="s-acc" d="M94 76q-22 44 0 88" fill="none" stroke-width="3" stroke-linecap="round" opacity=".5"/>
        <path class="s-acc" d="M288 92q14 28 0 56" fill="none" stroke-width="3" stroke-linecap="round"/>
        <path class="s-acc" d="M306 76q22 44 0 88" fill="none" stroke-width="3" stroke-linecap="round" opacity=".5"/>
        <rect class="f-surf s-ink" x="146" y="18" width="108" height="204" rx="22" stroke-width="2.5"/>
        <circle class="f-acc" cx="200" cy="100" r="30"/>
        <rect x="194" y="84" width="12" height="24" rx="6" fill="#fff"/>
        <path d="M188 104a12 12 0 0 0 24 0M200 116v9" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        ${bars}
        <rect class="f-line" x="182" y="206" width="36" height="4" rx="2"/>
      `);
    },

    servgenie: () =>
      wrap(`
        <rect class="f-surf s-line" x="70" y="28" width="260" height="184" rx="16" stroke-width="2"/>
        <circle class="f-acc" cx="98" cy="54" r="11"/>
        <rect class="f-line" x="118" y="49" width="76" height="9" rx="4.5"/>
        <rect class="f-accsoft" x="90" y="82" width="132" height="28" rx="12"/>
        <rect class="f-acc" x="176" y="120" width="134" height="28" rx="12"/>
        <rect class="f-accsoft" x="90" y="158" width="112" height="32" rx="12"/>
        <path class="f-ink" d="M106 174h6l8-6v20l-8-6h-6z"/>
        <path class="s-ink" d="M126 168a9 9 0 0 1 0 12M131 164a14 14 0 0 1 0 20" fill="none" stroke-width="2" stroke-linecap="round"/>
        <rect class="f-ink" x="150" y="172" width="34" height="4" rx="2" opacity=".5"/>
      `),

    liquidity: () => {
      const heights = [36, 62, 90, 124];
      let bars = "";
      heights.forEach((v, i) => {
        bars += `<rect class="${i === 3 ? "f-acc" : "f-accsoft"}" x="${250 + i * 30}" y="${196 - v}" width="20" height="${v}" rx="4"/>`;
      });
      return wrap(`
        <rect class="f-surf s-line" x="46" y="40" width="112" height="152" rx="10" stroke-width="2"/>
        <rect class="f-ink" x="62" y="58" width="52" height="8" rx="4"/>
        <rect class="f-line" x="62" y="80" width="80" height="6" rx="3"/>
        <rect class="f-line" x="62" y="94" width="62" height="6" rx="3"/>
        <rect class="f-line" x="62" y="108" width="80" height="6" rx="3"/>
        <rect class="f-accsoft" x="62" y="150" width="80" height="24" rx="6"/>
        <path class="s-acc" d="M172 118h48m-11-11 11 11-11 11" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="s-line" d="M240 200h140" stroke-width="2"/>
        ${bars}
        <circle class="f-accsoft s-acc" cx="352" cy="56" r="22" stroke-width="2.5"/>
        <circle class="s-acc" cx="352" cy="56" r="11" fill="none" stroke-width="2.5"/>
      `);
    },

    erp: () => {
      let side = "", rows = "";
      for (let i = 0; i < 5; i++) {
        side += `<rect class="${i === 1 ? "f-acc" : "f-line"}" x="62" y="${74 + i * 24}" width="48" height="9" rx="4.5"/>`;
      }
      for (let i = 0; i < 5; i++) {
        const y = 98 + i * 22;
        rows += `<rect class="${i % 2 ? "f-surf" : "f-accsoft"}" x="132" y="${y}" width="202" height="18" rx="4" opacity="${i % 2 ? 0 : 0.9}"/>
                 <rect class="f-ink" x="140" y="${y + 6}" width="36" height="6" rx="3" opacity=".7"/>
                 <rect class="f-line" x="196" y="${y + 6}" width="60" height="6" rx="3"/>
                 <rect class="f-line" x="274" y="${y + 6}" width="44" height="6" rx="3"/>`;
      }
      return wrap(`
        <rect class="f-surf s-line" x="46" y="28" width="308" height="188" rx="12" stroke-width="2"/>
        <path class="f-accsoft" d="M47 59H123V216H59A12 12 0 0 1 47 204Z"/>
        <path class="s-line" d="M47 59h306" stroke-width="2"/>
        <circle class="f-line" cx="66" cy="44" r="4.5"/><circle class="f-line" cx="82" cy="44" r="4.5"/><circle class="f-line" cx="98" cy="44" r="4.5"/>
        ${side}
        <rect class="f-ink" x="132" y="72" width="202" height="16" rx="4"/>
        ${rows}
      `);
    },

    autograd: () => {
      const layers = [
        [[60, 80], [60, 160]],
        [[152, 50], [152, 120], [152, 190]],
        [[248, 80], [248, 160]],
        [[336, 120]]
      ];
      let edges = "", nodes = "";
      for (let l = 0; l < layers.length - 1; l++) {
        layers[l].forEach(([x1, y1]) => layers[l + 1].forEach(([x2, y2]) => {
          edges += `<line class="s-line" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="1.6"/>`;
        }));
      }
      layers.flat().forEach(([x, y]) => {
        nodes += `<circle class="f-surf s-ink" cx="${x}" cy="${y}" r="15" stroke-width="2.2"/>`;
      });
      return wrap(`
        ${edges}
        <polyline class="s-acc" points="60,80 152,120 248,80 336,120" fill="none" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
        ${nodes}
        <circle class="f-acc" cx="336" cy="120" r="9"/>
        <path class="s-acc" d="M336 146C300 226 110 226 62 186" fill="none" stroke-width="2.5" stroke-dasharray="6 6" stroke-linecap="round"/>
        <path class="f-acc" d="M56 178l14 4-10 10z"/>
      `);
    },

    logs: () => {
      const w = [150, 210, 120, 190, 170, 140, 200];
      let rows = "";
      w.forEach((v, i) => {
        const y = 40 + i * 24;
        const hot = i === 3;
        rows += `${hot ? `<rect class="f-accsoft" x="58" y="${y - 6}" width="284" height="22" rx="6"/>` : ""}
                 <circle class="${hot ? "f-acc" : "f-line"}" cx="74" cy="${y + 5}" r="4.5"/>
                 <rect class="${hot ? "f-ink" : "f-line"}" x="90" y="${y + 1}" width="${v * 0.72}" height="8" rx="4"/>`;
      });
      return wrap(`
        <rect class="f-surf s-line" x="44" y="22" width="312" height="196" rx="12" stroke-width="2"/>
        ${rows}
        <rect class="f-acc" x="246" y="102" width="88" height="24" rx="12"/>
        <text x="290" y="118" text-anchor="middle" fill="#fff" font-size="11" font-weight="600" font-family="Instrument Sans, system-ui, sans-serif">Root cause</text>
      `);
    },

    shell: () =>
      wrap(`
        <rect class="f-ink" x="46" y="30" width="308" height="180" rx="12"/>
        <circle class="f-hi" cx="66" cy="48" r="4.5"/><circle class="f-bg" cx="82" cy="48" r="4.5" opacity=".4"/><circle class="f-bg" cx="98" cy="48" r="4.5" opacity=".4"/>
        <text x="64" y="86" class="f-bg" font-family="${MONO}" font-size="14"><tspan class="f-hi">$</tspan> ls | grep .c</text>
        <text x="64" y="108" class="f-bg" font-family="${MONO}" font-size="14" opacity=".7">main.c  shell.c</text>
        <text x="64" y="138" class="f-bg" font-family="${MONO}" font-size="14"><tspan class="f-hi">$</tspan> sleep 5 &amp;</text>
        <text x="64" y="160" class="f-bg" font-family="${MONO}" font-size="14" opacity=".7">[1] 4021</text>
        <text x="64" y="190" class="f-bg" font-family="${MONO}" font-size="14"><tspan class="f-hi">$</tspan></text>
        <rect class="f-hi" x="78" y="178" width="9" height="15" rx="1.5"/>
      `)
  };
})();
