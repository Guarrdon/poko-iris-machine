// module.exports = {
//     entry: "./src/views/test.tsx",
//     output: {
//         filename: "clientBundle.js",
//         path: __dirname + "/dist"
//     },

//     // Enable sourcemaps for debugging webpack's output.
//     devtool: "source-map",

//     resolve: {
//         // Add '.ts' and '.tsx' as resolvable extensions.
//         extensions: [".ts", ".tsx", ".js", ".json"]
//     },

//     module: {
//         rules: [
//             {
//                 test: /\.[tj]sx?$/,
//                 loader: 'ts-loader',
//                 exclude: /node_modules/
//             }
//         ]
//     }
// };
const CopyWebpackPlugin = require('copy-webpack-plugin')



var config = {

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    // module: {
    //     rules: [
    //         {
    //             test: /\.[tj]sx?$/,
    //             loader: 'ts-loader',
    //             exclude: /node_modules/
    //         }
    //     ]
    // },
    plugins: [
        new CopyWebpackPlugin( 
            [
                { from: 'src/views/index.html', to: '', toType: 'file' },
                { from: 'src/views/css', to: 'css' }
            ],  
            { ignore: [ '*.*ignore' ] }
        )
    ],
    node: {
        fs: "empty",
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
     }
};

var clientConfig = Object.assign({}, config, {
    name: "client",
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    entry: "./src/views/index.tsx",
    output: {
        filename: "clientBundle.js",
        path: __dirname + "/dist"
    }
});
var serverConfig = Object.assign({}, config,{
    name: "server",
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly:true
                },
                exclude: /node_modules/
            }
        ]
    },
    entry: "./src/server.ts",
    target: 'node',
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    }
});

// Return Array of Configurations
module.exports = [
    clientConfig, serverConfig,    	
];