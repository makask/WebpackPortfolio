const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')

const path = require('path');
const glob = require('glob');

// make an array with pages names
//let pages = ['cat1','cat2','cat3','dog1','dog2','dog3'];
// map a new HtmlWebpackPlugin to each of those name outputting array
//let htmlPlugins = pages.map( page => {
//    return new HtmlWebpackPlugin({
//        filename: page + '.html',
//        template: './src/index.html'
//   });
//});

const PATHS = {
  src: path.join(__dirname, 'src')
}

module.exports = {
  //mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  module: {
      rules: [
          {
            test: /\.css$/i,
            use: ["style-loader","css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
          },
          {
            test: /\.twig$/i,
            use: "twig-loader",
           
          },
      ],
  },
  plugins: [
      new HtmlWebpackPlugin({
         title: 'My Portfolio Page',
         template: './src/index.twig',
         templateParameters: {
          title: 'hello'
         }, 
      }),
      new HtmlWebpackPlugin({
        title: 'About us',
        filename: 'about.html',
        template: './src/about.twig' 
      }),
      new HtmlWebpackPlugin({
        title: 'Contact Me',
        filename: 'contact.html',
        template: './src/contact.twig' 
      }),
      new HtmlWebpackPlugin({
        title: 'Education',
        filename: 'education.html',
        template: './src/education.twig' 
      }),
    // ...htmlPlugins, // spread operation spreading array into existing array.
    new MiniCssExtractPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),

    ],
};