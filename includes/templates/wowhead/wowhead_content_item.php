<?php
$proto = WoW_Items::GetItem();
//echo '<!--';
WoW_Items::GetDropCreaturesSource(true);
//print_r($proto);
//echo '-->';
?>
<script type="text/javascript">//<![CDATA[
var _ = g_users;
var _ = {};
_[<?php echo $proto->entry; ?>]={name_enus:'<?php echo $proto->GetName(); ?>',quality:<?php echo $proto->Quality; ?>,icon:'<?php echo $proto->icon; ?>'};
$.extend(true, g_items, _);
_ = g_items;
var lv_comments0 = [];
var _ = g_users;
var lv_screenshots = [];
var lv_videos = [];
var _ = g_users;
var lv_links = [];
var g_pageInfo = {type: 3, typeId: <?php echo $proto->entry; ?>, name: '<?php echo $proto->GetName(); ?>'};
PageTemplate.set({breadcrumb: [0,0,<?php echo $proto->class; ?>,<?php echo $proto->subclass; ?>, <?php echo $proto->InventoryType; ?>]});
//]]></script>

<script type="text/javascript">//<![CDATA[
var _ = {};
_[<?php echo $proto->entry; ?>]={name_enus:'<?php echo $proto->GetName(); ?>',quality:<?php echo $proto->Quality; ?>,icon:'<?php echo $proto->icon; ?>'};
<?php
$questRewards = WoW_Items::GetQuestRewardSource();
if(is_array($questRewards)) {
    foreach($questRewards as $quest) {
        if(is_array($quest['items'])) {
            foreach($quest['items'] as $item) {
                echo sprintf('_[%d]={name_enus:\'%s\',quality:%d,icon:\'%s\'};', $item['entry'], (isset($item['name_loc']) && $item['name_loc'] != null) ? str_replace("'", "\'", $item['name_loc']) : str_replace("'", "\'", $item['name']), $item['quality'], $item['icon']);
            }
        }
    }
}
?>
$.extend(true, g_items, _);
_ = g_items;
_[<?php echo $proto->entry; ?>].tooltip_enus = '<?php echo $proto->tooltip; ?>';
<?php
$achievementsCriteria = WoW_Items::GetAchievementsCriteria();
if(is_array($achievementsCriteria)) {
    echo 'var _ = {};';
    foreach($achievementsCriteria as $achievement) {
        echo sprintf('_[%d]={name_enus:\'%s\',icon:\'%s\'};', $achievement['id'], str_replace("'", "\'", $achievement['name']), str_replace("'", "\'", $achievement['icon']));
    }
    echo '
$.extend(true, g_achievements, _);
_ = g_achievements;';
}
?>
//]]></script>
<table class="infobox">
<tr><th id="infobox-quick-facts"><?php echo WoW_Locale::GetString('template_item_quick_facts'); ?></th></tr>
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
$quickFacts = '[ul]';
if($proto->faction >= FACTION_HORDE) {
    $faction_string = WoW_Locale::GetString('template_faction_string_' . $proto->faction);
    $quickFacts .= sprintf('[li]%s [span class=icon-%s]%s[/span][/li]', WoW_Locale::GetString('template_faction_side'), $faction_string, WoW_Locale::GetString('faction_' . $faction_string));
}
if($proto->IsCanBeEquipped()) {
    if($proto->DisenchantID > 0) {
        $quickFacts .= sprintf('[li]%s[/li]', sprintf(WoW_Locale::GetString('template_item_disenchantable'), $proto->RequiredDisenchantSkill));
    }
    else {
        $quickFacts .= sprintf('[li]%s[/li]', WoW_Locale::GetString('template_item_cannot_be_disenchanted'));
    }
}
if($proto->MaxDurability > 0) {
    $quickFacts .= sprintf('[li]%s [money=%d][/li]', WoW_Locale::GetString('template_item_repair_cost'), $proto->CalculateDurabilityCost());
}
if($proto->patch != null) {
    $quickFacts .= sprintf('[li]%s %s[/li]', WoW_Locale::GetString('template_item_added_in_patch'), $proto->patch);
}
$quickFacts .= '[/ul]';
?>
Markup.printHtml("<?php echo $quickFacts; ?>", "sdhafcuvh0", { allow: Markup.CLASS_STAFF, dbpage: true });
//]]></script>

<div class="text">

<a href="javascript:;" class="button-red" onclick="this.blur(); g_getIngameLink('ffff8000', 'item:<?php echo $proto->entry; ?>:0:0:0:0:0:0:0:0', '<?php echo $proto->name; ?>')"><em><b><i>Link</i></b><span>Link</span></em></a>
<a href="javascript:;" id="dsgndslgn464d" class="button-red" onclick="this.blur(); ModelViewer.show({ type: 3, typeId: <?php echo $proto->entry; ?>, displayId: <?php echo $proto->displayid; ?>, slot: <?php echo $proto->InventoryType; ?> })"><em><b><i>View in 3D</i></b><span>View in 3D</span></em></a>
<a href="javascript:;" class="button-red" onclick="this.blur(); su_addToSaved('<?php echo $proto->entry; ?>', 1)"><em><b><i>Compare</i></b><span>Compare</span></em></a><a href="javascript:;" class="button-red" onclick="this.blur(); pr_showClassPresetMenu(this,<?php echo $proto->entry; ?>,<?php echo $proto->class; ?>,<?php echo $proto->InventoryType; ?>,event)"><em><b><i>Find upgrades...</i></b><span>Find upgrades...</span></em></a>
<div id="sdlkgnfdlkgndfg4"></div>
<script type="text/javascript">pr_addEquipButton('sdlkgnfdlkgndfg4', '<?php echo $proto->entry; ?>')</script>
<h1><?php echo $proto->name; ?></h1>

<div id="ic<?php echo $proto->entry; ?>" style="float: left"></div>
<div id="tt<?php echo $proto->entry; ?>" class="wowhead-tooltip" style="float: left; padding-top: 1px"></div>
<div style="clear: left"></div>
<div id="sl<?php echo $proto->entry; ?>" style="margin-left: 70px; margin-top: 4px; display: none;"></div>
<script type="text/javascript">//<![CDATA[
$WH.ge('ic<?php echo $proto->entry; ?>').appendChild(Icon.create('<?php echo $proto->icon; ?>', 2, null, 0, 1));
_ = $WH.ge('tt<?php echo $proto->entry; ?>'); __ = $WH.ge('sl<?php echo $proto->entry; ?>');
_.innerHTML = '<table><tr><td>' + ($WH.g_enhanceTooltip.bind(_))(<?php echo $proto->entry; ?>, true, true, __) + '</td><th style="background-position: top right"></th></tr><tr><th style="background-position: bottom left"></th><th style="background-position: bottom right"></th></tr></table>';
$WH.Tooltip.fixSafe(_, 1, 1, __);
//]]></script>
<?php
if($proto->faction >= FACTION_HORDE) {
    $current_faction = $proto->faction;
    $opposite_faction = $proto->faction == FACTION_ALLIANCE ? FACTION_HORDE : FACTION_ALLIANCE;
    $convert_item = WoW_Items::GetBasicItemInfo($proto->faction_convert);
    echo sprintf(WoW_Locale::GetString('template_item_faction_conversion'), WoW::GetWoWPath(), $proto->faction_convert, $convert_item['quality'], WoW::GetStaticUrl(), $convert_item['icon'], (isset($convert_item['name_loc']) && $convert_item['name_loc'] != null) ? $convert_item['name_loc'] : $convert_item['name'], WoW_Locale::GetString('template_faction_string_' . $opposite_faction), WoW_Locale::GetString('faction_' . WoW_Locale::GetString('template_faction_string_' . $opposite_faction)));
}
?>
<h2 class="clear">Related</h2>

</div>

<div id="jkbfksdbl4"></div>
<div id="lkljbjkb574" class="listview">
</div>
<script type="text/javascript">//<![CDATA[
var tabsRelated = new Tabs({parent: $WH.ge('jkbfksdbl4'), trackable: 'Item'});
<?php
$dropCreatures = WoW_Items::GetDropCreaturesSource();
if(is_array($dropCreatures)) {
    $count = count($dropCreatures['creatures']);
    echo 'new Listview({template: \'npc\', id: \'dropped-by\', name: LANG.tab_droppedby, tabs: tabsRelated, ' . ($count == 1 ? 'note: LANG.lvnote_itemdrops' . $dropCreatures['dropInfo'] . ',' : null ) .' parent: \'lkljbjkb574\', hiddenCols: [\'type\'], extraCols: [Listview.extraCols.count, Listview.extraCols.percent], sort:[\'-percent\', \'name\'], computeDataFunc: Listview.funcBox.initLootTable, data: [';
    $current = 1;
    foreach($dropCreatures['creatures'] as $creature) {
        echo sprintf('{"boss":%d,"classification":%d,"id":%d,"location":[%d],"maxlevel":%d,"minlevel":%d,"name":"%s","react":[%d,%d],"type":%d,count:%d,outof:%d',
            $creature['rank'] == 3 ? 1 : 0,
            $creature['rank'],
            $creature['entry'],
            $creature['areaID'],
            $creature['level'] == '??' ? 9999 : $creature['minlevel'],
            $creature['level'] == '??' ? 9999 : $creature['maxlevel'],
            str_replace('"', '\"', $creature['name']),
            -1, -1,
            $creature['type'],
            20,
            100
        );
        echo '}';
        if($current < $count) {
            echo ',';
        }
        ++$current;
    }
    echo ']});';
}
if(is_array($questRewards)) {
    $count = count($questRewards);
    $current = 1;
    echo 'new Listview({template: \'quest\', id: \'reward-from-q\', name: LANG.tab_rewardfrom, tabs: tabsRelated, parent: \'lkljbjkb574\', data: [';
    foreach($questRewards as $quest) {
        echo sprintf('{"category":%d,"category2":%d,"id":%d,"itemrewards":[%s],"level":%d,"name":"%s","reprewards":[%s],"reqlevel":%d,"side":%d,"wflags":8}',
            0, // [PH]
            0, // [PH]
            $quest['entry'],
            $quest['reward_items'],
            $quest['QuestLevel'],
            $quest['Title'],
            null, // [PH]
            $quest['MinLevel'],
            3 // [PH]
        );
        if($current < $count) {
            echo ',';
        }
        ++$current;
    }
    echo ']});';
}

if(is_array($achievementsCriteria)) {
    echo 'new Listview({template: \'achievement\', id: \'criteria-of\', name: LANG.tab_criteriaof, tabs: tabsRelated, parent: \'lkljbjkb574\', visibleCols: [\'category\'], computeDataFunc: Listview.funcBox.initStatisticFilter, onAfterCreate: Listview.funcBox.addStatisticIndicator, data: [';
    $count = count($achievementsCriteria);
    $current = 1;
    foreach($achievementsCriteria as $achievement) {
        echo sprintf('{"category":%d,"description":"%s","id":%d,"name":"%s","parentcat":%d,"points":%d,"side":%d,"type":%d}',
            $achievement['categoryId'],
            str_replace('"', '\"', $achievement['desc']),
            $achievement['id'],
            str_replace('"', '\"', $achievement['name']),
            $achievement['parentCategory'],
            $achievement['points'],
            $achievement['side'],
            $achievement['parentCategory'] != 1 ? 1 : 2
        );
        if($current < $count) {
            echo ',';
        }
        ++$current;
    }
    echo ']});';
}
?>
new Listview({template: 'comment', id: 'comments', name: LANG.tab_comments, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_comments0});
if(lv_links.length)
    new Listview({template: 'relatedlinks', id: 'links', name: LANG.tab_whatlinkshere, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_links});
new Listview({template: 'screenshot', id: 'screenshots', name: LANG.tab_screenshots, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_screenshots});
if(lv_videos.length || (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)))
	new Listview({template: 'video', id: 'videos', name: LANG.tab_videos, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_videos});
tabsRelated.flush();
//]]></script>

<div class="text">

<h2 class="clear">Contribute</h2>

</div>

<div id="lkgljhkv456" style="width: 50%"></div>

<div class="text" style="margin-right: 316px">
<div class="tabbed-contents" style=" clear: none">
<div id="tab-add-your-comment" style="display: none">

Please keep the following in mind when posting a comment:

<ul>
<li><div>Your comment must be in English or it will be removed.</div></li>
<li><div>Unsure how to post? Check out our <a href="/help=commenting-and-you" target="_blank">handy guide</a>!</div></li>
<li><div>You might want to proof-read your comments before posting them.</div></li><li><div>Please post questions on our <a href="/forums">forums</a> for quicker reply.</div></li></ul><form action="/" method="post">

<div class="comment-edit-body"><textarea class="comment-editbox" rows="10" cols="40" name="commentbody" disabled="disabled"></textarea></div>
<small>You are not signed in. Please <a href="/account=signin">sign in</a> to add your comment.</small>

</form>

</div>

<div id="tab-submit-a-screenshot" style="display: none">

Simply browse for your screenshot using the form below.

<ul>
<li><div>In-game screenshots are preferred over model-viewer-generated ones.</div></li>
<li><div>The higher the quality the better!</div></li>
<li><div>Be sure to read the <a href="/help=screenshots-tips-tricks" target="_blank">tips &amp; tricks</a> if you haven't before.</div></li>
</ul>

<form action="/" method="post">

<input type="file" name="screenshotfile" disabled="disabled" /><br />
<small>You are not signed in. Please <a href="/account=signin">sign in</a> to submit a screenshot.</small>

</form>

</div>

<div id="tab-suggest-a-video" style="display: none">

Simply type the URL of the video in the form below.

<div class="pad2"></div>
<form action="/video=add&amp;3.49623" method="post" enctype="multipart/form-data" onsubmit="return vi_validateForm(this)">

URL: <input type="text" name="videourl" style="width: 35%" /> <small>Supported: YouTube only</small>
<div class="pad2"></div>
Title: <input type="text" name="videotitle" maxlength="200" /> <small>Optional, up to 200 characters</small><br />
<div class="pad"></div>
<input type="submit" value="Submit" />

<div class="pad3"></div>
<small class="q0">Note: Your video will need to be approved before appearing on the site.</small>

</form>

</div>

<div id="tab-submit-your-data" style="display: none">

  <p>The <b>Wowhead Client</b> is a little application we use to keep our database up to date, and to provide you with some nifty extra functionality on the website! &nbsp;</p>
  <div class="pad2"></div>
  <p>It serves 2 main purposes: &nbsp;</p>
  
  <ol>
  <li><div>It maintains a WoW addon called the <b>Wowhead Looter</b>, which collects data as you play the game! &nbsp;</div></li>
  <li><div>It uploads the <b>collected data</b> to Wowhead in order to keep the database up-to-date! &nbsp;</div></li>
  </ol>
  
  <p>You can also use it to keep track of your completed quests, recipes, mounts, companion pets, and titles!&nbsp;</p>
  <div class="pad2"></div>
  <p>So, what are you waiting for? <a href="/client">Download the client</a> and get started.&nbsp;</p>

</div>

</div>
</div>

<script type="text/javascript">//<![CDATA[
var tabsContribute = new Tabs({parent: $WH.ge('lkgljhkv456')});
tabsContribute.add(LANG.tab_addyourcomment, {id: 'add-your-comment'});
tabsContribute.add(LANG.tab_submitascreenshot, {id: 'submit-a-screenshot'});
if(g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO))
	tabsContribute.add(LANG.tab_suggestavideo, {id: 'suggest-a-video'});
tabsContribute.add(LANG.tab_submityourdata, {id: 'submit-your-data'});
tabsContribute.flush();
//]]></script>