import { codeNode } from 'get-node'
import findTextNodes from 'find-text-nodes'

export default function () {
    findTextNodes(codeNode(), function (node) {
        node.nodeValue = node.nodeValue.replace(/(.)/g, '$1\u200B');
    });
}
