var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMD5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => {
	const outputDirectory = env.production ? 'dist' : 'static';
	const plugins = [
		new webpack.LoaderOptionsPlugin({
			minimize: false,
			debug: true,
			noInfo: true // set to false to see a list of every file being bundled.
		}),
		// Hash the files using MD5 so that their name change when content changes.
		new WebpackMD5Hash(),

		// Generate an external css file with a hash in filename
		new ExtractTextPlugin('[name].[chunckhash].css'),

		// Create HTML file that includes reference to bundle.js
		new HtmlWebpackPlugin({
			template: './static/index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			// Properties you define here are available in index.html
			// using htmlWebpackPlugin.options.varName
			trackJSToken: '1f9e1d448ac7408d97326eb001535dd5',
			isProduction: env.production
		}),

		// Use CommonsChunkPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	];
	const devServer = {};

	if (env.production) {
		console.log(chalk.blue('Generating production bundle. This will take a moment...'));
		plugins.push(
			// Minify JS
			new webpack.optimize.UglifyJsPlugin()
		);
	} else {
		devServer.publicPath = '/';
		devServer.contentBase = './static';
	}

	return {
		devtool: env.production ? 'source-map' : 'inline-source-map',
		entry: {
			main: path.resolve(__dirname, 'src/app'),
			vendor: path.resolve(__dirname, './src/vendor')
		},
		target: 'web',
		output: {
			path: path.resolve(__dirname, outputDirectory),
			publicPath: '/',
			filename: '[name].[chunkhash].js'
		},
		devServer: devServer,
		plugins: plugins,
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				}
			]
		}
	};
};
