<?php



class LegacyNavigationBlock {

    private static $instance = null;

    public $blockTitle ;
    public $blockSlug  ;

    public $pluginPath ;
    public $pluginUrl  ;

    private function __construct(){}


    // - - - Registers

    public function attachHooks(){

        add_filter( 'block_categories_all', function ( $categories, $post ) {

            foreach ( $categories as $category ) {
                if ( $category[ 'slug' ] == 'maxpertici' ) {
                    return $categories;
                }
            }

            return array_merge(
                $categories,
                [
                    [
                        'slug'  => 'maxpertici',
                        'title' => __( 'Alternative Blocks', 'legacy-navigation-block' ),
                    ],
                ]
            );

        }, 10, 2 );



        add_action( 'init', [ $this, 'doRegister' ] );
    }

    public function doRegister(){

        $this->registerScriptsAndStyles();
        $this->registerBlock();
    }

    public function registerScriptsAndStyles(){

        wp_register_script(
            'block-editor-' . $this->blockSlug ,
            $this->getPluginUrl() . 'dist/blocks/' . $this->blockSlug . '.min.js',
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' )
        );

        wp_register_style(
            'block-' . $this->blockSlug ,
            $this->getPluginUrl() . 'dist/blocks/' . $this->blockSlug . '.min.css'
        );

    }

    public function registerBlock(){

        register_block_type( 'maxpertici/' . $this->blockSlug, [

            'editor_script'   => 'block-editor-' . $this->blockSlug ,
            'editor_style'    => 'block-'        . $this->blockSlug ,
            'style'           => 'block-'        . $this->blockSlug ,

            'render_callback' => function ( $attributes, $content ) {
                ob_start();
                include( $this->getPluginPath() . '/core/render/render-' . $this->blockSlug . '.php' );
                return ob_get_clean();
            },

            'attributes' => $this->getBlockAttributes() ,
        ] );
    }




    // - - - Helpers

    public function getPluginPath(){
        return $this->plugin_path ;
    }

    public function getPluginUrl(){
        return $this->plugin_url ;
    }

    private function getBlockAttributes(){

        if( file_exists( $this->getPluginPath() . 'dist/blocks/' .  $this->blockSlug . '.attributes.json' ) ) {
            return json_decode( file_get_contents( $this->getPluginPath() . 'dist/blocks/' .  $this->blockSlug . '.attributes.json' ), true ) ;
        }

        return [];
    }



    // - - - Launch

    public static function getInstance(){

        if( self::$instance == null ){
            self::$instance = new LegacyNavigationBlock();
            self::$instance->setup();
        }

        return self::$instance;
    }

    private function setup(){

        $this->blockTitle  = __( 'Legacy Navigation Block', 'legacy-navigation-block' );
        $this->blockSlug   = 'legacy-navigation-block' ;

        $this->plugin_path = plugin_dir_path( dirname( __FILE__, 2 ) );
        $this->plugin_url  = plugins_url( '/', dirname( __FILE__, 2 ) ) ;
        $this->attachHooks();
    }

}
