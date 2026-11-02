// Wraps the Pyodide worker: one job at a time, hard timeout that kills and restarts the worker.
const TIMEOUT_MS = 8000;
const FIRST_LOAD_GRACE_MS = 45000;

export function createRunner(workerUrl, onStatus) {
  let worker, ready = false, pending = null, jobId = 0;

  function start() {
    ready = false;
    onStatus('loading');
    worker = new Worker(workerUrl);
    worker.onmessage = (ev) => {
      const m = ev.data;
      if (m.type === 'ready') { ready = true; onStatus('ready'); }
      else if (m.type === 'fail') { onStatus('failed'); }
      else if (m.type === 'done' && pending && pending.id === m.id) {
        clearTimeout(pending.timer);
        const p = pending; pending = null;
        onStatus('ready');
        p.resolve(m);
      }
    };
    worker.onerror = () => onStatus('failed');
  }

  function run(code, stdin) {
    return new Promise((resolve) => {
      const id = ++jobId;
      const limit = TIMEOUT_MS + (ready ? 0 : FIRST_LOAD_GRACE_MS);
      const timer = setTimeout(() => {
        worker.terminate();
        pending = null;
        start();
        resolve({ out: '', err: 'TimeoutError: your program ran for more than 8 seconds.\nIs there a loop that never ends?' });
      }, limit);
      pending = { id, resolve, timer };
      if (ready) onStatus('running');
      worker.postMessage({ code, stdin, id });
    });
  }

  start();
  return { run, isReady: () => ready };
}
