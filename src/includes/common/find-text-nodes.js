import { isFunction } from 'is-type'

export default (node, fn) => {
    if (!isFunction(fn)) return;
    
    let treeWalker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    while(treeWalker.nextNode()) {
        fn(treeWalker.currentNode);
    }
}
