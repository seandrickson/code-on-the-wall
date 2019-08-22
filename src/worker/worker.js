importScripts("/src/lib/highlight/highlight.pack.js");

const cleanCodeText = text => {
  return String(text)
    .replace(/[\n\r]/g, "") // remove new lines
    .replace(/\/\*[\S\s]*?\*\//g, ""); // remove comment blocks
};

onmessage = async event => {
  const code = await fetch(event.data)
    .then(res => res.text())
    .then(cleanCodeText);
  const result = self.hljs.highlightAuto(code);
  postMessage(result.value);
};
