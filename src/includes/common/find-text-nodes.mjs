export default (node, fn) => {
  if (typeof fn !== "function") return;

  let treeWalker = document.createTreeWalker(
    node,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  while (treeWalker.nextNode()) {
    fn(treeWalker.currentNode);
  }
};
