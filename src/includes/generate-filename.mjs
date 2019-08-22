import { getConfigValue } from "/src/includes/config.mjs";

export default () => {
  const code = getConfigValue("code");
  const style = getConfigValue("highlightStyle");
  return `${code}_${style}`;
};
