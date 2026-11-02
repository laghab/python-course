// One registry for page-level shortcuts. It drives the key handling, the "?" overlay,
// tooltips and aria-keyshortcuts so they can never drift apart.
//
// Principles (GitHub/Primer, WCAG 2.1.4, common shortcut-design guidance):
//  * single-key shortcuts only fire when focus is NOT in a text field or the editor,
//    and they can be switched off in Settings;
//  * never take browser-reserved combos (Mod+K/L/N/T/W/S...);
//  * labels are OS-aware.

export const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
export const MOD = isMac ? '⌘' : 'Ctrl';

const SEQ_TIMEOUT = 1200;

export function createShortcuts({ enabled }) {
  const defs = [];
  let prefix = null, prefixTimer = null;

  function add(def) { defs.push(def); return api; }

  function inTextContext(el) {
    if (!el) return false;
    if (el.closest && el.closest('.cm-editor')) return true;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  function onKey(e) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
    if (!enabled()) return;
    if (document.querySelector('dialog[open]')) return; // dialogs handle their own keys
    if (inTextContext(e.target)) return;
    const k = e.key;
    if (prefix) {
      const hit = defs.find((d) => d.seq && d.seq[0] === prefix && d.seq[1] === k);
      clearTimeout(prefixTimer); prefix = null;
      if (hit) { e.preventDefault(); hit.run(); }
      return;
    }
    if (defs.some((d) => d.seq && d.seq[0] === k)) {
      prefix = k; prefixTimer = setTimeout(() => (prefix = null), SEQ_TIMEOUT);
      e.preventDefault();
      return;
    }
    const hit = defs.find((d) => d.keys && d.keys.includes(k));
    if (hit) { e.preventDefault(); hit.run(); }
  }

  const api = {
    add,
    defs,
    attach() { document.addEventListener('keydown', onKey); },
  };
  return api;
}

export const label = (def) =>
  def.seq ? def.seq.map(kbd).join(' <span class="then">then</span> ') : def.keys.map(kbd).join(' <span class="then">or</span> ');

export const kbd = (k) => `<kbd>${k === ' ' ? 'Space' : k.replace('<', '&lt;')}</kbd>`;
