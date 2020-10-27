const CDNJS_API_URL = "https://api.cdnjs.com/libraries";

export default async (codeName) =>
  fetch(`${CDNJS_API_URL}/${encodeURIComponent(codeName)}?fields=latest`)
    .then((res) => res.json())
    .then((r) => r && r.latest);
