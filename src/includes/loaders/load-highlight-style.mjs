import { addStyle } from "../common/add-node.mjs";

const VERSION = "9.15.9";
const HIGHLIGHT = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/${VERSION}/styles/`;
const HIGHLIGHT_CSS_DEFAULT = "atom-one-dark";

export default async styleName => {
  const highlightStyleName = styleName || HIGHLIGHT_CSS_DEFAULT;
  return addStyle(`${HIGHLIGHT}${highlightStyleName}.min.css`);
};
