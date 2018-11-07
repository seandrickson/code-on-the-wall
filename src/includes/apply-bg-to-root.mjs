import { htmlNode, codeNode } from "./common/get-node.mjs";

export default () => {
  htmlNode().style.backgroundColor = codeNode().style.backgroundColor;
};
