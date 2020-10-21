const { createServer } = require("http");
const handler = require("serve-handler");
const puppeteer = require("puppeteer");
const qs = require("querystring");
const { argv } = require("yargs");
const {
  width,
  height,
  deviceScaleFactor,
  debug,
  ...wallConfig
} = require("./wall-config");

const PORT = 8080;
const PAGE_ARGS = Object.assign(
  {},
  Object.keys(argv).filter(
    (key) => !["_", "$0", "help", "version", "debug"].includes(key)
  ),
  wallConfig
);

const PAGE_PATH = "/index.html";
const PAGE_QUERY = qs.stringify(PAGE_ARGS);
const DEBUG_MODE = !!(debug || argv.debug);

const LOG = function () {
  if (DEBUG_MODE) console.log.apply(this, arguments);
};

LOG("Configuration:", {
  PAGE_ARGS,
  PAGE_PATH,
  PAGE_QUERY,
});

const cleanCssProp = (prop) => {
  if (prop !== undefined) return parseInt(String(prop).replace("px", ""));
};

const calcPixelDims = (dim, scale) => {
  return Math.floor(dim * scale);
};

const viewportObj = {
  width: cleanCssProp(width) || 1024,
  height: cleanCssProp(height) || 768,
  deviceScaleFactor: cleanCssProp(deviceScaleFactor) || 1,
};

const pixelWidth = calcPixelDims(
  viewportObj.width,
  viewportObj.deviceScaleFactor
);
const pixelHeight = calcPixelDims(
  viewportObj.height,
  viewportObj.deviceScaleFactor
);

(async () => {
  const server = createServer((req, res) =>
    handler(req, res, {
      public: "public/generator",
    })
  ).listen(PORT);

  const browser = await puppeteer.launch({
    headless: !DEBUG_MODE,
  });
  const page = await browser.newPage();
  await page.setViewport(viewportObj);
  await page.goto(`http://127.0.0.1:${PORT}${PAGE_PATH}?${PAGE_QUERY}`, {
    waitUntil: ["networkidle0"],
  });

  const pageTitle = await page.title();
  const wallpaperName = `${
    pageTitle || "code-on-the-wall"
  }_${pixelWidth}x${pixelHeight}.png`;
  const wallpaperPath = `./output/${wallpaperName}`;

  // return;

  LOG("Taking screenshot:", {
    wallpaperName,
    wallpaperPath,
    viewportObj,
  });

  await page.screenshot({
    path: wallpaperPath,
  });

  LOG("Wallpaper saved:", wallpaperPath);

  await browser.close();
  server.close();
})();
