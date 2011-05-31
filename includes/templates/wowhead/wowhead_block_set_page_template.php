<script type="text/javascript">//<![CDATA[
<?php
if(WoW_Locale::GetLocaleID() > 0) {
    echo sprintf('Locale.set(%d);', WoW_Locale::GetLocaleID());
}
?>
PageTemplate.set({pageName: '<?php echo WoW_Template::GetPageIndex(); ?>', activeTab: <?php echo WoW_Template::GetPageData('activeTab') ?>, breadcrumb: [<?php echo WoW_Template::GetPageData('breadcrumb'); ?>]});
PageTemplate.init();
g_captchaType = 1;g_dataKey = '60770694807121612389db4ad8f344000d5cab78';g_host = 'http://www01.wowhead.com';
//]]></script>
