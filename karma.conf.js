module.exports = function(config) {
  config.set({
    logLevel: 'LOG_DEBUG',
  
    singleRun : true,
    autoWatch : false,
 
    frameworks: [
      'mocha', 'chai'
    ],
 
    files: [
      'translate-timeStamp.js',
      'test/*.js'
    ],

    reporters: ['progress'],

    browsers: ['Chrome', 'PhantomJS']
 
  });
};
