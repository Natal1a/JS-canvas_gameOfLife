module.exports = {
  mode: "production",
	entry: "./src//index.js",
	output: { filename: "out.js" },
	watch: true,
	module: {
        rules: [
            {
                test: /\.js$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['@babel/preset-env'] }
            },
            {
            	test: /\.css$/,
            	loader: ['style-loader', 'css-loader']
            }
        ]
    }
}
