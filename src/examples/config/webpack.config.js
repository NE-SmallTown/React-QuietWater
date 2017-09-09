const argv = require('yargs').argv;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config.js');
const debug = require('debug')('app:globalConfig:webpack');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;

// https://github.com/webpack/loader-utils/issues/56#issuecomment-287336809
process.traceDeprecation = true;

debug('Creating configuration.');
const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : project.compiler_devtool,
  resolve : {
    modules: [
      project.paths.client(),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.examples('src/main.js');

webpackConfig.entry = {
  app : __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr&reload=true`)
    : [APP_ENTRY],
  vendor : project.compiler_vendors
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename   : `[name].[${project.compiler_hash_type}].js`,
  path       : project.paths.dist(),
  publicPath : project.compiler_public_path
};

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

// ------------------------------------
// Plugins
// ------------------------------------

const extractCss = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true,
  disable: __DEV__
});

webpackConfig.plugins = [
  new webpack.DefinePlugin(project.globals),
  new HtmlWebpackPlugin({
    template : project.paths.examples('src/index.html'),
    hash     : false,
    favicon  : project.paths.examples('public/favicon.ico'),
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true
    }
  }),
  extractCss
];

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        );
      }
    });
  });
}

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).');
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    // new webpack.NoEmitOnErrorsPlugin()
  );
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).');
  webpackConfig.plugins.push(

    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  );
}

// ------------------------------------
// Rules
// ------------------------------------
// JavaScript / JSON

const cssModulesHashRule = '[name]___[local]___[hash:base64:2]';
webpackConfig.module.rules = [{
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  include : project.paths.client(),
  use  : [
    {
      loader: 'babel-loader',
      options: Object.assign(
        project.compiler_babel,
        { plugins: project.compiler_babel.plugins.concat([
          [
            'babel-plugin-react-css-modules-ne-smalltown',
            {
              exclude: 'globalStyles',
              generateScopedName: cssModulesHashRule,
              webpackHotModuleReloading: true
            }
          ]
        ]) }
      )
    }
  ]
}];

// ------------------------------------
// Style Rules
// ------------------------------------

const cssnanoOptions = {
  autoprefixer : {
    add      : true,
    remove   : true,
    browsers : ['last 2 versions']
  },
  discardComments : {
    removeAll : true
  },
  discardDuplicates: true,
  discardUnused : false,
  mergeIdents   : false,
  mergeLonghand : true,
  mergeRules    : true,
  reduceIdents  : false,
  sourcemap     : __DEV__
};

const postCssLoaderConfig = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: project.paths.examples('config/postcss.config.js'),
      ctx: {
        cssnano: __DEV__ ? {} : cssnanoOptions
      }
    }
  }
};

// https://webpack.js.org/configuration/module/#rule-loader
// Rule.loader is a shortcut to Rule.use: [ { loader } ]. See Rule.use and UseEntry.loader for details.

// 配置src/globalStyles下面的为全局样式
// Global Css: set src/globalStyles to global css
// ------------------------------------

webpackConfig.module.rules.push({
  test    : /\.(css|scss)$/,
  include : [
    project.paths.client('globalStyles'),
    project.paths.examples('globalStyles'),
    /node_modules/
  ],
  loader  : extractCss.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      postCssLoaderConfig,
      'sass-loader'
    ]
  })
});

// CSS Modules
// ------------------------------------

webpackConfig.module.rules.push({
  test    : /\.(css|scss)$/,
  exclude : [
    project.paths.client('globalStyles'),
    project.paths.examples('globalStyles'),
    /node_modules/
  ],
  use  : [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 2,
        localIdentName: cssModulesHashRule
      }
    },
    postCssLoaderConfig,
    'sass-loader'
  ]
});

// Images
// ------------------------------------

webpackConfig.module.rules.push({
  test    : /\.(png|jpg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 8192
  }
});

// File Rules
/* eslint-disable */

[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml']
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  webpackConfig.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype
    },
  })
});
/* eslint-enable */

module.exports = webpackConfig;
