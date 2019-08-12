import addWorker from "../common/add-worker.mjs";
import { codeNode } from "../common/get-node.mjs";

export default () => {
  return addWorker("/src/worker/worker.js", codeNode().textContent).then(
    event => {
      codeNode().innerHTML = event.data;
    }
  );
};
