const express = require("express");
const app = express();
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
const HOST_AND_PORT = `http://localhost:${PORT}`;
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

app.use("/configurator", express.static("public/configurator"));
app.use("/generator", express.static("public/generator"));
app.use("/output", express.static("output"));

app.get("/", (_, res) => res.redirect("/configurator"));

app.get("/generate", async (_, res) => {
  const browser = await puppeteer.launch({
    headless: !DEBUG_MODE,
  });

  const page = await browser.newPage();
  await page.setViewport(viewportObj);
  await page.goto(`${HOST_AND_PORT}${PAGE_PATH}?${PAGE_QUERY}`, {
    waitUntil: ["networkidle0"],
  });

  const pageTitle = await page.title();

  const wallpaperName = `${
    pageTitle || "code-on-the-wall"
  }_${pixelWidth}x${pixelHeight}.png`;
  const wallpaperPath = `./output/${wallpaperName}`;

  LOG("Taking screenshot:", {
    wallpaperName,
    wallpaperPath,
    viewportObj,
  });

  await page.screenshot({
    path: wallpaperPath,
  });

  LOG("Wallpaper saved:", wallpaperPath);

  res.send({ path: wallpaperPath });
});

app.listen(PORT, () =>
  console.log(`Now listening at http://localhost:${PORT}`)
);
