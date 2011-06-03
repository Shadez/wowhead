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

Class WoW {
    
    private static $m_filters = array();
    private static $m_action = null;
    private static $m_pageId = null;
    
    public static function InitWoW() {
        if(isset($_GET['error'])) {
            $errorCode = (int) $_GET['error'];
            if(in_array($errorCode, array(403, 404))) {
                if($errorCode == 404) {
                    WoW_Template::SetPageIndex('error');
                }
            }
        }
        self::ParseUrl();
    }
        
    private static function ParseUrl() {
        $request_uri = explode('/', $_SERVER['REQUEST_URI']);
        if(!is_array($request_uri)) {
            WoW_Template::SetPageIndex('error');
            return false;
        }
        $count = count($request_uri);
        $page_url = $request_uri[$count-1]; // required page
        $filtered_url = explode('?', $page_url);
        $page_id = '';
        if(is_array($filtered_url)) {
            // Extract sub info
            $sub_info = explode('=', $filtered_url[0]);
            if(is_array($sub_info) && isset($sub_info[1])) {
                self::SetPageAction($sub_info[1]); // ID or category filer
            }
            $page_id = $sub_info[0];
        }
        else {
            // "?" was not found. Try to find subinfo again.
            $sub_info = explode('=', $page_url);
            if(is_array($sub_info) && isset($sub_info[1])) {
                self::SetPageAction($sub_info[1]); //
                $page_id = $sub_info[0];
            }
            else {
                $page_id = $filtered_url[0];
            }
        }
        // PageID is in $page_id variable.
        self::SetPageID($page_id);
        // Run appropriate page
        self::RunWoW();
    }
    
    private static function SetPageID($page_id) {
        self::$m_pageId = $page_id;
    }
    
    public static function GetPageID() {
        return self::$m_pageId;
    }
    
    private static function SetPageAction($action) {
        self::$m_action = $action;
    }
    
    public static function GetPageAction() {
        return self::$m_action;
    }
    
    private static function RunWoW() {
       // echo self::GetPageID();
       // die;
        switch(self::GetPageID()) {
            /** Core section **/
            case 'data':
                self::InitData();
                break;
            /** Database section **/
            case 'achievements':
            case 'achievement':
                self::InitAchievements();
                break;
            case 'classes':
            case 'class':
                self::InitClasses();
                break;
            case 'currencies':
            case 'currency':
                self::InitCurrencies();
                break;
            case 'factions':
            case 'faction':
                self::InitFactions();
                break;
            case 'pets':
            case 'pet':
                self::InitPets();
                break;
            case 'itemsets':
            case 'itemset':
                self::InitItemSets();
                break;
            case 'items':
            case 'item':
                self::InitItems();
                break;
            case 'npcs':
            case 'npc':
                self::InitNPCs();
                break;
            case 'objects':
            case 'object':
                self::InitObjects();
                break;
            case 'skills':
            case 'skill':
                self::InitSkills();
                break;
            case 'quests':
            case 'quest':
                self::InitQuests();
                break;
            case 'races':
            case 'race':
                self::InitRaces();
                break;
            case 'spells':
            case 'spell':
                self::InitSpells();
                break;
            case 'titles':
            case 'title':
                self::InitTitles();
                break;
            case 'events':
            case 'event':
                self::InitWorldEvents();
                break;
            case 'zones':
            case 'zone':
                self::InitZones();
                break;
            /** Tools section **/
            case 'talent':
                self::InitTalentCalc();
                break;
            case 'petcalc':
                self::InitPetCalc();
                break;
            case 'filter':
                self::InitFilters();
                break;
            case 'compare':
            case 'profiler':
            case 'bluetracker':
            case 'maps':
            case 'guide':
            case 'patchnotes':
            /** Utilites **/
            case 'latest-achievements':
            case 'latest-additions':
            case 'latest-comments':
            case 'latest-screenshots':
            case 'latest-videos':
            case 'most-comments':
            case 'unrated-comments':
            case 'missing-screenshots':
            case 'random':
            case 'latest-replies':
            case 'latest-topics':
            case 'unanswered-topics':
            case 'latest-blog-comments':
                self::InitUtils();
                break;
            /** Community section **/
            case 'blog':
            case 'forums':
            case 'website-achievements':
            case 'contests':
            case 'xfire':
            case 'irc':
                self::InitCommunity();
                break;
            /** More section **/
            case 'aboutus':
            case 'advertise':
            case 'faq':
            case 'help':
            case 'jobs':
            case 'premium':
            case 'searchplugins':
            case 'logos':
            case 'whats-new':
            case 'client':
            case 'newsfeed':
            case 'searchbox':
            case 'tooltips':
            case 'home':
            case 'search':
                self::InitWebSite();
                break;
            /** Custom sections **/
            case 'error':
                WoW_Template::SetPageIndex('error');
                break;
            default:
                break;
        }
        if(WoW_Template::GetPageIndex() == null) {
            self::InitWebSite();
        }
        WoW_Template::SetPageData('page_url', self::GetPageID());
    }
    
    private static function InitAchievements() {
        self::AssignTemplatePageIndex(array('achievements', 'achievement'));
        WoW_Template::SetPageData('activeTab', 0);
        WoW_Achievements::InitPage(WoW_Template::GetPageIndex(), self::GetPageAction());
    }
    
    private static function InitClasses() {
        self::AssignTemplatePageIndex(array('classes', 'class'));
    }
    
    private static function InitCurrencies() {
        self::AssignTemplatePageIndex(array('currencies', 'currency'));
    }
    
    private static function InitFactions() {
        self::AssignTemplatePageIndex(array('factions', 'faction'));
    }
    
    public static function InitFilters() {
        if($_POST) {
            $filter_filters = null;
            foreach($_POST as $filterKey => $filterValue) {
                if(!$filterValue) {
                    continue;
                }
                $filter_filters .= $filterKey .= '=';
                if(is_array($filterValue)) {
                    $max = count($filterValue);
                    $current = 1;
                    foreach($filterValue as $val) {
                        $filter_filters .= $val;
                        if($current < $max) {
                            $filter_filters .= ':';
                        }
                    }
                    $filter_filters .= ';';
                }
                else {
                    $filter_filters .= $filterKey . '=' . $filterValue . ';';
                }
            }
            header('Location: ' . WoW::GetWoWPath() . '/' . self::GetPageID() . '?filter=' . $filter_filters);
            exit;
        }
        /*
            COMMON FILTERS:
                [na] => Name
                [si] => Side (1 - Alliance, -1 - Alliance only, 2 - Horde, -2 - Horde only, 3 - both)
                [cr] => CommonFilterID
                [crs] => FirstFilterValID
                [crv] => SecondFilterValID
            ITEM FILTERS:
                [sl] => SlotID
                [qu] => QualityID
                [minle] => MinItemLevel
                [maxle] => MaxItemLevel
                [minrl] => MinRequiredLevel
                [maxrl] => MaxRequiredLevel
                [ub] => UseableClassID
                [gt] => GetTypes
            ACHIEVEMENTS FILTERS:
                [minpt] => Min Points
                [maxpt] => Max Points
            QUESTS FILTERS:
                [minle] => MinQuestLevel
                [maxle] => MaxQuestLevel
            SPELLS FILTERS:
                [me] => MechanicID
                [dt] => DispellTypeID
                [sc] => SpellSchoolID
                [ra] => RaceID
            NPCS FILTERS:
                [ra] => ReactionAlliance
                [rh] => ReactionHorde
                [fa] => FamilyID
                [cl] => ClassificationID
            ITEMSET FILTERS:
                [ta] => ItemsetTag
                [ty] => ItemInventoryTypeID
        */
        WoW_Template::SetPageIndex('filters');
        if(!isset($_GET['filter'])) {
            return false;
        }
        // Try to explode
        $filter_items = explode(';', $_GET['filter']);
        if(!$filter_items) {
            return false;
        }
        $filter = array();
        foreach($filter_items as $item) {
            $current = explode('=', $item);
            if(!$current || !isset($current[1])) {
                continue;
            }
            $each = explode(':', $current[1]);
            if($each) {
                $temp = array(
                    'key' => $current[0],
                    'values' => array()
                );
                foreach($each as $value) {
                    $temp['values'][] = $value;
                }
            }
            else {
                $temp = array(
                    'key' => $current[0],
                    'values' => $current[1]
                );
            }
            $filter[] = $temp;
        }
        self::$m_filters = $filter;
        unset($filter, $item);
    }
    
    private static function InitPets() {
        self::AssignTemplatePageIndex(array('pets', 'pet'));
    }
    
    private static function InitItemSets() {
        self::AssignTemplatePageIndex(array('itemsets', 'itemset'));
    }
    
    private static function InitItems() {
        self::AssignTemplatePageIndex(array('items', 'item'));
        WoW_Template::SetPageData('activeTab', 0);
        WoW_Items::InitPage(WoW_Template::GetPageIndex(), self::GetPageAction());
    }
    
    private static function InitNPCs() {
        self::AssignTemplatePageIndex(array('npcs', 'npc'));
    }
    
    private static function InitObjects() {
        self::AssignTemplatePageIndex(array('objects', 'object'));
    }
    
    private static function InitSkills() {
        self::AssignTemplatePageIndex(array('skills', 'skill'));
    }
    
    private static function InitQuests() {
        self::AssignTemplatePageIndex(array('quests', 'quest'));
    }
    
    private static function InitRaces() {
        self::AssignTemplatePageIndex(array('races', 'race'));
    }
    
    private static function InitSpells() {
        self::AssignTemplatePageIndex(array('spells', 'spell'));
    }
    
    private static function InitTitles() {
        self::AssignTemplatePageIndex(array('titles', 'title'));
    }
    
    private static function InitWorldEvents() {
        self::AssignTemplatePageIndex(array('events', 'event'));
    }
    
    private static function InitZones() {
        self::AssignTemplatePageIndex(array('zones', 'zone'));
    }
    
    private static function InitTalentCalc() {
        WoW_Template::SetPageIndex('talentcalc');
    }
    
    private static function InitPetCalc() {
        WoW_Template::SetPageIndex('petcalc');
    }
    
    private static function InitCommunity() {
        WoW_Template::SetPageIndex('home'); // [PH]
    }
    
    private static function InitUtils() {
        WoW_Template::SetPageIndex('home'); // [PH]
    }
    
    private static function InitWebSite() {
        if(WoW_Template::GetPageIndex() == null) {
            // Prevent re-assigning PageIndex
            WoW_Template::SetPageIndex('home');
        }
        switch(self::GetPageID()) {
            case 'search':
                WoW_Search::InitPage('search', 0);
                break;
        }
    }
    
    private static function InitData() {
        WoW_Template::SetPageIndex('data');
        $js_contents = null;
        switch(self::GetPageAction()) {
            case 'spell-scaling':
            case 'item-scaling':
            case 'user':
                $js_contents = file_get_contents('data/' . self::GetPageAction() . '.js');
                break;
            case 'weight-presets.zones':
                $js_contents = file_get_contents('data/weight-presets.zones-' . WoW_Locale::GetLocaleID() . '.js');
                break;
        }
        WoW_Template::SetPageData('js-data', $js_contents); // Must be freed after using!
    }
    
    private static function AssignTemplatePageIndex($g_types) {
        WoW_Template::SetPageIndex(strpos(self::GetPageID(), $g_types[0]) !== false ? $g_types[0] : $g_types[1]);
    }
    
    public static function GetWoWPath() {
        return WoWConfig::$WoW_Path;
    }
    
    public static function GetStaticUrl() {
        return strpos(WoWConfig::$Static_Url, 'http:') !== false ? WoWConfig::$Static_Url : sprintf('http://%s%s', $_SERVER['SERVER_NAME'], WoWConfig::$Static_Url);
    }
    
    public static function GetUrl() {
        return sprintf('http://%s', self::GetDomain());
    }
    
    public static function GetDomain() {
        return sprintf('%s%s/', $_SERVER['SERVER_NAME'], WoWConfig::$WoW_Path);
    }
    
    public static function GetCurrentPageUrl() {
        return sprintf('%s%s', WoW::GetDomain(), WoW_Template::GetPageData('page_url'));
    }
    
    public static function GetSiteTitle() {
        return WoWConfig::$SiteTitle;
    }
    
    public static function GetFilters() {
        return self::$m_filters;
    }
    
    public static function IsRegisteredPage() {
        switch(WoW_Template::GetPageIndex()) {
            case 'achievements':
            case 'achievement':
            case 'classes':
            case 'class':
            case 'currencies':
            case 'currency':
            case 'factions':
            case 'faction':
            case 'pets':
            case 'pet':
            case 'itemsets':
            case 'itemset':
            case 'items':
            case 'item':
            case 'npcs':
            case 'npc':
            case 'objects':
            case 'object':
            case 'skills':
            case 'skill':
            case 'quests':
            case 'quest':
            case 'races':
            case 'race':
            case 'spells':
            case 'spell':
            case 'titles':
            case 'title':
            case 'events':
            case 'event':
            case 'zones':
            case 'zone':
            case 'talent':
            case 'petcalc':
            case 'filter':
            case 'compare':
            case 'profiler':
            case 'bluetracker':
            case 'maps':
            case 'guide':
            case 'patchnotes':
            case 'latest-achievements':
            case 'latest-additions':
            case 'latest-comments':
            case 'latest-screenshots':
            case 'latest-videos':
            case 'most-comments':
            case 'unrated-comments':
            case 'missing-screenshots':
            case 'random':
            case 'latest-replies':
            case 'latest-topics':
            case 'unanswered-topics':
            case 'latest-blog-comments':
            case 'blog':
            case 'forums':
            case 'website-achievements':
            case 'contests':
            case 'xfire':
            case 'irc':
            case 'aboutus':
            case 'advertise':
            case 'faq':
            case 'help':
            case 'jobs':
            case 'premium':
            case 'searchplugins':
            case 'logos':
            case 'whats-new':
            case 'client':
            case 'newsfeed':
            case 'searchbox':
            case 'tooltips':
                return true;
            default:
                return false;
        }
    }
}
?>