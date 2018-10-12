const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const path = require( 'path' );

// Add entry points here.
const entry = {
	'wp-handbook': path.resolve( __dirname, './src/js' ),
};

const filename = '[name].js';
const plugins = [
	new ExtractTextPlugin( '[name].css' ),
	new OptimizeCssAssetsPlugin( { cssProcessor: require( 'cssnano' ) } ),
];

module.exports = {
	mode: 'production' === process.env.NODE_ENV ? 'production' : 'development',
	entry,
	output: {
		filename,
		chunkFilename: '[name].js',
		path: path.resolve( __dirname, 'dist' ),
	},
	plugins,
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: true,
					},
				},
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader' ],
				} ),
			},
		],
	},
	devtool: 'sourcemap',
};
