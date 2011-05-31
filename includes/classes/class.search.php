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

Class WoW_Search extends WoW_Abstract {
    private static $m_results = array();
    
    public static function InitPage($page_type, $category) {
        if($page_type != 'search') {
            WoW_Log::WriteError('%s : wrong page type (%s)!', __METHOD__, $page_type);
            return false;
        }
        echo '["ragnaros", ["Lil\' Ragnaros (Item)", "Ragnaros Core (Item)", "Spark of Ragnaros (Item)", "Sulfuras, Hand of Ragnaros (Item)", "Symbol of Ragnaros (Item)", "Ragnaros kills (Molten Core) (Achievement)", "Sulfuras, Hand of Ragnaros (Achievement)", "Sulfuras, Hand of Ragnaros - Guild Edition (Achievement)", "Dream of Ragnaros (Spell)", "Wrath of Ragnaros (Spell)"], [], [], [], [], [], [[3, 68385, "achievement_boss_ragnaros", 3], [3, 17982, "INV_Jewelry_Ring_25", 3], [3, 52332, "INV_Elemental_Primal_Fire", 1], [3, 17182, "INV_Hammer_Unique_Sulfuras", 5], [3, 10552, "INV_Jewelry_Talisman_04", 1], [10, 1099, "spell_fire_elemental_totem"], [10, 429, "inv_hammer_unique_sulfuras"], [10, 4997, "inv_hammer_unique_sulfuras"], [6, 75145, "INV_Chest_Cloth_57"], [6, 84402, "spell_fire_soulburn"]]]';
        die;
    }
}
?>