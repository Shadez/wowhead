<div class="home-wrapper">
<h1><?php echo WoW::GetSiteTitle(); ?></h1>
<div class="home-logo" id="home-logo">
</div>

<div class="home-search" id="home-search">
	<form method="get" action="<?php echo WoW::GetUrl(); ?>/search">
		<input type="text" name="q" />
	</form>
</div>

<div class="home-menu" id="home-menu"></div>
<p class="home-oneliner text" id="home-oneliner"></p>

<script type="text/javascript">//<![CDATA[
Markup.printHtml('Did you know [icon url=<?php echo WoW::GetStaticUrl(); ?>/favicon.ico][/icon][b]Wowhead[/b] has its own WoW news site? Check it out! [b][url=http://www.wowheadnews.com]Wowhead News[/url][/b]', 'home-oneliner', { allow: Markup.CLASS_ADMIN });
//]]></script>

<div class="home-featuredbox home-featuredbox-extended" style="background-image: url(<?php echo WoW::GetStaticUrl(); ?>/images/home/featured/featured-203-extended.png)" id="home-featuredbox">
<div class="home-featuredbox-links">
<a href="http://www.wowheadnews.com/blog=189265/dungeon-journal-preview-all-seven-firelands-encounters-unveil" title="Check out all the Firelands' bosses now!" style="left: 216px; top: 18px; width: 180px; height: 158px"></a>
<var style="left: 216px; top: 18px; width: 180px; height: 158px"></var>
<a href="http://www.wowheadnews.com/blog=189203/patch-4-2-ptr-build-14107-achievements-spell-changes-items-an" title="Check out the latest Patch 4.2 items, including T12 armor and more!" style="left: 400px; top: 18px; width: 98px; height: 158px"></a>
<var style="left: 400px; top: 18px; width: 98px; height: 158px"></var>
</div>
<div class="home-featuredbox-inner text" id="lkdngndfgndf52"></div>
</div>

<script type="text/javascript">//<![CDATA[
Markup.printHtml('[ul]\n[li][b][url=http://www.wowheadnews.com/blog=189646/patch-4-2-elemental-bonds-quest-preview]Elemental Bonds Video[/url][/b][/li]\n[li][b][url=http://www.wowheadnews.com/blog=189579/reputation-and-daily-rewards-in-patch-4-2]4.2 Daily/Rep Rewards[/url][/b][/li]\n[li][b][url=http://www.wowheadnews.com/blog=189435]Tier 12 Video Previews[/url][/b][/li]\n[/ul]\n\n[ul]\n[li][b][url=http://www.wowhead.com/patchnotes=4.2.0-ptr]4.2 PTR Patch Notes[/url][/b][/li]\n[li][b][url=http://ptr.wowhead.com/latest-additions]Latest PTR Additions[/url][/b][/li]\n[/ul]', 'lkdngndfgndf52', { allow: Markup.CLASS_ADMIN });
//]]></script>

</div>

<?php
WoW_Template::LoadTemplate('block_toplinks');
?>
