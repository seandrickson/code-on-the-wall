const CDNJS_API = "https://api.cdnjs.com/libraries";
const CODE_TO_DISPLAY =
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js";

const parseResultFromResponse = response => {
  try {
    return response.results[0].latest;
  } catch (e) {
    return CODE_TO_DISPLAY;
  }
};

export default async codeName => {
  if (codeName) {
    const search = encodeURIComponent(codeName);
    return fetch(`${CDNJS_API}?search=${search}`)
      .then(res => res.json())
      .then(parseResultFromResponse);
  } else {
    return Promise.resolve(CODE_TO_DISPLAY);
  }
};
