<div class="footer"><div class="footer-links linklist"><a href="<?php echo WoW::GetWoWPath(); ?>/aboutus">About us &amp; contact</a>|<a href="<?php echo WoW::GetWoWPath(); ?>/tos">Terms of use</a>|<a href="<?php echo WoW::GetWoWPath(); ?>/privacy">Privacy</a>|<a href="<?php echo WoW::GetWoWPath(); ?>/advertise">Advertise</a>|<a href="#" id="footer-links-language"></a></div>
<div class="footer-copy">&copy; 2011 Wowhead /&nbsp;<a href="http://www.zam.com" target="_blank" class="footer-copy-zam"></a></div>
</div>
<?php
if(WoW_Template::GetPageIndex() == 'home') {
    echo sprintf('<script type="text/javascript">//<![CDATA[
PageTemplate.set({pageName: \'%s\'});
PageTemplate.init();
g_captchaType = 1;g_dataKey = \'dc6c325d392a0f6fb411b6fb9c3fdf31d5cbf606\';g_host = \'http://www02.wowhead.com\';
//]]></script>', WoW::GetLastUrlData());
}
?>

<noscript><div id="noscript-bg"></div><div id="noscript-text"><b>This site makes extensive use of JavaScript.</b><br />Please <a href="https://www.google.com/support/adsense/bin/answer.py?answer=12654" target="_blank">enable JavaScript</a> in your browser.</div></noscript>
