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

Class WoW_ItemPrototype {
    
    public $entry;
    public $class;
    public $subclass;
    public $unk0;
    public $name;
    public $displayid;
    public $Quality;
    public $Flags;
    public $Flags2;     // MaNGOS field
    public $FlagsExtra; // Trinity Core field
    public $BuyCount;
    public $BuyPrice;
    public $SellPrice;
    public $InventoryType;
    public $AllowableClass;
    public $AllowableRace;
    public $ItemLevel;
    public $RequiredLevel;
    public $RequiredSkill;
    public $RequiredSkillRank;
    public $requiredspell;
    public $requiredhonorrank;
    public $RequiredCityRank;
    public $RequiredReputationFaction;
    public $RequiredReputationRank;
    public $maxcount;
    public $stackable;
    public $ContainerSlots;
    public $StatsCount;
    public $stat_type1;
    public $stat_value1;
    public $stat_type2;
    public $stat_value2;
    public $stat_type3;
    public $stat_value3;
    public $stat_type4;
    public $stat_value4;
    public $stat_type5;
    public $stat_value5;
    public $stat_type6;
    public $stat_value6;
    public $stat_type7;
    public $stat_value7;
    public $stat_type8;
    public $stat_value8;
    public $stat_type9;
    public $stat_value9;
    public $stat_type10;
    public $stat_value10;
    public $ScalingStatDistribution;
    public $ScalingStatValue;
    public $dmg_min1;
    public $dmg_max1;
    public $dmg_type1;
    public $dmg_min2;
    public $dmg_max2;
    public $dmg_type2;
    public $armor;
    public $holy_res;
    public $fire_res;
    public $nature_res;
    public $frost_res;
    public $shadow_res;
    public $arcane_res;
    public $delay;
    public $ammo_type;
    public $RangedModRange;
    public $spellid_1;
    public $spelltrigger_1;
    public $spellcharges_1;
    public $spellppmRate_1;
    public $spellcooldown_1;
    public $spellcategory_1;
    public $spellcategorycooldown_1;
    public $spellid_2;
    public $spelltrigger_2;
    public $spellcharges_2;
    public $spellppmRate_2;
    public $spellcooldown_2;
    public $spellcategory_2;
    public $spellcategorycooldown_2;
    public $spellid_3;
    public $spelltrigger_3;
    public $spellcharges_3;
    public $spellppmRate_3;
    public $spellcooldown_3;
    public $spellcategory_3;
    public $spellcategorycooldown_3;
    public $spellid_4;
    public $spelltrigger_4;
    public $spellcharges_4;
    public $spellppmRate_4;
    public $spellcooldown_4;
    public $spellcategory_4;
    public $spellcategorycooldown_4;
    public $spellid_5;
    public $spelltrigger_5;
    public $spellcharges_5;
    public $spellppmRate_5;
    public $spellcooldown_5;
    public $spellcategory_5;
    public $spellcategorycooldown_5;
    public $bonding;
    public $description;
    public $PageText;
    public $LanguageID;
    public $PageMaterial;
    public $startquest;
    public $lockid;
    public $Material;
    public $sheath;
    public $RandomProperty;
    public $RandomSuffix;
    public $block;
    public $itemset;
    public $MaxDurability;
    public $area;
    public $Map;
    public $BagFamily;
    public $TotemCategory;
    public $socketColor_1;
    public $socketContent_1;
    public $socketColor_2;
    public $socketContent_2;
    public $socketColor_3;
    public $socketContent_3;
    public $socketBonus;
    public $GemProperties;
    public $RequiredDisenchantSkill;
    public $ArmorDamageModifier;
    public $Duration;
    public $ItemLimitCategory;
    public $HolidayId;
    public $ScriptName;
    public $DisenchantID;
    public $FoodType;
    public $minMoneyLoot;
    public $maxMoneyLoot;
    public $ExtraFlags;
    
    public $ItemStat = array();
    public $Damage = array();
    public $Spells = array();
    public $Socket = array();
    
    public $icon = null;
    public $class_name = null;
    public $subclass_name = null;
    public $InventoryType_name = null;
    public $name_loc = null;
    public $desc_loc = null;
    public $tooltip = null;
    public $durability_cost = -1;
    public $patch = null;
    public $faction = -1;
    public $faction_convert = 0;
    
    private $loaded  = false;
    private $m_guid  = 0;
    private $m_owner = 0;
    
    public function LoadItem($item_entry, $itemGuid = 0, $ownerGuid = 0) {
        $item_row = DB::World()->selectRow("
        SELECT
        `a`.*,
        %s
        `b`.`icon`,
        `d`.`patch`
        FROM `item_template` AS `a`
        LEFT JOIN `DBPREFIX_icons` AS `b` ON `b`.`displayid` = `a`.`displayid`
        LEFT JOIN `locales_item` AS `c` ON `c`.`entry` = `a`.`entry`
        LEFT JOIN `DBPREFIX_item_version` AS `d` ON `d`.`entry` = `a`.`entry`
        WHERE `a`.`entry` = %d LIMIT 1", WoW_Locale::GetLocaleID() > 0 ? sprintf('`c`.`name_loc%d` AS `name_loc`, `c`.`description_loc%d` AS `desc_loc`,', WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID()) : null,  $item_entry);
        if(!$item_row) {
            WoW_Log::WriteError('%s : item #%d (GUID: %d) was not found in `item_template` table.', __METHOD__, $item_entry, $itemGuid);
            return false;
        }
        // FlagsExtra check
        if(isset($item_row['FlagsExtra'])) {
            $item_row['Flags2'] = $item_row['FlagsExtra'];
            unset($item_row['FlagsExtra']); // For compatibility
        }
        // Assign variables
        foreach($item_row as $field => $value) {
            $this->{$field} = $value;
        }
        
        // Create arrays
        // Item mods
        for($i = 0; $i < MAX_ITEM_PROTO_STATS + 1; $i++) {
            $key = $i + 1;
            if(isset($this->{'stat_type' . $key})) {
                $this->ItemStat[$i] = array(
                    'type'  => $this->{'stat_type'  . $key},
                    'value' => $this->{'stat_value' . $key}
                );
            }
        }
        // Item damages
        for($i = 0; $i < MAX_ITEM_PROTO_DAMAGES + 1; $i++) {
            $key = $i + 1;
            if(isset($this->{'dmg_type' . $key})) {
                $this->Damage[$i] = array(
                    'type' => $this->{'dmg_type' . $key},
                    'min'  => $this->{'dmg_min'  . $key},
                    'max'  => $this->{'dmg_max'  . $key}
                );
            }
        }
        // Item spells
        for($i = 0; $i < MAX_ITEM_PROTO_SPELLS + 1; $i++) {
            $key = $i + 1;
            if(isset($this->{'spellid_' . $key})) {
                $this->Spells[$i] = array(
                    'spellid'          => $this->{'spellid_'               . $key}, 
                    'trigger'          => $this->{'spelltrigger_'          . $key}, 
                    'charges'          => $this->{'spellcharges_'          . $key}, 
                    'ppmRate'          => $this->{'spellppmRate_'          . $key},
                    'cooldown'         => $this->{'spellcooldown_'         . $key},
                    'category'         => $this->{'spellcategory_'         . $key},
                    'categorycooldown' => $this->{'spellcategorycooldown_' . $key}
                );
            }
        }
        // Item sockets
        for($i = 0; $i < MAX_ITEM_PROTO_SOCKETS+1; $i++) {
            $key = $i + 1;
            if(isset($this->{'socketColor_' . $key})) {
                $this->Socket[$i] = array(
                    'color'   => $this->{'socketColor_'   . $key},
                    'content' => $this->{'socketContent_' . $key},
                    'filter'  => 0,
                    'name'    => ''
                );
                switch($this->Socket[$i]['color']) {
                    case 1:
                        $this->Socket[$i]['filter'] = $this->Socket[$i]['color'];
                        $this->Socket[$i]['name'] = 'meta';
                    case 2:
                        $this->Socket[$i]['filter'] = $this->Socket[$i]['color'];
                        $this->Socket[$i]['name'] = 'red';
                        break;
                    case 4:
                        $this->Socket[$i]['filter'] = 3;
                        $this->Socket[$i]['name'] = 'yellow';
                        break;
                    case 8:
                        $this->Socket[$i]['filter'] = 4;
                        $this->Socket[$i]['name'] = 'blue';
                        break;
                }
            }
        }
        // Set locale
        if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
            $this->name = $this->name_loc != null ? $this->name_loc : $this->name;
            $this->description = $this->desc_loc != null ? $this->desc_loc : $this->description;
        }
        // Data to template class
        WoW_Template::SetPageData('item_name', $this->name);
        // Set class/subclass/inventory type names
        $itemsubclass = DB::World()->selectRow("SELECT `subclass_name_%s` AS `subclass`, `class_name_%s` AS `class` FROM `DBPREFIX_item_subclass` WHERE `subclass` = %d AND `class` = %d LIMIT 1", WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), $this->subclass, $this->class);
        if(is_array($itemsubclass)) {
            $this->subclass_name = $itemsubclass['subclass'];
            $this->class_name = $itemsubclass['class'];
        }
        if(in_array($this->class, array(ITEM_CLASS_ARMOR, ITEM_CLASS_WEAPON))) {
            $this->InventoryType_name = $this->InventoryType > 0 ? WoW_Locale::GetString('template_item_invtype_' . $this->InventoryType) : null;
        }
        // Faction
        if($this->Flags2 & ITEM_FLAGS2_HORDE_ONLY) {
            $this->faction = FACTION_HORDE;
            $this->faction_convert = DB::World()->selectCell("SELECT `item_alliance` FROM `DBPREFIX_item_equivalents` WHERE `item_horde` = %d", $this->entry);
        }
        elseif($this->Flags2 & ITEM_FLAGS2_ALLIANCE_ONLY) {
            $this->faction = FACTION_ALLIANCE;
            $this->faction_convert = DB::World()->selectCell("SELECT `item_horde` FROM `DBPREFIX_item_equivalents` WHERE `item_alliance` = %d", $this->entry);
        }
        // GUIDs
        $this->m_guid  = $itemGuid;  // Can be NULL.
        $this->m_owner = $ownerGuid; // Can be NULL.
        $this->loaded  = true;
        return true;
    }
    
    public function IsCorrect() {
        if($this->entry > 0 && $this->loaded == true) {
            // Do not check item GUID and owner GUID here.
            return true;
        }
        return false;
    }
    
    /* Helpers (not used now; from MaNGOS core) */
    public function getFeralBonus($extraDPS = 0) {
        if($this->class == ITEM_CLASS_WEAPON && (1 << $this->subclass) & 0x02A5F3) {
            $bonus = ($extraDPS + $this->getDPS()*14.0) - 767;
            if($bonus < 0) {
                $bonus = 0;
            }
            return $bonus;
        }
        return 0;
    }
    
    public function getDPS() {
        if($this->delay == 0) {
            return 0.0;
        }
        $temp = 0.0;
        for($i = 0; $i < MAX_ITEM_PROTO_DAMAGES; $i++) {
            $temp += $this->Damage[$i]['min'] + $this->Damage[$i]['max'];
        }
        return $temp * 500 / $this->delay;
    }
    
    // Not used now.
    public function GetItemQualityColor() {
        $colors_array = array(
            '#c9c9c9',        //GREY
            '#ffffff',        //WHITE
            '#00FF00',        //GREEN
            '#0070DD',        //BLUE
            '#A335EE',        //PURPLE
            '#ff8000',        //ORANGE
            '#7e7046',        //LIGHT YELLOW
            '#7e7046'         //LIGHT YELLOW
        );
        return (isset($colors_array[$this->Quality])) ? $colors_array[$this->Quality] : $colors_array[1];
    }
    
    public function IsWeapon() {
        return $this->class == ITEM_CLASS_WEAPON;
    }
    
    public function IsArmor() {
        return $this->class == ITEM_CLASS_ARMOR;
    }
    
    public function IsCanBeEquipped() {
        return $this->IsWeapon() || $this->IsArmor();
    }
    
    public function GetName() {
        return addslashes($this->name);
    }
    
    public function GetDesc() {
        return addslashes($this->description);
    }
    
    public function ItemSubClassToDurabilityMultiplierId() {
        switch($this->class) {
            case ITEM_CLASS_WEAPON:
                return $this->subclass;
            case ITEM_CLASS_ARMOR:
                return $this->subclass + 21;
        }
        return 0;
    }
    
    public function CalculateDurabilityCost() {
        if(!$this->IsCorrect()) {
            return 0;
        }
        if($this->durability_cost >= 0) {
            return $this->durability_cost;
        }
        // Ported from MaNGOS:
        // uint32 Player::DurabilityRepair(uint16 pos, bool cost, float discountMod, bool guildBank);
        $totalCost = 0;
        $discountMod = 1; // No faction
        $maxDurability = $this->MaxDurability;
        if($maxDurability == 0) {
            return 0;
        }
        $curDurability = 1;
        $lostDurability = $maxDurability - $curDurability;
        $dcost = DB::World()->selectRow("SELECT * FROM `DBPREFIX_durability_costs` WHERE `ItemLevel` = %d", $this->ItemLevel);
        if(!$dcost) {
            WoW_Log::WriteError('%s : wrong item level %d', __METHOD__, $this->ItemLevel);
            return 0;
        }
        $dQualitymodEntryId = ($this->Quality + 1) * 2;
        $dQualitymodEntry = DB::World()->selectRow("SELECT * FROM `DBPREFIX_durability_quality` WHERE `id` = %d", $dQualitymodEntryId);
        if(!$dQualitymodEntry) {
            WoW_Log::WriteError('%s : wrong dQualityModEntry %d', __METHOD__, $dQualitymodEntryId);
            return 0;
        }
        $dmultiplier = $dcost['multiplier_' . ($this->ItemSubClassToDurabilityMultiplierId() + 1)];
        $costs = (int) ($lostDurability * $dmultiplier * ((double) $dQualitymodEntry['qualityMod']));
        $costs = (int) $costs * $discountMod;
        if($costs == 0) {
            $costs = 1;
        }
        $this->durability_cost = abs($costs);
        return $this->durability_cost;
    }
}
?>