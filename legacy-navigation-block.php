<?php
/*
Plugin Name:  Legacy Navigation Block
Plugin URI:   https://maxpertici.fr#legacy-navigation-block
Description:
Version:      1.0
Author:       @maxpertici
Author URI:   https://maxpertici.fr
Contributors:
License:      GPLv2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  legacy-navigation-block
Domain Path:  /languages
*/

defined( 'ABSPATH' ) or die();

// - -

require_once('core/class/class-legacy-navigation-block.php');

$LNB = LegacyNavigationBlock::getInstance() ;