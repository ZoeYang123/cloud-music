const path = require('path');

const reslove = (urlPath) => path.join(__dirname, urlPath);

module.exports = {
  webpack: {
    alias: {
      'assets': reslove('src/assets'),
      'api' : reslove('src/api'),
      'application' : reslove('src/application'),
      'baseUI' : reslove('src/baseUI'),
      'components' : reslove('src/components'),
      'routes' : reslove('src/routes'),
      'store' : reslove('src/store'),
    }
  }
}