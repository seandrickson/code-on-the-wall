import { htmlNode, codeNode } from 'get-node'

export default function () {
    htmlNode().style.backgroundColor = codeNode().style.backgroundColor;
}
