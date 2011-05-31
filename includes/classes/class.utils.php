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

Class WoW_Utils {
    
    /**
     * Returns faction ID for $raceID
     * @category Utils class
     * @access   public
     * @param    int $raceID
     * @return   int
     **/
    public function GetFactionId($raceID) {
        // Get player factionID
        $horde_races    = array(RACE_ORC,     RACE_TROLL, RACE_TAUREN, RACE_UNDEAD, RACE_BLOODELF);
        $alliance_races = array(RACE_DRAENEI, RACE_DWARF, RACE_GNOME,  RACE_HUMAN,  RACE_NIGHTELF);
        if(in_array($raceID, $horde_races)) {
            return FACTION_HORDE;
        }
        elseif(in_array($raceID, $alliance_races)) {
            return FACTION_ALLIANCE;
        }
        else {
            // Unknown race
            $this->armory->Log()->writeError('%s : unknown race: %d', __METHOD__, $raceID);
            return false;
        }
    }
    
    /**
     * Returns realm ID by name
     * @category Utils class
     * @access   public
     * @param    string $rName
     * @return   int
     **/
    public function GetRealmIDByName($rName) {
        if($realms = explode('/', $rName)) {
            $rName = $realms[0];
        }
        return self::FindRealm(urldecode($rName));
    }
    
    public function FindRealm($rName) {
        foreach(WoWConfig::$Realms as $realm) {
            if(strtolower($realm['name']) == strtolower($rName)) {
                return $realm['id'];
            }
        }
        return 0;
    }
    
    /**
     * Returns max. array value index.
     * @category Utils class
     * @access   public
     * @param    array $arr
     * @return   array
     **/
    public function GetMaxArray($arr) {
        if(!is_array($arr)) {
            WoW_Log::WriteError('%s : arr must be an array!', __METHOD__);
            return false;
        }
        $keys = array_keys($arr);
        $cnt = count($arr);
        $min = $max = $arr[$keys[0]];
        $index_min=$index_max=0; 
        for($i = 1; $i < $cnt; $i++) {
            if($arr[$keys[$i]] > $max) {
                $index_max = $i;
                $max = $arr[$keys[$i]];
            }
        }
        return $index_max;
    }
    
    /**
     * Calculates pet bonus for some stats.
     * @category Utils class
     * @access   public
     * @param    int $stat
     * @param    int $value
     * @param    int $unitClass
     **/
    public function ComputePetBonus($stat, $value, $unitClass) {
        if(!in_array($unitClass, array(CLASS_HUNTER, CLASS_WARLOCK))) {
            return -1;
        }
        $hunter_pet_bonus = array(0.22, 0.1287, 0.3, 0.4, 0.35, 0.0, 0.0, 0.0);
        $warlock_pet_bonus = array(0.0, 0.0, 0.3, 0.4, 0.35, 0.15, 0.57, 0.3);
        switch($unitClass) {
            case CLASS_WARLOCK:
                if(isset($warlock_pet_bonus[$stat])) {
                    return ($value * $warlock_pet_bonus[$stat] > 0) ? $value * $warlock_pet_bonus[$stat] : -1;
                }
                else {
                    return -1;
                }
                break;
            case CLASS_HUNTER:
                if(isset($hunter_pet_bonus[$stat])) {
                    return ($value * $hunter_pet_bonus[$stat] > 0) ? $value * $hunter_pet_bonus[$stat] : -1;
                }
                else {
                    return -1;
                }
                break;
        }
        return -1;
    }
    
    /**
     * Returns float value.
     * @category Utils class
     * @access   public
     * @param    int $value
     * @param    int $num
     * @return   float
     **/
    public function GetFloatValue($value, $num) {
        $txt = unpack('f', pack('L', $value));
        return round($txt[1], $num);
    }
    
    /**
     * Returns rating coefficient for rating $id.
     * @category Utils class
     * @access   public
     * @param    array $rating
     * @param    int $id
     * @return   int
     **/
    public function GetRatingCoefficient($rating, $id) {
        if(!is_array($rating)) {
            return 1; // Do not return 0 because it will cause division by zero error.
        }
        $ratingkey = array_keys($rating);
        if(!isset($ratingkey[44 + $id]) || !isset($rating[$ratingkey[44 + $id]])) {
            return 1;
        }
        $c = $rating[$ratingkey[44 + $id]];
        if($c == 0) {
            $c = 1;
        }
        return $c;
    }
    
    /**
     * Loads rating info from DB.
     * @category Utils class
     * @access   public
     * @param    int $level
     * @return   array
     **/
    public function GetRating($level) {
        return DB::WoW()->selectRow("SELECT * FROM `DBPREFIX_rating` WHERE `level`=%d", $level);
    }
    
    /**
     * Returns percent value.
     * @category Utils class
     * @access   public
     * @param    int $max
     * @param    int $min
     * @return   int
     **/
    public function GetPercent($max, $min) {
        $percent = $max / 100;
        if($percent == 0) {
            return 0;
        }
        $progressPercent = $min / $percent;
		if($progressPercent > 100) {
			$progressPercent = 100;
		}
		return $progressPercent;
    }
    
    /**
     * Calculates attack power for different classes by stat mods
     * @category Utils class
     * @access   public
     * @param    int $statIndex
     * @param    float $effectiveStat
     * @param    int $class
     * @return   float
     **/
    public function GetAttackPowerForStat($statIndex, $effectiveStat, $class) {
        $ap = 0;
        if($statIndex == STAT_STRENGTH) {
            switch($class) {
                case CLASS_WARRIOR:
                case CLASS_PALADIN:
                case CLASS_DK:
                case CLASS_DRUID:
                    $baseStr = min($effectiveStat, 20);
                    $moreStr = $effectiveStat-$baseStr;
                    $ap = $baseStr + 2 * $moreStr;
                    break;
                default:
                    $ap = $effectiveStat - 10;
                    break;
            }
        }
        elseif($statIndex == STAT_AGILITY) {
            switch ($class) {
                case CLASS_SHAMAN:
                case CLASS_ROGUE:
                case CLASS_HUNTER:
                    $ap = $effectiveStat - 10;
                    break;
            }
        }
        if($ap < 0) {
            $ap = 0;
        }
        return $ap;
    }
    
    /**
     * Calculates crit chance from agility stat.
     * @category Utils class
     * @access   public
     * @param    array $rating
     * @param    int $class
     * @param    float $agility
     * @return   float
     **/
    public function GetCritChanceFromAgility($rating, $class, $agility) {
        if(!is_array($rating)) {
            return 1;
        }
        $base = array(3.1891, 3.2685, -1.532, -0.295, 3.1765, 3.1890, 2.922, 3.454, 2.6222, 20, 7.4755);
        $ratingkey = array_keys($rating);
        if(isset($ratingkey[$class]) && isset($rating[$ratingkey[$class]]) && isset($base[$class - 1])) {
            return $base[$class - 1] + $agility * $rating[$ratingkey[$class]] * 100;
        }
    }
    
    /**
     * Calculates spell crit chance from intellect stat.
     * @category Utils class
     * @access   public
     * @param    array $rating
     * @param    int $class
     * @param    float $intellect
     * @return   float
     **/
    public function GetSpellCritChanceFromIntellect($rating, $class, $intellect) {
        if(!is_array($rating)) {
            return 1;
        }
        $base = array(0, 3.3355, 3.602, 0, 1.2375, 0, 2.201, 0.9075, 1.7, 20, 1.8515);
        $ratingkey = array_keys($rating);
        if(isset($base[$class - 1]) && isset($ratingkey[11 + $class]) && isset($rating[$ratingkey[11 + $class]])) {
            return $base[$class - 1] + $intellect * $rating[$ratingkey[11 + $class]] * 100;
        }
    }
    
    /**
     * Calculates health regeneration coefficient.
     * @category Utils class
     * @access   public
     * @param    array $rating
     * @param    int $class
     * @return   float
     **/
    public function GetHRCoefficient($rating, $class) {
        if(!is_array($rating)) {
            return 1;
        }
        $ratingkey = array_keys($rating);
        if(!isset($ratingkey[22 + $class]) || !isset($rating[$ratingkey[22 + $class]])) {
            return 1;
        }
        $c = $rating[$ratingkey[22 + $class]];
        if($c == 0) {
            $c = 1;
        }
        return $c;
    }
    
    /**
     * Calculates mana regenerating coefficient
     * @category Utils class
     * @access   public
     * @param    array $rating
     * @param    int $class
     * @return   float
     **/
    public function GetMRCoefficient($rating, $class) {
        if(!is_array($rating)) {
            return 1;
        }
        $ratingkey = array_keys($rating);
        if(!isset($ratingkey[33 + $class]) || !isset($rating[$ratingkey[33 + $class]])) {
            return 1;
        }
        $c = $rating[$ratingkey[33 + $class]];
        if($c == 0) {
            $c = 1;
        }
        return $c;
    }
    
    /**
     * Returns Skill ID that required for Item $id
     * @category Utils class
     * @access   public
     * @param    int $id
     * @return   int
     **/
    public function GetSkillIDFromItemID($id) {
        if($id == 0) {
            return SKILL_UNARMED;
        }
        $item = DB::World()->selectRow("SELECT `class`, `subclass` FROM `item_template` WHERE `entry`=%d LIMIT 1", $id);
        if(!$item) {
            return SKILL_UNARMED;
        }
        if($item['class'] != ITEM_CLASS_WEAPON) {
            return SKILL_UNARMED;
        }
        switch ($item['subclass']) {
            case  0: return SKILL_AXES;
            case  1: return SKILL_TWO_HANDED_AXE;
            case  2: return SKILL_BOWS;
            case  3: return SKILL_GUNS;
            case  4: return SKILL_MACES;
            case  5: return SKILL_TWO_HANDED_MACES;
            case  6: return SKILL_POLEARMS;
            case  7: return SKILL_SWORDS;
            case  8: return SKILL_TWO_HANDED_SWORDS;
            case 10: return SKILL_STAVES;
            case 13: return SKILL_FIST_WEAPONS;
            case 15: return SKILL_DAGGERS;
            case 16: return SKILL_THROWN;
            case 18: return SKILL_CROSSBOWS;
            case 19: return SKILL_WANDS;
        }
        return SKILL_UNARMED;
    }
    
    /**
     * Returns skill info for skill $id
     * @category Utils class
     * @access   public
     * @param    int $id
     * @param    array $char_data
     * @return   array
     **/
    public function GetSkillInfo($id, $char_data) {
        $skillInfo = array(0, 0 , 0, 0, 0, 0);
        for ($i = 0; $i < 128; $i++) {
            if(($char_data[PLAYER_SKILL_INFO_1_1 + ($i * 3)] & 0x0000FFFF) == $id) {
                $data0 = $char_data[PLAYER_SKILL_INFO_1_1 + ($i * 3)];
                $data1 = $char_data[PLAYER_SKILL_INFO_1_1 + ($i * 3) + 1];
                $data2 = $char_data[PLAYER_SKILL_INFO_1_1 + ($i * 3) + 2];
                $skillInfo[0]=$data0&0x0000FFFF; // skill id
                $skillInfo[1]=$data0>>16;        // skill flag
                $skillInfo[2]=$data1&0x0000FFFF; // skill
                $skillInfo[3]=$data1>>16;        // max skill
                $skillInfo[4]=$data2&0x0000FFFF; // pos buff
                $skillInfo[5]=$data2>>16;        // neg buff
                break;
            }
        }
        return $skillInfo;
    }
    
    public function GetMoneyFormat($amount) {
        $money_format['gold'] = floor($amount/(100*100));
        $amount = $amount-$money_format['gold']*100*100;
        $money_format['silver'] = floor($amount/100);
        $amount = $amount-$money_format['silver']*100;
        $money_format['copper'] = floor($amount);
        return $money_format;
    }
    
    /**
     * Replace special symbols in $text.
     * @category Utils class
     * @access   public
     * @param    string $text.
     * @return   string
     **/
    public function ValidateSpellText($text) {
        $letter = array("'",'"'     ,"<"   ,">"   ,">"   ,"\r","\n"  , "\n"    , "\n"   );
        $values = array("`",'&quot;',"&lt;","&gt;","&gt;",""  ,"<br>", "<br />", "<br/>");
        return str_replace($letter, $values, $text);
    }
    
    /**
     * Converts seconds to day/hour/minutes format.
     * @category Utils class
     * @access   public
     * @param    int $seconds
     * @return   string
     **/
    public function GetTimeText($seconds) {
        $strings_array = array(
            'en' => array(
                'days', 'hours', 'min', 'sec'
            ),
            'ru' => array(
                'дней', 'часов', 'мин', 'сек'
            )
        );
        if(WoW_Locale::GetLocale() == 'en' || WoW_Locale::GetLocale() == 'ru') {
            $preferLocale = $strings_array[WoW_Locale::GetLocale()];
        }
        else {
            $preferLocale = $strings_array['en'];
        }
        $text = null;
        if($seconds >=24*3600) {
            $text .= intval($seconds / (24 * 3600)) . ' ' . $preferLocale[0];
            if($seconds %= 24 * 3600) {
                $text .= ' ';
            }
        }
        if($seconds >= 3600) {
            $text .= intval($seconds / 3600) . ' ' . $preferLocale[1];
            if($seconds %= 3600) {
                $text .= ' ';
            }
        }
        if($seconds >= 60) {
            $text .= intval($seconds / 60).' ' . $preferLocale[2];
            if($seconds %= 60) {
                $text .= ' ';
            }
        }
        if($seconds > 0) {
            $text .= $seconds.' '.  $preferLocale[3];
        }
        return $text;
    }
    
    /**
     * Returns spell radius.
     * @category Utils class
     * @access   public
     * @param    int $index
     * @return   string
     **/
    public function GetRadius($index) {
        $gSpellRadiusIndex = array(
             '7' => array(2,0,2),
             '8' => array(5,0,5),
             '9' => array(20,0,20),
            '10' => array(30,0,30),
            '11' => array(45,0,45),
            '12' => array(100,0,100),
            '13' => array(10,0,10),
            '14' => array(8,0,8),
            '15' => array(3,0,3),
            '16' => array(1,0,1),
            '17' => array(13,0,13),
            '18' => array(15,0,15),
            '19' => array(18,0,18),
            '20' => array(25,0,25),
            '21' => array(35,0,35),
            '22' => array(200,0,200),
            '23' => array(40,0,40),
            '24' => array(65,0,65),
            '25' => array(70,0,70),
            '26' => array(4,0,4),
            '27' => array(50,0,50),
            '28' => array(50000,0,50000),
            '29' => array(6,0,6),
            '30' => array(500,0,500),
            '31' => array(80,0,80),
            '32' => array(12,0,12),
            '33' => array(99,0,99),
            '35' => array(55,0,55),
            '36' => array(0,0,0),
            '37' => array(7,0,7),
            '38' => array(21,0,21),
            '39' => array(34,0,34),
            '40' => array(9,0,9),
            '41' => array(150,0,150),
            '42' => array(11,0,11),
            '43' => array(16,0,16),
            '44' => array(0.5,0,0.5),
            '45' => array(10,0,10),
            '46' => array(5,0,10),
            '47' => array(15,0,15),
            '48' => array(60,0,60),
            '49' => array(90,0,90)
        );
        if(!isset($gSpellRadiusIndex[$index])) {
            return false;
        }
        $radius = @$gSpellRadiusIndex[$index];
        if($radius == 0) {
            return false;
        }
        if($radius[0] == 0 || $radius[0] == $radius[2]) {
            return $radius[2];
        }
        return $radius[0] . ' - ' . $radius[2];
    }
    
    public function AnalyzeLocales($loc1, $loc2, $returnAsText = false) {
        if(!file_exists(WOW_DIRECTORY . '/includes/locales/locale_' . $loc1 . '.php') || !file_exists(WOW_DIRECTORY . '/includes/locales/locale_' . $loc2 . '.php')) {
            return false;
        }
        include(WOW_DIRECTORY . '/includes/locales/locale_' . $loc1 . '.php');
        $locale1 = $WoW_Locale;
        include(WOW_DIRECTORY . '/includes/locales/locale_' . $loc2 . '.php');
        $locale2 = $WoW_Locale;
        $text = '';
        foreach($locale1 as $index => $value) {
            if(!isset($locale2[$index])) {
                if(!$returnAsText) {
                    WoW_Log::WriteError('%s : locale %s does not have "%s" index (%s value: <code>"%s"</code>).', __METHOD__, $loc2, $index, $loc1, str_replace(array('<', '>'), array('&lt;', '&gt;'), $value));
                }
                else {
                    $text .= sprintf('Locale <strong>%s</strong> does not have <strong>"%s"</strong> index (%s value: <code>"%s"</code>).<br />', $loc2, $index, $loc1, str_replace(array('<', '>'), array('&lt;', '&gt;'), $value));
                }
            }
        }
        foreach($locale2 as $index => $value) {
            if(!isset($locale1[$index])) {
                if(!$returnAsText) {
                    WoW_Log::WriteError('%s : locale %s does not have "%s" index (%s value: <code>"%s"</code>).', __METHOD__, $loc1, $index, $loc2, str_replace(array('<', '>'), array('&lt;', '&gt;'), $value));
                }
                else {
                    $text .= sprintf('Locale <strong>%s</strong> does not have <strong>"%s"</strong> index (%s value: <code>"%s"</code>).<br />', $loc1, $index, $loc2, str_replace(array('<', '>'), array('&lt;', '&gt;'), $value));
                }
            }
        }
        return $returnAsText ? $text : true;
    }
    
    public function GetAppropriateItemClassForClassID($classID) {
        switch($classID) {
            case CLASS_MAGE:
            case CLASS_PRIEST:
            case CLASS_WARLOCK:
                return WoW_Locale::GetString('armor_cloth');
            case CLASS_ROGUE:
            case CLASS_DRUID:
                return WoW_Locale::GetString('armor_leather');
            case CLASS_HUNTER:
            case CLASS_SHAMAN:
                return WoW_Locale::GetString('armor_mail');
            default:
                return WoW_Locale::GetString('armor_plate');
        }
    }
    
    public function IsBossCreature(&$data) {
        if($data['classification'] == 3) {
            return true;
        }
        if($data['KillCredit1'] > 0) {
            $kc_entry = $data['KillCredit1'];
        }
        elseif($data['KillCredit2'] > 0) {
            $kc_entry = $data['KillCredit2'];
        }
        else {
            $kc_entry = 0;
        }
        $entries = array($data['id'], $kc_entry);
        return DB::WoW()->selectCell("SELECT 1 FROM `DBPREFIX_instance_data` WHERE `id` IN (%s) OR `name_id` IN (%s) OR `lootid_1` IN (%s) OR `lootid_2` IN (%s) OR `lootid_3` IN (%s) OR `lootid_4` IN (%s)", $entries, $entries, $entries, $entries, $entries, $entries);
    }
    
    public function GetBossName(&$data) {
        if($data['KillCredit1'] > 0) {
            $kc_entry = $data['KillCredit1'];
        }
        elseif($data['KillCredit2'] > 0) {
            $kc_entry = $data['KillCredit2'];
        }
        else {
            $kc_entry = 0;
        }
        $entries = array($data['id'], $kc_entry);
        return DB::WoW()->selectCell("SELECT `name_%s` FROM `DBPREFIX_instance_data` WHERE `id` IN (%s) OR `name_id` IN (%s) OR `lootid_1` IN (%s) OR `lootid_2` IN (%s) OR `lootid_3` IN (%s) OR `lootid_4` IN (%s) LIMIT 1", WoW_Locale::GetLocale(), $entries, $entries, $entries, $entries, $entries, $entries);
    }
    
    public function GenerateLootPercent($boss_id, $db_table, $item_id) {
        $allowed_tables = array(
            'creature_loot_template'   => true,
            'disenchant_loot_template' => true,
            'fishing_loot_template'    => true,
            'gameobject_loot_template' => true,
            'item_loot_template'       => true,
            'reference_loot_template'  => true
        );
        if(!isset($allowed_tables[$db_table])) {
            return 0;
        }
        $lootTable = DB::WoW()->select("SELECT `ChanceOrQuestChance`, `groupid`, `mincountOrRef`, `item` FROM `%s` WHERE `entry`=%d", $db_table, $boss_id);
        if(!$lootTable) {
            return 0;
        }
        $percent = 0;
        foreach($lootTable as $loot) {
            if($loot['ChanceOrQuestChance'] > 0 && $loot['item'] == $item_id) {
                $percent = $loot['ChanceOrQuestChance'];
            }
            elseif($loot['ChanceOrQuestChance'] == 0 && $loot['item'] == $item_id) {
                $current_group = $loot['groupid'];
                $percent = 0;
                $i = 0;
                foreach($lootTable as $tLoot) {
                    if($tLoot['groupid'] == $current_group) {
                        if($tLoot['ChanceOrQuestChance'] > 0) {
                            $percent += $tLoot['ChanceOrQuestChance'];
                        }
                        else {
                            $i++;
                        }
                    }
                }
                $percent = round((100 - $percent) / $i, 3);
            }
        }
        return $percent;
    }
    
    public function GetDropRate($percent) {
        if($percent == 100) {
            return 6;
        }
        elseif($percent > 51) {
            return 5;
        }
        elseif($percent > 25) {
            return 4;
        }
        elseif($percent > 15) {
            return 3;
        }
        elseif($percent > 3) {
            return 2;
        }
        elseif($percent > 0 && $percent < 1) {
            return 1;
        }
        elseif($percent <= 0) {
            return 0;
        }
    }
    
    public function GetNpcAreaInfo($entry) {
        $npc_coordinates = DB::World()->selectRow("SELECT `guid`, `map`, `position_x`, `position_y` FROM `creature` WHERE `id` = %d LIMIT 1", $entry);
        if(!is_array($npc_coordinates)) {
            WoW_Log::WriteLog('%s : creature #%d was not found in `creature` table!', __METHOD__, $entry);
            return false;
        }
        $area_data = DB::WoW()->selectRow("
        SELECT
        `a`.`id`,
        `a`.`area`,
        `b`.`name_en` AS `areaName_original`,
        `b`.`name_%s` AS `areaName_locale`
        FROM `DBPREFIX_zones` AS `a`
        JOIN `DBPREFIX_areas` AS `b` ON `b`.`id` = `a`.`area`
        WHERE `a`.`map` = %d AND `a`.`y_min` >= %d AND `a`.`y_max` <= %d AND `a`.`x_min` >= %d AND `a`.`x_max` <= %d
        LIMIT 1", WoW_Locale::GetLocale(), $npc_coordinates['map'], $npc_coordinates['position_y'], $npc_coordinates['position_y'], $npc_coordinates['position_x'], $npc_coordinates['position_x']);
        if(!is_array($area_data)) {
            WoW_Log::WriteLog('%s : area data for creature #%d (GUID: %d) was not found!', __METHOD__, $entry, $npc_coordinates['guid']);
            return false;
        }
        return array(
            'entry' => $entry,
            'guid'  => $npc_coordinates['guid'],
            'mapID' => $npc_coordinates['map'],
            'zoneID' => $area_data['id'],
            'areaID' => $area_data['area'],
            'zoneName' => $area_data['areaName_original'],
            'zoneName_loc' => $area_data['areaName_locale'],
            'pos_x' => $npc_coordinates['position_x'],
            'pos_y' => $npc_coordinates['position_y']
        );
    }
}
?>