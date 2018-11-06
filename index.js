/* eslint-env node */

const puppeteer = require('puppeteer');
const qs = require('querystring');
const {
  _,
  $0,
  help,
  version,
  ...args
} = require('yargs').argv;
const {
  width,
  height,
  deviceScaleFactor,
  ...wallConfig
} = require('./wall-config');

const PAGE_ARGS = Object.assign({}, args, wallConfig);
const PAGE_PATH = __dirname + '/index.html';
const PAGE_QUERY = qs.stringify(PAGE_ARGS);

console.log('Configuration:', {
  PAGE_ARGS,
  PAGE_PATH,
  PAGE_QUERY
});

const cleanCssProp = (prop) => {
  if (prop !== undefined)
    return parseInt(String(prop).replace('px', ''));
};

const calcPixelDims = (dim, scale) => {
  return Math.floor(dim * scale);
};

const viewportObj = {
  width: cleanCssProp(width) || 1024,
  height: cleanCssProp(height) || 768,
  deviceScaleFactor: cleanCssProp(deviceScaleFactor) || 1
};

const pixelWidth = calcPixelDims(viewportObj.width, viewportObj.deviceScaleFactor);
const pixelHeight = calcPixelDims(viewportObj.height, viewportObj.deviceScaleFactor);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file:///${PAGE_PATH}?${PAGE_QUERY}`);
  await page.setViewport(viewportObj);
  await page.waitFor('html.dom-complete');

  const pageTitle = await page.title();
  const wallpaperName = `${pageTitle || 'code-on-the-wall'}_${pixelWidth}x${pixelHeight}.png`;
  const wallpaperPath = `./output/${wallpaperName}`;

  console.log('Taking screenshot:', {
    wallpaperName,
    wallpaperPath,
    viewportObj
  });

  await page.screenshot({
    path: wallpaperPath
  });

  console.log('Wallpaper saved:', wallpaperPath);

  await browser.close();
})();