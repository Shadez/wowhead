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
    
    private static function GetFilterForNPCs() {
        $filter_string = null;
        $andOr = 1;
        $all_filters = WoW::GetFilters();
        if(is_array($all_filters)) {
            foreach($all_filters as $filter) {
                if(!isset($filter['key']) || !isset($filter['values'])) {
                    continue;
                }
                $val_count = count($filter['values']);
                switch($filter['key']) {
                    // Family
                    case 'fa': 
                        if($val_count == 1) {
                            $filter_string .= '{COND} `a`.`family` = ' . $filter['values'][0];
                        }
                        else {
                            $filter_string .= '{COND} `a`.`family` IN (';
                            self::ApplyMultiFiltersToString($val_count, $filter,  $filter_string);
                        }
                        break;
                }
            }
        }
        return str_replace('{COND}', $andOr == 2 ? 'OR' : 'AND', $filter_string);
    }
    
    private static function LoadNPCs() {
        $filter = self::GetFilterForNPCs();
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
        WHERE (
            %s NOT LIKE '%s' AND %s NOT LIKE '%s'
            %s
        )
        %s
        ORDER BY `a`.`rank` DESC
        LIMIT 200",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`d`.`name_loc%d` AS `name_loc`, `d`.`subname_loc%d` AS `subname`', WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID()) : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_creature` AS `d` ON `d`.`entry` = `a`.`entry`' : null,
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`d`.`name_loc' . WoW_Locale::GetLocaleID() . '`' : '`a`.`name`',
            '%(%',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`d`.`name_loc' . WoW_Locale::GetLocaleID() . '`' : '`a`.`name`',
            '%[%',
            self::$m_npc_classification > 0 ? 'AND `a`.`type` = ' . self::$m_npc_classification : null,
            $filter != null ? $filter : null
            
        );
        if(!self::$m_npcs) {
            //WoW_Template::ErrorPage(404, 'npcs');
            //return false;
        }
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
        if(!self::$m_npc) {
            WoW_Template::ErrorPage(404, 'npc');
        }
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
        if(is_array(self::$m_npc['zone_info'])) {
            $zone = &self::$m_npc['zone_info'];
            if(WoW_Locale::GetLocaleID() != LOCALE_EN && $zone['zoneName_loc'] != null) {
                $zone['zoneName'] = $zone['zoneName_loc'];
            }
            unset($zone['zoneName_loc']);
        }
        else {
            unset(self::$m_npc['zone_info']);
        }
        if(self::$m_npc['minlevel'] == self::$m_npc['maxlevel']) {
            if(self::$m_npc['minlevel'] == (MAX_PLAYER_LEVEL + 3)) {
                self::$m_npc['level'] = '??';
            }
            else {
                self::$m_npc['level'] = self::$m_npc['minlevel'];
            }
        }
        else {
            self::$m_npc['level'] = self::$m_npc['maxlevel'];
        }
        if(self::$m_npc['minhealth'] == self::$m_npc['maxhealth']) {
            self::$m_npc['health'] = number_format(self::$m_npc['minhealth']);
        }
        else {
            self::$m_npc['health'] = number_format(self::$m_npc['minhealth']) . ' - ' . number_format(self::$m_npc['maxhealth']);
        }
        self::$m_npc['money'] = 0;
        if(self::$m_npc['mingold'] > 0 || self::$m_npc['maxgold'] > 0) {
            self::$m_npc['money'] = max(self::$m_npc['mingold'], self::$m_npc['maxgold']);
        }
        // Loot
        self::$m_npc['loot'] = self::GetNpcLoot(self::$m_npc['entry']);
        // Spells
        self::$m_npc['spells'] = self::GetNpcSpells(self::$m_npc['entry']);
        // Achievements
        self::$m_npc['achievements'] = self::GetNpcAchievements(self::$m_npc['entry']);
        // Same model as
        $model_id = array();
        for($i = 1; $i < 5; ++$i) {
            if(self::$m_npc['modelid_' . $i] > 0) {
                $model_id[] = self::$m_npc['modelid_' . $i];
            }
        }
        self::$m_npc['npcs'] = self::GetNpcSameModel($model_id, self::$m_npc['entry']);
    }
    
    public static function GetNPCs() {
        return self::$m_npcs;
    }
    
    public static function GetNPC() {
        return self::$m_npc;
    }
    
    public static function GetNpcSameModel($modelId, $entry) {
        $creatures = DB::World()->select("
        SELECT
        `a`.`entry`,
        `a`.`name`,
        `a`.`minlevel`,
        `a`.`maxlevel`,
        `a`.`rank`,
        `a`.`type`,
        %s
        FROM `creature_template` AS `a`
        %s
        WHERE
        (`a`.`modelid_1` IN (%s) OR `a`.`modelid_2` IN (%s) OR `a`.`modelid_3` IN (%s) OR `a`.`modelid_4` IN (%s))
        AND
        `a`.`entry` NOT IN (%s)
        LIMIT 200",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`b`.`name_loc' . WoW_Locale::GetLocaleID() . '` AS `name_loc`' : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_creature` AS `b` ON `b`.`entry` = `a`.`entry`' : null,
            $modelId, $modelId, $modelId, $modelId,
            $entry
        );
        if(!$creatures) {
            return false;
        }
        foreach($creatures as &$cr) {
            if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
                if($cr['name_loc'] != null) {
                    $cr['name'] = $cr['name_loc'];
                }
            }
            $cr['zone_info'] = WoW_Utils::GetNpcAreaInfo($cr['entry']);
        }
        return $creatures;
    }
    
    public static function GetNpcAchievements($entry) {
        return DB::World()->select("
        SELECT
        `a`.`referredAchievement`,
        `b`.`id`,
        `b`.`name_%s` AS `name`,
        `b`.`desc_%s` AS `desc`,
        `b`.`factionFlag` AS `side`,
        `b`.`categoryId` AS `category`,
        `b`.`points`,
        `c`.`icon`,
        `d`.`parentCategory`
        FROM `DBPREFIX_achievement_criteria` AS `a`
        LEFT JOIN `DBPREFIX_achievement` AS `b` ON `b`.`id` = `a`.`referredAchievement`
        LEFT JOIN `DBPREFIX_spell_icon` AS `c` ON `c`.`id` = `b`.`iconID`
        LEFT JOIN `DBPREFIX_achievement_category` AS `d` ON `d`.`id` = `b`.`categoryId`
        WHERE `a`.`requiredType` = 0 AND `a`.`data` IN (%s) AND `a`.`value` > 0
        LIMIT 200",
            WoW_Locale::GetLocale(),
            WoW_Locale::GetLocale(),
            $entry
        );
    }
    
    public static function GetNpcSpells($entry) {
        $cr_spells = DB::World()->select("SELECT `spell1`, `spell2`, `spell3`, `spell4` FROM `creature_template` WHERE `entry` IN (%s)", $entry);
        if(!$cr_spells) {
            return false;
        }
        $spell_id = array();
        foreach($cr_spells as $spell) {
            for($i = 1; $i < 5; ++$i) {
                if($spell['spell' . $i] > 0) {
                    $spell_id[] = $spell['spell' . $i];
                }
            }
        }
        if(count($spell_id) == 0) {
            return false;
        }
        $spells = DB::World()->select("
        SELECT
        `a`.`id`,
        `a`.`SpellName_en` AS `name`,
        `a`.`SpellName_%s` AS `name_locale`,
        `a`.`Rank_1` AS `rank`,
        `a`.`Rank_%s` AS `rank_locale`,
        `a`.`spellLevel` AS `level`,
        `a`.`SchoolMask`,
        `b`.`icon`
        FROM `DBPREFIX_spell` AS `a`
        LEFT JOIN `DBPREFIX_spell_icon` AS `b` ON `b`.`id` = `a`.`SpellIconID`
        WHERE `a`.`id` IN (%s)
        LIMIT 200
        ",
            WoW_Locale::GetLocale(),
            WoW_Locale::GetLocale(),
            $spell_id
        );
        if(!$spells) {
            return false;
        }
        $schools = array(
            'NORMAL', 'HOLY', 'FIRE', 'NATURE', 'FROST', 'SHADOW', 'ARCANE'
        );
        foreach($spells as &$spell) {
            if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
                if($spell['name_locale'] != null) {
                    $spell['name'] = $spell['name_locale'];
                }
                if($spell['rank_locale'] != null) {
                    $spell['rank'] = $spell['rank_locale'];
                }
            }
            unset($spell['name_locale'], $spell['rank_locale']);
            $spell['school'] = 0;
            foreach($schools as $school) {
                if($spell['SchoolMask'] & constant('SPELL_SCHOOL_MASK_' . $school)) {
                    $spell['school'] = constant('SPELL_SCHOOL_' . $school);
                }
            }
        }
        return $spells;
    }
    
    public static function GetNpcLoot($entry) {
        $loot = DB::World()->select("
        SELECT
        `a`.`item`,
        `b`.`entry`,
        `b`.`name`,
        `b`.`class`,
        `b`.`subclass`,
        `b`.`displayid`,
        `b`.`Quality` AS `quality`,
        `b`.`ItemLevel`,
        `b`.`RequiredLevel` AS `reqLevel`,
        `b`.`InventoryType`,
        `b`.`Flags`,
        `b`.`armor`,
        `c`.`icon`,
        %s
        FROM `creature_loot_template` AS `a`
        LEFT JOIN `item_template` AS `b` ON `b`.`entry` = `a`.`item`
        LEFT JOIN `DBPREFIX_icons` AS `c` ON `c`.`displayid` = `b`.`displayid`
        %s
        WHERE `a`.`entry` IN (%s)
        LIMIT 200",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`x`.`name_loc' . WoW_Locale::GetLocaleID() . '` AS `name_loc`' : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_item` AS `x` ON `x`.`entry` = `a`.`item`' : null,
            $entry
        );
        if(!$loot) {
            return false;
        }
        if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
            foreach($loot as &$item) {
                if(isset($item['name_loc']) && $item['name_loc'] != null) {
                    $item['name'] = $item['name_loc'];
                    unset($item['name_loc']);
                }
            }
        }
        return $loot;
    }
    
    public static function GetNPCInfo($entry, $type) {
        if(!DB::World()->selectCell("SELECT 1 FROM creature_template WHERE entry = %d", $entry)) {
            return false;
        }
        switch($type) {
            case 'name':
                if(WoW_Locale::GetLocaleID() == LOCALE_EN) {
                    return DB::World()->selectCell("SELECT name FROM creature_template WHERE entry = %d", $entry);
                }
                $data = DB::World()->selectRow("
                SELECT
                a.name,
                b.name_loc%d AS name_loc
                FROM creature_template AS a
                LEFT JOIN locales_creature AS b ON b.entry = a.entry
                WHERE a.entry = %d", WoW_Locale::GetLocaleID(), $entry);
                if(!$data) {
                    return DB::World()->selectCell("SELECT name FROM creature_template WHERE entry = %d", $entry);
                }
                if($data['name_loc'] != null) {
                    return $data['name_loc'];
                }
                return $data['name'];
                break;
        }
    }
}
?>