const http = require('http');
const handler = require('serve-handler');
const puppeteer = require('puppeteer');
const qs = require('querystring');
const args = require('yargs').argv;
const {
  width,
  height,
  deviceScaleFactor,
  debug,
  ...wallConfig
} = require('./wall-config');

const PAGE_ARGS = Object.assign(
  Object.keys(args)
    .filter(key => !(['_', '$0', 'help', 'version', 'debug'].includes(key)))
    .reduce((obj, key) => {
      obj[key] = args[key];
      return obj;
    }, {}),
  wallConfig
);

const PAGE_PATH = '/index.html';
const PAGE_QUERY = qs.stringify(PAGE_ARGS);

const LOG = function() {
  if (debug || args.debug)
    console.log.apply(this, arguments);
};

LOG('Configuration:', {
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
  const server = http
    .createServer(handler)
    .listen(8080);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:8080${PAGE_PATH}?${PAGE_QUERY}`);
  await page.setViewport(viewportObj);
  await page.waitFor('html.dom-complete');

  const pageTitle = await page.title();
  const wallpaperName = `${pageTitle || 'code-on-the-wall'}_${pixelWidth}x${pixelHeight}.png`;
  const wallpaperPath = `./output/${wallpaperName}`;

  LOG('Taking screenshot:', {
    wallpaperName,
    wallpaperPath,
    viewportObj
  });

  await page.screenshot({
    path: wallpaperPath
  });

  LOG('Wallpaper saved:', wallpaperPath);

  await browser.close();
  await server.close();
})();
