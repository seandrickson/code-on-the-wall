import urlQsObj from 'url-qs-obj';
import loadGoogleFont from 'load-google-font';
import loadHighlightStyle from 'load-highlight-style';
import getCodeNode from 'get-code-node';

var DEFAULT_STYLES = {
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
    var codeNode = getCodeNode();

    if (urlQsObj['googleFont'])
        loadGoogleFont(urlQsObj['googleFont']);
    loadHighlightStyle(urlQsObj['highlightStyle']);
    var styles = Object.assign({}, DEFAULT_STYLES, urlQsObj);

    for (var key in styles)
        codeNode.style[key] = styles[key];
}
