// Webpack Configuration for React
// Manual setup with Babel for JSX compilation

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Entry point of the application
    entry: './src/index.js',
    
    // Output configuration
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
        publicPath: '/'
    },
    
    // Development server configuration
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        port: 3000,
        hot: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true
            }
        }
    },
    
    // Module rules for processing files
    module: {
        rules: [
            // Babel loader for JavaScript/JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@babel/preset-react', {
                                runtime: 'automatic'
                            }]
                        ]
                    }
                }
            },
            // CSS loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    
    // File extensions to resolve
    resolve: {
        extensions: ['.js', '.jsx']
    },
    
    // Plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    
    // Mode: development or production
    mode: 'development',
    
    // Source maps for debugging
    devtool: 'source-map'
};

