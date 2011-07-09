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

define('PROJECT_NAME', 'wowhead');

function LoadClasses(&$classes) {
    if(!is_array($classes)) {
        die('<strong>Fatal Error:</strong> no classes found!');
    }
    $errorMessage = null;
    $event_operations = array();
    foreach($classes as $file) {
        if(!@include($file['path'])) {
            $errorMessage .= '<li><strong>Fatal Error:</strong> Unable to load <b>' . $file['title'] . '</b> (includes/' . $file['path']. ')!</li>';
        }
        else {
            if(isset($file['postLoadEventClass'], $file['postLoadEventMethod'])) {
                $event_operations[] = array($file['postLoadEventClass'], $file['postLoadEventMethod']);
            }
        }
    }
    if($errorMessage != null) {
        die('<em><strong style="color:#ff0000">Some error(s) appeared during classes loading:</strong></em><ul>' . $errorMessage . '</ul>Please, make sure that you have full CMS package or report on <a href="https://github.com/Shadez/' . PROJECT_NAME . '/issues">GitHub.com</a>.');
    }
    // Perform operations
    foreach($event_operations as $operation) {
        $operation[0]::$operation[1]();
    }
    return true;
}

?>