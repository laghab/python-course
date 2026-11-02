// Build: bundles src/ into dist/python/ with content-hashed JS/CSS.
//   node build.mjs           production build
//   node build.mjs --serve   build, then serve on http://localhost:8000/python/
import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { join, extname } from 'node:path';

const OUT = 'dist/python';
rmSync('dist', { recursive: true, force: true });
mkdirSync(OUT + '/fonts', { recursive: true });

const result = await esbuild.build({
  entryPoints: { app: 'src/main.js', style: 'src/styles.css' },
  bundle: true,
  minify: true,
  format: 'esm',
  splitting: true,
  chunkNames: 'chunk-[hash]',
  target: ['es2020'],
  outdir: OUT,
  entryNames: '[name]-[hash]',
  external: ['/python/fonts/*'],
  metafile: true,
  legalComments: 'none',
  logLevel: 'warning',
});

const outputs = Object.keys(result.metafile.outputs).map((p) => p.replace(OUT + '/', ''));
const js = outputs.find((f) => f.startsWith('app-') && f.endsWith('.js'));
const css = outputs.find((f) => f.startsWith('style-') && f.endsWith('.css'));

writeFileSync(join(OUT, 'index.html'), readFileSync('src/index.html', 'utf8').replace('__JS__', js).replace('__CSS__', css));
copyFileSync('src/worker.js', join(OUT, 'worker.js'));

const fonts = {
  'serif.woff2': 'node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2',
  'serif-italic.woff2': 'node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-italic.woff2',
  'mono-400.woff2': 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
  'mono-500.woff2': 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',
  'mono-400-italic.woff2': 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-italic.woff2',
};
for (const [name, src] of Object.entries(fonts)) copyFileSync(src, join(OUT, 'fonts', name));

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
for (const f of readdirSync(OUT)) {
  const p = join(OUT, f);
  if (statSync(p).isFile()) { const b = readFileSync(p); console.log(`${f.padEnd(28)} ${kb(b.length).padStart(10)}  gzip ${kb(gzipSync(b).length)}`); }
}

if (process.argv.includes('--serve')) {
  const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' };
  createServer((req, res) => {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/' ) { res.writeHead(302, { Location: '/python/' }); return res.end(); }
    if (url === '/python' || url === '/python/') url = '/python/index.html';
    const file = join('dist', url);
    try {
      const body = readFileSync(file);
      res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end('not found'); }
  }).listen(8000, () => console.log('serving http://localhost:8000/python/'));
}
