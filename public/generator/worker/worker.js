importScripts(
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"
);

const cleanCodeText = text => {
  return String(text)
    .replace(/[\n\r]/g, "") // remove new lines
    .replace(/\/\*[\S\s]*?\*\//g, ""); // remove comment blocks
};

onmessage = async event => {
  const url = event.data;
  const code = await fetch(url)
    .then(res => res.text())
    .then(cleanCodeText);
  const result = self.hljs.highlightAuto(code);
  postMessage(result.value);
};
