import { addScript } from "./common/add-node.mjs";
import { codeNode } from "./common/get-node.mjs";

export default async () => {
  return addScript(
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"
  ).then(() => {
    window.hljs.highlightBlock(codeNode());
  });
};
