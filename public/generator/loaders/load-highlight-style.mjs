import addStylesheet from "../common/add-stylesheet.mjs";

const HIGHLIGHT =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/";

export default styleName => {
  if (styleName) addStylesheet(`${HIGHLIGHT}${styleName}.min.css`);
};
