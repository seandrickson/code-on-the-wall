import addWorker from "./common/add-worker.mjs";
import { htmlNode, codeNode } from "./common/get-node.mjs";
import loadCodeFromCdnjs from "./loaders/load-code-from-cdnjs.mjs";
import loadGoogleFont from "./loaders/load-google-font.mjs";
import loadHighlightStyle from "./loaders/load-highlight-style.mjs";
import { getConfig, getConfigValue } from "./config.mjs";

const generateFilename = () => {
  const code = getConfigValue("code");
  const style = getConfigValue("highlightStyle");
  return `${code}_${style}`;
};

// INITIALIZE STYLES
const googleFont = getConfigValue("googleFont");
const highlightStyle = getConfigValue("highlightStyle");

if (googleFont) loadGoogleFont(googleFont);
if (highlightStyle) loadHighlightStyle(highlightStyle);

Object.assign(htmlNode().style, getConfig());

// LOAD CODE FROM CDN
(async () => {
  const codeUrl = await loadCodeFromCdnjs(getConfigValue("code"));
  document.title = generateFilename(codeUrl);
  codeNode().innerHTML = await addWorker("./worker/worker.js", codeUrl).then(
    event => event.data
  );
})();
