/* eslint-disable no-console */
"use strict";

const HIGHLIGHT_CSS_FILES_URL =
  "https://api.cdnjs.com/libraries/highlight.js/10.3.1?fields=files";
const HIGHLIGHT_CSS_DEFAULT = "night-owl";

const $configForm = document.forms.codeOnTheWall;

const updateBackground = () => {
  $configForm.submit();
};

const populateHighlightStyleList = async ($highlightEl) => {
  const stylesRegex = /^styles\/(.*)\.min\.css$/;

  try {
    const styleFiles = await fetch(HIGHLIGHT_CSS_FILES_URL)
      .then((res) => res.json())
      .then(({ files }) => files);

    $highlightEl.innerHTML += styleFiles
      .filter((file) => stylesRegex.test(file))
      .map((s) => s.match(stylesRegex)[1])
      .map(
        (styleFile) =>
          `<option value="${styleFile}" ${
            styleFile === HIGHLIGHT_CSS_DEFAULT ? "selected" : ""
          }>${styleFile.replace(new RegExp("-", "g"), " ")}</option>`
      );
  } catch (e) {
    console.error("CDNJS fetching of highlight.js styles failed!");
  }
};

populateHighlightStyleList($configForm.highlightStyle);

updateBackground();
Array.from($configForm.elements)
  .filter((e) => e.matches("input, select"))
  .forEach((e) => e.addEventListener("change", updateBackground));
