import { codeNode } from 'get-node'

export default function () {
    if (window.hljs)
        window.hljs.highlightBlock(codeNode());
}
