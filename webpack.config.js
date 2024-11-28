const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');



module.exports = {
    mode: 'production',
    entry: {
        about_us: './public/js/pages/about_us.js',
        admin: './public/js/pages/admin.js',
        contact: './public/js/pages/contact.js',
        index: './public/js/pages/index.js',
        product: './public/js/pages/product.js',
        profile: './public/js/pages/profile.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
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
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/images', to: 'images' },
                { from: 'public/css', to: 'css' },
                { from: 'public/js/gsap', to: 'gsap' }
            ]
        }),
        new Dotenv()
    ]
}
