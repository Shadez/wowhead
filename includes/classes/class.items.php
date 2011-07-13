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

Class WoW_Items extends WoW_Abstract {
    private static $m_items = array();
    private static $m_item = array();
    private static $m_items_class = -1;
    private static $m_items_subclass = -1;
    private static $m_item_source = array();
    
    public static function InitPage($page_type, $category) {
        if(!in_array($page_type, array('items', 'item'))) {
            WoW_Log::WriteError('%s : wrong page type (%s)!', __METHOD__, $page_type);
            return false;
        }
        WoW_Template::SetPageData('breadcrumb', '0,0');
        switch($page_type) {
            case 'items':
                self::ExtractCategory($page_type, $category, self::$m_items_class, self::$m_items_subclass);
                if(isset($_GET['filter'])) {
                    self::SetFilter($_GET['filter']);
                }
                self::LoadItems();
                self::HandleItems();
                break;
            case 'item':
                self::$m_id = (int) $category;
                self::$m_pageType = 'item';
                if(self::IsPower()) {
                    self::GetPower(); // Do not load item here
                }
                self::LoadItem();
                self::HandleItem();
                break;
        }
        return true;
    }
    
    private static function GetFiltersForItems() {
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
                    // Name
                    case 'na':
                        if(WoW_Locale::GetLocaleID() > 0) {
                            $filter_string .= sprintf(" {COND} ((`b`.`name_loc%d` LIKE '%s') OR (`a`.`name` LIKE '%s'))", WoW_Locale::GetLocaleID(), '%' . $filter['values'][0] . '%', '%' . $filter['values'][0] . '%');
                        }
                        else {
                            $filter_string .= sprintf("' {COND} `a`.`name` LIKE '%s'", '%' . $filter['values'][0] . '%');
                        }
                        break;
                    // Quality
                    case 'qu':
                        if($val_count == 1) {
                            $filter_string .= sprintf(' {COND} `a`.`Quality` = %d', $filter['values'][0]);
                        }
                        else {
                            $filter_string .= ' {COND} `a`.`Quality` IN ( ';
                            self::ApplyMultiFiltersToString($val_count, $filter, $filter_string);
                        }
                        break;
                    // Min item level
                    case 'minle':
                        $filter_string .= sprintf(' {COND} `a`.`ItemLevel` >= %d', $filter['values'][0]);
                        break;
                    // Max item level
                    case 'maxle':
                        $filter_string .= sprintf(' {COND} `a`.`ItemLevel` <= %d', $filter['values'][0]);
                        break;
                    // At least one?
                    case 'ma':
                        if($filter['values'][0] == 1) {
                            $andOr = 2;
                        }
                        break;
                    // Min req level
                    case 'minrl':
                        $filter_string .= sprintf(' {COND} `a`.`RequiredLevel` >= %d', $filter['values'][0]);
                        break;
                    // Max req level
                    case 'maxrl':
                        $filter_string .= sprintf(' {COND} `a`.`RequiredLevel` <= %d', $filter['values'][0]);
                        break;
                    // Slot
                    case 'sl':
                        if($val_count == 1) {
                            $filter_string .= sprintf(' {COND} `a`.`InventoryType` = %d', $filter['values'][0]);
                            WoW_Template::SetPageData('breadcrumb', WoW_Template::GetPageData('breadcrumb') . ',' . $filter['values'][0]);
                        }
                        else {
                            $filter_string .= ' {COND} `a`.`InventoryType` IN( ';
                            self::ApplyMultiFiltersToString($val_count, $filter, $filter_string);
                        }
                        break;
                    // Side
                    case 'si':
                        switch($filter['values'][0]) {
                            case -1:
                                // Alliance only
                                $filter_string .= ' {COND} `a`.`AllowableRace` = ' . WoW_Utils::GetFactionBitMaskByFactionId(FACTION_ALLIANCE);
                                break;
                            case 1:
                                // Alliance
                                $filter_string .= ' {COND} `a`.`AllowableRace` & ' . WoW_Utils::GetFactionBitMaskByFactionId(FACTION_ALLIANCE);
                                break;
                            case -2:
                                // Horde only
                                $filter_string .= ' {COND} `a`.`AllowableRace` = ' . WoW_Utils::GetFactionBitMaskByFactionId(FACTION_HORDE);
                                break;
                            case 2:
                                // Horde
                                $filter_string .= ' {COND} `a`.`AllowableRace` & ' . WoW_Utils::GetFactionBitMaskByFactionId(FACTION_HORDE);
                                break;
                            default:
                                // Skip "3" - useable by all
                                break;
                        }
                        break;
                    // Useable by class ID
                    case 'ub':
                        if(!($filter['values'][0] < CLASS_WARRIOR) && !($filter['values'][0] >= MAX_CLASSES)) {
                            $filter_string .= ' {COND} `a`.`AllowableClass` & ' . WoW_Utils::GetClassBitMaskByClassId($filter['values'][0]);
                        }
                        break;
                }
            }
        }
        if(self::$m_items_class >= 0) {
            $filter_string .= sprintf(' {COND} `a`.`class` = %d', self::$m_items_class);
        }
        if(self::$m_items_subclass >= 0) {
            $filter_string .= sprintf(' {COND} `a`.`subclass` = %d', self::$m_items_subclass);
        }
        $filter_string = str_replace('{COND}', $andOr == 2 ? 'OR' : 'AND', $filter_string);
        $filter_string = substr($filter_string, 5);
        return $filter_string;
    }
    
    private static function LoadItems() {
        $filter = self::GetFiltersForItems();
        self::$m_items = DB::World()->select("
        SELECT
        `a`.`entry`,
        `a`.`class`,
        `a`.`subclass`,
        `a`.`name`,
        `a`.`displayid`,
        `a`.`Quality` AS `quality`,
        `a`.`Flags`,
        `a`.`%s` AS `FlagsExtra`,
        `a`.`BuyPrice`,
        `a`.`SellPrice`,
        `a`.`InventoryType`,
        `a`.`AllowableClass`,
        `a`.`AllowableRace`,
        `a`.`ItemLevel`,
        `a`.`RequiredLevel`,
        `a`.`dmg_type1`,
        `a`.`dmg_min1`,
        `a`.`dmg_max1`,
        `a`.`dmg_type2`,
        `a`.`dmg_min2`,
        `a`.`dmg_max2`,
        `a`.`armor`,
        `a`.`bonding`,
        `a`.`Delay`,
        `a`.`socketColor_1`,
        `a`.`socketColor_2`,
        `a`.`socketColor_3`,
        `a`.`socketBonus`,
        %s
        `c`.`icon`
        FROM `item_template` AS `a`
        LEFT JOIN `locales_item` AS `b` ON `b`.`entry` = `a`.`entry`
        LEFT JOIN `DBPREFIX_icons` AS `c` ON `c`.`displayid` = `a`.`displayid`
        %s
        ORDER BY `ItemLevel` DESC
        LIMIT 200", 'Flags2',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`b`.`name_loc%d` AS `name_loc`,', WoW_Locale::GetLocaleID()) : null,
            $filter != null ? 'WHERE ' . $filter : null
        );
        if(!self::$m_items) {
            WoW_Template::ErrorPage(404, 'items');
        }
    }
    
    private static function LoadItem() {
        self::$m_item = new WoW_ItemPrototype();
        self::$m_item->LoadItem(self::GetID());
        if(!self::$m_item->entry || self::$m_item->entry == 0) {
            WoW_Template::ErrorPage(404, 'item');
            return false;
        }
        self::HandleItem();
    }
    
    private static function HandleItems() {
        if(!is_array(self::$m_items)) {
            return false;
        }
        $items = array();
        foreach(self::$m_items as $item) {
            $item_temp = array(
                'entry' => $item['entry'],
                'icon' => $item['icon'],
                'quality' => $item['quality'],
                'name' => (isset($item['name_loc']) && $item['name_loc'] != null) ? $item['name_loc'] : $item['name'],
                'js_data' => array(
                    array(
                        'key' => 'name',
                        'data' => (isset($item['name_loc']) && $item['name_loc'] != null) ? '"' . (7 - $item['quality']) . str_replace('"', '\"', $item['name_loc']) . '"' : '"' . (7 - $item['quality']) . str_replace('"', '\"', $item['name']) . '"'
                    ),
                    array(
                        'key' => 'class',
                        'data' => $item['class']
                    ),
                    array(
                        'key' => 'displayid',
                        'data' => $item['displayid']
                    ),
                    array(
                        'key' => 'id',
                        'data' => $item['entry']
                    ),
                    array(
                        'key' => 'reqlevel',
                        'data' => $item['RequiredLevel']
                    ),
                    array(
                        'key' => 'subclass',
                        'data' => $item['subclass']
                    ),
                    array(
                        'key' => 'level',
                        'data' => $item['ItemLevel']
                    ),
                    array(
                        'key' => 'quality',
                        'data' => $item['quality']
                    ),
                    array(
                        'key' => 'firstseenpatch',
                        'data' => 0
                    )
                )
            );
            
            // Fill js_data with extra fields
            if($item['class'] == ITEM_CLASS_ARMOR) {
                $item_temp['js_data'][] = array(
                    'key' => 'armor',
                    'data' => $item['armor']
                );
                $item_temp['js_data'][] = array(
                    'key' => 'slot',
                    'data' => $item['InventoryType']
                );
                $item_temp['js_data'][] = array(
                    'key' => 'slotbak',
                    'data' => $item['InventoryType']
                );
                
            }
            if($item['class'] == ITEM_CLASS_WEAPON) {
                $item_temp['js_data'][] = array(
                    'key' => 'speed',
                    'data' => $item['Delay']
                );
                $item_temp['js_data'][] = array(
                    'key' => 'dps',
                    'data' => self::CalculateDPS($item)
                );
                $item_temp['js_data'][] = array(
                    'key' => 'speed',
                    'data' => $item['Delay'] / 1000
                );
                $item_temp['js_data'][] = array(
                    'key' => 'slot',
                    'data' => $item['InventoryType']
                );
                $item_temp['js_data'][] = array(
                    'key' => 'slotbak',
                    'data' => $item['InventoryType']
                );
            }
            if($item['BuyPrice'] > 0) {
                $item_temp['js_data'][] = array(
                    'key' => 'cost',
                    'data' => sprintf('[%d]', $item['BuyPrice'])
                );
            }
            if($item['SellPrice'] > 0) {
                $item_temp['js_data'][] = array(
                    'key' => 'sellprice',
                    'data' => sprintf('[%d]', $item['SellPrice'])
                );
            }
            if($item['Flags'] & ITEM_FLAGS_HEROIC) {
                $item_temp['js_data'][] = array(
                    'key' => 'heroic',
                    'data' => 1
                );
            }
            $items[] = $item_temp;
        }
        self::$m_items = $items;
        unset($items, $item_temp, $item);
    }
    
    private static function HandleItem() {
        self::GenerateItemTooltip();
    }
    
    private static function GetPower() {
        self::SetPowerLocale();
        self::LoadItem();
        self::GenerateItemTooltip();
        header('Content-type: text/javascript');
        echo sprintf("\$WowheadPower.registerItem('%d', 0, {\n\tname_enus: '%s',\n\tquality: %d,\n\ticon: '%s',\n\ttooltip_enus: '%s'\n});", self::$m_item->entry, self::$m_item->GetName(), self::$m_item->Quality, self::$m_item->icon, self::$m_item->tooltip);
        exit;
    }
    
    private static function GenerateItemTooltip() {
        $proto = self::GetItem();
        if(!$proto || $proto->entry == 0) {
            return false;
        }
        $tooltip_buffer = '';
        // Load SSD & SSV
        $ssd = DB::World()->selectRow("SELECT * FROM `DBPREFIX_ssd` WHERE `entry` = %d LIMIT 1", $proto->ScalingStatDistribution);
        $ssd_level = MAX_PLAYER_LEVEL;
        $ssv = DB::World()->selectRow("SELECT * FROM `DBPREFIX_ssv` WHERE `level` = %d LIMIT 1", $ssd_level);
        // Begin
        $tooltip_buffer .= '<table><tr><td>';
        $tooltip_buffer .= sprintf('<b class="q%d">%s</b><br />', $proto->Quality, $proto->GetName());
        // Heroic
        if($proto->Flags & ITEM_FLAGS_HEROIC) {
            $tooltip_buffer .= sprintf('<span class="q2">%s</span><br />', WoW_Locale::GetString('template_item_heroic'));
        }
        // Bonding
        if($proto->bonding > 0) {
            $tooltip_buffer .= sprintf('<!--bo-->%s<br />', WoW_Locale::GetString('template_item_bonding_' . $proto->bonding));
        }
        if($proto->maxcount == 1) {
            $tooltip_buffer .= sprintf('%s<br />', WoW_Locale::GetString('template_item_unique'));
        }
        // Subclass name & Inventory type
        if($proto->IsCanBeEquipped()) {
            if(!in_array($proto->subclass, array(ITEM_SUBCLASS_ARMOR_MISC))) {
                $subclass_str = $proto->subclass_name;
            }
            else {
                $subclass_str = '';
            }
            $tooltip_buffer .= sprintf('<table width="100%%"><tr><td>%s</td><th>%s</th></tr></table><!--rf-->', $proto->InventoryType_name, $subclass_str);
        }
        // Armor
        $armor = $proto->armor;
        if($ssv && $proto->ScalingStatValue > 0) {
            if($ssvarmor = self::GetArmorMod($ssv, $proto->ScalingStatValue)) {
                $armor = $ssvarmor;
            }
        }
        if($armor > 0) {
            $tooltip_buffer .= sprintf('<span>%s</span><br />', sprintf(WoW_Locale::GetString('template_item_armor'), $armor));
        }
        // Block
        if($proto->block > 0) {
            $tooltip_buffer .= sprintf('<span>%s</span><br />', sprintf(WoW_Locale::GetString('template_item_block'), $proto->block));
        }
        // Weapon damage info
        if($proto->IsWeapon()) {
            $minDmg = $proto->Damage[0]['min'];
            $maxDmg = $proto->Damage[0]['max'];
            $dps = $proto->getDPS();
            $tooltip_buffer .= sprintf('<!--rf--><table width="100%%"><tr><td><span>%s</span></td><th>%s</th></tr></table>%s<br />', sprintf(WoW_Locale::GetString('template_item_weapon_damage'), $minDmg, $maxDmg), sprintf(WoW_Locale::GetString('template_item_weapon_delay'), ($proto->delay / 1000)), sprintf(WoW_Locale::GetString('template_item_weapon_dps'), $dps));
        }
        // Is projectile?
        if($proto->class == ITEM_CLASS_PROJECTILE && $proto->Damage[0]['min'] > 0 && $proto->Damage[0]['max'] > $proto->Damage[0]['min']) {
            $tooltip_buffer .= sprintf('<span class="q1">%s</span><br/ >', sprintf(WoW_Locale::GetString('template_item_projectile_dps'), (($proto->Damage[0]['min'] + $proto->Damage[0]['max']) / 2)));
        }
        // Is gem?
        if($proto->class == ITEM_CLASS_GEM && $proto->GemProperties > 0) {
            $gemText = DB::World()->selectRow("
            SELECT
            `a`.`spellitemenchantement`,
            `b`.`text_%s` AS `text`
            FROM `DBPREFIX_gemproperties` AS `a`
            LEFT JOIN `DBPREFIX_enchantment` AS `b` ON `b`.`id` = `a`.`spellitemenchantement`
            WHERE `a`.`id` = %d", WoW_Locale::GetLocale(), $proto->GemProperties);
            if($gemText) {
                $tooltip_buffer .= sprintf('<span class="q1">%s</span><br />', $gemText['text']);
            }
        }
        // Base stats
        foreach($proto->ItemStat as $stat) {
            if($stat['type'] >= 3 && $stat['type'] <= 8) {
                $tooltip_buffer .= sprintf('<span><!--stat%d-->+%s</span><br />', $stat['type'], sprintf(WoW_Locale::GetString('template_item_stat_' . $stat['type']), $stat['value']));
            }
        }
        // Sockets
        if($proto->Socket) {
            foreach($proto->Socket as $socket) {
                if($socket['name'] != null) {
                    $tooltip_buffer .= sprintf('<a href="%s/items=3&amp;filter=cr=81;crs=3;crv=%d" class="socket-%s q0">%s</a><br />', WoW::GetWoWPath(), $socket['filter'], $socket['name'], WoW_Locale::GetString('template_item_socket_' . $socket['color']));
                }
            }
        }
        // Socket bonus
        if($proto->socketBonus > 0) {
            $tooltip_buffer .= sprintf('<!--sb--><span class="q0">%s</span><br />', sprintf(WoW_Locale::GetString('template_item_socket_match'), DB::World()->selectCell("SELECT `text_%s` FROM `DBPREFIX_enchantment` WHERE `id` = %d LIMIT 1", WoW_Locale::GetLocale(), $proto->socketBonus)));
        }
        // Durability
        if($proto->MaxDurability > 0) {
            $tooltip_buffer .= sprintf('%s<br />', sprintf(WoW_Locale::GetString('template_item_durability'), $proto->MaxDurability, $proto->MaxDurability));
        }
        // Classes mask
        if($proto->AllowableClass > 0) {
            $classes_data = self::AllowableClasses($proto->AllowableClass);
            if(is_array($classes_data)) {
                $tooltip_buffer .= sprintf('%s ', WoW_Locale::GetString('template_item_allowable_classes'));
                $current = 1;
                foreach($classes_data as $class_id => $class) {
                    $tooltip_buffer .= sprintf('<a href="%s/class=%d" class="c%d">%s</a>%s', WoW::GetWoWPath(), $class_id, $class_id, WoW_Locale::GetString('character_class_' . $class_id), $current < sizeof($classes_data) ? ', ' : null);
                    ++$current;
                }
                $tooltip_buffer .= '<br />';
            }
        }
        // Races mask
        if($proto->AllowableRace > 0) {
            $races_data = self::AllowableRaces($proto->AllowableRace);
            if(is_array($races_data)) {
                $tooltip_buffer .= sprintf('%s ', WoW_Locale::GetString('template_item_allowable_races'));
                $current = 1;
                foreach($races_data as $race_id => $race) {
                    $tooltip_buffer .= sprintf('<a href="%s/race=%d" class="q1">%s</a>%s', WoW::GetWoWPath(), $race_id, WoW_Locale::GetString('character_race_' . $race_id), $current < sizeof($races_data) ? ', ' : null);
                    ++$current;
                }
                $tooltip_buffer .= '<br />';
            }
        }
        // Required* fields
        if($proto->RequiredLevel > 0) {
            $tooltip_buffer .= sprintf('%s<br />', sprintf(WoW_Locale::GetString('template_item_required_level'), $proto->RequiredLevel));
        }
        if($proto->ItemLevel > 0) {
            $tooltip_buffer .= sprintf('%s<br />', sprintf(WoW_Locale::GetString('template_item_itemlevel'), $proto->ItemLevel));
        }
        if($proto->RequiredSkill > 0) {
            $skillInfo = DB::World()->selectRow("SELECT `name_%s` AS `name` FROM `DBPREFIX_skills` WHERE `id`=%d", WoW_Locale::GetLocale(), $proto->RequiredSkill);
            if($skillInfo) {
                $tooltip_buffer .= sprintf('%s<br />', sprintf(WoW_Locale::GetString('template_item_required_skill'), WoW::GetWoWPath(), $proto->RequiredSkill, $skillInfo['name'], $proto->RequiredSkillRank));
            }
        }
        if($proto->requiredspell > 0) {
            $spellInfo = DB::World()->selectRow("SELECT `SpellName_%s` AS `name` FROM `DBPREFIX_spell` WHERE `id` = %d", in_array(WoW_Locale::GetLocaleID(), array(LOCALE_EN, LOCALE_RU)) ? WoW_Locale::GetLocale() : 'en', $proto->requiredspell);
            if($spellInfo) {
                $tooltip_buffer .= sprintf('%s<br />', sprintf(WoW_Locale::GetString('template_item_required_spell'), WoW::GetWoWPath(), $proto->requiredspell, $spellInfo['name']));
            }
        }
        if($proto->RequiredReputationFaction > 0) {
            $factionInfo = DB::World()->selectCell("SELECT `name_%s` FROM `DBPREFIX_faction` WHERE `id` = %d", WoW_Locale::GetLocale(), $proto->RequiredReputationFaction);
            if($factionInfo) {
                $tooltip_buffer .= sprintf('%s<br />', sprintf(WoW_Locale::GetString('template_item_required_reputation'), WoW_Locale::GetString('reputation_rank_' . $proto->RequiredReputationRank), WoW::GetWoWPath(), $proto->RequiredReputationFaction, $factionInfo));
            }
        }
        // Green bonuses
        $tooltip_buffer .= '</td></tr></table><table><tr><td><!--rr-->';
        foreach($proto->ItemStat as $stat) {
            if($stat['type'] < 12) {
                // Skip white bonuses
                continue;
            }
            $tooltip_buffer .= sprintf('<span class="q2">%s %s<!--rtg%d--> %d&nbsp;<small>(<!--rtg%d-->0.00%%&nbsp;@&nbsp;L<!--lvl-->%d)</small>.</span><br />', WoW_Locale::GetString('template_item_stats_green'), WoW_Locale::GetString('template_item_stat_' . $stat['type']), $stat['type'], $stat['value'], $stat['type'], MAX_PLAYER_LEVEL);
        }
        // Description
        if($proto->description != null) {
            $tooltip_buffer .= sprintf('<span class="q">&quot;%s&quot;</span><br />', $proto->GetDesc());
        }
        if($proto->SellPrice > 0) {
            $money = WoW_Utils::GetMoneyFormat($proto->SellPrice);
            $tooltip_buffer .= sprintf('%s %s%s%s', WoW_Locale::GetString('template_item_sell_price'), ($money['gold'] > 0 ? ' <span class="moneygold">' . $money['gold'] . '</span>' : null), ($money['silver'] > 0 ? ' <span class="moneysilver">' . $money['silver'] . '</span>' : null), ($money['copper'] > 0 ? '<span class="moneycopper">' . $money['copper'] . '</span>' : null));
        }
        $tooltip_buffer .= sprintf('</td></tr></table><!--?%d:1:%d:%d-->', $proto->entry, MAX_PLAYER_LEVEL, $proto->RequiredLevel);
        self::$m_item->tooltip = $tooltip_buffer;
        unset($proto);
        return true;
    }
    
    private static function CalculateDPS(&$item) {
        if($item['class'] != ITEM_CLASS_WEAPON) {
            return 0.0;
        }
        $dps = 0.0;
        for($i = 0; $i <= 1; $i++) {
            $d_type = $item['dmg_type' . ($i+1)];
            $d_min  = $item['dmg_min' . ($i+1)];
            $d_max  = $item['dmg_max' . ($i+1)];
            if($d_max > 0) {
                $delay = $item['Delay'] / 1000;
                if($delay > 0) {
                    $dps += round(($d_max + $d_min) / (2 * $delay), 1);
                }
                if($i > 1) {
                    $delay = 0;
                }
           	}
        }
        return $dps;
    }
    
    public static function GetItems() {
        return self::$m_items;
    }
    
    public static function GetItem() {
        return self::$m_item;
    }
    
    /**
     * Returns multiplier for SSV mask
     * @category Items class
     * @access   public
     * @param    array $ssv
     * @param    int $mask
     * @return   int
     **/
    public static function GetSSDMultiplier($ssv, $mask) {
        if(!is_array($ssv)) {
            return 0;
        }
        if($mask & 0x4001F) {
            if($mask & 0x00000001) {
                return $ssv['ssdMultiplier_0'];
            }
            if($mask & 0x00000002) {
                return $ssv['ssdMultiplier_1'];
            }
            if($mask & 0x00000004) {
                return $ssv['ssdMultiplier_2'];
            }
            if($mask & 0x00000008) {
                return $ssv['ssdMultiplier2'];
            }
            if($mask & 0x00000010) {
                return $ssv['ssdMultiplier_3'];
            }
            if($mask & 0x00040000) {
                return $ssv['ssdMultiplier3'];
            }
        }
        return 0;
    }
    
    /**
     * Returns armor mod for SSV mask
     * @category Items class
     * @access   public
     * @param    array $ssv
     * @param    int $mask
     * @return   int
     **/
    public static function GetArmorMod($ssv, $mask) {
        if(!is_array($ssv)) {
            return 0;
        }
        if($mask & 0x00F001E0) {
            if($mask & 0x00000020) {
                return $ssv['armorMod_0'];
            }
            if($mask & 0x00000040) {
                return $ssv['armorMod_1'];
            }
            if($mask & 0x00000080) {
                return $ssv['armorMod_2'];
            }
            if($mask & 0x00000100) {
                return $ssv['armorMod_3'];
            }
            if($mask & 0x00100000) {
                return $ssv['armorMod2_0']; // cloth
            }
            if($mask & 0x00200000) {
                return $ssv['armorMod2_1']; // leather
            }
            if($mask & 0x00400000) {
                return $ssv['armorMod2_2']; // mail
            }
            if($mask & 0x00800000) {
                return $ssv['armorMod2_3']; // plate
            }
        }
        return 0;
    }
    
    /**
     * Returns DPS mod for SSV mask
     * @category Items class
     * @access   public
     * @param    array $ssv
     * @param    int $mask
     * @return   int
     **/
    public static function GetDPSMod($ssv, $mask) {
        if(!is_array($ssv)) {
            return 0;
        }
        if($mask & 0x7E00) {
            if($mask & 0x00000200) {
                return $ssv['dpsMod_0'];
            }
            if($mask & 0x00000400) {
                return $ssv['dpsMod_1'];
            }
            if($mask & 0x00000800) {
                return $ssv['dpsMod_2'];
            }
            if($mask & 0x00001000) {
                return $ssv['dpsMod_3'];
            }
            if($mask & 0x00002000) {
                return $ssv['dpsMod_4'];
            }
            if($mask & 0x00004000) {
                return $ssv['dpsMod_5'];   // not used?
            }
        }
        return 0;
    }
    
    /**
     * Returns Spell Bonus for SSV mask
     * @category Items class
     * @access   public
     * @param    array $ssv
     * @param    int $mask
     * @return   int
     **/
    public static function GetSpellBonus($ssv, $mask) {
        if(!is_array($ssv)) {
            return 0;
        }
        if($mask & 0x00008000) {
            return $ssv['spellBonus'];
        }
        return 0;
    }
    
    /**
     * Returns feral bonus for SSV mask
     * @category Items class
     * @access   public
     * @param    array $ssv
     * @param    int $mask
     * @return   int
     **/
    public static function GetFeralBonus($ssv, $mask) {
        if(!is_array($ssv)) {
            return 0;
        }
        if($mask & 0x00010000) {
            return 0;   // not used?
        }
        return 0;
    }
    
    public static function AllowableClasses($mask) {
        $mask &= 0x5DF;
        if($mask == 0x5DF || $mask == 0) {
            return true;
        }
        $classes_data = array();
        $i = 1;
        while($mask) {
            if($mask & 1) {
                $classes_data[$i] = Data_Classes::$classes[$i];
            }
            $mask >>= 1;
            $i++;
        }
        return $classes_data;
    }
    
    public static function AllowableRaces($mask) {
        $mask &= 0x7FF;
        if($mask == 0x7FF || $mask == 0) {
            return true;
        }
        $races_data = array();
        $i = 1;
        while($mask) {
            if($mask & 1) {
                $races_data[$i] = Data_Races::$races[$i];
            }
            $mask >>= 1;
            $i++;
        }
        return $races_data;
    }
    
    public static function GetExtendedItemInfo($entry) {
        if(!is_array($entry)) {
            return false;
        }
        $data = DB::World()->select("
        SELECT
        `a`.`entry`,
        `a`.`name`,
        `a`.`displayid`,
        `a`.`Quality` AS `quality`,
        `a`.`SellPrice` AS `sellprice`,
        `a`.`BuyPrice` AS `buyprice`,
        `a`.`class`,
        `a`.`subclass`,
        `a`.`displayid`,
        `a`.`Flags`,
        `a`.`Flags2`,
        `a`.`armor`,
        `a`.`InventoryType` AS `slotbak`,
        `a`.`AllowableClass`,
        `a`.`AllowableRace`,
        `a`.`ItemLevel` AS `level`,
        `a`.`RequiredLevel` AS `reqlevel`,
        `b`.`icon`,
        %s
        FROM `item_template` AS `a`
        LEFT JOIN `DBPREFIX_icons` AS `b` ON `b`.`displayid` = `a`.`displayid`
        %s
        WHERE `a`.`entry` IN (%s)",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`c`.`name_loc' . WoW_Locale::GetLocaleID() . '` AS `name_loc`' : 'NULL', 
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_item` AS `c` ON `c`.`entry` = `a`.`entry`' : null,
            $entry
        );
        ///$items = array();
        foreach($data as &$item) {
            $item['id'] = $item['entry'];
            if(isset($item['name_loc']) && $item['name_loc'] != null) {
                // GetLocaleID() check is not required here
                $item['name'] = $item['name_loc'];
                unset($item['name_loc']);
            }
            if($item['Flags2'] & ITEM_FLAGS2_ALLIANCE_ONLY) {
                $item['side'] = FACTION_ALLIANCE;
            }
            elseif($item['Flags2'] & ITEM_FLAGS2_HORDE_ONLY) {
                $item['side'] = FACTION_HORDE;
            }
            else {
                $item['side'] =3; // Thumb Up, RWJ!
            }
            if($item['Flags'] & ITEM_FLAGS_HEROIC) {
                $item['heroic'] = 1;
            }
            if(is_array(WoW_Items::AllowableClasses($item['AllowableClass']))) {
                $item['reqclass'] = $item['AllowableClass'];
                unset($item['AllowableClass']);
            }
            if(is_array(WoW_Items::AllowableRaces($item['AllowableRace']))) {
                $item['reqrace'] = $item['AllowableRace'];
                unset($item['AllowableRace']);
            }
            if($item['class'] == ITEM_CLASS_MISC && $item['subclass'] == ITEM_SUBCLASS_JUNK_MOUNT) {
                $item['modelviewer'] = '{"displayid":' . $item['displayid'] . ',"type": 1,"typeid":11147}';
            }
            if(in_array($item['class'], array(ITEM_CLASS_ARMOR, ITEM_CLASS_WEAPON))) {
                $item['slot'] = $item['slotbak'];
            }
            else {
                unset($item['armor']);
            }
            $item['classs'] = $item['class'];
            unset($item['Flags'], $item['Flags2'], $item['AllowableClass'], $item['AllowableRace']);
        }
        return $data;
    }
    
    public static function GetBasicItemInfo($entry) {
        if(!$entry) {
            return false;
        }
        if(is_array($entry)) {
            $data = DB::World()->select("
            SELECT
            `a`.`entry`,
            `a`.`name`,
            `a`.`displayid`,
            `a`.`Quality` AS `quality`,
            `a`.`SellPrice` AS `sellprice`,
            `a`.`BuyPrice` AS `buyprice`,
            `b`.`icon`,
            %s
            FROM `item_template` AS `a`
            LEFT JOIN `DBPREFIX_icons` AS `b` ON `b`.`displayid` = `a`.`displayid`
            %s
            WHERE `a`.`entry` IN (%s)", 
                WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`c`.`name_loc%d` AS `name_loc`', WoW_Locale::GetLocaleID()) : 'NULL', 
                WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_item` AS `c` ON `c`.`entry` = `a`.`entry`' : null,
                $entry
            );
            foreach($data as &$item) {
                if(isset($item['name_loc']) && $item['name_loc'] != null) {
                    // GetLocaleID() check is not required here
                    $item['name'] = $item['name_loc'];
                    unset($item['name_loc']);
                }
            }
            return $data;
        }
        else {
            $data = DB::World()->selectRow("
            SELECT
            `a`.`entry`,
            `a`.`name`,
            `a`.`displayid`,
            `a`.`Quality` AS `quality`,
            `a`.`SellPrice` AS `sellprice`,
            `a`.`BuyPrice` AS `buyprice`,
            `b`.`icon`,
            %s
            FROM `item_template` AS `a`
            LEFT JOIN `DBPREFIX_icons` AS `b` ON `b`.`displayid` = `a`.`displayid`
            %s
            WHERE `a`.`entry` = %d", 
                WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`c`.`name_loc%d` AS `name_loc`', WoW_Locale::GetLocaleID()) : 'NULL', 
                WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_item` AS `c` ON `c`.`entry` = `a`.`entry`' : null,
                $entry
            );
            if(isset($data['name_loc']) && $data['name_loc'] != null) {
                // GetLocaleID() check is not required here
                $data['name'] = $data['name_loc'];
                unset($data['name_loc']);
            }
            return $data;
        }
    }
    
    public static function GetDropCreaturesSource($rebuild = false) {
        if(!self::$m_item) {
            return false;
        }
        if(isset(self::$m_item_source['dropCreatures']) && is_array(self::$m_item_source['dropCreatures']) && !$rebuild) {
            return self::$m_item_source['dropCreatures'];
        }
        $drop_creatures_count = DB::World()->selectCell("SELECT COUNT(*) FROM `creature_loot_template` WHERE `item` = %d", self::$m_item->entry);
        if($drop_creatures_count == 0) {
            return false;
        }
        $drop_creatures = DB::World()->select("
        SELECT
        `a`.*,
        `b`.`entry`,
        `b`.`KillCredit1`,
        `b`.`KillCredit2`,
        `b`.`name`,
        `b`.`subname`,
        `b`.`minlevel`,
        `b`.`maxlevel`,
        `b`.`faction_A`,
        `b`.`faction_H`,
        `b`.`rank`,
        `b`.`type`,
        `c`.`guid`,
        `c`.`map`,
        `c`.`position_x` AS `pos_x`,
        `c`.`position_y` AS `pos_y`,
        %s
        FROM `creature_loot_template` AS `a`
        LEFT JOIN `creature_template` AS `b` ON `b`.`entry` = `a`.`entry`
        LEFT JOIN `creature` AS `c` ON `c`.`id` = `a`.`entry`
        %s
        WHERE `a`.`item` = %d LIMIT 200",
        WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`d`.`name_loc%d` AS `name_loc`, `d`.`subname_loc%d` AS `subname_loc` ', WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID()) : 'NULL',
        WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('LEFT JOIN `locales_creature` AS `d` ON `d`.`entry` = `a`.`entry`') : null,
        self::$m_item->entry);
        if(!$drop_creatures) {
            return false;
        }
        $creatures = array();
        $difficulty_levels = array();
        $added_creatures = array();
        foreach($drop_creatures as $creature) {
            if(in_array($creature['entry'], $added_creatures)) {
                continue;
            }
            $kc_entry = 0;
            $difficulty_level = 0; // 5 ppl normal or 10ppl normal
            if($creature['KillCredit1'] > 0) {
                $kc_entry = $creature['KillCredit1'];
            }
            elseif($creature['KillCredit2'] > 0) {
                $kc_entry = $creature['KillCredit2'];
            }
            if($kc_entry > 0 && in_array($kc_entry, $added_creatures)) {
                continue;
            }
            $name_info = array();
            $zone_info = array();
            if($kc_entry > 0) {
                if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
                    $name_info = DB::World()->selectRow("SELECT
                    `a`.`difficulty_entry_1`,
                    `a`.`difficulty_entry_2`,
                    `a`.`difficulty_entry_3`,
                    `b`.`name_loc%d` AS `name`, 
                    `b`.`subname_loc%d` AS `subname`,
                    `c`.`map`,
                    `c`.`position_x` AS `pos_x`,
                    `c`.`position_y` AS `pos_y`
                    FROM `creature_template` AS `a`
                    LEFT JOIN `locales_creature` AS `b` ON `b`.`entry` = `a`.`entry`
                    LEFT JOIN `creature` AS `c` ON `c`.`id` = `a`.`entry`
                    WHERE `a`.`entry` = %d", WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID(), $kc_entry);
                }
                if(!$name_info) {
                    $name_info = DB::World()->selectRow("
                    SELECT
                    `a`.`name`,
                    `a`.`subname`,
                    `a`.`difficulty_entry_1`,
                    `a`.`difficulty_entry_2`,
                    `a`.`difficulty_entry_3`,
                    `b`.`map`,
                    `b`.`position_x` AS `pos_x`,
                    `b`.`position_y` AS `pos_y`
                    FROM `creature_template` AS `a`
                    LEFT JOIN `creature` AS `b` ON `b`.`id` = `a`.`entry`
                    WHERE `a`.`entry` = %d", $kc_entry);
                }
                $creature['name'] = $name_info['name'];
                $creature['subname'] = $name_info['subname'];
                for($i = 1; $i < 4; ++$i) {
                    if($name_info['difficulty_entry_' . $i] == $creature['entry']) {
                        $difficulty_level = $i;
                    }
                }
                $creature['entry'] = $kc_entry;
                // Find zone
                $zone_info = DB::World()->selectRow("
                SELECT
                `a`.`id`,
                `a`.`area`,
                `b`.`name_en` AS `areaName_original`,
                `b`.`name_%s` AS `areaName_locale`
                FROM `DBPREFIX_zones` AS `a`
                JOIN `DBPREFIX_areas` AS `b` ON `b`.`id` = `a`.`area`
                WHERE `a`.`map` = %d AND `a`.`y_min` >= %d AND `a`.`y_max` <= %d AND `a`.`x_min` >= %d AND `a`.`x_max` <= %d
                LIMIT 1",
                WoW_Locale::GetLocale(),
                $name_info['map'], $name_info['pos_y'], $name_info['pos_y'], $name_info['pos_x'], $name_info['pos_x']);
                unset($name_info);
            }
            else {
                if(isset($creature['name_loc']) && $creature['name_loc'] != null) {
                    $creature['name'] = $creature['name_loc'];
                    $creature['subname'] = $creature['subname_loc'];
                }
                // Find zone
                $zone_info = DB::World()->selectRow("
                SELECT
                `a`.`id`,
                `a`.`area`,
                `b`.`name_en` AS `areaName_original`,
                `b`.`name_%s` AS `areaName_locale`
                FROM `DBPREFIX_zones` AS `a`
                JOIN `DBPREFIX_areas` AS `b` ON `b`.`id` = `a`.`area`
                WHERE `a`.`map` = %d AND `a`.`y_min` >= %d AND `a`.`y_max` <= %d AND `a`.`x_min` >= %d AND `a`.`x_max` <= %d
                LIMIT 1",
                WoW_Locale::GetLocale(),
                $creature['map'], $creature['pos_y'], $creature['pos_y'], $creature['pos_x'], $creature['pos_x']);
            }
            /*
                Difficulty Levels:
                    0: 5 ppl normal or 10 ppl normal
                    1: 5 ppl heroic or 25 ppl normal
                    2: 10 ppl heroic
                    3: 25 ppl heroic
            */
            $creature['difficulty_level'] = $difficulty_level;
            if(!in_array($difficulty_level, $difficulty_levels)) {
                $difficulty_levels[] = $difficulty_level;
            }
            if($creature['maxlevel'] == 83 && $creature['rank'] == 3) {
                $creature['level'] = '??';
            }
            else {
                $creature['level'] = $creature['maxlevel'];
            }
            if(isset($creature['name_loc'])) {
                unset($creature['name_loc'], $creature['subname_loc']); // 'name' & 'subname' already re-assigned due to current locale.
            }
            // Set zone
            $creature['areaName'] = '';
            $creature['areaID']  = 0;
            if($zone_info) {
                $creature['areaName'] = (WoW_Locale::GetLocaleID() != LOCALE_EN && $zone_info['areaName_locale'] != null) ? $zone_info['areaName_locale'] : $zone_info['areaName_original'];
                $creature['areaID'] = $zone_info['area'];
                unset($zone_info);
            }
            // Set reactions
            $creature['react_a'] = WoW_Utils::IsFriendlyForFaction($creature['faction_A'], FACTION_ALLIANCE);
            $creature['react_h'] = WoW_Utils::IsFriendlyForFaction($creature['faction_H'], FACTION_HORDE);
            unset($creature['map'], $creature['pos_x'], $creature['pos_y'], $creature['KillCredi1'], $creature['KillCredi2'], $creature['guid']);
            $creatures[] = $creature;
            $added_creatures[] = $creature['entry'];
        }
        // Table note
        $dropInfo = '';
        if((in_array(0, $difficulty_levels) && in_array(2, $difficulty_levels)) || (in_array(1, $difficulty_levels) && in_array(3, $difficulty_levels))) {
            $dropInfo = 'innormalheroic';
        }
        elseif(!in_array(0, $difficulty_levels) && !in_array(1, $difficulty_levels)) {
            $dropInfo = 'inheroiconly';
        }
        elseif(!in_array(2, $difficulty_levels) && !in_array(3, $difficulty_levels)) {
            $dropInfo = 'innormalonly';
        }
        else {
            $dropInfo = 'innormalonly';
        }
        // Check for heroic/normal (X) only
        if(sizeof($difficulty_levels) == 1 && $difficulty_levels[0] == 0) {
            $dropInfo = 'innormal10only';
        }
        elseif(sizeof($difficulty_levels) == 1 && $difficulty_levels[0] == 1) {
            $dropInfo = 'innormal25only';
        }
        elseif(sizeof($difficulty_levels) == 1 && $difficulty_levels[0] == 2) {
            $dropInfo = 'inheroic10only';
        }
        elseif(sizeof($difficulty_levels) == 1 && $difficulty_levels[0] == 3) {
            $dropInfo = 'inheroic25only';
        }
        self::$m_item_source['dropCreatures'] = array(
            'creatures' => $creatures,
            'dropInfo' => $dropInfo
        );
        unset($creatures, $creature);
        return self::$m_item_source['dropCreatures'];
    }
    
    public static function GetQuestRewardSource($rebuild = false) {
        if(!self::$m_item) {
            return false;
        }
        if(isset(self::$m_item_source['questReward']) && is_array(self::$m_item_source['questReward']) && !$rebuild) {
            return self::$m_item_source['questReward'];
        }
        $quest_reward_count = DB::World()->selectCell("SELECT COUNT(*) FROM `quest_template` WHERE `RewChoiceItemId1` = %d OR `RewChoiceItemId2` = %d OR `RewChoiceItemId3` = %d OR `RewChoiceItemId4` = %d OR `RewChoiceItemId5` = %d OR `RewChoiceItemId6` = %d OR `RewItemId1` = %d OR `RewItemId2` = %d OR `RewItemId3` = %d OR `RewItemId4` = %d", self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry);
        if($quest_reward_count == 0) {
            return false;
        }
        $quest_reward = DB::World()->select("
        SELECT
        `a`.`entry`,
        `a`.`MinLevel`,
        `a`.`QuestLevel`,
        `a`.`Title`,
        `a`.`RewChoiceItemId1`,
        `a`.`RewChoiceItemId2`,
        `a`.`RewChoiceItemId3`,
        `a`.`RewChoiceItemId4`,
        `a`.`RewChoiceItemId5`,
        `a`.`RewChoiceItemId6`,
        `a`.`RewChoiceItemCount1`,
        `a`.`RewChoiceItemCount2`,
        `a`.`RewChoiceItemCount3`,
        `a`.`RewChoiceItemCount4`,
        `a`.`RewChoiceItemCount5`,
        `a`.`RewChoiceItemCount6`,
        `a`.`RewItemId1`,
        `a`.`RewItemId2`,
        `a`.`RewItemId3`,
        `a`.`RewItemId4`,
        `a`.`RewItemCount1`,
        `a`.`RewItemCount2`,
        `a`.`RewItemCount3`,
        `a`.`RewItemCount4`,
        `a`.`RewRepFaction1`,
        `a`.`RewRepFaction2`,
        `a`.`RewRepFaction3`,
        `a`.`RewRepFaction4`,
        `a`.`RewRepFaction5`,
        `a`.`RewRepValueId1`,
        `a`.`RewRepValueId2`,
        `a`.`RewRepValueId3`,
        `a`.`RewRepValueId4`,
        `a`.`RewRepValueId5`,
        `a`.`RewRepValue1`,
        `a`.`RewRepValue2`,
        `a`.`RewRepValue3`,
        `a`.`RewRepValue4`,
        `a`.`RewRepValue5`,
        `a`.`RewOrReqMoney`,
        %s
        FROM `quest_template` AS `a`
        %s
        WHERE
        `a`.`RewChoiceItemId1` = %d
        OR
        `a`.`RewChoiceItemId2` = %d
        OR
        `a`.`RewChoiceItemId3` = %d
        OR
        `a`.`RewChoiceItemId4` = %d
        OR
        `a`.`RewChoiceItemId5` = %d
        OR
        `a`.`RewChoiceItemId6` = %d
        OR
        `a`.`RewItemId1` = %d
        OR
        `a`.`RewItemId2` = %d
        OR
        `a`.`RewItemId3` = %d
        OR
        `a`.`RewItemId4` = %d
        ",
        WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`b`.`Title_loc%d` AS `Title_loc`', WoW_Locale::GetLocaleID()) : 'NULL',
        WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('LEFT JOIN `locales_quest` AS `b` ON `b`.`entry` = `a`.`entry`') : null,
        self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry,
        self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry, self::$m_item->entry);
        if(!$quest_reward) {
            return false;
        }
        $quests = array();
        foreach($quest_reward as $quest) {
            $reward_items = '';
            $items = array();
            for($i = 1; $i < 7; ++$i) {
                if($quest['RewChoiceItemId' . $i] == self::$m_item->entry) {
                    if($reward_items != null) {
                        $reward_items .= ',';
                    }
                    $reward_items .= sprintf('[%d,%d],', $quest['RewChoiceItemId' . $i], $quest['RewChoiceItemCount' . $i]);
                    $items[] = $quest['RewChoiceItemId' . $i];
                }
                if($i < 5) {
                    if($quest['RewItemId' . $i] == self::$m_item->entry) {
                        if($reward_items != null) {
                            $reward_items .= ',';
                        }
                        $reward_items .= sprintf('[%d,%d]', $quest['RewItemId' . $i], $quest['RewItemCount' . $i]);
                        $items[] = $quest['RewItemId' . $i];
                    }
                }
            }
            if(WoW_Locale::GetLocaleID() != LOCALE_EN && $quest['Title_loc'] != null) {
                $quest['Title'] = $quest['Title_loc'];
            }
            $items_data = DB::World()->select("
            SELECT
            `a`.`entry`,
            `a`.`name`,
            `a`.`Quality` AS `quality`,
            `b`.`icon`,
            %s
            FROM `item_template` AS `a`
            LEFT JOIN `DBPREFIX_icons` AS `b` ON `b`.`displayid` = `a`.`displayid`
            %s
            WHERE `a`.`entry` IN (%s)",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`c`.`name_loc%d` AS `name_loc`', WoW_Locale::GetLocaleID()) : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('LEFT JOIN `locales_item` AS `c` ON `c`.`entry` = `a`.`entry`') : null,
            $items
            );
            $quest['reward_items'] = $reward_items;
            $quest['items'] = $items_data;
            $quests[] = $quest;
        }
        self::$m_item_source['questReward'] = $quests;
        unset($quests);
        return self::$m_item_source['questReward'];
    }
    
    public static function GetAchievementsCriteria($rebuild = false) {
        if(!self::$m_item) {
            return false;
        }
        if(isset(self::$m_item_source['achievementsCriteria']) && is_array(self::$m_item_source['achievementsCriteria']) && !$rebuild) {
            return self::$m_item_source['achievementsCriteria'];
        }
        $achievements_criteria_count = DB::World()->selectCell("SELECT COUNT(*) FROM `DBPREFIX_achievement_criteria` WHERE `requiredType` IN (36, 41, 42, 57) AND `data` = %d",  self::$m_item->entry);
        if($achievements_criteria_count == 0) {
            return false;
        }
        $achievements_criteria = DB::World()->select("
        SELECT
        `a`.`referredAchievement`,
        `b`.`id`,
        `b`.`name_%s` AS `name`,
        `b`.`desc_%s` AS `desc`,
        `b`.`categoryId`,
        `b`.`points`,
        `b`.`factionFlag` AS `side`,
        `c`.`parentCategory`,
        `d`.`icon`
        FROM `DBPREFIX_achievement_criteria` AS `a`
        LEFT JOIN `DBPREFIX_achievement` AS `b` ON `b`.`id` = `a`.`referredAchievement`
        LEFT JOIN `DBPREFIX_achievement_category` AS `c` ON `c`.`id` = `b`.`categoryId`
        LEFT JOIN `DBPREFIX_spell_icon` AS `d` ON `d`.`id` = `b`.`iconID`
        WHERE `a`.`requiredType` IN (36, 41, 42, 57) AND `a`.`data` = %d
        LIMIT 200", WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), self::$m_item->entry);
        if(!$achievements_criteria) {
            return false;
        }
        self::$m_item_source['achievementsCriteria'] = $achievements_criteria;
        unset($achievements_criteria);
        return self::$m_item_source['achievementsCriteria'];
    }
    
    public function GetVendorsSource($rebuild = false) {
        if(!self::$m_item) {
            return false;
        }
        if(isset(self::$m_item_source['vendors']) && is_array(self::$m_item_source['vendors']) && !$rebuild) {
            return self::$m_item_source['vendors'];
        }
        $vendors_count = DB::World()->selectCell("SELECT COUNT(*) FROM `npc_vendor` WHERE `item` = %d", self::$m_item->entry);
        if($vendors_count == 0) {
            return false;
        }
        $vendors_source = DB::World()->select("
        SELECT
        `a`.*,
        `b`.`name`,
        `b`.`subname`,
        `b`.`faction_A`,
        `b`.`faction_H`,
        `b`.`minlevel`,
        `b`.`maxlevel`,
        `b`.`rank`,
        `b`.`type`,
        `c`.`map`,
        `c`.`position_x`,
        `c`.`position_y`,
        `d`.*,
        %s
        FROM `npc_vendor` AS `a`
        LEFT JOIN `creature_template` AS `b` ON `b`.`entry` = `a`.`entry`
        LEFT JOIN `creature` AS `c` ON `c`.`id` = `a`.`entry`
        LEFT JOIN `DBPREFIX_extended_cost` AS `d` ON `d`.`id` = ABS(`a`.`ExtendedCost`)
        %s
        WHERE `a`.`item` = %d
        LIMIT 200",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('`e`.`name_loc%d` AS `name_loc`, `e`.`subname_loc%d` AS `subname_loc`', WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID()) : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_creature` AS `e` ON `e`.`entry` = `a`.`entry`' : null,
            self::$m_item->entry
        );
        if(!$vendors_source) {
            return false;
        }
        $vendors = array();
        $added_vendors = array();
        $added_items = array();
        foreach($vendors_source as $vendor) {
            if(in_array($vendor['entry'], $added_vendors)) {
                continue;
            }
            // Find zone
            $vendor['areaName'] = null;
            $vendor['areaID'] = 0;
            $zone_info = DB::World()->selectRow("
            SELECT
            `a`.`id`,
            `a`.`area`,
            `b`.`name_en` AS `areaName_original`,
            `b`.`name_%s` AS `areaName_locale`
            FROM `DBPREFIX_zones` AS `a`
            JOIN `DBPREFIX_areas` AS `b` ON `b`.`id` = `a`.`area`
            WHERE `a`.`map` = %d AND `a`.`y_min` >= %d AND `a`.`y_max` <= %d AND `a`.`x_min` >= %d AND `a`.`x_max` <= %d
            LIMIT 1",
            WoW_Locale::GetLocale(),
            $vendor['map'], $vendor['position_y'], $vendor['position_y'], $vendor['position_x'], $vendor['position_x']);
            if(is_array($zone_info)) {
                $vendor['areaID'] = $zone_info['area'];
                $vendor['areaName'] = (WoW_Locale::GetLocaleID() != LOCALE_EN && $zone_info['areaName_locale'] != null) ? $zone_info['areaName_locale'] : $zone_info['areaName_original'];
            }
            $vendor['react_a'] = WoW_Utils::IsFriendlyForFaction($vendor['faction_A'], FACTION_ALLIANCE);
            $vendor['react_h'] = WoW_Utils::IsFriendlyForFaction($vendor['faction_H'], FACTION_HORDE);
            if(isset($vendor['name_loc']) && WoW_Locale::GetLocaleID() != LOCALE_EN && $vendor['name_loc'] != null) {
                $vendor['name'] = $vendor['name_loc'];
                $vendor['subname'] = $vendor['subname_loc']; // No check required
            }
            $vendor['ext_cost'] = '[';
            $vendor['ext_cost_items_id'] = array();
            for($i = 1; $i < 6; ++$i) {
                if($vendor['item' . $i] > 0 && $vendor['item' . $i . 'count'] > 0) {
                    $vendor['ext_cost'] .= sprintf('[%d, %d],', $vendor['item' . $i], $vendor['item' . $i . 'count']);
                    if(!in_array($vendor['item' . $i], $added_items)) {
                        $vendor['ext_cost_items_id'][] = $vendor['item' . $i];
                        $added_items[] = $vendor['item' . $i];
                    }
                }
            }
            if(is_array($vendor['ext_cost_items_id'])) {
                $vendor['ext_cost_items'] = self::GetBasicItemInfo($vendor['ext_cost_items_id']);
            }
            else {
                $vendor['ext_cost_items'] = array();
            }
            unset($vendor['ext_cost_items_id']);
            $vendor['ext_cost'] .= ']';
            $vendor['ext_cost'] = str_replace(',]', ']', $vendor['ext_cost']);
            $added_vendors[] = $vendor['entry'];
            $vendors[] = $vendor;
        }
        self::$m_item_source['vendors'] = $vendors;
        unset($vendors, $vendor);
        return self::$m_item_source['vendors'];
    }
}
?>