import { getConfigValue } from "./includes/config.mjs";
import cleanCodeText from "./includes/clean-code-text.mjs";
import initHighlight from "./includes/init-highlight.mjs";
import addZwsForWrapping from "./includes/add-zws-for-wrapping.mjs";
import applyBgToRoot from "./includes/apply-bg-to-root.mjs";
import finalize from "./includes/finalize.mjs";
import { codeNode } from "./includes/common/get-node.mjs";
import loadStyles from "./includes/loaders/load-styles.mjs";
import loadCodeFromCdnjs from "./includes/loaders/load-code-from-cdnjs.mjs";

(async () => {
  // INITIALIZE
  const jsCode = await loadCodeFromCdnjs(getConfigValue("code"));
  const title = jsCode.split("/").pop();
  document.title = title;
  loadStyles();
  applyBgToRoot();
  const jsCodeResponse = await fetch(jsCode);
  const jsCodeText = await jsCodeResponse.text();
  codeNode().innerText = cleanCodeText(jsCodeText);
  await initHighlight();
  // insert zero-width spaces to force wrapping
  addZwsForWrapping();
  finalize();
})();
