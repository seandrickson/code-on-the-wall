const querystring = require('querystring');
const path = require('path');
const Nightmare = require('nightmare');
const wallpaper = require('wallpaper');
const args = require('yargs').argv;

function removeCommonArgs(args) {
  const keyBlackList = ['_', '$0'];
  let newArgs = {};

  for (var i in args) {
    if (!keyBlackList.includes(i))
      newArgs[i] = args[i];
  }

  return newArgs;  
}

let PAGE_ARGS = removeCommonArgs(args);
const PAGE_URL = path.resolve(__dirname, './web/index.html');
const PAGE_PATH = `file:///${PAGE_URL}?${querystring.stringify(PAGE_ARGS)}`;

const nightmare = new Nightmare({ show: false });

nightmare
  .goto(PAGE_PATH)
  .evaluate(() => {
    return {      
      height: window.screen.height,
      width: window.screen.width,
      density: window.devicePixelRatio,
      title: document.title,
    };
  })
  .then(function (page) {
    const width = page.width * page.density;
    const height = page.height * page.density;
    const wallpaperName = `${page.title}_${width}x${height}.png`;
    const wallpaperPath = path.resolve(__dirname, `./output/${wallpaperName}`);

    console.log('Taking snapshot using: ' + querystring.stringify(PAGE_ARGS));

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
        return wallpaperPath;
      })
  })
  .then((res) => {
    wallpaper.set(res);
    console.log('Wallpaper now set!');
  }, (err) => {
    console.error(err);
  })
  .then(() => {
    return process.exit();
  });
