onmessage = event => {
  importScripts("../lib/highlight/highlight.pack.js");
  const result = self.hljs.highlightAuto(event.data);
  postMessage(result.value);
};
