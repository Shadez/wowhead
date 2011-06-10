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

include('../../../wowhead/includes/WoW_Loader.php');
header('Content-type: text/javascript');
$power_js = @file_get_contents('power.js');
if(!$power_js) {
    exit;
}
$power_js = str_replace(
   array('WOWHEAD_URL', 'WOWHEAD_STATIC_URL', 'WOWHEAD_DOMAIN_NAME', 'WOWHEAD_DOMAIN'),
   array(WoW::GetUrl(), WoW::GetStaticUrl(), $_SERVER['SERVER_NAME'], $_SERVER['SERVER_NAME'] . WoW::GetWoWPath() . '/'),
   $power_js
);
echo $power_js;
exit;
?>