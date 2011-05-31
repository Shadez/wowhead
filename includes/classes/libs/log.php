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

Class WoW_Log {
    
    /**
     * Log config
     **/
    private static $is_enabled = false;
    private static $log_level = 2;
    private static $file = null;
    
    public static function Initialize($is_enabled, $log_level) {
        self::$is_enabled = $is_enabled;
        self::$log_level = $log_level;
        self::$file = WOW_DIRECTORY . '/_debug/tmp.dbg';
        return true;
    }
    
    public static function WriteLog($text) {
        if(self::$is_enabled == false || self::$log_level < 2) {
            return;
        }
        $args = func_get_args();
        $debug_log = self::AddStyle('debug');
        $debug_log .= call_user_func_array('sprintf', $args);
        $debug_log .= "<br />\n";
        self::WriteFile($debug_log);
        return;
    }
    
    public static function WriteError($text) {
        if(self::$is_enabled == false || self::$log_level < 1) {
            return;
        }
        $args = func_get_args();
        $error_log = self::AddStyle('error');
        $error_log .= call_user_func_array('sprintf', $args);
        $error_log .= "<br />\n";
        self::WriteFile($error_log);
        return;
    }
    
    public static function WriteSql($text) {
        if(self::$is_enabled == false || self::$log_level < 3) {
            return;
        }
        $args = func_get_args();
        $error_log = self::AddStyle('sql');
        $error_log .= call_user_func_array('sprintf', $args);
        $error_log .= "<br />\n";
        self::WriteFile($error_log);
        return;
    }
    
    private static function AddStyle($type) {
        if(self::$is_enabled == false) {
            return;
        }
        switch($type) {
            case 'debug':
                $log = sprintf('<strong>DEBUG</strong> [%s]: ', date('d-m-Y H:i:s'));
                break;
            case 'error':
                $log = sprintf('<strong>ERROR</strong> [%s]: ', date('d-m-Y H:i:s'));
                break;
            case 'sql':
                $log = sprintf('<strong>SQL</strong> [%s]: ', date('d-m-Y H:i:s'));
                break;
        }
        return $log;
    }
    
    private static function WriteFile($data) {
        @file_put_contents(self::$file, $data, FILE_APPEND);
        return;
    }
}
?>