import URLSearchParams from 'url-search-params'
import initScript from 'init-script'
import loadCodeFromCdnjs from 'load-code-from-cdnjs'
import { addScript } from 'add-node'

const QUERY_STRING = new URLSearchParams(location.search.slice(1));
addScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js')
    .then(loadCodeFromCdnjs.bind(QUERY_STRING.get('code')))
    .then(initScript);
