<div id="fi"><form action="<?php echo WoW::GetWoWPath(); ?>/filter=achievements" method="post" name="fi" onsubmit="return fi_submit(this)" onreset="return fi_reset(this)"><table>
<tr>
<td>Name: </td>
<td colspan="3"><table><tr><td>&nbsp;<input type="text" name="na" size="30" /></td><td>&nbsp; <input type="checkbox" name="ex" value="on" id="achievement-ex" /></td><td><label for="achievement-ex"><span class="tip" onmouseover="$WH.Tooltip.showAtCursor(event, LANG.tooltip_extendedachievementsearch, 0, 0, 'q')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">Extended search</span></label></td></tr></table></td></tr><tr><td class="padded">Side: </td><td class="padded">&nbsp;<select name="si">
<option></option>
<option value="1">Alliance</option>
<option value="-1">Alliance only</option>
<option value="2">Horde</option>
<option value="-2">Horde only</option>
<option value="3">Both</option>
</select>
</td>
<td class="padded"><table><tr><td>&nbsp;&nbsp;&nbsp;Points: </td><td>&nbsp;<input type="text" name="minpt" maxlength="2" class="smalltextbox" /> - <input type="text" name="maxpt" maxlength="2" class="smalltextbox" /></td></tr></table></td>
</tr></table><div id="fi_criteria" class="padded criteria"><div></div></div><div><a href="javascript:;" id="fi_addcriteria" onclick="fi_addCriterion(this); return false">Add another filter</a></div><div class="padded2">Match: <input type="radio" name="ma" value="" id="ma-0" checked="checked" /><label for="ma-0">All filters</label><input type="radio" name="ma" value="1" id="ma-1" /><label for="ma-1">At least one</label></div>

<div class="clear"></div>

<div class="padded"></div>
<input type="submit" value="Apply filter" />

</form><div class="pad"></div></div>

<script type="text/javascript">//<![CDATA[
fi_init('achievements');
//]]></script>

<div id="lv-achievements" class="listview"></div>
<?php
$achievements = WoW_Achievements::GetAchievements();
$js_icons_data = '';
$js_items_data = '';
$js_titles_data = '';
$js_listview_data = '';
$achievements_count = WoW_Achievements::GetCount();
if(is_array($achievements)) {
    $current = 1;
    $achievements_count_current = count($achievements);
    foreach($achievements as $achievement) {
        $js_icons_data .= sprintf('_[%d]={name_%s:\'%s\',icon:\'%s\'};', $achievement['id'], WoW_Locale::GetLocale(LOCALE_SPLIT), str_replace("'", "\'", $achievement['name']), str_replace("'", "\'", $achievement['icon']));
        if(isset($achievement['itemReward']) && is_array($achievement['itemReward'])) {
            $js_items_data .= sprintf('_[%d]={name_%s:\'%\',quality:%d,icon:\'%s\'};', $achievement['itemReward']['id'], WoW_Locale::GetLocale(LOCALE_SPLIT), $achievement['itemReward']['quality'], $achievement['itemReward']['icon']);
        }
        if(is_array($achievement['titleReward'])) {
            $js_titles_data .= sprintf('_[%d]={name_%s:\'%\'};', $achievement['titleReward']['id'], WoW_Locale::GetLocale(LOCALE_SPLIT), $achievement['titleReward']['name']);
        }
        $js_listview_data .= sprintf('{"category":%d,"description":"%s","id":%d,"name":"%s","parentcat":%d,"points":%d,"side":%d,"type":%d}',
        $achievement['categoryId'], str_replace('"', '\"', $achievement['desc']), $achievement['id'], str_replace('"', '\"', $achievement['name']), $achievement['parentCategory'], $achievement['points'], $achievement['side'], $achievement['type']);
        if($current < $achievements_count_current) {
            $js_listview_data .= ',';
        }
        ++$current;
    }
}
?>
<script type="text/javascript">//<![CDATA[
var _ = {};
<?php echo $js_icons_data; ?>
$.extend(true, g_achievements, _);
_ = g_achievements;
var _ = {};
<?php echo $js_items_data; ?>
$.extend(true, g_items, _);
_ = g_items;
var _ = {};
<?php echo $js_titles_data;; ?>
$.extend(true, g_titles, _);
_ = g_titles;
new Listview({template: 'achievement', id: 'achievements', note: $WH.sprintf(LANG.lvnote_achievementsfound, <?php echo $achievements_count; ?>, 200) + LANG.dash + LANG.lvnote_tryfiltering, _truncated: 1, visibleCols: ['category'], data: [<?php echo $js_listview_data; ?>]});
//]]></script>
