import { addStyle } from 'add-node'

const HIGHLIGHT_CSS_DEFAULT = 'atom-one-dark';
export default (styleName) => {
    const highlightStyleName = styleName || HIGHLIGHT_CSS_DEFAULT;
    return addStyle(`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/${highlightStyleName}.min.css`);
}
