import { EditorState, Compartment, Prec } from '@codemirror/state';
import {
  EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter,
  drawSelection, highlightSpecialChars,
} from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { indentOnInput, bracketMatching, syntaxHighlighting, HighlightStyle, indentUnit } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { tags as t } from '@lezer/highlight';
// vim mode is loaded on demand (it's ~40% of the editor's weight)
let vimMod = null;
const loadVim = async () => (vimMod ||= await import('@replit/codemirror-vim'));

// Colours come from CSS variables so theme switches need no reconfiguration.
const inkHighlight = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.operatorKeyword, t.definitionKeyword, t.moduleKeyword], color: 'var(--syn-kw)', fontWeight: '500' },
  { tag: [t.string, t.special(t.string)], color: 'var(--syn-str)' },
  { tag: [t.number, t.bool, t.null], color: 'var(--syn-num)' },
  { tag: [t.comment, t.lineComment], color: 'var(--syn-com)', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: 'var(--syn-fn)' },
  { tag: [t.definition(t.variableName), t.definition(t.function(t.variableName))], color: 'var(--syn-def)' },
  { tag: [t.className, t.definition(t.className)], color: 'var(--syn-def)', fontWeight: '500' },
  { tag: [t.self, t.special(t.variableName)], color: 'var(--syn-kw)', fontStyle: 'italic' },
  { tag: [t.operator, t.punctuation, t.bracket], color: 'var(--syn-punct)' },
]);

const paperTheme = EditorView.theme({
  '&': { height: '100%', backgroundColor: 'var(--code-bg)', color: 'var(--ink)' },
  '.cm-scroller': { fontFamily: 'var(--mono)', lineHeight: '1.6' },
  '.cm-content': { caretColor: 'var(--accent)', padding: '14px 0' },
  '.cm-gutters': { backgroundColor: 'var(--code-bg)', color: 'var(--faint)', border: 'none', paddingLeft: '6px' },
  '.cm-lineNumbers .cm-gutterElement': { padding: '0 14px 0 6px', minWidth: '2.5em' },
  '.cm-activeLine': { backgroundColor: 'var(--code-line)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--muted)' },
  '&.cm-focused': { outline: 'none' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--accent)', borderLeftWidth: '2px' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: 'var(--selection) !important' },
  '.cm-matchingBracket': { backgroundColor: 'transparent', outline: '1px solid var(--accent-soft)' },
  '.cm-selectionMatch': { backgroundColor: 'var(--code-line)' },
  '.cm-fat-cursor': { background: 'var(--accent) !important', color: 'var(--paper) !important' },
  '&:not(.cm-focused) .cm-fat-cursor': { background: 'none !important', outline: '1px solid var(--accent)' },
  '.cm-panels': { backgroundColor: 'var(--paper-2)', color: 'var(--ink)', borderTop: '1px solid var(--rule)', fontFamily: 'var(--mono)', fontSize: '13px' },
  '.cm-panels input': { fontFamily: 'var(--mono)', color: 'var(--ink)' },
  '.cm-vim-panel': { padding: '2px 10px' },
});

export function createEditor(parent, { onRun, onSubmit, onChange, onCursor, onModeChange, onLeave, ex }) {
  const vimComp = new Compartment();
  const sizeComp = new Compartment();
  let vimOn = false;

  const fontSize = (px) => EditorView.theme({ '.cm-scroller': { fontSize: px + 'px' } });

  const appKeys = Prec.highest(keymap.of([
    // Keyboard run/submit also leave the editor, so ] can go straight to the next lesson.
    { key: 'Mod-Enter', run: () => { onSubmit({ leave: true }); return true; } },
    { key: "Mod-'", run: () => { onRun({ leave: true }); return true; } },
    { key: 'Mod-`', run: () => { onRun({ leave: true }); return true; } },
  ]));

  // Esc leaves the editor: always in plain mode; in vim mode only from NORMAL.
  const escLeaves = Prec.highest(EditorView.domEventHandlers({
    keydown(e, view) {
      if (e.key !== 'Escape' || e.ctrlKey || e.metaKey || e.altKey) return false;
      if (!vimOn) { onLeave(); return true; }
      const st = vimMod?.getCM(view)?.state?.vim;
      const busy = st && (st.insertMode || st.visualMode || (st.inputState && st.inputState.keyBuffer && st.inputState.keyBuffer.length));
      if (!busy && !document.querySelector('.cm-vim-panel input')) { onLeave(); return true; }
      return false;
    },
  }));

  let curSize = 14;
  const makeState = (doc) => EditorState.create({
    doc,
    extensions: [
      vimComp.of(vimOn && vimMod ? vimMod.vim({ status: true }) : []),
      appKeys,
      escLeaves,
      lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), history(), drawSelection(),
      indentOnInput(), bracketMatching(), closeBrackets(), highlightActiveLine(), highlightSelectionMatches(),
      indentUnit.of('    '), EditorState.tabSize.of(4),
      python(), syntaxHighlighting(inkHighlight), paperTheme, sizeComp.of(fontSize(curSize)),
      keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, indentWithTab]),
      EditorView.contentAttributes.of({ 'aria-label': 'Python code editor', spellcheck: 'false', autocapitalize: 'off', autocorrect: 'off' }),
      EditorView.updateListener.of((u) => {
        if (u.docChanged) onChange(u.state.doc.toString());
        if (u.selectionSet || u.docChanged) {
          const pos = u.state.selection.main.head;
          const line = u.state.doc.lineAt(pos);
          onCursor(line.number, pos - line.from + 1);
        }
      }),
    ],
  });

  const view = new EditorView({ parent, state: makeState('') });

  // ---- vim Ex commands (defined once, when vim first loads) ----
  let exDefined = false;
  function defineEx(V) {
    if (exDefined) return;
    exDefined = true;
    // one bad definition must never take vim mode down with it
    const Vim = {
      // Ex actions run on the next tick: vim is still finishing the command, and
      // swapping the editor state underneath it (e.g. :n loads a lesson) breaks it.
      defineEx: (name, prefix, fn) => { try { V.defineEx(name, prefix, () => setTimeout(fn)); } catch (e) { console.warn(e); } },
      defineOption: (...a) => { try { V.defineOption(...a); } catch (e) { console.warn(e); } },
    };
    Vim.defineEx('write', 'w', () => onRun());
    Vim.defineEx('wq', 'wq', () => onSubmit());
    Vim.defineEx('xit', 'x', () => onSubmit());
    Vim.defineEx('edit', 'e', () => ex.reset());
    Vim.defineEx('next', 'n', () => ex.next());
    Vim.defineEx('Next', 'N', () => ex.prev());
    Vim.defineEx('previous', 'prev', () => ex.prev());
    Vim.defineEx('solution', 'sol', () => ex.solution());
    Vim.defineEx('help', 'h', () => ex.help());
    Vim.defineEx('toc', 'toc', () => ex.contents());
    Vim.defineOption('vim', true, 'boolean', [], (value) => {
      if (value === undefined) return vimOn;
      if (value === false) setTimeout(() => ex.setVim(false));
    });
  }

  let modeHooked = false;
  function hookMode() {
    const cm = vimMod && vimMod.getCM(view);
    if (!cm || modeHooked) return;
    modeHooked = true;
    cm.on('vim-mode-change', (m) => onModeChange(m.mode + (m.subMode ? '-' + m.subMode : '')));
  }

  return {
    view,
    get: () => view.state.doc.toString(),
    // A new lesson gets a fresh state, so undo history never crosses lessons.
    set(text) {
      view.setState(makeState(text));
      modeHooked = false;
      if (vimOn) { hookMode(); onModeChange('normal'); }
      onCursor(1, 1);
    },
    // Replace the text as one undoable change (Ctrl+Z or vim u brings it back).
    replace(text) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text }, selection: { anchor: 0 }, userEvent: 'input.reset' });
    },
    focus: () => view.focus(),
    async setVim(on) {
      if (on) { await loadVim(); defineEx(vimMod.Vim); }
      vimOn = on;
      modeHooked = false;
      view.dispatch({ effects: vimComp.reconfigure(on ? vimMod.vim({ status: true }) : []) });
      if (on) { hookMode(); onModeChange('normal'); } else onModeChange(null);
    },
    setFontSize(px) { curSize = px; view.dispatch({ effects: sizeComp.reconfigure(fontSize(px)) }); },
  };
}
