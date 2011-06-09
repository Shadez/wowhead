<?php
$quest = null;
$items = null;
$achievements = null;
$quest_data = WoW_Quests::GetQuest();
if(isset($quest_data['quest'])) {
    $quest = $quest_data['quest'];
}
if(isset($quest_data['items'])) {
    $items = $quest_data['items'];
}
if(isset($quest_data['achievements'])) {
    $achievements = $quest_data['achievements'];
}
?>
<script type="text/javascript">//<![CDATA[
var _ = g_users;
var lv_comments0 = [];
var _ = g_users;
var lv_screenshots = [];
var lv_videos = [];
var lv_links = [];
var g_pageInfo = {type: 5, typeId: <?php echo $quest['entry']; ?>, name: '<?php echo addslashes($quest['Title']); ?>'};
PageTemplate.set({breadcrumb: [0,3<?php // Temporary hack ?>]});
//]]></script> 
 
<script type="text/javascript">//<![CDATA[
var _ = {};
<?php
if(is_array($items)) {
    foreach($items as $item) {
        echo sprintf('_[%d]={name_enus:\'%s\',quality:%d,icon:\'%s\',sellprice:%d};', $item['entry'], addslashes($item['name']), $item['quality'], $item['icon'], $item['sellprice']);
    }
}
?>
$.extend(true, g_items, _);
_ = g_items;
var _ = {};
<?php
if(is_array($achievements)) {
    foreach($achievements as $ach) {
        echo sprintf('_[%d]={name_enus:\'%s\',icon:\'%s\'};', $ach['id'], addslashes($ach['name']), addslashes($ach['icon']));
    }
}
?>
$.extend(true, g_achievements, _);
_ = g_achievements;
//]]></script> 
 
<div style="float: right"><table class="infobox"> 
<tr><th id="infobox-quick-facts">Quick Facts</th></tr> 
<tr><td><div class="infobox-spacer"></div><div id="sdhafcuvh0"></div></td></tr> 
<tr><th id="infobox-series">Series</th></tr> 
<tr><td><div class="infobox-spacer"></div><table class="series"><tr><th>1.</th><td><div><a href="/quest=24545">The Sacred and the Corrupt</a></div></td></tr><tr><th>2.</th><td><div><a href="/quest=24743">Shadow's Edge</a></div></td></tr><tr><th>3.</th><td><div><a href="/quest=24547">A Feast of Souls</a></div></td></tr><tr><th>4.</th><td><div><a href="/quest=24749">Unholy Infusion</a></div></td></tr><tr><th>5.</th><td><div><a href="/quest=24756">Blood Infusion</a></div></td></tr><tr><th>6.</th><td><div><a href="/quest=24757">Frost Infusion</a></div></td></tr><tr><th>7.</th><td><div><a href="/quest=24548">The Splintered Throne</a></div></td></tr><tr><th>8.</th><td><div><b>Shadowmourne...</b></div></td></tr><tr><th>9.</th><td><div><a href="/quest=24748">The Lich King's Last Stand</a></div></td></tr></table></td></tr> 
<tr><th id="infobox-screenshots">Screenshots</th></tr> 
<tr><td><div class="infobox-spacer"></div><div id="infobox-sticky-ss"></div></td></tr> 
<tr><th id="infobox-videos">Videos</th></tr> 
<tr><td><div class="infobox-spacer"></div><div id="infobox-sticky-vi"></div></td></tr> 
</table> 
<script type="text/javascript">ss_appendSticky()</script> 
<script type="text/javascript">vi_appendSticky()</script> 
<script type="text/javascript">//<![CDATA[
Markup.printHtml("[ul][li]Level: 80[/li][li]Requires level 80[/li][li]Type: Raid[/li][li]Side: Both[/li][li][icon name=quest_start]Start: [url=/npc=37120]Highlord Darion Mograine[/url][/icon][/li][li][icon name=quest_end]End: [url=/npc=37120]Highlord Darion Mograine[/url][/icon][/li][li]Sharable[/li][li]Difficulty: [color=r2]80[/color][small] &nbsp;[/small][color=r3]83[/color][small] &nbsp;[/small][color=r4]94[/color][/li][li]Added in patch 3.3.0[/li][/ul]", "sdhafcuvh0", { allow: Markup.CLASS_STAFF, dbpage: true });
//]]></script> 
 
<a href="javascript:;" class="button-red" onclick="this.blur(); g_getIngameLink('ffffff00', 'quest:<?php echo $quest['entry']; ?>:80', '<?php echo addslashes($quest['Title']); ?>')"><em><b><i>Link</i></b><span>Link</span></em></a><div style="clear: right"></div><div style="float: right"> 
 
</div></div><div class="text"> 
 
<h1><?php echo $quest['Title']; ?></h1> 
 
<?php echo $quest['Objectives']; ?>
 
<div id="lksjdowlha"></div>

<div id="fweiuasf"></div>

<div style="clear: left"></div>
<script type="text/javascript">//<![CDATA[
var g_mapperData = {};
var myMapper = new Mapper({parent: 'fweiuasf', objectives: {
4812: {zone: 'Icecrown Citadel', mappable: 1, levels: {1: [{ type: '1', point: 'start', name: 'Highlord Darion Mograine', coord: [42.8,22.8], coords: [[42.4,22.4],[42.4,22.6],[42.6,22.4],[42.8,22.8]], id: 37120, reactalliance: 1, reacthorde: 1},{ type: '1', point: 'end', name: 'Highlord Darion Mograine', coord: [42.8,22.8], coords: [[42.4,22.4],[42.4,22.6],[42.6,22.4],[42.8,22.8]], id: 37120, reactalliance: 1, reacthorde: 1}]}}
}, zoneparent: 'lksjdowlha', zones: [[4812,1]], missing: 0});
//]]></script> 
<h3><a href="javascript:;" class="disclosure-off" onclick="return g_disclose($WH.ge('lknlksndgg-completion'), this)">Completion</a></h3> 
 
<div id="lknlksndgg-completion" style="display: none">Congratulations, &lt;class&gt;.<br /><br />Against insurmountable odds, you have weathered the storm.<br /><br />I trust that you shall find your reward proportionate to your conviction...
 
</div> 
 
<h3>Rewards</h3>

<?php
if($quest['ReceiveRewardText']['text'] != null) {
    echo 'You will receive: ' . $quest['ReceiveRewardText']['text'];
    if($quest['ReceiveRewardText']['script'] != null) {
        echo '<script type="text/javascript">//<![CDATA[
        ' . $quest['ReceiveRewardText']['script'] . 
        '//]]>
        </script>';
    }
}
?>

<?php
if($quest['ChoiceRewardText']['text'] != null) {
    echo 'You will be able to choose one of these rewards:
    <div class="pad"></div>' . $quest['ChoiceRewardText']['text'];
    if($quest['ChoiceRewardText']['script'] != null) {
        echo '<script type="text/javascript">//<![CDATA[
        ' . $quest['ChoiceRewardText']['script'] . 
        '//]]>
        </script>';
    }
}
?>
<!--
<h3>Gains</h3> 
 
Upon completion of this quest you will gain:
 
<ul> 
<li><div>44,100 experience</div></li> 
<li><div><span>3,000</span> reputation with <a href="/faction=1156">The Ashen Verdict</a></div></li></ul> 
-->
<h2 class="clear">Related</h2> 
 
</div> 
 
<div id="jkbfksdbl4"></div>

<div id="lkljbjkb574" class="listview">

</div>

<script type="text/javascript">//<![CDATA[
var tabsRelated = new Tabs({parent: $WH.ge('jkbfksdbl4'), trackable: 'Quest'});
<?php
if(is_array($achievements)) {
    echo 'new Listview({template: \'achievement\', id: \'criteria-of\', name: LANG.tab_criteriaof, tabs: tabsRelated, parent: \'lkljbjkb574\', visibleCols: [\'category\'], computeDataFunc: Listview.funcBox.initStatisticFilter, onAfterCreate: Listview.funcBox.addStatisticIndicator, data: [';
    $count = count($achievements);
    $current = 1;
    foreach($achievements as $ach) {
        echo sprintf('{"category":%d,"description":"%s","id":%d,"name":"%s","parentcat":%d,"points":%d,"side":%d,"type":%d}',
            $ach['categoryId'],
            str_replace('"', '\"', $ach['desc']),
            $ach['id'],
            str_replace('"', '\"', $ach['name']),
            $ach['parentCategory'],
            $ach['points'],
            $ach['side'],
            $ach['parentCategory'] == 1 ? 2 : 1
        );
        if($current < $count) {
            echo ', ';
        }
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

<form action="/video=add&amp;5.24549" method="post" enctype="multipart/form-data" onsubmit="return vi_validateForm(this)">



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
