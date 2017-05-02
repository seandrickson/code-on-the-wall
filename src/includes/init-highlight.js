import hljs from 'highlight.js';
import getCodeNode from 'get-code-node';

export default function () {
    var codeNode = getCodeNode();
    hljs.highlightBlock(codeNode);
}
