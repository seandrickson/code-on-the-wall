import get from 'get'
import initFromQueryString from 'init-from-query-string'
import cleanCodeText from 'clean-code-text'
import appendCodeToNode from 'append-code-to-node'
import initHighlight from 'init-highlight'
import addZwsForWrapping from 'add-zws-for-wrapping'
import applyBgToRoot from 'apply-bg-to-root'
import finalize from 'finalize'

export default function (cdnjsCodeUrl) {
    var title = cdnjsCodeUrl.split('/').pop();
    document.title = title;

    // INITIALIZE
    get(cdnjsCodeUrl, function (response) {
        initFromQueryString();
        var cleanResponse = cleanCodeText(response);
        appendCodeToNode(cleanResponse);
        initHighlight();
        // insert zero-width spaces to force wrapping
        addZwsForWrapping();
        applyBgToRoot();
        finalize();
    });
};
