const puppeteer = require('puppeteer');
const path = require('path');
const qs = require('querystringify');
const { _, $0, ...args } = require('yargs').argv;
const wallConfig = require('./wall-config');

const PAGE_ARGS = Object.assign({}, args, wallConfig);
const PAGE_PATH = path.resolve(__dirname, './dist/index.html');
const PAGE_QUERY = qs.stringify(PAGE_ARGS);
const PAGE_URL = `file:///${PAGE_PATH}?${PAGE_QUERY}`;
console.log('Configuration:', PAGE_ARGS);

const viewportObj = ((obj) => {
  const intKeys = ['deviceScaleFactor', 'height', 'width'];
  let newObj = {};
  intKeys.forEach(key => {
    if (obj[key] !== undefined)
      newObj[key] = parseInt(String(obj[key]).replace('px', ''));
  });
  return newObj;
})(wallConfig || {});

(async () => {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto(PAGE_URL);
  await page.setViewport(viewportObj);
  await page.waitFor('html.dom-complete');

  const dimensions = await page.evaluate(() => {
    return {
      height: window.screen.height,
      width: window.screen.width,
      density: window.devicePixelRatio,
      title: document.title
    };
  });
  const width = viewportObj.width || dimensions.width;
  const height = viewportObj.height || dimensions.height;
  const pixelWidth = Math.floor(width * dimensions.density);
  const pixelHeight = Math.floor(height * dimensions.density);
  const wallpaperName = `${dimensions.title}_${pixelWidth}x${pixelHeight}.png`;
  const wallpaperPath = path.resolve(__dirname, `./output/${wallpaperName}`);

  console.log('Taking screenshot:', {
    filename: wallpaperName,
    filepath: wallpaperPath,
    width: width,
    height: height,
    density: dimensions.density
  });
  await page.screenshot({ path: wallpaperPath });
  console.log('Wallpaper saved:', wallpaperPath);

  await browser.close();
})();