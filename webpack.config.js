/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const zlib = require("zlib");

const isDevelopment = process.env.NODE_ENV !== "production";   //example: isDevelopment && new ReactRefreshWebpackPlugin(),

console.log(process.env.NODE_ENV);
module.exports = {
	mode: isDevelopment ? "development" : "production",
	devtool: isDevelopment ? "inline-source-map" : "source-map",
	devServer: {
		static: {
			directory: path.join(process.cwd(), "dist")  //"./dist"
		},
		port: 9000,
		allowedHosts: [ "localhost" ],
		hot: true,
		liveReload: false,
		historyApiFallback: true,
		https: {
			pfx: path.join(process.env.USERPROFILE, ".aspnet/https/aspnetapp.pfx"),
			passphrase: "Demo123!",
		},
	//	writeToDisk: true,
		open: {
			app: {
				name: "chrome",
				arguments: ["--remote-debugging-port=9222"]
			}
		}
	},

	resolve: {
		extensions: [ ".js", ".jsx", "ts", ".tsx" ]
	},

	entry: {
	//	react: [ "react", "react-router", "react-dom"],
	//	common: [ "lodash", "date-fns" ],
	//	app: { import: [ "./src/app.tsx", "./src/app.scss" ], dependOn: [ "react", "common" ] }
		app: [ "./src/app.tsx", "./src/app.scss" ]
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: isDevelopment ? "[name].bundle.js" : "[name].[contenthash].bundle.js"
		//filename: '[name].[contentHash].bundle.js'  //production
	},

	module: {
		rules: [
			//  { test: /\\.css$/, use: 'css-loader' },
			{
				test: require.resolve("jquery"),
				loader: "expose-loader",
				options: {
				  exposes: ["$", "jQuery"],
				},
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
			//	use: "ts-loader"
				use: "babel-loader"
			},
			{
				test: /\.(s[ac]ss|css)$/, use: [
					MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
				]
			},
			{
				test: /\.handlebars$/, loader: "handlebars-loader"
			}
		]
	},
	plugins: [

		new CleanWebpackPlugin( { cleanStaleWebpackAssets: false }),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			title: "Generated",
			template: "./src/Index.handlebars",
			templateParameters: {
				testParam: "param"
			}
		}),
		new webpack.DefinePlugin({
			__APIHOSTNAME__: isDevelopment ? "\"{0}:1795\"" : "\"{0}\"",
			__APIHOST__: isDevelopment ? "\"https://{0}:8081/\"" : "\"https://api.{0}/\"",
			__AUTHORITY__: isDevelopment ? "\"https://{0}:8081/\"" : "\"https://account{0}/\"",
			__REDIRECTURI__: isDevelopment ? "\"https://{0}:9000/signin-oidc\"" : "\"https://www{0}/signin-oidc\"",
			__SREDIRECTURI__: isDevelopment ? "\"https://{0}:9000/renew-oidc\"" : "\"https://www{0}/renew-oidc\"",
			__PLREDIRECTURI__: isDevelopment ? "\"https://{0}:9000/signout-callback-oidc\"" : "\"https://www{0}/signout-callback-oidc\"",

		}),
		new CopyPlugin({
			patterns: [
			  { from: "./src/images", to: "./images" },
			],
		  })
		//  new ReactRefreshWebpackPlugin()
	]
};