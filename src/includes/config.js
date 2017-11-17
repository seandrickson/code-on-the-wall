import URLSearchParams from 'url-search-params'
import { isUndefined } from 'is-type'

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
const QUERY_STRING = new URLSearchParams(location.search.slice(1));
const QUERY_STRING_OBJECT = ((qs) => {
    return { [qs.keys()]: qs.values() };
})(QUERY_STRING);

export const getConfig = () => {
    return Object.assign({}, DEFAULT_STYLES, QUERY_STRING_OBJECT);
};

export const getConfigValue = (key) => {
    return getConfig()[key];
}

export const hasConfigValue = (key) => {
    return !isUndefined(getConfig()[key]);
}