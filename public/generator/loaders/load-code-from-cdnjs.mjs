const CDNJS_API = "https://api.cdnjs.com/libraries";
const CODE_TO_DISPLAY =
  "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.1/highlight.min.js";

export default async (codeName) =>
  fetch(`${CDNJS_API}?search=${encodeURIComponent(codeName)}`)
    .then((res) => res.json())
    .then((response) => {
      try {
        return response.results[0].latest;
      } catch (_) {
        return CODE_TO_DISPLAY;
      }
    });
