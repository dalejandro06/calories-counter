const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/[contenthash].js',
		assetModuleFilename: 'assets/[contenthash][ext]'
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				exclude: /\/node_modules/
			}),
			new CssMinimizerPlugin({
				parallel: true,
				sourceMap: true
			})
		]
	},
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
			minify: true
		}),
		new MiniCssExtractPlugin({
			filename: './css/[contenthash].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/img/'),
					to: './assets/'
				}
			]
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: true,
			cleanAfterEveryBuildPatterns: true
		})
	]
};
