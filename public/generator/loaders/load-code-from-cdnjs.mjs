const CDNJS_API = "https://api.cdnjs.com/libraries";
const CODE_TO_DISPLAY =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/highlight.min.js";

export default async (codeName) =>
  fetch(`${CDNJS_API}/${encodeURIComponent(codeName)}?fields=latest`)
    .then((res) => res.json())
    .then((response) =>
      response && response.latest ? response.latest : CODE_TO_DISPLAY
    );
