<?php
$npc = WoW_NPCs::GetNPC();
?>

<script type="text/javascript">//<![CDATA[
var _ = g_users;
var lv_comments0 = [];
var _ = g_users;
var lv_screenshots = [];
var lv_videos = [];
var lv_links = [];
var g_pageInfo = {type: 1, typeId: <?php echo $npc['entry']; ?>, name: '<?php echo $npc['name']; ?>'};
PageTemplate.set({breadcrumb: [0,4,<?php echo $npc['type']; ?>,0]});
//]]></script>

<table class="infobox">
<tr><th id="infobox-quick-facts">Quick Facts</th></tr>
<tr><td><div class="infobox-spacer"></div><div id="sdhafcuvh0"></div></td></tr>
<tr><th id="infobox-screenshots">Screenshots</th></tr>
<tr><td><div class="infobox-spacer"></div><div id="infobox-sticky-ss"></div></td></tr>
<tr><th id="infobox-videos">Videos</th></tr>
<tr><td><div class="infobox-spacer"></div><div id="infobox-sticky-vi"></div></td></tr>
</table>
<script type="text/javascript">ss_appendSticky()</script>
<script type="text/javascript">vi_appendSticky()</script>
<script type="text/javascript">//<![CDATA[
<?php
// NPC Level
$quickFacts = '[ul][li]' . WoW_Locale::GetString('template_npc_level') . ' ' . $npc['level'] . '[/li]';
// NPC Classification (rank)
switch($npc['rank']) {
    case 3:
        $quickFacts .= '[li]' . WoW_Locale::GetString('template_npc_classification') . ' [span class=\"icon-boss\"]' . WoW_Locale::GetString('template_npc_classification_3') . '[/span][/li]';
        break;
    case 4:
    case 2:
    case 1:
        $quickFacts .= '[li]' . WoW_Locale::GetString('template_npc_classification') . ' ' . WoW_Locale::GetString('template_npc_classification_' . $npc['rank']) . '[/li]';
        break;
}
//TODO: react
// NPC Health
$quickFacts .= '[li]' . WoW_Locale::GetString('template_npc_health') . ' ' . $npc['health'] . '[/li]';
// NPC Worth
if($npc['money'] > 0) {
    $quickFacts .= '[li]' . WoW_Locale::GetString('template_npc_worth') . ' [tooltip=tooltip_avgmoneydropped][money=' . $npc['money'] . '][/tooltip][/li]';
}
$quickFacts .= '[/ul]';
?>
Markup.printHtml("<?php echo $quickFacts; ?>", "sdhafcuvh0", { allow: Markup.CLASS_STAFF, dbpage: true });
//]]></script>

<div class="text">

<a href="javascript:;" id="dsgndslgn464d" class="button-red" onclick="this.blur(); ModelViewer.show({ type: 1, typeId: <?php echo $npc['entry']; ?>, displayId: <?php echo $npc['modelid_1']; ?> })"><em><b><i>View in 3D</i></b><span>View in 3D</span></em></a>
<h1><?php echo $npc['name']; echo $npc['subname'] != null ? '&lt;' . $npc['subname'] . '&gt;' : null; ?> </h1>
<?php
if(isset($npc['zone_info'])) {
    echo '<div>' . WoW_Locale::GetString('template_npc_can_be_found') . ' <span id="locations"><a href="javascript:;" onclick="myMapper.update({zone: ' . $npc['zone_info']['areaID'] . '}); g_setSelectedLink(this, \'mapper\'); return false" onmousedown="return false">' . $npc['zone_info']['zoneName'] . '</a>.</span> 
</div>';
}
?>
<div id="k6b43j6b"></div>
<div style="clear: left"></div>
<?php
if(isset($npc['zone_info'])) {
    echo '<script type="text/javascript">//<![CDATA[
    var g_mapperData = {
        ' . $npc['zone_info']['areaID'] . ': {
            0: { count: 1, coords: [[' . $npc['zone_info']['coords']['x'] . ',' . $npc['zone_info']['coords']['y'] . ']] }
        }
    };
    var myMapper = new Mapper({parent: \'k6b43j6b\'});
    $WH.gE($WH.ge(\'locations\'), \'a\')[0].onclick();
//]]></script>';
}
?>

<div id="wfehkhndso" style="margin-top: 10px"></div>
<?php
if (isset($npc['dungeonBox'])) {
?>
<script type="text/javascript">//<![CDATA[
Markup.printHtml("[minibox][h2][url=?zone=1337]Uldaman[/url][/h2]\n[url=?npc=6910]Revelosh[/url]\n[url=?npc=6906]The Lost Dwarves[/url]\n[url=?npc=7228]Ironaya[/url]\n[url=?npc=7023]Obsidian Sentinel[/url]\n[url=?npc=7206]Ancient Stone Keeper[/url]\n[url=?npc=7291]Galgann Firehammer[/url]\n[url=?npc=4854]Grimlok[/url]\n[b]Archaedas[/b]\n[/minibox]\n\n[b]Archaedas[/b], an ancient servants of the titans, is the final boss of [b]Uldaman[/b].\n[map zone=1337]\n[pin x=74.7 y=72.8 type=3]Entrance (Front)[/pin]\n[pin x=34.5 y=69.7 type=3]Entrance (Back)[/pin]\n[pin x=47.1 y=14.7]Archaedas[/pin]\n[/map]", "wfehkhndso", { allow: Markup.CLASS_ADMIN, dbpage: true });
//]]></script>
<?php
}
?>

<!-- <h3><a class="disclosure-off" onclick="return g_disclose($WH.ge('wougfh349t'), this)">Quotes (3)</a></h3>

<div id="wougfh349t" style="display: none"><ul><li><div><span class="s1"></span></div></li></ul></div> -->
<h2 class="clear"><?php echo WoW_Locale::GetString('template_related'); ?></h2>

</div>

<div id="jkbfksdbl4"></div>
<div id="lkljbjkb574" class="listview">
</div>
<script type="text/javascript">//<![CDATA[
var _ = {};
<?php
$items = false;
if(is_array($npc['loot'])) {
    foreach($npc['loot'] as $loot) {
        echo '_[' . $loot['entry'] . '] = {name_enus:\'' . str_replace("'", "\'", $loot['name']) . '\',quality:' . $loot['quality'] . ',icon:\'' . $loot['icon'] . '\'};'; 
    }
    $items = true;
}
?>
$.extend(true, g_items, _);
_ = g_items;
var _ = {};
<?php
$spells = false;
if(is_array($npc['spells'])) {
    foreach($npc['spells'] as $spell) {
        echo '_[' . $spell['id'] . '] = {name_enus:\'' . str_replace("'", "\'", $spell['name']) . '\',rank_enus:\'' . str_replace("'", "\'", $spell['rank']) . '\',icon:\'' . $spell['icon'] . '\'};';
    }
    $spells = true;
}
?>
$.extend(true, g_spells, _);
_ = g_spells;
var _ = {};
<?php
$achievements = false;
if(is_array($npc['achievements'])) {
    foreach($npc['achievements'] as $achievement) {
        if($achievement['id'] == 0) {
            continue;
        }
        echo '_[' . $achievement['id'] . '] = {name_enus:\'' . str_replace("'", "\'", $achievement['name']) . '\',icon:\'' . str_replace("'", "\'", $achievement['icon']) . '\'};'; 
    }
    $achievements = true;
}
?>
$.extend(true, g_achievements, _);
_ = g_achievements;

var tabsRelated = new Tabs({parent: $WH.ge('jkbfksdbl4'), trackable: 'NPC'});
<?php
if($items) {
    $listView = '';
    $items_count = count($npc['loot']);
    $current = 1;
    foreach($npc['loot'] as $item) {
        if($item['entry'] == 0) {
            continue;
        }
        $listView .= sprintf('{%s"armor":%d,"classs":%d,"displayid":%d,"id":%d,"level":%d,"name":"%s","reqlevel":%d,"slot":%d,"slotbak":%d,"source":[2],"sourcemore":[{"bd":1,"dd":-1,"n":"%s","t":1,"ti":%d,"z":%d}],"subclass":%d,modes:{},count:0,stack:[1,1]}',
            (($item['Flags'] & ITEM_FLAGS_HEROIC) ? '"heroic":1,' : null),
            $item['armor'],
            $item['class'],
            $item['displayid'],
            $item['entry'],
            $item['ItemLevel'],
            (7 - $item['quality']) . str_replace('"', '\"', $item['name']),
            $item['reqLevel'],
            $item['InventoryType'],
            $item['InventoryType'],
            str_replace('"', '\"', $npc['name']),
            $npc['entry'],
            (isset($npc['zone_info']) ? $npc['zone_info']['areaID'] : 0),
            $item['subclass']
        );
        if($current < $items_count) {
            $listView .= ',';
        }
        ++$current;
    }
    if($listView != null)
        echo sprintf('new Listview({template: \'item\', id: \'drops\', name: LANG.tab_drops, tabs: tabsRelated, parent: \'lkljbjkb574\', extraCols: [Listview.extraCols.count, Listview.extraCols.percent], sort:[\'-percent\', \'name\'], _totalCount: %d, computeDataFunc: Listview.funcBox.initLootTable, onAfterCreate: Listview.funcBox.addModeIndicator, data: [%s]});', $items_count, $listView);
}
if($achievements) {
    $listView = '';
    $achievements_count = count($npc['achievements']);
    $current = 1;
    foreach($npc['achievements'] as $ach) {
        if($ach['id'] == 0) {
            continue;
        }
        $listView .= sprintf('{"category":%d,"description":"%s","id":%d,"name":"%s","parentcat":%d,"points":%d,"side":%d,"type":%d}',
            $ach['category'],
            str_replace('"', '\"', $ach['desc']),
            $ach['id'],
            str_replace('"', '\"', $ach['name']),
            $ach['parentCategory'],
            $ach['points'],
            $ach['side'],
            (($ach['points'] == 0 && $ach['category'] != 81) ? 2 : 1)
        );
        if($current < $achievements_count) {
            $listView .= ',';
        }
        ++$current;
    }
    if($listView != null)
        echo sprintf('new Listview({template: \'achievement\', id: \'criteria-of\', name: LANG.tab_criteriaof, tabs: tabsRelated, parent: \'lkljbjkb574\', visibleCols: [\'category\'], computeDataFunc: Listview.funcBox.initStatisticFilter, onAfterCreate: Listview.funcBox.addStatisticIndicator, data: [%s]});', $listView);
}
if($spells) {
    $listView = '';
    $spells_count = count($npc['spells']);
    $current = 1;
    foreach($npc['spells'] as $spell) {
        if($spell['id'] == 0) {
            continue;
        }
        $listView .= sprintf('{"cat":-8,"id":%d,"level":%d,"name":"@%s","schools":%d,modes:{"mode":2}}',
            $spell['id'],
            $spell['level'],
            str_replace('"', '\"', $spell['name']),
            $spell['school']
        );
        if($current < $spells_count) {
            $listView .= ',';
        }
        ++$current;
    }
    if($listView != null)
        echo sprintf('new Listview({template: \'spell\', id: \'abilities\', name: LANG.tab_abilities, tabs: tabsRelated, parent: \'lkljbjkb574\', visibleCols: [\'schools\'], hiddenCols: [\'reagents\', \'skill\'], computeDataFunc: Listview.funcBox.initModeFilter, onAfterCreate: Listview.funcBox.addModeIndicator, data: [%s]});', $listView);
}
if(is_array($npc['npcs'])) {
    $npcs_count = count($npc['npcs']);
    $current = 1;
    $listView = '';
    foreach($npc['npcs'] as $creature) {
        $listView .= sprintf('{"classification":%d,"id":%d,"location":[%d],"maxlevel":%d,"minlevel":%d,"name":"%s","react":[-1,-1],"type":%d,skin:\'\'}',
            $creature['rank'],
            $creature['entry'],
            $creature['zone_info']['areaID'],
            $creature['minlevel'],
            $creature['maxlevel'],
            str_replace('"', '\"', $creature['name']),
            $creature['type']
        );
        if($current < $npcs_count) {
            $listView .= ',';
        }
        ++$current;
    }
    echo sprintf('new Listview({template: \'npc\', id: \'same-model-as\', name: LANG.tab_samemodelas, tabs: tabsRelated, parent: \'lkljbjkb574\', visibleCols: [\'skin\'], note: $WH.sprintf(LANG.lvnote_filterresults, \'%s/npcs?filter=cr=34;crs=0;crv=692\'), data: [%s]});', WoW::GetUrl(), $listView);
}
?>


//new Listview({template: 'quest', id: 'objective-of', name: LANG.tab_objectiveof, tabs: tabsRelated, parent: 'lkljbjkb574', data: [{"category":1337,"category2":2,"id":27677,"level":40,"money":20000,"name":"Archaedas, The Ancient Stone Watcher","reqlevel":35,"side":1,"type":81,"wflags":96,"xp":3250},{"category":1337,"category2":2,"id":27680,"level":40,"money":20000,"name":"Archaedas, The Ancient Stone Watcher","reqlevel":35,"side":2,"type":81,"wflags":96,"xp":3250}]});
//new Listview({template: 'quest', id: 'starts', name: LANG.tab_starts, tabs: tabsRelated, parent: 'lkljbjkb574', data: [{"category":1337,"category2":2,"id":27677,"level":40,"money":20000,"name":"Archaedas, The Ancient Stone Watcher","reqlevel":35,"side":1,"type":81,"wflags":96,"xp":3250},{"category":1337,"category2":2,"id":27680,"level":40,"money":20000,"name":"Archaedas, The Ancient Stone Watcher","reqlevel":35,"side":2,"type":81,"wflags":96,"xp":3250}]});
new Listview({template: 'comment', id: 'comments', name: LANG.tab_comments, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_comments0});
if(lv_links.length)
	new Listview({template: 'relatedlinks', id: 'links', name: LANG.tab_whatlinkshere, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_links});
new Listview({template: 'screenshot', id: 'screenshots', name: LANG.tab_screenshots, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_screenshots});
if(lv_videos.length || (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)))
	new Listview({template: 'video', id: 'videos', name: LANG.tab_videos, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_videos});
tabsRelated.flush();
//]]></script>

<?php WoW_Template::LoadTemplate('block_contribute'); ?>