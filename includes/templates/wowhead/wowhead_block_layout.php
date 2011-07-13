<div class="layout nosidebar" id="layout">
<div class="layout-inner">

<div class="header">
<h1><?php echo WoW_Template::GetPageTitle(true); ?></h1>

<a href="<?php echo WoW::GetWoWPath(); ?>/" class="header-logo"></a>
</div>

<div class="sidebar" id="sidebar">
<div class="sidebar-inner">

</div>
</div>

<div class="wrapper" id="wrapper">
<div class="wrapper-center" id="wrapper-center"></div>
<div class="wrapper-right" id="wrapper-right"><a href="#" class="header-expandsite" id="header-expandsite"></a></div>

<?php WoW_Template::LoadTemplate('block_toplinks'); ?>

<div class="toptabs" id="toptabs"></div>
<div class="topbar" id="topbar">
<div class="topbar-search">
<form action="<?php echo WoW::GetWoWPath(); ?>/search"><input name="q" value="<?php echo WoW_Template::GetPageData('search_terms'); ?>" /></form></div>
<div class="topbar-buttons"></div>
</div>
<div class="main" id="main">
<div class="main-precontents" id="main-precontents"></div>
<div class="main-contents" id="main-contents">
<?php
if(WoW_Template::GetPageAnnouncement() >= 0) {
    echo '<div id="announcement-' . WoW_Template::GetPageAnnouncement() . '"></div>';
}
?>

<?php
if(WoW::IsRegisteredPage() && !WoW_Template::IsErrorPage()) {
    WoW_Template::LoadTemplate('block_set_page_template');
    // LOAD APPROPRIATE TEMPLATE FOR EACH REGISTERED PAGE HERE!
    WoW_Template::LoadTemplate('content_' . WoW_Template::GetPageIndex());
}
else {
    WoW_Template::LoadTemplate('block_set_page_template_unknown');
    WoW_Template::LoadTemplate('content_error');
}
?>

<div class="clear"></div>

</div>
</div>
