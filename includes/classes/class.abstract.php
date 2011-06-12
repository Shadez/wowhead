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
        // Max subcats count: 3 - type.cat1.cat2
        $type = (isset($cat_data[0]) && $cat_data[0] !== false) ? $cat_data[0] : -1;
        $breadcrumb = '0,' . self::GetCatIdForPage($page_type);
        // Find category
        for($i = 0; $i < 3; ++$i) {
            if(isset($cat_data[$i]) && $cat_data[$i] > 0) {
                $breadcrumb .= ',' . $cat_data[$i];
                $class_category = $i > 0 ? $cat_data[$i] : -1;
            }
        }
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
}

?>