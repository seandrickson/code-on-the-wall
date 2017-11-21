import fetch from 'unfetch'
import { isArray, isFunction } from 'is-type'

const CODE_TO_DISPLAY = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js';

const parseResultFromResponse = (response) => {
    if (!response)
        return;

    const results = response.results;
    if (!results)
        return;

    if (isArray(results) && results[0].latest)
        return results[0].latest;
};

export default (codeName) => {
    if (codeName) {
        return fetch(`https://api.cdnjs.com/libraries?search=${encodeURIComponent(codeName)}`).then((response) => {
            return response.json();
        }).then((response) => {
            return parseResultFromResponse(response) || CODE_TO_DISPLAY;
        });
    } else {
        return new Promise((resolve) => {
            resolve(CODE_TO_DISPLAY)
        });
    }
}
