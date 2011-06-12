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

Class WoW_NPCs extends WoW_Abstract {
    private static $m_npc = array();
    private static $m_npcs = array();
    private static $m_npc_classification = 0;
    private static $m_npc_family = 0;
    
    public static function InitPage($page_type, $category) {
        if(!in_array($page_type, array('npcs', 'npc'))) {
            WoW_Log::WriteError('%s : wrong page type (%s)!', __METHOD__, $page_type);
            return false;
        }
        WoW_Template::SetPageData('breadcrumb', '0,4');
        switch($page_type) {
            case 'npcs':
                self::ExtractCategory($page_type, $category, self::$m_npc_classification, self::$m_npc_family);
                if(isset($_GET['filter'])) {
                    self::SetFilter($_GET['filter']);
                }
                self::LoadNPCs();
                self::HandleNPCs();
                break;
            case 'npc':
                self::$m_id = (int) $category;
                self::LoadNPC();
                self::HandleNPC();
                break;
        }
        return true;
    }
    
    private static function LoadNPCs() {
        self::$m_npcs = DB::World()->select("
        SELECT
        `a`.`entry`,
        `a`.`name`,
        `a`.`subname`,
        `a`.`minlevel`,
        `a`.`maxlevel`,
        `a`.`faction_A`,
        `a`.`faction_H`,
        `a`.`rank`,
        `a`.`family`,
        `a`.`type`,
        %s
        FROM `creature_template` AS `a`
        %s
        WHERE %s NOT LIKE '%s' AND %s NOT LIKE '%s'
        %s
        ORDER BY `a`.`rank` DESC
        LIMIT 200",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`d`.`name_loc%d` AS `name_loc`, `d`.`subname_loc%d` AS `subname`', WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID()) : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_creature` AS `d` ON `d`.`entry` = `a`.`entry`' : null,
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`d`.`name_loc' . WoW_Locale::GetLocaleID() . '`' : '`a`.`name`',
            '%(%',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`d`.`name_loc' . WoW_Locale::GetLocaleID() . '`' : '`a`.`name`',
            '%[%',
            self::$m_npc_classification > 0 ? 'AND `a`.`type` = ' . self::$m_npc_classification : null
            
        );
        self::$m_count = DB::World()->selectCell("SELECT COUNT(*) FROM `creature_template`"); //TODO: check additional filter fields
    }
    
    private static function LoadNPC() {
        self::$m_npc = DB::World()->selectRow("
        SELECT
        `a`.*,
        %s
        FROM `creature_template` AS `a`
        %s
        WHERE `a`.`entry` = %d",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`b`.`name_loc' . WoW_Locale::GetLocaleID() . '` AS `name_loc`, `b`.`subname_loc' . WoW_Locale::GetLocaleID() . '` AS `subname_loc`' : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_creature` AS `b` ON `b`.`entry` = `a`.`entry`' : null,
            self::GetID()
        );
    }
    
    private static function HandleNPCs() {
        if(!is_array(self::$m_npcs)) {
            return false;
        }
        $npcs = array();
        foreach(self::$m_npcs as $npc) {
            if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
                if(isset($npc['name_loc']) && $npc['name_loc'] != null) {
                    $npc['name'] = $npc['name_loc'];
                    unset($npc['name_loc']);
                }
                if(isset($npc['subname_loc']) && $npc['subname_loc'] != null) {
                    $npc['subname'] = $npc['subname_loc'];
                    unset($npc['subname_loc']);
                }
            }
            $npcs[] = $npc;
        }
        self::$m_npcs = $npcs;
        unset($npcs, $npc);
    }
    
    private static function HandleNPC() {
        if(!is_array(self::$m_npc)) {
            return false;
        }
        if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
            if(isset(self::$m_npc['name_loc']) && self::$m_npc['name_loc'] != null) {
                self::$m_npc['name'] = self::$m_npc['name_loc'];
                unset(self::$m_npc['name_loc']);
            }
            if(isset(self::$m_npc['subname_loc']) && self::$m_npc['subname_loc'] != null) {
                self::$m_npc['subname'] = self::$m_npc['subname_loc'];
                unset(self::$m_npc['subname_loc']);
            }
        }
        WoW_Template::SetPageData('db_page_title', self::$m_npc['name'] . ' - ');
        self::$m_npc['zone_info'] = WoW_Utils::GetNpcAreaInfo(self::$m_npc['entry']);
        
    }
    
    public static function GetNPCs() {
        return self::$m_npcs;
    }
    
    public static function GetNPC() {
        return self::$m_npc;
    }
}
?>