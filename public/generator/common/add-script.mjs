export default (src) =>
  new Promise((resolve, reject) => {
    const elem = document.createElement("script");
    elem.src = src;
    elem.onload = resolve;
    elem.onerror = reject;
    document.head.appendChild(elem);
  });
