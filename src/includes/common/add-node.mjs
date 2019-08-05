const addResource = type => {
  type = type === "style" ? "link" : type;

  return async url => {
    return new Promise((resolve, reject) => {
      const elem = document.createElement(type);
      if (type === "script") {
        elem.src = url;
        elem.async = true;
      } else if (type === "link") {
        elem.rel = "stylesheet";
        elem.href = url;
      }
      elem.onload = resolve;
      elem.onerror = reject;
      document.head.appendChild(elem);
    });
  };
};

export const addScript = addResource("script");
export const addStyle = addResource("style");
