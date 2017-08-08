import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import packageJson from './package.json';

const main = () => {
  const PROD = process.argv.includes('-p');

  const min = PROD ? '.min' : '';

  const plugins = [new ExtractTextPlugin(`${packageJson.name}${min}.css`)];

  if (PROD) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        },
      })
    );
  }

  return {
    entry: {
      main: ['./src/js/index.js'],
    },
    output: {
      filename: `${packageJson.name}${min}.js`,
      path: path.resolve(__dirname, 'dist'),
    },
    plugins,
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'es2015', 'stage-1'],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          }),
        },
      ],
    },
    externals: { React: 'react', ReactDOM: 'react-dom' },
    devtool: PROD ? false : 'source-maps',
  };
};

export default main;
