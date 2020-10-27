import addStylesheet from "../common/add-stylesheet.mjs";

const HIGHLIGHT_STYLE_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/styles/";

export default (styleName) =>
  styleName && addStylesheet(`${HIGHLIGHT_STYLE_URL}${styleName}.min.css`);
