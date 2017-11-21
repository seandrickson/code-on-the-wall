import crel from 'crel'
import fetch from 'unfetch'
import { codeNode } from 'get-node'
import loadStyles from 'load-styles'
import cleanCodeText from 'clean-code-text'
import appendCodeToNode from 'append-code-to-node'
import initHighlight from 'init-highlight'
import addZwsForWrapping from 'add-zws-for-wrapping'
import applyBgToRoot from 'apply-bg-to-root'
import finalize from 'finalize'

export default (cdnjsCodeUrl) => {
    var title = cdnjsCodeUrl.split('/').pop();
    document.title = title;

    // INITIALIZE
    loadStyles();
    applyBgToRoot();
    return fetch(cdnjsCodeUrl).then((response) => {
        return response.text().then(function(text) {
            crel(codeNode(), cleanCodeText(text));
        });
    }).then(() => {
        initHighlight();
        // insert zero-width spaces to force wrapping
        addZwsForWrapping();
        finalize();
    });
}
