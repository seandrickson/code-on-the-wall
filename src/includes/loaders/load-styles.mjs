import loadGoogleFont from "./load-google-font.mjs";
import loadHighlightStyle from "./load-highlight-style.mjs";
import { codeNode } from "../common/get-node.mjs";
import { getConfig, getConfigValue, hasConfigValue } from "../config.mjs";

export default () => {
  if (hasConfigValue("googleFont"))
    loadGoogleFont(getConfigValue("googleFont"));

  loadHighlightStyle(getConfigValue("highlightStyle"));
  const styles = getConfig();
  Object.assign(codeNode().style, styles);
};
