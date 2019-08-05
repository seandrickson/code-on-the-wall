import { addScript } from "./common/add-node.mjs";
import { codeNode } from "./common/get-node.mjs";

const VERSION = "9.15.9";
const HIGHLIGHT = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/${VERSION}/highlight.min.js`;

export default async () => {
  return addScript(HIGHLIGHT).then(() => {
    window.hljs.highlightBlock(codeNode());
  });
};
