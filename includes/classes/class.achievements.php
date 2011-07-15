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

Class WoW_Achievements extends WoW_Abstract {
    private static $m_achievements = array();
    private static $m_achievement = array();
    private static $m_achievement_category = 0;
    private static $m_achievement_type = 0;
    
    public static function InitPage($page_type, $category) {
        if(!in_array($page_type, array('achievements', 'achievement'))) {
            WoW_Log::WriteError('%s : wrong page type (%s)!', __METHOD__, $page_type);
            return false;
        }
        WoW_Template::SetPageData('breadcrumb', '0,9');
        switch($page_type) {
            case 'achievements':
                self::ExtractCategory($page_type, $category, self::$m_achievement_type, self::$m_achievement_category);
                self::LoadAchievements();
                self::HandleAchievements();
                break;
            case 'achievement':
                self::$m_id = (int) $category;
				if(self::IsPower()) {
					self::GetPower();
				}
                self::LoadAchievement();
                self::HandleAchievement();
                break;
        }
        return true;
    }
    
    private static function LoadAchievement() {
        // Load achievement
        self::$m_achievement = DB::World()->selectRow("
        SELECT
        a.*,
        b.parentCategory,
        c.icon
        FROM DBPREFIX_achievement AS a
        LEFT JOIN DBPREFIX_achievement_category AS b ON b.id = a.categoryId
        LEFT JOIN DBPREFIX_spell_icon AS c ON c.id = a.iconID
        WHERE a.id = %d", self::GetID());
        if(!self::$m_achievement) {
            WoW_Template::ErrorPage(404, 'achievement');
            return false;
        }
        // Load criterias (if exists)
        self::$m_achievement['criterias'] = DB::World()->select("SELECT * FROM DBPREFIX_achievement_criteria WHERE referredAchievement = %d", self::$m_achievement['id']);
    }
    
    private static function LoadAchievements() {
        self::$m_achievements = DB::World()->select("
        SELECT
        `a`.`id`,
        `a`.`factionFlag` AS `side`,
        `a`.`name_%s` AS `name`,
        `a`.`desc_%s` AS `desc`,
        `a`.`categoryId`,
        `a`.`points`,
        `a`.`iconID`,
        `a`.`titleReward_%s` AS `titleReward`,
        `b`.`icon`,
        `c`.`parentCategory`
        FROM `DBPREFIX_achievement` AS `a`
        LEFT JOIN `DBPREFIX_spell_icon` AS `b` ON `b`.`id` = `a`.`iconID`
        LEFT JOIN `DBPREFIX_achievement_category` AS `c` ON `c`.`id` = `a`.`categoryId`
        %s
        LIMIT 200", WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), self::$m_achievement_category > 0 ? 'WHERE `a`.`categoryId` = ' . self::$m_achievement_category : null);
        // Set count
        self::$m_count = DB::World()->selectCell("SELECT COUNT(*) FROM `DBPREFIX_achievement`%s", self::$m_achievement_category > 0 ? 'WHERE `categoryId` = ' . self::$m_achievement_category : null);
    }
    
    private static function HandleAchievements() {
        if(!is_array(self::$m_achievements)) {
            return false;
        }
        $achievements = array();
        foreach(self::$m_achievements as $ach) {
            if($ach['parentCategory'] == 1) {
                $ach['type'] = 2;
            }
            else {
                $ach['type'] = 1;
            }
            $achievements[] = $ach;
        }
        self::$m_achievements = $achievements;
        unset($achievements, $ach);
    }
    
    private static function HandleAchievement() {
        if(!is_array(self::$m_achievement)) {
            return false;
        }
        $ach = &self::$m_achievement;
        $ach['name'] = $ach['name_' . WoW_Locale::GetLocale()];
        $ach['desc'] = $ach['desc_' . WoW_Locale::GetLocale()];
        $ach['titleReward'] = $ach['titleReward_' . WoW_Locale::GetLocale()];
        WoW_Template::SetPageData('db_page_title', $ach['name'] . ' - ');
        if($ach['parentCategory'] == 1) {
            $ach['type'] = 2;
        }
        else {
            $ach['type'] = 1;
        }
        // Check titleReward
        if($ach['titleReward'] != null) {
            // Check rewards (item or title)
            $rewards = DB::World()->selectRow("SELECT * FROM achievement_reward WHERE entry = %d", $ach['id']);
            if(is_array($rewards)) {
                // Item?
                $ach['titleReward'] = array();
                if($rewards['item'] > 0) {
                    $ach['titleReward'][] = array('type' => 'item', 'data' => WoW_Items::GetBasicItemInfo($rewards['item']));
                }
                if($rewards['title_A'] > 0 || $rewards['title_H'] > 0) {
                    $ach['titleReward'][] = array('type' => 'title', 'data' => DB::World()->select("SELECT id, title_M_%s AS title FROM DBPREFIX_titles WHERE id IN (%s)", WoW_Locale::GetLocale(), array($rewards['title_A'], $rewards['title_H'])));
                }
            }
        }
        else {
            $ach['titleReward'] = array();
        }
        WoW_Template::SetPageData('breadcrumb', '0,9,' . $ach['categoryId']);
        if(is_array($ach['criterias'])) {
            // CRITERA STRING SHOULD BE GENERATED HERE, NOT IN VIEW!
            foreach($ach['criterias'] as &$cr) {
                $cr['name'] = $cr['name_' . WoW_Locale::GetLocale()];
                $cr['criteria_string'] = $cr['name'];
                switch($cr['requiredType']) {
                    case ACHIEVEMENT_CRITERIA_TYPE_KILL_CREATURE:
                        $cr['criteria_string'] = '<a href="' . WoW::GetWoWPath() . '/npc=' . $cr['data'] . '">' . WoW_NPCs::GetNPCInfo($cr['data'], 'name') . '</a> ' . WoW_Locale::GetString('template_achievement_slain');
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_COMPLETE_ACHIEVEMENT:
                        $cr['criteria_string'] = '<a href="' . WoW::GetWoWPath() . '/achievement=' . $cr['data'] . '">' . self::GetAchievementInfo($cr['data'], 'name') . '</a>';
                        //$cr['data_achievement'] = self::GetBasicAchievementInfo($cr['data']);
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_LEARN_SPELL:
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_OWN_ITEM:
                    case ACHIEVEMENT_CRITERIA_TYPE_USE_ITEM:
                    case ACHIEVEMENT_CRITERIA_TYPE_LOOT_ITEM:
                    case ACHIEVEMENT_CRITERIA_TYPE_EQUIP_EPIC_ITEM:
                    case ACHIEVEMENT_CRITERIA_TYPE_EQUIP_ITEM:
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_LEARN_SKILL_LEVEL:
                    case ACHIEVEMENT_CRITERIA_TYPE_REACH_SKILL_LEVEL:
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_CAST_SPELL:
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_COMPLETE_QUEST:
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_GAIN_REPUTATION:
                        break;
                    case ACHIEVEMENT_CRITERIA_TYPE_GAIN_EXALTED_REPUTATION:
                        break;
                }
            }
        }
    }
    
    public static function GetType() {
        return self::$m_achievement_type;
    }
    
    public static function GetCategoryId() {
        return self::$m_achievement_category;
    }
    
    public static function GetAchievementId() {
        return self::$m_id;
    }
    
    public static function GetAchievement() {
        return self::$m_achievement;
    }
    
    public static function GetAchievements() {
        return self::$m_achievements;
    }
    
    public static function GetBasicAchievementInfo($id) {
        if(is_array($id)) {
            return DB::World()->select("
            SELECT
            a.id,
            a.name_%s AS name,
            a.desc_%s AS desc,
            a.points,
            a.categoryId,
            a.titleReward_%s AS titleReward,
            b.name_%s AS categoryName,
            b.parentCategory,
            c.icon
            FROM DBPREFIX_achievement AS a
            LEFT JOIN DBPREFIX_achievement_category AS b ON b.id = a.categoryId,
            LEFT JOIN DBPREFIX_spell_icon AS c ON c.id = a.iconID
            WHERE a.id IN (%s)", WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), $id);
        }
        else {
            return DB::World()->selectRow("
            SELECT
            a.id,
            a.name_%s AS name,
            a.desc_%s AS desc,
            a.points,
            a.categoryId,
            a.titleReward_%s AS titleReward,
            b.name_%s AS categoryName,
            b.parentCategory,
            c.icon
            FROM DBPREFIX_achievement AS a
            LEFT JOIN DBPREFIX_achievement_category AS b ON b.id = a.categoryId,
            LEFT JOIN DBPREFIX_spell_icon AS c ON c.id = a.iconID
            WHERE a.id = %d", WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), WoW_Locale::GetLocale(), $id);
        }
    }
    
    public static function GetAchievementInfo($id, $type) {
        switch($type) {
            case 'name':
                return DB::World()->selectCell("SELECT `name_%s` FROM `DBPREFIX_achievement` WHERE `id` = %d", WoW_Locale::GetLocale(), $id);
        }
    }
    
    private static function GenerateTooltip() {
        $tooltip = '<table><tr><td><b class="q">' . self::$m_achievement['name'] . '</b></td></tr></table><table><tr><td><br />' . self::$m_achievement['desc'] . '<br />';
        if(is_array(self::$m_achievement['criterias']) && count(self::$m_achievement['criterias']) > 0) {
            $tooltip .= '<br /><span class="q">' . WoW_Locale::GetString('template_achievement_criteria') . '</span><table width="100%"><tr>';
            $toggle = 0;
			$started = false;
			$count = count(self::$m_achievement['criterias']);
			$limit = round($count / 2);
			$criterias_added = array();
            foreach(self::$m_achievement['criterias'] as &$cr) {
				if(in_array($cr['name'], $criterias_added)) {
					continue;
				}
				$criterias_added[] = $cr['name'];
                if($toggle == 0) {
                    $tooltip .= '<t' . (!$started ? 'd' : 'h') . ' class="q0" style="white-space: nowrap' . ($started ? '; text-align: left' : null) . '"><small>';
					if (!$started) {
						$started = true;
					}
                }
                $tooltip .= sprintf('<!--cr%d:%d:%d-->- %s<br />', $cr['id'], $cr['requiredType'], $cr['data'], $cr['name']);
                ++$toggle;
                if($toggle >= $limit) {
                    $tooltip .= '</small></t' . ($started ? 'd' : 'h') . '>';
                    $toggle = 0;
                }
            }
            if($toggle < $limit && $toggle != 0) {
                $tooltip .= '</small></td>';
            }
			$tooltip .= '</tr></table>';
        }
		$tooltip .= '</td></tr></table>';
		return str_replace("'", "\'", $tooltip);
    }
    
    private static function GetPower() {
        self::SetPowerLocale();
        self::LoadAchievement();
        self::HandleAchievement();
        header('Content-type: text/javascript');
        echo '$WowheadPower.registerAchievement(' . self::$m_achievement['id'] . ', 0, {' . "\n";
        echo '	name_enus: \'' . str_replace("'", "\'", self::$m_achievement['name']) . '\',' . "\n";
        echo '	icon: \'' . self::$m_achievement['icon'] . '\',' . "\n";
        echo '	tooltip_enus: \'' . self::GenerateTooltip() . '\'});';
        die;
    }
}
?>