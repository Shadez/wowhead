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
<li><div>You might want to proof-read your comments before posting them.</div></li><li><div>Please post questions on our <a href="<?php echo WoW::GetWoWPath(); ?>/forums">forums</a> for quicker reply.</div></li></ul><form action="<?php echo WoW::GetWoWPath(); ?>/" method="post">

<div class="comment-edit-body"><textarea class="comment-editbox" rows="10" cols="40" name="commentbody" disabled="disabled"></textarea></div>
<small>You are not signed in. Please <a href="<?php echo WoW::GetWoWPath(); ?>/account=signin">sign in</a> to add your comment.</small>

</form>

</div>

<div id="tab-submit-a-screenshot" style="display: none">

Simply browse for your screenshot using the form below.

<ul>
<li><div>In-game screenshots are preferred over model-viewer-generated ones.</div></li>
<li><div>The higher the quality the better!</div></li>
<li><div>Be sure to read the <a href="/help=screenshots-tips-tricks" target="_blank">tips &amp; tricks</a> if you haven't before.</div></li>
</ul>

<form action="<?php echo WoW::GetWoWPath(); ?>/" method="post">

<input type="file" name="screenshotfile" disabled="disabled" /><br />
<small>You are not signed in. Please <a href="<?php echo WoW::GetWoWPath(); ?>/account=signin">sign in</a> to submit a screenshot.</small>

</form>

</div>

<div id="tab-suggest-a-video" style="display: none">

Simply type the URL of the video in the form below.

<div class="pad2"></div>
<form action="<?php echo WoW::GetWoWPath(); ?>/video=add&amp;1.2748" method="post" enctype="multipart/form-data" onsubmit="return vi_validateForm(this)">

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
