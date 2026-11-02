// Tiny markup for lesson text.
//   blank line        -> new paragraph
//   4-space indent    -> code block
//   "- " lines        -> bullet list
//   ~code~ **bold** *italic*
export const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function inline(s) {
  const codes = [];
  s = esc(s).replace(/~([^~]+)~/g, (_, c) => {
    codes.push('<code>' + c + '</code>');
    return '\u0000' + (codes.length - 1) + '\u0000';
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => codes[+i]);
}

const isCode = (block) => block.split('\n').every((l) => l.startsWith('    ') || !l.trim());

export function md(text) {
  // Blank lines inside a code example must not split it into separate blocks.
  const blocks = [];
  for (const b of text.split(/\n\s*\n/)) {
    if (blocks.length && isCode(b) && isCode(blocks[blocks.length - 1])) blocks[blocks.length - 1] += '\n\n' + b;
    else blocks.push(b);
  }
  return blocks.map((block) => {
    const lines = block.split('\n');
    if (isCode(block))
      return '<pre class="ex"><code>' + esc(lines.map((l) => l.slice(4)).join('\n')) + '</code></pre>';
    if (lines.every((l) => l.startsWith('- ')))
      return '<ul>' + lines.map((l) => '<li>' + inline(l.slice(2)) + '</li>').join('') + '</ul>';
    return '<p>' + inline(lines.join(' ')) + '</p>';
  }).join('');
}
