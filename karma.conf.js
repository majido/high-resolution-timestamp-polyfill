module.exports = function(config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }

  var customLaunchers = {
    sl_chrome_old: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_chrome_current: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 10',
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_android_galaxy: {
      base: 'SauceLabs',
      browserName: 'android',
      platform : 'Linux',
      deviceName: 'Samsung Galaxy Nexus Emulator',
      version : '4.2',
    },
    sl_android_nexus7: {
      base: 'SauceLabs',
      browserName: 'android',
      platform : 'Linux',
      deviceName: 'Google Nexus 7 HD Emulator',
      version : '4.4',
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.10',
      version: '8.4'
    },
    sl_safari_last: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.9',
      version: '7'
    },
    sl_safari_current: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    sl_edge: {
      base: 'SauceLabs',
      browserName: 'MicrosoftEdge',
      platform: 'Windows 10'
    }
  }

  config.set({
    logLevel: 'LOG_DEBUG',

    singleRun : true,
    autoWatch : false,

    frameworks: [
      'mocha', 'chai'
    ],

    files: [
      'test/performance-now-polyfill.js',
      'translate-timeStamp.js',
      'test/*.js'
    ],

    // browsers: ['Chrome', 'PhantomJS']
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['progress', 'saucelabs'],

  });
};
