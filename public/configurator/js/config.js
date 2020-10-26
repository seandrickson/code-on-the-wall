/* eslint-disable no-console */
"use strict";
// load styles from CDN API
// https://api.cdnjs.com/libraries?search=isagalaev/highlight.js&fields=assets
// match to "styles/*.min.css"
// ensure version matches
const listener = (el, event, fn) => {
  el.addEventListener(event, fn, { passive: true });
};

const ready = (fn) => {
  if (document.readyState === "loading") {
    listener(window, "load", fn);
  } else {
    fn();
  }
};

ready(() => {
  const $configForm = document.forms.codeOnTheWall;

  const updateBackground = () => {
    $configForm.submit();
  };

  const populateHighlightStyleList = async ($highlightEl) => {
    const stylesRegex = /^styles\/(.*)\.min\.css$/;

    try {
      const styleFiles = await fetch(
        "https://api.cdnjs.com/libraries/highlight.js/10.3.1"
      )
        .then((res) => res.json())
        .then(({ files }) => files);

      $highlightEl.innerHTML += styleFiles
        .filter((file) => stylesRegex.test(file))
        .map(
          (styleFile) =>
            `<option value="${styleFile}">${
              styleFile.match(stylesRegex)[1]
            }</option>`
        );
    } catch (e) {
      console.error("CDNJS fetching of highlight.js styles failed!");
    }
  };

  populateHighlightStyleList($configForm.highlightStyle);

  updateBackground();
  listener($configForm, "change", updateBackground);
});
