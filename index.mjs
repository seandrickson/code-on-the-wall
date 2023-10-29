import { readFile } from "node:fs/promises";
import qs from "node:querystring";
import yargs from "yargs/yargs";
import express from "express";
import puppeteer from "puppeteer";

const app = express();
const {
  width,
  height,
  deviceScaleFactor,
  debug,
  ...wallConfig
} = JSON.parse(await readFile("./wall-config.json"));

const { argv } = yargs(process.argv.slice(2))
  .default(wallConfig);

const PORT = 8080;
const DOMAIN = `http://120.0.0.1:${PORT}`;
const EXCLUDE_ARGS = ["help", "version", "debug"];
const PAGE_ARGS = Object.assign(
  {},
  Object.keys(argv).filter((key) => !EXCLUDE_ARGS.includes(key)),
  wallConfig
);

const PAGE_PATH = "/index.html";
const PAGE_QUERY = qs.stringify(PAGE_ARGS);
const DEBUG_MODE = !!(debug || argv.debug);

const LOG = (...args) => {
  if (DEBUG_MODE) console.log.apply(this, args);
};

LOG("Configuration:", {
  PAGE_ARGS,
  PAGE_PATH,
  PAGE_QUERY,
});

const cleanCssProp = (prop) => {
  try {
    return parseInt(String(prop).replace("px", ""))
  } catch(_) {
    // silence
  }
};
const calcPixelDims = (dim, scale) => Math.floor(dim * scale);

const viewportObj = {
  width: cleanCssProp(width) ?? 1024,
  height: cleanCssProp(height) ?? 768,
  deviceScaleFactor: cleanCssProp(deviceScaleFactor) ?? 1,
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
    headless: DEBUG_MODE ? false : 'new',
  });

  const page = await browser.newPage();
  await page.setViewport(viewportObj);
  await page.goto(`${DOMAIN}${PAGE_PATH}?${PAGE_QUERY}`, {
    waitUntil: ["networkidle0"],
  });

  const pageTitle = (await page.title()) ?? "code-on-the-wall";
  const wallpaperName = `${pageTitle}_${pixelWidth}x${pixelHeight}.png`;
  const wallpaperPath = `./output/${wallpaperName}`;

  LOG("Taking screenshot:", {
    wallpaperName,
    wallpaperPath,
    viewportObj,
  });

  const wallpaper = await page.screenshot({ fullPage : true });
  await browser.close();

  LOG("Wallpaper saved:", wallpaperPath);
  res.set('Content-Type', 'image/png');
  res.send(wallpaper);
});

app.listen(PORT, () =>
  LOG(`Now listening at ${DOMAIN}`)
);
