export default (fn = () => {}) => {
  document.readyState === "complete"
    ? fn()
    : window.addEventListener("load", fn);
};
