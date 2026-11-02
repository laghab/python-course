import { esc } from './render.js';

export const normalize = (s) =>
  s.replace(/\r/g, '').split('\n').map((x) => x.replace(/\s+$/, '')).join('\n').trim();

// Line-by-line comparison rendered as a two-column table.
export function renderDiff(expected, actual) {
  const e = normalize(expected).split('\n');
  const a = normalize(actual).split('\n');
  const n = Math.max(e.length, a.length);
  let first = -1;
  let rows = '';
  for (let i = 0; i < n; i++) {
    const ev = e[i], av = a[i];
    const same = ev === av;
    if (!same && first < 0) first = i;
    const show = (v) => (v === undefined ? '<span class="nil">(missing)</span>' : v === '' ? '<span class="nil">(empty line)</span>' : esc(v));
    rows += `<tr class="${same ? '' : 'bad'}${i === first ? ' first' : ''}"><td class="ln">${i + 1}</td><td>${show(ev)}</td><td>${show(av)}</td></tr>`;
  }
  const note = first < 0 ? '' : `<p class="diff-note">First difference on line ${first + 1}.</p>`;
  return `${note}<table class="diff"><thead><tr><th></th><th>Expected</th><th>Your output</th></tr></thead><tbody>${rows}</tbody></table>`;
}
