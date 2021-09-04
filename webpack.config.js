const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/[name]-[contenthash].js',
		assetModuleFilename: 'assets/[name]-[contenthash][ext]'
	},
	optimization: {
		minimize: true,
		mangleWasmImports: true,
		removeAvailableModules: true,
		moduleIds: 'size',
		minimizer: [
			new TerserPlugin({
				exclude: /\/node_modules/,
				extractComments: true,
				terserOptions: {
					ie8: false,
				}
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
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
		new MiniCssExtractPlugin({
			filename: './css/[contenthash].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/img/'),
					to: './assets/'
				},
				{
					from: path.resolve(__dirname, 'public/', 'manifest.json'),
					to: './'
				}
			]
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: true,
			cleanAfterEveryBuildPatterns: true
		})
	]
};
