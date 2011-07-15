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

Class WoW_Abstract {
    protected static $m_id = 0;
    protected static $m_filter = array();
    protected static $m_count = 0;
    protected static $m_pageType = '';
	protected static $m_categoryInfo = array();
    
    public static function GetCount() {
        return self::$m_count;
    }
    
    protected static function ExtractCategory($page_type, $category, &$type, &$class_category) {
        if(strpos($category, '.')) {
            $cat_data = explode('.', $category);
            if(!$cat_data || !is_array($cat_data)) {
                return false;
            }
        }
        else {
            $cat_data = array($category);
        }
        self::$m_pageType = $page_type;
        // Max subcats count: 3 - type.cat1.cat2
        $type = (isset($cat_data[0]) && $cat_data[0] !== false) ? $cat_data[0] : false;
		self::$m_categoryInfo[0] = $type;
        $breadcrumb = '0,' . self::GetCatIdForPage($page_type);
        // Find category
        for($i = 0; $i < 3; ++$i) {
            if(isset($cat_data[$i]) && $cat_data[$i] >= 0) {
                $breadcrumb .= ',' . $cat_data[$i];
                $class_category = $i >= 0 ? $cat_data[$i] : false;
            }
        }
		self::$m_categoryInfo[1] = $class_category;
        WoW_Template::SetPageData('breadcrumb', $breadcrumb);
        return true;
    }
    
    private static function GetCatIdForPage($type) {
        switch($type) {
            case 'achievements':
            case 'achievement':
                return 9;
            case 'items':
            case 'item':
                return 0;
            case 'npcs':
            case 'npc':
                return 4;
        }
    }
    
    public static function SetFilter($filter) {
        self::$m_filter = $filter;
    }
    
    public static function GetFilter() {
        return self::$m_filter;
    }
    
    public static function GetID() {
        return self::$m_id;
    }
	
	public static function GetCategory($index = 0) {
		if ($index < 0 || $index > 1) {
			return false;
		}
		return self::$m_categoryInfo[$index];
	}
    
    protected static function IsPower() {
        return strpos(WoW::GetRawPageAction(), '&power');
    }
    
    protected static function SetPowerLocale() {
        if(strpos(WoW::GetRawPageAction(), '&pl')) {
            $data = explode('&', WoW::GetRawPageAction());
            foreach($data as $it) {
                $tmp = explode('=', $it);
                if($tmp[0] == 'pl') {
					if (!$tmp[1] || !WoW_Locale::IsLocale($tmp[1], WoW_Locale::GetLocaleIDForLocale($tmp[1]))) {
						$tmp[1] = 'enus';
					}
                    WoW_Locale::SetLocale($tmp[1], WoW_Locale::GetLocaleIDForLocale($tmp[1]), true);
                }
            }
        }
    }
    
    protected static function ApplyMultiFiltersToString(&$val_count, &$filter, &$filter_string) {
        for($i = 0; $i < $val_count; ++$i) {
            $filter_string .= $filter['values'][$i];
            if($i < ($val_count-1)) {
                if(isset($filter['values'][$i + 1]) && $filter['values'][$i + 1] != null) {
                    $filter_string .= ', ';
                }
            }
        }
        $filter_string .= ')';
    }
}
?>