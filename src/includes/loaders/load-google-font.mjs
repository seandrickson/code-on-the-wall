import { codeNode } from "../common/get-node.mjs";
import { addStyle } from "../common/add-node.mjs";

const GOOGLE_FONTS = `https://fonts.googleapis.com/css`;

export default fontFamily => {
  const family = encodeURIComponent(fontFamily).replace(/%20/g, "+");
  addStyle(`${GOOGLE_FONTS}?family=${family}`);
  codeNode().style.fontFamily = fontFamily;
  return fontFamily;
};
