import addWorker from "../common/add-worker.mjs";

export default code => {
  return addWorker("/src/worker/worker.js", code).then(event => event.data);
};
