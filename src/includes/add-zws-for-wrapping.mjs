import { codeNode } from "./common/get-node.mjs";
import findTextNodes from "./common/find-text-nodes.mjs";

export default () => {
  findTextNodes(codeNode(), node => {
    node.nodeValue = node.nodeValue.replace(/(\W)/g, "\u200B$1");
  });
};
