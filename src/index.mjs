import { getConfigValue } from "/src/includes/config.mjs";
import { codeNode } from "/src/includes/common/get-node.mjs";
import loadStyles from "/src/includes/loaders/load-styles.mjs";
import loadCodeFromCdnjs from "/src/includes/loaders/load-code-from-cdnjs.mjs";
import generateFilename from "/src/includes/generate-filename.mjs";
import addWorker from "/src/includes/common/add-worker.mjs";

(async () => {
  // INITIALIZE
  loadStyles();
  const codeUrl = await loadCodeFromCdnjs(getConfigValue("code"));
  document.title = generateFilename(codeUrl);
  codeNode().innerHTML = await addWorker("/src/worker/worker.js", codeUrl).then(
    event => event.data
  );
})();
