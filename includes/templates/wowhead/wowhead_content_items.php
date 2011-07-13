<div id="fi">

<form action="<?php echo WoW::GetWoWPath(); ?>/filter=items" method="post" name="fi" onsubmit="return fi_submit(this)" onreset="return fi_reset(this)">

<div class="rightpanel">
<div style="float: left">Quality: </div><small><a href="javascript:;" onclick="document.forms['fi'].elements['qu[]'].selectedIndex = -1; return false" onmousedown="return false">clear</a></small>
<div class="clear"></div>
<?php
$select_info = array(
    'form' => array(
        'name' => 'qu[]',
        'size' => '8',
        'multiple' => 'multiple',
        'class' => 'rightselect',
        'style' => 'background-color: #181818'
    ),
    'filter' => array(
        'filter_key' => 'qu',
    ),
    'options' => array(
        'data' => array(0, 1, 2, 3, 4, 5, 6, 7),
        'class' => 'q%d'
    ),
    'locale' => array(
        'string_key' => 'template_item_quality_%d'
    )
);
echo WoW_Template::GetSelectForm($select_info);
?>
</div>

<?php
if(WoW_Items::GetCategory() === false || in_array(WoW_Items::GetCategory(), array(2, 4)))
{
?>
<div class="rightpanel2">
<div style="float: left">Slot: </div><small><a href="javascript:;" onclick="document.forms['fi'].elements['sl[]'].selectedIndex = -1; return false" onmousedown="return false">clear</a></small>
<div class="clear"></div>
<?php
$select_info = array(
    'form' => array(
        'name' => 'sl[]',
        'size' => '7',
        'multiple' => 'multiple',
        'class' => 'rightselect'
    ),
    'filter' => array(
        'filter_key' => 'sl',
    ),
    'options' => array(
        'data' => array(16, 18, 5, 8, 11, 10, 1, 23, 7, 21, 2, 22, 23, 24, 15, 28, 14, 4, 3, 19, 25, 12, 17, 6, 9)
    ),
    'locale' => array(
        'string_key' => 'template_item_invtype_%d'
    )
);
echo WoW_Template::GetSelectForm($select_info);
?>
</div>
<?php } ?>

<table>
<tr>
<td>Name: </td>
<?php
$nameVal = WoW::GetFilterValueByKey('na');
if($nameVal && is_array($nameVal)) {
    $nameFilter = $nameVal[0];
}
else {
    $nameFilter = null;
}
?>
<td colspan="2">&nbsp;<input type="text" name="na" size="30"<?php echo $nameFilter !== null ? ' value="' . $nameFilter . '"' : null; ?> /></td>
<td></td>
</tr><tr>
<?php
$minLeVal = WoW::GetFilterValueByKey('minle');
$maxLeVal = WoW::GetFilterValueByKey('maxle');
$minLevelFilter = null;
$maxLevelFilter = null;
if($minLeVal && is_array($minLeVal)) {
    $minLevelFilter = $minLeVal[0];
}
if($maxLeVal && is_array($maxLeVal)) {
    $maxLevelFilter = $maxLeVal[0];
}
?>
<td class="padded">Level: </td><td class="padded">&nbsp;<input type="text" name="minle" maxlength="3" class="smalltextbox2"<?php echo $minLevelFilter !== null ? ' value="' . $minLevelFilter . '"':  null; ?> /> - <input type="text" name="maxle" maxlength="3" class="smalltextbox2"<?php echo $maxLevelFilter !== null ? ' value="' . $maxLevelFilter . '"':  null; ?> /></td>
<?php
$minReqLeVal = WoW::GetFilterValueByKey('minrl');
$maxReqLeVal = WoW::GetFilterValueByKey('maxrl');
$minReqLevelFilter = null;
$maxReqLevelFilter = null;
if($minReqLeVal && is_array($minReqLeVal)) {
    $minReqLevelFilter = $minReqLeVal[0];
}
if($maxReqLeVal && is_array($maxReqLeVal)) {
    $maxReqLevelFilter = $maxReqLeVal[0];
}
?>
<td class="padded"><table><tr><td>Required level: </td><td>&nbsp;<input type="text" name="minrl" maxlength="2" class="smalltextbox"<?php echo $minReqLevelFilter !== null ? ' value="' . $minReqLevelFilter . '"':  null; ?> /> - <input type="text" name="maxrl" maxlength="2" class="smalltextbox"<?php echo $maxReqLevelFilter !== null ? ' value="' . $maxReqLevelFilter . '"':  null; ?> /></td></tr></table></td><td></td>
</tr><tr><td class="padded">Usable by: </td><td class="padded">&nbsp;
<?php
$select_info = array(
    'form' => array(
        'name' => 'si',
        'style' => 'margin-right: 0.5em'
    ),
    'filter' => array(
        'filter_key' => 'si',
    ),
    'options' => array(
        'data' => array('{SKIP}', 1, -1, 2, -2, 3)
    ),
    'locale' => array(
        'string_key' => 'template_item_filters_side_%d'
    )
);
echo WoW_Template::GetSelectForm($select_info);
?>
</td>
<td class="padded">
<?php
$select_info = array(
    'form' => array(
        'name' => 'ub'
    ),
    'filter' => array(
        'filter_key' => 'ub',
    ),
    'options' => array(
        'data' => array('{SKIP}', 6, 11, 3, 8, 2, 5, 4, 7, 9, 1)
    ),
    'locale' => array(
        'string_key' => 'character_class_%d'
    )
);
echo WoW_Template::GetSelectForm($select_info);
?>
</td></tr></table>

<div id="fi_criteria" class="padded criteria"><div></div></div><div><a href="javascript:;" id="fi_addcriteria" onclick="fi_addCriterion(this); return false">Add another filter</a></div>

<div class="padded">Match: <input type="radio" name="ma" value="" id="ma-0" checked="checked" /><label for="ma-0">All filters</label><input type="radio" name="ma" value="1" id="ma-1" /><label for="ma-1">At least one</label>

</div>
<div class="text">
<h3>Stat Weighting</h3>
</div>

<div id="tw5ekjm9wex1">
<div id="lnewwegnwe53"><div><a href="<?php echo WoW::GetWoWPath(); ?>/help=stat-weighting" target="_blank" class="icon-help" id="gnjndfgkjdfg35">Help</a></div></div>
<table>
<tr>
<td>Preset: &nbsp;</td>
<td id="fi_presets"></td>
</tr>
<tr>
<td class="padded">Gems: &nbsp;</td>
<td class="padded"><select name="gm">
<option></option>
<option value="2">Uncommon</option>
<option value="3">Rare</option>
<option value="4">Epic</option>
</select>
&nbsp; <input type="checkbox" name="jc" value="1" id="jc" /><label for="jc"><span class="tip" onmouseover="$WH.Tooltip.showAtCursor(event, LANG.tooltip_jconlygems, 0, 0, 'q')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">Include JC-only gems</span></label>
</td></tr>
<tr><td colspan="2" class="padded"><input type="checkbox" name="rf" value="1" id="rf" /><label for="rf"><span class="tip" onmouseover="$WH.Tooltip.showAtCursor(event, LANG.tooltip_reforgeitems, 0, 0, 'q')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">Automatically reforge items for optimal stats</span></label>
</td></tr>
</table>
<div id="fi_weight" class="criteria" style="display: none"><div></div></div><div><a href="javascript:;" id="fi_addweight" onclick="fi_addCriterion(this); return false" style="display: none">Add another weight</a></div>
<div class="pad2"></div>
<small>Tip: <a href="javascript:;" onclick="fi_presetDetails();">Remove</a> weights for capped statistics such as Hit rating.</small>
</div>

<div class="clear"></div><div class="padded">Group by:<input type="radio" name="gb" value="" id="gb-none" checked="checked" /><label for="gb-none">None</label><input type="radio" name="gb" value="1" id="gb-slot" /><label for="gb-slot">Slot</label><input type="radio" name="gb" value="2" id="gb-level" /><label for="gb-level">Level</label></div><div class="clear"></div>

<div class="padded"></div><input type="submit" value="Apply filter" /><?php echo isset($_GET['filter']) ? sprintf('<input type="button" value="Remove filter" onclick="location = \'%s/items\'" />', WoW::GetWoWPath()) : null; ?>

<input type="hidden" name="upg" />

<div class="pad"></div>

</form></div>

<script type="text/javascript">//<![CDATA[
fi_init('items');
<?php
$criterias = null;
$extraCols = null;
WoW::BuildAdvancedFiltersInfo($criterias, $extraCols);
if($criterias != null) {
    echo sprintf('fi_setCriteria(%s);', $criterias);
}
?>

fi_extraCols = <?php echo $extraCols ? $extraCols : '[]'; ?>;
//]]></script>

<div id="lv-items" class="listview"></div>
<?php
$items = WoW_Items::GetItems();
$js_names_data = '';
$js_listview_data = '';
$items_count = WoW_Items::GetCount();
if(is_array($items)) {
    $items_count_current = count($items);
    $current = 1;
    foreach($items as $item) {
        $js_names_data .= sprintf('_[%d]={name_%s:\'%s\',quality:%d,icon:\'%s\'};', $item['entry'], WoW_Locale::GetLocale(LOCALE_SPLIT), str_replace("'", "\'", $item['name']), $item['quality'], $item['icon']);
        $data_count = count($item['js_data']);
        $i = 1;
        $current_item = '';
        foreach($item['js_data'] as $data) {
            $current_item .= sprintf('"%s":%s', $data['key'], $data['data']);
            if($i < $data_count) {
                $current_item .= ',';
            }
        }
        $js_listview_data .= sprintf('{%s}', $current_item);
        if($current < $items_count_current) {
            $js_listview_data .= ',';
        }
        ++$current;
    }
}
?>
<script type="text/javascript">//<![CDATA[
var _ = {};
<?php echo $js_names_data; ?>
$.extend(true, g_items, _);
_ = g_items;
var _ = {};
_[390]={name_ruru:'Очки завоеваний',icon:['pvpcurrency-conquest-alliance','pvpcurrency-conquest-horde']};
$.extend(true, g_gatheredcurrencies, _);
_ = g_gatheredcurrencies;
new Listview({template: 'item', id: 'items', note: $WH.sprintf(LANG.lvnote_itemsfound, <?php echo $items_count; ?>, 200) + LANG.dash + LANG.lvnote_tryfiltering, _truncated: 1, extraCols: fi_getExtraCols(fi_extraCols, 0, 0, 1), hiddenCols: (fi_nExtraCols >= 5 ? ['source', 'type'] : null), onAfterCreate: fi_addUpgradeIndicator, data:[<?php echo $js_listview_data; ?>]});
//]]></script>
