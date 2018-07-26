const puppeteer = require('puppeteer');
const path = require('path');
const qs = require('querystringify');
const { _, $0, help, version, ...args } = require('yargs').argv;
const { width, height, deviceScaleFactor, ...wallConfig } = require('./wall-config');

const PAGE_ARGS = Object.assign({}, args, wallConfig);
const PAGE_PATH = path.resolve(__dirname, './dist/index.html');
const PAGE_QUERY = qs.stringify(PAGE_ARGS);
const PAGE_URL = `file:///${PAGE_PATH}?${PAGE_QUERY}`;

console.log('Configuration:', {
  PAGE_ARGS,
  PAGE_PATH,
  PAGE_QUERY
});

const viewportObj = ((obj) => {
  const defaultViewport = {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1
  }
  let newObj = {};
  Object.keys(defaultViewport).forEach(key => {
    newObj[key] = obj[key] ? parseInt(String(obj[key]).replace('px', '')) : defaultViewport[key];
  });
  return newObj;
})({
  width,
  height,
  deviceScaleFactor
} || {});

const pixelWidth = Math.floor(viewportObj.width * viewportObj.deviceScaleFactor);
const pixelHeight = Math.floor(viewportObj.height * viewportObj.deviceScaleFactor);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(PAGE_URL);
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

  await page.screenshot({ path: wallpaperPath });

  console.log('Wallpaper saved:', wallpaperPath);

  await browser.close();
})();