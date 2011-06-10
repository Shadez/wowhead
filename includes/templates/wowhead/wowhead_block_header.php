<!DOCTYPE html>
<html>
<head>

<title><?php echo WoW_Template::GetPageTitle(); ?></title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="description" content="<?php echo WoW_Template::GetPageData('meta_description'); ?>" />

<link rel="shortcut icon" href="<?php echo WoW::GetStaticUrl() ?>/favicon.ico" />
<link rel="canonical" href="<?php echo WoW::GetUrl(); ?>" />
<link rel="search" type="application/opensearchdescription+xml" href="<?php echo WoW::GetStaticUrl(); ?>/download/searchplugins/wowhead.xml" title="Wowhead" />
<link rel="apple-touch-icon-precomposed" href="<?php echo WoW::GetStaticUrl(); ?>/apple-touch-icon.png" />

<?php
echo WoW_Template::GetTemplateHeader();

echo WoW_Template::GetCSSForPage();
?>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script>

<script type="text/javascript">
var wowheadUrl = '<?php echo WoW::GetWoWPath(); ?>';
var wowheadFullUrl = '<?php echo WoW::GetUrl(); ?>';
var wowheadDomain = '<?php echo WoW::GetDomain(); ?>';
var currentPage = '<?php echo WoW::GetCurrentPageUrl(); ?>';
var wowheadLocale = '<?php echo WoW_Locale::GetLocale(LOCALE_SPLIT); ?>';
var wowheadLocaleID = <?php echo WoW_Locale::GetLocaleID(); ?>;
</script>

<script type="text/javascript">//<![CDATA[
$.extend(window, {g_staticUrl: '<?php echo WoW::GetStaticUrl(); ?>', g_serverTime: new Date('<?php echo date('Y/m/d H:i:s'); ?>')});
//]]></script>

<?php
echo WoW_Template::GetJSForPage();

switch(WoW_Template::GetPageIndex()) {
    case 'item':
    case 'items':
        echo sprintf('<script type="text/javascript" src="%sdata=weight-presets.zones"></script>', WoW::GetUrl());
        break;
    case 'talent':
        echo sprintf('<script type="text/javascript" src="%sdata=glyphs"></script>', WoW::GetUrl(), WoW_Locale::GetLocaleID());
        break;
}
?>

<script type="text/javascript" src="<?php echo WoW::GetUrl(); ?>data=user"></script>

</head>

