import getCodeNode from 'get-code-node'
import findTextNodes from 'find-text-nodes'

export default function () {
    try {
        findTextNodes(getCodeNode(), function (nodeValue) {
            nodeValue = nodeValue.replace(/(.)/g, '$1\u200B');
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
