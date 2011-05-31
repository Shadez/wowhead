<?php
header('Content-type: text/javascript');
echo WoW_Template::GetPageData('js-data');
WoW_Template::SetPageData('js-data', null); // Must be freed after using!
exit; // Do not load anything after loading "block_data" template!
?>