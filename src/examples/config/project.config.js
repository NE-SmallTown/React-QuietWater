/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path');
const debug = require('debug')('app:globalConfig:project');
const argv = require('yargs').argv;
const ip = require('ip');

debug('Creating default configuration.');
// ========================================================
// Default Configuration
// ========================================================
const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '../../../'),
  dir_examples: 'src/examples',
  dir_client : 'src',
  dir_dist   : 'examples',
  dir_public : 'public',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------

  // 用了'transform-runtime'就不能出现export *,如果非要用,可以采用下面的方式
  // https://github.com/babel/babel/issues/2877
  // https://github.com/babel/babel/issues/5501#issuecomment-287589989
  compiler_babel: {
    plugins: [
      'babel-plugin-transform-decorators-legacy',
      'babel-plugin-transform-object-rest-spread',
      'babel-plugin-transform-export-extensions'
    ],
    presets: ['flow', 'es2015', 'react', 'stage-0']
  },
  // cheap-module-source-map works in FF, but doesn't work in Chrome
  // cheap-module-inline-source-map doesn't work in FF, but does work in Chrome
  // For development, I set devtool to 'eval-source-map'
  // For production, I set devtool to 'source-map'
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
    'redux-thunk'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'lcov', dir : 'coverage' }
  ]
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    );
  });

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

config.paths = {
  base   : base,
  examples: base.bind(null, config.dir_examples),
  client : base.bind(null, config.dir_client),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist)
};

// ========================================================
// Environment Configuration
// ========================================================
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const environments = require('./environments.config.js');
const overrides = environments[config.env];
if (overrides) {
  debug('Found overrides, applying to default configuration.');
  Object.assign(config, overrides(config));
} else {
  debug('No environment overrides found, defaults will be used.');
}

module.exports = config;
