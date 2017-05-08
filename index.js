const _ = require('lodash');
const Nightmare = require('nightmare');
const path = require('path');
const qs = require('querystringify');
const wallpaper = require('wallpaper');
const args = require('yargs').argv;

const PAGE_ARGS = _.omit(args, ['_', '$0']);
const PAGE_PATH = path.resolve(__dirname, './dist/index.html');
const PAGE_QUERY = qs.stringify(PAGE_ARGS);
const PAGE_URL = `file:///${PAGE_PATH}?${PAGE_QUERY}`;

const nightmare = new Nightmare({ show: false });

nightmare
  .goto(PAGE_URL)
  .wait('.dom-ready')
  .evaluate(() => {
    return {      
      height: window.screen.height,
      width: window.screen.width,
      density: window.devicePixelRatio,
      title: document.title,
      query: window.location.search,
    };
  })
  .then((page) => {
    const pixelWidth = page.width * page.density;
    const pixelHeight = page.height * page.density;
    const pageTitle = page.title || 'code-on-the-wall';
    const wallpaperName = `${page.title}_${pixelWidth}x${pixelHeight}.png`;
    const wallpaperPath = path.resolve(__dirname, `./output/${wallpaperName}`);

    console.log(`Taking snapshot using: ${page.query}`);
    return nightmare
      .viewport(page.width, page.height)
      .wait(1000)
      .screenshot(wallpaperPath, {
        x: 0,
        y: 0,
        width: page.width,
        height: page.height
      })
      .end(() => {
        console.log(`Wallpaper saved: ${wallpaperPath}`);
        return wallpaperPath;
      });
  })
  .then((wallpaperPath) => {
    wallpaper.set(wallpaperPath).then(() => {
      console.log('Wallpaper now set!');
      process.exit();
    });
  }, (err) => {
    console.error(err);
    process.exit();
  });
