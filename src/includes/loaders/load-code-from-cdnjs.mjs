const CDNJS_API = "https://api.cdnjs.com/libraries";
const CODE_TO_DISPLAY = "/src/lib/highlight/highlight.pack.js";

const parseResultFromResponse = response => {
  try {
    return response.results[0].latest;
  } catch (e) {
    return CODE_TO_DISPLAY;
  }
};

export default async codeName => {
  const search = encodeURIComponent(codeName);
  return fetch(`${CDNJS_API}?search=${search}`)
    .then(res => res.json())
    .then(parseResultFromResponse);
};
