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
    const response = await fetch(
      `https://api.cdnjs.com/libraries?search=${encodeURIComponent(codeName)}`
    );
    const resJson = await response.json();
    return parseResultFromResponse(resJson);
  } else {
    return CODE_TO_DISPLAY;
  }
};
