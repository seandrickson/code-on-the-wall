export default (href) =>
  new Promise((onload, onerror) => {
    const rel = 'stylesheet';
    document.head.append(
      Object.assign(document.createElement("link"), {
        rel, href, onload, onerror
      })
    );
  });
