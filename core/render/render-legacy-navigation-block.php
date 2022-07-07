<?php

$is_admin = false;

if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
    $is_admin = true;
}

// echo '<pre>' . print_r( $attributes , 1 ) . '</pre>'; 

?>
<div class="wp-block-acf-like">

    <div class="wp-block-acf-like__inner-container">
        <?php

        $args = array(
            'menu' => 'main'
        );

        wp_nav_menu( $args ) ;


        ?>

    </div>
</div>