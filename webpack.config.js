const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/client/"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".css"]
    },

    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                { from: 'src/client/index.html', to: 'index.html', toType: 'file' },
                { from: 'src/client/css/', to: 'css' }
            ],
            { ignore: ['*.*ignore'] }
        )
    ],
};



// 

/////

// var config = {

//     // Enable sourcemaps for debugging webpack's output.
//     devtool: "source-map",

//     resolve: {
//         // Add '.ts' and '.tsx' as resolvable extensions.
//         extensions: [".ts", ".tsx", ".js", ".json"]
//     },

//     // module: {
//     //     rules: [
//     //         {
//     //             test: /\.[tj]sx?$/,
//     //             loader: 'ts-loader',
//     //             exclude: /node_modules/
//     //         }
//     //     ]
//     // },
//     plugins: [
//         new CopyWebpackPlugin( 
//             [
//                 { from: 'src/views/index.html', to: '', toType: 'file' },
//                 { from: 'src/views/css', to: 'css' }
//             ],  
//             { ignore: [ '*.*ignore' ] }
//         )
//     ],
//     node: {
//         fs: "empty",
//         net: 'empty',
//         tls: 'empty',
//         dns: 'empty'
//      }
// };

// var clientConfig = Object.assign({}, config, {
//     name: "client",
//     module: {
//         rules: [
//             {
//                 test: /\.[tj]sx?$/,
//                 loader: 'ts-loader',
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     entry: "./src/views/index.tsx",
//     output: {
//         filename: "clientBundle.js",
//         path: __dirname + "/dist"
//     }
// });
// var serverConfig = Object.assign({}, config,{
//     name: "server",
//     module: {
//         rules: [
//             {
//                 test: /\.[tj]sx?$/,
//                 loader: 'ts-loader',
//                 options: {
//                     transpileOnly:true
//                 },
//                 exclude: /node_modules/
//             }
//         ]
//     },
//     entry: "./src/server.ts",
//     target: 'node',
//     output: {
//         filename: "[name].js",
//         path: __dirname + "/dist"
//     }
// });

// // Return Array of Configurations
// module.exports = [
//     clientConfig, serverConfig,    	
// ];