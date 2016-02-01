const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/js/main.js'],
	output: {
		path: path.join(__dirname, 'public/dist'),
		publicPath: 'dist',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	},
	module: {
		loaders: [
			{
				test: path.join(__dirname, 'src'),
				loader: 'babel-loader',
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015']
				}
			}
		]
	}
};
