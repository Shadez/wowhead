<?php
// Data check
if(WoW_Template::GetPageIndex() == 'data') {
    WoW_Template::LoadTemplate('block_data');
}
WoW_Template::LoadTemplate('block_header');
?>
<body class="<?php
$body_class = explode('=', WoW::GetLastUrlData());
echo $body_class[0];
?>">

<div style="position: absolute; width: 1px; height: 1px; background: url('images/ui/wsa-notification.png') no-repeat"></div>

<!--
<div class="beta-ptr-links">
<div><a href="http://old.wowhead.com/" rel="np" title="View the old version of this page">&#171; Archive</a></div>
<div><a href="http://ptr.wowhead.com/" rel="np" title="View the PTR version of this page">&#171; PTR</a></div>
</div>
-->

<?php
if(WoW_Template::GetPageIndex() == 'home') {
    WoW_Template::LoadTemplate('content_home');
}
else {
    WoW_Template::LoadTemplate('block_layout');
}

WoW_Template::LoadTemplate('block_footer');
?>

</body>
</html>