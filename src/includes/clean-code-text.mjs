export default text => {
  return String(text)
    .replace(/[\n\r]/g, "") // remove new lines
    .replace(/\/\*[\S\s]*?\*\//g, ""); // remove comment blocks
};
