import '../data/part1.js';
import '../data/part2.js';
import '../data/part3.js';
import '../data/part4.js';
import { md, esc } from './render.js';
import { renderDiff, normalize } from './diff.js';
import { createRunner } from './runner.js';
import { createEditor } from './editor.js';
import { createShortcuts, label, kbd, MOD } from './shortcuts.js';

const LESSONS = window.LESSONS;
const $ = (id) => document.getElementById(id);

/* ---------------- persistence ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('pc.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('pc.' + k, JSON.stringify(v)); } catch {} },
};

const state = {
  cur: Math.min(Math.max(0, store.get('cur', 0)), LESSONS.length - 1),
  done: store.get('done', {}),
  tab: 'out',
  lastRun: null, // { text, isErr, verdict, diffHtml }
  busy: false,
};
const prefs = {
  theme: store.get('theme', 'auto'),
  vim: store.get('vim', false),
  keys: store.get('keys', true),
  size: store.get('size', 14),
};

/* ---------------- Python runner ---------------- */
const pyLabel = { loading: 'Python loading…', ready: 'Python ready', running: 'Running…', failed: 'Python failed to load. Are you online?' };
const runner = createRunner('/python/worker.js', (s) => {
  $('py').textContent = pyLabel[s] || s;
  $('py').dataset.state = s;
});

/* ---------------- editor ---------------- */
let saveTimer = null;
const editor = createEditor($('editor'), {
  onRun: (o) => exec(false, o),
  onSubmit: (o) => exec(true, o),
  onChange: (text) => { clearTimeout(saveTimer); saveTimer = setTimeout(() => store.set('code.' + state.cur, text), 250); },
  onCursor: (ln, col) => { $('pos').textContent = `Ln ${ln}, Col ${col}`; },
  onModeChange: (m) => {
    const el = $('mode');
    if (!m) { el.hidden = true; return; }
    el.hidden = false;
    el.textContent = m.replace('visual-', 'v-').toUpperCase();
    el.dataset.mode = m.split('-')[0];
  },
  onLeave: () => $('page').focus(),
  ex: {
    reset: () => resetCode(),
    next: () => go(state.cur + 1),
    prev: () => go(state.cur - 1),
    solution: () => toggleSolution(),
    help: () => openDialog('help'),
    contents: () => openContents(),
    setVim: (on) => setVim(on),
  },
});

/* ---------------- lesson rendering ---------------- */
function lessonHtml(i) {
  const l = LESSONS[i];
  const prev = LESSONS[i - 1], next = LESSONS[i + 1];
  return `
    <p class="kicker">${esc(l.ch)} <span class="dot">·</span> Lesson ${i + 1}</p>
    <h1>${esc(l.title)}</h1>
    <div class="prose">${md(l.body)}</div>
    <section class="challenge" aria-label="Challenge">
      <h2 class="label">Your challenge</h2>
      <div class="prose">${md(l.task)}</div>
      ${l.stdin ? '<p class="fine">This program reads from standard input. See the <em>Input</em> tab in the console.</p>' : ''}
    </section>
    <details class="solution" id="solution">
      <summary>Solution <span class="hint">${kbd('s')}</span></summary>
      <pre class="ex"><code>${esc(l.solution.trimEnd())}</code></pre>
      <button type="button" class="link" id="useSolution">Copy into editor</button>
    </details>
    <nav class="turn" aria-label="Turn the page">
      ${prev ? `<button type="button" class="link" data-go="${i - 1}"><span class="dir">‹ Previous</span><span class="name">${esc(prev.title)}</span></button>` : '<span></span>'}
      ${next ? `<button type="button" class="link right" data-go="${i + 1}"><span class="dir">Next ›</span><span class="name">${esc(next.title)}</span></button>` : '<span></span>'}
    </nav>`;
}

function go(i) {
  if (i < 0 || i >= LESSONS.length) return;
  load(i);
}

function load(i) {
  state.cur = i;
  store.set('cur', i);
  const l = LESSONS[i];
  const page = $('page');
  page.innerHTML = lessonHtml(i);
  page.scrollTop = 0;
  page.classList.remove('turning'); void page.offsetWidth; page.classList.add('turning');
  editor.set(store.get('code.' + i, l.starter));
  $('filename').textContent = `lesson_${String(i + 1).padStart(3, '0')}.py`;
  $('folio').textContent = `${i + 1} of ${LESSONS.length}`;
  $('prevBtn').disabled = i === 0;
  $('nextBtn').disabled = i === LESSONS.length - 1;
  $('stdinTab').hidden = !l.stdin;
  state.lastRun = null;
  setVerdict('', '');
  showTab('out');
  document.title = `${l.title} · Python for Beginners`;
  updateProgress();
  page.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => go(+b.dataset.go)));
  $('useSolution').onclick = () => { editor.set(l.solution); editor.focus(); };
}

function updateProgress() {
  const n = Object.keys(state.done).length;
  const pct = (100 * n) / LESSONS.length;
  $('progress').firstElementChild.style.width = pct + '%';
  $('progress').setAttribute('aria-label', `${n} of ${LESSONS.length} lessons complete`);
  $('progress').title = `${n} of ${LESSONS.length} complete`;
}

/* ---------------- console ---------------- */
function setVerdict(text, kind) { const v = $('verdict'); v.textContent = text; v.dataset.kind = kind; }

function showTab(t) {
  state.tab = t;
  document.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === t)));
  const body = $('consoleBody');
  const l = LESSONS[state.cur];
  if (t === 'exp') body.innerHTML = `<pre class="out">${esc(normalize(l.expected))}</pre>`;
  else if (t === 'in') body.innerHTML = `<pre class="out">${esc(l.stdin.replace(/\n$/, ''))}</pre>`;
  else if (!state.lastRun) {
    body.innerHTML = `<p class="placeholder">Run your program with ${kbd(MOD)} ${kbd("'")} or submit it with ${kbd(MOD)} ${kbd('Enter')}.</p>`;
  } else {
    const r = state.lastRun;
    body.innerHTML = (r.banner || '') + `<pre class="out${r.isErr ? ' err' : ''}">${esc(r.text)}</pre>` + (r.diffHtml || '');
    const nb = body.querySelector('[data-next]');
    if (nb) nb.onclick = () => go(state.cur + 1);
  }
}

async function exec(submit, { leave = false } = {}) {
  if (leave) $('page').focus({ preventScroll: true });
  if (state.busy) return;
  state.busy = true;
  const l = LESSONS[state.cur];
  const code = editor.get();
  store.set('code.' + state.cur, code);
  $('runBtn').disabled = $('submitBtn').disabled = true;
  setVerdict(runner.isReady() ? 'Running…' : 'Waiting for Python…', 'pending');
  const res = await runner.run(code, l.stdin);
  $('runBtn').disabled = $('submitBtn').disabled = false;
  state.busy = false;

  let text = res.out || '';
  if (res.err) text += (text && !text.endsWith('\n') ? '\n' : '') + res.err;
  const run = { text: text || '(no output)', isErr: !!res.err };

  if (!submit) {
    setVerdict(res.err ? 'Error' : '', res.err ? 'bad' : '');
  } else {
    const ok = !res.err && normalize(res.out) === normalize(l.expected);
    if (ok) {
      state.done[state.cur] = true;
      store.set('done', state.done);
      updateProgress();
      const next = LESSONS[state.cur + 1];
      setVerdict('Accepted', 'ok');
      run.banner = next
        ? `<p class="banner ok">Well done. <button type="button" class="link" data-next>Continue to “${esc(next.title)}” ›</button> <span class="hint">${kbd(']')}</span></p>`
        : `<p class="banner ok">That was the last lesson. You finished the course.</p>`;
    } else {
      setVerdict('Not quite', 'bad');
      if (!res.err) run.diffHtml = renderDiff(l.expected, res.out);
    }
  }
  state.lastRun = run;
  showTab('out');
}

function resetCode() {
  if (!confirm('Replace your code with the starter code?')) return;
  const s = LESSONS[state.cur].starter;
  store.set('code.' + state.cur, s);
  editor.set(s);
}

function toggleSolution() {
  const d = $('solution');
  if (!d) return;
  d.open = !d.open;
  if (d.open) d.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

/* ---------------- dialogs ---------------- */
function openDialog(id) {
  document.querySelectorAll('dialog[open]').forEach((d) => d.close());
  const d = $(id);
  d.showModal();
  return d;
}
document.querySelectorAll('dialog').forEach((d) => {
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); }); // click on backdrop
  d.querySelectorAll('[data-close]').forEach((b) => (b.onclick = () => d.close()));
});

// Contents: a book-style table of contents with a filter.
function buildToc(filter = '') {
  const f = filter.trim().toLowerCase();
  let html = '', last = '', shown = 0;
  LESSONS.forEach((l, i) => {
    const hay = (l.title + ' ' + l.ch).toLowerCase();
    if (f && !f.split(/\s+/).every((w) => hay.includes(w)) && String(i + 1) !== f) return;
    if (l.ch !== last) { html += `<h3>${esc(l.ch)}</h3>`; last = l.ch; }
    html += `<a href="#" class="entry${i === state.cur ? ' cur' : ''}" data-i="${i}">
      <span class="mark">${state.done[i] ? '✓' : ''}</span><span class="t">${esc(l.title)}</span><span class="leader"></span><span class="n">${i + 1}</span></a>`;
    shown++;
  });
  $('tocList').innerHTML = html || '<p class="placeholder">No lessons match.</p>';
  $('tocCount').textContent = `${Object.keys(state.done).length} of ${LESSONS.length} complete`;
  $('tocList').querySelectorAll('.entry').forEach((a) => (a.onclick = (e) => { e.preventDefault(); $('contents').close(); go(+a.dataset.i); }));
  return shown;
}
function openContents() {
  $('tocFilter').value = '';
  buildToc();
  openDialog('contents');
  $('tocFilter').focus();
  const c = $('tocList').querySelector('.cur');
  if (c) c.scrollIntoView({ block: 'center' });
}
$('tocFilter').addEventListener('input', (e) => buildToc(e.target.value));
$('tocFilter').addEventListener('keydown', (e) => {
  const entries = [...$('tocList').querySelectorAll('.entry')];
  if (e.key === 'Enter' && entries[0]) { e.preventDefault(); entries[0].click(); }
  if (e.key === 'ArrowDown' && entries[0]) { e.preventDefault(); entries[0].focus(); }
});
$('tocList').addEventListener('keydown', (e) => {
  const entries = [...$('tocList').querySelectorAll('.entry')];
  const i = entries.indexOf(document.activeElement);
  if (i < 0) return;
  if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); entries[Math.min(i + 1, entries.length - 1)].focus(); }
  if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); if (i === 0) $('tocFilter').focus(); else entries[i - 1].focus(); }
});
$('resetAll').onclick = () => {
  if (!confirm('Erase all progress and all saved code? This cannot be undone.')) return;
  Object.keys(localStorage).filter((k) => k.startsWith('pc.code.') || k === 'pc.done' || k === 'pc.cur').forEach((k) => localStorage.removeItem(k));
  state.done = {};
  $('contents').close();
  load(0);
};

/* ---------------- settings ---------------- */
function applyTheme() {
  if (prefs.theme === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = prefs.theme;
  document.querySelectorAll('input[name="theme"]').forEach((r) => (r.checked = r.value === prefs.theme));
}
function setTheme(t) { prefs.theme = t; store.set('theme', t); applyTheme(); }
function cycleTheme() {
  const order = ['auto', 'light', 'dark'];
  setTheme(order[(order.indexOf(prefs.theme) + 1) % order.length]);
  flash(`Theme: ${{ auto: 'follow system', light: 'paper', dark: 'ink' }[prefs.theme]}`);
}
function setVim(on) { prefs.vim = on; store.set('vim', on); $('optVim').checked = on; editor.setVim(on); }
document.querySelectorAll('input[name="theme"]').forEach((r) => (r.onchange = () => setTheme(r.value)));
$('optVim').onchange = (e) => setVim(e.target.checked);
$('optKeys').onchange = (e) => { prefs.keys = e.target.checked; store.set('keys', prefs.keys); renderHelp(); };
$('optSize').oninput = (e) => { prefs.size = +e.target.value; store.set('size', prefs.size); $('optSizeOut').textContent = prefs.size + 'px'; editor.setFontSize(prefs.size); };

let flashTimer;
function flash(msg) {
  const v = $('verdict');
  const prev = [v.textContent, v.dataset.kind];
  setVerdict(msg, 'info');
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => setVerdict(prev[0], prev[1]), 1400);
}

/* ---------------- shortcuts ---------------- */
const page = $('page');
const scrollBy = (dy) => page.scrollBy({ top: dy, behavior: 'auto' });
const sc = createShortcuts({ enabled: () => prefs.keys });
sc
  .add({ group: 'Getting around', keys: ['?'], desc: 'Show keyboard shortcuts', run: () => openDialog('help') })
  .add({ group: 'Getting around', keys: ['/'], desc: 'Contents and search', run: openContents })
  .add({ group: 'Getting around', seq: ['g', 'c'], desc: 'Contents', run: openContents })
  .add({ group: 'Getting around', keys: [']'], desc: 'Next lesson', run: () => go(state.cur + 1) })
  .add({ group: 'Getting around', keys: ['['], desc: 'Previous lesson', run: () => go(state.cur - 1) })
  .add({ group: 'Getting around', seq: ['g', 'n'], desc: 'Next unfinished lesson', run: () => {
      const n = LESSONS.findIndex((_, i) => i > state.cur && !state.done[i]);
      const any = n >= 0 ? n : LESSONS.findIndex((_, i) => !state.done[i]);
      if (any >= 0) go(any); else flash('Every lesson is complete');
    } })
  .add({ group: 'Reading', keys: ['j'], desc: 'Scroll down', run: () => scrollBy(80) })
  .add({ group: 'Reading', keys: ['k'], desc: 'Scroll up', run: () => scrollBy(-80) })
  .add({ group: 'Reading', seq: ['g', 'g'], desc: 'Top of lesson', run: () => (page.scrollTop = 0) })
  .add({ group: 'Reading', keys: ['G'], desc: 'End of lesson', run: () => (page.scrollTop = page.scrollHeight) })
  .add({ group: 'Reading', keys: ['s'], desc: 'Show or hide the solution', run: toggleSolution })
  .add({ group: 'Working', keys: ['e', 'i'], desc: 'Focus the editor', run: () => editor.focus() })
  .add({ group: 'Working', keys: ['t'], desc: 'Cycle theme (system, paper, ink)', run: cycleTheme })
  .add({ group: 'Working', keys: [','], desc: 'Settings', run: () => openDialog('settings') });
sc.attach();

// global Mod+Enter / Mod+' also work outside the editor
document.addEventListener('keydown', (e) => {
  if (!(e.ctrlKey || e.metaKey) || e.altKey || e.target.closest?.('.cm-editor') || document.querySelector('dialog[open]')) return;
  if (e.key === 'Enter') { e.preventDefault(); exec(true); }
  else if (e.key === "'" || e.key === '`') { e.preventDefault(); exec(false); }
});

function renderHelp() {
  const groups = {};
  sc.defs.forEach((d) => (groups[d.group] ||= []).push(d));
  const row = (keys, desc) => `<tr><td class="keys">${keys}</td><td>${desc}</td></tr>`;
  let html = '<div class="help-cols">';
  html += `<section><h3>Anywhere, even in the editor</h3><table>
    ${row(`${kbd(MOD)} ${kbd('Enter')}`, 'Submit, then leave the editor (so <kbd>]</kbd> goes on)')}
    ${row(`${kbd(MOD)} ${kbd("'")} <span class="then">or</span> ${kbd(MOD)} ${kbd('`')}`, 'Run, then leave the editor')}
    ${row(kbd('Esc'), 'Leave the editor, or close a panel')}
    ${row(kbd('Tab'), 'Indent (in the editor). Press Esc first to move focus on')}
  </table></section>`;
  for (const [g, list] of Object.entries(groups)) {
    html += `<section><h3>${g}${prefs.keys ? '' : ' <span class="off">(off)</span>'}</h3><table>${list.map((d) => row(label(d), d.desc)).join('')}</table></section>`;
  }
  html += `<section><h3>Vim commands <span class="fine">(with vim keybindings on)</span></h3><table>
    ${row('<kbd>:w</kbd>', 'Run')}
    ${row('<kbd>:wq</kbd> or <kbd>:x</kbd>', 'Submit')}
    ${row('<kbd>:e</kbd>', 'Reset to the starter code')}
    ${row('<kbd>:n</kbd> / <kbd>:N</kbd>', 'Next / previous lesson')}
    ${row('<kbd>:sol</kbd>', 'Toggle the solution')}
    ${row('<kbd>:toc</kbd>', 'Contents')}
    ${row('<kbd>:h</kbd>', 'This help')}
    ${row('<kbd>:set novim</kbd>', 'Turn vim keybindings off')}
  </table></section></div>`;
  html += `<p class="fine">Single-key shortcuts work only when the editor isn’t focused, and you can turn them off in Settings.</p>`;
  $('helpBody').innerHTML = html;
}

/* ---------------- splitters ---------------- */
function splitter(gutter, axis, key, min, max, apply) {
  let v = store.get(key, null);
  if (v !== null) apply(v);
  const set = (x) => { v = Math.min(max, Math.max(min, x)); apply(v); };
  gutter.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    gutter.setPointerCapture(e.pointerId);
    document.body.classList.add('dragging');
    const box = gutter.parentElement.getBoundingClientRect();
    const move = (ev) => set(axis === 'x' ? ((ev.clientX - box.left) / box.width) * 100 : ((box.bottom - ev.clientY) / box.height) * 100);
    const up = () => { gutter.removeEventListener('pointermove', move); document.body.classList.remove('dragging'); store.set(key, v); };
    gutter.addEventListener('pointermove', move);
    gutter.addEventListener('pointerup', up, { once: true });
  });
  gutter.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 10 : 2;
    const cur = v ?? (axis === 'x' ? 46 : 34);
    const dec = axis === 'x' ? 'ArrowLeft' : 'ArrowDown', inc = axis === 'x' ? 'ArrowRight' : 'ArrowUp';
    if (e.key === dec) { e.preventDefault(); set(cur - step); store.set(key, v); }
    if (e.key === inc) { e.preventDefault(); set(cur + step); store.set(key, v); }
  });
}
splitter($('gutterV'), 'x', 'splitV', 28, 70, (p) => document.documentElement.style.setProperty('--left', p + '%'));
splitter($('gutterH'), 'y', 'splitH', 15, 70, (p) => document.documentElement.style.setProperty('--console', p + '%'));

/* ---------------- wiring ---------------- */
$('contentsBtn').onclick = openContents;
$('helpBtn').onclick = () => openDialog('help');
$('settingsBtn').onclick = () => openDialog('settings');
$('prevBtn').onclick = () => go(state.cur - 1);
$('nextBtn').onclick = () => go(state.cur + 1);
$('runBtn').onclick = () => exec(false);
$('submitBtn').onclick = () => exec(true);
$('resetBtn').onclick = resetCode;
$('runBtn').title = `Run (${MOD}+')`;
$('submitBtn').title = `Submit (${MOD}+Enter)`;
$('prevBtn').title = 'Previous lesson ([)';
$('nextBtn').title = 'Next lesson (])';
$('contentsBtn').title = 'Contents (/)';
document.querySelectorAll('.tab').forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));

applyTheme();
$('optKeys').checked = prefs.keys;
$('optSize').value = prefs.size;
$('optSizeOut').textContent = prefs.size + 'px';
editor.setFontSize(prefs.size);
renderHelp();
load(state.cur);
if (prefs.vim) setVim(true);

// expose a tiny hook for automated smoke tests
window.__course = { go, exec, editor, state, prefs, setVim };
