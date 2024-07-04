const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.js',  // Adjust the entry point based on your project structure
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')  // Adjust the output directory as needed
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
            // Add more loaders if necessary for other file types (e.g., CSS, images)
        ]
    }
};
