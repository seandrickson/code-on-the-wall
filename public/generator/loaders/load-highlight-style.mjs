import addStylesheet from "../common/add-stylesheet.mjs";

const HIGHLIGHT =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/styles/";

export default (styleName) => {
  if (styleName) addStylesheet(`${HIGHLIGHT}${styleName}.min.css`);
};
