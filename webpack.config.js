const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// Check if it's production mode or development mode
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        main: './src/js/index.js',
        indexSign: './src/js/auth.js',
        login: './src/js/authlog.js',
        forgotPass: './src/js/authForgotPass.js',
        dashboard: './src/js/authDash.js',
        resetPass: './src/js/authResetPass.js',
        verify: './src/js/authVerify.js',
    },
      
    output: {
        filename: '[name].bundle.js',  // Each entry will have its own file
        path: path.resolve(__dirname, 'docs'),
        clean: true,  // Clean the /dist folder before each build
        publicPath: isProduction
        ? '/Final-Version---CSDB-Collaboration-Skills-Database/'  // For production
        : '/',  // Use root path for development
        
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // Always extract CSS
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,  // Match image file types including .svg
                type: 'asset/resource',  // Use asset/resource for outputting files
            },
            {
                test: /\.js$/,  // For JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['indexSign'],  // Inject only signup-related JS
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html',
            chunks: ['login'],  // Inject login-related JS
        }),
        new HtmlWebpackPlugin({
            template: './public/forgotPass.html',
            filename: 'forgotPass.html',
            chunks: ['forgotPass'],  // Inject forgot password-related JS
        }),
        new HtmlWebpackPlugin({
            template: './public/dashardboard.html',
            filename: 'dashardboard.html',
            chunks: ['dashboard'],  // Inject dashboard-related JS
        }),
        new HtmlWebpackPlugin({
            template: './public/reset-password.html',
            filename: 'reset-password.html',
            chunks: ['resetPass'],  // Inject reset password-related JS
        }),
        new HtmlWebpackPlugin({
            template: './public/verification-pending.html',
            filename: 'verification-pending.html',
            chunks: ['verify'],  // Inject verification-related JS
        }),
        new HtmlWebpackPlugin({
            template: './public/confirm.html',
            filename: 'confirm.html',
            chunks: [],  // No JS, just CSS
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',  // Generates [name].css for each bundle
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/404.html', to: '404.html' },  // Copy 404.html to docs
                { from: 'src/css/404.css', to: '404.css' },  // Copy 404.css to docs
                { from: 'src/js/404.js', to: '404.js' },    // Copy 404.js to docs
            ],
        }),
        new Dotenv(),  // Load env
    ],

    // Set mode dynamically based on the NODE_ENV
    mode: isProduction ? 'production' : 'development',

    // Only include devServer in development mode
    ...(isProduction
        ? {}
        : {
              devServer: {
                  static: {
                      directory: path.join(__dirname, 'public'),
                  },
                  hot: true,  // Enable Hot Module Replacement (HMR)
                  open: true,
                  port: 8080,
              },
          }),
};
