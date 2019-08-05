import loadGoogleFont from "./load-google-font.mjs";
import loadHighlightStyle from "./load-highlight-style.mjs";
import { htmlNode, codeNode } from "../common/get-node.mjs";
import { getConfig, getConfigValue } from "../config.mjs";

export default () => {
  const googleFont = getConfigValue("googleFont");
  const highlightStyle = getConfigValue("highlightStyle");
  if (googleFont)
    loadGoogleFont(googleFont);

  if (highlightStyle)
    loadHighlightStyle(highlightStyle);

  Object.assign(codeNode().style, getConfig());
  htmlNode().style.backgroundColor = codeNode().style.backgroundColor;
};
