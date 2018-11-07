import { codeNode } from "../common/get-node.mjs";
import { addStyle } from "../common/add-node.mjs";

const GOOGLE_FONT_DEFAULT = "Source Code Pro";
export default fontFamily => {
  const fontFamilyName = fontFamily || GOOGLE_FONT_DEFAULT;
  const fontFamilyUrl = encodeURIComponent(fontFamilyName).replace(/%20/g, "+");
  addStyle(`https://fonts.googleapis.com/css?family=${fontFamilyUrl}`);
  codeNode().style.fontFamily = fontFamilyName;
};
