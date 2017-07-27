import loadStyle from 'load-style'
import stringFormat from 'string-format'

var HIGHLIGHT_CSS_URL_PATTERN = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/{0}.min.css';
var HIGHLIGHT_CSS_DEFAULT = 'atom-one-dark';

export default function (styleName) {
    var highlightStyleName = styleName || HIGHLIGHT_CSS_DEFAULT;
    var styleUrl = stringFormat(HIGHLIGHT_CSS_URL_PATTERN, highlightStyleName);
    loadStyle(styleUrl);
}
