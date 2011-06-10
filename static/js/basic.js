if (typeof $WH == "undefined") {
    var $WH = {}
}
if ((whPos = document.domain.indexOf(".wowhead.com")) != -1) {
    document.domain = document.domain.substring(whPos + 1)
}
$WH.$E = function (a) {
    if (!a) {
        if (typeof event != "undefined") {
            a = event
        } else {
            return null
        }
    }
    if (a.which) {
        a._button = a.which
    } else {
        a._button = a.button;
        if ($WH.Browser.ie6789 && a._button) {
            if (a._button & 4) {
                a._button = 2
            } else {
                if (a._button & 2) {
                    a._button = 3
                }
            }
        } else {
            a._button = a.button + 1
        }
    }
    a._target = a.target ? a.target : a.srcElement;
    a._wheelDelta = a.wheelDelta ? a.wheelDelta : -a.detail;
    return a
};
$WH.$A = function (c) {
    var e = [];
    for (var d = 0, b = c.length; d < b; ++d) {
        e.push(c[d])
    }
    return e
};
if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        var c = this,
            a = $WH.$A(arguments),
            b = a.shift();
        return function () {
            return c.apply(b, a.concat($WH.$A(arguments)))
        }
    }
}
$WH.bindfunc = function () {
    args = $WH.$A(arguments);
    var b = args.shift();
    var a = args.shift();
    return function () {
        return b.apply(a, args.concat($WH.$A(arguments)))
    }
};
if (!String.prototype.ltrim) {
    String.prototype.ltrim = function () {
        return this.replace(/^\s*/, "")
    }
}
if (!String.prototype.rtrim) {
    String.prototype.rtrim = function () {
        return this.replace(/\s*$/, "")
    }
}
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.ltrim().rtrim()
    }
}
if (!String.prototype.removeAllWhitespace) {
    String.prototype.removeAllWhitespace = function () {
        return this.replace("/s+/g", "")
    }
}
$WH.strcmp = function (d, c) {
    if (d == c) {
        return 0
    }
    if (d == null) {
        return -1
    }
    if (c == null) {
        return 1
    }
    var f = parseFloat(d);
    var e = parseFloat(c);
    if (!isNaN(f) && !isNaN(e) && f != e) {
        return f < e ? -1 : 1
    }
    if (typeof d == "string" && typeof c == "string") {
        return d.localeCompare(c)
    }
    return d < c ? -1 : 1
};
$WH.trim = function (a) {
    return a.replace(/(^\s*|\s*$)/g, "")
};
$WH.rtrim = function (c, d) {
    var b = c.length;
    while (--b > 0 && c.charAt(b) == d) {}
    c = c.substring(0, b + 1);
    if (c == d) {
        c = ""
    }
    return c
};
$WH.sprintf = function (b) {
    var a;
    for (a = 1, len = arguments.length; a < len; ++a) {
        b = b.replace("$" + a, arguments[a])
    }
    return b
};
$WH.sprintfa = function (b) {
    var a;
    for (a = 1, len = arguments.length; a < len; ++a) {
        b = b.replace(new RegExp("\\$" + a, "g"), arguments[a])
    }
    return b
};
$WH.sprintfo = function (c) {
    if (typeof c == "object" && c.length) {
        var a = c;
        c = a[0];
        var b;
        for (b = 1; b < a.length; ++b) {
            c = c.replace("$" + b, a[b])
        }
        return c
    }
};
$WH.str_replace = function (e, d, c) {
    while (e.indexOf(d) != -1) {
        e = e.replace(d, c)
    }
    return e
};
$WH.urlencode = function (a) {
    a = encodeURIComponent(a);
    a = $WH.str_replace(a, "+", "%2B");
    return a
};
$WH.urlencode2 = function (a) {
    a = encodeURIComponent(a);
    a = $WH.str_replace(a, "%20", "+");
    a = $WH.str_replace(a, "%3D", "=");
    return a
};
$WH.number_format = function (a) {
    x = ("" + parseFloat(a)).split(".");
    a = x[0];
    x = x.length > 1 ? "." + x[1] : "";
    if (a.length <= 3) {
        return a + x
    }
    return $WH.number_format(a.substr(0, a.length - 3)) + "," + a.substr(a.length - 3) + x
};
$WH.is_array = function (b) {
    return !!(b && b.constructor == Array)
};
$WH.in_array = function (c, g, h, e) {
    if (c == null) {
        return -1
    }
    if (h) {
        return $WH.in_arrayf(c, g, h, e)
    }
    for (var d = e || 0, b = c.length; d < b; ++d) {
        if (c[d] == g) {
            return d
        }
    }
    return -1
};
$WH.in_arrayf = function (c, g, h, e) {
    for (var d = e || 0, b = c.length; d < b; ++d) {
        if (h(c[d]) == g) {
            return d
        }
    }
    return -1
};
$WH.rs = function () {
    var e = $WH.rs.random;
    var b = "";
    for (var a = 0; a < 16; a++) {
        var d = Math.floor(Math.random() * e.length);
        if (a == 0 && d < 11) {
            d += 10
        }
        b += e.substring(d, d + 1)
    }
    return b
};
$WH.rs.random = "0123456789abcdefghiklmnopqrstuvwxyz";
$WH.isset = function (a) {
    return typeof window[a] != "undefined"
};
if (!$WH.isset("console")) {
    console = {
        log: function () {}
    }
}
$WH.array_walk = function (d, h, c) {
    var g;
    for (var e = 0, b = d.length; e < b; ++e) {
        g = h(d[e], c, d, e);
        if (g != null) {
            d[e] = g
        }
    }
};
$WH.array_apply = function (d, h, c) {
    var g;
    for (var e = 0, b = d.length; e < b; ++e) {
        h(d[e], c, d, e)
    }
};
$WH.array_filter = function (c, g) {
    var e = [];
    for (var d = 0, b = c.length; d < b; ++d) {
        if (g(c[d])) {
            e.push(c[d])
        }
    }
    return e
};
$WH.array_index = function (c, e, g, h) {
    if (!$WH.is_array(c)) {
        return false
    }
    if (!c.__R || h) {
        c.__R = {};
        if (!g) {
            g = function (a) {
                return a
            }
        }
        for (var d = 0, b = c.length; d < b; ++d) {
            c.__R[g(c[d])] = d
        }
    }
    return (e == null ? c.__R : !isNaN(c.__R[e]))
};
$WH.array_compare = function (d, c) {
    if (d.length != c.length) {
        return false
    }
    var g = {};
    for (var f = d.length; f >= 0; --f) {
        g[d[f]] = true
    }
    var e = true;
    for (var f = c.length; f >= 0; --f) {
        if (g[c[f]] === undefined) {
            e = false
        }
    }
    return e
};
$WH.array_unique = function (b) {
    var c = [];
    var e = {};
    for (var d = b.length - 1; d >= 0; --d) {
        e[b[d]] = 1
    }
    for (var d in e) {
        c.push(d)
    }
    return c
};
$WH.ge = function (a) {
    if (typeof a != "string") {
        return a
    }
    return document.getElementById(a)
};
$WH.gE = function (a, b) {
    return a.getElementsByTagName(b)
};
$WH.ce = function (d, b, e) {
    var a = document.createElement(d);
    if (b) {
        $WH.cOr(a, b)
    }
    if (e) {
        $WH.ae(a, e)
    }
    return a
};
$WH.de = function (a) {
    if (!a || !a.parentNode) {
        return
    }
    a.parentNode.removeChild(a)
};
$WH.ae = function (a, b) {
    if ($WH.is_array(b)) {
        $WH.array_apply(b, a.appendChild.bind(a));
        return b
    } else {
        return a.appendChild(b)
    }
};
$WH.aef = function (a, b) {
    return a.insertBefore(b, a.firstChild)
};
$WH.ee = function (a, b) {
    if (!b) {
        b = 0
    }
    while (a.childNodes[b]) {
        a.removeChild(a.childNodes[b])
    }
};
$WH.ct = function (a) {
    return document.createTextNode(a)
};
$WH.st = function (a, b) {
    if (a.firstChild && a.firstChild.nodeType == 3) {
        a.firstChild.nodeValue = b
    } else {
        $WH.aef(a, $WH.ct(b))
    }
};
$WH.nw = function (a) {
    a.style.whiteSpace = "nowrap"
};
$WH.rf = function () {
    return false
};
$WH.rf2 = function (a) {
    a = $WH.$E(a);
    if (a.ctrlKey || a.shiftKey || a.altKey || a.metaKey) {
        return
    }
    return false
};
$WH.tb = function () {
    this.blur()
};
$WH.aE = function (b, c, a) {
    if ($WH.Browser.ie6789) {
        b.attachEvent("on" + c, a)
    } else {
        b.addEventListener(c, a, false)
    }
};
$WH.dE = function (b, c, a) {
    if ($WH.Browser.ie6789) {
        b.detachEvent("on" + c, a)
    } else {
        b.removeEventListener(c, a, false)
    }
};
$WH.sp = function (a) {
    if (!a) {
        a = event
    }
    if ($WH.Browser.ie6789) {
        a.cancelBubble = true
    } else {
        a.stopPropagation()
    }
};
$WH.sc = function (h, j, d, f, g) {
    var e = new Date();
    var c = h + "=" + escape(d) + "; ";
    e.setDate(e.getDate() + j);
    c += "expires=" + e.toUTCString() + "; ";
    if (f) {
        c += "path=" + f + "; "
    }
    if (g) {
        c += "domain=" + g + "; "
    }
    document.cookie = c;
    $WH.gc(h);
    $WH.gc.C[h] = d
};
$WH.dc = function (a) {
    $WH.sc(a, -1);
    $WH.gc.C[a] = null
};
$WH.gc = function (f) {
    if ($WH.gc.I == null) {
        var e = unescape(document.cookie).split("; ");
        $WH.gc.C = {};
        for (var c = 0, a = e.length; c < a; ++c) {
            var g = e[c].indexOf("="),
                b, d;
            if (g != -1) {
                b = e[c].substr(0, g);
                d = e[c].substr(g + 1)
            } else {
                b = e[c];
                d = ""
            }
            $WH.gc.C[b] = d
        }
        $WH.gc.I = 1
    }
    if (!f) {
        return $WH.gc.C
    } else {
        return $WH.gc.C[f]
    }
};
$WH.ns = function (a) {
    if ($WH.Browser.ie6789) {
        a.onfocus = $WH.tb;
        a.onmousedown = a.onselectstart = a.ondragstart = $WH.rf
    }
};
$WH.eO = function (b) {
    for (var a in b) {
        delete b[a]
    }
};
$WH.dO = function (a) {
    function b() {}
    b.prototype = a;
    return new b
};
$WH.cO = function (c, a) {
    for (var b in a) {
        if (a[b] !== null && typeof a[b] == "object" && a[b].length) {
            c[b] = a[b].slice(0)
        } else {
            c[b] = a[b]
        }
    }
    return c
};
$WH.cOr = function (c, a) {
    for (var b in a) {
        if (typeof a[b] == "object") {
            if (a[b].length) {
                c[b] = a[b].slice(0)
            } else {
                if (!c[b]) {
                    c[b] = {}
                }
                $WH.cOr(c[b], a[b])
            }
        } else {
            c[b] = a[b]
        }
    }
    return c
};
$WH.Browser = {
    ie: !! (window.attachEvent && !window.opera),
    opera: !! window.opera,
    safari: navigator.userAgent.indexOf("Safari") != -1,
    firefox: navigator.userAgent.indexOf("Firefox") != -1,
    chrome: navigator.userAgent.indexOf("Chrome") != -1
};
$WH.Browser.ie9 = $WH.Browser.ie && navigator.userAgent.indexOf("MSIE 9.0") != -1;
$WH.Browser.ie8 = $WH.Browser.ie && navigator.userAgent.indexOf("MSIE 8.0") != -1 && !$WH.Browser.ie9;
$WH.Browser.ie7 = $WH.Browser.ie && navigator.userAgent.indexOf("MSIE 7.0") != -1 && !$WH.Browser.ie8;
$WH.Browser.ie6 = $WH.Browser.ie && navigator.userAgent.indexOf("MSIE 6.0") != -1 && !$WH.Browser.ie7;
$WH.Browser.ie67 = $WH.Browser.ie6 || $WH.Browser.ie7;
$WH.Browser.ie678 = $WH.Browser.ie67 || $WH.Browser.ie8;
$WH.Browser.ie6789 = $WH.Browser.ie678 || $WH.Browser.ie9;
$WH.OS = {
    windows: navigator.appVersion.indexOf("Windows") != -1,
    mac: navigator.appVersion.indexOf("Macintosh") != -1,
    linux: navigator.appVersion.indexOf("Linux") != -1
};
$WH.g_getWindowSize = function () {
    var a = 0,
        b = 0;
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        a = document.documentElement.clientWidth;
        b = document.documentElement.clientHeight
    } else {
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            a = document.body.clientWidth;
            b = document.body.clientHeight
        } else {
            if (typeof window.innerWidth == "number") {
                a = window.innerWidth;
                b = window.innerHeight
            }
        }
    }
    return {
        w: a,
        h: b
    }
};
$WH.g_getScroll = function () {
    var a = 0,
        b = 0;
    if (typeof (window.pageYOffset) == "number") {
        a = window.pageXOffset;
        b = window.pageYOffset
    } else {
        if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            a = document.body.scrollLeft;
            b = document.body.scrollTop
        } else {
            if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
                a = document.documentElement.scrollLeft;
                b = document.documentElement.scrollTop
            }
        }
    }
    return {
        x: a,
        y: b
    }
};
$WH.g_getCursorPos = function (c) {
    var a, d;
    if (window.innerHeight) {
        a = c.pageX;
        d = c.pageY
    } else {
        var b = $WH.g_getScroll();
        a = c.clientX + b.x;
        d = c.clientY + b.y
    }
    return {
        x: a,
        y: d
    }
};
$WH.ac = function (c, d) {
    var a = 0,
        g = 0,
        b;
    while (c) {
        a += c.offsetLeft;
        g += c.offsetTop;
        b = c.parentNode;
        while (b && b != c.offsetParent && b.offsetParent) {
            if (b.scrollLeft || b.scrollTop) {
                a -= (b.scrollLeft | 0);
                g -= (b.scrollTop | 0);
                break
            }
            b = b.parentNode
        }
        c = c.offsetParent
    }
    if ($WH.isset("Lightbox") && Lightbox.isVisible()) {
        d = true
    }
    if (d) {
        var f = $WH.g_getScroll();
        a += f.x;
        g += f.y
    }
    var e = [a, g];
    e.x = a;
    e.y = g;
    return e
};
$WH.g_scrollTo = function (c, b) {
    var m, l = $WH.g_getWindowSize(),
        o = $WH.g_getScroll(),
        j = l.w,
        e = l.h,
        g = o.x,
        d = o.y;
    c = $WH.ge(c);
    if (b == null) {
        b = []
    } else {
        if (typeof b == "number") {
            b = [b]
        }
    }
    m = b.length;
    if (m == 0) {
        b[0] = b[1] = b[2] = b[3] = 0
    } else {
        if (m == 1) {
            b[1] = b[2] = b[3] = b[0]
        } else {
            if (m == 2) {
                b[2] = b[0];
                b[3] = b[1]
            } else {
                if (m == 3) {
                    b[3] = b[1]
                }
            }
        }
    }
    m = $WH.ac(c);
    var a = m[0] - b[3],
        h = m[1] - b[0],
        k = m[0] + c.offsetWidth + b[1],
        f = m[1] + c.offsetHeight + b[2];
    if (k - a > j || a < g) {
        g = a
    } else {
        if (k - j > g) {
            g = k - j
        }
    }
    if (f - h > e || h < d) {
        d = h
    } else {
        if (f - e > d) {
            d = f - e
        }
    }
    scrollTo(g, d)
};
$WH.g_createReverseLookupJson = function (b) {
    var c = {};
    for (var a in b) {
        c[b[a]] = a
    }
    return c
};
$WH.g_getLocaleFromDomain = function (a) {
    var c = $WH.g_getLocaleFromDomain.L;
    if (a) {
        var b = a.indexOf(".");
        if (b != -1) {
            a = a.substring(0, b)
        }
    }
    return (c[a] ? c[a] : 0)
};
$WH.g_getLocaleFromDomain.L = {
    fr: 2,
    de: 3,
    es: 6,
    ru: 7,
    www: 0
};
$WH.g_getDomainFromLocale = function (a) {
    var b;
    if ($WH.g_getDomainFromLocale.L) {
        b = $WH.g_getDomainFromLocale.L
    } else {
        b = $WH.g_getDomainFromLocale.L = $WH.g_createReverseLookupJson($WH.g_getLocaleFromDomain.L)
    }
    return (b[a] ? b[a] : "www")
};
$WH.g_getIdFromTypeName = function (a) {
    var b = $WH.g_getIdFromTypeName.L;
    return (b[a] ? b[a] : -1)
};
$WH.g_getIdFromTypeName.L = {
    npc: 1,
    object: 2,
    item: 3,
    itemset: 4,
    quest: 5,
    spell: 6,
    zone: 7,
    faction: 8,
    pet: 9,
    achievement: 10,
    title: 11,
    statistic: 16,
    profile: 100
};
$WH.g_ajaxIshRequest = function (b) {
    var c = document.getElementsByTagName("head")[0],
        a = $WH.g_getGets();
    if (a.refresh != null) {
        if (a.refresh.length) {
            b += ("&refresh=" + a.refresh)
        } else {
            b += "&refresh"
        }
    }
    if (a.locale != null) {
        b += "&locale=" + a.locale
    }
    if (a.ptr != null) {
        b += "&ptr"
    }
    $WH.ae(c, $WH.ce("script", {
        type: "text/javascript",
        src: b,
        charset: "utf8"
    }))
};
$WH.g_getGets = function () {
    if ($WH.g_getGets.C != null) {
        return $WH.g_getGets.C
    }
    var b = $WH.g_getQueryString();
    var a = $WH.g_parseQueryString(b);
    $WH.g_getGets.C = a;
    return a
};
$WH.g_getQueryString = function () {
    var a = "";
    if (location.pathname) {
        a += location.pathname.substr(1)
    }
    if (location.search) {
        if (location.pathname) {
            a += "&"
        }
        a += location.search.substr(1)
    }
    return a
};
$WH.g_parseQueryString = function (e) {
    e = decodeURIComponent(e);
    var d = e.split("&");
    var c = {};
    for (var b = 0, a = d.length; b < a; ++b) {
        $WH.g_splitQueryParam(d[b], c)
    }
    return c
};
$WH.g_splitQueryParam = function (c, d) {
    var e = c.indexOf("=");
    var a;
    var b;
    if (e != -1) {
        a = c.substr(0, e);
        b = c.substr(e + 1)
    } else {
        a = c;
        b = ""
    }
    d[a] = b
};
$WH.g_createRect = function (d, c, a, b) {
    return {
        l: d,
        t: c,
        r: d + a,
        b: c + b
    }
};
$WH.g_intersectRect = function (d, c) {
    return !(d.l >= c.r || c.l >= d.r || d.t >= c.b || c.t >= d.b)
};
$WH.g_convertRatingToPercent = function (h, b, g, d) {
    var f = $WH.g_convertRatingToPercent.RB,
        e = $WH.g_convertRatingToPercent.LH;
    if (h < 0) {
        h = 1
    } else {
        if (h > 85) {
            h = 85
        }
    }
    if ((b == 12 || b == 13 || b == 14 || b == 15) && h < 34) {
        h = 34
    }
    if ((b == 28 || b == 36) && (d == 2 || d == 6 || d == 7 || d == 11)) {
        f[b] /= 1.3
    }
    if (g < 0) {
        g = 0
    }
    var a;
    if (f[b] == null) {
        a = 0
    } else {
        var c;
        if (h > 80) {
            c = e[h]
        } else {
            if (h > 70) {
                c = (82 / 52) * Math.pow((131 / 63), ((h - 70) / 10))
            } else {
                if (h > 60) {
                    c = (82 / (262 - 3 * h))
                } else {
                    if (h > 10) {
                        c = ((h - 8) / 52)
                    } else {
                        c = 2 / 52
                    }
                }
            }
        }
        a = g / f[b] / c
    }
    return a
};
$WH.g_statToJson = {
    1: "health",
    2: "mana",
    3: "agi",
    4: "str",
    5: "int",
    6: "spi",
    7: "sta",
    8: "energy",
    9: "rage",
    10: "focus",
    13: "dodgertng",
    14: "parryrtng",
    16: "mlehitrtng",
    17: "rgdhitrtng",
    18: "splhitrtng",
    19: "mlecritstrkrtng",
    20: "rgdcritstrkrtng",
    21: "splcritstrkrtng",
    22: "_mlehitrtng",
    23: "_rgdhitrtng",
    24: "_splhitrtng",
    25: "_mlecritstrkrtng",
    26: "_rgdcritstrkrtng",
    27: "_splcritstrkrtng",
    28: "mlehastertng",
    29: "rgdhastertng",
    30: "splhastertng",
    31: "hitrtng",
    32: "critstrkrtng",
    33: "_hitrtng",
    34: "_critstrkrtng",
    35: "resirtng",
    36: "hastertng",
    37: "exprtng",
    38: "atkpwr",
    39: "rgdatkpwr",
    41: "splheal",
    42: "spldmg",
    43: "manargn",
    44: "armorpenrtng",
    45: "splpwr",
    46: "healthrgn",
    47: "splpen",
    49: "mastrtng",
    50: "armor",
    51: "firres",
    52: "frores",
    53: "holres",
    54: "shares",
    55: "natres",
    56: "arcres"
};
$WH.g_jsonToStat = {};
for (var i in $WH.g_statToJson) {
    $WH.g_jsonToStat[$WH.g_statToJson[i]] = i
}
$WH.g_individualToGlobalStat = {
    16: 31,
    17: 31,
    18: 31,
    19: 32,
    20: 32,
    21: 32,
    22: 33,
    23: 33,
    24: 33,
    25: 34,
    26: 34,
    27: 34,
    28: 36,
    29: 36,
    30: 36
};
$WH.g_convertScalingFactor = function (c, b, g, d, k) {
    var f = $WH.g_convertScalingFactor.SV;
    var e = $WH.g_convertScalingFactor.SD;
    if (!f[c]) {
        if (g_user.roles & U_GROUP_ADMIN) {
            alert("There are no item scaling values for level " + c)
        }
        return (k ? {} : 0)
    }
    var j = {},
        h = f[c],
        a = e[g];
    if (!a || !(d >= 0 && d <= 9)) {
        j.v = h[b]
    } else {
        j.n = $WH.g_statToJson[a[d]];
        j.s = a[d];
        j.v = Math.floor(h[b] * a[d + 10] / 10000)
    }
    return (k ? j : j.v)
};
if (!$WH.wowheadRemote) {
    $WH.g_ajaxIshRequest(wowheadUrl + "/data=item-scaling")
}
$WH.g_convertScalingSpell = function (b, g) {
    var j = {},
        f = $WH.g_convertScalingSpell.SV,
        d = $WH.g_convertScalingSpell.SD,
        a, k;
    if (!d[g]) {
        if (g_user.roles & U_GROUP_ADMIN) {
            alert("There are no spell scaling distributions for dist " + g)
        }
        return j
    }
    if (!f[b]) {
        if (g_user.roles & U_GROUP_ADMIN) {
            alert("There are no spell scaling values for level " + b)
        }
        return j
    }
    a = d[g];
    if (!a[3]) {
        if (g_user.roles & U_GROUP_ADMIN) {
            alert("This spell should not scale at all")
        }
        return j
    } else {
        if (a[3] == -1) {
            if (g_user.roles & U_GROUP_ADMIN) {
                alert("This spell should use the generic scaling distribution 12")
            }
            a[3] = 12
        }
    }
    if (!f[b][a[3] - 1]) {
        if (g_user.roles & U_GROUP_ADMIN) {
            alert("Unknown category for spell scaling " + a[3])
        }
        return j
    }
    k = f[b][a[3] - 1];
    k *= (Math.min(b, a[14]) + (a[13] * Math.max(0, b - a[14]))) / b;
    j.cast = Math.min(a[1], a[1] > 0 && b > 1 ? a[0] + (((b - 1) * (a[1] - a[0])) / (a[2] - 1)) : a[0]);
    j.effects = {};
    for (var c = 0; c < 3; ++c) {
        var l = a[4 + c],
            h = a[7 + c],
            e = a[10 + c],
            m = j.effects[c + 1] = {};
        m.avg = l * k * (a[1] > 0 ? j.cast / a[1] : 1);
        m.min = Math.round(m.avg) - Math.floor(m.avg * h / 2);
        m.max = Math.round(m.avg) + Math.floor(m.avg * h / 2);
        m.pts = Math.round(e * k);
        m.avg = Math.max(Math.ceil(l), Math.round(m.avg))
    }
    j.cast = Math.round(j.cast / 10) / 100;
    return j
};
if (!$WH.wowheadRemote) {
    $WH.g_ajaxIshRequest(wowheadUrl + "/data=spell-scaling")
}
$WH.g_getDataSource = function () {
    if ($WH.isset("g_pageInfo")) {
        switch (g_pageInfo.type) {
        case 3:
            if ($WH.isset("g_items")) {
                return g_items
            }
        case 6:
            if ($WH.isset("g_spells")) {
                return g_spells
            }
        }
    }
    return []
};
$WH.g_setJsonItemLevel = function (o, b) {
    if (!o.scadist || !o.scaflags) {
        return
    }
    o.bonuses = o.bonuses || {};
    var f = o.scaflags & 255,
        h = (o.scaflags >> 8) & 255,
        l = (o.scaflags & (1 << 16)) != 0,
        k = (o.scaflags & (1 << 17)) != 0,
        a = (o.scaflags & (1 << 18)) != 0,
        d;
    switch (f) {
    case 5:
    case 1:
    case 7:
    case 17:
        d = 7;
        break;
    case 3:
    case 12:
        d = 8;
        break;
    case 16:
    case 11:
        d = 9;
        break;
    case 15:
        d = 10;
        break;
    case 23:
    case 21:
    case 22:
    case 13:
        d = 11;
        break;
    default:
        d = -1
    }
    if (d >= 0) {
        for (var e = 0; e < 10; ++e) {
            var m = $WH.g_convertScalingFactor(b, d, o.scadist, e, 1);
            if (m.n) {
                o[m.n] = m.v
            }
            o.bonuses[m.s] = m.v
        }
    }
    if (a) {
        o.splpwr = o.bonuses[45] = $WH.g_convertScalingFactor(b, 6)
    }
    if (l) {
        switch (f) {
        case 3:
            o.armor = $WH.g_convertScalingFactor(b, 11 + h);
            break;
        case 5:
            o.armor = $WH.g_convertScalingFactor(b, 15 + h);
            break;
        case 1:
            o.armor = $WH.g_convertScalingFactor(b, 19 + h);
            break;
        case 7:
            o.armor = $WH.g_convertScalingFactor(b, 23 + h);
            break;
        case 16:
            o.armor = $WH.g_convertScalingFactor(b, 28);
            break;
        default:
            o.armor = 0
        }
    }
    if (k) {
        var j = (o.mledps ? "mle" : "rgd"),
            g;
        switch (f) {
        case 23:
        case 21:
        case 22:
        case 13:
            o.dps = o[j + "dps"] = $WH.g_convertScalingFactor(b, a ? 2 : 0);
            g = 0.3;
            break;
        case 17:
            o.dps = o[j + "dps"] = $WH.g_convertScalingFactor(b, a ? 3 : 1);
            g = 0.2;
            break;
        case 15:
            o.dps = o[j + "dps"] = $WH.g_convertScalingFactor(b, h == 19 ? 5 : 4);
            g = 0.3;
            break;
        default:
            o.dps = o[j + "dps"] = 0;
            g = 0
        }
        o.dmgmin = o[j + "dmgmin"] = Math.floor(o.dps * o.speed * (1 - g));
        o.dmgmax = o[j + "dmgmax"] = Math.floor(o.dps * o.speed * (1 + g))
    }
    if (o.gearscore != null) {
        if (o._gearscore == null) {
            o._gearscore = o.gearscore
        }
        var c = Math.min(85, b + 1);
        if (c >= 70) {
            n = ((c - 70) * 9.5) + 105
        } else {
            if (c >= 60) {
                n = ((c - 60) * 4.5) + 60
            } else {
                n = c + 5
            }
        }
        o.gearscore = (o._gearscore * n) / 1.8
    }
};
$WH.g_setJsonSpellLevel = function (a, b) {
    if (!a.scadist) {
        return
    }
    $WH.cO(a, $WH.g_convertScalingSpell(b, a.scadist))
};
$WH.g_getJsonReforge = function (d, c, a) {
    var e = {
        amount: 0,
        s1: $WH.g_statToJson[$WH.g_individualToGlobalStat[c] || c],
        s2: $WH.g_statToJson[$WH.g_individualToGlobalStat[a] || a]
    };
    for (var b in d) {
        if ($WH.g_jsonToStat[b] == c || $WH.g_individualToGlobalStat[$WH.g_jsonToStat[b]] == c) {
            e.amount = Math.floor(d[b] * 0.4);
            break
        }
    }
    return e
};
$WH.g_setTooltipLevel = function (g, a, l) {
    var h = typeof g;
    if (h == "number") {
        var e = $WH.g_getDataSource();
        if (e[g] && e[g][(l ? "buff_" : "tooltip_") + Locale.getName()]) {
            g = e[g][(l ? "buff_" : "tooltip_") + Locale.getName()]
        } else {
            return g
        }
    } else {
        if (h != "string") {
            return g
        }
    }
    h = g.match(/<!--\?([0-9:]*)-->/);
    if (!h) {
        return g
    }
    h = h[1].split(":");
    var a = Math.min(parseInt(h[2]), Math.max(parseInt(h[1]), a)),
        b = parseInt(h[4]) || 0;
    if (b) {
        if (!g.match(/<!--pts[0-9](:[0-9])?-->/g)) {
            var k = parseInt(h[5]) || 0,
                c = g.match(/<!--spd-->(\d\.\d+)/);
            if (c) {
                c = parseFloat(c[1]) || 0
            }
            var j = {
                scadist: b,
                scaflags: k,
                speed: c
            };
            $WH.g_setJsonItemLevel(j, a);
            g = g.replace(/(<!--asc(\d+)-->)([^<]+)/, function (p, m, o) {
                h = o;
                if (a < 40 && (o == 3 || o == 4)) {
                    --h
                }
                return m + g_itemset_types[h]
            });
            g = g.replace(/(<!--dmg-->)\d+(\D+)\d+/, function (p, m, o) {
                return m + j.dmgmin + o + j.dmgmax
            });
            g = g.replace(/(<!--dps-->\D*?)(\d+\.\d)/, function (o, m) {
                return m + j.dps.toFixed(1)
            });
            g = g.replace(/(<!--amr-->)\d+/, function (o, m) {
                return m + j.armor
            });
            g = g.replace(/<span><!--stat(\d+)-->[-+]\d+(\D*?)<\/span>(<!--e-->)?(<!--ps-->)?(<br ?\/?>)?/gi, function (r, o, m, t, u, p) {
                var q, s = j.bonuses[o];
                if (s) {
                    s = (s > 0 ? "+" : "-") + s;
                    q = "";
                    p = (p ? "<br />" : "")
                } else {
                    s = "+0";
                    q = ' style="display: none"';
                    p = (p ? "<!--br-->" : "")
                }
                return "<span" + q + "><!--stat" + o + "-->" + s + m + "</span>" + (t || "") + (u || "") + p
            });
            g = g.replace(/<span class="q2">(.*?)<!--rtg(\d+)-->\d+(.*?)<\/span>(<br \/>)?/gi, function (m, q, s, u, r, o, v) {
                var p, t = j.bonuses[$WH.g_individualToGlobalStat[s] || s];
                if (t) {
                    p = "";
                    v = (v ? "<br />" : "")
                } else {
                    p = ' style="display: none"';
                    v = (v ? "<!--br-->" : "")
                }
                return '<span class="q2"' + p + ">" + q + "<!--rtg" + s + "-->" + t + u + "</span>" + v
            })
        } else {
            var j = {
                scadist: b
            };
            $WH.g_setJsonSpellLevel(j, a);
            g = g.replace(/<!--cast-->\d+\.\d+/, "<!--cast-->" + j.cast);
            if (j.effects) {
                for (var d = 1; d < 4; ++d) {
                    var f = j.effects[d];
                    g = g.replace(new RegExp("<!--pts" + d + "(:0)?-->(.+?)<", "g"), "<!--pts" + d + "$1-->" + (f.min == f.max ? f.avg : f.min + " to " + f.max) + "<");
                    g = g.replace(new RegExp("<!--pts" + d + ":1-->(.+?)<", "g"), "<!--pts" + d + ":1-->" + f.min + "<");
                    g = g.replace(new RegExp("<!--pts" + d + ":2-->(.+?)<", "g"), "<!--pts" + d + ":2-->" + f.max + "<");
                    g = g.replace(new RegExp("<!--pts" + d + ":3:(\\d+)-->(.+?)<", "g"), function (o, m) {
                        return "<!--pts" + d + ":3:" + m + "-->" + (f.avg * m) + "<"
                    });
                    g = g.replace(new RegExp("<!--pts" + d + ":4-->(.+?)<", "g"), "<!--pts" + d + ":4-->" + f.pts + "<")
                }
            }
        }
    }
    g = g.replace(/(<!--rtg%(\d+)-->)([\.0-9]+)/g, function (p, m, q, o) {
        h = g.match(new RegExp("<!--rtg" + q + "-->(\\d+)"));
        if (!h) {
            return p
        }
        return m + Math.round($WH.g_convertRatingToPercent(a, q, h[1]) * 100) / 100
    });
    g = g.replace(/(<!--\?\d+:\d+:\d+:)\d+/, "$1" + a);
    g = g.replace(/<!--lvl-->\d+/g, "<!--lvl-->" + a);
    return g
};
$WH.g_setTooltipSpells = function (h, e, g, c) {
    var k = {},
        j = "<!--sp([0-9]+):[01]-->.+?<!--sp\\1-->",
        d;
    if (e == null) {
        e = []
    }
    if (c == null) {
        c = {}
    }
    for (var b = 0; b < e.length; ++b) {
        k[e[b]] = 1
    }
    if (d = h.match(new RegExp(j, "g"))) {
        for (var b = 0; b < d.length; ++b) {
            var a = d[b].match(j)[1];
            k[a] = (k[a] | 0);
            if (c[a] == null) {
                c[a] = -1
            }
            c[a]++;
            if (g[a] == null || g[a][c[a]] == null || g[a][c[a]][k[a]] == null) {
                continue
            }
            var f = g[a][c[a]][k[a]];
            if (!f.match(j)) {
                f = '<a href="' + wowheadUrl + '/spell=' + a + '" class="q1 tip">' + f + "</a>"
            } else {
                f = $WH.g_setTooltipSpells(f, e, g, c)
            }
            h = h.replace(d[b], "<!--sp" + a + ":" + k[a] + "-->" + f + "<!--sp" + a + "-->")
        }
    }
    return h
};
$WH.g_enhanceTooltip = function (h, l, j, d, o, m, e) {
    var k = typeof h,
        c;
    if (k == "number") {
        var g = $WH.g_getDataSource(),
            a = h;
        if (g[a] && g[a][(o ? "buff_" : "tooltip_") + Locale.getName()]) {
            h = g[a][(o ? "buff_" : "tooltip_") + Locale.getName()];
            c = g[a][(o ? "buff" : "") + "spells_" + Locale.getName()];
            if (c) {
                h = $WH.g_setTooltipSpells(h, m, c)
            }
        } else {
            return h
        }
    } else {
        if (k != "string") {
            return h
        }
    }
    if (j) {
        var b = $WH.g_getGets();
        if (b.lvl) {
            h = $WH.g_setTooltipLevel(h, b.lvl, o)
        }
    }
    if (l) {
        h = h.replace(/<span class="q2"><!--addamr(\d+)--><span>.*?<\/span><\/span>/i, function (p, q) {
            return '<span class="q2 tip" onmouseover="$WH.Tooltip.showAtCursor(event, $WH.sprintf(LANG.tooltip_armorbonus, ' + q + '), 0, 0, \'q\')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">' + p + "</span>"
        });
        h = h.replace(/\(([^\)]*?<!--lvl-->[^\(]*?)\)/gi, function (q, p) {
            return '(<a href="javascript:;" onmousedown="return false" class="tip" style="color: white; cursor: pointer" onclick="$WH.g_staticTooltipLevelClick(this, null, 0)" onmouseover="$WH.Tooltip.showAtCursor(event, \'<span class=\\\'q2\\\'>\' + LANG.tooltip_changelevel + \'</span>\')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">' + p + "</a>)"
        })
    }
    if (d && Slider) {
        if (o && o.slider) {
            o.bufftip = this
        } else {
            var k = h.match(/<!--\?(\d+):(\d+):(\d+):(\d+)/);
            if (k && k[2] != k[3]) {
                this.slider = Slider.init(d, {
                    minValue: parseInt(k[2]),
                    maxValue: parseInt(k[3]),
                    onMove: $WH.g_tooltipSliderMove.bind(this)
                });
                Slider.setValue(this.slider, parseInt(k[4]));
                this.slider.onmouseover = function (p) {
                    $WH.Tooltip.showAtCursor(p, LANG.tooltip_changelevel2, 0, 0, "q2")
                };
                this.slider.onmousemove = $WH.Tooltip.cursorUpdate;
                this.slider.onmouseout = $WH.Tooltip.hide
            }
        }
    }
    if (e) {
        if (o && o.modified) {
            o.bufftip = this
        } else {
            for (var f in c) {
                if (!g_spells[f]) {
                    continue
                }
                $(e).append('<input type="checkbox" id="known-' + f + '" />').append('<label for="known-' + f + '"><a rel="spell=' + f + '">' + g_spells[f]["name_" + Locale.getName()] + (g_spells[f]["rank_" + Locale.getName()] ? " (" + g_spells[f]["rank_" + Locale.getName()] + ")" : "") + "</a></label>").append("<br />");
                $("#known-" + f).change($WH.g_tooltipSpellsChange.bind(this))
            }
        }
        this.modified = [e, c, m];
        $(e).toggle(!$(e).is(":empty"))
    }
    return h
};
$WH.g_staticTooltipLevelClick = function (b, a, g, j) {
    while (b.className.indexOf("tooltip") == -1) {
        b = b.parentNode
    }
    var h = b.innerHTML;
    h = h.match(/<!--\?(\d+):(\d+):(\d+):(\d+)/);
    if (!h) {
        return
    }
    var k = parseInt(h[1]),
        e = parseInt(h[2]),
        f = parseInt(h[3]),
        d = parseInt(h[4]);
    if (e >= f) {
        return
    }
    if (!a) {
        a = prompt($WH.sprintf(LANG.prompt_ratinglevel, e, f), d)
    }
    a = parseInt(a);
    if (isNaN(a)) {
        return
    }
    if (a == d || a < e || a > f) {
        return
    }
    var c = $WH.g_getDataSource();
    h = $WH.g_setTooltipLevel(c[k][(j ? "buff_" : "tooltip_") + Locale.getName()], a, j);
    h = $WH.g_enhanceTooltip(h, true);
    b.innerHTML = "<table><tr><td>" + h + '</td><th style="background-position: top right"></th></tr><tr><th style="background-position: bottom left"></th><th style="background-position: bottom right"></th></tr></table>';
    $WH.Tooltip.fixSafe(b, 1, 1);
    if (b.slider && !g) {
        Slider.setValue(b.slider, a)
    }
    if (!j) {
        ($WH.g_tooltipSpellsChange.bind(b))()
    }
};
$WH.g_tooltipSliderMove = function (c, b, a) {
    $WH.g_staticTooltipLevelClick(this, a.value, 1);
    if (this.bufftip) {
        $WH.g_staticTooltipLevelClick(this.bufftip, a.value, 1, 1)
    }
    $WH.Tooltip.hide()
};
$WH.g_tooltipSpellsChange = function () {
    if (!this.modified) {
        return
    }
    var c = this.modified[0],
        a = this.modified[1],
        b = [];
    $.each($("input:checked", c), function (d, e) {
        b.push(parseInt(e.id.replace("known-", "")))
    });
    this.modified[2] = b;
    this.innerHTML = $WH.g_setTooltipSpells(this.innerHTML, b, a);
    if (this.bufftip) {
        ($WH.g_tooltipSpellsChange.bind(this.bufftip))()
    }
};
$WH.Tooltip = {
    create: function (j, l) {
        var g = $WH.ce("div"),
            o = $WH.ce("table"),
            b = $WH.ce("tbody"),
            f = $WH.ce("tr"),
            c = $WH.ce("tr"),
            a = $WH.ce("td"),
            m = $WH.ce("th"),
            k = $WH.ce("th"),
            h = $WH.ce("th");
        g.className = "wowhead-tooltip";
        m.style.backgroundPosition = "top right";
        k.style.backgroundPosition = "bottom left";
        h.style.backgroundPosition = "bottom right";
        if (j) {
            a.innerHTML = j
        }
        $WH.ae(f, a);
        $WH.ae(f, m);
        $WH.ae(b, f);
        $WH.ae(c, k);
        $WH.ae(c, h);
        $WH.ae(b, c);
        $WH.ae(o, b);
        if (!l) {
            $WH.Tooltip.icon = $WH.ce("p");
            $WH.Tooltip.icon.style.visibility = "hidden";
            $WH.ae($WH.Tooltip.icon, $WH.ce("div"));
            $WH.ae(g, $WH.Tooltip.icon)
        }
        $WH.ae(g, o);
        if (!l) {
            var e = $WH.ce("div");
            e.className = "wowhead-tooltip-powered";
            $WH.ae(g, e);
            $WH.Tooltip.logo = e
        }
        return g
    },
    getMultiPartHtml: function (b, a) {
        return "<table><tr><td>" + b + "</td></tr></table><table><tr><td>" + a + "</td></tr></table>"
    },
    fix: function (d, b, f) {
        var e = $WH.gE(d, "table")[0],
            h = $WH.gE(e, "td")[0],
            g = h.childNodes;
        d.className = $WH.trim(d.className.replace("tooltip-slider", ""));
        if (g.length >= 2 && g[0].nodeName == "TABLE" && g[1].nodeName == "TABLE") {
            g[0].style.whiteSpace = "nowrap";
            var a = parseInt(d.style.width);
            if (!d.slider || !a) {
                if (g[1].offsetWidth > 300) {
                    a = Math.max(300, g[0].offsetWidth) + 20
                } else {
                    a = Math.max(g[0].offsetWidth, g[1].offsetWidth) + 20
                }
            }
            a = Math.min(320, a);
            if (a > 20) {
                d.style.width = a + "px";
                g[0].style.width = g[1].style.width = "100%";
                if (d.slider) {
                    Slider.setSize(d.slider, a - 6);
                    d.className += " tooltip-slider"
                }
                if (!b && d.offsetHeight > document.body.clientHeight) {
                    e.className = "shrink"
                }
            }
        }
        if (f) {
            d.style.visibility = "visible"
        }
    },
    fixSafe: function (c, b, a) {
        $WH.Tooltip.fix(c, b, a)
    },
    append: function (c, b) {
        var c = $WH.ge(c);
        var a = $WH.Tooltip.create(b);
        $WH.ae(c, a);
        $WH.Tooltip.fixSafe(a, 1, 1)
    },
    prepare: function () {
        if ($WH.Tooltip.tooltip) {
            return
        }
        var a = $WH.Tooltip.create();
        a.style.position = "absolute";
        a.style.left = a.style.top = "-2323px";
        $WH.ae(document.body, a);
        $WH.Tooltip.tooltip = a;
        $WH.Tooltip.tooltipTable = $WH.gE(a, "table")[0];
        $WH.Tooltip.tooltipTd = $WH.gE(a, "td")[0];
        var a = $WH.Tooltip.create(null, true);
        a.style.position = "absolute";
        a.style.left = a.style.top = "-2323px";
        $WH.ae(document.body, a);
        $WH.Tooltip.tooltip2 = a;
        $WH.Tooltip.tooltipTable2 = $WH.gE(a, "table")[0];
        $WH.Tooltip.tooltipTd2 = $WH.gE(a, "td")[0]
    },
    set: function (c, b) {
        var a = $WH.Tooltip.tooltip;
        a.style.width = "550px";
        a.style.left = "-2323px";
        a.style.top = "-2323px";
        if (c.nodeName) {
            $WH.ee($WH.Tooltip.tooltipTd);
            $WH.ae($WH.Tooltip.tooltipTd, c)
        } else {
            $WH.Tooltip.tooltipTd.innerHTML = c
        }
        a.style.display = "";
        $WH.Tooltip.fix(a, 0, 0);
        if (b) {
            $WH.Tooltip.showSecondary = true;
            var a = $WH.Tooltip.tooltip2;
            a.style.width = "550px";
            a.style.left = "-2323px";
            a.style.top = "-2323px";
            if (b.nodeName) {
                $WH.ee($WH.Tooltip.tooltipTd2);
                $WH.ae($WH.Tooltip.tooltipTd2, b)
            } else {
                $WH.Tooltip.tooltipTd2.innerHTML = b
            }
            a.style.display = "";
            $WH.Tooltip.fix(a, 0, 0)
        } else {
            $WH.Tooltip.showSecondary = false
        }
    },
    moveTests: [
        [null, null],
        [null, false],
        [false, null],
        [false, false]
    ],
    move: function (q, p, e, r, d, b) {
        if (!$WH.Tooltip.tooltipTable) {
            return
        }
        var o = $WH.Tooltip.tooltip,
            j = $WH.Tooltip.tooltipTable.offsetWidth,
            c = $WH.Tooltip.tooltipTable.offsetHeight,
            l = $WH.Tooltip.tooltip2,
            g = $WH.Tooltip.showSecondary ? $WH.Tooltip.tooltipTable2.offsetWidth : 0,
            a = $WH.Tooltip.showSecondary ? $WH.Tooltip.tooltipTable2.offsetHeight : 0,
            s;
        o.style.width = j + "px";
        l.style.width = g + "px";
        var m, f;
        for (var h = 0, k = $WH.Tooltip.moveTests.length; h < k; ++h) {
            s = $WH.Tooltip.moveTests[h];
            m = $WH.Tooltip.moveTest(q, p, e, r, d, b, s[0], s[1]);
            if ($WH.isset("Ads") && !Ads.intersect(m)) {
                f = true;
                break
            } else {
                if (!$WH.isset("Ads")) {
                    break
                }
            }
        }
        if ($WH.isset("Ads") && !f) {
            Ads.intersect(m, true)
        }
        o.style.left = m.l + "px";
        o.style.top = m.t + "px";
        o.style.visibility = "visible";
        if ($WH.Tooltip.showSecondary) {
            l.style.left = m.l + j + "px";
            l.style.top = m.t + "px";
            l.style.visibility = "visible"
        }
    },
    moveTest: function (e, o, r, C, c, a, q, b) {
        var m = e,
            A = o,
            g = $WH.Tooltip.tooltip,
            k = $WH.Tooltip.tooltipTable.offsetWidth,
            t = $WH.Tooltip.tooltipTable.offsetHeight,
            p = $WH.Tooltip.tooltip2,
            B = $WH.Tooltip.showSecondary ? $WH.Tooltip.tooltipTable2.offsetWidth : 0,
            f = $WH.Tooltip.showSecondary ? $WH.Tooltip.tooltipTable2.offsetHeight : 0,
            j = $WH.g_getWindowSize(),
            l = $WH.g_getScroll(),
            h = j.w,
            s = j.h,
            d = l.x,
            z = l.y,
            y = d,
            w = z,
            v = d + h,
            u = z + s;
        if (q == null) {
            q = (e + r + k + B <= v)
        }
        if (b == null) {
            b = (o - Math.max(t, f) >= w)
        }
        if (q) {
            e += r + c
        } else {
            e = Math.max(e - (k + B), y) - c
        }
        if (b) {
            o -= Math.max(t, f) + a
        } else {
            o += C + a
        }
        if (e < y) {
            e = y
        } else {
            if (e + k + B > v) {
                e = v - (k + B)
            }
        }
        if (o < w) {
            o = w
        } else {
            if (o + Math.max(t, f) > u) {
                o = Math.max(z, u - Math.max(t, f))
            }
        }
        if ($WH.Tooltip.iconVisible) {
            if (m >= e - 48 && m <= e && A >= o - 4 && A <= o + 48) {
                o -= 48 - (A - o)
            }
        }
        return $WH.g_createRect(e, o, k, t)
    },
    show: function (g, f, d, b, c, e) {
        if ($WH.Tooltip.disabled) {
            return
        }
        if (!d || d < 1) {
            d = 1
        }
        if (!b || b < 1) {
            b = 1
        }
        if (c) {
            f = '<span class="' + c + '">' + f + "</span>"
        }
        var a = $WH.ac(g);
        $WH.Tooltip.prepare();
        $WH.Tooltip.set(f, e);
        $WH.Tooltip.move(a.x, a.y, g.offsetWidth, g.offsetHeight, d, b)
    },
    showAtCursor: function (f, g, c, a, b, d) {
        if ($WH.Tooltip.disabled) {
            return
        }
        if (!c || c < 10) {
            c = 10
        }
        if (!a || a < 10) {
            a = 10
        }
        if (b) {
            g = '<span class="' + b + '">' + g + "</span>";
            if (d) {
                d = '<span class="' + b + '">' + d + "</span>"
            }
        }
        f = $WH.$E(f);
        var h = $WH.g_getCursorPos(f);
        $WH.Tooltip.prepare();
        $WH.Tooltip.set(g, d);
        $WH.Tooltip.move(h.x, h.y, 0, 0, c, a)
    },
    showAtXY: function (e, a, f, c, b, d) {
        if ($WH.Tooltip.disabled) {
            return
        }
        $WH.Tooltip.prepare();
        $WH.Tooltip.set(e, d);
        $WH.Tooltip.move(a, f, 0, 0, c, b)
    },
    cursorUpdate: function (b, a, d) {
        if ($WH.Tooltip.disabled || !$WH.Tooltip.tooltip) {
            return
        }
        b = $WH.$E(b);
        if (!a || a < 10) {
            a = 10
        }
        if (!d || d < 10) {
            d = 10
        }
        var c = $WH.g_getCursorPos(b);
        $WH.Tooltip.move(c.x, c.y, 0, 0, a, d)
    },
    hide: function () {
        if ($WH.Tooltip.tooltip) {
            $WH.Tooltip.tooltip.style.display = "none";
            $WH.Tooltip.tooltip.visibility = "hidden";
            $WH.Tooltip.tooltipTable.className = "";
            $WH.Tooltip.setIcon(null);
            if ($WH.isset("Ads")) {
                Ads.restoreHidden()
            }
        }
        if ($WH.Tooltip.tooltip2) {
            $WH.Tooltip.tooltip2.style.display = "none";
            $WH.Tooltip.tooltip2.visibility = "hidden";
            $WH.Tooltip.tooltipTable2.className = ""
        }
    },
    setIcon: function (a) {
        $WH.Tooltip.prepare();
        if (a) {
            $WH.Tooltip.icon.style.backgroundImage = "url(../images/wow/icons/medium/" + a.toLowerCase() + ".jpg)";
            $WH.Tooltip.icon.style.visibility = "visible"
        } else {
            $WH.Tooltip.icon.style.backgroundImage = "none";
            $WH.Tooltip.icon.style.visibility = "hidden"
        }
        $WH.Tooltip.iconVisible = a ? 1 : 0
    }
};
if ($WH.isset("$WowheadPower")) {
    $WowheadPower.init()
}
$WH.g_getProfileIcon = function (d, e, a, g, c, b) {
    var f = {
        10: {
            6: 1,
            3: 1,
            8: 1,
            2: 1,
            5: 1,
            4: 1,
            9: 1
        },
        11: {
            6: 1,
            3: 1,
            8: 1,
            2: 1,
            5: 1,
            7: 1,
            1: 1
        },
        3: {
            6: 1,
            3: 1,
            2: 1,
            5: 1,
            4: 1,
            1: 1
        },
        7: {
            6: 1,
            8: 1,
            4: 1,
            9: 1,
            1: 1
        },
        1: {
            6: 1,
            8: 1,
            2: 1,
            5: 1,
            4: 1,
            9: 1,
            1: 1
        },
        4: {
            6: 1,
            11: 1,
            3: 1,
            5: 1,
            4: 1,
            1: 1
        },
        2: {
            6: 1,
            3: 1,
            4: 1,
            7: 1,
            9: 1,
            1: 1
        },
        6: {
            6: 1,
            11: 1,
            3: 1,
            7: 1,
            1: 1
        },
        8: {
            6: 1,
            3: 1,
            8: 1,
            5: 1,
            4: 1,
            7: 1,
            1: 1
        },
        5: {
            6: 1,
            8: 1,
            5: 1,
            4: 1,
            9: 1,
            1: 1
        }
    };
    if (c) {
        return isNaN(c) ? c : wowheadUrl + "/profile=avatar" + (b ? "&size=" + b : "") + "&id=" + c + (b == "tiny" ? ".gif" : ".jpg")
    }
    if (!g_file_races[d] || !g_file_classes[e] || !g_file_genders[a] || !f[d] || !f[d][e] || (e == 6 && g < 55)) {
        return "inv_misc_questionmark"
    }
    return "chr_" + g_file_races[d] + "_" + g_file_genders[a] + "_" + g_file_classes[e] + "0" + (g > 59 ? (Math.floor((g - 60) / 10) + 2) : 1)
};