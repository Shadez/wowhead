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
// Load defines
include(WOW_DIRECTORY . '/includes/revision_nr.php');
include(WOW_DIRECTORY . '/includes/SharedDefines.php');
// Load configs
include(WOW_DIRECTORY . '/includes/configs/DatabaseConfig.php');
include(WOW_DIRECTORY . '/includes/configs/WoWConfig.php');
// Load libraries
include(WOW_DIRECTORY . '/includes/classes/libs/mysqldatabase.php');
include(WOW_DIRECTORY . '/includes/classes/libs/log.php');
// Load classes
include(WOW_DIRECTORY . '/includes/classes/class.db.php');
include(WOW_DIRECTORY . '/includes/classes/class.wow.php');
include(WOW_DIRECTORY . '/includes/classes/class.locale.php');
include(WOW_DIRECTORY . '/includes/classes/class.template.php');

include(WOW_DIRECTORY . '/includes/classes/class.itemprototype.php');
include(WOW_DIRECTORY . '/includes/classes/class.abstract.php');
include(WOW_DIRECTORY . '/includes/classes/class.achievements.php');
include(WOW_DIRECTORY . '/includes/classes/class.items.php');
include(WOW_DIRECTORY . '/includes/classes/class.utils.php');
include(WOW_DIRECTORY . '/includes/classes/class.search.php');
// Load data
include(WOW_DIRECTORY . '/includes/data/data.classes.php');
include(WOW_DIRECTORY . '/includes/data/data.races.php');
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
            header('Location: ' . WoW::GetWoWPath() . '/');
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
// Load databases configs
DB::LoadConfigs();
// Initialize connections to databases
DB::ConnectToAllDBs();
if(isset($_GET['_DISPLAYVERSION_'])) {
    die('VERSION: ' . WOW_REVISION);
}
?>