<div id="fi"><form action="<?php echo WoW::GetWoWPath(); ?>/filter=npcs" method="post" name="fi" onsubmit="return fi_submit(this)" onreset="return fi_reset(this)">

<div class="rightpanel">
<div style="float: left">Classification: </div><small><a href="javascript:;" onclick="document.forms['fi'].elements['cl[]'].selectedIndex = -1; return false" onmousedown="return false">clear</a></small>
<div class="clear"></div>
<select name="cl[]" size="5" multiple="multiple" class="rightselect" style="width: 9.5em">
<option value="0">Normal</option>
<option value="1">Elite</option>
<option value="4">Rare</option>
<option value="2">Rare Elite</option>
<option value="3">Boss</option>
</select>
</div>

<div class="rightpanel2">
<div style="float: left">Pet family: </div><small><a href="javascript:;" onclick="document.forms['fi'].elements['fa[]'].selectedIndex = -1; return false" onmousedown="return false">clear</a></small>
<div class="clear"></div>
<select name="fa[]" size="7" multiple="multiple" class="rightselect">
<option value="24">Bat</option>
<option value="4">Bear</option>
<option value="53">Beetle</option>
<option value="26">Bird of Prey</option>
<option value="5">Boar</option>
<option value="7">Carrion Bird</option>
<option value="2">Cat</option>
<option value="38">Chimaera</option>
<option value="45">Core Hound</option>
<option value="8">Crab</option>
<option value="6">Crocolisk</option>
<option value="39">Devilsaur</option>
<option value="52">Dog</option>
<option value="30">Dragonhawk</option>
<option value="50">Fox</option>
<option value="9">Gorilla</option>
<option value="25">Hyena</option>
<option value="51">Monkey</option>
<option value="37">Moth</option>
<option value="34">Nether Ray</option>
<option value="11">Raptor</option>
<option value="31">Ravager</option>
<option value="43">Rhino</option>
<option value="20">Scorpid</option>
<option value="35">Serpent</option>
<option value="55">Shale Spider</option>
<option value="41">Silithid</option>
<option value="3">Spider</option>
<option value="46">Spirit Beast</option>
<option value="33">Sporebat</option>
<option value="12">Tallstrider</option>
<option value="21">Turtle</option>
<option value="32">Warp Stalker</option>
<option value="44">Wasp</option>
<option value="27">Wind Serpent</option>
<option value="1">Wolf</option>
<option value="42">Worm</option>
</select></div><table>
<tr>
<td>Name: </td>
<td colspan="3"><table><tr><td>&nbsp;<input type="text" name="na" size="30" /></td><td>&nbsp; <input type="checkbox" name="ex" value="on" id="npc-ex" /></td><td><label for="npc-ex"><span class="tip" onmouseover="$WH.Tooltip.showAtCursor(event, LANG.tooltip_extendednpcsearch, 0, 0, 'q')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">Extended search</span></label></td></tr></table></td></tr><tr><td class="padded">Level: </td><td class="padded">&nbsp;<input type="text" name="minle" maxlength="2" class="smalltextbox" /> - <input type="text" name="maxle" maxlength="2" class="smalltextbox" /></td>
<td class="padded" width="100%"><table><tr><td>&nbsp;&nbsp;&nbsp;React: </td><td>
&nbsp;<select name="ra" onchange="fi_dropdownSync(this)" onkeyup="fi_dropdownSync(this)" style="background-color: #181818"><option></option><option value="1" class="q2">A</option>
<option value="0" class="q">A</option>
<option value="-1" class="q10">A</option>
</select>
<select name="rh" onchange="fi_dropdownSync(this)" onkeyup="fi_dropdownSync(this)" style="background-color: #181818"><option></option><option value="1" class="q2">H</option>
<option value="0" class="q">H</option>
<option value="-1" class="q10">H</option>
</select>
</td></tr></table></td>
</tr></table><div id="fi_criteria" class="padded criteria"><div></div></div><div><a href="javascript:;" id="fi_addcriteria" onclick="fi_addCriterion(this); return false">Add another filter</a></div><div class="padded2">Match: <input type="radio" name="ma" value="" id="ma-0" checked="checked" /><label for="ma-0">All filters</label><input type="radio" name="ma" value="1" id="ma-1" /><label for="ma-1">At least one</label></div>

<div class="padded"></div>
<input type="submit" value="Apply filter" /><div class="clear"></div></form><div class="pad"></div></div>

<script type="text/javascript">//<![CDATA[
fi_init('npcs');
//]]></script>

<div id="lv-npcs" class="listview"></div>
<script type="text/javascript">//<![CDATA[
new Listview({template: 'npc', id: 'npcs', note: $WH.sprintf(LANG.lvnote_npcsfound, <?php echo WoW_NPCs::GetCount(); ?>, 200) + LANG.dash + LANG.lvnote_tryfiltering, _truncated: 1, data: [
<?php
$npcs = WoW_NPCs::GetNPCs();
if(is_array($npcs)) {
    $count = count($npcs);
    $current = 1;
    foreach($npcs as $npc) {
        echo sprintf('{"boss":%d,"classification":%d,"id":%d,"location":[%d],"maxlevel":%d,"minlevel":%d,"name":"%s","react":[-1,-1],%s"type":%d}',
            $npc['rank'] == 3 ? 1 : 0,
            $npc['rank'],
            $npc['entry'],
            isset($npc['zoneID']) ? $npc['zoneID'] : 0,
            $npc['rank'] == 3 ? 999 : $npc['maxlevel'],
            $npc['rank'] == 3 ? 999 : $npc['minlevel'],
            str_replace('"', '\"', $npc['name']),
            $npc['subname'] != null ? '"tag":"' . str_replace('"', '\"', $npc['subname']) . '",' : null,
            $npc['type']
        );
        if($current < $count) {
            echo ', ';
        }
    }
}
?>
]});
//]]></script>
