export default (src, data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(src);
    worker.onmessage = resolve;
    worker.onerror = reject;
    worker.src = src;
    worker.postMessage(data);
  });
};
