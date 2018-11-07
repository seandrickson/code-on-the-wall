import onload from "./common/onload.mjs";
import { htmlNode } from "./common/get-node.mjs";

export default () => {
  onload(() => {
    htmlNode().classList.add("dom-complete");
  });
};
