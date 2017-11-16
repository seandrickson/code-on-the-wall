import URLSearchParams from 'url-search-params'
import loadGoogleFont from 'load-google-font'
import loadHighlightStyle from 'load-highlight-style'
import { codeNode } from 'get-node'

const QUERY_STRING = new URLSearchParams(location.search.slice(1));
const QUERY_STRING_OBJECT = ((qs) => {
    return {
        [qs.keys()]: qs.values()
    };
})(QUERY_STRING);
const DEFAULT_STYLES = {
    opacity: .2,
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    wordBreak: 'break-all',
    hyphens: 'none',
    textAlign: 'center',
    fontFamily: 'Consolas',
    fontSize: '16px',
    lineHeight: 1,
};

export default function () {
    if (QUERY_STRING.has('googleFont'))
        loadGoogleFont(QUERY_STRING.get('googleFont'));
    
    loadHighlightStyle(QUERY_STRING.get('highlightStyle'));
    const styles = Object.assign({}, DEFAULT_STYLES, QUERY_STRING_OBJECT);
    const $code = codeNode();
    Object.keys(styles).forEach(key => {
        $code.style[key] = styles[key];
    });
}
