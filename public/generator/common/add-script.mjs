export default (src) =>
  new Promise((onload, onerror) => {
    document.head.append(
      Object.assign(document.createElement("script"), {
        src, onload, onerror
      })
    );
  });
