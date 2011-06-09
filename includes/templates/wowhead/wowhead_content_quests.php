<div id="fi"><form action="<?php echo WoW::GetWoWPath(); ?>/filter=quests" method="post" name="fi" onsubmit="return fi_submit(this)" onreset="return fi_reset(this)">



<div class="rightpanel">

<div style="float: left">Type: </div><small><a href="javascript:;" onclick="document.forms['fi'].elements['ty[]'].selectedIndex = -1; return false" onmousedown="return false">clear</a></small>

<div class="clear"></div>

<select name="ty[]" size="6" multiple="multiple" class="rightselect">

<option value="0">Normal</option> 
<option value="1">Group</option> 
<option value="81">Dungeon</option> 
<option value="62">Raid</option> 
<option value="41">PvP</option> 
<option value="85">Heroic</option> 
</select></div><table>

<tr>

<td>Name: </td>

<td colspan="3"><table><tr><td>&nbsp;<input type="text" name="na" size="30" /></td><td>&nbsp; <input type="checkbox" name="ex" value="on" id="quest-ex" /></td><td><label for="quest-ex"><span class="tip" onmouseover="$WH.Tooltip.showAtCursor(event, LANG.tooltip_extendedquestsearch, 0, 0, 'q')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">Extended search</span></label></td></tr></table></td></tr><tr><td class="padded">Level: </td><td class="padded">&nbsp;<input type="text" name="minle" maxlength="2" class="smalltextbox" /> - <input type="text" name="maxle" maxlength="2" class="smalltextbox" /></td> 
<td class="padded" width="100%"><table><tr><td>&nbsp;&nbsp;&nbsp;Required level: </td><td>&nbsp;<input type="text" name="minrl" maxlength="2" class="smalltextbox" /> - <input type="text" name="maxrl" maxlength="2" class="smalltextbox" /></td></tr></table></td> 
</tr><tr><td class="padded">Side: </td><td class="padded" colspan="3">&nbsp;<select name="si">

<option></option>

<option value="1">Alliance</option> 
<option value="-1">Alliance only</option> 
<option value="2">Horde</option> 
<option value="-2">Horde only</option> 
<option value="3">Both</option> 
</select>

</td>

</tr>

</table>

<div id="fi_criteria" class="padded criteria"><div></div></div><div><a href="javascript:;" id="fi_addcriteria" onclick="fi_addCriterion(this); return false">Add another filter</a></div><div class="padded2">Match: <input type="radio" name="ma" value="" id="ma-0" checked="checked" /><label for="ma-0">All filters</label><input type="radio" name="ma" value="1" id="ma-1" /><label for="ma-1">At least one</label></div>



<div class="clear"></div>



<div class="padded"></div>

<input type="submit" value="Apply filter" /></form><div class="pad"></div></div> 
 
<script type="text/javascript">//<![CDATA[
fi_init('quests');
//]]></script> 
 
<div id="lv-quests" class="listview"></div> 
<script type="text/javascript">//<![CDATA[
var _ = {};
<?php
$quests = WoW_Quests::GetQuests();
if(isset($quests['items']) && is_array($quests['items'])) {
    foreach($quests['items'] as $item) {
        echo sprintf('_[%d]={name_enus:\'%s\',quality:%d,icon:\'%s\'};', $item['entry'], addslashes((WoW_Locale::GetLocaleID() != LOCALE_EN && isset($item['name_loc']) && $item['name'] != null) ? $item['name_loc'] : $item['name']), $item['quality'], $item['icon']);
    }
}
?>
$.extend(true, g_items, _);
_ = g_items;
new Listview({template: 'quest', id: 'quests', note: $WH.sprintf(LANG.lvnote_questsfound, <?php echo WoW_Quests::GetTotalQuestsCount(); ?>, <?php echo isset($quests['quests']) ? count($quests['quests']) : 0; ?>) + LANG.dash + LANG.lvnote_tryfiltering, _truncated: 1, data: [
<?php
if(isset($quests['quests']) && is_array($quests['quests'])) {
    $count = count($quests['quests']);
    $current = 1;
    foreach($quests['quests'] as $quest) {
        echo sprintf('{"category":0,"category2":0,"id":%d,"name":"%s","reqlevel":%d', $quest['entry'], str_replace('"', '\"', $quest['Title']), $quest['MinLevel']);
        $item_rewards = null;
        $item_choices = null;
        for($i = 1; $i < 7; ++$i) {
            if($i < 5) {
                if($quest['RewItemId' . $i] > 0 && $quest['RewItemCount' . $i] > 0) {
                    $item_rewards .= '[' . $quest['RewItemId' . $i] . ',' . $quest['RewItemCount' . $i] . '],';
                }
            }
            if($quest['RewChoiceItemId' . $i] > 0 && $quest['RewChoiceItemCount' . $i] > 0) {
                $item_choices .= '[' . $quest['RewChoiceItemId' . $i] . ',' . $quest['RewChoiceItemCount' . $i] . '],';
            }
        }
        if($item_rewards != null) {
            echo ',"itemrewards":[' . $item_rewards . ']';
        }
        if($item_choices != null) {
            echo ',"itemchoices":[' . $item_choices . ']';
        }
        if($quest['RewOrReqMoney'] != 0) {
            echo ',"money":' . $quest['RewOrReqMoney'];
        }
        echo '}';
        if($current < $count) {
            echo ', ';
        }
        ++$current;
    }
}
?>]});
//]]></script>
