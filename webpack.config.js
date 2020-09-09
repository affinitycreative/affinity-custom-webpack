const path = require("path"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  UglifyJSPlugin = require("uglifyjs-webpack-plugin"),
  // OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  BrowserSyncPlugin = require("browser-sync-webpack-plugin"),
  StyleLintPlugin = require("stylelint-webpack-plugin"),
  SpriteLoaderPlugin = require("svg-sprite-loader/plugin"),
  webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: {
    bundle: ["./src/js/index.js"],
    //style:['./src/scss/style.scss']
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        enforce: "pre",
        exclude: /node_modules/,
        test: /\.jsx$/,
        loader: "eslint-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: "./src/js/postcss.config.js",
              },
            },
          },
          {
            loader: "resolve-url-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader?sourceMap",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "../fonts/",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["svg-sprite-loader", "svgo-loader"],
      },
      // {
      //   test: require.resolve("jquery"),
      //   loader: "expose-loader?jQuery!expose-loader?$",
      //   options: {
      //     exposes: ["$", "jQuery"],
      //   },
      // },
    ],
  },
  plugins: [
    new StyleLintPlugin({
      lintDirtyModulesOnly: true,
    }),
    new MiniCssExtractPlugin({ filename: "../style.css" }),
    // new BrowserSyncPLugin({
    //   files: ['**/*.php', '*.php'],
    //   injectChanges: true,
    //   notify: true,
    //   proxy: 'http://webpack-testv2.local/',
    //   reload: false
    // }),
    new BrowserSyncPlugin(
      {
        proxy: "http://delicato-scholarship.local/",
        open: false,
        injectChanges: true,
        files: [
          {
            match: ["style.css", "public/*.js", "**/*.php"],
            fn: (event, file) => {
              if ("change" == event) {
                const bs = require("browser-sync").get("bs-webpack-plugin");

                let filename = file.substring(file.lastIndexOf("/") + 1);
                console.log(filename);

                if (filename == "style.js" || filename == "style.css") {
                  bs.reload("*.css");
                } else if (
                  file.split(".").pop() == "js" ||
                  file.split(".").pop() == "php"
                ) {
                  bs.reload();
                }

                // if (file.split('.').pop() == 'js' || file.split('.').pop() == 'php') {
                //    bs.reload('*.css')
                // } else {
                //   bs.reload('*.css');
                // }
              }
            },
          },
        ],
      },
      {
        reload: false,
        name: "bs-webpack-plugin",
      }
    ),

    // Provides jQuery for other JS bundled with Webpack
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        include: /\.min\.js$/,
      }),
      // new OptimizeCssAssetsPlugin(),
    ],
  },
};
