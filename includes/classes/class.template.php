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

Class WoW_Template {
    private static $is_initialized = false;
    private static $page_index = null;
    private static $page_data = array();
    private static $main_menu = array();
    private static $menu_index = null;
    private static $template_theme = null;
    
    public static function InitTemplate() {
        
    }
    
    public static function SetTemplateTheme($theme) {
        self::$template_theme = $theme;
    }
    
    public static function GetTemplateTheme() {
        return self::$template_theme != null ? self::$template_theme : 'overall';
    }
    
    public static function LoadTemplate($template_name, $overall = false) {
        if($overall) {
            $template = WOW_DIRECTORY . '/includes/templates/overall/overall_' . $template_name . '.php';
        }
        else {
            $template = WOW_DIRECTORY . '/includes/templates/' . self::GetTemplateTheme() . '/' . self::GetTemplateTheme() . '_' . $template_name . '.php';
        }
        if(file_exists($template)) {
            include($template);
        }
        else {
            WoW_Log::WriteError('%s : unable to find template "%s" (template theme: %s, overall: %d, path: %s)!', __METHOD__, $template_name, self::GetTemplateTheme(), (int) $overall, str_replace('/', '\\', $template));
        }
    }
    
    public static function GetMenuIndex() {
        return self::$menu_index;
    }
    
    public static function SetMenuIndex($index) {
        self::$menu_index = $index;
    }
    
    public static function GetCSSForPage() {
        $css_data_page =array();
        $css_data = array(
            array(
                'path' => '/css/locale_' . WoW_Locale::GetLocale(LOCALE_SPLIT) . '.css',
                'version' => WOW_REVISION,
                'browser' => false,
                'media' => 'all'
            ),
            array(
                'path' => '/css/basic.css',
                'version' => WOW_REVISION,
                'browser' => false,
                'media' => 'all'
            ),
            array(
                'path' => '/css/global.css',
                'version' => WOW_REVISION,
                'browser' => false,
                'media' => 'all'
            ),
            array(
                'path' => '/css/wowhead.css',
                'version' => WOW_REVISION,
                'browser' => false,
                'media' => 'all'
            )
        );
        switch(self::GetPageIndex()) {
            case 'home':
                $css_data_page = array(
                    array(
                        'path' => '/css/home.css',
                        'version' => WOW_REVISION,
                        'browser' => false,
                        'media' => 'all'
                    )
                );
                break;
            case 'error':
                $css_data_page = array(
                    array(
                        'path' => '/css/forums.css',
                        'version' => WOW_REVISION,
                        'browser' => false,
                        'media' => 'all'
                    ),
                    array(
                        'path' => '/css/article.css',
                        'version' => WOW_REVISION,
                        'browser' => false,
                        'media' => 'all'
                    )
                );
                break;
            case 'achievements':
                break;
            default:
                $css_data_page = array(
                    array(
                        'path' => '/css/Book.css',
                        'version' => WOW_REVISION,
                        'browser' => false,
                        'media' => 'all'
                    )
                );
                break;
        }
        $cssList = array_merge($css_data, $css_data_page);
        $css_data_result = '';
        foreach($cssList as $sheet) {
            $css_data_result .= self::PrintCSS($sheet['path'], $sheet['version'], $sheet['browser']);
        }
        return $css_data_result;
    }
    
    private static function PrintCSS($path, $version = 0, $browser = false, $media = false) {
        if(!$browser) {
            return sprintf("<link rel=\"stylesheet\" type=\"text/css\" media=\"%s\" href=\"%s%s?%d\" />\n", $media ? $media : 'all', WoW::GetStaticUrl(), $path, $version);
        }
        else {
            return sprintf("<!--[if %s]><link rel=\"stylesheet\" type=\"text/css\" media=\"%s\" href=\"%s%s?%d\" /><![endif]-->\n", $browser, $media ? $media : 'all', WoW::GetStaticUrl(), $path, $version);
        }
    }
    
    public static function GetJSForPage() {
        $js_data = array(
            array(
                'path' => '/js/locale_' . WoW_Locale::GetLocale(LOCALE_SPLIT) . '.js',
                'version' => WOW_REVISION
            ),
            array(
                'path' => '/js/basic.js',
                'version' => WOW_REVISION
            ),
            array(
                'path' => '/widgets/power.js',
                'version' => WOW_REVISION
            ),
            array(
                'path' => '/js/global.js',
                'version' => WOW_REVISION
            )
        );
        $js_data_page = array();
        switch(self::GetPageIndex()) {
            case 'home':
                $js_data_page = array(
                    array(
                        'path' => '/js/home.js',
                        'version' => WOW_REVISION
                    )
                );
                break;
            case 'error':
                break;
            case 'achievements':
                $js_data_page = array(
                    array(
                        'path' => '/js/filters.js',
                        'version' => WOW_REVISION
                    )
                );
                break;
            default:
                $js_data_page = array(
                    array(
                        'path' => '/js/Book.js',
                        'version' => WOW_REVISION
                    ),
                    array(
                        'path' => '/js/filters.js',
                        'version' => WOW_REVISION
                    ),
                    array(
                        'path' => '/js/profile.js',
                        'version' => WOW_REVISION
                    ),
                );
                break;
        }
        $jsList = array_merge($js_data, $js_data_page);
        $js_data_result = '';
        foreach($jsList as $js) {
            $js_data_result .= self::PrintJS($js['path'], $js['version']);
        }
        return $js_data_result;
    }
    
    private static function PrintJS($path, $version = 0) {
        return sprintf("<script type=\"text/javascript\" src=\"%s%s?%d\"></script>\n", WoW::GetStaticUrl(), $path, $version);
    }
    
    public static function GetPageIndex() {
        return self::$page_index;
    }
    
    public static function SetPageIndex($index) {
        self::$page_index = $index;
    }
    
    public static function GetPageData($index) {
        return (isset(self::$page_data[$index])) ? self::$page_data[$index] : null;
    }
    
    public static function SetPageData($index, $data) {
        self::$page_data[$index] = $data;
    }
    
    public static function AddToPageData($index, $data) {
        if(!isset(self::$page_data[$index])) {
            return true;
        }
        self::$page_data[$index] .= $data;
    }
    
    public static function GetPageTitle($onlyPage = false) {
        switch(self::GetPageIndex()) {
            case 'home':
                return sprintf('%s: %s', WoWConfig::$SiteTitle, self::GetRandomTitle());
            case 'error':
                return sprintf('%s%s', WoW_Locale::GetString('template_404_title'), $onlyPage ? null : sprintf(' - %s', WoWConfig::$SiteTitle));
            case 'achievements':
                return sprintf('%s%s', WoW_Locale::GetString('template_achievements_title'), $onlyPage ? null : ' - World of Warcraft');
            case 'achievement':
               return sprintf('%s%s', WoW_Locale::GetString('template_achievement_title'), $onlyPage ? null : ' - World of Warcraft');
            case 'items':
                return sprintf('%s%s', WoW_Locale::GetString('template_items_title'), $onlyPage ? null : ' - World of Warcraft');
            case 'item':
                return sprintf('%s - %s%s', WoW_Template::GetPageData('item_name'), WoW_Locale::GetString('template_item_title'), $onlyPage ? null : ' - World of Warcraft');
            case 'quests':
                return sprintf('%s%s', WoW_Locale::GetString('template_quests_title'), $onlyPage ? null : ' - World of Warcraft');
            case 'quest':
                return sprintf('%s - %s%s', WoW_Template::GetPageData('quest_name'), WoW_Locale::GetString('template_quest_title'), $onlyPage ? null : ' - World of Warcraft');
            
            default:
                return sprintf('%s: %s', WoWConfig::$SiteTitle, self::GetRandomTitle());
        }
    }
    
    public static function GetTemplateHeader() {
        
    }
    
    private static function GetRandomTitle() {
        $title = DB::World()->selectRow("SELECT `title_en` AS `originalTitle`%s FROM `DBPREFIX_titles` ORDER BY RAND() LIMIT 1", WoW_Locale::GetLocaleID() == LOCALE_EN ? null : sprintf(', `title_%s` AS `localizedTitle`', WoW_Locale::GetLocale()));
        if(!$title) {
            return false;
        }
        if(isset($title['localizedTitle']) && $title['localizedTitle'] != '') {
            return $title['localizedTitle'];
        }
        return $title['originalTitle'];
    }
    
    public static function GetSelectForm($params) {
        $html = '<select';
        foreach($params['form'] as $fItem => $fValue) {
            $html .= sprintf(' %s="%s"', $fItem, $fValue);
        }
        $html .= '>';
        $filter_value = WoW::GetFilterValueByKey($params['filter']['filter_key']);
        foreach($params['options']['data'] as $option) {
            if($option === '{SKIP}') {
                $html .= '<option></option>';
                continue;
            }
            $selectedOption = false;
            // Check current filter
            if(is_array($filter_value) && in_array($option, $filter_value)) {
                $selectedOption = true;
            }
            $html .= sprintf('<option value="%d"%s%s>%s</option>', $option, isset($params['options']['class']) ? sprintf(' class="%s"', sprintf($params['options']['class'], $option)) : null, $selectedOption ? ' selected="selected"' : null, WoW_Locale::GetString(sprintf($params['locale']['string_key'], $option)));
        }
        $html .= '</select>';
        return $html;
    }
}
?>