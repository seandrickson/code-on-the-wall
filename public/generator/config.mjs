import DEFAULT_STYLES from "./defaults.mjs";

const QUERY_STRING = Object.fromEntries(
  new URLSearchParams(window.location.search)
);

const CONFIG_OBJECT = Object.assign({}, DEFAULT_STYLES, QUERY_STRING);

export const getConfig = () => CONFIG_OBJECT;
export const getConfigValue = (key) => CONFIG_OBJECT[key];
