<?php
$achievement = WoW_Achievements::GetAchievement();
$iconId = 1;
?>
<script type="text/javascript">//<![CDATA[
var _ = g_users;

var lv_comments0 = [];
var lv_screenshots = [];
var lv_videos = [];
var lv_links = [];
var g_pageInfo = {type: 10, typeId: <?php echo $achievement['id']; ?>, name: '<?php echo str_replace("'", "\'", $achievement['name']); ?>'};
PageTemplate.set({breadcrumb: [0,9,<?php echo $achievement['type'] . ',' . $achievement['parentCategory'] . ',' . $achievement['categoryId']; ?>]});
//]]></script>

<table class="infobox">
<tr><th id="infobox-quick-facts">Quick Facts</th></tr>
<tr><td><div class="infobox-spacer"></div><div id="sdhafcuvh0"></div></td></tr>
<tr><th id="infobox-series">Series</th></tr>
<tr><td><div class="infobox-spacer"></div><table class="series"><tr><th>1.</th><td><div><b>Level 10</b></div></td></tr><tr><th>2.</th><td><div><a href="/achievement=7">Level 20</a></div></td></tr><tr><th>3.</th><td><div><a href="/achievement=8">Level 30</a></div></td></tr><tr><th>4.</th><td><div><a href="/achievement=9">Level 40</a></div></td></tr><tr><th>5.</th><td><div><a href="/achievement=10">Level 50</a></div></td></tr><tr><th>6.</th><td><div><a href="/achievement=11">Level 60</a></div></td></tr><tr><th>7.</th><td><div><a href="/achievement=12">Level 70</a></div></td></tr><tr><th>8.</th><td><div><a href="/achievement=13">Level 80</a></div></td></tr><tr><th>9.</th><td><div><a href="/achievement=4826">Level 85</a></div></td></tr></table></td></tr>
<tr><th id="infobox-screenshots">Screenshots</th></tr>
<tr><td><div class="infobox-spacer"></div><div id="infobox-sticky-ss"></div></td></tr>
<tr><th id="infobox-videos">Videos</th></tr>
<tr><td><div class="infobox-spacer"></div><div id="infobox-sticky-vi"></div></td></tr>
</table>
<script type="text/javascript">ss_appendSticky()</script>
<script type="text/javascript">vi_appendSticky()</script>
<script type="text/javascript">//<![CDATA[
Markup.printHtml("[ul][li]Points: [achievementpoints=10][/li][li]Side: Both[/li][/ul]", "sdhafcuvh0", { allow: Markup.CLASS_STAFF, dbpage: true });
//]]></script>

<div class="text">

<div id="lntlwentlsdn35" class="h1-icon"></div>

<a href="javascript:;" class="button-red" onclick="this.blur(); g_getIngameLink('ffffff00', 'achievement:<?php echo $achievement['id']; ?>:&quot;..UnitGUID(&quot;player&quot;)..&quot;:0:0:0:0:0:0:0:0', '<?php echo $achievement['name']; ?>')"><em><b><i>Link</i></b><span>Link</span></em></a>
<h1 class="h1-icon"><?php echo $achievement['name']; ?></h1>

<script type="text/javascript">
$WH.ge('lntlwentlsdn35').appendChild(Icon.create('<?php echo $achievement['icon']; ?>', 1));
</script>

<?php echo $achievement['desc']; ?>

<script type="text/javascript">//<![CDATA[
var _ = {};
_[<?php echo $achievement['id']; ?>]={name_enus:'<?php echo str_replace("'", "\'", $achievement['name']); ?>',icon:'<?php echo $achievement['icon']; ?>'};
<?php
if(is_array($achievement['criterias'])) {
    // Try to find data_achievement element
    foreach($achievement['criterias'] as &$cr) {
        if (isset($cr['data_achievement']) && $cr['requiredType'] == ACHIEVEMENT_CRITERIA_TYPE_COMPLETE_ACHIEVEMENT) {
            echo '_[' . $cr['data_achievement']['id'] . ']={name_enus:\'' . str_replace("'", "\'", $cr['data_achievement']['name']) . '\',icon:\'' . str_replace("'", "\'", $cr['data_achievement']['icon']) . '\'};';
        }
    }
}
?>
$.extend(true, g_achievements, _);
_ = g_achievements;
//]]></script>

<?php
if(is_array($achievement['criterias'])) {
    echo '<h3>Criteria';
    if(count($achievement['criterias']) > 1) {
        //echo ' &ndash; <small><b>Requires 1 out of ' . (count($achievement['criterias'])) . '</b></small>';
    }
    echo '</h3>';
    foreach($achievement['criterias'] as &$cr) {
        echo '<div style="float: left; margin-right: 25px"> 
<table class="iconlist"> 
<tr><th><ul><li><var>&nbsp;</var></li></ul></th><td>' . $cr['criteria_string'] . '</td></tr> 
</table> 
</div>';
    }
}
echo ' <br />';
if(is_array($achievement['titleReward'])) {
    foreach($achievement['titleReward'] as $rew) {
        if($rew['type'] == 'item' && is_array($rew['data'])) {
            echo '<h3>' . WoW_Locale::GetString('template_quest_rewards') . '</h3>' . WoW_Locale::GetString('template_achievement_item_reward') . '
            <table class="icontab">
            <tr>
            <th id="icontab-icon' . $iconId . '"></th><td><span class="q' . $rew['data']['quality'] . '"><a href="/item=' . $rew['data']['entry'] . '">' . $rew['data']['name'] . '</a></span></td>
            <th style="display: none"></th><td style="display: none"></td>
            </tr>
            </table>
            
            <script type="text/javascript">//<![CDATA[
            $WH.ge(\'icontab-icon' . $iconId . '\').appendChild(g_items.createIcon(' . $rew['data']['entry'] . ', 1, 1));
            //]]></script>';
        }
        elseif($rew['type'] == 'title' && is_array($rew['data']) && isset($rew['data']['id'])) {
            echo '<h3>' . WoW_Locale::GetString('template_quest_gains') . '</h3>
            <ul>
                <li><div>' . sprintf(WoW_Locale::GetString('template_achievement_title_reward'), $rew['data']['id'], $rew['data']['title']) . '</div></li>
            </ul> ';
        }
    }
}
?>

<h2 class="clear">Related</h2>

</div>

<div id="jkbfksdbl4"></div>
<div id="lkljbjkb574" class="listview">
</div>
<script type="text/javascript">//<![CDATA[
var tabsRelated = new Tabs({parent: $WH.ge('jkbfksdbl4'), trackable: 'Achievement'});
new Listview({template: 'comment', id: 'comments', name: LANG.tab_comments, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_comments0});
if(lv_links.length)
	new Listview({template: 'relatedlinks', id: 'links', name: LANG.tab_whatlinkshere, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_links});
new Listview({template: 'screenshot', id: 'screenshots', name: LANG.tab_screenshots, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_screenshots});
if(lv_videos.length)
	new Listview({template: 'video', id: 'videos', name: LANG.tab_videos, tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_videos});
tabsRelated.flush();
//]]></script>
<?php WoW_Template::LoadTemplate('block_contribute'); ?>