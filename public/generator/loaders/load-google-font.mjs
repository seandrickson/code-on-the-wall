import { codeNode } from "../common/get-node.mjs";
import addStylesheet from "../common/add-stylesheet.mjs";

const GOOGLE_FONTS_URL = `https://fonts.googleapis.com/css2`;
const encode = (str) => encodeURIComponent(str).replace(/%20/g, "+");

export default (fontFamily) => {
  addStylesheet(`${GOOGLE_FONTS_URL}?family=${encode(fontFamily)}`);
  codeNode().style.fontFamily = `${fontFamily} !important`;
};
