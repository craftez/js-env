import path from 'path';

export default {
	devtool: 'inline-source-map',
	entry: [path.resolve(__dirname, 'src/app')],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'static'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
};
