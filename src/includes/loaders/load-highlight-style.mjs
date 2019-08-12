import { addStyle } from "../common/add-node.mjs";
import { htmlNode, codeNode } from "../common/get-node.mjs";

const HIGHLIGHT = `./src/lib/highlight/demo/styles/`;
const HIGHLIGHT_CSS_DEFAULT = "atom-one-dark";

export default async styleName => {
  const highlightStyleName = styleName || HIGHLIGHT_CSS_DEFAULT;
  return addStyle(`${HIGHLIGHT}${highlightStyleName}.css`).then(() => {
    htmlNode().style.backgroundColor = codeNode().style.backgroundColor;
  });
};
