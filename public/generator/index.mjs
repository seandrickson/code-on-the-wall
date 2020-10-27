import addScript from "./common/add-script.mjs";
import { parentNode, codeNode } from "./common/get-node.mjs";
import loadCodeFromCdnjs from "./loaders/load-code-from-cdnjs.mjs";
import loadGoogleFont from "./loaders/load-google-font.mjs";
import loadHighlightStyle from "./loaders/load-highlight-style.mjs";
import { getConfig, getConfigValue } from "./config.mjs";

const highlightUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/highlight.min.js";

const generateFilename = () =>
  `${getConfigValue("code")}_${getConfigValue("highlightStyle")}`;

const cleanCodeText = (text) =>
  String(text)
    .replace(/^\/\/[\S\s]*?\n/g, "") // remove comment lines
    .replace(/[\n\r]/g, "") // remove new lines
    .replace(/\/\*[\S\s]*?\*\//g, ""); // remove comment blocks

// INITIALIZE STYLES
const googleFont = getConfigValue("googleFont");
const highlightStyle = getConfigValue("highlightStyle");

if (googleFont) loadGoogleFont(googleFont);
if (highlightStyle) loadHighlightStyle(highlightStyle);

Object.assign(parentNode().style, getConfig());

// LOAD CODE FROM CDN
(async () => {
  const codeUrl =
    (await loadCodeFromCdnjs(getConfigValue("code"))) || highlightUrl;
  document.title = generateFilename(codeUrl);

  codeNode().innerHTML = await Promise.all([
    fetch(codeUrl),
    addScript(highlightUrl),
  ])
    .then(([res]) => res.text())
    .then(cleanCodeText)
    .then((codeNode) => {
      window.hljs.configure({
        tabReplace: " ",
      });
      const code = window.hljs.highlight("javascript", codeNode);
      return code.value;
    });
})();
