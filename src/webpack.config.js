/**
 * 
 * 
 */


const glob    = require( "glob"    ) ;
const webpack = require( "webpack" );
const path    = require( "path"    );

const MiniCssExtractPlugin   = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin     = require( "css-minimizer-webpack-plugin" );
const TerserPlugin           = require('terser-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyPlugin             = require("copy-webpack-plugin");


// - - - - - - - - - - - -

module.exports = (env, options ) => {

    let configs   = [] ;

    // - - - - - - - - - - - -

    /**
     * Blocks
     * - - - -
     * catch files
     * 
     */

    let BLOCKfiles = glob.sync( "./blocks/**/index.jsx" );

    let BLOCKentries            =  {} ; // jsx to watch
    let BLOCKattributesPatterns =  [] ; // patterns for attrbiutes.json copy

    BLOCKfiles.forEach( function( filePath ){

        const fileDir         = path.dirname( filePath ) ;
        const pathFolders     = fileDir.split( '/' );
        const blockFolderName = pathFolders[ pathFolders.length - 1 ];

        BLOCKentries[ blockFolderName  ] = filePath ;

        BLOCKattributesPatterns.push(
            {
                from: "**/" + blockFolderName + "/attributes.json",
                context: path.resolve( __dirname, 'blocks' ),
                to: "blocks/"  + blockFolderName + ".attributes.json",
                noErrorOnMissing: true,
            }
        );

    });

    // Fallback : Pattern de copie des attribues sinon erreur...
    
    if( 0 === BLOCKattributesPatterns.length ){

        BLOCKattributesPatterns.push(
            {
                from: "**/zero.attributes.json",
                context: path.resolve( __dirname, 'blocks' ),
                to: "blocks/zero.attributes.json",
                noErrorOnMissing: true,
            }
        );
    }


    // - - - - - - -

    /**
     * Blocks
     * - - - -
     * config : build block non min & json
     * 
     */

    
    let BLOCKS_build__nomin_and_json = {

        mode   : "production",
        entry  : BLOCKentries ,
        output : {
            path: path.resolve( __dirname, "../dist" ),
            filename: "./blocks/[name].js",
            module: true,
            library: { type: "module" }
        },

        optimization : {
            usedExports        : true,
            concatenateModules : true,
            minimize           : false,
        },

        experiments: {
            outputModule: true
        },

        module : {

            rules : [
                {
                    test: /\.(jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/env", "@babel/react" ],
                        },
                    }
                },
                {
                    test: /\.scss$/ ,
    
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options : { emit : false }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                url:false,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                              postcssOptions: {
                                parser: require('postcss-scss'),
                                plugins: [
                                  [
                                    "postcss-preset-env", {
                                        stage: false,
                                        // browsers: 'last 2 version', @see in package.json
                                        // autoprefixer: { grid: true } ? grid for IE10  :: @source : https://github.com/postcss/autoprefixer#options
                                    },
                                  ],
                                ],
                              },
                            },
                        },

                    ],
    
                },


            ]
        },
    
        plugins: [
            
            new MiniCssExtractPlugin(
                {
                    filename: "blocks/[name].css",
                    chunkFilename: "[id].css",
                }
            ),
            
            new CopyPlugin({ patterns:  BLOCKattributesPatterns , }),

            new CleanWebpackPlugin({
                dry: true,
                verbose: true,
                dangerouslyAllowCleanPatternsOutsideProject: true,
                cleanOnceBeforeBuildPatterns: [
                    '../dist/blocks/*.json',
                    '../dist/blocks/*.js',
                    '../dist/blocks/**',
                ],
                
            }),
            
        ]
        
    } ;
    
    // - - - - - - -

    /**
     * Blocks
     * - - - -
     * config : build block min
     * 
     */

    let BLOCKS_build__min = {

        mode    : "production",
        devtool : 'source-map',
        entry   : BLOCKentries ,
        output  : {
            path: path.resolve( __dirname, "../dist" ),
            filename: "./blocks/[name].min.js",
            
            module: true,
            library: { type: "module" }
        },

        optimization : {
            usedExports        : true,
            concatenateModules : true,
            minimize           : true ,
            minimizer          :
                [
                    new TerserPlugin({
                        extractComments : false,
                        terserOptions   : {
                            compress    : true,
                            format      : { comments: false, },
                        },
                    }),
                    new CssMinimizerPlugin({

                        minimizerOptions: {
                            preset: [
                              "default",
                              {
                                discardComments: { removeAll: true },
                              },
                            ],
                        },
                      }),
                ]
        },

        experiments: {
            outputModule: true
        },

        module : {

            rules : [
                {
                    test: /\.(jsx)$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/env", "@babel/react" ],
                        }
                    }
                },
                {
                    test: /\.scss$/ ,
                    use: [

                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                url:false,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            },
                        },

                        {
                            loader: "postcss-loader",
                            options: {
                              postcssOptions: {
                                parser: require('postcss-scss'),
                                plugins: [
                                  [
                                    "postcss-preset-env", {
                                        stage: false,
                                        // browsers: 'last 2 version', @see in package.json
                                        // autoprefixer: { grid: true } ? grid for IE10  :: @source : https://github.com/postcss/autoprefixer#options
                                    },
                                  ],
                                ],
                              },
                            },
                        },
                    ],
    
                },

                
            ]
        },
    
        plugins: [
            
            new MiniCssExtractPlugin(
                {
                    filename: "blocks/[name].min.css",
                    chunkFilename: "[id].min.css",
                }
            ),
            new CleanWebpackPlugin({
                dry: true,
                verbose: true,
                dangerouslyAllowCleanPatternsOutsideProject: true,
                cleanOnceBeforeBuildPatterns: [
                    '../dist/blocks/*.min.js',
                    '../dist/blocks/*.min.js.map',
                    '../dist/blocks/**',
                ],
                cleanAfterEveryBuildPatterns : [
                    '../dist/blocks/*.min.js.LICENSE.txt',
                ]
            })
        ]
    } ;
    
    // - - - - - - -

    /**
     * Setup configs[]
     * 
     */


    let buildScope = process.env.scope ;

    switch( buildScope ) {

        case 'blocks':
        configs.push( BLOCKS_build__nomin_and_json );
        configs.push( BLOCKS_build__min   );
        break;

        default:
        configs.push( BLOCKS_build__nomin_and_json );
        configs.push( BLOCKS_build__min   );
    } 
   

    // - - - - - - - - - - - -

    // Finish 🎉
    
    return configs ;

}