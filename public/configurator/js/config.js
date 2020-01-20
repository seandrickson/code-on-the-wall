/* eslint-disable no-console */
"use strict";
// load styles from CDN API
// https://api.cdnjs.com/libraries?search=isagalaev/highlight.js&fields=assets
// match to "styles/*.min.css"
// ensure version matches
const listener = (el, event, fn) => {
  el.addEventListener(event, fn, { passive: true });
};

const ready = fn => {
  if (document.readyState === "loading") {
    listener(window, "load", fn);
  } else {
    fn();
  }
};

ready(() => {
  const configForm = document.forms.codeOnTheWall;

  const updateBackground = () => {
    configForm.submit();
  };

  const populateHighlightStyleList = async highlightEl => {
    const stylesRegex = /^styles\/(.*)\.min\.css$/;

    try {
      const styleJSON = await (
        await fetch(
          "https://api.cdnjs.com/libraries/highlight.js?fields=assets"
        )
      ).json();
      const cssStyles = styleJSON.assets[0].files.filter(file =>
        stylesRegex.test(file)
      );
      highlightEl.innerHTML += cssStyles.map(styleFile => {
        const style = styleFile.match(/^styles\/(.*)\.min\.css$/)[1];
        return `<option value="${style}">${style}</option>`;
      });
    } catch (e) {
      console.error("CDNJS fetching of highlight.js styles failed!");
    }
  };

  populateHighlightStyleList(configForm.highlightStyle);

  updateBackground();
  listener(configForm, "change", updateBackground);
});
