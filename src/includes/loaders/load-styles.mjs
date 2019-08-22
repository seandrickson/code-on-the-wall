import loadGoogleFont from "/src/includes/loaders/load-google-font.mjs";
import loadHighlightStyle from "/src/includes/loaders/load-highlight-style.mjs";
import { htmlNode } from "/src/includes/common/get-node.mjs";
import { getConfig, getConfigValue } from "/src/includes/config.mjs";

export default () => {
  const googleFont = getConfigValue("googleFont");
  const highlightStyle = getConfigValue("highlightStyle");

  if (googleFont) loadGoogleFont(googleFont);
  if (highlightStyle) loadHighlightStyle(highlightStyle);

  Object.assign(htmlNode().style, getConfig());
};
