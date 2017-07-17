import hljs from 'highlight.js';
import getCodeNode from 'get-code-node';

export default function () {
    var codeNode = getCodeNode();
    codeNode.classList.add('language-javascript');
    hljs.highlightBlock(codeNode);
}
