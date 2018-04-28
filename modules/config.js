﻿'use strict'
const path = require('path');
const checkForUpdates = require('./checkForUpdates');
const style = require('./consoleStyling');

module.exports = (Callback) => {
  if (global.isConfig)
    Callback();

  // CONFIGURATIONS:
  checkForUpdates(() => {
    // Get the merger-config JSON file and store its content on a global:
    try {
      global.config = require(path.join(process.cwd(), './merger-config.json'));

      global.minifyOptions = {
        warnings: true
      }

      global.isConfig = true;
      Callback();
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND')
        return console.error(` ${style.styledError} merger-config file not found. Please run "merger init".`);
    }
  })
  // End of CONFIGURATIONS:
}
