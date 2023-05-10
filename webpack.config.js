const path = require("path");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = (env) => {
   let common_plugins = [
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         title: env.PAGE,
      }),
      new webpack.ProvidePlugin({ h: "h" }),
      new MiniCssExtractPlugin({
         filename: "[name].css",
      }),
   ];

   let prod_plugins = [
      new CleanWebpackPlugin(),
      new InjectManifest({
         swSrc: "./src/src-sw.js",
         swDest: "sw.js",
      }),
      new TerserPlugin(),
      new WebpackManifestPlugin(),
   ];

   let config = {
      mode: env.NODE_ENV,
      entry: ["./src/Index.jsx"],
      stats: "errors-warnings",
      ignoreWarnings: [
         {
            module: /esri-leaflet/,
            message: /version/,
         },
      ],
      performance: {
         hints: false,
      },
      output: {
         path: path.resolve(__dirname, "public/bundle"),
         filename: env.NODE_ENV === "development" ? "[name].js" : "[name].[fullhash].js",
         pathinfo: false,
      },
      resolve: {
         extensions: [".js", ".jsx", ".scss"],
         alias: {
            Root: path.resolve(__dirname, "src"),
            h: path.resolve(__dirname, "./src/Helpers.jsx"),
         },
         fallback: {
            util: false,
         },
      },
      module: {
         rules: [
            {
               test: /\.css$/,
               use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
               test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
               type: "asset/resource",
            },
            {
               test: /\.(gif|png|jpe?g)$/,
               type: "asset/resource",
            },
            {
               test: /\.(jsx|js)$/,
               include: path.resolve(__dirname, "src/"),
               exclude: /node_modules/,
               use: [
                  {
                     loader: "babel-loader",
                     options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-transform-runtime"],
                     },
                  },
               ],
            },
            /* {
               test: /\.svg$/i,
               issuer: /\.[jt]sx?$/,
               use: ["@svgr/webpack", "url-loader"],
            }, */
         ],
      },
   };

   if (env.NODE_ENV === "development") {
      return Object.assign(config, {
         plugins: common_plugins,
         devServer: {
            port: 8081,
            historyApiFallback: true,
            proxy: {
               "/vendor.js": {
                  target: "http://localhost:8080",
                  secure: false,
                  changeOrigin: true,
               },
            },
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
               "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            },
         },
         optimization: {
            usedExports: true,
         },
         devtool: "cheap-module-source-map",
      });
   } else {
      return Object.assign(config, {
         plugins: common_plugins.concat(prod_plugins),
         optimization: {
            minimize: true,
            // js and css minimizer
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
            runtimeChunk: "single",
            splitChunks: {
               chunks: "async",
               cacheGroups: {
                  defaultVendors: {
                     test: /[\\/]node_modules[\\/]/,
                     name: "vendor",
                  },
               },
            },
         },
      });
   }
};
