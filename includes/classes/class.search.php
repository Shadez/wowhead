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

Class WoW_Search extends WoW_Abstract {
    private static $m_results = array();
    private static $m_query = '';
    
    public static function InitPage($page_type, $category) {
        if($page_type != 'search') {
            WoW_Log::WriteError('%s : wrong page type (%s)!', __METHOD__, $page_type);
            return false;
        }
        if(!isset($_GET['q'])) {
            WoW::RedirectTo();
        }
        if($_GET['q'] == null) {
            WoW::RedirectTo();
        }
        WoW_Template::SetPageData('search_query', $_GET['q']);
        self::$m_query = $_GET['q'];
        if(isset($_GET['opensearch'])) {
            echo '["ragnaros", ["Lil\' Ragnaros (Item)", "Ragnaros Core (Item)", "Spark of Ragnaros (Item)", "Sulfuras, Hand of Ragnaros (Item)", "Symbol of Ragnaros (Item)", "Ragnaros kills (Molten Core) (Achievement)", "Sulfuras, Hand of Ragnaros (Achievement)", "Sulfuras, Hand of Ragnaros - Guild Edition (Achievement)", "Dream of Ragnaros (Spell)", "Wrath of Ragnaros (Spell)"], [], [], [], [], [], [[3, 68385, "achievement_boss_ragnaros", 3], [3, 17982, "INV_Jewelry_Ring_25", 3], [3, 52332, "INV_Elemental_Primal_Fire", 1], [3, 17182, "INV_Hammer_Unique_Sulfuras", 5], [3, 10552, "INV_Jewelry_Talisman_04", 1], [10, 1099, "spell_fire_elemental_totem"], [10, 429, "inv_hammer_unique_sulfuras"], [10, 4997, "inv_hammer_unique_sulfuras"], [6, 75145, "INV_Chest_Cloth_57"], [6, 84402, "spell_fire_soulburn"]]]';
            die;
        }
        WoW_Template::SetPageData('disable_breadcrumb', true);
        WoW_Template::SetPageData('activeTab', 0);
        // Do search
        self::PerformSearch();
    }
    
    private static function PerformSearch() {
        self::PerformItemsSearch();
        self::PerformNPCsSearch();
        self::PerformObjectsSearch();
        self::PerformSkillsSearch();
        self::PerformSpellsSearch();
    }
    
    private static function PerformItemsSearch() {
        if(!isset(self::$m_results['items'])) {
            self::$m_results['items'] = array();
        }
        // Find item IDs
        $items = DB::World()->select("
        SELECT
        `a`.`entry`
        FROM `%s` AS `a`
        WHERE %s LIKE '%s' LIMIT 200",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'locales_item' : 'item_template',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`a`.`name_loc' . WoW_Locale::GetLocaleID() . '`' : '`a`.`name`',
            '%' . self::$m_query . '%'
        );
        if(!$items) {
            return;
        }
        $item_id = array();
        foreach($items as $item) {
            // Generate IDs array
            $item_id[] = $item['entry'];
        }
        // Request items
        self::$m_results['items'] = WoW_Items::GetExtendedItemInfo($item_id);
    }
    
    private static function PerformNPCsSearch() {
        
    }
    
    private static function PerformObjectsSearch() {
        
    }
    
    private static function PerformSpellsSearch() {
        
    }
    
    private static function PerformSkillsSearch() {
        
    }
    
    private static function PerformQuestsSearch() {
        
    }
    
    public static function GetResults($type = null) {
        if(!$type) {
            return self::$m_results;
        }
        return isset(self::$m_results[$type]) ? self::$m_results[$type] : false;
    }
}
?>