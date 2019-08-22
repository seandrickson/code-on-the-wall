export default src => {
  return new Promise((resolve, reject) => {
    const elem = document.createElement("link");
    elem.rel = "stylesheet";
    elem.href = src;
    elem.onload = resolve;
    elem.onerror = reject;
    document.head.appendChild(elem);
  });
};
