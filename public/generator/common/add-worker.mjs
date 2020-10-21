export default (src, data) =>
  new Promise((resolve, reject) => {
    const worker = new Worker(src);
    worker.onmessage = resolve;
    worker.onerror = reject;
    worker.src = src;
    worker.postMessage(data);
  });
