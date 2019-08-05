import { addScript } from "./common/add-node.mjs";
import { codeNode } from "./common/get-node.mjs";

const HIGHLIGHT = `./src/lib/highlight/highlight.pack.js`;

export default async () => {
  return addScript(HIGHLIGHT).then(() => {
    window.hljs.highlightBlock(codeNode());
  });
};
