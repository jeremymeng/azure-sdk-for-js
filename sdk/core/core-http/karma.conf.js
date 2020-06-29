const defaults = {
  port: 9876
};

process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function(config) {
  config.set({
    plugins: [
      "karma-mocha",
      "karma-mocha-reporter",
      "karma-chrome-launcher",
      "karma-edge-launcher",
      "karma-ie-launcher",
      "karma-firefox-launcher"
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha"],

    // list of files / patterns to load in the browser
    files: [
            // polyfill service supporting IE11 missing features
      // Promise,String.prototype.startsWith,String.prototype.endsWith,String.prototype.repeat,String.prototype.includes,Array.prototype.includes,Object.assign,Object.keys,Symbol.iterator
      {
        pattern: "https://cdn.polyfill.io/v2/polyfill.js?features=Symbol,Promise,Set,Number.isNaN,String.prototype.startsWith,String.prototype.endsWith,String.prototype.repeat,String.prototype.includes,Array.prototype.includes,Object.assign,Object.keys|always,Symbol.iterator",
        type: "js"
      },
      "dist-test/coreHttp.browser.test.js",
      { pattern: "dist-test/coreHttp.browser.test.js.map", type:"html", included: false, served: true }
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha"],

    // web server port
    port: defaults.port,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher, for example:
    // browsers: ["Chrome", "Firefox", "Edge"],
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    browserNoActivityTimeout: 1200000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,

    customLaunchers: {
      ChromeNoSecurity: {
        base: "ChromeHeadless",
        flags: ["--disable-web-security"]
      },
      ChromeDebugging: {
        base: "Chrome",
        flags: [
          `http://localhost:${defaults.port}/debug.html`,
          "--auto-open-devtools-for-tabs",
          "--disable-web-security"
        ]
      },
      FirefoxDebugging: {
        base: "Firefox",
        flags: ["-url", `http://localhost:${defaults.port}/debug.html`, "-devtools"]
      }
    },

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: "html",
        timeout: "600000"
      }
    }
  });
};
