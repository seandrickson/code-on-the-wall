const _ = require('lodash');
const Nightmare = require('nightmare');
const path = require('path');
const qs = require('querystringify');
const wallpaper = require('wallpaper');
const args = require('yargs').argv;
const wallConfig = require('./wall-config');

const PAGE_ARGS = _.omit(args, ['_', '$0']);
const PAGE_PATH = path.resolve(__dirname, './dist/index.html');
let PAGE_QUERY;

if (PAGE_ARGS.length)
  PAGE_QUERY = qs.stringify(PAGE_ARGS);
else
  PAGE_QUERY = qs.stringify(wallConfig);

const PAGE_URL = `file:///${PAGE_PATH}?${PAGE_QUERY}`;

var nightmareConfig = {
  show: false
};

if (wallConfig && wallConfig.devicePixelRatio) {
  nightmareConfig.switches = {
    'force-device-scale-factor': wallConfig.devicePixelRatio
  }
}

var pageOverrides = [];
if (wallConfig && wallConfig.width) {
  pageOverrides.width = wallConfig.width;
}
if (wallConfig && wallConfig.height) {
  pageOverrides.height = wallConfig.height;
}

console.log(`Starting application...`);
const nightmare = new Nightmare(nightmareConfig);
nightmare
  .goto(PAGE_URL)
  .wait('html.dom-complete')
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
    var width = parseInt(pageOverrides.width.replace('px','')) || page.width;
    var height = parseInt(pageOverrides.height.replace('px', '')) || page.height;
    const pixelWidth = Math.floor(width * page.density);
    const pixelHeight = Math.floor(height * page.density);
    const pageTitle = page.title || 'code-on-the-wall';
    const wallpaperName = `${page.title}_${pixelWidth}x${pixelHeight}.png`;
    const wallpaperPath = path.resolve(__dirname, `./output/${wallpaperName}`);

    console.log(`Taking snapshot using: Query: ${page.query}, Wallpaper: ${wallpaperName}`);
    return nightmare
      .viewport(width, height)
      .wait(1000)
      .screenshot(wallpaperPath, {
        x: 0,
        y: 0,
        width: width,
        height: height
      })
      .end(() => {
        console.log(`Wallpaper saved: ${wallpaperPath}`);
        // return wallpaperPath;
      });
  })
  .then((wallpaperPath) => {
    // wallpaper.set(wallpaperPath).then(() => {
    //   console.log('Wallpaper now set!');
      process.exit();
    // });
  }, (err) => {
    console.error(err);
    process.exit();
  });
