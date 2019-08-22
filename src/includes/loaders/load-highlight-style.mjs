import addStylesheet from "/src/includes/common/add-stylesheet.mjs";

const HIGHLIGHT = `/src/lib/highlight/demo/styles/`;

export default styleName => {
  addStylesheet(`${HIGHLIGHT}${styleName}.css`);
};
