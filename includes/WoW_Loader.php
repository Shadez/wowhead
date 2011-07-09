<?php

/**
 * Copyright (C) 2010-2011 Shadez <https://github.com/Shadez>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 **/

// Start sessions
session_start();
// Display all errors
error_reporting(E_ALL);
// Detect main directory
define('WOW_DIRECTORY', dirname(dirname(__FILE__)));
// And check it
if(!defined('WOW_DIRECTORY') || !WOW_DIRECTORY) {
    die('<strong>Fatal Error</strong>: unable to detect directory for system files!');
}
define('DS', DIRECTORY_SEPARATOR);
define('INCLUDES_DIR',    WOW_DIRECTORY . DS . 'includes' . DS);
define('CLASSES_DIR',     INCLUDES_DIR . 'classes' . DS);
define('CONFIGS_DIR',     INCLUDES_DIR . 'configs' . DS);
define('LOCALES_DIR',     INCLUDES_DIR . 'locales' . DS);
define('TEMPLATES_DIR',   INCLUDES_DIR . 'templates' . DS);
// Core classes definitions
$core_files = array(
    array('title' => 'Revision Holder File', 'path' => 'revision_nr.php', 'type' => 'CORE'),
    array('title' => 'Core Defines File', 'path' => 'SharedDefines.php', 'type' => 'CORE'),
    array('title' => 'Database Configuration File', 'path' => CONFIGS_DIR . 'DatabaseConfig.php', 'type' => 'CORE'),
    array('title' => 'Core Configuratin File', 'path' => CONFIGS_DIR . 'WoWConfig.php', 'type' => 'CORE'),
    array('title' => 'MySQL Database Class File', 'path' => CLASSES_DIR . 'libs' . DS . 'mysqldatabase.php', 'type' => 'CORE'),
    array('title' => 'Debug Log Class File', 'path' =>  CLASSES_DIR . 'libs' . DS . 'log.php', 'type' => 'CORE'),
    
    array('title' => 'Database Class File', 'path' =>  CLASSES_DIR . 'class.db.php', 'type' => 'CORE', 'postLoadEventClass' => 'DB', 'postLoadEventMethod' => 'LoadConfigs'),
    array('title' => 'Core Class File', 'path' =>  CLASSES_DIR . 'class.wow.php', 'type' => 'CORE', 'postLoadEventClass' => 'WoW', 'postLoadEventMethod' => 'SelfTests'),
    array('title' => 'Locale Manager Class File', 'path' =>  CLASSES_DIR . 'class.locale.php', 'type' => 'CORE'),
    array('title' => 'Template Manager Class File', 'path' =>  CLASSES_DIR . 'class.template.php', 'type' => 'CORE')
);
// Data
$data_files = array(
    array('title' => 'Character Classes File', 'path' => INCLUDES_DIR . 'data' . DS . 'data.classes.php', 'type' => 'DATABASE'),
    array('title' => 'Character Races File', 'path' => INCLUDES_DIR . 'data' . DS . 'data.races.php', 'type' => 'DATABASE'),
);
// Classes loader
if(!@include(INCLUDES_DIR . 'ClassesLoader.php')) {
    die('<strong>Fatal Error:</strong> ClassesLoader.php file was not found, unable to run!');
}
// Load core files
LoadClasses($core_files);
// Load Data
LoadClasses($data_files);
// Register autoload method
spl_autoload_register('WoW_Autoload');

/**
 * Autoload classes. Do not call this function manually, it will be called automatically.
 * 
 * @category WoW Loader
 * @access   global / public
 * @param    string $className
 * @return   void
 **/
function WoW_Autoload($className)
{
    //prevent error when mailer classes are loaded
     $className = strtolower(str_replace('WoW_', null, $className));
     if(!file_exists(CLASSES_DIR . 'class.' . $className . '.php')) {
         die('<strong>Autoload Fatal Error:</strong> unable to autoload class ' . $className . '!');
     }
     include(CLASSES_DIR . 'class.' . $className . '.php');
}
// Locale
if(isset($_GET['locale'])) {
    $_SESSION['wow_locale'] = $_GET['locale'];
    $_SESSION['wow_locale_id'] = WoW_Locale::GetLocaleIDForLocale($_SESSION['wow_locale']);
    if(WoW_Locale::IsLocale($_SESSION['wow_locale'], $_SESSION['wow_locale_id'])) {
        WoW_Locale::SetLocale($_SESSION['wow_locale'], $_SESSION['wow_locale_id']);
        if(isset($_SERVER['HTTP_REFERER'])) {
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit;
        }
        else {
            WoW::RedirectTo();
            exit; 
        }
    }
}
// Load locale
if(isset($_SESSION['wow_locale']) && WoW_Locale::IsLocale($_SESSION['wow_locale'], $_SESSION['wow_locale_id'])) {
    WoW_Locale::SetLocale($_SESSION['wow_locale'], $_SESSION['wow_locale_id']);
}
else {
    WoW_Locale::SetLocale(WoWConfig::$DefaultLocale, WoWConfig::$DefaultLocaleID);
}
// Initialize debug log
WoW_Log::Initialize(WoWConfig::$UseLog, WoWConfig::$LogLevel);
if(isset($_GET['_DISPLAYVERSION_'])) {
    die(WOW_REVISION);
}
?>