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

Class WoW_Quests extends WoW_Abstract {
    private static $m_quests = array();
    private static $m_quest = array();
    private static $m_quest_category = 0;
    private static $m_quest_type = 0;
    
    public static function InitPage($page_type, $category) {
        if(!in_array($page_type, array('quests', 'quest'))) {
            WoW_Log::WriteError('%s : wrong page type (%s)!', __METHOD__, $page_type);
            return false;
        }
        WoW_Template::SetPageData('breadcrumb', '0,3');
        switch($page_type) {
            case 'quests':
                self::ExtractCategory($page_type, $category, self::$m_quest_type, self::$m_quest_category);
                self::LoadQuests();
                self::HandleQuests();
                break;
            case 'quest':
                self::$m_id = (int) $category;
                self::LoadQuest();
                self::HandleQuest();
                break;
        }
    }
    
    private static function LoadQuests() {
        self::$m_quests = DB::World()->select("
        SELECT
        `a`.`entry`,
        `a`.`Title`,
        `a`.`MinLevel`,
        `a`.`QuestLevel`,
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
        `a`.`RewOrReqMoney`,
        `a`.`RewXPId`,
        %s
        FROM `quest_template` AS `a`
        %s
        LIMIT 200
        ",
            WoW_Locale::GetLocaleID() != LOCALE_EN ? '`b`.`Title_loc' . WoW_Locale::GetLocaleID() . '` AS `Title_loc`' : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_quest` AS `b` ON `b`.`entry` = `a`.`entry`' : null
        );
    }
    
    private static function LoadQuest() {
        self::$m_quest = DB::World()->selectRow("
        SELECT
        `a`.*,
        %s
        FROM `quest_template` AS `a`
        %s
        WHERE `a`.`entry` = %d LIMIT 1
        ", 
            WoW_Locale::GetLocaleID() != LOCALE_EN ? sprintf('
                `b`.`Title_loc%d`            AS `Title_loc`,
                `b`.`Details_loc%d`          AS `Details_loc`,
                `b`.`Objectives_loc%d`       AS `Objectives_loc`,
                `b`.`OfferRewardText_loc%d`  AS `OfferRewardText_loc`,
                `b`.`RequestItemsText_loc%d` AS `RequestItemsText_loc`,
                `b`.`EndText_loc%d`          AS `EndText_loc`,
                `b`.`CompletedText_loc%d`    AS `CompletedText_loc`,
                `b`.`ObjectiveText1_loc%d`   AS `ObjectiveText1_loc`,
                `b`.`ObjectiveText2_loc%d`   AS `ObjectiveText2_loc`,
                `b`.`ObjectiveText3_loc%d`   AS `ObjectiveText3_loc`,
                `b`.`ObjectiveText4_loc%d`   AS `ObjectiveText4_loc`',
                WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID(),
                WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID() ,WoW_Locale::GetLocaleID(),
                WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID(),
                WoW_Locale::GetLocaleID(), WoW_Locale::GetLocaleID()
            ) : 'NULL',
            WoW_Locale::GetLocaleID() != LOCALE_EN ? 'LEFT JOIN `locales_quest` AS `b` ON `b`.`entry` = `a`.`entry`' : null,
            self::GetID()
        );
    }
    
    private static function HandleQuests() {
        if(!self::$m_quests) {
            return false;
        }
        $quests = array();
        $items = array();
        foreach(self::$m_quests as $quest) {
            // Generate item ids
            for($i = 1; $i < 7; $i++) {
                if($i < 5) {
                    if(!in_array($quest['RewItemId' . $i], $items)) {
                        $items[] = $quest['RewItemId' . $i];
                    }
                }
                if(!in_array($quest['RewChoiceItemId' . $i], $items)) {
                    $items[] = $quest['RewChoiceItemId' . $i];
                }
            }
            if(WoW_Locale::GetLocaleID() != LOCALE_EN && isset($quest['Title_loc']) && $quest['Title_loc'] != null) {
                $quest['Title'] = $quest['Title_loc'];
            }
            $quests[] = $quest;
        }
        $items_info = WoW_Items::GetBasicItemInfo($items);
        self::$m_quests = array(
            'items' => $items_info,
            'quests' => $quests
        );
        unset($quests, $quest, $items, $items_info);
    }
    
    private static function HandleQuest() {
        if(!self::$m_quest) {
            return false;
        }
        $fields_to_locale = array(
            'Title', 'Details', 'Objectives', 'OfferRewardText', 'RequestItemsText',
            'EndText', 'CompletedText', 'ObjectiveText1', 'ObjectiveText2', 'ObjectiveText3', 'ObjectiveText4'
        );
        if(WoW_Locale::GetLocaleID() != LOCALE_EN) {
            // Try to set localized fields
            foreach($fields_to_locale as $field) {
                if(isset(self::$m_quest[$field . '_loc']) && self::$m_quest[$field . '_loc'] != null) {
                    self::$m_quest[$field] = self::$m_quest[$field . '_loc'];
                }
            }
        }
        // Related items
        $items = array();
        $rewardItems = array();
        $choiceItems = array();
        $rewItemData = array();
        $choiceItemData = array();
        // Find items
        for($i = 1; $i < 7; ++$i) {
            if($i < 5) {
                if(!in_array(self::$m_quest['RewItemId' . $i], $items)) {
                    $items[self::$m_quest['RewItemId' . $i]] = self::$m_quest['RewItemId' . $i];
                    $rewardItems[] = array(
                        'itemId' => self::$m_quest['RewItemId' . $i],
                        'count'  => self::$m_quest['RewItemCount' . $i]
                    );
                }
            }
            if(!in_array(self::$m_quest['RewChoiceItemId' . $i], $items)) {
                $items[self::$m_quest['RewChoiceItemId' . $i]] = self::$m_quest['RewChoiceItemId' . $i];
                $choiceItems[] = array(
                    'itemId' => self::$m_quest['RewChoiceItemId' . $i],
                    'count'  => self::$m_quest['RewChoiceItemCount' . $i]
                );
            }
        }
        // Load basic items info for reward items
        if(is_array($rewardItems)) {
            $ids = array();
            foreach($rewardItems as $it) {
                if(!in_array($it['itemId'], $ids)) {
                    $ids[] = $it['itemId'];
                }
            }
            $rewItemData = WoW_Items::GetBasicItemInfo($ids);
        }
        // Load basic items info for choice reward items
        if(is_array($choiceItems)) {
            $ids = array();
            foreach($choiceItems as $it) {
                if(!in_array($it['itemId'], $ids)) {
                    $ids[] = $it['itemId'];
                }
            }
            $choiceItemData = WoW_Items::GetBasicItemInfo($ids);
        }
        
        self::$m_quest['ReceiveRewardText'] = array('text' => '', 'script' => '');
        self::$m_quest['ChoiceRewardText']  = array('text' => '', 'script' => '');
        
        $rewMoney = self::$m_quest['RewOrReqMoney'] > 0 ? self::$m_quest['RewOrReqMoney'] : 0;
        if($rewMoney > 0) {
            $isRecieve = true;
            $money = WoW_Utils::GetMoneyFormat($rewMoney);
            self::$m_quest['ReceiveRewardText']['text'] .= sprintf('%s%s%s',
                $money['gold'] > 0 ? sprintf('<span class="moneygold">%d</span> ', $money['gold']) : null,
                $money['silver'] > 0 ? sprintf('<span class="moneysilver">%d</span> ', $money['silver']) : null,
                $money['copper'] > 0 ? sprintf('<span class="moneycopper">%d</span> ', $money['copper']) : null
            );
        }
        $item_to_add = array(
            array(
                'field' => 'ReceiveRewardText',
                'var'   => $rewItemData
            ),
            array(
                'field' => 'ChoiceRewardText',
                'var'   => $choiceItemData
            )
        );
        // Generate rewards text
        foreach($item_to_add as $item) {
            if(is_array($item['var']) && sizeof($item['var']) > 0) {
                self::$m_quest[$item['field']]['text'] .= '<table class="icontab icontab-box">';
                $i = 0;
                $item_icon = 1;
                $tr_opened = false;
                $tr_closed = true;
                foreach($item['var'] as $it) {
                    if($i == 2) {
                        self::$m_quest[$item['field']]['text'] .= '</tr>';
                        $i = 0;
                        $tr_closed = true;
                        $tr_opened = false;
                    }
                    if($i == 0) {
                        self::$m_quest[$item['field']]['text'] .= '<tr>';
                        $tr_closed = false;
                        $tr_opened = true;
                    }
                    self::$m_quest[$item['field']]['text'] .= sprintf('<th id="icontab-icon%d"></th><td><span class="q%d"><a href="%s/item=%d">%s</a></span></td>',
                        $item_icon, $it['quality'], WoW::GetWoWPath(), $it['entry'], (WoW_Locale::GetLocaleID() != LOCALE_EN && isset($it['name_loc']) && $it['name_loc'] != null) ? $it['name_loc'] : $it['name']
                    );
                    self::$m_quest[$item['field']]['script'] .= sprintf('$WH.ge(\'icontab-icon%d\').appendChild(g_items.createIcon(%d, 1, 1));', $item_icon, $it['entry']);
                    ++$i;
                    ++$item_icon;
                }
                if($tr_opened && !$tr_closed) {
                    self::$m_quest[$item['field']]['text'] .= '</tr>';
                }
                self::$m_quest[$item['field']]['text'] .= '</table>';
            }
        }
        $items_info = array_merge($rewItemData, $choiceItemData); // If any item found
        
        // Find quest in achievement criterias
        $achievements_cr = DB::World()->select("
        SELECT
        `a`.`referredAchievement`,
        `b`.`id`,
        `b`.`factionFlag` AS `side`,
        `b`.`name_en` AS `name_original`,
        `b`.`name_%s` AS `name_loc`,
        `b`.`desc_en` AS `desc_original`,
        `b`.`desc_%s` AS `desc_loc`,
        `b`.`categoryId`,
        `b`.`iconID`,
        `b`.`points`,
        `c`.`icon`,
        `d`.`parentCategory`,
        `d`.`name_en` AS `categoryName_original`,
        `d`.`name_%s` AS `categoryName_loc`
        FROM `DBPREFIX_achievement_criteria` AS `a`
        LEFT JOIN `DBPREFIX_achievement` AS `b` ON `b`.`id` = `a`.`referredAchievement`
        LEFT JOIN `DBPREFIX_spell_icon` AS `c` ON `c`.`id` = `b`.`iconID`
        LEFT JOIN `DBPREFIX_achievement_category` AS `d` ON `d`.`id` = `b`.`categoryId`
        WHERE `a`.`requiredType` = 27 AND `a`.`data` = %d
        ",
            WoW_Locale::GetLocale(),
            WoW_Locale::GetLocale(),
            WoW_Locale::GetLocale(),
            self::GetID()
        );
        $achievements = array();
        if($achievements_cr) {
            $achievements = array();
            foreach($achievements_cr as $ach) {
                $ach['name'] = (WoW_Locale::GetLocaleID() != LOCALE_EN && isset($ach['name_loc']) && $ach['name_loc'] != null) ? $ach['name_loc'] : $ach['name_original'];
                $ach['desc'] = (WoW_Locale::GetLocaleID() != LOCALE_EN && isset($ach['desc_loc']) && $ach['desc_loc'] != null) ? $ach['desc_loc'] : $ach['desc_original'];
                $ach['categoryName'] = (WoW_Locale::GetLocaleID() != LOCALE_EN && isset($ach['categoryName_loc']) && $ach['categoryName_loc'] != null) ? $ach['categoryName_loc'] : $ach['categoryName_original'];
                $achievements[] = array(
                    'id' => $ach['id'],
                    'name' => $ach['name'],
                    'desc' => $ach['desc'],
                    'categoryName' => $ach['categoryName'],
                    'categoryId' => $ach['categoryId'],
                    'icon' => $ach['icon'],
                    'points' => $ach['points'],
                    'side' => $ach['side'],
                    'parentCategory' => $ach['parentCategory']
                );
            }
            unset($achievements_cr, $ach);
        }
        
        // Set page title
        WoW_Template::SetPageData('quest_name', self::$m_quest['Title']);
        
        $quest = self::$m_quest;
        self::$m_quest = array(
            'items' => $items_info,
            'quest' => $quest,
            'achievements' => $achievements
        );
        unset($quest, $items, $items_info);
    }
    
    public static function GetQuests() {
        return self::$m_quests;
    }
    
    public static function GetTotalQuestsCount() {
        return DB::World()->selectCell("SELECT COUNT(*) FROM `quest_template`");
    }
    
    public static function GetQuest() {
        return self::$m_quest;
    }
}

?>