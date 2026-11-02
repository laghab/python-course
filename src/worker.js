/* Pyodide worker: runs one program per message, with fresh globals each time. */
importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
let py;
const ready = loadPyodide().then(p => { py = p; postMessage({ type: 'ready' }); })
  .catch(e => postMessage({ type: 'fail', error: String(e) }));

onmessage = async (e) => {
  await ready;
  const { code, stdin, id } = e.data;
  let out = '';
  const lines = stdin.split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  let idx = 0;
  py.setStdin({ stdin: () => (idx < lines.length ? lines[idx++] : null) });
  py.setStdout({ batched: s => { out += s + '\n'; } });
  py.setStderr({ batched: s => { out += s + '\n'; } });
  let err = null;
  try {
    const g = py.pyimport('builtins').dict();
    py.runPython(code, { globals: g });
    g.destroy();
  } catch (ex) {
    err = String(ex.message || ex);
    const i = err.indexOf('File "<exec>"');
    if (i > 0) err = 'Traceback (most recent call last):\n  ' + err.slice(i);
  }
  postMessage({ type: 'done', id, out, err });
};
