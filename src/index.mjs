import {
    getConfigValue
} from 'config'
import loadCodeFromCdnjs from 'load-code-from-cdnjs'
import {
    codeNode
} from 'get-node'
import {
    addScript
} from 'add-node'
import loadStyles from 'load-styles'
import cleanCodeText from 'clean-code-text'
import initHighlight from 'init-highlight'
import addZwsForWrapping from 'add-zws-for-wrapping'
import applyBgToRoot from 'apply-bg-to-root'
import finalize from 'finalize'

(async () => {
    await addScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js');

    const jsCode = await loadCodeFromCdnjs(getConfigValue('code'));
    const title = jsCode.split('/').pop();
    document.title = title;

    // INITIALIZE
    loadStyles();
    applyBgToRoot();
    const jsCodeResponse = await fetch(jsCode);
    const jsCodeText = await jsCodeResponse.text();
    codeNode().innerText = cleanCodeText(jsCodeText);
    initHighlight();
    // insert zero-width spaces to force wrapping
    addZwsForWrapping();
    finalize();
})();