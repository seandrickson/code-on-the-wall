const querystring = require('querystring');
const path = require('path');
const Nightmare = require('nightmare');
const args = process.argv;

const PAGE_URL = path.resolve(__dirname, './app/index.html');
const PAGE_PATH = `file:///${PAGE_URL}?${querystring.stringify(args)}`;

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

    return nightmare
      .viewport(page.width, page.height)
      .wait(1000)
      .screenshot(path.resolve(__dirname, `./output/${page.title}_${width}x${height}.png`), {
        x: 0,
        y: 0,
        width: page.width,
        height: page.height
      })
      .end()
  })
  .then((res) => {
    console.log('Screenshot made!');
  }, (err) => {
    console.error(err);
  })
  .then(() => {
    return process.exit();
  });
