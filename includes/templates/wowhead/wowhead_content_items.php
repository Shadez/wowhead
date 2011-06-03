<div id="fi">

<form action="<?php echo WoW::GetWoWPath(); ?>/filter=items" method="post" name="fi" onsubmit="return fi_submit(this)" onreset="return fi_reset(this)">

<div class="rightpanel">
<div style="float: left">Quality: </div><small><a href="javascript:;" onclick="document.forms['fi'].elements['qu[]'].selectedIndex = -1; return false" onmousedown="return false">clear</a></small>
<div class="clear"></div>
<select name="qu[]" size="8" multiple="multiple" class="rightselect" style="background-color: #181818">
<option value="0" class="q0">Poor</option>
<option value="1" class="q1">Common</option>
<option value="2" class="q2">Uncommon</option>
<option value="3" class="q3">Rare</option>
<option value="4" class="q4">Epic</option>
<option value="5" class="q5">Legendary</option>
<option value="6" class="q6">Artifact</option>
<option value="7" class="q7">Heirloom</option>
</select>
</div>

<div class="rightpanel2">
<div style="float: left">Slot: </div><small><a href="javascript:;" onclick="document.forms['fi'].elements['sl[]'].selectedIndex = -1; return false" onmousedown="return false">clear</a></small>
<div class="clear"></div>
<select name="sl[]" size="7" multiple="multiple" class="rightselect">
<option value="16">Back</option>
<option value="18">Bag</option>
<option value="5">Chest</option>
<option value="8">Feet</option>
<option value="11">Finger</option>
<option value="10">Hands</option>
<option value="1">Head</option>
<option value="23">Held In Off-hand</option>
<option value="7">Legs</option>
<option value="21">Main Hand</option>
<option value="2">Neck</option>
<option value="22">Off Hand</option>
<option value="13">One-Hand</option>
<option value="24">Projectile</option>
<option value="15">Ranged</option>
<option value="28">Relic</option>
<option value="14">Shield</option>
<option value="4">Shirt</option>
<option value="3">Shoulder</option>
<option value="19">Tabard</option>
<option value="25">Thrown</option>
<option value="12">Trinket</option>
<option value="17">Two-Hand</option>
<option value="6">Waist</option>
<option value="9">Wrist</option>
</select>
</div>

<table>
<tr>
<td>Name: </td>
<td colspan="2">&nbsp;<input type="text" name="na" size="30" /></td>
<td></td>
</tr><tr>
<td class="padded">Level: </td><td class="padded">&nbsp;<input type="text" name="minle" maxlength="3" class="smalltextbox2" /> - <input type="text" name="maxle" maxlength="3" class="smalltextbox2" /></td>
<td class="padded"><table><tr><td>Required level: </td><td>&nbsp;<input type="text" name="minrl" maxlength="2" class="smalltextbox" /> - <input type="text" name="maxrl" maxlength="2" class="smalltextbox" /></td></tr></table></td><td></td>
</tr><tr><td class="padded">Usable by: </td><td class="padded">&nbsp;<select name="si" style="margin-right: 0.5em">
<option></option>
<option value="1">Alliance</option>
<option value="-1">Alliance only</option>
<option value="2">Horde</option>
<option value="-2">Horde only</option>
<option value="3">Both</option>
</select>
</td>
<td class="padded"><select name="ub">
<option></option>
<option value="6">Death Knight</option>
<option value="11">Druid</option>
<option value="3">Hunter</option>
<option value="8">Mage</option>
<option value="2">Paladin</option>
<option value="5">Priest</option>
<option value="4">Rogue</option>
<option value="7">Shaman</option>
<option value="9">Warlock</option>
<option value="1">Warrior</option>
</select></td></tr></table>

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

<div class="padded"></div><input type="submit" value="Apply filter" />

<input type="hidden" name="upg" />

<div class="pad"></div>

</form></div>

<script type="text/javascript">//<![CDATA[
fi_init('items');
fi_setCriteria([92],[1],['0']);
fi_extraCols = [92];
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
