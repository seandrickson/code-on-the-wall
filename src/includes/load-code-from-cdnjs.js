import fetch from 'unfetch'
import { isArray, isFunction } from 'is-type'

const CODE_TO_DISPLAY = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js';

const parseResultFromResponse = (response) => {
    if (!response)
        return;

    if (isArray(response) && response[0].latest)
        return response[0].latest;
};

export default (codeName) => {
    if (codeName) {
        return fetch(`https://api.cdnjs.com/libraries?search=${encodeURIComponent(codeName)}`).then((response) => {
            return parseResultFromResponse(response.json());
        }).then((response) => {
            return response || CODE_TO_DISPLAY;
        });
    } else {
        return new Promise((resolve) => {
            resolve(CODE_TO_DISPLAY)
        });
    }
}
