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
    
    private static $m_urlData = array();
    private static $m_pageUrlData = array();
    
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
    
    private static function SetUrlData($url_data, $iter) {
        $size = sizeof($url_data);
        $diff = abs(0 - $iter);
        self::$m_urlData = array();
        for(/*$iter = $iter*/; $iter < $size; ++$iter) {
            self::$m_urlData[$iter - $diff] = $url_data[$iter];
        }
    }
    
    public static function GetLastUrlData() {
        return isset(self::$m_urlData[sizeof(self::$m_urlData) - 1]) ? self::$m_urlData[sizeof(self::$m_urlData) - 1] : null;
    }
    
    public static function GetFullUrlData() {
        return self::$m_urlData;
    }
    
    private static function SetPageUrlData($page_url_data) {
        self::$m_pageUrlData = $page_url_data;
    }
    
    public static function GetLastPageUrlData() {
        return isset(self::$m_pageUrlData[sizeof(self::$m_pageUrlData) - 1]) ? self::$m_pageUrlData[sizeof(self::$m_pageUrlData) - 1] : null;
    }
    
    public static function GetFullPageUrlData() {
        return self::$m_pageUrlData;
    }
    
    private static function ParseUrl() {
        $url_array = explode('/', $_SERVER['REQUEST_URI']);
        if(!$url_array) {
            WoW_Template::SetPageIndex('error');
            return false;
        }
        $count = count($url_array);
        for($i = 0; $i < $count; ++$i) {
            self::SetUrlData($url_array, $i);
            $page_url = explode('=', $url_array[$i]);
            if(!is_array($page_url)) {
                continue;
            }
            self::SetPageUrlData($page_url);
            switch($page_url[0]) {
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
        }
        if(WoW_Template::GetPageIndex() == null) {
            self::InitWebSite();
        }
        WoW_Template::SetPageData('page_url', self::GetLastUrlData());
    }
    
    private static function InitAchievements() {
        self::AssignTemplatePageIndex(array('achievements', 'achievement'));
        WoW_Template::SetPageData('activeTab', 0);
        WoW_Achievements::InitPage(WoW_Template::GetPageIndex(), self::GetLastPageUrlData());
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
    
    private static function InitPets() {
        self::AssignTemplatePageIndex(array('pets', 'pet'));
    }
    
    private static function InitItemSets() {
        self::AssignTemplatePageIndex(array('itemsets', 'itemset'));
    }
    
    private static function InitItems() {
        self::AssignTemplatePageIndex(array('items', 'item'));
        WoW_Template::SetPageData('activeTab', 0);
        WoW_Items::InitPage(WoW_Template::GetPageIndex(), self::GetLastPageUrlData());
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
        switch(self::GetLastUrlData()) {
            case 'search':
                WoW_Search::InitPage('search', 0);
                break;
        }
    }
    
    private static function InitData() {
        WoW_Template::SetPageIndex('data');
        $js_contents = null;
        switch(self::GetLastPageUrlData()) {
            case 'spell-scaling':
            case 'item-scaling':
            case 'user':
                $js_contents = file_get_contents('data/' . self::GetLastPageUrlData() . '.js');
                break;
            case 'weight-presets.zones':
                $js_contents = file_get_contents('data/weight-presets.zones-' . WoW_Locale::GetLocaleID() . '.js');
                break;
        }
        WoW_Template::SetPageData('js-data', $js_contents); // Must be freed after using!
    }
    
    private static function AssignTemplatePageIndex($g_types) {
        WoW_Template::SetPageIndex(strpos(self::GetLastUrlData(), $g_types[0]) !== false ? $g_types[0] : $g_types[1]);
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