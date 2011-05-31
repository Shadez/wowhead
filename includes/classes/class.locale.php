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

Class WoW_Locale {
    private static $locale_name = null;
    private static $locale_id = -1;
    private static $locale_holder = null;
    
    public static function SetLocale($locale_name, $locale_id, $load_locale = true) {
        self::$locale_name = self::GetAppropriateLocaleNameForLocale($locale_name);
        self::$locale_id = $locale_id;
        if($load_locale) {
            self::LoadLocale();
        }
    }
    
    public static function GetLocale($type = LOCALE_SINGLE) {
        switch($type) {
            default:
            case LOCALE_SINGLE:
                return self::$locale_name;
                break;
            case LOCALE_DOUBLE:
                return self::$locale_id == LOCALE_EN ? 'en-us' : self::$locale_name . '-' . self::$locale_name;
                break;
            case LOCALE_SPLIT:
                return self::$locale_id == LOCALE_EN ? 'enus' : self::$locale_name . self::$locale_name;
                break;
            case LOCALE_PATH:
                return self::$locale_id == LOCALE_EN ? 'en_us' : self::$locale_name . '_' . self::$locale_name;
        }
    }
    
    public static function GetLocaleID() {
        return self::$locale_id;
    }
    
    public static function LoadLocale() {
        if(self::$locale_name == null || self::$locale_id == -1) {
            return false;
        }
        if(!@include(WOW_DIRECTORY . '/includes/locales/locale_' . self::$locale_name . '.php')) {
            @include(WOW_DIRECTORY . '/includes/locales/locale_' . WoWConfig::$DefaultLocale . '.php');
        }
        self::$locale_holder = $WoW_Locale;
        return true;
    }
    
    public static function GetString($index, $gender = -1) {
        if(!isset(self::$locale_holder[$index])) {
            return $index;
        }
        $string = self::$locale_holder[$index];
        // Replace $gTEXT_MALE:TEXT_FEMALE; to correct one according with provided gender ID.
        // AoWoW
        if(preg_match('/\$g(.*?):(.*?);/iu', $string, $matches)) {
            if(!is_array($matches) || !isset($matches[0]) || !isset($matches[1]) || !isset($matches[2])) {
                return $string;
            }
            switch($gender) {
                default:
                case GENDER_MALE:
                    $string = str_replace($matches[0], $matches[1], $string);
                    break;
                case GENDER_FEMALE:
                    $string = str_replace($matches[0], $matches[2], $string);
                    break;
            }
        }
        return $string;
    }
    
    public static function GetMenuString() {
        return self::$menu_holder;
    }
    
    public static function IsLocale($locale_str, $locale_id) {
        switch(strtolower($locale_str)) {
            case 'de':
            case 'dede':
            case 'de-de':
            case 'de_de';
                return $locale_id == LOCALE_DE;
            case 'en':
            case 'enen':
            case 'enus':
            case 'engb':
            case 'en-en':
            case 'en-us':
            case 'en-gb':
            case 'en_en':
            case 'en_us':
            case 'en_gb':
                return $locale_id == LOCALE_EN;
            case 'es':
            case 'eses':
            case 'es-es':
            case 'es_es':
                return $locale_id == LOCALE_ES;
            case 'fr':
            case 'frfr':
            case 'fr-fr':
            case 'fr_fr':
                return $locale_id == LOCALE_FR;
            case 'ru':
            case 'ruru':
            case 'ru-ru':
            case 'ru_ru':
                return $locale_id == LOCALE_RU;
        }
        return false;
    }
    
    public static function GetLocaleIDForLocale($locale_str) {
        switch(strtolower($locale_str)) {
            case 'de':
            case 'dede':
            case 'de-de':
            case 'de_de';
                return LOCALE_DE;
            case 'en':
            case 'enen':
            case 'enus':
            case 'engb':
            case 'en-en':
            case 'en-us':
            case 'en-gb':
            case 'en_en':
            case 'en_us':
            case 'en_gb':
                return LOCALE_EN;
            case 'es':
            case 'eses':
            case 'es-es':
            case 'es_es':
                return LOCALE_ES;
            case 'fr':
            case 'frfr':
            case 'fr-fr':
            case 'fr_fr':
                return LOCALE_FR;
            case 'ru':
            case 'ruru':
            case 'ru-ru':
            case 'ru_ru':
                return LOCALE_RU;
        }
        return false;
    }
    
    private static function GetAppropriateLocaleNameForLocale($locale_str) {
        switch(strtolower($locale_str)) {
            case 'de':
            case 'dede':
            case 'de-de':
            case 'de_de';
                return 'de';
            case 'en':
            case 'enen':
            case 'enus':
            case 'engb':
            case 'en-en':
            case 'en-us':
            case 'en-gb':
            case 'en_en':
            case 'en_us':
            case 'en_gb':
                return 'en';
            case 'es':
            case 'eses':
            case 'es-es':
            case 'es_es':
                return 'es';
            case 'fr':
            case 'frfr':
            case 'fr-fr':
            case 'fr_fr':
                return 'fr';
            case 'ru':
            case 'ruru':
            case 'ru-ru':
            case 'ru_ru':
                return 'ru';
        }
    }
}
?>