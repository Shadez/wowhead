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
                self::LoadAchievement();
                self::HandleAchievement();
                break;
        }
        return true;
    }
    
    private static function LoadAchievement() {
        
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
}
?>