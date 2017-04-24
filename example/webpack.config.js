const path = require("path")
const webpack = require("webpack")

const devtool = "cheap-module-source-map"
const plugins = [
	new webpack.BannerPlugin(`This file is created by hanyang\nupdated_at: ${(new Date).toGMTString()}`)
]

module.exports = {
	entry: {
		app: "./app.js",
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		publicPath: "/dist/"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: "vue-loader",
						options: {
							preserveWhitespace: false
						}
					}
				]
			}
		]
	},
	plugins: plugins,
	resolve: {
		modules: [path.resolve(__dirname), "node_modules"],
		extensions: [".js", ".vue"]
	},
	devtool: devtool
}