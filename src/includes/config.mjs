import { isUndefined } from "./common/is-type.mjs";
import DEFAULT_STYLES from "./defaults.mjs";

const QUERY_STRING = new URLSearchParams(window.location.search.slice(1));
const QUERY_STRING_OBJECT = (qsIterator => {
  let newObj = {};
  for (let qs of qsIterator) {
    newObj[qs[0]] = qs[1];
  }
  return newObj;
})(QUERY_STRING);

const CONFIG_OBJECT = Object.assign({}, DEFAULT_STYLES, QUERY_STRING_OBJECT);

export const getConfig = () => {
  return CONFIG_OBJECT;
};

export const getConfigValue = key => {
  return CONFIG_OBJECT[key];
};

export const hasConfigValue = key => {
  return !isUndefined(CONFIG_OBJECT[key]);
};
