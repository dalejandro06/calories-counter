const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');



module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/[name].js',
		assetModuleFilename: 'assets/[name][ext]'
	},
	devtool: 'source-map',
	devServer: {
		open: true,
		contentBase: path.join(__dirname, 'dist'),
		port: 5500,
		hot: true
	},
	mode: 'development',
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg)$/,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html',
			minify: false
		}),
		new MiniCssExtractPlugin({
			filename: './css/[name].css'
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/img/'),
					to: './assets/'
				},
			]
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
