export default (fn, ...args) => {
  if (typeof fn !== "function") return;
  document.readyState === "complete"
    ? fn.call(this, args)
    : window.addEventListener("load", fn.bind(this, args));
};
