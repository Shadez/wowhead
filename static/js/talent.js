var tc_loaded = false,
    tc_object, tc_classId = -1,
    tc_classIcons = {},
    tc_build = "",
    tc_glyphs = "";

function tc_init() {
    var c;
    PageTemplate.set({
        breadcrumb: [1, 0]
    });
    $WH.ge("tc-classes").className = "choose";
    var e = g_sortJsonArray(g_chr_classes, g_chr_classes);
    c = $WH.ge("tc-classes-inner");
    for (var d = 0, b = e.length; d < b; ++d) {
        var h = e[d];
        var f = Icon.create("class_" + g_file_classes[h], 1, null, "javascript:;");
        var g = Icon.getLink(f);
        tc_classIcons[h] = f;
        g.onclick = tc_classClick.bind(g, h);
        g.onmouseover = tc_classOver.bind(g, h);
        g.onmouseout = $WH.Tooltip.hide;
        $WH.ae(c, f)
    }
    var a = $WH.ce("div");
    a.className = "clear";
    $WH.ae(c, a);
    tc_object = new TalentCalc();
    tc_object.initialize("tc-itself", {
        onChange: tc_onChange
    });
    tc_readPound();
    PoundChecker.start(tc_readPound)
}
function tc_classClick(a) {
    if (tc_object.setClass(a)) {
        $WH.Tooltip.hide()
    }
    return false
}
function tc_classOver(a) {
    $WH.Tooltip.show(this, "<b>" + g_chr_classes[a] + "</b>", 0, 0, "c" + a)
}
function tc_onChange(a, e, d) {
    var c;
    if (e.classId != tc_classId) {
        if (!tc_loaded) {
            var c = $WH.ge("tc-classes");
            $WH.de($WH.gE(c, "p")[0]);
            c.className = "";
            tc_loaded = true
        }
        if (tc_classId != -1) {
            c = tc_classIcons[tc_classId];
            c.className = tc_classIcons[tc_classId].className.replace("iconmedium-gold-selected", "")
        }
        tc_classId = e.classId;
        c = tc_classIcons[tc_classId];
        c.className += " iconmedium-gold-selected";
        PageTemplate.set({
            breadcrumb: [1, 0, tc_classId]
        })
    }
    tc_build = a.getWhBuild();
    tc_glyphs = a.getWhGlyphs();
    var b = "talent#" + tc_build;
    if (tc_glyphs != "") {
        b += ":" + tc_glyphs
    }
    location.replace(b);
    var g = document.title;
    if (g.indexOf("/") != -1) {
        var f = g.indexOf("- ");
        if (f != -1) {
            g = g.substring(f + 2)
        }
    }
    document.title = g_chr_classes[tc_classId] + " (" + d[0].k + "/" + d[1].k + "/" + d[2].k + ") - " + g;
    if (d.k == 41) {
        $.get(wowheadUrl + "/tc-explored", null, function () {
            AchievementCheck()
        })
    }
}
function tc_readPound() {
    if (location.hash.indexOf("-") != -1) {
        var e = location.hash.substr(1).split("-"),
            a = e[0] || "",
            g = e[1] || "",
            d = -1;
        for (var h in g_file_classes) {
            if (g_file_classes[h] == a) {
                d = h;
                break
            }
        }
        if (d != -1) {
            tc_object.setBlizzBuild(d, g)
        }
    } else {
        var e = location.hash.substr(1).split(".");
        var c = false;
        if (e.length == 2) {
            c = true
        }
        e = e[0].split(":");
        var f = e[0] || "",
            b = e[1] || "";
        if (!tc_object.getBonusPoints() && c) {
            tc_object.setBonusPoints()
        }
        if (tc_build != f) {
            tc_build = f;
            tc_object.setWhBuild(tc_build)
        }
        if (tc_glyphs != b) {
            tc_glyphs = b;
            tc_object.setWhGlyphs(tc_glyphs)
        }
    }
};