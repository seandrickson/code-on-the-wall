import getCodeNode from 'get-code-node'
import findTextNodes from 'find-text-nodes'

export default function () {
    findTextNodes(getCodeNode(), function (node) {
        node.nodeValue = node.nodeValue.replace(/(.)/g, '$1\u200B');
    });
}
