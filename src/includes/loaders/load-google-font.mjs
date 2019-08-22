import { codeNode } from "/src/includes/common/get-node.mjs";
import addStylesheet from "/src/includes/common/add-stylesheet.mjs";

const GOOGLE_FONTS = `https://fonts.googleapis.com/css`;

export default fontFamily => {
  const encFamily = encodeURIComponent(fontFamily).replace(/%20/g, "+");
  addStylesheet(`${GOOGLE_FONTS}?family=${encFamily}`);
  codeNode().style.fontFamily = fontFamily;
};
