/**
 * v0.0.1
 *
 * Copyright (c) 2017
 *
 * Date: 2017/6/5 by Heaven
 */

const path = require('path');
const fs = require('fs-extra');
const debug = require('debug')('React-QuietWater:build');

debug('Copying globalStyles to lib/cssDist directory.');
fs.copySync(path.resolve(__dirname, '../src/globalStyles'), path.resolve(__dirname, '../lib/cssDist'));
