import { getConfigValue } from "./includes/config.mjs";
import cleanCodeText from "./includes/clean-code-text.mjs";
import loadHighlightJs from "./includes/loaders/load-highlight-js.mjs";
import addZwsForWrapping from "./includes/add-zws-for-wrapping.mjs";
import finalize from "./includes/finalize.mjs";
import { codeNode } from "./includes/common/get-node.mjs";
import loadStyles from "./includes/loaders/load-styles.mjs";
import loadCodeFromCdnjs from "./includes/loaders/load-code-from-cdnjs.mjs";

(async () => {
  // INITIALIZE
  loadStyles();
  const jsCode = await loadCodeFromCdnjs(getConfigValue("code"));
  document.title = jsCode.split("/").pop();

  codeNode().innerText = await fetch(jsCode)
    .then(res => res.text())
    .then(cleanCodeText);

  await loadHighlightJs();
  // insert zero-width spaces to force wrapping
  addZwsForWrapping();
  finalize();
})();
