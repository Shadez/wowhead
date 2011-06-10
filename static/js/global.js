"abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g, function (a) {
    document.createElement(a)
});
var U_GROUP_TESTER = 1;
var U_GROUP_ADMIN = 2;
var U_GROUP_EDITOR = 4;
var U_GROUP_MOD = 8;
var U_GROUP_BUREAU = 16;
var U_GROUP_DEV = 32;
var U_GROUP_VIP = 64;
var U_GROUP_BLOGGER = 128;
var U_GROUP_PREMIUM = 256;
var U_GROUP_LOCALIZER = 512;
var U_GROUP_SALESAGENT = 1024;
var U_GROUP_SCREENSHOT = 2048;
var U_GROUP_VIDEO = 4096;
var U_GROUP_APIONLY = 8192;
var U_GROUP_PENDING = 16384;
var U_GROUP_STAFF = U_GROUP_ADMIN | U_GROUP_EDITOR | U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_BLOGGER | U_GROUP_LOCALIZER | U_GROUP_SALESAGENT;
var U_GROUP_EMPLOYEE = U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_DEV;
var U_GROUP_GREEN_TEXT = U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV;
var U_GROUP_MODERATOR = U_GROUP_ADMIN | U_GROUP_MOD | U_GROUP_BUREAU;
var U_GROUP_COMMENTS_MODERATOR = U_GROUP_MODERATOR | U_GROUP_LOCALIZER;
var U_GROUP_PREMIUM_PERMISSIONS = U_GROUP_PREMIUM | U_GROUP_STAFF | U_GROUP_VIP;
var g_users = {};
var g_customColors = {
    Miyari: "pink"
};

function g_isUsernameValid(a) {
    return (a.match(/[^a-z0-9]/i) == null && a.length >= 4 && a.length <= 16)
}
function g_requireCaptcha() {
    if ((g_user.permissions & 1) > 0 || (typeof (skipCaptcha) != "undefined" && skipCaptcha)) {
        return false
    }
    return true
}
var User = new function () {
        var a = this;
        a.hasPermissions = function (b) {
            if (!b) {
                return true
            }
            return !!(g_user.roles & b)
        }
    };
var Ads = {
    dimensions: {
        leaderboard: [728, 90],
        skyscraper: [160, 600],
        medrect: [300, 250]
    },
    autofill: {
        leaderboard: ["ad-header"],
        skyscraper: ["ad-sidebar"],
        medrect: ["ad-content", "ad-article", "ad-contribute"]
    },
    alternates: {
        leaderboard: {},
        skyscraper: {},
        medrect: {
            "ad-article": 2
        }
    },
    spots: [],
    hidden: [],
    hiding: false,
    removed: false,
    test: false,
    init: function () {
        if (PageTemplate.get("pageName") == "ads") {
            Ads.test = true
        }
        for (var f in Ads.dimensions) {
            var c = Ads.autofill[f],
                e = false;
            for (var b = 0, a = c.length; b < a; ++b) {
                var d = $WH.ge(c[b]);
                if (d) {
                    if (e) {
                        $WH.de(d)
                    } else {
                        e = Ads.fillSpot(f, d, c[b])
                    }
                }
            }
        }
    },
    fillSpot: function (f, e, d) {
        if (Ads.removed || !g_user.ads) {
            $WH.de(e);
            return false
        }
        var a = $(e);
        if ($("iframe", a).length > 0) {
            return false
        }
        var c = $WH.ce("iframe");
        c.width = Ads.dimensions[f][0];
        c.height = Ads.dimensions[f][1];
        c.frameBorder = 0;
        c.scrolling = "no";
        c.src = g_staticUrl + "/ads/" + (Ads.test ? "test" : "dynamic") + "/" + f + (Ads.alternates[f][d] ? Ads.alternates[f][d] : "") + ".html?4" + (($WH.isset("g_thottbot") && g_thottbot) ? "&thottbot" : "");
        e.className += " ad-" + f;
        var b = e.parentNode;
        if (b.className == "block-bg") {
            b.className = "block-bg block-bgimg"
        } else {
            if (b.className == "header-bg") {
                b.className = "header-bg header-bgimg"
            } else {
                if (b.className == "sidebar-bg") {
                    b.className = "sidebar-bg sidebar-bgimg"
                }
            }
        }
        $WH.ae(e, c);
        Ads.spots.push(e);
        return true
    },
    removeAll: function () {
        for (var e in Ads.dimensions) {
            var c = Ads.spots;
            for (var b = 0, a = c.length; b < a; ++b) {
                var d = c[b];
                if (d) {
                    $WH.de(d)
                }
            }
        }
        Ads.removed = true;
        Ads.spots = []
    },
    reveal: function (b) {
        var a = $WH.gE(b, "iframe")[0];
        if (a) {
            a.style.display = ""
        }
    },
    hide: function (b) {
        var a = $WH.gE(b, "iframe")[0];
        if (a) {
            a.style.display = "none";
            Ads.hidden.push(b)
        }
    },
    hideAll: function () {
        Ads.hiding = true;
        for (var e in Ads.dimensions) {
            var c = Ads.spots;
            for (var b = 0, a = c.length; b < a; ++b) {
                var d = c[b];
                if (d && !Ads.isHidden(d)) {
                    Ads.hide(d)
                }
            }
        }
    },
    isHidden: function (b) {
        var a = $WH.gE(b, "iframe")[0];
        if (a) {
            return a.style.display == "none"
        }
        return false
    },
    intersect: function (g, e) {
        var b;
        for (var h in Ads.dimensions) {
            var d = Ads.spots;
            for (var c = 0, a = d.length; c < a; ++c) {
                var f = d[c];
                if (f) {
                    if (!Ads.isHidden(f)) {
                        coords = $WH.ac(f);
                        b = $WH.g_createRect(coords.x, coords.y, f.offsetWidth, f.offsetHeight);
                        if ($WH.g_intersectRect(g, b)) {
                            if (e) {
                                Ads.hide(f)
                            }
                            return f
                        }
                    }
                }
            }
        }
        return false
    },
    restoreHidden: function () {
        Ads.hiding = false;
        if (Ads.hidden.length) {
            for (var c = 0, a = Ads.hidden.length; c < a; ++c) {
                var d = Ads.hidden[c],
                    b = $WH.gE(d, "iframe")[0];
                if (b) {
                    b.style.display = ""
                }
            }
            Ads.hidden = []
        }
    }
};
$(document).ready(Ads.init);

function Ajax(b, c) {
    if (!b) {
        return
    }
    var a;
    try {
        a = new XMLHttpRequest()
    } catch (d) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (d) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (d) {
                if (window.createRequest) {
                    a = window.createRequest()
                } else {
                    alert(LANG.message_ajaxnotsupported);
                    return
                }
            }
        }
    }
    this.request = a;
    $WH.cO(this, c);
    this.method = this.method || (this.params && "POST") || "GET";
    a.open(this.method, b, this.async == null ? true : this.async);
    a.onreadystatechange = Ajax.onReadyStateChange.bind(this);
    if (this.method.toUpperCase() == "POST") {
        a.setRequestHeader("Content-Type", (this.contentType || "application/x-www-form-urlencoded") + "; charset=" + (this.encoding || "UTF-8"))
    }
    a.send(this.params)
}
Ajax.onReadyStateChange = function () {
    if (this.request.readyState == 4) {
        if (this.request.status == 0 || (this.request.status >= 200 && this.request.status < 300)) {
            this.onSuccess != null && this.onSuccess(this.request, this)
        } else {
            this.onFailure != null && this.onFailure(this.request, this)
        }
        if (this.onComplete != null) {
            this.onComplete(this.request, this)
        }
    }
};
var Announcement = function (a) {
        if (!a) {
            a = {}
        }
        $WH.cO(this, a);
        if (this.parent) {
            this.parentDiv = $WH.ge(this.parent)
        } else {
            return
        }
        if (g_user.id == 0 && (!g_cookiesEnabled() || g_getWowheadCookie("announcement-" + this.id) == "closed")) {
            return
        }
        this.initialize()
    };
Announcement.prototype = {
    initialize: function () {
        this.parentDiv.style.display = "none";
        if (this.mode === undefined || this.mode == 1) {
            this.parentDiv.className = "announcement announcement-contenttop"
        } else {
            this.parentDiv.className = "announcement announcement-pagetop"
        }
        var f = this.innerDiv = $WH.ce("div");
        f.className = "announcement-inner text";
        this.style = this.style.replace("%tb%", (($WH.isset("g_thottbot") && g_thottbot) ? "tb-" : ""));
        this.setStyle(this.style);
        var b = null;
        var e = parseInt(this.id);
        if (g_user && (g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) > 0 && Math.abs(e) > 0) {
            if (e < 0) {
                b = $WH.ce("a");
                b.style.cssFloat = b.style.styleFloat = "right";
                b.href = wowheadUrl + "/admin=announcements&id=" + Math.abs(e) + "&status=2";
                b.onclick = function () {
                    return confirm("Are you sure you want to delete " + this.name + "?")
                };
                $WH.ae(b, $WH.ct("Delete"));
                var d = $WH.ce("small");
                $WH.ae(d, b);
                $WH.ae(f, d);
                b = $WH.ce("a");
                b.style.cssFloat = b.style.styleFloat = "right";
                b.style.marginRight = "10px";
                b.href = wowheadUrl + "/admin=announcements&id=" + Math.abs(e) + "&status=" + (this.status == 1 ? 0 : 1);
                b.onclick = function () {
                    return confirm("Are you sure you want to delete " + this.name + "?")
                };
                $WH.ae(b, $WH.ct((this.status == 1 ? "Disable" : "Enable")));
                var d = $WH.ce("small");
                $WH.ae(d, b);
                $WH.ae(f, d)
            }
            b = $WH.ce("a");
            b.style.cssFloat = b.style.styleFloat = "right";
            b.style.marginRight = "10px";
            b.href = wowheadUrl + "/admin=announcements&id=" + Math.abs(e) + "&edit";
            $WH.ae(b, $WH.ct("Edit announcement"));
            var d = $WH.ce("small");
            $WH.ae(d, b);
            $WH.ae(f, d)
        }
        var c = $WH.ce("div");
        c.id = this.parent + "-markup";
        $WH.ae(f, c);
        if (e >= 0) {
            b = $WH.ce("a");
            if ($WH.isset("g_thottbot") && g_thottbot) {
                $WH.ae(b, $WH.ct("[X]"))
            }
            b.id = "closeannouncement";
            b.href = "javascript:;";
            b.className = "announcement-close";
            if (this.nocookie) {
                b.onclick = this.hide.bind(this)
            } else {
                b.onclick = this.markRead.bind(this)
            }
            $WH.ae(f, b);
            g_addTooltip(b, LANG.close)
        }
        $WH.ae(f, $WH.ce("div", {
            style: {
                clear: "both"
            }
        }));
        $WH.ae(this.parentDiv, f);
        this.setText(this.text);
        setTimeout(this.show.bind(this), 500)
    },
    show: function () {
        $(this.parentDiv).animate({
            opacity: "show",
            height: "show"
        }, {
            duration: 333
        });
        g_trackEvent("Announcements", "Show", "" + this.name)
    },
    hide: function () {
        $(this.parentDiv).animate({
            opacity: "hide",
            height: "hide"
        }, {
            duration: 200
        })
    },
    markRead: function () {
        g_trackEvent("Announcements", "Close", "" + this.name);
        g_setWowheadCookie("announcement-" + this.id, "closed");
        this.hide()
    },
    setStyle: function (a) {
        this.style = a;
        this.innerDiv.setAttribute("style", a)
    },
    setText: function (a) {
        this.text = a;
        Markup.printHtml(this.text, this.parent + "-markup");
        g_addAnalyticsToNode($WH.ge(this.parent + "-markup"), {
            category: "Announcements",
            actions: {
                "Follow link": function (b) {
                    return true
                }
            }
        }, this.id)
    }
};

function co_addYourComment() {
    tabsContribute.focus(0);
    var a = $WH.gE(document.forms.addcomment, "textarea")[0];
    a.focus()
}
function co_cancelReply() {
    $WH.ge("gjkdlfgkjh436").style.display = "none";
    document.forms.addcomment.elements.replyto.value = ""
}
function co_validateForm(b) {
    var a = $WH.gE(b, "textarea")[0];
    if (Listview.funcBox.coValidate(a)) {
        if (!g_requireCaptcha()) {
            return true
        }
        if (b.elements.recaptcha_response_field.value.length) {
            return true
        } else {
            alert(LANG.message_codenotentered);
            b.elements.recaptcha_response_field.focus()
        }
    }
    return false
}
$(document).ready(function () {
    g_setupChangeWarning($("form[name=addcomment]"), [$("textarea[name=commentbody]")], LANG.message_startedpost)
});
var ContactTool = new function () {
        this.general = 0;
        this.comment = 1;
        this.post = 2;
        this.screenshot = 3;
        this.character = 4;
        this.video = 5;
        var d;
        var c = {
            0: [
                [1, true],
                [2, true],
                [8, true],
                [3, true],
                [4, true],
                [5, true],
                [6, true],
                [7, true]
            ],
            1: [
                [15, function (f) {
                    return ((f.roles & U_GROUP_MODERATOR) == 0)
                }],
                [16, true],
                [17, true],
                [18, function (f) {
                    return ((f.roles & U_GROUP_MODERATOR) == 0)
                }],
                [19, function (f) {
                    return ((f.roles & U_GROUP_MODERATOR) == 0)
                }],
                [20, function (f) {
                    return ((f.roles & U_GROUP_MODERATOR) == 0)
                }]
            ],
            2: [
                [30, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }],
                [37, function (f) {
                    return ((f.roles & U_GROUP_MODERATOR) == 0 && g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0 && g_users[f.user].avatar == 2)
                }],
                [31, true],
                [32, true],
                [33, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }],
                [34, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0 && f.op && !f.sticky)
                }],
                [35, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }],
                [36, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }]
            ],
            3: [
                [45, true],
                [46, true],
                [47, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }],
                [48, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }]
            ],
            4: [
                [60, true],
                [61, true]
            ],
            5: [
                [45, true],
                [46, true],
                [47, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }],
                [48, function (f) {
                    return (g_users && g_users[f.user] && (g_users[f.user].roles & U_GROUP_MODERATOR) == 0)
                }]
            ]
        };
        var b = {
            1: LANG.ct_resp_error1,
            2: LANG.ct_resp_error2,
            3: LANG.ct_resp_error3,
            7: LANG.ct_resp_error7
        };
        var a = null;
        this.displayError = function (g, f) {
            alert(f)
        };
        this.onShow = function () {
            if (location.hash && location.hash != "#contact") {
                a = location.hash
            }
            if (this.data.mode == 0) {
                location.replace("#contact")
            }
        };
        this.onHide = function () {
            if (a && (a.indexOf("screenshots:") == -1 || a.indexOf("videos:") == -1)) {
                location.replace(a)
            } else {
                location.replace("#.")
            }
        };
        this.onSubmit = function (k, g, j) {
            if (k.submitting) {
                return false
            }
            for (var h = 0; h < j.elements.length; ++h) {
                j.elements[h].disabled = true
            }
            var l = ["contact=1", "mode=" + $WH.urlencode(k.mode), "reason=" + $WH.urlencode(k.reason), "desc=" + $WH.urlencode(k.description), "ua=" + $WH.urlencode(navigator.userAgent), "appname=" + $WH.urlencode(navigator.appName), "page=" + $WH.urlencode(k.currenturl)];
            if (k.mode == 0) {
                if (k.relatedurl) {
                    l.push("relatedurl=" + $WH.urlencode(k.relatedurl))
                }
                if (k.email) {
                    l.push("email=" + $WH.urlencode(k.email))
                }
                if (!k.skipCaptcha) {
                    l.push("captcharesponse=" + $WH.urlencode(k.captcha_response));
                    l.push("captchachallenge=" + $WH.urlencode(k.captcha_challenge))
                } else {
                    l.push("skipcaptcha=1")
                }
            } else {
                if (k.mode == 1) {
                    l.push("id=" + $WH.urlencode(k.comment.id))
                } else {
                    if (k.mode == 2) {
                        l.push("id=" + $WH.urlencode(k.post.id))
                    } else {
                        if (k.mode == 3) {
                            l.push("id=" + $WH.urlencode(k.screenshot.id))
                        } else {
                            if (k.mode == 4) {
                                l.push("id=" + $WH.urlencode(k.profile.source))
                            } else {
                                if (k.mode == 5) {
                                    l.push("id=" + $WH.urlencode(k.video.id))
                                }
                            }
                        }
                    }
                }
            }
            k.submitting = true;
            var f = wowheadUrl + "/contactus";
            new Ajax(f, {
                method: "POST",
                params: l.join("&"),
                onSuccess: function (n, i) {
                    var m = n.responseText;
                    if (m == 0) {
                        if (g_user.name) {
                            alert($WH.sprintf(LANG.ct_dialog_thanks_user, g_user.name))
                        } else {
                            alert(LANG.ct_dialog_thanks)
                        }
                        Lightbox.hide()
                    } else {
                        if (b[m]) {
                            alert(b[m])
                        } else {
                            alert("Error: " + m)
                        }
                    }
                },
                onFailure: function (m, i) {
                    alert("Failure submitting contact request: " + m.statusText)
                },
                onComplete: function (o, n) {
                    for (var m = 0; m < j.elements.length; ++m) {
                        j.elements[m].disabled = false
                    }
                    k.submitting = false
                }
            });
            return false
        };
        this.show = function (f) {
            if (!f) {
                f = {}
            }
            var h = {
                mode: 0
            };
            $WH.cO(h, f);
            h.reasons = c[h.mode];
            if (location.href.indexOf("#contact") != -1) {
                h.currenturl = location.href.substr(0, location.href.indexOf("#contact"))
            } else {
                h.currenturl = location.href
            }
            var g = "contactus";
            if (h.mode != 0) {
                g = "reportform"
            }
            if (!d) {
                this.init()
            }
            d.show(g, {
                data: h,
                onShow: this.onShow,
                onHide: this.onHide,
                onSubmit: this.onSubmit
            })
        };
        this.checkPound = function () {
            if (location.hash && location.hash == "#contact") {
                ContactTool.show()
            }
        };
        var e;
        if ($WH.isset("g_thottbot") && g_thottbot) {
            e = "Contact Thottbot"
        } else {
            e = LANG.ct_dialog_contactwowhead
        }
        this.init = function () {
            d = new Dialog();
            Dialog.templates.contactus = {
                title: e,
                width: 550,
                buttons: [
                    ["check", LANG.ok],
                    ["x", LANG.cancel]
                ],
                fields: [{
                    id: "reason",
                    type: "select",
                    label: LANG.ct_dialog_reason,
                    required: 1,
                    options: [],
                    compute: function (n, p, h, l) {
                        $WH.ee(n);
                        for (var m = 0; m < this.data.reasons.length; ++m) {
                            var j = this.data.reasons[m][0];
                            var g = this.data.reasons[m][1];
                            var f = false;
                            if (typeof g == "function") {
                                f = g(this.extra)
                            } else {
                                f = g
                            }
                            if (!f) {
                                continue
                            }
                            var k = $WH.ce("option");
                            k.value = j;
                            if (p && p == j) {
                                k.selected = true
                            }
                            $WH.ae(k, $WH.ct(g_contact_reasons[j]));
                            $WH.ae(n, k)
                        }
                        n.onchange = function () {
                            if (this.value == 1 || this.value == 2 || this.value == 3) {
                                h.currenturl.parentNode.parentNode.style.display = "";
                                h.relatedurl.parentNode.parentNode.style.display = ""
                            } else {
                                h.currenturl.parentNode.parentNode.style.display = "none";
                                h.relatedurl.parentNode.parentNode.style.display = "none"
                            }
                        }.bind(n);
                        l.style.width = "98%"
                    },
                    validate: function (i, h, g) {
                        var f = "";
                        if (!i || i.length == 0) {
                            f = LANG.ct_dialog_error_reason
                        }
                        if (f == "") {
                            return true
                        }
                        ContactTool.displayError(g.reason, f);
                        g.reason.focus();
                        return false
                    }
                }, {
                    id: "currenturl",
                    type: "text",
                    disabled: true,
                    label: LANG.ct_dialog_currenturl,
                    size: 40
                }, {
                    id: "relatedurl",
                    type: "text",
                    label: LANG.ct_dialog_relatedurl,
                    caption: LANG.ct_dialog_optional,
                    size: 40,
                    validate: function (j, i, h) {
                        var g = "";
                        var f = /^(http(s?)\:\/\/|\/)?([\w]+:\w+@)?([a-zA-Z]{1}([\w\-]+\.)+([\w]{2,5}))(:[\d]{1,5})?((\/?\w+\/)+|\/?)(\w+\.[\w]{3,4})?((\?\w+=\w+)?(&\w+=\w+)*)?/;
                        j = j.trim();
                        if (j.length >= 250) {
                            g = LANG.ct_dialog_error_relatedurl
                        } else {
                            if (j.length > 0 && !f.test(j)) {
                                g = LANG.ct_dialog_error_invalidurl
                            }
                        }
                        if (g == "") {
                            return true
                        }
                        ContactTool.displayError(h.relatedurl, g);
                        h.relatedurl.focus();
                        return false
                    }
                }, {
                    id: "email",
                    type: "text",
                    label: LANG.ct_dialog_email,
                    caption: LANG.ct_dialog_email_caption,
                    compute: function (j, i, g, k, h) {
                        if (g_user.email) {
                            this.data.email = g_user.email;
                            h.style.display = "none"
                        } else {
                            var f = function () {
                                    $("#contact-emailwarn").css("display", g_isEmailValid($(g.email).val()) ? "none" : "");
                                    Lightbox.reveal()
                                };
                            $(j).keyup(f).blur(f)
                        }
                    },
                    validate: function (i, h, g) {
                        var f = "";
                        i = i.trim();
                        if (i.length >= 100) {
                            f = LANG.ct_dialog_error_emaillen
                        } else {
                            if (i.length > 0 && !g_isEmailValid(i)) {
                                f = LANG.ct_dialog_error_email
                            }
                        }
                        if (f == "") {
                            return true
                        }
                        ContactTool.displayError(g.email, f);
                        g.email.focus();
                        return false
                    }
                }, {
                    id: "description",
                    type: "textarea",
                    caption: LANG.ct_dialog_desc_caption,
                    width: "98%",
                    required: 1,
                    size: [10, 30],
                    validate: function (i, h, g) {
                        var f = "";
                        i = i.trim();
                        if (i.length == 0 || i.length > 10000) {
                            f = LANG.ct_dialog_error_desc
                        }
                        if (f == "") {
                            return true
                        }
                        ContactTool.displayError(g.description, f);
                        g.description.focus();
                        return false
                    }
                }, {
                    id: "noemailwarning",
                    type: "caption",
                    compute: function (h, g, f, i) {
                        $(i).html('<span id="contact-emailwarn" class="q10"' + (g_user.email ? ' style="display: none"' : "") + ">" + LANG.ct_dialog_noemailwarning + "</span>").css("white-space", "normal").css("padding", "0 4px")
                    }
                }, {
                    id: "captcha_response",
                    type: "dynamic",
                    compute: function (i, h, f, j, g) {
                        if (!g_requireCaptcha()) {
                            this.data.skipCaptcha = true;
                            return
                        }
                        if (g_captchaType == 1) {
                            $(j).css("height", "130px")
                        } else {
                            $(j).css("height", "75px")
                        }
                    },
                    update: function (i, h, f, k, g) {
                        if (this.data.skipCaptcha) {
                            return
                        }
                        var j = $("<div/>", {
                            id: "shjlfwhseo3w"
                        });
                        k = $(k);
                        k.append(j);
                        g_revealCaptcha("shjlfwhseo3w")
                    },
                    getValue: function (h, g, f) {
                        if (g_captchaType == 1) {
                            return Recaptcha.get_response()
                        } else {
                            return $("input[name=captcha]", f).val()
                        }
                    },
                    validate: function (i, h, g) {
                        var f = "";
                        if (typeof i == "string") {
                            i = $WH.trim(i)
                        }
                        if (!h.skipCaptcha && !i) {
                            f = LANG.ct_dialog_error_captcha
                        }
                        if (f == "") {
                            return true
                        }
                        ContactTool.displayError(null, f);
                        if (g_captchaType == 1) {
                            Recaptcha.focus_response_field()
                        } else {
                            $("input[name=captcha]", g).focus()
                        }
                        return false
                    }
                }, {
                    id: "captcha_challenge",
                    type: "dynamic",
                    compute: function (i, h, f, j, g) {},
                    getValue: function (h, g, f) {
                        if (g_captchaType == 1) {
                            return Recaptcha.get_challenge()
                        } else {
                            return $("input[name=captcha]", f).val()
                        }
                    }
                }],
                onInit: function (f) {},
                onShow: function (f) {
                    if (this.data.focus && f[this.data.focus]) {
                        setTimeout(g_setCaretPosition.bind(null, f[this.data.focus], f[this.data.focus].value.length), 100)
                    } else {
                        if (f.reason && !f.reason.value) {
                            setTimeout($WH.bindfunc(f.reason.focus, f.reason), 10)
                        } else {
                            if (f.relatedurl && !f.relatedurl.value) {
                                setTimeout($WH.bindfunc(f.relatedurl.focus, f.relatedurl), 10)
                            } else {
                                if (f.email && !f.email.value) {
                                    setTimeout($WH.bindfunc(f.email.focus, f.email), 10)
                                } else {
                                    if (f.description && !f.description.value) {
                                        setTimeout($WH.bindfunc(f.description.focus, f.description), 10)
                                    } else {
                                        if (f.captcha && !f.captcha.value) {
                                            setTimeout($WH.bindfunc(f.captcha.focus, f.captcha), 10)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    setTimeout(Lightbox.reveal, 250)
                }
            };
            Dialog.templates.reportform = {
                title: LANG.ct_dialog_report,
                width: 550,
                buttons: [
                    ["check", LANG.ok],
                    ["x", LANG.cancel]
                ],
                fields: [{
                    id: "reason",
                    type: "select",
                    label: LANG.ct_dialog_reason,
                    options: [],
                    compute: function (q, r, h, m) {
                        switch (this.data.mode) {
                        case 1:
                            h.firstChild.innerHTML = $WH.sprintf(LANG.ct_dialog_reportcomment, '<a href="' + wowheadUrl + '/user=' + this.data.comment.user + '">' + this.data.comment.user + "</a>");
                            break;
                        case 2:
                            var p = '<a href="' + wowheadUrl + '/user=' + this.data.post.user + '">' + this.data.post.user + "</a>";
                            if (this.data.post.op) {
                                h.firstChild.innerHTML = $WH.sprintf(LANG.ct_dialog_reporttopic, p)
                            } else {
                                h.firstChild.innerHTML = $WH.sprintf(LANG.ct_dialog_reportpost, p)
                            }
                            break;
                        case 3:
                            h.firstChild.innerHTML = $WH.sprintf(LANG.ct_dialog_reportscreen, '<a href="' + wowheadUrl + '/user=' + this.data.screenshot.user + '">' + this.data.screenshot.user + "</a>");
                            break;
                        case 4:
                            $WH.ee(h.firstChild);
                            $WH.ae(h.firstChild, $WH.ct(LANG.ct_dialog_reportchar));
                            break;
                        case 5:
                            h.firstChild.innerHTML = $WH.sprintf(LANG.ct_dialog_reportvideo, '<a href="' + wowheadUrl + '/user=' + this.data.video.user + '">' + this.data.video.user + "</a>");
                            break
                        }
                        h.firstChild.setAttribute("style", "");
                        $WH.ee(q);
                        var l;
                        if (this.data.mode == 1) {
                            l = this.data.comment
                        } else {
                            if (this.data.mode == 2) {
                                l = this.data.post
                            } else {
                                if (this.data.mode == 3) {
                                    l = this.data.screenshot
                                } else {
                                    if (this.data.mode == 4) {
                                        l = this.data.profile
                                    } else {
                                        if (this.data.mode == 5) {
                                            l = this.data.video
                                        }
                                    }
                                }
                            }
                        }
                        $WH.ae(q, $WH.ce("option", {
                            selected: (!r),
                            value: -1
                        }));
                        for (var n = 0; n < this.data.reasons.length; ++n) {
                            var j = this.data.reasons[n][0];
                            var g = this.data.reasons[n][1];
                            var f = false;
                            if (typeof g == "function") {
                                f = g(l)
                            } else {
                                f = g
                            }
                            if (!f) {
                                continue
                            }
                            var k = $WH.ce("option");
                            k.value = j;
                            if (r && r == j) {
                                k.selected = true
                            }
                            $WH.ae(k, $WH.ct(g_contact_reasons[j]));
                            $WH.ae(q, k)
                        }
                        m.style.width = "98%"
                    },
                    validate: function (i, h, g) {
                        var f = "";
                        if (!i || i == -1 || i.length == 0) {
                            f = LANG.ct_dialog_error_reason
                        }
                        if (f == "") {
                            return true
                        }
                        ContactTool.displayError(g.reason, f);
                        g.reason.focus();
                        return false
                    }
                }, {
                    id: "description",
                    type: "textarea",
                    caption: LANG.ct_dialog_desc_caption,
                    width: "98%",
                    required: 1,
                    size: [10, 30],
                    validate: function (i, h, g) {
                        var f = "";
                        i = i.trim();
                        if (i.length == 0 || i.length > 10000) {
                            f = LANG.ct_dialog_error_desc
                        }
                        if (f == "") {
                            return true
                        }
                        ContactTool.displayError(g.description, f);
                        g.description.focus();
                        return false
                    }
                }],
                onInit: function (f) {},
                onShow: function (g) {
                    var h = $(g).find("*[name=reason]")[0];
                    var f = $(g).find("*[name=description]")[0];
                    if (this.data.focus && g[this.data.focus]) {
                        setTimeout(g_setCaretPosition.bind(null, g[this.data.focus], g[this.data.focus].value.length), 100)
                    } else {
                        if (!h.value) {
                            setTimeout($WH.bindfunc(h.focus, h), 10)
                        } else {
                            if (!f.value) {
                                setTimeout($WH.bindfunc(f.focus, f), 10)
                            }
                        }
                    }
                }
            }
        };
        $(document).ready(this.checkPound)
    };

function g_cookiesEnabled() {
    document.cookie = "enabledTest";
    return (document.cookie.indexOf("enabledTest") != -1) ? true : false
}
function g_getWowheadCookie(a) {
    if (g_user.id > 0) {
        return g_user.cookies[a]
    } else {
        return $WH.gc(a)
    }
}
function g_setWowheadCookie(c, d, b) {
    var a = c.substr(0, 5) == "temp_";
    if (!b && g_user.id > 0 && !a) {
        new Ajax("/cookie=" + c + "&" + c + "=" + $WH.urlencode(d), {
            method: "get",
            onSuccess: function (e) {
                if (e.responseText == 0) {
                    g_user.cookies[c] = d
                }
            }
        })
    } else {
        if (b || g_user.id == 0) {
            $WH.sc(c, 14, d, null, ".wowhead.com")
        }
    }
}
var Dialog = function () {
        var d = this,
            i, r = null,
            m, j = {},
            l, c = false,
            o = $WH.ce("form"),
            b = {};
        o.onsubmit = function () {
            p();
            return false
        };
        this.show = function (u, v) {
            if (u) {
                m = u;
                i = Dialog.templates[m];
                d.template = i
            } else {
                return
            }
            if (i.onInit && !c) {
                (i.onInit.bind(d, o, v))()
            }
            if (v.onBeforeShow) {
                j.onBeforeShow = v.onBeforeShow.bind(d, o)
            }
            if (i.onBeforeShow) {
                i.onBeforeShow = i.onBeforeShow.bind(d, o)
            }
            if (v.onShow) {
                j.onShow = v.onShow.bind(d, o)
            }
            if (i.onShow) {
                i.onShow = i.onShow.bind(d, o)
            }
            if (v.onHide) {
                j.onHide = v.onHide.bind(d, o)
            }
            if (i.onHide) {
                i.onHide = i.onHide.bind(d, o)
            }
            if (v.onSubmit) {
                j.onSubmit = v.onSubmit
            }
            if (i.onSubmit) {
                r = i.onSubmit.bind(d, o)
            }
            if (v.data) {
                c = false;
                l = {};
                $WH.cO(l, v.data)
            }
            d.data = l;
            Lightbox.show("dialog-" + m, {
                onShow: a,
                onHide: k
            })
        };
        this.getValue = function (u) {
            return h(u)
        };
        this.setValue = function (v, u) {
            f(v, u)
        };
        this.getSelectedValue = function (u) {
            return q(u)
        };
        this.getCheckedValue = function (u) {
            return t(u)
        };

        function a(u, v) {
            if (v || !c) {
                e(u)
            }
            if (i.onBeforeShow) {
                i.onBeforeShow()
            }
            if (j.onBeforeShow) {
                j.onBeforeShow()
            }
            Lightbox.setSize(i.width, i.height);
            u.className = "dialog";
            n();
            if (i.onShow) {
                i.onShow()
            }
            if (j.onShow) {
                j.onShow()
            }
        }
        function e(E) {
            $WH.ee(E);
            $WH.ee(o);
            var u = $WH.ce("div");
            u.className = "text";
            $WH.ae(E, u);
            $WH.ae(u, o);
            if (i.title) {
                var N = $WH.ce("h1");
                $WH.ae(N, $WH.ct(i.title));
                $WH.ae(o, N)
            }
            var G = $WH.ce("table"),
                C = $WH.ce("tbody"),
                z = false;
            $WH.ae(G, C);
            $WH.ae(o, G);
            for (var M = 0, O = i.fields.length; M < O; ++M) {
                var v = i.fields[M],
                    D;
                if (!z) {
                    tr = $WH.ce("tr");
                    th = $WH.ce("th");
                    td = $WH.ce("td")
                }
                v.__tr = tr;
                if (l[v.id] == null) {
                    l[v.id] = (v.value ? v.value : "")
                }
                var B;
                if (v.options) {
                    B = [];
                    if (v.optorder) {
                        $WH.cO(B, v.optorder)
                    } else {
                        for (var L in v.options) {
                            B.push(L)
                        }
                    }
                    if (v.sort) {
                        B.sort(function (T, S) {
                            return v.sort * $WH.strcmp(v.options[T], v.options[S])
                        })
                    }
                }
                switch (v.type) {
                case "caption":
                    th.colSpan = 2;
                    th.style.textAlign = "left";
                    th.style.padding = 0;
                    if (v.compute) {
                        (v.compute.bind(d, null, l[v.id], o, th, tr))()
                    } else {
                        if (v.label) {
                            $WH.ae(th, $WH.ct(v.label))
                        }
                    }
                    $WH.ae(tr, th);
                    $WH.ae(C, tr);
                    continue;
                    break;
                case "textarea":
                    var P = D = $WH.ce("textarea");
                    P.name = v.id;
                    if (v.disabled) {
                        P.disabled = true
                    }
                    P.rows = v.size[0];
                    P.cols = v.size[1];
                    td.colSpan = 2;
                    if (v.label) {
                        th.colSpan = 2;
                        th.style.textAlign = "left";
                        th.style.padding = 0;
                        td.style.padding = 0;
                        $WH.ae(th, $WH.ct(v.label));
                        $WH.ae(tr, th);
                        $WH.ae(C, tr);
                        tr = $WH.ce("tr")
                    }
                    $WH.ae(td, P);
                    break;
                case "select":
                    var P = D = $WH.ce("select");
                    P.name = v.id;
                    if (v.size) {
                        P.size = v.size
                    }
                    if (v.disabled) {
                        P.disabled = true
                    }
                    if (v.multiple) {
                        P.multiple = true
                    }
                    for (var L = 0, A = B.length; L < A; ++L) {
                        var I = $WH.ce("option");
                        I.value = B[L];
                        $WH.ae(I, $WH.ct(v.options[B[L]]));
                        $WH.ae(P, I)
                    }
                    $WH.ae(td, P);
                    break;
                case "dynamic":
                    td.colSpan = 2;
                    td.style.textAlign = "left";
                    td.style.padding = 0;
                    if (v.compute) {
                        (v.compute.bind(d, null, l[v.id], o, td, tr))()
                    }
                    $WH.ae(tr, td);
                    $WH.ae(C, tr);
                    D = td;
                    break;
                case "checkbox":
                case "radio":
                    var K = 0;
                    D = [];
                    for (var L = 0, A = B.length; L < A; ++L) {
                        var H = $WH.ce("span"),
                            P, J, w = "sdfler46" + v.id + "-" + B[L];
                        if (L > 0 && !v.noInputBr) {
                            $WH.ae(td, $WH.ce("br"))
                        }
                        J = $WH.ce("label");
                        J.setAttribute("for", w);
                        J.onmousedown = $WH.rf;
                        P = $WH.ce("input");
                        P.setAttribute("type", v.type);
                        P.name = v.id;
                        P.value = B[L];
                        P.id = w;
                        if (v.disabled) {
                            P.disabled = true
                        }
                        if (v.submitOnDblClick) {
                            J.ondblclick = P.ondblclick = function (S) {
                                p()
                            }
                        }
                        if (v.compute) {
                            (v.compute.bind(d, P, l[v.id], o, td, tr))()
                        }
                        $WH.ae(J, P);
                        $WH.ae(J, $WH.ct(v.options[B[L]]));
                        $WH.ae(td, J);
                        D.push(P)
                    }
                    break;
                default:
                    var P = D = $WH.ce("input");
                    P.name = v.id;
                    if (v.size) {
                        P.size = v.size
                    }
                    if (v.disabled) {
                        P.disabled = true
                    }
                    if (v.submitOnEnter) {
                        P.onkeypress = function (S) {
                            S = $WH.$E(S);
                            if (S.keyCode == 13) {
                                p()
                            }
                        }
                    }
                    P.setAttribute("type", v.type);
                    $WH.ae(td, P);
                    break
                }
                if (v.label) {
                    if (v.type == "textarea") {
                        if (v.labelAlign) {
                            td.style.textAlign = v.labelAlign
                        }
                        td.colSpan = 2
                    } else {
                        if (v.labelAlign) {
                            th.style.textAlign = v.labelAlign
                        }
                        $WH.ae(th, $WH.ct(v.label));
                        $WH.ae(tr, th)
                    }
                }
                if (v.type != "checkbox" && v.type != "radio") {
                    if (v.width) {
                        P.style.width = v.width
                    }
                    if (v.compute && v.type != "caption" && v.type != "dynamic") {
                        (v.compute.bind(d, P, l[v.id], o, td, tr))()
                    }
                }
                if (v.caption) {
                    var H = $WH.ce("small");
                    if (v.type != "textarea") {
                        H.style.paddingLeft = "2px"
                    }
                    $WH.ae(H, $WH.ct(v.caption));
                    $WH.ae(td, H)
                }
                $WH.ae(tr, td);
                $WH.ae(C, tr);
                z = v.mergeCell;
                b[v.id] = D
            }
            for (var M = i.buttons.length; M > 0; --M) {
                var F = i.buttons[M - 1],
                    Q = $WH.ce("a");
                Q.onclick = p.bind(Q, F[0]);
                Q.className = "dialog-" + F[0];
                Q.href = "javascript:;";
                $WH.ae(Q, $WH.ct(F[1]));
                $WH.ae(E, Q)
            }
            var R = $WH.ce("div");
            R.className = "clear";
            $WH.ae(E, R);
            c = true
        }
        function n() {
            for (var z = 0, u = i.fields.length; z < u; ++z) {
                var B = i.fields[z],
                    A = b[B.id];
                switch (B.type) {
                case "caption":
                    break;
                case "select":
                    for (var w = 0, v = A.options.length; w < v; w++) {
                        A.options[w].selected = (A.options[w].value == l[B.id] || $WH.in_array(l[B.id], A.options[w].value) != -1)
                    }
                    break;
                case "checkbox":
                case "radio":
                    for (var w = 0, v = A.length; w < v; w++) {
                        A[w].checked = (A[w].value == l[B.id] || $WH.in_array(l[B.id], A[w].value) != -1)
                    }
                    break;
                default:
                    A.value = l[B.id];
                    break
                }
                if (B.update) {
                    (B.update.bind(d, null, l[B.id], o, A))()
                }
            }
        }
        function k() {
            if (i.onHide) {
                i.onHide()
            }
            if (j.onHide) {
                j.onHide()
            }
        }
        function p(v) {
            if (v == "x") {
                return Lightbox.hide()
            }
            for (var w = 0, u = i.fields.length; w < u; ++w) {
                var A = i.fields[w],
                    z;
                switch (A.type) {
                case "caption":
                    continue;
                case "select":
                    z = q(A.id);
                    break;
                case "checkbox":
                case "radio":
                    z = t(A.id);
                    break;
                case "dynamic":
                    if (A.getValue) {
                        z = A.getValue(A, l, o);
                        break
                    }
                default:
                    z = h(A.id);
                    break
                }
                if (A.validate) {
                    if (!A.validate(z, l, o)) {
                        return
                    }
                }
                if (z && typeof z == "string") {
                    z = $WH.trim(z)
                }
                l[A.id] = z
            }
            g(v)
        }
        function g(v) {
            var u;
            if (r) {
                u = r(l, v, o)
            }
            if (j.onSubmit) {
                u = j.onSubmit(l, v, o)
            }
            if (u === undefined || u) {
                Lightbox.hide()
            }
            return false
        }
        function h(u) {
            return b[u].value
        }
        function f(v, u) {
            b[v].value = u
        }
        function q(A) {
            var z = [],
                w = b[A];
            for (var v = 0, u = w.options.length; v < u; v++) {
                if (w.options[v].selected) {
                    z.push(parseInt(w.options[v].value) == w.options[v].value ? parseInt(w.options[v].value) : w.options[v].value)
                }
            }
            if (z.length == 1) {
                z = z[0]
            }
            return z
        }
        function t(A) {
            var z = [],
                w = b[A];
            for (var v = 0, u = w.length; v < u; v++) {
                if (w[v].checked) {
                    z.push(parseInt(w[v].value) == w[v].value ? parseInt(w[v].value) : w[v].value)
                }
            }
            return z
        }
    };
Dialog.templates = {};
Dialog.extraFields = {};

function g_addCss(b) {
    var c = $WH.ce("style");
    c.type = "text/css";
    if (c.styleSheet) {
        c.styleSheet.cssText = b
    } else {
        $WH.ae(c, $WH.ct(b))
    }
    var a = document.getElementsByTagName("head")[0];
    $WH.ae(a, c)
}
function g_setTextNodes(c, b) {
    if (c.nodeType == 3) {
        c.nodeValue = b
    } else {
        for (var a = 0; a < c.childNodes.length; ++a) {
            g_setTextNodes(c.childNodes[a], b)
        }
    }
}
function g_setInnerHtml(d, c, a) {
    if (d.nodeName.toLowerCase() == a) {
        d.innerHTML = c
    } else {
        for (var b = 0; b < d.childNodes.length; ++b) {
            g_setInnerHtml(d.childNodes[b], c, a)
        }
    }
}
function g_getFirstTextContent(c) {
    for (var b = 0; b < c.childNodes.length; ++b) {
        if (c.childNodes[b].nodeName == "#text") {
            return c.childNodes[b].nodeValue
        }
        var a = g_getFirstTextContent(c.childNodes[b]);
        if (a) {
            return a
        }
    }
    return false
}
function g_getTextContent(c) {
    var a = "";
    for (var b = 0; b < c.childNodes.length; ++b) {
        if (c.childNodes[b].nodeValue) {
            a += c.childNodes[b].nodeValue
        } else {
            if (c.childNodes[b].nodeName == "BR") {
                if ($WH.Browser.ie67) {
                    a += "\r"
                } else {
                    a += "\n"
                }
            }
        }
        a += g_getTextContent(c.childNodes[b])
    }
    return a
}
function g_toggleDisplay(a) {
    a = $(a);
    a.toggle();
    if (a.is(":visible")) {
        return true
    }
    return false
}
function g_enableScroll(a) {
    if (!a) {
        $WH.aE(document, "mousewheel", g_enableScroll.F);
        $WH.aE(window, "DOMMouseScroll", g_enableScroll.F)
    } else {
        $WH.dE(document, "mousewheel", g_enableScroll.F);
        $WH.dE(window, "DOMMouseScroll", g_enableScroll.F)
    }
}
g_enableScroll.F = function (a) {
    if (a.stopPropagation) {
        a.stopPropagation()
    }
    if (a.preventDefault) {
        a.preventDefault()
    }
    a.returnValue = false;
    a.cancelBubble = true;
    return false
};

function g_setCaretPosition(c, b) {
    if (!c) {
        return
    }
    if (c.createTextRange) {
        var a = c.createTextRange();
        a.move("character", b);
        a.select()
    } else {
        if (c.selectionStart != undefined) {
            c.focus();
            c.setSelectionRange(b, b)
        } else {
            c.focus()
        }
    }
}
function g_insertTag(d, a, i, j) {
    var b = $WH.ge(d);
    b.focus();
    if (b.selectionStart != null) {
        var l = b.selectionStart,
            h = b.selectionEnd,
            k = b.scrollLeft,
            c = b.scrollTop;
        var g = b.value.substring(l, h);
        if (typeof j == "function") {
            g = j(g)
        }
        b.value = b.value.substr(0, l) + a + g + i + b.value.substr(h);
        b.selectionStart = b.selectionEnd = h + a.length;
        b.scrollLeft = k;
        b.scrollTop = c
    } else {
        if (document.selection && document.selection.createRange) {
            var f = document.selection.createRange();
            if (f.parentElement() != b) {
                return
            }
            var g = f.text;
            if (typeof j == "function") {
                g = j(g)
            }
            f.text = a + g + i
        }
    }
    if (b.onkeyup) {
        b.onkeyup()
    }
}
function g_onAfterTyping(a, d, c) {
    var e;
    var b = function () {
            if (e) {
                clearTimeout(e);
                e = null
            }
            e = setTimeout(d, c)
        };
    a.onkeyup = b
}
function g_onClick(c, d) {
    var b = 0;

    function a(e) {
        if (b) {
            if (b != e) {
                return
            }
        } else {
            b = e
        }
        d(true)
    }
    c.onclick = function (f) {
        f = $WH.$E(f);
        if (f._button == 2) {
            return true
        }
        return false
    };
    c.oncontextmenu = function () {
        a(1);
        return false
    };
    c.onmouseup = function (f) {
        f = $WH.$E(f);
        if (f._button == 3 || f.shiftKey || f.ctrlKey) {
            a(2)
        } else {
            if (f._button == 1) {
                d(false)
            }
        }
        return false
    }
}
function g_isLeftClick(a) {
    a = $WH.$E(a);
    return (a && a._button == 1)
}
function g_preventEmptyFormSubmission() {
    if (!$.trim(this.elements[0].value)) {
        return false
    }
}
var Draggable = new function () {
        var a = {},
            h = {},
            l, d;

        function j(p) {
            p = $WH.$E(p);
            if (this._handle) {
                var m = p._target,
                    o = false,
                    n = 0;
                while (m && n <= 3) {
                    if (m == this._handle) {
                        o = true;
                        break
                    }
                    m = m.parentNode;
                    ++n
                }
                if (!o) {
                    return false
                }
            }
            l = this;
            a = $WH.g_getCursorPos(p);
            $WH.aE(document, "mousemove", b);
            $WH.aE(document, "mouseup", c);
            if (l.onClick) {
                l.onClick(p, l)
            }
            return false
        }
        function b(p) {
            p = $WH.$E(p);
            var q = $WH.g_getCursorPos(p);
            if (l) {
                if (Math.abs(q.x - a.x) > 5 || Math.abs(q.y - a.y) > 5) {
                    i(p, l);
                    l = null
                }
            }
            if (!d) {
                return false
            }
            var o = g(d),
                n = q.x - a.x,
                m = q.y - a.y;
            n = Math.max(d._bounds.x1 - h.x, Math.min(d._bounds.x2 - h.x - (o.x2 - o.x1), n));
            m = Math.max(d._bounds.y1 - h.y, Math.min(d._bounds.y2 - h.y - (o.y2 - o.y1), m));
            k(n, m);
            return false
        }
        function c(m) {
            m = $WH.$E(m);
            l = null;
            if (d) {
                f(m)
            }
        }
        function i(n, m) {
            if (d) {
                f(n)
            }
            var o = $WH.ac(m);
            h.x = o[0];
            h.y = o[1];
            if (m._targets.length) {
                d = m.cloneNode(true);
                d._orig = m;
                $WH.ae(document.body, d);
                k(-2323, -2323)
            } else {
                d = m
            }
            $WH.Tooltip.disabled = true;
            $WH.Tooltip.hide();
            if (m.onDrag) {
                m.onDrag(n, d, m)
            }
            d._bounds = g(m._container);
            d.className += " dragged"
        }
        function f(r) {
            var q = false,
                t = $WH.g_getCursorPos(r);
            if (d._orig && d._orig._targets.length) {
                e();
                var u = {
                    x1: d._x,
                    x2: d._x + parseInt(d.offsetWidth),
                    y1: d._y,
                    y2: d._y + parseInt(d.offsetHeight)
                };
                $WH.de(d);
                d = d._orig;
                for (var p = 0, n = d._targets.length; p < n; ++p) {
                    var m = d._targets[p],
                        o = g(m);
                    if (u.x2 >= o.x1 && u.x1 < o.x2 && u.y2 >= o.y1 && u.y1 < o.y2) {
                        q = true;
                        if (d.onDrop) {
                            d.onDrop(r, d, m, (t.x >= o.x1 && t.x <= o.x2 && t.y >= o.y1 && t.y <= o.y2))
                        } else {
                            $WH.ae(m, d)
                        }
                    }
                }
            }
            if (!q && d.onDrop) {
                d.onDrop(r, d, null)
            }
            $WH.dE(document, "mousemove", b);
            $WH.dE(document, "mouseup", c);
            $WH.Tooltip.disabled = false;
            d.className = d.className.replace(/dragged/, "");
            d = null
        }
        function k(n, m) {
            d.style.position = "absolute";
            d.style.left = h.x + n + "px";
            d.style.top = h.y + m + "px";
            d._x = h.x + n;
            d._y = h.y + m
        }
        function e() {
            d.style.left = "-2323px";
            d.style.top = "-2323px"
        }
        function g(m) {
            var n = $WH.ac(m);
            return {
                x1: n[0],
                x2: n[0] + parseInt(m.offsetWidth),
                y1: n[1],
                y2: n[1] + parseInt(m.offsetHeight)
            }
        }
        this.init = function (q, p) {
            q.onmousedown = j;
            var n = q.getElementsByTagName("a");
            for (var o = 0, m = n.length; o < m; ++o) {
                $WH.ns(n[o])
            }
            if (!q._targets) {
                q._targets = []
            }
            if (!q._container) {
                q._container = document.body
            }
            if (p != null) {
                if (p.targets) {
                    for (var o = 0, m = p.targets.length; o < m; ++o) {
                        q._targets.push($WH.ge(p.targets[o]))
                    }
                }
                if (p.container) {
                    q._container = $WH.ge(p.container)
                }
                if (p.onClick) {
                    q.onClick = p.onClick
                }
                if (p.onDrop) {
                    q.onDrop = p.onDrop
                }
                if (p.onDrag) {
                    q.onDrag = p.onDrag
                }
            }
        }
    };
var Facebook = {
    getCurrentOpenGraphUrl: function () {
        return $("head meta[property='og:url']").attr("content")
    },
    createLikeButton: function (b, c) {
        if (!c) {
            c = {}
        }
        var a, d, e;
        if (c.simple) {
            d = 90;
            e = 21;
            a = "button_count"
        } else {
            d = 400;
            e = 23;
            a = "standard"
        }
        var f = $("<iframe></iframe>", {
            src: "http://www.facebook.com/plugins/like.php?href=" + $WH.urlencode(b) + "&locale=en_US&layout=" + a + "&show_faces=false&action=like&font=arial&colorscheme=dark&width=" + d + "&height=" + e,
            scrolling: "no",
            frameborder: "0",
            allowtransparency: "true",
            css: {
                border: "none",
                overflow: "hidden",
                width: d + "px",
                height: e + "px",
                display: "none"
            }
        }).load(function () {
            $(this).show()
        });
        return f
    }
};
var g_localTime = new Date();
var g_blogimages = {};
var Icon = {
    sizes: ["small", "medium", "large", "blizzard"],
    sizes2: [18, 36, 56, 64],
    premiumOffsets: [
        [-56, -36],
        [-56, 0],
        [0, 0],
        [0, 0]
    ],
    create: function (d, n, j, c, g, m, b) {
        var i = $WH.ce("div"),
            e = $WH.ce("ins"),
            h = $WH.ce("del");
        if (n == null) {
            n = 1
        }
        i.className = "icon" + Icon.sizes[n];
        $WH.ae(i, e);
        if (!b) {
            $WH.ae(i, h)
        }
        Icon.setTexture(i, n, d);
        if (c) {
            var k = $WH.ce("a");
            k.href = c;
            if (c.indexOf("wowhead.com") == -1 && c.substr(0, 5) == "http:") {
                k.target = "_blank"
            }
            $WH.ae(i, k)
        } else {
            if (d) {
                var l = i.firstChild.style;
                var f = (l.backgroundImage.indexOf("/avatars/") != -1);
                if (!f) {
                    i.onclick = Icon.onClick;
                    var k = $WH.ce("a");
                    k.href = "javascript:;";
                    $WH.ae(i, k)
                }
            }
        }
        Icon.setNumQty(i, g, m);
        return i
    },
    createUser: function (d, f, c, b, a, g) {
        if (d == 2) {
            f = g_staticUrl + "/uploads/avatars/" + f + ".jpg"
        }
        var e = Icon.create(f, c, null, b, null, null, g);
        if (a) {
            e.className += " " + e.className + "-premium"
        }
        if (d == 2) {
            Icon.moveTexture(e, c, Icon.premiumOffsets[c][0], Icon.premiumOffsets[c][1], true)
        }
        return e
    },
    setTexture: function (d, c, b) {
        if (!b) {
            return
        }
        var a = d.firstChild.style;
        if (b.indexOf("/") != -1) {
            a.backgroundImage = "url(" + b + ")"
        } else {
            a.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/" + Icon.sizes[c] + "/" + b.toLowerCase() + ".jpg)"
        }
        Icon.moveTexture(d, c, 0, 0)
    },
    moveTexture: function (e, c, a, f, d) {
        var b = e.firstChild.style;
        if (a || f) {
            if (d) {
                b.backgroundPosition = a + "px " + f + "px"
            } else {
                b.backgroundPosition = (-a * Icon.sizes2[c]) + "px " + (-f * Icon.sizes2[c]) + "px"
            }
        } else {
            if (b.backgroundPosition) {
                b.backgroundPosition = ""
            }
        }
    },
    setNumQty: function (e, c, f) {
        var b = $WH.gE(e, "span");
        for (var d = 0, a = b.length; d < a; ++d) {
            if (b[d]) {
                $WH.de(b[d])
            }
        }
        if (c != null && ((c > 1 && c < 2147483647) || c.length)) {
            b = g_createGlow(c, (($WH.isset("g_thottbot") && g_thottbot) ? "w" : "q1"));
            b.style.right = "0";
            b.style.bottom = "0";
            b.style.position = "absolute";
            $WH.ae(e, b)
        }
        if (f != null && f > 0) {
            b = g_createGlow("(" + f + ")", (($WH.isset("g_thottbot") && g_thottbot) ? "w" : "q"));
            b.style.left = "0";
            b.style.top = "0";
            b.style.position = "absolute";
            $WH.ae(e, b)
        }
    },
    getLink: function (a) {
        return $WH.gE(a, "a")[0]
    },
    showIconName: function (a) {
        if (a.firstChild) {
            var c = a.firstChild.style;
            if (c.backgroundImage.length && (c.backgroundImage.indexOf(g_staticUrl) >= 4 || g_staticUrl == "")) {
                var d = c.backgroundImage.lastIndexOf("/"),
                    b = c.backgroundImage.indexOf(".jpg");
                if (d != -1 && b != -1) {
                    Icon.displayIcon(c.backgroundImage.substring(d + 1, b))
                }
            }
        }
    },
    onClick: function () {
        Icon.showIconName(this)
    },
    displayIcon: function (b) {
        if (!Dialog.templates.icondisplay) {
            var a = 364;
            switch (Locale.getId()) {
            case LOCALE_ESES:
                a = 380;
                break;
            case LOCALE_RURU:
                a = 384;
                break
            }
            Dialog.templates.icondisplay = {
                title: LANG.icon,
                width: a,
                buttons: [
                    ["arrow", LANG.original],
                    ["x", LANG.close]
                ],
                fields: [{
                    id: "icon",
                    label: LANG.dialog_imagename,
                    required: 1,
                    type: "text",
                    labelAlign: "left",
                    compute: function (e, d, c, h) {
                        var g = $WH.ce("div");
                        h.style.width = "300px";
                        g.style.position = "relative";
                        g.style.cssFloat = "left";
                        g.style.paddingRight = "6px";
                        e.style.width = "200px";
                        var f = this.iconDiv = $WH.ce("div");
                        f.style.position = "absolute";
                        f.style.top = "-12px";
                        f.style.right = "-70px";
                        f.update = function () {
                            setTimeout(function () {
                                e.focus();
                                e.select()
                            }, 10);
                            $WH.ee(f);
                            $WH.ae(f, Icon.create(e.value, 2))
                        };
                        $WH.ae(f, Icon.create(d, 2));
                        $WH.ae(g, f);
                        $WH.ae(g, e);
                        $WH.ae(h, g)
                    }
                }, {
                    id: "location",
                    label: " ",
                    required: 1,
                    type: "caption",
                    compute: function (h, g, e, d, f) {
                        $WH.ee(d);
                        d.style.padding = "3px 3px 0 3px";
                        d.style.lineHeight = "17px";
                        d.style.whiteSpace = "normal";
                        var j = $WH.ce("div");
                        j.style.position = "relative";
                        j.style.width = "250px";
                        var c = $WH.ce("span");
                        var i = LANG.dialog_seeallusingicon;
                        i = i.replace("$1", '<a href="' + wowheadUrl + '/items?filter=cr=142;crs=0;crv=' + this.data.icon + '">' + LANG.types[3][3] + "</a>");
                        i = i.replace("$2", '<a href="' + wowheadUrl + '/spells?filter=cr=15;crs=0;crv=' + this.data.icon + '">' + LANG.types[6][3] + "</a>");
                        i = i.replace("$3", '<a href="' + wowheadUrl + '/achievements?filter=cr=10;crs=0;crv=' + this.data.icon + '">' + LANG.types[10][3] + "</a>");
                        c.innerHTML = i;
                        $WH.ae(j, c);
                        $WH.ae(d, j)
                    }
                }],
                onInit: function (c) {
                    this.updateIcon = this.template.updateIcon.bind(this, c)
                },
                onShow: function (c) {
                    this.updateIcon();
                    if (location.hash && location.hash.indexOf("#icon") == -1) {
                        this.oldHash = location.hash
                    } else {
                        this.oldHash = ""
                    }
                    var d = "#icon";
                    var e = ($WH.isset("g_pageInfo") && g_pageInfo.type && $WH.in_array([3, 6, 10], g_pageInfo.type) == -1);
                    if (!e) {
                        d += ":" + this.data.icon
                    }
                    location.hash = d
                },
                onHide: function (c) {
                    if (this.oldHash) {
                        location.hash = this.oldHash
                    } else {
                        location.hash = "#."
                    }
                },
                updateIcon: function (c) {
                    this.iconDiv.update()
                },
                onSubmit: function (f, e, c, d) {
                    if (c == "original") {
                        var g = window.open(g_staticUrl + "/images/wow/icons/large/" + e.icon.toLowerCase() + ".jpg", "_blank");
                        g.focus();
                        return false
                    }
                    return true
                }
            }
        }
        if (!Icon.icDialog) {
            Icon.icDialog = new Dialog()
        }
        Icon.icDialog.show("icondisplay", {
            data: {
                icon: b
            }
        })
    },
    checkPound: function () {
        if (location.hash && location.hash.indexOf("#icon") == 0) {
            var b = location.hash.split(":");
            var a = false;
            if (b.length == 2) {
                a = b[1]
            } else {
                if (b.length == 1 && $WH.isset("g_pageInfo")) {
                    switch (g_pageInfo.type) {
                    case 3:
                        a = g_items[g_pageInfo.typeId].icon.toLowerCase();
                        break;
                    case 6:
                        a = g_spells[g_pageInfo.typeId].icon.toLowerCase();
                        break;
                    case 10:
                        a = g_achievements[g_pageInfo.typeId].icon.toLowerCase();
                        break
                    }
                }
            }
            if (a) {
                Icon.displayIcon(a)
            }
        }
    }
};
$(document).ready(Icon.checkPound);
var Lightbox = new function () {
        var d, l, m, h = {},
            c = {},
            i, f;

        function n() {
            $WH.aE(d, "click", e);
            $WH.aE(document, "keydown", g);
            $WH.aE(window, "resize", a)
        }
        function k() {
            $WH.dE(d, "click", e);
            $WH.dE(document, "keydown", g);
            $WH.dE(window, "resize", a)
        }
        function b() {
            if (i) {
                return
            }
            i = 1;
            var o = document.body;
            d = $WH.ce("div");
            d.className = "lightbox-overlay";
            l = $WH.ce("div");
            l.className = "lightbox-outer";
            m = $WH.ce("div");
            m.className = "lightbox-inner";
            d.style.display = l.style.display = "none";
            $WH.ae(o, d);
            $WH.ae(l, m);
            $WH.ae(o, l)
        }
        function g(o) {
            o = $WH.$E(o);
            switch (o.keyCode) {
            case 27:
                e();
                break
            }
        }
        function a(o) {
            if (o != 1234) {
                if (c.onResize) {
                    c.onResize()
                }
            }
            d.style.height = document.body.offsetHeight + "px"
        }
        function e() {
            if (!i) {
                return
            }
            k();
            if (c.onHide) {
                c.onHide()
            }
            d.style.display = l.style.display = "none";
            Ads.restoreHidden();
            PoundChecker.resume();
            g_enableScroll(true)
        }
        function j() {
            d.style.display = l.style.display = h[f].style.display = "";
            Lightbox.setSize(m.offsetWidth, m.offsetHeight, 1)
        }
        this.setSize = function (o, p, q) {
            m.style.visibility = "hidden";
            if (!q) {
                m.style.width = o + "px";
                if (p) {
                    m.style.height = p + "px"
                }
            }
            m.style.left = -parseInt(o / 2) + "px";
            if (p) {
                m.style.top = -parseInt(p / 2) + "px"
            }
            m.style.visibility = "visible"
        };
        this.show = function (t, r, o) {
            c = r || {};
            Ads.hideAll();
            PoundChecker.pause();
            b();
            n();
            if (f != t && h[f] != null) {
                h[f].style.display = "none"
            }
            f = t;
            var q = 0,
                p;
            if (h[t] == null) {
                q = 1;
                p = $WH.ce("div");
                $WH.ae(m, p);
                h[t] = p
            } else {
                p = h[t]
            }
            if (c.onShow) {
                c.onShow(p, q, o)
            }
            a(1234);
            j();
            g_enableScroll(false)
        };
        this.reveal = function () {
            j()
        };
        this.hide = function () {
            e()
        };
        this.isVisible = function () {
            return (d && d.style.display != "none")
        }
    };

function Line(e, l, b, j, i) {
    var f = Math.min(e, b),
        o = Math.max(e, b),
        k = Math.min(l, j),
        h = Math.max(l, j),
        d = (o - f),
        m = (h - k),
        g = Math.sqrt(Math.pow(d, 2) + Math.pow(m, 2)),
        p = Math.atan2(m, d),
        a = Math.sin(p),
        c = Math.cos(p);
    var n = $('<span class="line" />').css({
        top: k.toFixed(2) + "px",
        left: f.toFixed(2) + "px",
        width: d.toFixed(2) + "px",
        height: m.toFixed(2) + "px"
    }).append($("<var />").css({
        width: g.toFixed(2) + "px",
        "-o-transform": "rotate(" + p + "rad)",
        "-moz-transform": "rotate(" + p + "rad)",
        "-webkit-transform": "rotate(" + p + "rad)",
        filter: "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + c + ", M12=" + (-1 * a) + ", M21=" + a + ", M22=" + c + ")"
    }));
    if (!(e == f && l == k) && !(b == f && j == k)) {
        n.addClass("flipped")
    }
    if (i != null) {
        n.addClass("line-" + i)
    }
    return n[0]
}
var g_listviews = {};

function Listview(a) {
    $WH.cO(this, a);
    if (this.id) {
        var h = (this.tabs ? "tab-" : "lv-") + this.id;
        if (this.parent) {
            var v = $WH.ce("div");
            v.id = h;
            $WH.ae($WH.ge(this.parent), v);
            this.container = v
        } else {
            this.container = $WH.ge(h)
        }
    } else {
        return
    }
    var w = $WH.g_getGets();
    if ((w.debug != null || g_user.debug) && g_user.roles & U_GROUP_MODERATOR) {
        this.debug = true
    }
    if (this.template && Listview.templates[this.template]) {
        this.template = Listview.templates[this.template]
    } else {
        return
    }
    g_listviews[this.id] = this;
    if (this.data == null) {
        this.data = []
    }
    if (this.poundable == null) {
        if (this.template.poundable != null) {
            this.poundable = this.template.poundable
        } else {
            this.poundable = true
        }
    }
    if (this.searchable == null) {
        if (this.template.searchable != null) {
            this.searchable = this.template.searchable
        } else {
            this.searchable = false
        }
    }
    if (this.filtrable == null) {
        if (this.template.filtrable != null) {
            this.filtrable = this.template.filtrable
        } else {
            this.filtrable = false
        }
    }
    if (this.sortable == null) {
        if (this.template.sortable != null) {
            this.sortable = this.template.sortable
        } else {
            this.sortable = true
        }
    }
    if (this.customPound == null) {
        if (this.template.customPound != null) {
            this.customPound = this.template.customPound
        } else {
            this.customPound = false
        }
    }
    if (this.data.length == 1) {
        this.filtrable = false;
        this.searchable = false
    }
    if (this.searchable && this.searchDelay == null) {
        if (this.template.searchDelay != null) {
            this.searchDelay = this.template.searchDelay
        } else {
            this.searchDelay = 333
        }
    }
    if (this.clickable == null) {
        if (this.template.clickable != null) {
            this.clickable = this.template.clickable
        } else {
            this.clickable = true
        }
    }
    if (this.hideBands == null) {
        this.hideBands = this.template.hideBands
    }
    if (this.hideNav == null) {
        this.hideNav = this.template.hideNav
    }
    if (this.hideHeader == null) {
        this.hideHeader = this.template.hideHeader
    }
    if (this.hideCount == null) {
        this.hideCount = this.template.hideCount
    }
    if (this.computeDataFunc == null && this.template.computeDataFunc != null) {
        this.computeDataFunc = this.template.computeDataFunc
    }
    if (this.createCbControls == null && this.template.createCbControls != null) {
        this.createCbControls = this.template.createCbControls
    }
    if (this.template.onBeforeCreate != null) {
        if (this.onBeforeCreate == null) {
            this.onBeforeCreate = this.template.onBeforeCreate
        } else {
            this.onBeforeCreate = [this.template.onBeforeCreate, this.onBeforeCreate]
        }
    }
    if (this.onAfterCreate == null && this.template.onAfterCreate != null) {
        this.onAfterCreate = this.template.onAfterCreate
    }
    if (this.onNoData == null && this.template.onNoData != null) {
        this.onNoData = this.template.onNoData
    }
    if (this.createNote == null && this.template.createNote != null) {
        this.createNote = this.template.createNote
    }
    if (this.customFilter == null && this.template.customFilter != null) {
        this.customFilter = this.template.customFilter
    }
    if (this.onSearchSubmit == null && this.template.onSearchSubmit != null) {
        this.onSearchSubmit = this.template.onSearchSubmit
    }
    if (this.getItemLink == null && this.template.getItemLink != null) {
        this.getItemLink = this.template.getItemLink
    }
    if (this.clip == null && this.template.clip != null) {
        this.clip = this.template.clip
    }
    if (this.clip || this.template.compute || this.id == "topics" || this.id == "recipes") {
        this.debug = false
    }
    if (this.mode == null) {
        this.mode = this.template.mode
    }
    if (this.template.noStyle != null) {
        this.noStyle = this.template.noStyle
    }
    if (this.nItemsPerPage == null) {
        if (this.template.nItemsPerPage != null) {
            this.nItemsPerPage = this.template.nItemsPerPage
        } else {
            this.nItemsPerPage = 50
        }
    }
    this.nItemsPerPage |= 0;
    if (this.nItemsPerPage <= 0) {
        this.nItemsPerPage = 0
    }
    this.nFilters = 0;
    this.resetRowVisibility();
    if (this.mode == Listview.MODE_TILED) {
        if (this.nItemsPerRow == null) {
            var t = this.template.nItemsPerRow;
            this.nItemsPerRow = (t != null ? t : 4)
        }
        this.nItemsPerRow |= 0;
        if (this.nItemsPerRow <= 1) {
            this.nItemsPerRow = 1
        }
    } else {
        if (this.mode == Listview.MODE_CALENDAR) {
            this.dates = [];
            this.nItemsPerRow = 7;
            this.nItemsPerPage = 1;
            this.nDaysPerMonth = [];
            if (this.template.startOnMonth != null) {
                this.startOnMonth = this.template.startOnMonth
            } else {
                this.startOnMonth = new Date()
            }
            this.startOnMonth.setDate(1);
            this.startOnMonth.setHours(0, 0, 0, 0);
            if (this.nMonthsToDisplay == null) {
                if (this.template.nMonthsToDisplay != null) {
                    this.nMonthsToDisplay = this.template.nMonthsToDisplay
                } else {
                    this.nMonthsToDisplay = 1
                }
            }
            var k = this.startOnMonth.getFullYear(),
                n = this.startOnMonth.getMonth();
            for (var p = 0; p < this.nMonthsToDisplay; ++p) {
                var z = new Date(k, n + p, 32);
                this.nDaysPerMonth[p] = 32 - z.getDate();
                for (var q = 1; q <= this.nDaysPerMonth[p]; ++q) {
                    this.dates.push({
                        date: new Date(k, n + p, q)
                    })
                }
            }
            if (this.template.rowOffset != null) {
                this.rowOffset = this.template.rowOffset
            }
        } else {
            this.nItemsPerRow = 1
        }
    }
    this.columns = [];
    for (var q = 0, r = this.template.columns.length; q < r; ++q) {
        var A = this.template.columns[q],
            f = {};
        $WH.cO(f, A);
        this.columns.push(f)
    }
    if (this.extraCols != null) {
        for (var q = 0, r = this.extraCols.length; q < r; ++q) {
            var c = null;
            var b = this.extraCols[q];
            if (b.after || b.before) {
                var g = $WH.in_array(this.columns, (b.after ? b.after : b.before), function (d) {
                    return d.id
                });
                if (g != -1) {
                    c = (b.after ? g + 1 : g)
                }
            }
            if (c == null) {
                c = this.columns.length
            }
            if (b.id == "debug-id") {
                this.columns.splice(0, 0, b)
            } else {
                this.columns.splice(c, 0, b)
            }
        }
    }
    this.visibility = [];
    var o = [],
        l = [];
    if (this.visibleCols != null) {
        $WH.array_walk(this.visibleCols, function (d) {
            o[d] = 1
        })
    }
    if (this.hiddenCols != null) {
        $WH.array_walk(this.hiddenCols, function (d) {
            l[d] = 1
        })
    }
    for (var q = 0, r = this.columns.length; q < r; ++q) {
        var b = this.columns[q];
        if (o[b.id] != null || (!b.hidden && l[b.id] == null)) {
            this.visibility.push(q)
        }
    }
    if (this.sort == null && this.template.sort) {
        this.sort = this.template.sort.slice(0)
    }
    if (this.sort != null) {
        var e = this.sort;
        this.sort = [];
        for (var q = 0, r = e.length; q < r; ++q) {
            var b = parseInt(e[q]);
            if (isNaN(b)) {
                var u = 0;
                if (e[q].charAt(0) == "-") {
                    u = 1;
                    e[q] = e[q].substring(1)
                }
                var g = $WH.in_array(this.columns, e[q], function (d) {
                    return d.id
                });
                if (g != -1) {
                    if (u) {
                        this.sort.push(-(g + 1))
                    } else {
                        this.sort.push(g + 1)
                    }
                }
            } else {
                this.sort.push(b)
            }
        }
    } else {
        this.sort = []
    }
    if (this.debug) {
        this.columns.splice(0, 0, {
            id: "debug-id",
            compute: function (d, i) {
                if (d.id) {
                    $WH.ae(i, $WH.ct(d.id))
                }
            },
            getVisibleText: function (d) {
                if (d.id) {
                    return d.id
                } else {
                    return ""
                }
            },
            getValue: function (d) {
                if (d.id) {
                    return d.id
                } else {
                    return 0
                }
            },
            sortFunc: function (i, d, j) {
                if (i.id == null) {
                    return -1
                } else {
                    if (d.id == null) {
                        return 1
                    }
                }
                return $WH.strcmp(i.id, d.id)
            },
            name: "ID",
            width: "5%",
            tooltip: "ID"
        });
        this.visibility.splice(0, 0, -1);
        for (var q = 0, r = this.visibility.length; q < r; ++q) {
            this.visibility[q] = this.visibility[q] + 1
        }
        for (var q = 0, r = this.sort.length; q < r; ++q) {
            if (this.sort[q] < 0) {
                this.sort[q] = this.sort[q] - 1
            } else {
                this.sort[q] = this.sort[q] + 1
            }
        }
    }
    if (this.tabs) {
        this.tabIndex = this.tabs.add(this.getTabName(), {
            id: this.id,
            onLoad: this.initialize.bind(this)
        });
        this.tabClick = Tabs.trackClick.bind(this.tabs, this.tabs.tabs[this.tabIndex])
    } else {
        this.initialize()
    }
}
Listview.MODE_DEFAULT = 0;
Listview.MODE_CHECKBOX = 1;
Listview.MODE_DIV = 2;
Listview.MODE_TILED = 3;
Listview.MODE_CALENDAR = 4;
Listview.prototype = {
    initialize: function () {
        if (this.data.length) {
            if (this.computeDataFunc != null) {
                for (var d = 0, a = this.data.length; d < a; ++d) {
                    this.computeDataFunc(this.data[d])
                }
            }
        }
        if (this.tabs) {
            this.pounded = (this.tabs.poundedTab == this.tabIndex);
            if (this.pounded) {
                this.readPound()
            }
        } else {
            this.readPound()
        }
        this.applySort();
        var b;
        if (this.onBeforeCreate != null) {
            if (typeof this.onBeforeCreate == "function") {
                b = this.onBeforeCreate()
            } else {
                for (var d = 0; d < this.onBeforeCreate.length; ++d) {
                    (this.onBeforeCreate[d].bind(this))()
                }
            }
        }
        this.noData = $WH.ce("div");
        this.noData.className = "listview-nodata text";
        if (this.mode == Listview.MODE_DIV) {
            this.mainContainer = this.mainDiv = $WH.ce("div");
            if (!this.noStyle) {
                this.mainContainer.className = "listview-mode-div"
            }
        } else {
            this.mainContainer = this.table = $WH.ce("table");
            this.thead = $WH.ce("thead");
            this.tbody = $WH.ce("tbody");
            if (this.clickable) {
                this.tbody.className = "clickable"
            }
            if (this.mode == Listview.MODE_TILED || this.mode == Listview.MODE_CALENDAR) {
                if (!this.noStyle) {
                    this.table.className = "listview-mode-" + (this.mode == Listview.MODE_TILED ? "tiled" : "calendar")
                }
                var e = (100 / this.nItemsPerRow) + "%",
                    f = $WH.ce("colgroup"),
                    c;
                for (var d = 0; d < this.nItemsPerRow; ++d) {
                    c = $WH.ce("col");
                    c.style.width = e;
                    $WH.ae(f, c)
                }
                $WH.ae(this.mainContainer, f)
            } else {
                if (!this.noStyle) {
                    this.table.className = "listview-mode-default"
                }
                this.createHeader();
                this.updateSortArrow()
            }
            $WH.ae(this.table, this.thead);
            $WH.ae(this.table, this.tbody)
        }
        this.createBands();
        if (this.customFilter != null) {
            this.updateFilters()
        }
        this.updateNav();
        this.refreshRows();
        if (this.onAfterCreate != null) {
            this.onAfterCreate(b)
        }
    },
    createHeader: function () {
        var h = $WH.ce("tr");
        if (this.mode == Listview.MODE_CHECKBOX && (!$WH.isset("g_thottbot") || !g_thottbot)) {
            var g = $WH.ce("th"),
                j = $WH.ce("div"),
                c = $WH.ce("a");
            g.style.width = "33px";
            c.href = "javascript:;";
            c.className = "listview-cb";
            $WH.ns(c);
            $WH.ae(c, $WH.ct(String.fromCharCode(160)));
            $WH.ae(j, c);
            $WH.ae(g, j);
            $WH.ae(h, g)
        }
        for (var f = 0, b = this.visibility.length; f < b; ++f) {
            var e = this.visibility[f],
                d = this.columns[e],
                g = $WH.ce("th");
            j = $WH.ce("div"), c = $WH.ce("a"), outerSpan = $WH.ce("span"), innerSpan = $WH.ce("span");
            d.__th = g;
            if (this.filtrable && (d.filtrable == null || d.filtrable)) {
                c.onmouseup = Listview.headerClick.bind(this, d, e);
                c.onclick = c.oncontextmenu = $WH.rf
            } else {
                if (this.sortable) {
                    c.href = "javascript:;";
                    c.onclick = this.sortBy.bind(this, e + 1)
                }
            }
            if (c.onclick) {
                c.onmouseover = Listview.headerOver.bind(this, c, d);
                c.onmouseout = $WH.Tooltip.hide;
                $WH.ns(c)
            } else {
                c.className = "static"
            }
            if (d.width != null) {
                g.style.width = d.width
            }
            if (d.align != null) {
                g.style.textAlign = d.align
            }
            if (d.span != null) {
                g.colSpan = d.span
            }
            $WH.ae(innerSpan, $WH.ct(d.name));
            $WH.ae(outerSpan, innerSpan);
            $WH.ae(c, outerSpan);
            $WH.ae(j, c);
            $WH.ae(g, j);
            $WH.ae(h, g)
        }
        if (this.hideHeader) {
            this.thead.style.display = "none"
        }
        $WH.ae(this.thead, h)
    },
    createBands: function () {
        var k = $WH.ce("div"),
            m = $WH.ce("div"),
            n = $WH.ce("div"),
            l = $WH.ce("div");
        this.bandTop = k;
        this.bandBot = m;
        this.noteTop = n;
        this.noteBot = l;
        k.className = "listview-band-top";
        m.className = "listview-band-bottom";
        this.navTop = this.createNav(true);
        this.navBot = this.createNav(false);
        n.className = l.className = "listview-note";
        if (this.note) {
            n.innerHTML = this.note
        } else {
            if (this.createNote) {
                this.createNote(n, l)
            }
        }
        if (this.debug) {
            $WH.ae(n, $WH.ct(" ("));
            var c = $WH.ce("a");
            c.onclick = this.getList.bind(this);
            $WH.ae(c, $WH.ct("CSV"));
            $WH.ae(n, c);
            $WH.ae(n, $WH.ct(")"))
        }
        if (this._errors) {
            var e = $WH.ce("small"),
                h = $WH.ce("b");
            h.className = "q10 icon-report";
            if (n.innerHTML) {
                h.style.marginLeft = "10px"
            }
            e.onmouseover = function (a) {
                $WH.Tooltip.showAtCursor(a, LANG.lvnote_witherrors, 0, 0, "q")
            };
            e.onmousemove = $WH.Tooltip.cursorUpdate;
            e.onmouseout = $WH.Tooltip.hide;
            $WH.st(h, LANG.error);
            $WH.ae(e, h);
            $WH.ae(n, e)
        }
        if (!n.firstChild && !(this.createCbControls || this.mode == Listview.MODE_CHECKBOX)) {
            $WH.ae(n, $WH.ct(String.fromCharCode(160)))
        }
        if (!(this.createCbControls || this.mode == Listview.MODE_CHECKBOX)) {
            $WH.ae(l, $WH.ct(String.fromCharCode(160)))
        }
        $WH.ae(k, this.navTop);
        if (this.searchable) {
            var o = this.updateFilters.bind(this, true),
                f = (this._truncated ? "search-within-results2" : "search-within-results"),
                e = $WH.ce("span"),
                d = $WH.ce("em"),
                j = $WH.ce("a"),
                i = $WH.ce("input");
            e.className = "listview-quicksearch";
            if (this.tabClick) {
                $(e).click(this.tabClick)
            }
            $WH.ae(e, d);
            j.href = "javascript:;";
            j.onclick = function () {
                var a = this.nextSibling;
                a.value = "";
                a.className = f;
                o()
            };
            j.style.display = "none";
            $WH.ae(j, $WH.ce("span"));
            $WH.ae(e, j);
            $WH.ns(j);
            i.setAttribute("type", "text");
            i.className = f;
            i.style.width = (this._truncated ? "19em" : "15em");
            g_onAfterTyping(i, o, this.searchDelay);
            i.onmouseover = function () {
                if ($WH.trim(this.value) != "") {
                    this.className = ""
                }
            };
            i.onfocus = function () {
                this.className = ""
            };
            i.onblur = function () {
                if ($WH.trim(this.value) == "") {
                    this.className = f;
                    this.value = ""
                }
            };
            i.onkeypress = this.submitSearch.bind(this);
            $WH.ae(e, i);
            this.quickSearchBox = i;
            this.quickSearchGlass = d;
            this.quickSearchClear = j;
            $WH.ae(k, e)
        }
        $WH.ae(k, n);
        $WH.ae(m, this.navBot);
        $WH.ae(m, l);
        if (this.createCbControls || this.mode == Listview.MODE_CHECKBOX) {
            if (this.note) {
                n.style.paddingBottom = "5px"
            }
            this.cbBarTop = this.createCbBar(true);
            this.cbBarBot = this.createCbBar(false);
            $WH.ae(k, this.cbBarTop);
            $WH.ae(m, this.cbBarBot);
            if (!this.noteTop.firstChild && !this.cbBarTop.firstChild) {
                this.noteTop.innerHTML = "&nbsp;"
            }
            if (!this.noteBot.firstChild && !this.cbBarBot.firstChild) {
                this.noteBot.innerHTML = "&nbsp;"
            }
            if (this.noteTop.firstChild && this.cbBarTop.firstChild) {
                this.noteTop.style.paddingBottom = "6px"
            }
            if (this.noteBot.firstChild && this.cbBarBot.firstChild) {
                this.noteBot.style.paddingBottom = "6px"
            }
        }
        if (this.hideBands & 1) {
            k.style.display = "none"
        }
        if (this.hideBands & 2) {
            m.style.display = "none"
        }
        $WH.ae(this.container, this.bandTop);
        if (this.clip) {
            var g = $WH.ce("div");
            g.className = "listview-clip";
            g.style.width = this.clip.w + "px";
            g.style.height = this.clip.h + "px";
            this.clipDiv = g;
            $WH.ae(g, this.mainContainer);
            $WH.ae(g, this.noData);
            $WH.ae(this.container, g)
        } else {
            $WH.ae(this.container, this.mainContainer);
            $WH.ae(this.container, this.noData)
        }
        $WH.ae(this.container, this.bandBot)
    },
    createNav: function (g) {
        var c = $WH.ce("div"),
            d = $WH.ce("a"),
            b = $WH.ce("a"),
            a = $WH.ce("a"),
            j = $WH.ce("a"),
            i = $WH.ce("span"),
            h = $WH.ce("b"),
            f = $WH.ce("b"),
            e = $WH.ce("b");
        c.className = "listview-nav";
        d.href = b.href = a.href = j.href = "javascript:;";
        $WH.ae(d, $WH.ct(String.fromCharCode(171) + LANG.lvpage_first));
        $WH.ae(b, $WH.ct(String.fromCharCode(8249) + LANG.lvpage_previous));
        $WH.ae(a, $WH.ct(LANG.lvpage_next + String.fromCharCode(8250)));
        $WH.ae(j, $WH.ct(LANG.lvpage_last + String.fromCharCode(187)));
        $WH.ns(d);
        $WH.ns(b);
        $WH.ns(a);
        $WH.ns(j);
        d.onclick = this.firstPage.bind(this);
        b.onclick = this.previousPage.bind(this);
        a.onclick = this.nextPage.bind(this);
        j.onclick = this.lastPage.bind(this);
        if (this.mode == Listview.MODE_CALENDAR) {
            $WH.ae(h, $WH.ct("a"));
            $WH.ae(i, h)
        } else {
            $WH.ae(h, $WH.ct("a"));
            $WH.ae(f, $WH.ct("a"));
            $WH.ae(e, $WH.ct("a"));
            $WH.ae(i, h);
            $WH.ae(i, $WH.ct(LANG.hyphen));
            $WH.ae(i, f);
            $WH.ae(i, $WH.ct(LANG.lvpage_of));
            $WH.ae(i, e)
        }
        $WH.ae(c, d);
        $WH.ae(c, b);
        $WH.ae(c, i);
        $WH.ae(c, a);
        $WH.ae(c, j);
        if (g) {
            if (this.hideNav & 1) {
                c.style.display = "none"
            }
        } else {
            if (this.hideNav & 2) {
                c.style.display = "none"
            }
        }
        if (this.tabClick) {
            $("a", c).click(this.tabClick)
        }
        return c
    },
    createCbBar: function (a) {
        var b = $WH.ce("div");
        if (this.createCbControls) {
            this.createCbControls(b, a)
        }
        if (b.firstChild) {
            b.className = "listview-withselected" + (a ? "" : "2")
        }
        return b
    },
    refreshRows: function () {
        var b = (this.mode == Listview.MODE_DIV ? this.mainContainer : this.tbody);
        $WH.ee(b);
        if (this.nRowsVisible == 0) {
            if (!this.filtered) {
                this.bandTop.style.display = this.bandBot.style.display = "none";
                this.mainContainer.style.display = "none"
            }
            this.noData.style.display = "";
            this.showNoData();
            return
        }
        var o, c, d;
        if (!(this.hideBands & 1)) {
            this.bandTop.style.display = ""
        }
        if (!(this.hideBands & 2)) {
            this.bandBot.style.display = ""
        }
        if (this.nDaysPerMonth && this.nDaysPerMonth.length) {
            o = 0;
            for (var g = 0; g < this.rowOffset; ++g) {
                o += this.nDaysPerMonth[g]
            }
            c = o + this.nDaysPerMonth[g]
        } else {
            if (this.nItemsPerPage > 0) {
                o = this.rowOffset;
                c = Math.min(o + this.nRowsVisible, o + this.nItemsPerPage);
                if (this.filtered && this.rowOffset > 0) {
                    for (var g = 0, h = 0; g < this.data.length && h < this.rowOffset; ++g) {
                        var p = this.data[g];
                        if (p.__hidden || p.__deleted) {
                            ++o
                        } else {
                            ++h
                        }
                    }
                    c += (o - this.rowOffset)
                }
            } else {
                o = 0;
                c = this.nRowsVisible
            }
        }
        var l = c - o;
        if (this.mode == Listview.MODE_DIV) {
            for (var f = 0; f < l; ++f) {
                var g = o + f,
                    p = this.data[g];
                if (!p) {
                    break
                }
                if (p.__hidden || p.__deleted) {
                    ++l;
                    continue
                }
                $WH.ae(this.mainDiv, this.getDiv(g))
            }
        } else {
            if (this.mode == Listview.MODE_TILED) {
                var e = 0,
                    m = $WH.ce("tr");
                for (var f = 0; f < l; ++f) {
                    var g = o + f,
                        p = this.data[g];
                    if (!p) {
                        break
                    }
                    if (p.__hidden || p.__deleted) {
                        ++l;
                        continue
                    }
                    $WH.ae(m, this.getCell(g));
                    if (++e == this.nItemsPerRow) {
                        $WH.ae(this.tbody, m);
                        if (f + 1 < l) {
                            m = $WH.ce("tr")
                        }
                        e = 0
                    }
                }
                if (e != 0) {
                    for (; e < 4; ++e) {
                        var n = $WH.ce("td");
                        n.className = "empty-cell";
                        $WH.ae(m, n)
                    }
                    $WH.ae(this.tbody, m)
                }
            } else {
                if (this.mode == Listview.MODE_CALENDAR) {
                    var m = $WH.ce("tr");
                    for (var g = 0; g < 7; ++g) {
                        var a = $WH.ce("th");
                        $WH.st(a, LANG.date_days[g]);
                        $WH.ae(m, a)
                    }
                    $WH.ae(this.tbody, m);
                    m = $WH.ce("tr");
                    for (var e = 0; e < this.dates[o].date.getDay(); ++e) {
                        var n = $WH.ce("td");
                        n.className = "empty-cell";
                        $WH.ae(m, n)
                    }
                    for (var f = o; f < c; ++f) {
                        $WH.ae(m, this.getEvent(f));
                        if (++e == 7) {
                            $WH.ae(this.tbody, m);
                            m = $WH.ce("tr");
                            e = 0
                        }
                    }
                    if (e != 0) {
                        for (; e < 7; ++e) {
                            var n = $WH.ce("td");
                            n.className = "empty-cell";
                            $WH.ae(m, n)
                        }
                        $WH.ae(this.tbody, m)
                    }
                } else {
                    for (var f = 0; f < l; ++f) {
                        var g = o + f,
                            p = this.data[g];
                        if (!p) {
                            break
                        }
                        if (p.__hidden || p.__deleted) {
                            ++l;
                            continue
                        }
                        $WH.ae(this.tbody, this.getRow(g))
                    }
                }
            }
        }
        this.mainContainer.style.display = "";
        this.noData.style.display = "none"
    },
    showNoData: function () {
        var b = this.noData;
        $WH.ee(b);
        var a = -1;
        if (this.onNoData) {
            a = (this.onNoData.bind(this, b))()
        }
        if (a == -1) {
            $WH.ae(this.noData, $WH.ct(this.filtered ? LANG.lvnodata2 : LANG.lvnodata))
        }
    },
    getDiv: function (a) {
        var b = this.data[a];
        if (b.__div == null || this.minPatchVersion != b.__minPatch) {
            this.createDiv(b, a)
        }
        return b.__div
    },
    createDiv: function (b, a) {
        var c = $WH.ce("div");
        b.__div = c;
        if (this.minPatchVersion) {
            b.__minPatch = this.minPatchVersion
        }(this.template.compute.bind(this, b, c, a))()
    },
    getCell: function (a) {
        var b = this.data[a];
        if (b.__td == null) {
            this.createCell(b, a)
        }
        return b.__td
    },
    createCell: function (b, a) {
        var c = $WH.ce("td");
        b.__td = c;
        (this.template.compute.bind(this, b, c, a))()
    },
    getEvent: function (a) {
        var b = this.dates[a];
        if (b.__td == null) {
            this.createEvent(b, a)
        }
        return b.__td
    },
    createEvent: function (b, a) {
        b.events = $WH.array_filter(this.data, function (e) {
            if (e.__hidden || e.__deleted) {
                return false
            }
            var f = Listview.funcBox.getEventNextDates(e.startDate, e.endDate, e.rec || 0, b.date);
            if (f[0] && f[1]) {
                f[0].setHours(0, 0, 0, 0);
                f[1].setHours(0, 0, 0, 0);
                return f[0] <= b.date && f[1] >= b.date
            }
            return false
        });
        var d = $WH.ce("td");
        b.__td = d;
        if (b.date.getFullYear() == g_serverTime.getFullYear() && b.date.getMonth() == g_serverTime.getMonth() && b.date.getDate() == g_serverTime.getDate()) {
            d.className = "calendar-today"
        }
        var c = $WH.ce("div");
        c.className = "calendar-date";
        $WH.st(c, b.date.getDate());
        $WH.ae(d, c);
        c = $WH.ce("div");
        c.className = "calendar-event";
        $WH.ae(d, c);
        (this.template.compute.bind(this, b, c, a))();
        if (this.getItemLink) {
            d.onclick = this.itemClick.bind(this, b)
        }
    },
    getRow: function (a) {
        var b = this.data[a];
        if (b.__tr == null) {
            this.createRow(b)
        }
        return b.__tr
    },
    setRow: function (a) {
        if (this.data[a.pos]) {
            this.data[a.pos] = a;
            this.data[a.pos].__tr = a.__tr;
            this.createRow(this.data[a.pos]);
            this.refreshRows()
        }
    },
    createRow: function (j) {
        var g = $WH.ce("tr");
        j.__tr = g;
        if (this.mode == Listview.MODE_CHECKBOX && (!$WH.isset("g_thottbot") || !g_thottbot)) {
            var c = $WH.ce("td");
            if (!j.__nochk) {
                c.className = "listview-cb";
                c.onclick = Listview.cbCellClick;
                var b = $WH.ce("input");
                $WH.ns(b);
                b.type = "checkbox";
                b.onclick = Listview.cbClick;
                if (j.__chk) {
                    b.checked = true
                }
                j.__cb = b;
                $WH.ae(c, b)
            }
            $WH.ae(g, c)
        }
        for (var d = 0, e = this.visibility.length; d < e; ++d) {
            var f = this.visibility[d],
                a = this.columns[f],
                c = $WH.ce("td"),
                h;
            if (a.align != null) {
                c.style.textAlign = a.align
            }
            if (a.compute) {
                h = (a.compute.bind(this, j, c, g, f))()
            } else {
                if (j[a.value] != null) {
                    h = j[a.value]
                } else {
                    h = -1
                }
            }
            if (h != -1 && h != null) {
                c.insertBefore($WH.ct(h), c.firstChild)
            }
            $WH.ae(g, c)
        }
        if (this.mode == Listview.MODE_CHECKBOX && j.__chk) {
            g.className = "checked"
        }
        if (this.getItemLink) {
            g.onclick = this.itemClick.bind(this, j)
        }
    },
    itemClick: function (d, c) {
        c = $WH.$E(c);
        var a = 0,
            b = c._target;
        while (b && a < 3) {
            if (b.nodeName == "A") {
                return
            }
            b = b.parentNode
        }
        location.href = this.getItemLink(d)
    },
    submitSearch: function (c) {
        c = $WH.$E(c);
        if (!this.onSearchSubmit || c.keyCode != 13) {
            return
        }
        for (var b = 0, a = this.data.length; b < a; ++b) {
            if (this.data[b].__hidden) {
                continue
            }(this.onSearchSubmit.bind(this, this.data[b]))()
        }
    },
    validatePage: function () {
        var c = this.nItemsPerPage,
            b = this.rowOffset,
            a = this.nRowsVisible;
        if (b < 0) {
            this.rowOffset = 0
        } else {
            if (this.mode == Listview.MODE_CALENDAR) {
                this.rowOffset = Math.min(b, this.nDaysPerMonth.length - 1)
            } else {
                this.rowOffset = this.getRowOffset(b + c > a ? a - 1 : b)
            }
        }
    },
    getRowOffset: function (b) {
        var a = this.nItemsPerPage;
        return (a > 0 && b > 0 ? Math.floor(b / a) * a : 0)
    },
    resetRowVisibility: function () {
        for (var b = 0, a = this.data.length; b < a; ++b) {
            this.data[b].__hidden = false
        }
        this.filtered = false;
        this.rowOffset = 0;
        this.nRowsVisible = this.data.length
    },
    getColText: function (c, a) {
        var b = "";
        if (this.template.getVisibleText) {
            b = $WH.trim(this.template.getVisibleText(c) + " ")
        }
        if (a.getVisibleText) {
            return b + a.getVisibleText(c)
        }
        if (a.getValue) {
            return b + a.getValue(c)
        }
        if (a.value) {
            return b + c[a.value]
        }
        if (a.compute) {
            return b + a.compute(c)
        }
        return ""
    },
    resetFilters: function () {
        for (var d = 0, a = this.visibility.length; d < a; ++d) {
            var c = this.visibility[d];
            var b = this.columns[c];
            if (b.__filter) {
                b.__th.firstChild.firstChild.className = "";
                b.__filter = null;
                --(this.nFilters)
            }
        }
    },
    updateFilters: function (d) {
        $WH.Tooltip.hide();
        this.resetRowVisibility();
        var z, q, c;
        if (this.searchable) {
            this.quickSearchBox.parentNode.style.display = "";
            z = $WH.trim(this.quickSearchBox.value);
            if (z) {
                this.quickSearchGlass.style.display = "none";
                this.quickSearchClear.style.display = "";
                z = z.toLowerCase().replace(/\s+/g, " ");
                q = z.split(" ");
                c = q.length
            } else {
                this.quickSearchGlass.style.display = "";
                this.quickSearchClear.style.display = "none"
            }
        } else {
            if (this.quickSearchBox) {
                this.quickSearchBox.parentNode.style.display = "none"
            }
        }
        if (!z && this.nFilters == 0 && this.customFilter == null) {
            if (d) {
                this.updateNav();
                this.refreshRows()
            }
            return
        }
        var C = {
            1: function (i, j) {
                return i > j
            },
            2: function (i, j) {
                return i == j
            },
            3: function (i, j) {
                return i < j
            },
            4: function (i, j) {
                return i >= j
            },
            5: function (i, j) {
                return i <= j
            },
            6: function (i, k, j) {
                return k <= i && i <= j
            }
        };
        var p = {
            1: function (j, i, k) {
                return i > k
            },
            2: function (j, i, k) {
                return j <= k && k <= i
            },
            3: function (j, i, k) {
                return j < k
            },
            4: function (j, i, k) {
                return i >= k
            },
            5: function (j, i, k) {
                return j <= k
            },
            6: function (j, i, E, k) {
                return E <= i && j <= k
            }
        };
        var o = 0;
        for (var v = 0, w = this.data.length; v < w; ++v) {
            var g = this.data[v],
                m = 0;
            nSearchMatches = 0, matches = [];
            g.__hidden = true;
            if (this.customFilter && !this.customFilter(g, v)) {
                continue
            }
            for (var u = 0, h = this.visibility.length; u < h; ++u) {
                var n = this.visibility[u];
                var e = this.columns[n];
                if (e.__filter) {
                    var a = e.__filter,
                        b = false;
                    if (e.type != null && e.type == "range") {
                        var D = e.getMinValue(g),
                            B = e.getMaxValue(g);
                        b = (p[a.type])(D, B, a.value, a.value2)
                    } else {
                        if (e.type == null || e.type == "num" || a.type > 0) {
                            var r = null;
                            if (e.getValue) {
                                r = e.getValue(g)
                            } else {
                                if (e.value) {
                                    r = parseFloat(g[e.value])
                                }
                            }
                            if (!r) {
                                r = 0
                            }
                            b = (C[a.type])(r, a.value, a.value2)
                        } else {
                            var l = this.getColText(g, e);
                            if (l) {
                                l = l.toString().toLowerCase();
                                if (a.invert) {
                                    b = l.match(a.regex) != null
                                } else {
                                    var A = 0;
                                    for (var t = 0, f = a.words.length; t < f; ++t) {
                                        if (l.indexOf(a.words[t]) != -1) {
                                            ++A
                                        } else {
                                            break
                                        }
                                    }
                                    b = (A == a.words.length)
                                }
                            }
                        }
                    }
                    if (a.invert) {
                        b = !b
                    }
                    if (b) {
                        ++m
                    } else {
                        break
                    }
                }
                if (z) {
                    var l = this.getColText(g, e);
                    if (l) {
                        l = l.toString().toLowerCase();
                        for (var t = 0, f = q.length; t < f; ++t) {
                            if (!matches[t]) {
                                if (l.indexOf(q[t]) != -1) {
                                    matches[t] = 1;
                                    ++nSearchMatches
                                }
                            }
                        }
                    }
                }
            }
            if (g.__alwaysvisible || ((this.nFilters == 0 || m == this.nFilters) && (!z || nSearchMatches == c))) {
                g.__hidden = false;
                ++o
            }
        }
        this.filtered = (o < this.data.length);
        this.nRowsVisible = o;
        if (d) {
            this.updateNav();
            this.refreshRows()
        }
    },
    changePage: function () {
        this.validatePage();
        this.refreshRows();
        this.updateNav();
        this.updatePound();
        var a = $WH.g_getScroll(),
            b = $WH.ac(this.container);
        if (a.y > b[1]) {
            scrollTo(a.x, b[1])
        }
    },
    firstPage: function () {
        this.rowOffset = 0;
        this.changePage();
        return false
    },
    previousPage: function () {
        this.rowOffset -= this.nItemsPerPage;
        this.changePage();
        return false
    },
    nextPage: function () {
        this.rowOffset += this.nItemsPerPage;
        this.changePage();
        return false
    },
    lastPage: function () {
        this.rowOffset = 99999999;
        this.changePage();
        return false
    },
    addSort: function (a, c) {
        var b = $WH.in_array(a, Math.abs(c), function (d) {
            return Math.abs(d)
        });
        if (b != -1) {
            c = a[b];
            a.splice(b, 1)
        }
        a.splice(0, 0, c)
    },
    sortBy: function (a) {
        if (a <= 0 || a > this.columns.length) {
            return
        }
        if (Math.abs(this.sort[0]) == a) {
            this.sort[0] = -this.sort[0]
        } else {
            var b = -1;
            if (this.columns[a - 1].type == "text") {
                b = 1
            }
            this.addSort(this.sort, b * a)
        }
        this.applySort();
        this.refreshRows();
        this.updateSortArrow();
        this.updatePound()
    },
    applySort: function () {
        if (this.sort.length == 0) {
            return
        }
        Listview.sort = this.sort;
        Listview.columns = this.columns;
        if (this.indexCreated) {
            this.data.sort(Listview.sortIndexedRows.bind(this))
        } else {
            this.data.sort(Listview.sortRows.bind(this))
        }
        this.updateSortIndex()
    },
    setSort: function (b, c, a) {
        if (this.sort.toString() != b.toString()) {
            this.sort = b;
            this.applySort();
            if (c) {
                this.refreshRows()
            }
            if (a) {
                this.updatePound()
            }
        }
    },
    readPound: function () {
        if (!this.poundable || !location.hash.length) {
            return false
        }
        var b = location.hash.substr(1);
        if (this.tabs) {
            var g = b.lastIndexOf(":");
            if (g == -1) {
                return false
            }
            b = b.substr(g + 1)
        }
        var a = parseInt(b);
        if (!isNaN(a)) {
            this.rowOffset = a;
            this.validatePage();
            if (this.poundable != 2) {
                var d = [];
                var f = b.match(/(\+|\-)[0-9]+/g);
                if (f != null) {
                    for (var c = f.length - 1; c >= 0; --c) {
                        var e = parseInt(f[c]) | 0;
                        var b = Math.abs(e);
                        if (b <= 0 || b > this.columns.length) {
                            break
                        }
                        this.addSort(d, e)
                    }
                    this.setSort(d, false, false)
                }
            }
            if (this.tabs) {
                this.tabs.setTabPound(this.tabIndex, this.getTabPound())
            }
        }
    },
    updateSortArrow: function () {
        if (!this.sort.length || !this.thead || this.mode == Listview.MODE_TILED || this.mode == Listview.MODE_CALENDAR) {
            return
        }
        var a = $WH.in_array(this.visibility, Math.abs(this.sort[0]) - 1);
        if (a == -1) {
            return
        }
        if (this.mode == Listview.MODE_CHECKBOX && a < this.thead.firstChild.childNodes.length - 1) {
            a += 1
        }
        var b = this.thead.firstChild.childNodes[a].firstChild.firstChild.firstChild;
        if (this.lsa && this.lsa != b) {
            this.lsa.className = ""
        }
        b.className = (this.sort[0] < 0 ? "sortdesc" : "sortasc");
        this.lsa = b
    },
    updateSortIndex: function () {
        var b = this.data;
        for (var c = 0, a = b.length; c < a; ++c) {
            b[c].__si = c
        }
        this.indexCreated = true
    },
    updateTabName: function () {
        if (this.tabs && this.tabIndex != null) {
            this.tabs.setTabName(this.tabIndex, this.getTabName())
        }
    },
    updatePound: function (a) {
        if (!this.poundable) {
            return
        }
        var b = "",
            d = "";
        if (a) {
            if (location.hash.length && this.tabs) {
                var c = location.hash.lastIndexOf(":");
                if (c != -1 && !isNaN(parseInt(location.hash.substr(c + 1)))) {
                    b = location.hash.substr(c + 1)
                }
            }
        } else {
            b = this.getTabPound()
        }
        if (this.customPound) {
            d = this.customPound
        } else {
            if (this.tabs) {
                d = this.id
            }
        }
        if (b && this.tabs) {
            this.tabs.setTabPound(this.tabIndex, b)
        }
        location.replace("#" + d + (d && b ? ":" : "") + b)
    },
    updateNav: function () {
        var f = [this.navTop, this.navBot],
            k = this.nItemsPerPage,
            j = this.rowOffset,
            e = this.nRowsVisible,
            h = 0,
            b = 0,
            g = 0,
            l = 0,
            c = new Date();
        if (e > 0) {
            if (!(this.hideNav & 1)) {
                f[0].style.display = ""
            }
            if (!(this.hideNav & 2)) {
                f[1].style.display = ""
            }
        } else {
            f[0].style.display = f[1].style.display = "none"
        }
        if (this.mode == Listview.MODE_CALENDAR) {
            for (var d = 0; d < this.nDaysPerMonth.length; ++d) {
                if (d == j) {
                    if (d > 0) {
                        b = 1
                    }
                    if (d > 1) {
                        h = 1
                    }
                    if (d < this.nDaysPerMonth.length - 1) {
                        g = 1
                    }
                    if (d < this.nDaysPerMonth.length - 2) {
                        l = 1
                    }
                }
            }
            c.setTime(this.startOnMonth.valueOf());
            c.setMonth(c.getMonth() + j)
        } else {
            if (k) {
                if (j > 0) {
                    b = 1;
                    if (j >= k + k) {
                        h = 1
                    }
                }
                if (j + k < e) {
                    g = 1;
                    if (j + k + k < e) {
                        l = 1
                    }
                }
            }
        }
        for (var d = 0; d < 2; ++d) {
            var a = f[d].childNodes;
            a[0].style.display = (h ? "" : "none");
            a[1].style.display = (b ? "" : "none");
            a[3].style.display = (g ? "" : "none");
            a[4].style.display = (l ? "" : "none");
            a = a[2].childNodes;
            if (this.mode == Listview.MODE_CALENDAR) {
                a[0].firstChild.nodeValue = LANG.date_months[c.getMonth()] + " " + c.getFullYear()
            } else {
                a[0].firstChild.nodeValue = j + 1;
                a[2].firstChild.nodeValue = k ? Math.min(j + k, e) : e;
                a[4].firstChild.nodeValue = e
            }
        }
    },
    getTabName: function () {
        var b = this.name,
            d = this.data.length;
        for (var c = 0, a = this.data.length; c < a; ++c) {
            if (this.data[c].__hidden || this.data[c].__deleted) {
                --d
            }
        }
        if (d > 0 && !this.hideCount) {
            b += $WH.sprintf(LANG.qty, d)
        }
        return b
    },
    getTabPound: function () {
        var a = "";
        a += this.rowOffset;
        if (this.poundable != 2 && this.sort.length) {
            a += ("+" + this.sort.join("+")).replace(/\+\-/g, "-")
        }
        return a
    },
    getCheckedRows: function () {
        var d = [];
        for (var c = 0, a = this.data.length; c < a; ++c) {
            var b = this.data[c];
            if ((b.__cb && b.__cb.checked) || (!b.__cb && b.__chk)) {
                d.push(b)
            }
        }
        return d
    },
    resetCheckedRows: function () {
        for (var c = 0, a = this.data.length; c < a; ++c) {
            var b = this.data[c];
            if (b.__cb) {
                b.__cb.checked = false
            } else {
                if (b.__chk) {
                    b.__chk = null
                }
            }
            if (b.__tr) {
                b.__tr.className = b.__tr.className.replace("checked", "")
            }
        }
    },
    deleteRows: function (c) {
        if (!c || !c.length) {
            return
        }
        for (var b = 0, a = c.length; b < a; ++b) {
            var d = c[b];
            if (!d.__hidden && !d.__hidden) {
                this.nRowsVisible -= 1
            }
            d.__deleted = true
        }
        this.updateTabName();
        if (this.rowOffset >= this.nRowsVisible) {
            this.previousPage()
        } else {
            this.refreshRows();
            this.updateNav()
        }
    },
    setData: function (a) {
        this.data = a;
        this.indexCreated = false;
        this.resetCheckedRows();
        this.resetRowVisibility();
        if (this.tabs) {
            this.pounded = (this.tabs.poundedTab == this.tabIndex);
            if (this.pounded) {
                this.readPound()
            }
        } else {
            this.readPound()
        }
        this.applySort();
        this.updateSortArrow();
        if (this.customFilter != null) {
            this.updateFilters()
        }
        this.updateNav();
        this.refreshRows()
    },
    getClipDiv: function () {
        return this.clipDiv
    },
    getNoteTopDiv: function () {
        return this.noteTop
    },
    focusSearch: function () {
        this.quickSearchBox.focus()
    },
    clearSearch: function () {
        this.quickSearchBox.value = ""
    },
    getList: function () {
        if (!this.debug) {
            return
        }
        var b = "";
        for (var a = 0; a < this.data.length; a++) {
            if (!this.data[a].__hidden) {
                b += this.data[a].id + ", "
            }
        }
        listviewIdList.show(b)
    },
    createIndicator: function (a, d, e) {
        if (!this.noteIndicators) {
            this.noteIndicators = $WH.ce("div");
            this.noteIndicators.className = "listview-indicators";
            $(this.noteIndicators).insertBefore($(this.noteTop))
        }
        var b = this.tabClick;
        $(this.noteIndicators).append($('<span class="indicator"></span>').html(a).append(!d ? "" : $('<a class="indicator-x" style="outline: none">[x]</a>').attr("href", (typeof d == "function" ? "javascript:;" : d)).click(function () {
            if (b) {
                b()
            }
            if (typeof d == "function") {
                d()
            }
        })).css("cursor", (typeof e == "function" ? "pointer" : null)).click(function () {
            if (b) {
                b()
            }
            if (typeof e == "function") {
                e()
            }
        }));
        $(this.noteTop).css("padding-top", "7px")
    },
    removeIndicators: function () {
        if (this.noteIndicators) {
            $(this.noteIndicators).remove();
            this.noteIndicators = null
        }
        $(this.noteTop).css("padding-top", "")
    }
};
Listview.sortRows = function (e, d) {
    var j = Listview.sort,
        k = Listview.columns;
    for (var h = 0, c = j.length; h < c; ++h) {
        var g, f = k[Math.abs(j[h]) - 1];
        if (!f) {
            f = this.template
        }
        if (f.sortFunc) {
            g = f.sortFunc(e, d, j[h])
        } else {
            g = $WH.strcmp(e[f.value], d[f.value])
        }
        if (g != 0) {
            return g * j[h]
        }
    }
    return 0
}, Listview.sortIndexedRows = function (d, c) {
    var g = Listview.sort,
        h = Listview.columns,
        e = h[Math.abs(g[0]) - 1],
        f;
    if (!e) {
        e = this.template
    }
    if (e.sortFunc) {
        f = e.sortFunc(d, c, g[0])
    } else {
        f = $WH.strcmp(d[e.value], c[e.value])
    }
    if (f != 0) {
        return f * g[0]
    }
    return (d.__si - c.__si)
}, Listview.cbSelect = function (c) {
    for (var e = 0, b = this.data.length; e < b; ++e) {
        var d = this.data[e];
        var g = c;
        if (d.__hidden) {
            continue
        }
        if (!d.__nochk && d.__cb) {
            var a = d.__cb,
                f = a.parentNode.parentNode;
            if (g == null) {
                g = !a.checked
            }
            if (a.checked != g) {
                a.checked = g;
                f.className = (a.checked ? f.className + " checked" : f.className.replace("checked", ""))
            }
        } else {
            if (g == null) {
                g = true
            }
        }
        d.__chk = g
    }
};
Listview.cbClick = function (a) {
    setTimeout(Listview.cbUpdate.bind(0, 0, this, this.parentNode.parentNode), 1);
    $WH.sp(a)
};
Listview.cbCellClick = function (a) {
    setTimeout(Listview.cbUpdate.bind(0, 1, this.firstChild, this.parentNode), 1);
    $WH.sp(a)
};
Listview.cbUpdate = function (c, a, b) {
    if (c) {
        a.checked = !a.checked
    }
    b.className = (a.checked ? b.className + " checked" : b.className.replace("checked", ""))
};
Listview.headerClick = function (a, b, c) {
    c = $WH.$E(c);
    if (this.tabClick) {
        this.tabClick()
    }
    if (c._button == 3 || c.shiftKey || c.ctrlKey) {
        $WH.Tooltip.hide();
        setTimeout(Listview.headerFilter.bind(this, a, null), 1)
    } else {
        this.sortBy(b + 1)
    }
    return false
};
Listview.headerFilter = function (c, f) {
    var j = "";
    if (c.__filter) {
        if (c.__filter.invert) {
            j += "!"
        }
        j += c.__filter.text
    }
    if (f == null) {
        var f = prompt($WH.sprintf(LANG.prompt_colfilter1 + (c.type == "text" ? LANG.prompt_colfilter2 : LANG.prompt_colfilter3), c.name), j)
    }
    if (f != null) {
        var e = {
            text: "",
            type: -1
        };
        f = $WH.trim(f.replace(/\s+/g, " "));
        if (!f && this.onEmptyFilter) {
            this.onEmptyFilter(c)
        } else {
            if (f) {
                if (f.charAt(0) == "!" || f.charAt(0) == "-") {
                    e.invert = 1;
                    f = f.substr(1)
                }
                if (c.type == "text") {
                    e.type = 0;
                    e.text = f;
                    if (e.invert) {
                        e.regex = g_createOrRegex(f)
                    } else {
                        e.words = f.toLowerCase().split(" ")
                    }
                }
                var i, b;
                if (f.match(/(>|=|<|>=|<=)\s*([0-9\.]+)/)) {
                    i = parseFloat(RegExp.$2);
                    if (!isNaN(i)) {
                        switch (RegExp.$1) {
                        case ">":
                            e.type = 1;
                            break;
                        case "=":
                            e.type = 2;
                            break;
                        case "<":
                            e.type = 3;
                            break;
                        case ">=":
                            e.type = 4;
                            break;
                        case "<=":
                            e.type = 5;
                            break
                        }
                        e.value = i;
                        e.text = RegExp.$1 + " " + i
                    }
                } else {
                    if (f.match(/([0-9\.]+)\s*\-\s*([0-9\.]+)/)) {
                        i = parseFloat(RegExp.$1);
                        b = parseFloat(RegExp.$2);
                        if (!isNaN(i) && !isNaN(b)) {
                            if (i > b) {
                                var g = i;
                                i = b;
                                b = g
                            }
                            if (i == b) {
                                e.type = 2;
                                e.value = i;
                                e.text = "= " + i
                            } else {
                                e.type = 6;
                                e.value = i;
                                e.value2 = b;
                                e.text = i + " - " + b
                            }
                        }
                    } else {
                        var d = f.toLowerCase().split(" ");
                        if (!c.allText && d.length == 1 && !isNaN(i = parseFloat(d[0]))) {
                            e.type = 2;
                            e.value = i;
                            e.text = "= " + i
                        } else {
                            if (c.type == "text") {
                                e.type = 0;
                                e.text = f;
                                if (e.invert) {
                                    e.regex = g_createOrRegex(f)
                                } else {
                                    e.words = d
                                }
                            }
                        }
                    }
                }
                if (e.type == -1) {
                    alert(LANG.message_invalidfilter);
                    return
                }
            }
        }
        if (!c.__filter || e.text != c.__filter.text || e.invert != c.__filter.invert) {
            var h = c.__th.firstChild.firstChild;
            if (f && e.text) {
                if (!c.__filter) {
                    h.className = "q5";
                    ++(this.nFilters)
                }
                c.__filter = e
            } else {
                if (c.__filter) {
                    h.className = "";
                    --(this.nFilters)
                }
                c.__filter = null
            }
            this.updateFilters(1)
        }
    }
};
Listview.headerOver = function (b, c, f) {
    var d = "";
    if ($WH.isset("g_thottbot") && g_thottbot) {
        d += '<b class="w">' + (c.tooltip ? c.tooltip : c.name) + "</b>"
    } else {
        d += '<b class="q1">' + (c.tooltip ? c.tooltip : c.name) + "</b>"
    }
    if (c.__filter) {
        d += "<br />" + $WH.sprintf((c.__filter.invert ? LANG.tooltip_colfilter2 : LANG.tooltip_colfilter1), c.__filter.text)
    }
    d += '<br /><span class="q2">' + LANG.tooltip_lvheader1 + "</span>";
    if (this.filtrable && (c.filtrable == null || c.filtrable)) {
        d += '<br /><span class="q2">' + ($WH.Browser.opera ? LANG.tooltip_lvheader3 : LANG.tooltip_lvheader2) + "</span>"
    }
    $WH.Tooltip.show(b, d, 0, 0, "q")
};
Listview.extraCols = {
    id: {
        id: "id",
        name: "ID",
        width: "5%",
        compute: function (a, b) {
            if (a.id) {
                $WH.ae(b, $WH.ct(a.id))
            }
        }
    },
    patch: {
        id: "obj-patch",
        name: LANG.patch,
        compute: function (e, g) {
            if (typeof e.patch != "undefined") {
                var a = parseInt(e.patch);
                if (a == 0 || a == -1) {
                    $WH.ae(g, $WH.ct("???"))
                } else {
                    var b = Math.floor(a / 10000);
                    var d = Math.floor(a / 100) % 100;
                    var f = a % 100;
                    var c = $WH.sprintf("$1.$2.$3", b, d, f);
                    $WH.ae(g, $WH.ct(c))
                }
            }
        },
        sortFunc: function (d, c, e) {
            if (d.patch == c.patch) {
                return 0
            } else {
                if (d.patch < c.patch) {
                    return -1
                } else {
                    return 1
                }
            }
        }
    },
    date: {
        id: "obj-date",
        name: LANG.added,
        compute: function (c, d) {
            if (c.date) {
                if (c.date <= 86400) {
                    $WH.ae(d, $WH.ct("???"))
                } else {
                    var a = new Date(c.date * 1000);
                    var b = (g_serverTime - a) / 1000;
                    return g_formatDate(d, b, a, null, true)
                }
            }
        },
        sortFunc: function (d, c, e) {
            if (d.date == c.date) {
                return 0
            } else {
                if (d.date < c.date) {
                    return -1
                } else {
                    return 1
                }
            }
        }
    },
    cost: {
        id: "cost",
        name: LANG.cost,
        getValue: function (a) {
            if (a.cost) {
                return (a.cost[2] && a.cost[2][0] ? a.cost[2][0][1] : 0) || (a.cost[1] && a.cost[1][0] ? a.cost[1][0][1] : 0) || a.cost[0]
            }
        },
        compute: function (f, g) {
            if (f.cost) {
                var d = f.cost[0];
                var c = null;
                var b = f.cost[2];
                var a = f.cost[1];
                var e = 0;
                if (f.side != null) {
                    c = f.side
                } else {
                    if (f.react != null) {
                        if (f.react[0] == 1 && f.react[1] == -1) {
                            c = 1
                        } else {
                            if (f.react[0] == -1 && f.react[1] == 1) {
                                c = 2
                            }
                        }
                    }
                }
                Listview.funcBox.appendMoney(g, d, c, b, a, e)
            }
        },
        sortFunc: function (d, c, e) {
            if (d.cost == null) {
                return -1
            } else {
                if (c.cost == null) {
                    return 1
                }
            }
            var i = 0,
                h = 0,
                g = 0,
                f = 0;
            if (d.cost[2] != null) {
                $WH.array_walk(d.cost[2], function (a, b, k, j) {
                    i += Math.pow(10, j) + a[1]
                })
            }
            if (c.cost[2] != null) {
                $WH.array_walk(c.cost[2], function (a, b, k, j) {
                    h += Math.pow(10, j) + a[1]
                })
            }
            if (d.cost[1] != null) {
                $WH.array_walk(d.cost[1], function (a, b, k, j) {
                    g += Math.pow(10, j) + a[1]
                })
            }
            if (c.cost[1] != null) {
                $WH.array_walk(c.cost[1], function (a, b, k, j) {
                    f += Math.pow(10, j) + a[1]
                })
            }
            return $WH.strcmp(i, h) || $WH.strcmp(g, f) || $WH.strcmp(d.cost[0], c.cost[0])
        }
    },
    count: {
        id: "count",
        name: LANG.count,
        value: "count",
        compute: function (b, c) {
            if (!(this._totalCount > 0 || b.outof > 0)) {
                return
            }
            if (b.outof) {
                var a = $WH.ce("div");
                a.className = "small q0";
                $WH.ae(a, $WH.ct($WH.sprintf(LANG.lvdrop_outof, b.outof)));
                $WH.ae(c, a)
            }
            return b.count
        },
        getVisibleText: function (a) {
            var b = a.count;
            if (a.outof) {
                b += " " + a.outof
            }
            return b
        },
        sortFunc: function (d, c, e) {
            if (d.count == null) {
                return -1
            } else {
                if (c.count == null) {
                    return 1
                }
            }
            return $WH.strcmp(d.count, c.count)
        }
    },
    percent: {
        id: "percent",
        name: "%",
        value: "percent",
        compute: function (row, td) {
            if (row.count <= 0) {
                return "??"
            }
            if (row.pctstack) {
                var text = "";
                var data = eval("(" + row.pctstack + ")");
                for (var amt in data) {
                    var pct = (data[amt] * row.percent) / 100;
                    if (pct >= 1.95) {
                        pct = parseFloat(pct.toFixed(0))
                    } else {
                        if (pct >= 0.195) {
                            pct = parseFloat(pct.toFixed(1))
                        } else {
                            pct = parseFloat(pct.toFixed(2))
                        }
                    }
                    text += $WH.sprintf(LANG.stackof_format, amt, pct) + "<br />"
                }
                $(td).addClass("tip").mouseover(function (event) {
                    $WH.Tooltip.showAtCursor(event, text, 0, 0, "q")
                }).mousemove(function (event) {
                    $WH.Tooltip.cursorUpdate(event)
                }).mouseout(function () {
                    $WH.Tooltip.hide()
                })
            }
            var value = parseFloat(row.percent.toFixed(row.percent >= 1.95 ? 0 : (row.percent >= 0.195 ? 1 : 2)));
            if (row.pctstack) {
                $(td).append($("<span>").addClass("tip").text(value))
            } else {
                return value
            }
        },
        getVisibleText: function (a) {
            if (a.count <= 0) {
                return "??"
            }
            if (a.percent >= 1.95) {
                return a.percent.toFixed(0)
            } else {
                if (a.percent >= 0.195) {
                    return parseFloat(a.percent.toFixed(1))
                } else {
                    return parseFloat(a.percent.toFixed(2))
                }
            }
        },
        sortFunc: function (e, c, f) {
            if (e.count == null) {
                return -1
            } else {
                if (c.count == null) {
                    return 1
                }
            }
            if (e.percent >= 1.95) {
                var d = e.percent.toFixed(0)
            } else {
                if (e.percent >= 0.195) {
                    d = parseFloat(e.percent.toFixed(1))
                } else {
                    d = parseFloat(e.percent.toFixed(2))
                }
            }
            if (c.percent >= 1.95) {
                var g = c.percent.toFixed(0)
            } else {
                if (c.percent >= 0.195) {
                    g = parseFloat(c.percent.toFixed(1))
                } else {
                    g = parseFloat(c.percent.toFixed(2))
                }
            }
            return $WH.strcmp(d, g)
        }
    },
    stock: {
        id: "stock",
        name: LANG.stock,
        width: "10%",
        value: "stock",
        compute: function (a, b) {
            if (a.stock > 0) {
                return a.stock
            } else {
                b.style.fontFamily = "Verdana, sans-serif";
                return String.fromCharCode(8734)
            }
        },
        getVisibleText: function (a) {
            if (a.stock > 0) {
                return a.stock
            } else {
                return String.fromCharCode(8734) + " infinity"
            }
        }
    },
    currency: {
        id: "currency",
        name: LANG.currency,
        getValue: function (a) {
            if (a.currency) {
                return (a.currency[0] ? a.currency[0][1] : 0)
            }
        },
        compute: function (b, c) {
            if (b.currency) {
                var a = null;
                if (b.side != null) {
                    a = b.side
                } else {
                    if (b.react != null) {
                        if (b.react[0] == 1 && b.react[1] == -1) {
                            a = 1
                        } else {
                            if (b.react[0] == -1 && b.react[1] == 1) {
                                a = 2
                            }
                        }
                    }
                }
                Listview.funcBox.appendMoney(c, null, a, null, b.currency)
            }
        },
        sortFunc: function (d, c, e) {
            if (d.currency == null) {
                return -1
            } else {
                if (c.currency == null) {
                    return 1
                }
            }
            var g = 0,
                f = 0;
            $WH.array_walk(d.currency, function (a, b, j, h) {
                g += Math.pow(10, h) + a[1]
            });
            $WH.array_walk(c.currency, function (a, b, j, h) {
                f += Math.pow(10, h) + a[1]
            });
            return $WH.strcmp(g, f)
        }
    },
    mode: {
        id: "mode",
        name: "Mode",
        after: "name",
        type: "text",
        compute: function (a, b) {
            if (a.modes && a.modes.mode) {
                if ((a.modes.mode & 120) == 120 || (a.modes.mode & 3) == 3) {
                    return LANG.pr_note_all
                }
                return Listview.extraCols.mode.getVisibleText(a)
            }
        },
        getVisibleText: function (f) {
            var a = !! (f.modes.mode & 26);
            var g = !! (f.modes.mode & 97);
            var e = !! (f.modes.mode & 40);
            var b = !! (f.modes.mode & 80);
            var d;
            if (e && !b) {
                d = 10
            } else {
                if (b && !e) {
                    d = 25
                }
            }
            var c;
            if (a && !g) {
                c = "normal"
            } else {
                if (g && !a) {
                    c = "heroic"
                }
            }
            if (c) {
                if (d) {
                    return $WH.sprintf(LANG["tab_" + c + "X"], d)
                } else {
                    return LANG["tab_" + c]
                }
            }
            if (d) {
                return $WH.sprintf(LANG.lvzone_xman, d)
            }
            return LANG.pr_note_all
        },
        sortFunc: function (d, c, e) {
            if (d.modes && c.modes) {
                return -$WH.strcmp(d.modes.mode, c.modes.mode)
            }
        }
    },
    requires: {
        id: "requires",
        name: LANG.requires,
        type: "text",
        compute: function (c, d) {
            if (c.achievement && g_achievements[c.achievement]) {
                $WH.nw(d);
                d.className = "small";
                d.style.lineHeight = "18px";
                var b = $WH.ce("a");
                b.href = wowheadUrl + "/achievement=" + c.achievement;
                b.className = "icontiny";
                b.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + g_achievements[c.achievement].icon.toLowerCase() + ".gif)";
                b.style.whiteSpace = "nowrap";
                $WH.st(b, g_achievements[c.achievement]["name_" + Locale.getName()]);
                $WH.ae(d, b)
            }
        },
        getVisibleText: function (a) {
            if (a.achievement && g_achievements[a.achievement]) {
                return g_achievements[a.achievement].name
            }
        },
        sortFunc: function (d, c, e) {
            return $WH.strcmp(this.getVisibleText(d), this.getVisibleText(c))
        }
    },
    reqskill: {
        id: "reqskill",
        name: LANG.skill,
        width: "10%",
        value: "reqskill",
        before: "yield"
    },
    yield: {
        id: "yield",
        name: LANG.yields,
        type: "text",
        align: "left",
        span: 2,
        value: "name",
        compute: function (e, g, d) {
            if (e.yield && g_items[e.yield]) {
                var c = $WH.ce("td");
                c.style.width = "1px";
                c.style.padding = "0";
                c.style.borderRight = "none";
                $WH.ae(c, g_items.createIcon(e.yield, 1));
                $WH.ae(d, c);
                g.style.borderLeft = "none";
                var f = $WH.ce("div");
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = wowheadUrl + "/item=" + e.yield;
                b.className = "q" + g_items[e.yield].quality;
                $WH.ae(b, $WH.ct(g_items[e.yield]["name_" + Locale.getName()]));
                $WH.ae(f, b);
                $WH.ae(g, f)
            }
        },
        getVisibleText: function (a) {
            if (a.yield && g_items[a.yield]) {
                return g_items[a.yield]["name_" + Locale.getName()]
            }
        },
        sortFunc: function (d, c, e) {
            if (!d.yield || !g_items[d.yield] || !c.yield || !g_items[c.yield]) {
                return (d.yield && g_items[d.yield] ? 1 : (c.yield && g_items[c.yield] ? -1 : 0))
            }
            return -$WH.strcmp(g_items[d.yield].quality, g_items[c.yield].quality) || $WH.strcmp(g_items[d.yield]["name_" + Locale.getName()], g_items[c.yield]["name_" + Locale.getName()])
        }
    }
};
Listview.funcBox = {
    createSimpleCol: function (c, d, a, b) {
        return {
            id: c,
            name: (LANG[d] !== undefined ? LANG[d] : d),
            width: a,
            value: b
        }
    },
    initLootTable: function (b) {
        var a;
        if (this._totalCount != null) {
            a = this._totalCount
        } else {
            a = b.outof
        }
        if (a == 0) {
            if (b.count != -1) {
                b.percent = b.count
            } else {
                b.percent = 0
            }
        } else {
            b.percent = b.count / a * 100
        }(Listview.funcBox.initModeFilter.bind(this, b))()
    },
    initModeFilter: function (b) {
        if (this._lootModes == null) {
            this._lootModes = {
                99: 0
            }
        }
        if (this._distinctModes == null) {
            this._distinctModes = {
                99: 0
            }
        }
        if ((!b.modes || b.modes.mode == 4) && b.classs != 12 && b.percent < 1) {
            this._lootModes[99]++;
            this._distinctModes[99]++
        } else {
            if (b.modes) {
                for (var a = -2; a <= 4; ++a) {
                    if (this._lootModes[a] == null) {
                        this._lootModes[a] = 0
                    }
                    if (b.modes.mode & 1 << parseInt(a) + 2) {
                        this._lootModes[a]++
                    }
                }
                if (this._distinctModes[b.modes.mode] == null) {
                    this._distinctModes[b.modes.mode] = 0
                }
                this._distinctModes[b.modes.mode]++
            }
        }
    },
    addModeIndicator: function () {
        var b = 0;
        for (var l in this._distinctModes) {
            if (this._distinctModes[l]) {
                b++
            }
        }
        if (b < 2) {
            return
        }
        var e = location.hash.match(/:mode=([^:]+)/),
            d = [0, -1, -2, 1, 3, 2, 4, 99],
            o = {
                "-2": LANG.tab_heroic,
                "-1": LANG.tab_normal,
                0: LANG.tab_noteworthy,
                1: $WH.sprintf(LANG.tab_normalX, 10),
                2: $WH.sprintf(LANG.tab_normalX, 25),
                3: $WH.sprintf(LANG.tab_heroicX, 10),
                4: $WH.sprintf(LANG.tab_heroicX, 25),
                99: ""
            };
        var n = function (i, f, a) {
                g_setSelectedLink(this, "lootmode");
                g.customPound = g.id + (f != null ? ":mode=" + g_urlize(o[f].replace(" ", "")) : "");
                g.customFilter = function (j) {
                    return Listview.funcBox.filterMode(j, g._totalCount, i)
                };
                g.updateFilters(1);
                g.applySort();
                g.refreshRows();
                if (a) {
                    g.updatePound(1)
                }
            };
        var g = this,
            c = [],
            p;
        p = $("<a><span>" + LANG.pr_note_all + "</span></a>");
        p[0].f = n.bind(p[0], null, null, 1);
        p.click(p[0].f);
        var k = n.bind(p[0], null, null, 0);
        k();
        c.push($('<span class="indicator-mode"></span>').append(p).append($("<b>" + LANG.pr_note_all + "</b>")));
        for (var h = 0, m = d.length; h < m; ++h) {
            var l = d[h];
            if (!this._lootModes[l]) {
                continue
            }
            p = $("<a><span>" + o[l] + "</span> (" + this._lootModes[l] + ")</a>");
            p[0].f = n.bind(p[0], 1 << l + 2, l, 1);
            p.click(p[0].f);
            if (l == 0) {
                k = n.bind(p[0], 1 << l + 2, l, 0)
            }
            if (l < -1 || l > 2) {
                p.addClass("icon-heroic")
            }
            c.push($('<span class="indicator-mode"></span>').append(p).append($("<b" + (l < -1 || l > 2 ? ' class="icon-heroic"' : "") + ">" + o[l] + " (" + this._lootModes[l] + ")</b>")));
            if (e && e[1] == g_urlize(o[l].replace(" ", ""))) {
                (p[0].f)()
            }
        }
        var q = false;
        for (var l = 0, m = c.length; l < m; ++l) {
            p = $("a", c[l]);
            if (!$("span", p).html() && c.length == 3) {
                q = true
            } else {
                this.createIndicator(c[l], null, p[0].f)
            }
        }
        if (q) {
            k()
        }
        $(this.noteTop).append($('<div class="clear"></div>'))
    },
    filterMode: function (d, b, c) {
        if (b != null && d.count != null) {
            if (d._count == null) {
                d._count = d.count
            }
            var a = d._count;
            if (c != null && d.modes[c]) {
                a = d.modes[c].count;
                b = d.modes[c].outof
            }
            d.__tr = null;
            d.count = a;
            d.outof = b;
            if (b) {
                d.percent = a / b * 100
            } else {
                d.percent = a
            }
        }
        return (c != null ? ((!d.modes || d.modes.mode == 4) && d.classs != 12 && d.percent < 1 ? (c == 32) : (d.modes && (d.modes.mode & c))) : true)
    },
    initSubclassFilter: function (b) {
        var a = b.classs || 0;
        if (this._itemClasses == null) {
            this._itemClasses = {}
        }
        if (this._itemClasses[a] == null) {
            this._itemClasses[a] = 0
        }
        this._itemClasses[a]++
    },
    addSubclassIndicator: function () {
        var k = location.hash.match(/:type=([^:]+)/),
            b = [];
        for (var h in g_item_classes) {
            b.push({
                i: h,
                n: g_item_classes[h]
            })
        }
        b.sort(function (i, f) {
            return $WH.strcmp(i.n, f.n)
        });
        var m = function (f, a) {
                g_setSelectedLink(this, "itemclass");
                d.customPound = d.id + (f != null ? ":type=" + f : "");
                d.customFilter = function (i) {
                    return f == null || f == i.classs
                };
                d.updateFilters(1);
                d.applySort();
                d.refreshRows();
                if (a) {
                    d.updatePound(1)
                }
            };
        var d = this,
            c = [],
            n;
        n = $("<a><span>" + LANG.pr_note_all + "</span></a>");
        n[0].f = m.bind(n[0], null, 1);
        n.click(n[0].f);
        var g = m.bind(n[0], null, 0);
        g();
        c.push($('<span class="indicator-mode"></span>').append(n).append($("<b>" + LANG.pr_note_all + "</b>")));
        for (var e = 0, l = b.length; e < l; ++e) {
            var h = b[e].i;
            if (!this._itemClasses[h]) {
                continue
            }
            n = $("<a><span>" + g_item_classes[h] + "</span> (" + this._itemClasses[h] + ")</a>");
            n[0].f = m.bind(n[0], h, 1);
            n.click(n[0].f);
            c.push($('<span class="indicator-mode"></span>').append(n).append($("<b>" + g_item_classes[h] + " (" + this._itemClasses[h] + ")</b>")));
            if (k && k[1] == g_urlize(h)) {
                (n[0].f)()
            }
        }
        if (c.length > 2) {
            for (var h = 0, l = c.length; h < l; ++h) {
                this.createIndicator(c[h], null, $("a", c[h])[0].f)
            }
            $(this.noteTop).css("padding-bottom", "12px");
            $(this.noteIndicators).append($('<div class="clear"></div>')).insertAfter($(this.navTop))
        }
    },
    initStatisticFilter: function (a) {
        if (this._achievTypes == null) {
            this._achievTypes = {}
        }
        if (this._achievTypes[a.type] == null) {
            this._achievTypes[a.type] = 0
        }
        this._achievTypes[a.type]++
    },
    addStatisticIndicator: function () {
        var h = location.hash.match(/:type=([^:]+)/),
            b = [];
        for (var g in g_achievement_types) {
            b.push({
                i: g,
                n: g_achievement_types[g]
            })
        }
        b.sort(function (i, f) {
            return $WH.strcmp(i.n, f.n)
        });
        var m = function (f, a) {
                g_setSelectedLink(this, "achievType");
                c.customPound = c.id + (f != null ? ":type=" + f : "");
                c.customFilter = function (i) {
                    return f == null || f == i.type
                };
                c.updateFilters(1);
                c.applySort();
                c.refreshRows();
                if (a) {
                    c.updatePound(1)
                }
            };
        var c = this,
            l = [],
            n;
        n = $("<a><span>" + LANG.pr_note_all + "</span></a>");
        n[0].f = m.bind(n[0], null, 1);
        n.click(n[0].f);
        var e = m.bind(n[0], null, 0);
        e();
        l.push($('<span class="indicator-mode"></span>').append(n).append($("<b>" + LANG.pr_note_all + "</b>")));
        for (var d = 0, k = b.length; d < k; ++d) {
            var g = b[d].i;
            if (!this._achievTypes[g]) {
                continue
            }
            n = $("<a><span>" + g_achievement_types[g] + "</span> (" + this._achievTypes[g] + ")</a>");
            n[0].f = m.bind(n[0], g, 1);
            n.click(n[0].f);
            l.push($('<span class="indicator-mode"></span>').append(n).append($("<b>" + g_achievement_types[g] + " (" + this._achievTypes[g] + ")</b>")));
            if (h && h[1] == g) {
                (n[0].f)()
            }
        }
        if (l.length > 2) {
            for (var g = 0, k = l.length; g < k; ++g) {
                this.createIndicator(l[g], null, $("a", l[g])[0].f)
            }
            $(this.noteTop).append($('<div class="clear"></div>'))
        }
    },
    initQuestFilter: function (b) {
        if (this._questTypes == null) {
            this._questTypes = {}
        }
        for (var a = 1; a <= 4; ++a) {
            if (this._questTypes[a] == null) {
                this._questTypes[a] = 0
            }
            if (b._type && (b._type & 1 << a - 1)) {
                this._questTypes[a]++
            }
        }
    },
    addQuestIndicator: function () {
        var g = location.hash.match(/:type=([^:]+)/);
        var j = function (f, a) {
                g_setSelectedLink(this, "questType");
                k.customPound = k.id + (f != null ? ":type=" + f : "");
                k.customFilter = function (i) {
                    return f == null || (i._type & 1 << f - 1)
                };
                k.updateFilters(1);
                k.applySort();
                k.refreshRows();
                if (a) {
                    k.updatePound(1)
                }
            };
        var k = this,
            e = [],
            c;
        c = $("<a><span>" + LANG.pr_note_all + "</span></a>");
        c[0].f = j.bind(c[0], null, 1);
        c.click(c[0].f);
        var h = j.bind(c[0], null, 0);
        h();
        e.push($('<span class="indicator-mode"></span>').append(c).append($("<b>" + LANG.pr_note_all + "</b>")));
        for (var d = 1; d <= 4; ++d) {
            if (!this._questTypes[d]) {
                continue
            }
            c = $("<a><span>" + g_quest_indicators[d] + "</span> (" + this._questTypes[d] + ")</a>");
            c[0].f = j.bind(c[0], d, 1);
            c.click(c[0].f);
            e.push($('<span class="indicator-mode"></span>').append(c).append($("<b>" + g_quest_indicators[d] + " (" + this._questTypes[d] + ")</b>")));
            if (g && g[1] == d) {
                (c[0].f)()
            }
        }
        if (e.length > 2) {
            for (var d = 0, b = e.length; d < b; ++d) {
                this.createIndicator(e[d], null, $("a", e[d])[0].f)
            }
            $(this.noteTop).css("padding-bottom", "12px");
            $(this.noteIndicators).append($('<div class="clear"></div>')).insertAfter($(this.navTop))
        }
    },
    assocArrCmp: function (e, d, c) {
        if (e == null) {
            return -1
        } else {
            if (d == null) {
                return 1
            }
        }
        var h = Math.max(e.length, d.length);
        for (var g = 0; g < h; ++g) {
            if (e[g] == null) {
                return -1
            } else {
                if (d[g] == null) {
                    return 1
                }
            }
            var f = $WH.strcmp(c[e[g]], c[d[g]]);
            if (f != 0) {
                return f
            }
        }
        return 0
    },
    assocBinFlags: function (d, a) {
        var c = [];
        for (var b in a) {
            if (!isNaN(b) && (d & 1 << b - 1)) {
                c.push(b)
            }
        }
        c.sort(function (f, e) {
            return $WH.strcmp(a[f], a[e])
        });
        return c
    },
    location: function (f, g) {
        if (f.location == null) {
            return -1
        }
        for (var d = 0, b = f.location.length; d < b; ++d) {
            if (d > 0) {
                $WH.ae(g, $WH.ct(LANG.comma))
            }
            var e = f.location[d];
            if (e == -1) {
                $WH.ae(g, $WH.ct(LANG.ellipsis))
            } else {
                var c = $WH.ce("a");
                c.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                c.href = wowheadUrl + "/zone=" + e;
                $WH.ae(c, $WH.ct(g_zones[e]));
                $WH.ae(g, c)
            }
        }
    },
    arrayText: function (b, e) {
        if (b == null) {
            return
        } else {
            if (!$WH.is_array(b)) {
                return e[b]
            }
        }
        var d = "";
        for (var c = 0, a = b.length; c < a; ++c) {
            if (c > 0) {
                d += " "
            }
            if (!e[b[c]]) {
                continue
            }
            d += e[b[c]]
        }
        return d
    },
    createCenteredIcons: function (k, f, t, o) {
        if (k != null) {
            var n = $WH.ce("div"),
                b = $WH.ce("div");
            $WH.ae(document.body, n);
            if (t && (k.length != 1 || o != 2)) {
                var m = $WH.ce("div");
                m.style.position = "relative";
                m.style.width = "1px";
                var p = $WH.ce("div");
                p.className = "q0";
                p.style.position = "absolute";
                p.style.right = "2px";
                p.style.lineHeight = "26px";
                p.style.fontSize = "11px";
                p.style.whiteSpace = "nowrap";
                $WH.ae(p, $WH.ct(t));
                $WH.ae(m, p);
                $WH.ae(n, m);
                n.style.paddingLeft = $(p).width() + "px"
            }
            var j = g_items;
            if (o == 1) {
                j = g_spells
            }
            for (var g = 0, l = k.length; g < l; ++g) {
                var q;
                if (k[g] == null) {
                    q = $WH.ce("div");
                    q.style.width = q.style.height = "26px"
                } else {
                    var e, h;
                    if (typeof k[g] == "object") {
                        e = k[g][0];
                        h = k[g][1]
                    } else {
                        e = k[g]
                    }
                    if (e) {
                        q = j.createIcon(e, 0, h)
                    } else {
                        q = Icon.create("inventoryslot_empty", 0, null, "javascript:;")
                    }
                }
                if (k.length == 1 && o == 2) {
                    if (e && g_items[e]) {
                        $WH.ee(n);
                        var u = g_items[e],
                            r = $WH.ce("a"),
                            c = $WH.ce("span");
                        c.style.paddingTop = "4px";
                        r.href = wowheadUrl + "/item=" + e;
                        r.className = "q" + u.quality + " icontiny";
                        r.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + u.icon.toLowerCase() + ".gif)";
                        r.style.whiteSpace = "nowrap";
                        $WH.st(r, u["name_" + Locale.getName()]);
                        $WH.ae(c, r);
                        if (h > 1) {
                            $WH.ae(c, $WH.ct(" (" + h + ")"))
                        }
                        if (t) {
                            var m = $WH.ce("span");
                            m.className = "q0";
                            m.style.fontSize = "11px";
                            m.style.whiteSpace = "nowrap";
                            $WH.ae(m, $WH.ct(t));
                            $WH.ae(n, m);
                            c.style.paddingLeft = $(p).width() + "px"
                        }
                        $WH.ae(n, c)
                    }
                } else {
                    q.style.cssFloat = q.style.styleFloat = "left";
                    $WH.ae(n, q);
                    n.style.margin = "0 auto";
                    n.style.textAlign = "left";
                    n.style.width = (26 * k.length) + "px"
                }
            }
            b.className = "clear";
            $WH.ae(f, n);
            $WH.ae(f, b);
            return true
        }
    },
    createSocketedIcons: function (b, e, c, g, n) {
        var m = 0,
            k = $WH.ce("div"),
            a = $WH.ce("div");
        for (var f = 0, h = b.length; f < h; ++f) {
            var l, j = c[f];
            if (g_items && g_items[j]) {
                l = g_items.createIcon(j, 0)
            } else {
                if ($WH.isset("g_gems") && g_gems && g_gems[j]) {
                    l = Icon.create(g_gems[j].icon, 0, null, wowheadUrl + "/item=" + j)
                } else {
                    l = Icon.create(null, 0, null, "javascript:;")
                }
            }
            l.className += " iconsmall-socket-" + g_file_gems[b[f]] + (!c || !j ? "-empty" : "");
            l.style.cssFloat = l.style.styleFloat = "left";
            if (g && g[f]) {
                l.insertBefore($WH.ce("var"), l.childNodes[1]);
                ++m
            }
            $WH.ae(k, l)
        }
        k.style.margin = "0 auto";
        k.style.textAlign = "left";
        k.style.width = (26 * b.length) + "px";
        a.className = "clear";
        $WH.ae(e, k);
        $WH.ae(e, a);
        if (n && m == b.length) {
            k = $WH.ce("div");
            k.style.paddingTop = "4px";
            $WH.ae(k, $WH.ct(n));
            $WH.ae(e, k)
        }
    },
    getItemType: function (c, a, b) {
        if (b != null && g_item_subsubclasses[c] != null && g_item_subsubclasses[c][a] != null) {
            return {
                url: wowheadUrl + "/items=" + c + "." + a + "." + b,
                text: g_item_subsubclasses[c][a][b]
            }
        } else {
            if (a != null && g_item_subclasses[c] != null) {
                return {
                    url: wowheadUrl + "/items=" + c + "." + a,
                    text: g_item_subclasses[c][a]
                }
            } else {
                return {
                    url: wowheadUrl + "/items=" + c,
                    text: g_item_classes[c]
                }
            }
        }
    },
    getQuestCategory: function (a) {
        return g_quest_sorts[a]
    },
    getQuestReputation: function (d, b) {
        if (b.reprewards) {
            for (var c = 0, a = b.reprewards.length; c < a; ++c) {
                if (b.reprewards[c][0] == d) {
                    return b.reprewards[c][1]
                }
            }
        }
    },
    getFactionCategory: function (b, a) {
        if (b) {
            return g_faction_categories[b]
        } else {
            return g_faction_categories[a]
        }
    },
    getEventNextDates: function (e, a, j, f) {
        if (typeof e != "string" || typeof a != "string") {
            return [null, null]
        }
        e = new Date(e.replace(/-/g, "/"));
        a = new Date(a.replace(/-/g, "/"));
        if (isNaN(e.getTime()) || isNaN(a.getTime())) {
            return [null, null]
        }
        if (f == null) {
            f = g_serverTime
        }
        var b = 0;
        if (j == -1) {
            var k = new Date(f.getFullYear(), f.getMonth(), 1, e.getHours(), e.getMinutes(), e.getSeconds());
            for (var c = 0; c < 2; ++c) {
                k.setDate(1);
                k.setMonth(k.getMonth() + c);
                var h = k.getDay();
                var g = 1;
                if (k.getYear() == 2009) {
                    g = 0
                }
                if (h > g) {
                    k.setDate(k.getDate() + (7 - h))
                }
                var d = new Date(k);
                d.setDate(d.getDate() + (7 - g));
                if (f.getTime() < d.getTime()) {
                    break
                }
            }
            b = k.getTime() - e.getTime()
        } else {
            if (j > 0) {
                j *= 1000;
                b = Math.ceil((f.getTime() - a.getTime()) / j) * j
            }
        }
        e.setTime(e.getTime() + b);
        a.setTime(a.getTime() + b);
        return [e, a]
    },
    createTextRange: function (b, a) {
        b |= 0;
        a |= 0;
        if (b > 1 || a > 1) {
            if (b != a && a > 0) {
                return b + "-" + a
            } else {
                return b + ""
            }
        }
        return null
    },
    coGetColor: function (d, b, a) {
        if (d.user && g_customColors[d.user]) {
            return " comment-" + g_customColors[d.user]
        }
        switch (b) {
        case -1:
            var c = null;
            if (!a) {
                c = d.divPost.childNodes[1].className.match(/comment-([a-z]+)/)
            } else {
                c = d.divBody[0].className.match(/comment-([a-z]+)/)
            }
            if (c != null) {
                return " comment-" + c[1]
            }
            break;
        case 3:
        case 4:
            if (d.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) {
                return " comment-blue"
            }
            if (d.roles & U_GROUP_GREEN_TEXT) {
                return " comment-green"
            } else {
                if (d.roles & U_GROUP_VIP) {
                    return " comment-gold"
                }
            }
            break
        }
        if (d.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) {
            return " comment-blue"
        } else {
            if (d.rating >= 10) {
                return " comment-green"
            } else {
                if (d.rating < 0) {
                    return " comment-bt"
                }
            }
        }
        return ""
    },
    coToggleVis: function (c) {
        var b = g_toggleDisplay(c.divBody);
        this.firstChild.nodeValue = (b ? LANG.lvcomment_hide : LANG.lvcomment_show);
        c.__div.className = $WH.trim(c.__div.className.replace("comment-collapsed", "")) + (b ? "" : " comment-collapsed");
        var a = c.divHeader.firstChild.lastChild;
        if (c.ratable) {
            a.style.display = ""
        } else {
            if (c.deleted || c.purged) {
                a.style.fontWeight = "normal";
                a.className = "q10";
                a.innerHTML = (c.deleted ? LANG.lvcomment_deleted : LANG.lvcomment_purged);
                a.style.display = ""
            }
        }
        g_toggleDisplay(c.divLinks);
        if (c.lastEdit != null) {
            g_toggleDisplay(c.divLastEdit)
        }
    },
    coDisplayRating: function (d, c) {
        if (typeof (d._ratingMode) == "undefined") {
            d._ratingMode = 0
        }
        if (typeof (Listview._ratings) == "undefined") {
            Listview._ratings = {}
        }
        var a = $(c);
        var e = d._ratingMode;
        if (e == 0) {
            if (d.rating < 0) {
                a.text(d.rating)
            } else {
                a.text("+" + d.rating)
            }
        }
        if (e == 1) {
            if (Listview._ratings[d.id] !== undefined) {
                var b = Listview._ratings[d.id];
                a.text("+" + b.up + " / -" + b.down)
            } else {
                $.ajax({
                    url: wowheadUrl + "/comment=rating&id=" + d.id,
                    dataType: "json",
                    success: function (i, f, h, g) {
                        if (f.success) {
                            Listview._ratings[i] = f;
                            this.text("+" + f.up + " / -" + f.down)
                        } else {
                            this.text("Error!")
                        }
                    }.bind(a, d.id)
                });
                a.html('<img src="' + g_staticUrl + '/images/icons/ajax.gif" />')
            }
        }
    },
    coToggleRating: function (b, a) {
        if (typeof (b._ratingMode) == "undefined") {
            b._ratingMode = 0
        }
        if (++b._ratingMode > 1) {
            b._ratingMode = 0
        }
        Listview.funcBox.coDisplayRating(b, a)
    },
    coRate: function (f, a) {
        if (a == 0) {
            var d = 5;
            if (g_user.roles & U_GROUP_ADMIN) {
                d = 25
            } else {
                if (g_user.roles & U_GROUP_BUREAU) {
                    d = 15
                }
            }
            var e = prompt($WH.sprintf(LANG.prompt_customrating, d, d), 0);
            if (e == null) {
                return
            } else {
                e |= 0;
                if (e != 0 && Math.abs(e) <= d) {
                    a = e
                }
            }
            if (a == 0) {
                return
            }
        } else {
            if (g_user.roles & U_GROUP_COMMENTS_MODERATOR) {
                a *= 5
            }
        }
        f.rating += a;
        f.raters.push([g_user.id, a]);
        var b = f.divHeader.firstChild;
        $WH.Tooltip.hide();
        b = b.childNodes[b.childNodes.length - 3];
        var c = $WH.ge("commentrating" + f.id);
        Listview.funcBox.coDisplayRating(f, c);
        $WH.de(b.nextSibling);
        $WH.de(b.nextSibling);
        $.get(wowheadUrl + "/comment=rate&id=" + f.id + "&rating=" + a, null, function (g) {
            if (g == "0") {} else {
                if (g == "1") {
                    $(b).html(LANG.tooltip_banned_rating)
                } else {
                    if (g == "3") {
                        $(b).html(LANG.tooltip_too_many_votes)
                    } else {
                        $(b).html(LANG.genericerror)
                    }
                }
            }
            AchievementCheck()
        })
    },
    coDelete: function (a) {
        if (a.purged) {
            alert(LANG.message_cantdeletecomment)
        } else {
            if (confirm(LANG.confirm_deletecomment)) {
                new Ajax(wowheadUrl + "/comment=delete&id=" + a.id);
                this.deleteRows([a])
            }
        }
    },
    coDetach: function (a) {
        if (a.replyTo == 0) {
            alert(LANG.message_cantdetachcomment)
        } else {
            if (confirm(LANG.confirm_detachcomment)) {
                new Ajax(wowheadUrl + "/comment=detach&id=" + a.id);
                a.replyTo = 0;
                alert(LANG.message_commentdetached)
            }
        }
    },
    coEdit: function (g, e, c) {
        if (!c) {
            g.divBody.style.display = "none";
            g.divResponse.style.display = "none";
            g.divLinks.firstChild.style.display = "none"
        } else {
            g.divBody.hide();
            g.divResponse.hide()
        }
        var f = $("<div/>");
        f.addClass("comment-edit");
        g.divEdit = f[0];
        if (e == -1) {
            if (g_users[g.user] != null) {
                g.roles = g_users[g.user].roles
            }
        }
        var a = Listview.funcBox.coEditAppend(f, g, e, c);
        var b = $("<div/>");
        b.addClass("comment-edit-buttons");
        var d = $("<button/>", {
            text: LANG.compose_save
        });
        d.click(Listview.funcBox.coEditButton.bind(d[0], g, true, e, c));
        b.append(d);
        b.append($WH.ct(" "));
        d = $("<button/>", {
            text: LANG.compose_cancel
        });
        d.click(Listview.funcBox.coEditButton.bind(d[0], g, false, e, c));
        b.append(d);
        f.append(b);
        f.insertAfter(g.divBody);
        a.focus()
    },
    coEditAppend: function (u, d, t, G, g) {
        var l = Listview.funcBox.coGetCharLimit(t);
        if (t == 1 || t == 3 || t == 4) {
            d.user = g_user.name;
            d.roles = g_user.roles;
            d.rating = 1
        } else {
            if (t == 2) {
                d.roles = g_user.roles;
                d.rating = 1
            }
        }
        if (g) {
            d.roles &= ~U_GROUP_PENDING
        }
        if (t == -1 || t == 0) {
            var o = $("<div/>", {
                text: LANG.compose_mode
            });
            o.addClass("comment-edit-modes");
            var z = $("<a/>", {
                href: "javascript:;",
                text: LANG.compose_edit
            });
            z.click(Listview.funcBox.coModeLink.bind(z[0], 1, t, d));
            z.addClass("selected");
            o.append(z);
            o.append($WH.ct("|"));
            var I = $("<a/>", {
                href: "javascript:;",
                text: LANG.compose_preview
            });
            I.click(Listview.funcBox.coModeLink.bind(I[0], 2, t, d));
            o.append(I);
            u.append(o)
        }
        var a = $("<div/>", {
            css: {
                display: "none"
            }
        });
        a.addClass("text comment-body" + Listview.funcBox.coGetColor(d, t, G));
        var n = $("<div/>");
        n.addClass("comment-edit-body");
        var k = $('<div style="float: left" />');
        k.addClass("toolbar");
        var e = $('<div style="float: left" />');
        e.addClass("menu-buttons");
        var m = $("<textarea/>", {
            val: d.body,
            rows: 10,
            css: {
                clear: "left"
            }
        });
        m.addClass("comment-editbox");
        switch (t) {
        case 1:
            m.attr("name", "commentbody");
            m.focus(g_revealCaptcha.bind(null, "klrbetkjerbt46", false));
            break;
        case 2:
            m.attr({
                name: "desc",
                originalValue: d.body
            });
            break;
        case 3:
            m.attr("name", "body");
            m.focus(g_revealCaptcha.bind(null, "klrbetkjerbt46", false));
            break;
        case 4:
            m.attr({
                name: "sig",
                originalValue: d.body,
                rows: 3
            });
            m.css("height", "auto");
            break
        }
        if (t != -1 && t != 0) {
            var h = $("<h3/>"),
                J = $("<a/>"),
                F = $("<div/>"),
                E = $("<div/>"),
                j = screen.availWidth <= 480;
            var f = Listview.funcBox.coLivePreview.bind(m[0], d, t, F[0]);
            J.addClass("disclosure-" + (j ? "off" : "on"));
            J.text(LANG.compose_livepreview);
            h.append(J);
            J.attr("href", "javascript:;");
            J.click(function () {
                f(1);
                var i = g_toggleDisplay(F);
                J.toggleClass("disclosure-on", i);
                J.toggleClass("disclosure-off", !i)
            });
            h.addClass("first");
            E.addClass("pad");
            a.append(h);
            a.append(F);
            a.append(E);
            g_onAfterTyping(m[0], f, 50);
            m.focus(function () {
                f();
                a.css("display", (j ? "none" : ""));
                if (t != 4) {
                    m.css("height", "22em")
                }
            })
        } else {
            if (t != 4) {
                m.focus(function () {
                    m.css("height", "22em")
                })
            }
        }
        var D = [{
            id: "b",
            title: LANG.markup_b,
            pre: "[b]",
            post: "[/b]"
        }, {
            id: "i",
            title: LANG.markup_i,
            pre: "[i]",
            post: "[/i]"
        }, {
            id: "u",
            title: LANG.markup_u,
            pre: "[u]",
            post: "[/u]"
        }, {
            id: "s",
            title: LANG.markup_s,
            pre: "[s]",
            post: "[/s]"
        }, {
            id: "small",
            title: LANG.markup_small,
            pre: "[small]",
            post: "[/small]"
        }, {
            id: "url",
            title: LANG.markup_url,
            nopending: true,
            onclick: function () {
                var i = prompt(LANG.prompt_linkurl, "http://");
                if (i) {
                    g_insertTag(m[0], "[url=" + i + "]", "[/url]")
                }
            }
        }, {
            id: "quote",
            title: LANG.markup_quote,
            pre: "[quote]",
            post: "[/quote]"
        }, {
            id: "code",
            title: LANG.markup_code,
            pre: "[code]",
            post: "[/code]"
        }, {
            id: "ul",
            title: LANG.markup_ul,
            pre: "[ul]\n[li]",
            post: "[/li]\n[/ul]",
            rep: function (i) {
                return i.replace(/\n/g, "[/li]\n[li]")
            }
        }, {
            id: "ol",
            title: LANG.markup_ol,
            pre: "[ol]\n[li]",
            post: "[/li]\n[/ol]",
            rep: function (i) {
                return i.replace(/\n/g, "[/li]\n[li]")
            }
        }, {
            id: "li",
            title: LANG.markup_li,
            pre: "[li]",
            post: "[/li]"
        }];
        if (!G) {
            for (var B = 0, C = D.length; B < C; ++B) {
                var q = D[B];
                if (t == 4 && q.id == "quote") {
                    break
                }
                if ((g_user.roles & U_GROUP_PENDING) && q.nopending) {
                    continue
                }
                var v = $("<button/>", {
                    click: function (i, L) {
                        L.preventDefault();
                        (i.onclick != null ? i.onclick : g_insertTag.bind(0, m[0], i.pre, i.post, i.rep))()
                    }.bind(null, q)
                });
                v[0].setAttribute("type", "button");
                var K = $("<img/>");
                v.attr("title", q.title);
                K.attr("src", g_staticUrl + "/images/deprecated/pixel.gif");
                K.addClass("toolbar-" + q.id);
                v.append(K);
                k.append(v)
            }
        } else {
            for (var B = 0, C = D.length; B < C; ++B) {
                var q = D[B];
                if ((g_user.rolls & U_GROUP_PENDING) && q.nopending) {
                    continue
                }
                var H = "tb-" + q.id;
                var v = $("<button/>", {
                    click: function (i, L) {
                        L.preventDefault();
                        (i.onclick != null ? i.onclick : g_insertTag.bind(0, m[0], i.pre, i.post, i.rep))()
                    }.bind(null, q),
                    "class": H,
                    title: q.title
                });
                v[0].setAttribute("type", "button");
                v.append("<ins/>");
                k.append(v)
            }
            k.addClass("formatting button sm")
        }
        var r = function (L, i) {
                var M = prompt($WH.sprintf(LANG.markup_prompt, L), "");
                if (M != null) {
                    g_insertTag(m[0], "[" + i + "=" + (parseInt(M) || 0) + "]", "")
                }
            };
        var c = [
            [0, LANG.markup_links, , [
                [9, LANG.types[10][0] + "...", r.bind(null, LANG.types[10][1], "achievement")],
                [11, LANG.types[13][0] + "...", r.bind(null, LANG.types[13][1], "class")],
                [7, LANG.types[8][0] + "...", r.bind(null, LANG.types[8][1], "faction")],
                [0, LANG.types[3][0] + "...", r.bind(null, LANG.types[3][1], "item")],
                [1, LANG.types[4][0] + "...", r.bind(null, LANG.types[4][1], "itemset")],
                [2, LANG.types[1][0] + "...", r.bind(null, LANG.types[1][1], "npc")],
                [3, LANG.types[2][0] + "...", r.bind(null, LANG.types[2][1], "object")],
                [8, LANG.types[9][0] + "...", r.bind(null, LANG.types[9][1], "pet")],
                [4, LANG.types[5][0] + "...", r.bind(null, LANG.types[5][1], "quest")],
                [12, LANG.types[14][0] + "...", r.bind(null, LANG.types[14][1], "race")],
                [13, LANG.types[15][0] + "...", r.bind(null, LANG.types[15][1], "skill")],
                [5, LANG.types[6][0] + "...", r.bind(null, LANG.types[6][1], "spell")],
                [6, LANG.types[7][0] + "...", r.bind(null, LANG.types[7][1], "zone")]
            ]]
        ];
        n.append(k);
        n.append(e);
        n.append($('<div style="clear: left" />'));
        n.append(m);
        n.append($("<br/>"));
        Menu.addButtons(e[0], c);
        if (t == 4) {
            n.append($WH.ct($WH.sprintf(LANG.compose_limit2, l, 3)))
        } else {
            n.append($WH.ct($WH.sprintf(LANG.compose_limit, l)))
        }
        var A = $('<span class="comment-remaining"> ' + $WH.sprintf(LANG.compose_remaining, l - d.body.length) + "</span>");
        n.append(A);
        m.keyup(Listview.funcBox.coUpdateCharLimit.bind(0, m, A, l));
        m.keydown(Listview.funcBox.coUpdateCharLimit.bind(0, m, A, l));
        if ((t == -1 || t == 0) && g_user.roles & U_GROUP_MODERATOR) {
            var b = $("<div/>", {
                "class": "pad"
            });
            var w = $("<div/>", {
                text: (g_user.roles & U_GROUP_ADMIN ? "Admin" : "Moderator") + " response"
            });
            var p = $("<textarea/>", {
                val: d.response,
                rows: 3,
                css: {
                    height: "6em"
                }
            });
            n.append(b);
            n.append(w);
            n.append(p)
        }
        u.append(n);
        u.append($("<br/>"));
        u.append(a);
        return m
    },
    coLivePreview: function (f, e, a, b) {
        if (b != 1 && a.style.display == "none") {
            return
        }
        var c = this,
            i = Listview.funcBox.coGetCharLimit(e),
            g = (c.value.length > i ? c.value.substring(0, i) : c.value);
        if (e == 4) {
            var h;
            if ((h = g.indexOf("\n")) != -1 && (h = g.indexOf("\n", h + 1)) != -1 && (h = g.indexOf("\n", h + 1)) != -1) {
                g = g.substring(0, h)
            }
        }
        var j = Markup.rolesToClass(f.roles);
        var d = Markup.toHtml(g, {
            allow: j,
            mode: Markup.MODE_COMMENT,
            roles: f.roles
        });
        if (d) {
            a.innerHTML = d
        } else {
            a.innerHTML = '<span class="q6">...</span>'
        }
    },
    coEditButton: function (h, b, g, k) {
        if (b) {
            var e = $WH.gE(h.divEdit, "textarea");
            var d = e[0];
            if (!Listview.funcBox.coValidate(d, g)) {
                return
            }
            if (d.value != h.body || (e[1] && e[1].value != h.response)) {
                var i = 0;
                if (h.lastEdit != null) {
                    i = h.lastEdit[1]
                }++i;
                h.lastEdit = [g_serverTime, i, g_user.name];
                Listview.funcBox.coUpdateLastEdit(h);
                var j = Listview.funcBox.coGetCharLimit(g);
                var l = Markup.rolesToClass(h.roles);
                var f = Markup.toHtml((d.value.length > j ? d.value.substring(0, j) : d.value), {
                    allow: l,
                    mode: Markup.MODE_COMMENT,
                    roles: h.roles
                });
                var a = ((e[1] && e[1].value.length > 0) ? Markup.toHtml("[div][/div][wowheadresponse=" + g_user.name + " roles=" + g_user.roles + "]" + e[1].value + "[/wowheadresponse]", {
                    allow: Markup.CLASS_STAFF,
                    mode: Markup.MODE_COMMENT,
                    roles: g_user.roles
                }) : "");
                if (!k) {
                    h.divBody.innerHTML = f;
                    h.divResponse.innerHTML = a
                } else {
                    h.divBody.html(f);
                    h.divResponse.html(a)
                }
                h.body = d.value;
                if (g_user.roles & U_GROUP_MODERATOR && e[1]) {
                    h.response = e[1].value
                }
                var c = "body=" + $WH.urlencode(h.body);
                if (h.response !== undefined) {
                    c += "&response=" + $WH.urlencode(h.response)
                }
                if (g == -1) {
                    new Ajax(wowheadUrl + "/forums=editpost&id=" + h.id, {
                        method: "POST",
                        params: c
                    })
                } else {
                    new Ajax(wowheadUrl + "/comment=edit&id=" + h.id, {
                        method: "POST",
                        params: c
                    })
                }
            }
        }
        if (!k) {
            h.divBody.style.display = "";
            h.divResponse.style.display = "";
            h.divLinks.firstChild.style.display = ""
        } else {
            h.divBody.show();
            h.divResponse.show()
        }
        $WH.de(h.divEdit);
        h.divEdit = null
    },
    coGetCharLimit: function (a) {
        if (a == 2) {
            return 7500
        }
        if (a == 4) {
            return 250
        }
        if (g_user.roles & U_GROUP_STAFF) {
            return 16000000
        }
        var b = 1;
        if (g_user.premium) {
            b = 3
        }
        switch (a) {
        case 0:
        case 1:
            return 7500 * b;
        case -1:
        case 3:
            return 15000 * b
        }
    },
    coUpdateCharLimit: function (a, b, c) {
        var d = $(a).val();
        if (d.length > c) {
            $(a).val(d.substring(0, c))
        } else {
            $(b).html(" " + $WH.sprintf(LANG.compose_remaining, c - d.length)).removeClass("q10");
            if (d.length == c) {
                $(b).addClass("q10")
            }
        }
    },
    coModeLink: function (g, b, h) {
        var l = Listview.funcBox.coGetCharLimit(b);
        var c = Markup.MODE_COMMENT;
        $WH.array_walk($WH.gE(this.parentNode, "a"), function (m) {
            m.className = ""
        });
        this.className = "selected";
        var f = $WH.gE(this.parentNode.parentNode, "textarea"),
            d = f[0],
            k = d.parentNode,
            a = $(".comment-body", k.parentNode)[0];
        if (b == 4) {
            c = Markup.MODE_SIGNATURE
        }
        switch (g) {
        case 1:
            k.style.display = "";
            a.style.display = "none";
            k.firstChild.focus();
            break;
        case 2:
            k.style.display = "none";
            var i = (d.value.length > l ? d.value.substring(0, l) : d.value);
            if (b == 4) {
                var j;
                if ((j = i.indexOf("\n")) != -1 && (j = i.indexOf("\n", j + 1)) != -1 && (j = i.indexOf("\n", j + 1)) != -1) {
                    i = i.substring(0, j)
                }
            }
            var n = Markup.rolesToClass(h.roles);
            var e = Markup.toHtml(i, {
                allow: n,
                mode: c,
                roles: h.roles
            });
            if (f[1] && f[1].value.length > 0) {
                e += Markup.toHtml("[div][/div][wowheadresponse=" + g_user.name + " roles=" + g_user.roles + "]" + f[1].value + "[/wowheadresponse]", {
                    allow: Markup.CLASS_STAFF,
                    mode: c,
                    roles: g_user.roles
                })
            }
            a.innerHTML = e;
            a.style.display = "";
            break
        }
    },
    coReply: function (b) {
        document.forms.addcomment.elements.replyto.value = b.replyTo;
        var a = $WH.ge("gjkdlfgkjh436");
        $WH.gE(a, "span")[0].innerHTML = b.user;
        a.style.display = "";
        co_addYourComment()
    },
    coValidate: function (a, c) {
        c |= 0;
        if (c == 1 || c == -1) {
            if ($WH.trim(a.value).length < 1) {
                alert(LANG.message_forumposttooshort);
                return false
            }
        } else {
            if ($WH.trim(a.value).length < 1) {
                alert(LANG.message_commenttooshort);
                return false
            }
        }
        var b = Listview.funcBox.coGetCharLimit(c);
        if (a.value.length > b) {
            if (!confirm($WH.sprintf(c == 1 ? LANG.confirm_forumposttoolong : LANG.confirm_commenttoolong, b, a.value.substring(b - 30, b)))) {
                return false
            }
        }
        return true
    },
    coCustomRatingOver: function (a) {
        $WH.Tooltip.showAtCursor(a, LANG.tooltip_customrating, 0, 0, "q")
    },
    coPlusRatingOver: function (a) {
        $WH.Tooltip.showAtCursor(a, LANG.tooltip_uprate, 0, 0, "q2")
    },
    coMinusRatingOver: function (a) {
        $WH.Tooltip.showAtCursor(a, LANG.tooltip_downrate, 0, 0, "q10")
    },
    coSortDate: function (a) {
        a.nextSibling.nextSibling.className = "";
        a.className = "selected";
        this.mainDiv.className += " listview-aci";
        this.setSort([1], true, false);
        g_setWowheadCookie("temp_comment_sort", 1)
    },
    coSortHighestRatedFirst: function (a) {
        a.previousSibling.previousSibling.className = "";
        a.className = "selected";
        this.mainDiv.className = this.mainDiv.className.replace("listview-aci", "");
        this.setSort([-3, 2], true, false);
        g_setWowheadCookie("temp_comment_sort", 2)
    },
    coFilterByPatchVersion: function (a) {
        this.minPatchVersion = a.value;
        this.refreshRows()
    },
    coUpdateLastEdit: function (f) {
        var b = f.divLastEdit;
        if (!b) {
            return
        }
        if (f.lastEdit != null) {
            var e = f.lastEdit;
            b.childNodes[1].firstChild.nodeValue = e[2];
            b.childNodes[1].href = wowheadUrl + "/user=" + e[2];
            var c = new Date(e[0]);
            var d = (g_serverTime - c) / 1000;
            if (b.childNodes[3].firstChild) {
                $WH.de(b.childNodes[3].firstChild)
            }
            g_formatDate(b.childNodes[3], d, c);
            var a = "";
            if (f.rating != null) {
                a += $WH.sprintf(LANG.lvcomment_patch, g_getPatchVersion(c))
            }
            if (e[1] > 1) {
                a += LANG.dash + $WH.sprintf(LANG.lvcomment_nedits, e[1])
            }
            b.childNodes[4].nodeValue = a;
            b.style.display = ""
        } else {
            b.style.display = "none"
        }
    },
    coFormatFileSize: function (c) {
        var b = -1;
        var a = "KMGTPEZY";
        while (c >= 1024 && b < 7) {
            c /= 1024;
            ++b
        }
        if (b < 0) {
            return c + " byte" + (c > 1 ? "s" : "")
        } else {
            return c.toFixed(1) + " " + a[b] + "B"
        }
    },
    dateEventOver: function (c, a, h) {
        var b = Listview.funcBox.getEventNextDates(a.startDate, a.endDate, a.rec || 0, c),
            j = "";
        if (b[0] && b[1]) {
            var g = new Date(a.startDate.replace(/-/g, "/")),
                d = new Date(a.endDate.replace(/-/g, "/")),
                f, i;
            g.setFullYear(c.getFullYear(), c.getMonth(), c.getDate());
            d.setFullYear(c.getFullYear(), c.getMonth(), c.getDate());
            if (c.getFullYear() == b[0].getFullYear() && c.getMonth() == b[0].getMonth() && c.getDate() == b[0].getDate()) {
                f = true
            }
            if (c.getFullYear() == b[1].getFullYear() && c.getMonth() == b[1].getMonth() && c.getDate() == b[1].getDate()) {
                i = true
            }
            if (f && i) {
                j = g_formatTimeSimple(g, LANG.lvscreenshot_from, 1) + " " + g_formatTimeSimple(d, LANG.date_to, 1)
            } else {
                if (f) {
                    j = g_formatTimeSimple(g, LANG.tab_starts)
                } else {
                    if (i) {
                        j = g_formatTimeSimple(d, LANG.tab_ends)
                    } else {
                        j = LANG.allday
                    }
                }
            }
        }
        $WH.Tooltip.showAtCursor(h, '<span class="q1">' + a.name + "</span><br />" + j, 0, 0, "q")
    },
    ssCellOver: function () {
        this.className = "screenshot-caption-over"
    },
    ssCellOut: function () {
        this.className = "screenshot-caption"
    },
    ssCellClick: function (b, d) {
        d = $WH.$E(d);
        if (d.shiftKey || d.ctrlKey) {
            return
        }
        var a = 0,
            c = d._target;
        while (c && a < 3) {
            if (c.nodeName == "A") {
                return
            }
            if (c.nodeName == "IMG") {
                break
            }
            c = c.parentNode
        }
        ScreenshotViewer.show({
            screenshots: this.data,
            pos: b
        })
    },
    ssCreateCb: function (d, b) {
        if (b.__nochk) {
            return
        }
        var c = $WH.ce("div");
        c.className = "listview-cb";
        c.onclick = Listview.cbCellClick;
        var a = $WH.ce("input");
        a.type = "checkbox";
        a.onclick = Listview.cbClick;
        $WH.ns(a);
        if (b.__chk) {
            a.checked = true
        }
        b.__cb = a;
        $WH.ae(c, a);
        $WH.ae(d, c)
    },
    viCellClick: function (b, d) {
        d = $WH.$E(d);
        if (d.shiftKey || d.ctrlKey) {
            return
        }
        var a = 0,
            c = d._target;
        while (c && a < 3) {
            if (c.nodeName == "A") {
                return
            }
            if (c.nodeName == "IMG") {
                break
            }
            c = c.parentNode
        }
        VideoViewer.show({
            videos: this.data,
            pos: b
        })
    },
    moneyAchievementOver: function (a) {
        $WH.Tooltip.showAtCursor(a, "<b>" + LANG.tooltip_achievementpoints + "</b>", 0, 0, "q1")
    },
    moneyCurrencyOver: function (b, g, h) {
        var j = g_gatheredcurrencies[b]["name_" + Locale.getName()];
        switch (b) {
        case 395:
            var d = [
                [80, 16, LANG.tooltip_ppbheroic],
                [80, 23, LANG.tooltip_ppbraid],
                [85, 75, LANG.tooltip_ppbheroic]
            ];
            break;
        case 396:
            var d = [
                [85, 75, $WH.sprintf(LANG.pr_tt_normal, LANG.tooltip_ppbraid)],
                [85, 105, $WH.sprintf(LANG.pr_tt_heroic, LANG.tooltip_ppbraid)]
            ];
            break;
        default:
            var d = [];
            break
        }
        if (d.length && g) {
            j += '<br /><span class="q">';
            for (var c = 0, a = d.length; c < a; ++c) {
                var f = Math.ceil(g / d[c][1]);
                if (c > 0) {
                    j += "<br />"
                }
                j += $WH.sprintf(LANG["tooltip_pointsperboss" + (f == 1 ? 1 : 2)], f, d[c][0], d[c][2])
            }
            j += "</span>"
        }
        $WH.Tooltip.showAtCursor(h, j, 0, 0, "q1")
    },
    appendMoney: function (h, a, g, e, b, o) {
        var m, l, k = 0;
        if (g == 1 || g == "alliance") {
            g = 1
        } else {
            if (g == 2 || g == "horde") {
                g = 2
            } else {
                g = 3
            }
        }
        if (a >= 10000) {
            k = 1;
            m = $WH.ce("span");
            m.className = "moneygold";
            $WH.ae(m, $WH.ct($WH.number_format(Math.floor(a / 10000))));
            $WH.ae(h, m);
            a %= 10000
        }
        if (a >= 100) {
            if (k) {
                $WH.ae(h, $WH.ct(" "))
            } else {
                k = 1
            }
            m = $WH.ce("span");
            m.className = "moneysilver";
            $WH.ae(m, $WH.ct(Math.floor(a / 100)));
            $WH.ae(h, m);
            a %= 100
        }
        if (a >= 1) {
            if (k) {
                $WH.ae(h, $WH.ct(" "))
            } else {
                k = 1
            }
            m = $WH.ce("span");
            m.className = "moneycopper";
            $WH.ae(m, $WH.ct(a));
            $WH.ae(h, m)
        }
        if (e != null) {
            for (var c = 0; c < e.length; ++c) {
                if (k) {
                    $WH.ae(h, $WH.ct(" "))
                } else {
                    k = 1
                }
                var p = e[c][0];
                var f = e[c][1];
                var j = g_items.getIcon(p);
                m = $WH.ce("a");
                m.href = wowheadUrl + "/item=" + p;
                m.className = "moneyitem";
                m.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + j.toLowerCase() + ".gif)";
                $WH.ae(m, $WH.ct(f));
                $WH.ae(h, m)
            }
        }
        if (b != null) {
            for (var c = 0; c < b.length; ++c) {
                if (k) {
                    $WH.ae(h, $WH.ct(" "))
                } else {
                    k = 1
                }
                var n = b[c][0];
                var f = b[c][1];
                var j = g_gatheredcurrencies[n].icon;
                if (g == 3 && j[0] == j[1]) {
                    g = 1
                }
                m = $WH.ce("a");
                if (n > 500) {
                    m.href = wowheadUrl + "/item=" + n;
                }
                else {
                    m.href = wowheadUrl + "/currency=" + n;
                }
                m.className = "icontinyr tip q1";
                m.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + j[(g == 3 ? 1 : g - 1)].toLowerCase() + ".gif)";
                m.onmouseover = Listview.funcBox.moneyCurrencyOver.bind(m, n, f);
                m.onmousemove = $WH.Tooltip.cursorUpdate;
                m.onmouseout = $WH.Tooltip.hide;
                $WH.ae(h, m);
                if (g == 3) {
                    l = $WH.ce("span");
                    l.className = "icontinyr";
                    l.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + j[0].toLowerCase() + ".gif)";
                    $WH.ae(m, l);
                    m = l
                }
                $WH.ae(m, $WH.ct($WH.number_format(f)))
            }
        }
        if (o > 0) {
            if (k) {
                $WH.ae(h, $WH.ct(" "))
            } else {
                k = 1
            }
            m = $WH.ce("span");
            m.className = "moneyachievement tip";
            m.onmouseover = Listview.funcBox.moneyAchievementOver;
            m.onmousemove = $WH.Tooltip.cursorUpdate;
            m.onmouseout = $WH.Tooltip.hide;
            $WH.ae(m, $WH.ct($WH.number_format(o)));
            $WH.ae(h, m)
        }
    },
    getUpperSource: function (a, b) {
        switch (a) {
        case 2:
            if (b.bd) {
                return LANG.source_bossdrop
            }
            if (b.z) {
                return LANG.source_zonedrop
            }
            break;
        case 4:
            return LANG.source_quests;
        case 5:
            return LANG.source_vendors
        }
        return g_sources[a]
    },
    getLowerSource: function (a, d, c) {
        switch (a) {
        case 3:
            if (d.p && g_sources_pvp[d.p]) {
                return {
                    text: g_sources_pvp[d.p]
                }
            }
            break
        }
        switch (c) {
        case 0:
        case 1:
        case 2:
            if (d.z) {
                var b = {
                    url: wowheadUrl + "/zone=" + d.z,
                    text: g_zones[d.z]
                };
                if (d.t && a == 5) {
                    b.pretext = LANG.lvitem_vendorin
                }
                if (d.dd && d.dd != 99) {
                    if (d.dd < 0) {
                        b.posttext = $WH.sprintf(LANG.lvitem_dd, "", (d.dd < -1 ? LANG.lvitem_heroic : LANG.lvitem_normal))
                    } else {
                        b.posttext = $WH.sprintf(LANG.lvitem_dd, (d.dd & 1 ? LANG.lvitem_raid10 : LANG.lvitem_raid25), (d.dd > 2 ? LANG.lvitem_heroic : LANG.lvitem_normal))
                    }
                }
                return b
            }
            break;
        case 5:
            return {
                url: wowheadUrl + "/quests=" + d.c2 + "." + d.c,
                text: Listview.funcBox.getQuestCategory(d.c)
            };
            break;
        case 6:
            if (d.c && d.s) {
                return {
                    url: wowheadUrl + "/spells=" + d.c + "." + d.s,
                    text: g_spell_skills[d.s]
                }
            } else {
                return {
                    url: wowheadUrl + "/spells=0",
                    text: "??"
                }
            }
            break
        }
    },
    getExpansionText: function (a) {
        var b = "";
        if (a.expansion == 1) {
            b += " bc"
        } else {
            if (a.expansion == 2) {
                b += " wotlk wrath"
            } else {
                if (a.expansion == 3) {
                    b += " cat cata cataclysm"
                }
            }
        }
        return b
    }
};
Listview.templates = {
    faction: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (d, e) {
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(d);
                $WH.ae(b, $WH.ct(d.name));
                if (d.expansion) {
                    var c = $WH.ce("span");
                    c.className = g_GetExpansionClassName(d.expansion);
                    $WH.ae(c, b);
                    $WH.ae(e, c)
                } else {
                    $WH.ae(e, b)
                }
            },
            getVisibleText: function (a) {
                var b = a.name + Listview.funcBox.getExpansionText(a);
                return b
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function (a, c) {
                if (a.side && a.side != 3) {
                    var b = $WH.ce("span");
                    b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
                    b.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(c, b)
                }
            },
            getVisibleText: function (a) {
                if (a.side) {
                    return g_sides[a.side]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "standing",
            name: LANG.reputation,
            value: "standing",
            compute: function (a, b) {
                b.style.padding = 0;
                $WH.ae(b, g_createReputationBar(a.standing))
            },
            hidden: 1
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "16%",
            compute: function (d, e) {
                if (d.category2 != null) {
                    e.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                    var b = $WH.ce("a"),
                        c = wowheadUrl + "/factions=" + d.category2;
                    if (d.category) {
                        c += "." + d.category
                    }
                    b.href = c;
                    $WH.ae(b, $WH.ct(Listview.funcBox.getFactionCategory(d.category, d.category2)));
                    $WH.ae(e, b)
                }
            },
            getVisibleText: function (a) {
                return Listview.funcBox.getFactionCategory(a.category, a.category2)
            },
            sortFunc: function (d, c, f) {
                var e = Listview.funcBox.getFactionCategory;
                return $WH.strcmp(e(d.category, d.category2), e(c.category, c.category2))
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/faction=" + a.id
        }
    },
    item: {
        sort: [1],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function (q, g, o) {
                if (q.upgraded) {
                    o.className = "upgraded"
                }
                var j = $WH.ce("td");
                j.style.width = "1px";
                j.style.padding = "0";
                j.style.borderRight = "none";
                var k = null,
                    r = null;
                if (q.stack != null) {
                    k = Listview.funcBox.createTextRange(q.stack[0], q.stack[1])
                }
                if (q.avail != null) {
                    r = q.avail
                }
                if (q.id) {
                    $WH.ae(j, g_items.createIcon(q.id, (this.iconSize == null ? 1 : this.iconSize), k, r))
                }
                $WH.ae(o, j);
                g.style.borderLeft = "none";
                var p = $WH.ce("a");
                p.className = "q" + (7 - parseInt(q.name.charAt(0)));
                p.style.fontFamily = "Verdana, sans-serif";
                p.href = this.getItemLink(q);
                if (q.rel) {
                    Icon.getLink(j.firstChild).rel = q.rel;
                    p.rel = q.rel
                }
                $WH.ae(p, $WH.ct(q.name.substring(1)));
                var b = $WH.ce("div");
                $WH.ae(b, p);
                if (q.reqclass) {
                    var m = $WH.ce("div");
                    m.className = "small2";
                    var f = Listview.funcBox.assocBinFlags(q.reqclass, g_chr_classes);
                    for (var j = 0, l = f.length; j < l; ++j) {
                        if (j > 0) {
                            $WH.ae(m, $WH.ct(", "))
                        }
                        var p = $WH.ce("a");
                        p.href = wowheadUrl + "/class=" + f[j];
                        p.className = "c" + f[j];
                        $WH.st(p, g_chr_classes[f[j]]);
                        $WH.ae(m, p)
                    }
                    $WH.ae(b, m)
                }
                if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
                    if (q.source != null && q.source.length == 1) {
                        if (q.reqclass) {
                            $WH.ae(m, $WH.ct(LANG.dash))
                        } else {
                            var m = $WH.ce("div");
                            m.className = "small2"
                        }
                        var e = (q.sourcemore ? q.sourcemore[0] : {});
                        var n = 0;
                        if (e.t) {
                            n = e.t;
                            var p = $WH.ce("a");
                            if (e.q != null) {
                                p.className = "q" + e.q
                            } else {
                                p.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1")
                            }
                            p.href = wowheadUrl + "/" + g_types[e.t] + "=" + e.ti;
                            if (e.n.length <= 30) {
                                $WH.ae(p, $WH.ct(e.n))
                            } else {
                                p.title = e.n;
                                $WH.ae(p, $WH.ct($WH.trim(e.n.substr(0, 27)) + "..."))
                            }
                            $WH.ae(m, p)
                        } else {
                            $WH.ae(m, $WH.ct(Listview.funcBox.getUpperSource(q.source[0], e)))
                        }
                        var h = Listview.funcBox.getLowerSource(q.source[0], e, n);
                        if (h != null) {
                            $WH.ae(m, $WH.ct(LANG.hyphen));
                            if (h.pretext) {
                                $WH.ae(m, $WH.ct(h.pretext))
                            }
                            if (h.url) {
                                var p = $WH.ce("a");
                                p.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                                p.href = h.url;
                                $WH.ae(p, $WH.ct(h.text));
                                $WH.ae(m, p)
                            } else {
                                $WH.ae(m, $WH.ct(h.text))
                            }
                            if (h.posttext) {
                                $WH.ae(m, $WH.ct(h.posttext))
                            }
                        }
                        $WH.ae(b, m)
                    }
                }
                if (q.heroic || q.reqrace) {
                    b.style.position = "relative";
                    var m = $WH.ce("div");
                    m.className = "small";
                    m.style.fontStyle = "italic";
                    m.style.position = "absolute";
                    m.style.right = m.style.bottom = "3px";
                    if (q.heroic) {
                        var t = $WH.ce("span");
                        t.className = "q2";
                        $WH.ae(t, $WH.ct(LANG.lvitem_heroicitem));
                        $WH.ae(m, t)
                    }
                    if (q.reqrace) {
                        if ((q.reqrace & 1791) != 1101 && (q.reqrace & 1791) != 690) {
                            if (q.heroic) {
                                $WH.ae(m, $WH.ce("br"));
                                m.style.bottom = "-6px"
                            }
                            var c = Listview.funcBox.assocBinFlags(q.reqrace, g_chr_races);
                            for (var j = 0, l = c.length; j < l; ++j) {
                                if (j > 0) {
                                    $WH.ae(m, $WH.ct(", "))
                                }
                                var p = $WH.ce("a");
                                p.href = wowheadUrl + "/race=" + c[j];
                                $WH.st(p, g_chr_races[c[j]]);
                                $WH.ae(m, p)
                            }
                            m.className += (($WH.isset("g_thottbot") && g_thottbot) ? " q" : " q1")
                        }
                    }
                    $WH.ae(b, m)
                }
                $WH.ae(g, b)
            },
            getVisibleText: function (c) {
                var e = c.name.substring(1);
                if (c.heroic) {
                    e += " " + LANG.lvitem_heroicitem
                }
                if (c.reqrace) {
                    e += " " + Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(c.reqrace, g_chr_races), g_chr_races)
                }
                if (c.reqclass) {
                    e += " " + Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes), g_chr_classes)
                }
                if (typeof fi_nExtraCols == "number" && fi_nExtraCols >= 5) {
                    if (c.source != null && c.source.length == 1) {
                        var d = (c.sourcemore ? c.sourcemore[0] : {});
                        var b = 0;
                        if (d.t) {
                            b = d.t;
                            e += " " + d.n
                        } else {
                            e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
                        }
                        var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
                        if (a != null) {
                            if (a.pretext) {
                                e += " " + a.pretext
                            }
                            e += " " + a.text;
                            if (a.posttext) {
                                e += " " + a.posttext
                            }
                        }
                    }
                }
                return e
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            getMinValue: function (a) {
                return a.minlevel ? a.minlevel : a.level
            },
            getMaxValue: function (a) {
                return a.maxlevel ? a.maxlevel : a.level
            },
            compute: function (a, b) {
                if (a.minlevel && a.maxlevel) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                } else {
                    return a.level
                }
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return $WH.strcmp(d.minlevel, c.minlevel) || $WH.strcmp(d.maxlevel, c.maxlevel) || $WH.strcmp(d.level, c.level)
                } else {
                    return $WH.strcmp(d.maxlevel, c.maxlevel) || $WH.strcmp(d.minlevel, c.minlevel) || $WH.strcmp(d.level, c.level)
                }
            }
        }, {
            id: "reqlevel",
            name: LANG.req,
            tooltip: LANG.tooltip_reqlevel,
            value: "reqlevel",
            compute: function (a, b) {
                if (a.reqlevel > 1) {
                    return a.reqlevel
                }
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function (a, c) {
                if (a.side && a.side != 3) {
                    var b = $WH.ce("span");
                    b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
                    b.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(c, b)
                }
            },
            getVisibleText: function (a) {
                if (a.side) {
                    return g_sides[a.side]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "dps",
            name: LANG.dps,
            value: "dps",
            compute: function (a, b) {
                return (a.dps || 0).toFixed(1)
            },
            hidden: true
        }, {
            id: "speed",
            name: LANG.speed,
            value: "speed",
            compute: function (a, b) {
                return (a.speed || 0).toFixed(2)
            },
            hidden: true
        }, {
            id: "armor",
            name: LANG.armor,
            value: "armor",
            compute: function (a, b) {
                if (a.armor > 0) {
                    return a.armor
                }
            },
            hidden: true
        }, {
            id: "slot",
            name: LANG.slot,
            type: "text",
            compute: function (a, b) {
                $WH.nw(b);
                return g_item_slots[a.slot]
            },
            getVisibleText: function (a) {
                return g_item_slots[a.slot]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_item_slots[d.slot], g_item_slots[c.slot])
            }
        }, {
            id: "slots",
            name: LANG.slots,
            value: "nslots",
            hidden: true
        }, {
            id: "skill",
            name: LANG.skill,
            value: "skill",
            hidden: true
        }, {
            id: "glyph",
            name: LANG.glyphtype,
            type: "text",
            value: "glyph",
            compute: function (a, b) {
                if (a.glyph) {
                    return g_item_glyphs[a.glyph]
                }
            },
            getVisibleText: function (a) {
                return g_item_glyphs[a.glyph]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_item_glyphs[d.glyph], g_item_glyphs[c.glyph])
            },
            hidden: true
        }, {
            id: "source",
            name: LANG.source,
            type: "text",
            compute: function (k, d) {
                if (this.iconSize == 0) {
                    d.className = "small"
                }
                if (k.source != null) {
                    if (k.source.length == 1) {
                        $WH.nw(d);
                        var c = (k.sourcemore ? k.sourcemore[0] : {});
                        var h = 0;
                        if (c.t) {
                            h = c.t;
                            var j = $WH.ce("a");
                            if (c.q != null) {
                                j.className = "q" + c.q
                            } else {
                                j.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1")
                            }
                            j.href = wowheadUrl + "/" + g_types[c.t] + "=" + c.ti;
                            j.style.whiteSpace = "nowrap";
                            if (c.icon) {
                                j.className += " icontiny";
                                j.style.backgroundImage = 'url("' + g_staticUrl + "/images/wow/icons/tiny/" + c.icon.toLowerCase() + '.gif")'
                            }
                            $WH.ae(j, $WH.ct(c.n));
                            $WH.ae(d, j)
                        } else {
                            $WH.ae(d, $WH.ct(Listview.funcBox.getUpperSource(k.source[0], c)))
                        }
                        var f = Listview.funcBox.getLowerSource(k.source[0], c, h);
                        if (this.iconSize != 0 && f != null) {
                            var b = $WH.ce("div");
                            b.className = "small2";
                            if (f.pretext) {
                                $WH.ae(b, $WH.ct(f.pretext))
                            }
                            if (f.url) {
                                var j = $WH.ce("a");
                                j.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                                j.href = f.url;
                                $WH.ae(j, $WH.ct(f.text));
                                $WH.ae(b, j)
                            } else {
                                $WH.ae(b, $WH.ct(f.text))
                            }
                            if (f.posttext) {
                                $WH.ae(b, $WH.ct(f.posttext))
                            }
                            $WH.ae(d, b)
                        }
                    } else {
                        var l = "";
                        for (var e = 0, g = k.source.length; e < g; ++e) {
                            if (e > 0) {
                                l += LANG.comma
                            }
                            l += g_sources[k.source[e]]
                        }
                        return l
                    }
                }
            },
            getVisibleText: function (c) {
                if (c.source != null) {
                    if (c.source.length == 1) {
                        var e = "";
                        var d = (c.sourcemore ? c.sourcemore[0] : {});
                        var b = 0;
                        if (d.t) {
                            b = d.t;
                            e += " " + d.n
                        } else {
                            e += " " + Listview.funcBox.getUpperSource(c.source[0], d)
                        }
                        var a = Listview.funcBox.getLowerSource(c.source[0], d, b);
                        if (a != null) {
                            if (a.pretext) {
                                e += " " + a.pretext
                            }
                            e += " " + a.text;
                            if (a.posttext) {
                                e += " " + a.posttext
                            }
                        }
                        return e
                    } else {
                        return Listview.funcBox.arrayText(c.source, g_sources)
                    }
                }
            },
            sortFunc: function (f, d) {
                var g = Listview.funcBox.assocArrCmp(f.source, d.source, g_sources);
                if (g != 0) {
                    return g
                }
                var e = (f.sourcemore && f.source.length == 1 ? f.sourcemore[0].n : null),
                    c = (d.sourcemore && d.source.length == 1 ? d.sourcemore[0].n : null);
                return $WH.strcmp(e, c)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function (d, e) {
                e.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                $WH.nw(e);
                var b = $WH.ce("a");
                var c = Listview.funcBox.getItemType(d.classs, d.subclass, d.subsubclass);
                b.href = c.url;
                $WH.ae(b, $WH.ct(c.text));
                $WH.ae(e, b)
            },
            getVisibleText: function (a) {
                return Listview.funcBox.getItemType(a.classs, a.subclass, a.subsubclass).text
            },
            sortFunc: function (d, c, f) {
                var e = Listview.funcBox.getItemType;
                return $WH.strcmp(e(d.classs, d.subclass, d.subsubclass).text, e(c.classs, c.subclass, c.subsubclass).text)
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/item=" + a.id
        },
        onBeforeCreate: function () {
            var b = false;
            for (var c = 0, a = this.data.length; c < a; ++c) {
                var d = this.data[c];
                if ((d.slot > 0 && d.slot != 18) || ($WH.in_array(ModelViewer.validSlots, d.slotbak) >= 0 && d.displayid > 0) || d.modelviewer) {
                    ++b
                } else {
                    d.__nochk = 1
                }
            }
            if (b > 0) {
                this.mode = 1;
                this._nComparable = b
            }
        },
        createCbControls: function (g, d) {
            if (!d && this._nComparable < 15) {
                return
            }
            var c = $WH.ce("input"),
                b = $WH.ce("input"),
                f = $WH.ce("input"),
                a = $WH.ce("input"),
                e = g_user.characters ? $WH.array_filter(g_user.characters, function (h) {
                    return h.pinned
                }) : false;
            c.type = b.type = f.type = a.type = "button";
            c.value = LANG.button_compare;
            b.value = LANG.button_viewin3d;
            f.value = LANG.button_equip;
            a.value = LANG.button_deselect;
            c.onclick = this.template.compareItems.bind(this);
            b.onclick = this.template.viewIn3d.bind(this);
            a.onclick = Listview.cbSelect.bind(this, false);
            if (this._nComparable == 0 || typeof this._nComparable == "undefined") {
                c.disabled = "disabled";
                b.disabled = "disabled";
                f.disabled = "disabled";
                a.disabled = "disabled";
                e = false
            }
            $WH.ae(g, c);
            $WH.ae(g, b);
            if (e && e.length) {
                f.onclick = this.template.equipItems.bind(this, e[0]);
                $WH.ae(g, f)
            }
            $WH.ae(g, a)
        },
        compareItems: function () {
            var b = this.getCheckedRows();
            if (!b.length) {
                return
            }
            var a = "";
            $WH.array_walk(b, function (c) {
                if (c.slot == 0 || c.slot == 18) {
                    return
                }
                a += c.id + ";"
            });
            su_addToSaved($WH.rtrim(a, ";"), b.length)
        },
        viewIn3d: function () {
            var j = this.getCheckedRows();
            if (!j.length) {
                return
            }
            var g = false,
                e = false,
                f = false;
            var c = {};
            var d = null;
            $WH.array_walk(j, function (i) {
                if ($WH.in_array(ModelViewer.validSlots, i.slotbak) >= 0 && i.displayid > 0) {
                    var k = ModelViewer.slotMap[i.slotbak];
                    if (c[k]) {
                        e = true
                    }
                    c[k] = i.displayid;
                    g = true
                } else {
                    if (i.modelviewer) {
                        d = i.modelviewer
                    } else {
                        f = true
                    }
                }
            });
            var h = null;
            if (d) {
                if (g || f) {
                    h = LANG.dialog_cantdisplay
                }
                ModelViewer.show({
                    type: d.type,
                    displayId: d.displayid,
                    slot: d.slot,
                    message: h
                })
            } else {
                if (e || f) {
                    h = LANG.dialog_cantdisplay
                }
                var a = [];
                for (var b in c) {
                    a.push(parseInt(b));
                    a.push(c[b])
                }
                if (a.length > 0) {
                    ModelViewer.show({
                        type: 4,
                        equipList: a,
                        message: h
                    })
                } else {
                    alert(LANG.message_nothingtoviewin3d)
                }
            }
        },
        equipItems: function (c) {
            var b = this.getCheckedRows();
            if (!b.length) {
                return
            }
            var a = "";
            $WH.array_walk(b, function (d) {
                if (d.slot == 0 || d.slot == 18) {
                    return
                }
                a += d.id + ":"
            });
            location.href = g_getProfileUrl(c) + "&items=" + $WH.rtrim(a, ":")
        }
    },
    itemset: {
        sort: [1],
        nItemsPerPage: 75,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, g) {
                var b = $WH.ce("a");
                b.className = "q" + (7 - parseInt(c.name.charAt(0)));
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.name.substring(1)));
                var f = $WH.ce("div");
                f.style.position = "relative";
                $WH.ae(f, b);
                if (c.heroic) {
                    var e = $WH.ce("div");
                    e.className = "small q2";
                    e.style.fontStyle = "italic";
                    e.style.position = "absolute";
                    e.style.right = "3px";
                    e.style.bottom = "3px";
                    $WH.ae(e, $WH.ct(LANG.lvitem_heroicitem));
                    $WH.ae(f, e)
                }
                $WH.ae(g, f);
                if (c.note) {
                    var e = $WH.ce("div");
                    e.className = "small";
                    $WH.ae(e, $WH.ct(g_itemset_notes[c.note]));
                    $WH.ae(g, e)
                }
            },
            getVisibleText: function (a) {
                var b = a.name.substring(1);
                if (a.note) {
                    b += " " + g_itemset_notes[a.note]
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                } else {
                    return -1
                }
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return $WH.strcmp(d.minlevel, c.minlevel) || $WH.strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return $WH.strcmp(d.maxlevel, c.maxlevel) || $WH.strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "pieces",
            name: LANG.pieces,
            getValue: function (a) {
                return a.pieces.length
            },
            compute: function (a, b) {
                b.style.padding = "0";
                Listview.funcBox.createCenteredIcons(a.pieces, b)
            },
            sortFunc: function (d, c) {
                var f = (d.pieces != null ? d.pieces.length : 0);
                var e = (c.pieces != null ? c.pieces.length : 0);
                return $WH.strcmp(f, e)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function (a, b) {
                return g_itemset_types[a.type]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_itemset_types[d.type], g_itemset_types[c.type])
            }
        }, {
            id: "classes",
            name: LANG.classes,
            type: "text",
            width: "20%",
            getVisibleText: function (d) {
                var e = "";
                if (d.reqclass) {
                    var c = Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes);
                    for (var b = 0, a = c.length; b < a; ++b) {
                        if (b > 0) {
                            e += LANG.comma
                        }
                        e += g_chr_classes[c[b]]
                    }
                }
                return e
            },
            compute: function (f, h) {
                if (f.reqclass) {
                    var c = Listview.funcBox.assocBinFlags(f.reqclass, g_chr_classes);
                    var g = $WH.ce("div");
                    g.style.width = (26 * c.length) + "px";
                    g.style.margin = "0 auto";
                    for (var b = 0, a = c.length; b < a; ++b) {
                        var e = Icon.create("class_" + g_file_classes[c[b]], 0, null, wowheadUrl + "/class=" + c[b]);
                        e.style.cssFloat = e.style.styleFloat = "left";
                        $WH.ae(g, e)
                    }
                    $WH.ae(h, g)
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes), g_chr_classes)
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/itemset=" + a.id
        }
    },
    npc: {
        sort: [1],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, f) {
                if (c.boss) {
                    f.className = "icon-boss-padded"
                }
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.name));
                $WH.ae(f, b);
                if (c.tag != null) {
                    var e = $WH.ce("div");
                    e.className = "small";
                    $WH.ae(e, $WH.ct("<" + c.tag + ">"));
                    $WH.ae(f, e)
                }
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.tag) {
                    b += " <" + a.tag + ">"
                }
                if (a.boss) {
                    b += " boss skull"
                }
                return b
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(c.boss, d.boss) || $WH.strcmp(d.name, c.name)
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            width: "10%",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, c) {
                if (a.classification) {
                    var b = $WH.ce("div");
                    b.className = "small";
                    $WH.ae(b, $WH.ct(g_npc_classifications[a.classification]));
                    $WH.ae(c, b)
                }
                if (a.classification == 3) {
                    return "??"
                }
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                }
                return -1
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.classification) {
                    b += " " + g_npc_classifications[a.classification]
                }
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    b += " ";
                    if (a.minlevel != a.maxlevel) {
                        b += a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        b += a.minlevel
                    }
                }
                return b
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return $WH.strcmp(d.minlevel, c.minlevel) || $WH.strcmp(d.maxlevel, c.maxlevel) || $WH.strcmp(d.classification, c.classification)
                } else {
                    return $WH.strcmp(d.maxlevel, c.maxlevel) || $WH.strcmp(d.minlevel, c.minlevel) || $WH.strcmp(d.classification, c.classification)
                }
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function (a, b) {
                return Listview.funcBox.location(a, b)
            },
            getVisibleText: function (a) {
                return Listview.funcBox.arrayText(a.location, g_zones)
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.location, c.location, g_zones)
            }
        }, {
            id: "react",
            name: LANG.react,
            type: "text",
            width: "10%",
            value: "react",
            filtrable: 0,
            compute: function (b, g) {
                if (b.react == null) {
                    return -1
                }
                var d = [LANG.lvnpc_alliance, LANG.lvnpc_horde];
                var f = 0;
                for (var a = 0; a < 2; ++a) {
                    if (b.react[a] != null) {
                        if (f++ > 0) {
                            $WH.ae(g, $WH.ct(" "))
                        }
                        var e = $WH.ce("span");
                        e.className = (b.react[a] < 0 ? "q10" : (b.react[a] > 0 ? "q2" : "q"));
                        $WH.ae(e, $WH.ct(d[a]));
                        $WH.ae(g, e)
                    }
                }
            }
        }, {
            id: "skin",
            name: LANG.skin,
            type: "text",
            value: "skin",
            compute: function (c, d) {
                if (c.skin) {
                    var b = $WH.ce("a");
                    b.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                    b.href = wowheadUrl + "/npcs?filter=cr=35;crs=0;crv=" + c.skin;
                    $WH.ae(b, $WH.ct(c.skin));
                    $WH.ae(d, b)
                }
            },
            hidden: 1
        }, {
            id: "petfamily",
            name: LANG.petfamily,
            type: "text",
            width: "12%",
            compute: function (c, d) {
                d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                var b = $WH.ce("a");
                b.href = wowheadUrl + "/pet=" + c.family;
                $WH.ae(b, $WH.ct(g_pet_families[c.family]));
                $WH.ae(d, b)
            },
            getVisibleText: function (a) {
                return g_pet_families[a.family]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_pet_families[d.family], g_pet_families[c.family])
            },
            hidden: 1
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "12%",
            compute: function (c, d) {
                d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                var b = $WH.ce("a");
                b.href = wowheadUrl + "/npcs=" + c.type;
                $WH.ae(b, $WH.ct(g_npc_types[c.type]));
                $WH.ae(d, b)
            },
            getVisibleText: function (a) {
                return g_npc_types[a.type]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_npc_types[d.type], g_npc_types[c.type])
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/npc=" + a.id
        }
    },
    object: {
        sort: [1],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, d) {
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.name));
                $WH.ae(d, b)
            }
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function (a, b) {
                return Listview.funcBox.location(a, b)
            },
            getVisibleText: function (a) {
                return Listview.funcBox.arrayText(a.location, g_zones)
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.location, c.location, g_zones)
            }
        }, {
            id: "skill",
            name: LANG.skill,
            width: "10%",
            value: "skill",
            hidden: true
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "12%",
            compute: function (c, d) {
                d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                var b = $WH.ce("a");
                b.href = wowheadUrl + "/objects=" + c.type;
                $WH.ae(b, $WH.ct(g_object_types[c.type]));
                $WH.ae(d, b)
            },
            getVisibleText: function (a) {
                return g_object_types[a.type]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_object_types[d.type], g_object_types[c.type])
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/object=" + a.id
        }
    },
    quest: {
        sort: [1, 2],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (j, f) {
                var l = $("<a/>", {
                    css: {
                        "font-family": "Verdana, sans serif"
                    },
                    href: this.getItemLink(j),
                    text: j.name
                });
                var b = $("<div/>");
                b.append(l);
                if (j.reqclass) {
                    var k = $("<div/>", {
                        "class": "small2"
                    });
                    var e = Listview.funcBox.assocBinFlags(j.reqclass, g_chr_classes);
                    for (var g = 0, h = e.length; g < h; ++g) {
                        if (g > 0) {
                            k.append(", ")
                        }
                        var l = $("<a/>", {
                            href: wowheadUrl + "/class=" + e[g],
                            "class": "c" + e[g],
                            text: g_chr_classes[e[g]]
                        });
                        k.append(l)
                    }
                    b.append(k)
                }
                if (j.historical || (j.wflags & 32) || (j.reqrace && j.reqrace != -1)) {
                    b.css("position", "relative");
                    var k = $("<div/>", {
                        "class": "small",
                        css: {
                            "font-style": "italic",
                            position: "absolute",
                            right: "3px",
                            bottom: "3px",
                            "text-align": "right"
                        }
                    });
                    if (j.historical) {
                        var m = $("<span/>", {
                            css: {
                                color: "red"
                            },
                            text: LANG.lvquest_removed
                        });
                        k.append(m)
                    }
                    if (j.wflags & 32) {
                        if (j.historical) {
                            k.append($("<br/>"));
                            b.css("height", "33px")
                        }
                        var m = $("<span/>", {
                            text: LANG.lvquest_autoaccept
                        });
                        if (j.wflags & 64) {
                            m.css("color", "red").append(" " + LANG.lvquest_hostile)
                        }
                        k.append(m)
                    }
                    if (j.reqrace && j.reqrace != -1) {
                        var c = Listview.funcBox.assocBinFlags(j.reqrace, g_chr_races);
                        if (c.length && (j.historical || (j.wflags & 32))) {
                            k.append($("<br/>"));
                            b.css("height", "33px")
                        }
                        for (var g = 0, h = c.length; g < h; ++g) {
                            if (g > 0) {
                                k.append(", ")
                            }
                            var l = $("<a/>", {
                                "class": "q1",
                                href: wowheadUrl + "/race=" + c[g],
                                text: g_chr_races[c[g]]
                            });
                            k.append(l)
                        }
                    }
                    b.append(k)
                }
                $(f).append(b)
            }
        }, {
            id: "level",
            name: LANG.level,
            value: "level",
            compute: function (a, c) {
                if (a.type || a.daily || a.weekly) {
                    var b = $WH.ce("div");
                    b.className = "small";
                    $WH.nw(b);
                    if (a.daily) {
                        if (a.type) {
                            $WH.ae(b, $WH.ct($WH.sprintf(LANG.lvquest_daily, g_quest_types[a.type])))
                        } else {
                            $WH.ae(b, $WH.ct(LANG.daily))
                        }
                    } else {
                        if (a.weekly) {
                            if (a.type) {
                                $WH.ae(b, $WH.ct($WH.sprintf(LANG.lvquest_weekly, g_quest_types[a.type])))
                            } else {
                                $WH.ae(b, $WH.ct(LANG.weekly))
                            }
                        } else {
                            if (a.type) {
                                $WH.ae(b, $WH.ct(g_quest_types[a.type]))
                            }
                        }
                    }
                    $WH.ae(c, b)
                }
                return a.level
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.type) {
                    b += " " + g_quest_types[a.type]
                }
                if (a.daily) {
                    b += " " + LANG.daily
                } else {
                    if (a.weekly) {
                        b += " " + LANG.weekly
                    }
                }
                if (a.level) {
                    b += " " + a.level
                }
                return b
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(d.level, c.level) || $WH.strcmp(d.type, c.type)
            }
        }, {
            id: "reqlevel",
            name: LANG.req,
            tooltip: LANG.tooltip_reqlevel,
            value: "reqlevel"
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function (a, c) {
                if (a.side && a.side != 3) {
                    var b = $WH.ce("span");
                    b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
                    b.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(c, b)
                } else {
                    if (!a.side) {
                        $WH.ae(c, $WH.ct("??"))
                    }
                }
            },
            getVisibleText: function (a) {
                if (a.side) {
                    return g_sides[a.side]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "rewards",
            name: LANG.rewards,
            compute: function (b, g) {
                var a = (b.itemchoices != null || b.itemrewards != null);
                if (a) {
                    var f, e;
                    if (b.itemchoices && b.itemchoices.length > 1) {
                        f = LANG.lvquest_pickone;
                        if (b.itemrewards && b.itemrewards.length > 0) {
                            e = LANG.lvquest_alsoget
                        }
                    }
                    Listview.funcBox.createCenteredIcons(b.itemchoices, g, f, 2);
                    Listview.funcBox.createCenteredIcons(b.itemrewards, g, e, 2)
                }
                if (b.titlereward && g_titles[b.titlereward]) {
                    var d = g_titles[b.titlereward]["name_" + Locale.getName()];
                    d = d.replace("%s", '<span class="q0">&lt;' + LANG.name + "&gt;</span>");
                    var c = $WH.ce("a");
                    c.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                    c.href = wowheadUrl + "/title=" + b.titlereward;
                    c.innerHTML = d;
                    $WH.ae(g, c);
                    $WH.ae(g, $WH.ce("br"))
                }
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.itemchoices && a.itemchoices.length) {
                    b += " " + LANG.lvquest_pickone;
                    if (a.itemrewards && a.itemrewards.length) {
                        b += " " + LANG.lvquest_alsoget
                    }
                }
                if (a.titlereward && g_titles[a.titlereward]) {
                    b += " " + g_titles[a.titlereward]["name_" + Locale.getName()]
                }
                return b
            },
            sortFunc: function (d, c, f) {
                var i = (d.itemchoices != null ? d.itemchoices.length : 0) + (d.itemrewards != null ? d.itemrewards.length : 0);
                var h = (c.itemchoices != null ? c.itemchoices.length : 0) + (c.itemrewards != null ? c.itemrewards.length : 0);
                var e = (d.titlereward && g_titles[d.titlereward] ? g_titles[d.titlereward]["name_" + Locale.getName()] : "");
                var g = (c.titlereward && g_titles[c.titlereward] ? g_titles[c.titlereward]["name_" + Locale.getName()] : "");
                return $WH.strcmp(i, h) || $WH.strcmp(e, g)
            }
        }, {
            id: "experience",
            name: LANG.exp,
            value: "xp"
        }, {
            id: "money",
            name: LANG.money,
            compute: function (a, b) {
                if (a.money > 0 || a.currencyrewards != null) {
                    if (a.money > 0) {
                        Listview.funcBox.appendMoney(b, a.money);
                        if (a.currencyrewards != null) {
                            $WH.ae(b, $WH.ct(" + "))
                        }
                    }
                    if (a.currencyrewards != null) {
                        Listview.funcBox.appendMoney(b, null, a.side, null, a.currencyrewards)
                    }
                }
            },
            getVisibleText: function (a) {
                var c = "";
                for (var b = 0; b < a.currencyrewards.length; ++b) {
                    if (g_gatheredcurrencies[a.currencyrewards[b][0]]) {
                        c += " " + g_gatheredcurrencies[a.currencyrewards[b][0]]["name_" + Locale.getName()]
                    }
                }
                return c
            },
            sortFunc: function (d, c, e) {
                var g = 0,
                    f = 0;
                if (d.currencyrewards && d.currencyrewards.length) {
                    $.each(d.currencyrewards, function (a, b) {
                        g += b[1]
                    })
                }
                if (c.currencyrewards && c.currencyrewards.length) {
                    $.each(c.currencyrewards, function (a, b) {
                        f += b[1]
                    })
                }
                return $WH.strcmp(g, f) || $WH.strcmp(d.money, c.money)
            }
        }, {
            id: "reputation",
            name: LANG.reputation,
            width: "14%",
            value: "id",
            hidden: true
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            compute: function (c, d) {
                if (c.category != 0) {
                    d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                    var b = $WH.ce("a");
                    b.href = wowheadUrl + "/quests=" + c.category2 + "." + c.category;
                    $WH.ae(b, $WH.ct(Listview.funcBox.getQuestCategory(c.category)));
                    $WH.ae(d, b)
                }
            },
            getVisibleText: function (a) {
                return Listview.funcBox.getQuestCategory(a.category)
            },
            sortFunc: function (d, c, f) {
                var e = Listview.funcBox.getQuestCategory;
                return $WH.strcmp(e(d.category), e(c.category))
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/quest=" + a.id
        }
    },
    skill: {
        sort: [1],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function (c, h, f) {
                var d = $WH.ce("td");
                d.style.width = "1px";
                d.style.padding = "0";
                d.style.borderRight = "none";
                $WH.ae(d, Icon.create(c.icon, 0, null, this.getItemLink(c)));
                $WH.ae(f, d);
                h.style.borderLeft = "none";
                var g = $WH.ce("div");
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.name));
                if (c.expansion) {
                    var e = $WH.ce("span");
                    e.className = g_GetExpansionClassName(c.expansion);
                    $WH.ae(e, b);
                    $WH.ae(g, e)
                } else {
                    $WH.ae(g, b)
                }
                $WH.ae(h, g)
            },
            getVisibleText: function (a) {
                var b = a.name + Listview.funcBox.getExpansionText(a);
                return b
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "16%",
            compute: function (c, d) {
                if (c.category != 0) {
                    d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                    var b = $WH.ce("a");
                    b.href = wowheadUrl + "/skills=" + c.category;
                    $WH.ae(b, $WH.ct(g_skill_categories[c.category]));
                    $WH.ae(d, b)
                }
            },
            getVisibleText: function (a) {
                return g_skill_categories[skill.category]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_skill_categories[d.category], g_skill_categories[c.category])
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/skill=" + a.id
        }
    },
    spell: {
        sort: ["name", "skill", "level"],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function (j, g, m) {
                var h = $WH.ce("td"),
                    p;
                h.style.width = "44px";
                h.style.padding = "0";
                h.style.borderRight = "none";
                if (j.creates != null) {
                    p = g_items.createIcon(j.creates[0], 1, Listview.funcBox.createTextRange(j.creates[1], j.creates[2]))
                } else {
                    p = g_spells.createIcon(j.id, 1)
                }
                p.style.cssFloat = p.style.styleFloat = "left";
                $WH.ae(h, p);
                $WH.ae(m, h);
                g.style.borderLeft = "none";
                var b = $WH.ce("div");
                var o = $WH.ce("a");
                var n = j.name.charAt(0);
                if (n != "@") {
                    o.className = "q" + (7 - parseInt(n))
                }
                o.style.fontFamily = "Verdana, sans-serif";
                o.href = this.getItemLink(j);
                $WH.ae(o, $WH.ct(j.name.substring(1)));
                $WH.ae(b, o);
                if (j.rank) {
                    var l = $WH.ce("div");
                    l.className = "small2";
                    $WH.ae(l, $WH.ct(j.rank));
                    $WH.ae(b, l)
                }
                if (this.showRecipeClass && j.reqclass) {
                    var l = $WH.ce("div");
                    l.className = "small2";
                    var f = Listview.funcBox.assocBinFlags(j.reqclass, g_chr_classes);
                    for (var h = 0, k = f.length; h < k; ++h) {
                        if (h > 0) {
                            $WH.ae(l, $WH.ct(", "))
                        }
                        var o = $WH.ce("a");
                        o.href = wowheadUrl + "/class=" + f[h];
                        o.className = "c" + f[h];
                        $WH.st(o, g_chr_classes[f[h]]);
                        $WH.ae(l, o)
                    }
                    $WH.ae(b, l)
                }
                if (j.reqrace) {
                    b.style.position = "relative";
                    var l = $WH.ce("div");
                    l.className = "small";
                    l.style.fontStyle = "italic";
                    l.style.position = "absolute";
                    l.style.right = l.style.bottom = "3px";
                    if ((j.reqrace & 1791) == 1101) {
                        $WH.ae(l, $WH.ct(g_sides[1]))
                    } else {
                        if ((j.reqrace & 1791) == 690) {
                            $WH.ae(l, $WH.ct(g_sides[2]))
                        } else {
                            var e = Listview.funcBox.assocBinFlags(j.reqrace, g_chr_races);
                            l.className += (($WH.isset("g_thottbot") && g_thottbot) ? " q" : " q1");
                            for (var h = 0, k = e.length; h < k; ++h) {
                                if (h > 0) {
                                    $WH.ae(l, $WH.ct(LANG.comma))
                                }
                                var o = $WH.ce("a");
                                o.href = wowheadUrl + "/race=" + e[h];
                                $WH.st(o, g_chr_races[e[h]]);
                                $WH.ae(l, o)
                            }
                        }
                    }
                    $WH.ae(b, l)
                }
                $WH.ae(g, b)
            },
            getVisibleText: function (b) {
                var e = b.name;
                if (b.rank) {
                    e += " " + b.rank
                }
                if (b.reqclass) {
                    var d = Listview.funcBox.assocBinFlags(b.reqclass, g_chr_classes);
                    for (var c = 0, a = d.length; c < a; ++c) {
                        if (c > 0) {
                            e += LANG.comma
                        }
                        e += g_chr_classes[d[c]]
                    }
                }
                if (b.reqrace) {
                    e += " " + Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(b.reqrace, g_chr_races), g_chr_races)
                }
                return e
            }
        }, {
            id: "tier",
            name: LANG.tier,
            width: "10%",
            value: "level",
            compute: function (b, d) {
                if (b.level > 0) {
                    var a = (!this._petTalents ? 10 : 20),
                        c = (!this._petTalents ? 5 : 12);
                    return Math.floor((b.level - a) / c) + 1
                }
            },
            hidden: true
        }, {
            id: "level",
            name: LANG.level,
            width: "10%",
            value: "level",
            compute: function (a, b) {
                if (a.level > 0) {
                    return a.level
                }
            },
            hidden: true
        }, {
            id: "trainingcost",
            name: LANG.cost,
            width: "10%",
            hidden: true,
            getValue: function (a) {
                if (a.trainingcost) {
                    return a.trainingcost
                }
            },
            compute: function (a, b) {
                if (a.trainingcost) {
                    Listview.funcBox.appendMoney(b, a.trainingcost)
                }
            },
            sortFunc: function (d, c, e) {
                if (d.trainingcost == null) {
                    return -1
                } else {
                    if (c.trainingcost == null) {
                        return 1
                    }
                }
                if (d.trainingcost < c.trainingcost) {
                    return -1
                } else {
                    if (d.trainingcost > c.trainingcost) {
                        return 1
                    }
                }
                return 0
            }
        }, {
            id: "classes",
            name: LANG.classes,
            type: "text",
            hidden: true,
            width: "20%",
            getVisibleText: function (b) {
                var e = "";
                if (b.reqclass) {
                    var d = Listview.funcBox.assocBinFlags(b.reqclass, g_chr_classes);
                    for (var c = 0, a = d.length; c < a; ++c) {
                        if (c > 0) {
                            e += LANG.comma
                        }
                        e += g_chr_classes[d[c]]
                    }
                }
                return e
            },
            compute: function (b, h) {
                if (b.reqclass) {
                    var e = Listview.funcBox.assocBinFlags(b.reqclass, g_chr_classes);
                    var g = $WH.ce("div");
                    g.style.width = (26 * e.length) + "px";
                    g.style.margin = "0 auto";
                    for (var c = 0, a = e.length; c < a; ++c) {
                        var f = Icon.create("class_" + g_file_classes[e[c]], 0, null, wowheadUrl + "/class=" + e[c]);
                        f.style.cssFloat = f.style.styleFloat = "left";
                        $WH.ae(g, f)
                    }
                    $WH.ae(h, g)
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes), g_chr_classes)
            }
        }, {
            id: "singleclass",
            name: LANG.classs,
            type: "text",
            hidden: true,
            width: "15%",
            compute: function (a, e) {
                if (a.reqclass) {
                    var b = Listview.funcBox.assocBinFlags(a.reqclass, g_chr_classes);
                    var c = b[0];
                    var d = $("<a>").css("background-image", 'url("' + g_staticUrl + "/images/wow/icons/tiny/class_" + g_file_classes[c] + '.gif")').addClass("icontiny").addClass("c" + c).attr("href", "/class=" + c).text(g_chr_classes[c]);
                    $(e).append(d)
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.reqclass, g_chr_classes), Listview.funcBox.assocBinFlags(c.reqclass, g_chr_classes), g_chr_classes)
            }
        }, {
            id: "glyphtype",
            name: LANG.glyphtype,
            type: "text",
            hidden: true,
            width: "10%",
            compute: function (a, b) {
                if (a.glyphtype) {
                    return g_item_glyphs[a.glyphtype]
                }
            }
        }, {
            id: "guildlevel",
            name: LANG.guildlevel,
            width: "10%",
            value: "guildlevel",
            compute: function (a, b) {
                if (a.guildlevel > 0) {
                    return a.guildlevel
                }
            },
            hidden: true
        }, {
            id: "schools",
            name: LANG.school,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function (a, e) {
                var d = "";
                var c = a.schools ? a.schools : a.school;
                for (var b = 0; b < 32; ++b) {
                    if (!(c & (1 << b))) {
                        continue
                    }
                    if (d != "") {
                        d += ", "
                    }
                    d += g_spell_resistances[b]
                }
                return d
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(this.compute(d), this.compute(c))
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function (a, b) {
                if (g_spell_types[a.cat]) {
                    return g_spell_types[a.cat][a.type]
                }
                return a.type
            },
            sortFunc: function (d, c, e) {
                var g = (g_spell_types[d.cat] ? g_spell_types[d.cat][d.type] : d.type),
                    f = (g_spell_types[c.cat] ? g_spell_types[c.cat][c.type] : d.type);
                return $WH.strcmp(d.cat, c.cat) || $WH.strcmp(g, f)
            }
        }, {
            id: "reagents",
            name: LANG.reagents,
            width: "9%",
            getValue: function (a) {
                return (a.reagents ? a.reagents.length : 0)
            },
            compute: function (g, c) {
                var a = (g.reagents != null);
                if (a) {
                    c.style.padding = "0";
                    var k = $WH.ce("div");
                    var j = g.reagents;
                    k.style.width = (44 * j.length) + "px";
                    k.style.margin = "0 auto";
                    for (var e = 0, h = j.length; e < h; ++e) {
                        var b = j[e][0];
                        var f = j[e][1];
                        var l = g_items.createIcon(b, 1, f);
                        l.style.cssFloat = l.style.styleFloat = "left";
                        $WH.ae(k, l)
                    }
                    $WH.ae(c, k)
                }
            },
            sortFunc: function (d, c) {
                var f = (d.reagents != null ? d.reagents.length : 0);
                var e = (c.reagents != null ? c.reagents.length : 0);
                if (f > 0 && f == e) {
                    return $WH.strcmp(d.reagents.toString(), c.reagents.toString())
                } else {
                    return $WH.strcmp(f, e)
                }
            }
        }, {
            id: "source",
            name: LANG.source,
            type: "text",
            width: "12%",
            hidden: true,
            compute: function (b, e) {
                if (b.source != null) {
                    var d = "";
                    for (var c = 0, a = b.source.length; c < a; ++c) {
                        if (c > 0) {
                            d += LANG.comma
                        }
                        d += g_sources[b.source[c]]
                    }
                    return d
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(d.source, c.source, g_sources)
            }
        }, {
            id: "branch",
            name: LANG.branch,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function (a, b) {
                if (a.project) {
                    if (g_project_branches[a.project.branch]) {
                        $(b).append(g_project_branches[a.project.branch] + "<br />")
                    }
                    $(b).append("<small" + (!a.project.rarity ? ' class="q0"' : "") + ">" + g_project_rarity[a.project.rarity || 0] + "</small>")
                }
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.project) {
                    if (g_project_branches[a.project.branch]) {
                        b += g_project_branches[a.project.branch] + " "
                    }
                    b += g_project_rarity[a.project.rarity || 0]
                }
                return b
            },
            sortFunc: function (d, c, e) {
                if (!d.project || !c.project) {
                    return (d.project ? 1 : (c.project ? -1 : 0))
                }
                return $WH.strcmp(g_project_branches[d.project.branch], g_project_branches[c.project.branch]) || -$WH.strcmp(d.project.rarity, c.project.rarity)
            }
        }, {
            id: "fragments",
            name: LANG.fragments,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function (a, c) {
                if (a.project) {
                    var b = $("<a/>", {
                        href: wowheadUrl + "/currency=" + a.project.currency,
                        text: a.project.ncurrency
                    });
                    b.addClass("q1");
                    if (g_gatheredcurrencies[a.project.currency]) {
                        b.addClass("icontinyr tip");
                        b.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/" + g_gatheredcurrencies[a.project.currency].icon[0].toLowerCase() + ".gif)");
                        b.mouseover(function (d) {
                            $WH.Tooltip.showAtCursor(d, g_gatheredcurrencies[a.project.currency]["name_" + Locale.getName()], 0, 0, "q")
                        });
                        b.mousemove($WH.Tooltip.cursorUpdate);
                        b.mouseout($WH.Tooltip.hide)
                    }
                    $(c).append(b)
                }
            },
            sortFunc: function (d, c, e) {
                if (!d.project || !c.project) {
                    return (d.project ? 1 : (c.project ? -1 : 0))
                }
                return $WH.strcmp(d.project.ncurrency, c.project.ncurrency) || $WH.strcmp(d.project.currency, c.project.currency)
            }
        }, {
            id: "keystone",
            name: LANG.keystone,
            type: "text",
            width: "10%",
            hidden: true,
            compute: function (a, c) {
                if (a.project && a.project.nkeystones && g_items[a.project.keystone]) {
                    c.style.padding = "0";
                    var b = $WH.ce("div");
                    b.style.width = "44px";
                    b.style.margin = "0 auto";
                    $WH.ae(b, g_items.createIcon(a.project.keystone, 1, a.project.nkeystones));
                    $WH.ae(c, b)
                }
            },
            getVisibleText: function (a) {
                if (a.project && a.project.nkeystones && g_items[a.project.keystone]) {
                    return g_items[a.project.keystone]["name_" + Locale.getName()]
                }
            },
            sortFunc: function (d, c, g) {
                if (!d.project || !c.project) {
                    return (d.project ? 1 : (c.project ? -1 : 0))
                }
                var f = d.project.nkeystones && g_items[d.project.keystone] ? g_items[d.project.keystone]["name_" + Locale.getName()] : "";
                var e = c.project.nkeystones && g_items[c.project.keystone] ? g_items[c.project.keystone]["name_" + Locale.getName()] : "";
                return $WH.strcmp(f, e) || $WH.strcmp(d.project.nkeystones, c.project.nkeystones)
            }
        }, {
            id: "skill",
            name: LANG.skill,
            type: "text",
            width: "16%",
            getValue: function (a) {
                return a.learnedat
            },
            compute: function (j, g, m, r) {
                if (j.skill != null) {
                    this.skillsColumn = r;
                    var c = $WH.ce("div");
                    c.className = "small";
                    if (j.cat == -7 && j.pettype != null) {
                        j.skill = [];
                        var q = {
                            0: 410,
                            1: 409,
                            2: 411
                        };
                        for (var h = 0, k = j.pettype.length; h < k; ++h) {
                            j.skill.push(q[j.pettype[h]])
                        }
                    }
                    for (var h = 0, k = j.skill.length; h < k; ++h) {
                        if (h > 0) {
                            $WH.ae(c, $WH.ct(LANG.comma))
                        }
                        if (j.skill[h] == -1) {
                            $WH.ae(c, $WH.ct(LANG.ellipsis))
                        } else {
                            if ($WH.in_array([7, -2, -3, -5, -6, -7, 11, 9], j.cat) != -1) {
                                var o = $WH.ce("a");
                                o.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                                if ($WH.in_array([-5, -6], j.cat) != -1) {
                                    o.href = wowheadUrl + "/spells=" + j.cat
                                } else {
                                    o.href = wowheadUrl + "/spells=" + j.cat + "." + ((j.reqclass && (j.cat == 7 || j.cat == -2)) ? (1 + Math.log(j.reqclass) / Math.LN2) + "." : "") + j.skill[h]
                                }
                                var e = $WH.g_getGets();
                                var f = (e.spells ? e.spells.split(".") : [false, false]);
                                if (j.reqclass && (j.cat == 7 || j.cat == -2)) {
                                    if (h < 1 && ((1 + Math.log(j.reqclass) / Math.LN2) != f[1])) {
                                        var b = $WH.ce("a");
                                        b.className = "q0";
                                        b.href = wowheadUrl + "/spells=" + j.cat + "." + (1 + Math.log(j.reqclass) / Math.LN2);
                                        $WH.ae(b, $WH.ct(g_chr_classes[(1 + Math.log(j.reqclass) / Math.LN2)]));
                                        $WH.ae(c, b);
                                        $WH.ae(c, $WH.ce("br"))
                                    }
                                }
                                $WH.ae(o, $WH.ct(j.cat == -7 && j.pettype != null ? g_pet_types[j.pettype[h]] : g_spell_skills[j.skill[h]]));
                                $WH.ae(c, o)
                            } else {
                                $WH.ae(c, $WH.ct(g_spell_skills[j.skill[h]]))
                            }
                        }
                    }
                    if (j.learnedat > 0) {
                        $WH.ae(c, $WH.ct(" ("));
                        var d = $WH.ce("span");
                        if (j.learnedat == 9999) {
                            d.className = "q0";
                            $WH.ae(d, $WH.ct("??"))
                        } else {
                            if (j.learnedat > 0) {
                                $WH.ae(d, $WH.ct(j.learnedat));
                                d.style.fontWeight = "bold"
                            }
                        }
                        $WH.ae(c, d);
                        $WH.ae(c, $WH.ct(")"))
                    }
                    $WH.ae(g, c);
                    if (j.colors != null) {
                        this.columns[r].type = null;
                        var l = j.colors,
                            p = 0;
                        for (var h = 0; h < l.length; ++h) {
                            if (l[h] > 0) {
                                ++p;
                                break
                            }
                        }
                        if (p > 0) {
                            p = 0;
                            c = $WH.ce("div");
                            c.className = "small";
                            c.style.fontWeight = "bold";
                            for (var h = 0; h < l.length; ++h) {
                                if (l[h] > 0) {
                                    if (p++ > 0) {
                                        $WH.ae(c, $WH.ct(" "))
                                    }
                                    var n = $WH.ce("span");
                                    n.className = "r" + (h + 1);
                                    $WH.ae(n, $WH.ct(l[h]));
                                    $WH.ae(c, n)
                                }
                            }
                            $WH.ae(g, c)
                        }
                    }
                }
            },
            getVisibleText: function (a) {
                var b = Listview.funcBox.arrayText(a.skill, g_spell_skills);
                if (a.learnedat > 0) {
                    b += " " + (a.learnedat == 9999 ? "??" : a.learnedat)
                }
                return b
            },
            sortFunc: function (e, c) {
                if (e.reqclass && c.reqclass) {
                    var h = $WH.strcmp(g_chr_classes[(1 + Math.log(e.reqclass) / Math.LN2)], g_chr_classes[(1 + Math.log(c.reqclass) / Math.LN2)]);
                    if (h) {
                        return h
                    }
                }
                var d = [e.learnedat, c.learnedat];
                for (var g = 0; g < 2; ++g) {
                    var j = (g == 0 ? e : c);
                    if (d[g] == 9999 && j.colors != null) {
                        var f = 0;
                        while (j.colors[f] == 0 && f < j.colors.length) {
                            f++
                        }
                        if (f < j.colors.length) {
                            d[g] = j.colors[f]
                        }
                    }
                }
                var k = $WH.strcmp(d[0], d[1]);
                if (k != 0) {
                    return k
                }
                if (e.colors != null && c.colors != null) {
                    for (var f = 0; f < 4; ++f) {
                        k = $WH.strcmp(e.colors[f], c.colors[f]);
                        if (k != 0) {
                            return k
                        }
                    }
                }
                if (e.pettype != null & c.pettype != null) {
                    return Listview.funcBox.assocArrCmp(e.pettype, c.pettype, g_pet_types)
                }
                return Listview.funcBox.assocArrCmp(e.skill, c.skill, g_spell_skills)
            }
        }, {
            id: "skillup",
            name: LANG.skillpoints,
            width: "10%",
            value: "nskillup",
            compute: function (a, b) {
                if (a.nskillup > 0) {
                    return a.nskillup
                }
            },
            hidden: true
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/spell=" + a.id
        }
    },
    zone: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (c, e) {
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.name));
                if (c.expansion) {
                    var d = $WH.ce("span");
                    d.className = g_GetExpansionClassName(c.expansion);
                    $WH.ae(d, b);
                    $WH.ae(e, d)
                } else {
                    $WH.ae(e, b)
                }
            },
            getVisibleText: function (a) {
                var b = a.name + Listview.funcBox.getExpansionText(a);
                if (a.instance == 5 || a.instance == 8) {
                    b += " heroic"
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            width: "10%",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                }
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return $WH.strcmp(d.minlevel, c.minlevel) || $WH.strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return $WH.strcmp(d.maxlevel, c.maxlevel) || $WH.strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "players",
            name: LANG.players,
            type: "text",
            hidden: true,
            compute: function (a, d) {
                if (a.instance > 0) {
                    var b = $WH.ce("span");
                    if (a.nplayers == -2) {
                        a.nplayers = "10/25"
                    }
                    var c = "";
                    if (a.nplayers) {
                        if (a.instance == 4) {
                            c += $WH.sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
                        } else {
                            c += $WH.sprintf(LANG.lvzone_xman, a.nplayers)
                        }
                    }
                    $WH.ae(b, $WH.ct(c));
                    $WH.ae(d, b)
                }
            },
            getVisibleText: function (a) {
                if (a.instance > 0) {
                    if (a.nplayers == -2) {
                        a.nplayers = "10/25"
                    }
                    var b = "";
                    if (a.nplayers && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
                        if (a.instance == 4) {
                            b += $WH.sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
                        } else {
                            b += $WH.sprintf(LANG.lvzone_xman, a.nplayers)
                        }
                    }
                    return b
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(d.nplayers, c.nplayers)
            }
        }, {
            id: "territory",
            name: LANG.territory,
            type: "text",
            width: "13%",
            compute: function (a, c) {
                var b = $WH.ce("span");
                switch (a.territory) {
                case 0:
                    b.className = "icon-alliance";
                    break;
                case 1:
                    b.className = "icon-horde";
                    break;
                case 4:
                    b.className = "icon-ffa";
                    break
                }
                $WH.ae(b, $WH.ct(g_zone_territories[a.territory]));
                $WH.ae(c, b)
            },
            getVisibleText: function (a) {
                return g_zone_territories[a.territory]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_zone_territories[d.territory], g_zone_territories[c.territory])
            }
        }, {
            id: "instancetype",
            name: LANG.instancetype,
            type: "text",
            compute: function (a, e) {
                if (a.instance > 0) {
                    var b = $WH.ce("span");
                    if ((a.instance >= 1 && a.instance <= 5) || a.instance == 7 || a.instance == 8) {
                        b.className = "icon-instance" + a.instance
                    }
                    var d = g_zone_instancetypes[a.instance];
                    if (a.heroicLevel) {
                        var c = $WH.ce("span");
                        c.className = "icon-heroic";
                        g_addTooltip(c, LANG.tooltip_heroicmodeavailable + LANG.qty.replace("$1", a.heroicLevel));
                        $WH.ae(e, c)
                    }
                    $WH.ae(b, $WH.ct(d));
                    $WH.ae(e, b)
                }
            },
            getVisibleText: function (a) {
                if (a.instance > 0) {
                    var b = g_zone_instancetypes[a.instance];
                    if (a.nplayers && ((a.instance != 2 && a.instance != 5) || a.nplayers > 5)) {
                        if (a.instance == 4) {
                            b += " " + $WH.sprintf(LANG.lvzone_xvx, a.nplayers, a.nplayers)
                        } else {
                            b += " " + $WH.sprintf(LANG.lvzone_xman, a.nplayers)
                        }
                    }
                    if (a.instance == 5 || a.instance == 8) {
                        b += " heroic"
                    }
                    return b
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_zone_instancetypes[d.instance], g_zone_instancetypes[c.instance]) || $WH.strcmp(d.instance, c.instance) || $WH.strcmp(d.nplayers, c.nplayers)
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function (c, d) {
                d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                var b = $WH.ce("a");
                b.href = wowheadUrl + "/zones=" + c.category;
                $WH.ae(b, $WH.ct(g_zone_categories[c.category]));
                $WH.ae(d, b)
            },
            getVisibleText: function (a) {
                return g_zone_categories[a.category]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_zone_categories[d.category], g_zone_categories[c.category])
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/zone=" + a.id
        }
    },
    holiday: {
        sort: [2, 1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function (c, f, e) {
                var d = $WH.ce("td");
                d.style.width = "1px";
                d.style.padding = "0";
                d.style.borderRight = "none";
                $WH.ae(d, g_holidays.createIcon(c.id, 0));
                $WH.ae(e, d);
                f.style.borderLeft = "none";
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.name));
                $WH.ae(f, b)
            },
            getVisibleText: function (a) {
                return a.name
            }
        }, {
            id: "date",
            name: LANG.date,
            type: "text",
            width: "16%",
            allText: true,
            compute: function (b, g, d) {
                if (b.startDate && b.endDate) {
                    var e = Listview.funcBox.getEventNextDates(b.startDate, b.endDate, b.rec || 0);
                    if (e[0] && e[1]) {
                        var f = g_formatDateSimple(e[0]),
                            a = g_formatDateSimple(e[1]),
                            c = $WH.ce("span");
                        if (f != a) {
                            $WH.st(c, f + LANG.hyphen + a)
                        } else {
                            $WH.st(c, f)
                        }
                        $WH.ae(g, c);
                        if (e[0] <= g_serverTime && e[1] >= g_serverTime) {
                            d.className = "checked";
                            c.className = "q2 tip";
                            g_addTooltip(c, LANG.tooltip_activeholiday, "q")
                        }
                    }
                }
            },
            getVisibleText: function (b) {
                if (b.startDate && b.endDate) {
                    var c = Listview.funcBox.getEventNextDates(b.startDate, b.endDate, b.rec || 0);
                    if (c[0] && c[1]) {
                        var d = g_formatDateSimple(c[0]),
                            a = g_formatDateSimple(c[1]);
                        if (d != a) {
                            return d + LANG.hyphen + a
                        } else {
                            return d
                        }
                    }
                }
                return ""
            },
            sortFunc: function (e, c, g) {
                if (e.startDate && c.startDate) {
                    var d = Listview.funcBox.getEventNextDates(e.startDate, e.endDate, e.rec || 0);
                    var f = Listview.funcBox.getEventNextDates(c.startDate, c.endDate, c.rec || 0);
                    if (d[0] && f[0]) {
                        return d[0] - f[0]
                    }
                } else {
                    if (e.startDate) {
                        return -1
                    } else {
                        if (c.startDate) {
                            return 1
                        }
                    }
                }
                return 0
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "16%",
            compute: function (d, e) {
                e.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                var b = $WH.ce("a"),
                    c = wowheadUrl + "/events=" + d.category;
                b.href = c;
                $WH.ae(b, $WH.ct(g_holiday_categories[d.category]));
                $WH.ae(e, b)
            },
            getVisibleText: function (a) {
                return g_holiday_categories[a.category]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_holiday_categories[d.category], g_holiday_categories[c.category])
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/event=" + a.id
        }
    },
    holidaycal: {
        sort: [1],
        mode: 4,
        startOnMonth: new Date(g_serverTime.getFullYear(), 0, 1),
        nMonthsToDisplay: 12,
        rowOffset: g_serverTime.getMonth(),
        poundable: 2,
        columns: [],
        compute: function (a, d, b) {
            if (!a.events || !a.events.length) {
                return
            }
            for (var b = 0; b < a.events.length; ++b) {
                var c = g_holidays.createIcon(a.events[b].id, 1);
                c.onmouseover = Listview.funcBox.dateEventOver.bind(c, a.date, a.events[b]);
                c.onmousemove = $WH.Tooltip.cursorUpdate;
                c.onmouseout = $WH.Tooltip.hide;
                c.style.cssFloat = c.style.styleFloat = "left";
                $WH.ae(d, c)
            }
        },
        sortFunc: function (f, c) {
            if (f.startDate && c.startDate) {
                var e = Listview.funcBox.getEventNextDates(f.startDate, f.endDate, f.rec || 0);
                var h = Listview.funcBox.getEventNextDates(c.startDate, c.endDate, c.rec || 0);
                for (var j = 0; j < 2; ++j) {
                    var g = e[j],
                        d = h[j];
                    if (g.getFullYear() == d.getFullYear() && g.getMonth() == d.getMonth() && g.getDate() == d.getDate()) {
                        return g - d
                    }
                }
            }
            return $WH.strcmp(f.name, c.name)
        }
    },
    comment: {
        sort: [1],
        mode: 2,
        nItemsPerPage: 40,
        poundable: 2,
        columns: [{
            value: "number"
        }, {
            value: "id"
        }, {
            value: "rating"
        }],
        compute: function (J, ac, ab) {
            var ag, I = new Date(J.date),
                Y = (g_serverTime - I) / 1000,
                h = (g_user.roles & U_GROUP_COMMENTS_MODERATOR) != 0,
                ad = J.rating < 0 || J.purged || J.deleted || (J.__minPatch && g_getPatchVersion.T[J.__minPatch] > I),
                U = h || (J.user.toLowerCase() == g_user.name.toLowerCase() && !g_user.commentban),
                L = U && J.deleted == 0,
                d = U && J.replyTo != J.id,
                ae = true,
                W = J.purged == 0 && J.deleted == 0 && g_user.id && J.user.toLowerCase() != g_user.name.toLowerCase() && $WH.in_array(J.raters, g_user.id, function (i) {
                    return i[0]
                }) == -1 && !g_user.ratingban,
                p = J.rating >= 0 && (g_user.id == 0 || W || g_user.ratingban),
                G = g_users[J.user];
            J.ratable = W;
            var aa = ac;
            var N = $WH.ce("div");
            var z = $WH.ce("div");
            var t = $WH.ce("em");
            J.divHeader = N;
            J.divBody = z;
            J.divLinks = t;
            aa.className = "comment-wrapper";
            if (J.indent) {
                aa.className += " comment-indent"
            }
            if (ad) {
                aa.className += " comment-collapsed"
            }
            ac = $WH.ce("div");
            ac.className = "comment comment" + (ab % 2);
            $WH.ae(aa, ac);
            N.className = "comment-header";
            $WH.ae(ac, N);
            if ($WH.isset("g_thottbot") && g_thottbot) {
                var M = $WH.ce("div");
                M.className = "comment-topline";
                var T = $WH.ce("div");
                T.className = "comment-re";
                var g = $WH.ce("a");
                g.className = "";
                g.id = "comments:id=" + J.id;
                g.href = "#" + g.id;
                $WH.ae(g, $WH.ct("Re: " + df67uhjheader));
                $WH.ae(T, g);
                $WH.ae(M, T);
                var f = $WH.ce("div");
                f.className = "comment-bottomline"
            }
            var n = $WH.ce("em");
            n.className = "comment-rating";
            if (ad) {
                var D = $WH.ce("a");
                D.href = "javascript:;";
                D.onclick = Listview.funcBox.coToggleVis.bind(D, J);
                $WH.ae(D, $WH.ct(($WH.isset("g_thottbot") && g_thottbot) ? "" : LANG.lvcomment_show));
                $WH.ae(n, D);
                $WH.ae(n, $WH.ct(" " + String.fromCharCode(160) + " "))
            }
            var A = $WH.ce("b");
            var v = $WH.ce("a");
            v.href = "javascript:;";
            $WH.ae(v, $WH.ct(($WH.isset("g_thottbot") && g_thottbot) ? "" : LANG.lvcomment_rating));
            var E = $WH.ce("span");
            E.id = "commentrating" + J.id;
            Listview.funcBox.coDisplayRating(J, E);
            v.onclick = Listview.funcBox.coToggleRating.bind(this, J, E);
            $WH.ae(v, E);
            $WH.ae(A, v);
            $WH.ae(n, A);
            $WH.ae(n, $WH.ct(" "));
            var S = $WH.ce("span");
            var q = $WH.ce("a"),
                af = $WH.ce("a");
            if (W) {
                q.href = af.href = "javascript:;";
                q.onclick = Listview.funcBox.coRate.bind(q, J, 1);
                af.onclick = Listview.funcBox.coRate.bind(af, J, -1);
                if (h) {
                    var R = $WH.ce("a");
                    R.href = "javascript:;";
                    R.onclick = Listview.funcBox.coRate.bind(R, J, 0);
                    R.onmouseover = Listview.funcBox.coCustomRatingOver;
                    R.onmousemove = $WH.Tooltip.cursorUpdate;
                    R.onmouseout = $WH.Tooltip.hide;
                    if ($WH.isset("g_thottbot") && g_thottbot) {
                        var e = $WH.ce("div");
                        e.className = "comment-admin";
                        $WH.ae(af, e)
                    } else {
                        $WH.ae(R, $WH.ct("[~]"))
                    }
                    $WH.ae(S, R);
                    $WH.ae(S, $WH.ct(" "))
                }
            } else {
                if (g_user.ratingban) {
                    q.href = af.href = "javascript:;"
                } else {
                    q.href = wowheadUrl + af.href = "/account=signin"
                }
            }
            if ($WH.isset("g_thottbot") && g_thottbot) {
                var r = $WH.ce("div");
                r.className = "comment-plus";
                $WH.ae(q, r)
            } else {
                $WH.ae(q, $WH.ct("[+]"))
            }
            if (!g_user.ratingban) {
                q.onmouseover = Listview.funcBox.coPlusRatingOver;
                af.onmouseover = Listview.funcBox.coMinusRatingOver;
                q.onmousemove = af.onmousemove = $WH.Tooltip.cursorUpdate;
                q.onmouseout = af.onmouseout = $WH.Tooltip.hide
            } else {
                g_addTooltip(q, LANG.tooltip_banned_rating, "q");
                g_addTooltip(af, LANG.tooltip_banned_rating, "q")
            }
            if ($WH.isset("g_thottbot") && g_thottbot) {
                var Z = $WH.ce("div");
                Z.className = "comment-minus";
                $WH.ae(af, Z)
            } else {
                $WH.ae(af, $WH.ct("[-]"))
            }
            $WH.ae(S, af);
            $WH.ae(S, $WH.ct(" "));
            $WH.ae(S, q);
            $WH.ae(n, S);
            if (!p) {
                S.style.display = "none"
            }
            $WH.ae(N, n);
            t.className = "comment-links";
            var c = false;
            if (U) {
                var b = $WH.ce("span");
                var Q = $WH.ce("a");
                $WH.ae(Q, $WH.ct(LANG.lvcomment_edit));
                Q.onclick = Listview.funcBox.coEdit.bind(this, J, 0, false);
                $WH.ns(Q);
                Q.href = "javascript:;";
                $WH.ae(b, Q);
                c = true;
                $WH.ae(t, b)
            }
            if (L) {
                var u = $WH.ce("span");
                var F = $WH.ce("a");
                if (c) {
                    $WH.ae(u, $WH.ct("|"))
                }
                $WH.ae(F, $WH.ct(LANG.lvcomment_delete));
                F.onclick = Listview.funcBox.coDelete.bind(this, J);
                $WH.ns(F);
                F.href = "javascript:;";
                $WH.ae(u, F);
                c = true;
                $WH.ae(t, u)
            }
            if (d) {
                var P = $WH.ce("span");
                var k = $WH.ce("a");
                if (c) {
                    $WH.ae(P, $WH.ct("|"))
                }
                $WH.ae(k, $WH.ct(LANG.lvcomment_detach));
                k.onclick = Listview.funcBox.coDetach.bind(this, J);
                $WH.ns(k);
                k.href = "javascript:;";
                $WH.ae(P, k);
                c = true;
                $WH.ae(t, P)
            }
            if (ae) {
                var K = $WH.ce("span");
                var m = $WH.ce("a");
                if (c) {
                    $WH.ae(K, $WH.ct("|"))
                }
                $WH.ae(m, $WH.ct(LANG.lvcomment_report));
                m.onclick = ContactTool.show.bind(ContactTool, {
                    mode: 1,
                    comment: J
                });
                m.className = (($WH.isset("g_thottbot") && g_thottbot) ? "comment-reportlink" : "icon-report");
                m.href = "javascript:;";
                g_addTooltip(m, LANG.report_tooltip, (($WH.isset("g_thottbot") && g_thottbot) ? "" : "q2"));
                $WH.ae(K, m);
                c = true;
                $WH.ae(t, K)
            }
            if (!g_user.commentban) {
                var l = $WH.ce("span");
                var o = $WH.ce("a");
                if (c) {
                    $WH.ae(l, $WH.ct("|"))
                }
                $WH.ae(o, $WH.ct(LANG.lvcomment_reply));
                if (g_user.id > 0) {
                    o.onclick = Listview.funcBox.coReply.bind(this, J);
                    o.href = "javascript:;"
                } else {
                    o.href = wowheadUrl + "/account=signin"
                }
                $WH.ae(l, o);
                c = true;
                $WH.ae(t, l)
            }
            if (ad) {
                z.style.display = "none";
                t.style.display = "none"
            }
            $WH.ae(N, t);
            var C = $WH.ce("var");
            $WH.ae(C, $WH.ct(LANG.lvcomment_by));
            aUser = $WH.ce("a");
            aUser.href = wowheadUrl + "/user=" + J.user;
            $WH.ae(aUser, $WH.ct(J.user));
            $WH.ae(C, aUser);
            $WH.ae(C, g_getAchievementText(G.gold, G.silver, G.copper)[0]);
            $WH.ae(C, $WH.ct(" "));
            var a = $WH.ce("a");
            a.className = "q0";
            a.id = "comments:id=" + J.id;
            a.href = "#" + a.id;
            g_formatDate(a, Y, I);
            $WH.ae(C, a);
            $WH.ae(C, $WH.ct($WH.sprintf(LANG.lvcomment_patch, g_getPatchVersion(I))));
            if ((!$WH.isset("g_thottbot") || !g_thottbot) && G != null && G.avatar) {
                var j = Icon.createUser(G.avatar, G.avatarmore, 0, null, ((G.roles & U_GROUP_PREMIUM) && !(G.border)));
                j.style.marginRight = "3px";
                j.style.cssFloat = j.style.styleFloat = "left";
                $WH.ae(N, j);
                C.style.lineHeight = "26px"
            }
            $WH.ae(N, C);
            z.className = "text comment-body" + Listview.funcBox.coGetColor(J);
            if (J.indent) {
                z.className += " comment-body-indent"
            }
            var V = Markup.rolesToClass(J.roles),
                B = (this.id == "english-comments" ? "www" : "");
            z.innerHTML = Markup.toHtml(J.body, {
                allow: V,
                mode: Markup.MODE_COMMENT,
                roles: J.roles,
                locale: B
            });
            $WH.ae(ac, z);
            var H = $WH.ce("div");
            H.className = "text comment-body";
            if (J.indent) {
                H.className += " comment-body-indent"
            }
            if (J.response) {
                H.innerHTML = Markup.toHtml("[div][/div][wowheadresponse=" + J.responseuser + " roles=" + J.responseroles + "]" + J.response + "[/wowheadresponse]", {
                    allow: Markup.CLASS_STAFF,
                    roles: J.responseroles,
                    uid: "resp-" + J.id
                })
            }
            $WH.ae(ac, H);
            J.divResponse = H;
            if ((J.roles & U_GROUP_COMMENTS_MODERATOR) == 0 || g_user.roles & U_GROUP_COMMENTS_MODERATOR) {
                var X = $WH.ce("div");
                J.divLastEdit = X;
                X.className = "comment-lastedit";
                $WH.ae(X, $WH.ct(LANG.lvcomment_lastedit));
                var w = $WH.ce("a");
                $WH.ae(w, $WH.ct(" "));
                $WH.ae(X, w);
                $WH.ae(X, $WH.ct(" "));
                var O = $WH.ce("span");
                $WH.ae(X, O);
                $WH.ae(X, $WH.ct(" "));
                Listview.funcBox.coUpdateLastEdit(J);
                if (ad) {
                    X.style.display = "none"
                }
                $WH.ae(ac, X)
            }
        },
        createNote: function (b) {
            var g = $WH.ce("small");
            if (!g_user.commentban) {
                var m = $WH.ce("a");
                if (g_user.id > 0) {
                    m.href = "javascript:;";
                    m.onclick = co_addYourComment
                } else {
                    m.href = "/account=signin"
                }
                $WH.ae(m, $WH.ct(LANG.lvcomment_add));
                $WH.ae(g, m);
                var e = $WH.ce("span");
                e.style.padding = "0 5px";
                e.style.color = "white";
                $WH.ae(e, $WH.ct("|"));
                $WH.ae(g, e)
            }
            $WH.ae(g, $WH.ct(LANG.lvcomment_sort));
            var n = $WH.ce("a");
            n.href = "javascript:;";
            $WH.ae(n, $WH.ct(LANG.lvcomment_sortdate));
            n.onclick = Listview.funcBox.coSortDate.bind(this, n);
            $WH.ae(g, n);
            $WH.ae(g, $WH.ct(LANG.comma));
            var o = $WH.ce("a");
            o.href = "javascript:;";
            $WH.ae(o, $WH.ct(LANG.lvcomment_sortrating));
            o.onclick = Listview.funcBox.coSortHighestRatedFirst.bind(this, o);
            $WH.ae(g, o);
            var h = 1;
            if (g_user && g_user.cookies.comment_sort) {
                h = g_user.cookies.comment_sort
            } else {
                h = g_getWowheadCookie("temp_comment_sort")
            }
            if (h == "2") {
                o.onclick()
            } else {
                n.onclick()
            }
            var e = $WH.ce("span");
            e.style.padding = "0 5px";
            e.style.color = "white";
            $WH.ae(e, $WH.ct("|"));
            $WH.ae(g, e);
            var q = $WH.ce("select");
            var f = $WH.ce("option");
            f.value = 0;
            f.selected = "selected";
            $WH.ae(q, f);
            var l = {};
            for (var j = 0; j < this.data.length; ++j) {
                var i = new Date(this.data[j].date).getTime();
                l[g_getPatchVersionIndex(i)] = true
            }
            var k = [];
            for (var c in l) {
                k.push(c)
            }
            k.sort(function (p, d) {
                return d - p
            });
            for (var c = 0; c < k.length; ++c) {
                var f = $WH.ce("option");
                f.value = k[c];
                $WH.ae(f, $WH.ct(g_getPatchVersion.V[k[c]]));
                $WH.ae(q, f)
            }
            q.onchange = Listview.funcBox.coFilterByPatchVersion.bind(this, q);
            $WH.ae(g, $WH.ct(LANG.lvcomment_patchfilter));
            $WH.ae(g, q);
            $WH.ae(b, g);
            if (this.tabClick) {
                $("a, select", g).click(this.tabClick)
            }
        },
        onNoData: function (c) {
            var a = "<b>" + LANG.lvnodata_co1 + '</b><div class="pad2"></div>';
            if (g_user.id > 0) {
                var b = LANG.lvnodata_co2;
                b = b.replace("<a>", '<a href="javascript:;" onclick="co_addYourComment()" onmousedown="return false">');
                a += b
            } else {
                var b = LANG.lvnodata_co3;
                b = b.replace("<a>", '<a href="' + wowheadUrl + '/account=signin">');
                b = b.replace("<a>", '<a href="' + wowheadUrl + '/account=signup">');
                a += b
            }
            c.style.padding = "1.5em 0";
            c.innerHTML = a
        },
        onBeforeCreate: function () {
            if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
                var a = $WH.in_array(this.data, parseInt(RegExp.$1), function (b) {
                    return b.id
                });
                this.rowOffset = this.getRowOffset(a);
                return this.data[a]
            }
        },
        onAfterCreate: function (a) {
            if (a != null) {
                var b = a.__div;
                this.tabs.__st = b;
                if (!$WH.isset("g_thottbot") || !g_thottbot) {
                    b.firstChild.style.border = "1px solid #505050"
                }
            }
        }
    },
    commentpreview: {
        sort: [4],
        nItemsPerPage: 75,
        columns: [{
            id: "subject",
            name: LANG.subject,
            align: "left",
            value: "subject",
            compute: function (f, e) {
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(f);
                $WH.ae(b, $WH.ct(f.subject));
                $WH.ae(e, b);
                if (LANG.types[f.type]) {
                    var c = $WH.ce("div");
                    c.className = "small";
                    $WH.ae(c, $WH.ct(LANG.types[f.type][0]));
                    $WH.ae(e, c)
                }
            }
        }, {
            id: "preview",
            name: LANG.preview,
            align: "left",
            width: "50%",
            value: "preview",
            compute: function (g, f, b) {
                var c = $WH.ce("div");
                c.className = "crop";
                if (g.rating >= 10) {
                    c.className += " comment-green"
                }
                $WH.ae(c, $WH.ct(Markup.removeTags(g.preview, {
                    mode: Markup.MODE_ARTICLE
                })));
                $WH.ae(f, c);
                if (g.rating || g.deleted || g.purged) {
                    c = $WH.ce("div");
                    c.className = "small3";
                    if (g.rating) {
                        $WH.ae(c, $WH.ct(LANG.lvcomment_rating + (g.rating > 0 ? "+" : "") + g.rating))
                    }
                    var a = $WH.ce("span"),
                        e = "";
                    a.className = "q10";
                    if (g.deleted) {
                        e = LANG.lvcomment_deleted
                    } else {
                        if (g.purged) {
                            e = LANG.lvcomment_purged
                        }
                    }
                    $WH.ae(a, $WH.ct(e));
                    $WH.ae(c, a);
                    b.__status = a;
                    $WH.ae(f, c)
                }
            }
        }, {
            id: "author",
            name: LANG.author,
            value: "user",
            compute: function (d, c) {
                c.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                var b = $WH.ce("a");
                b.href = wowheadUrl + "/user=" + d.user;
                $WH.ae(b, $WH.ct(d.user));
                $WH.ae(c, b)
            }
        }, {
            id: "posted",
            name: LANG.posted,
            width: "16%",
            value: "elapsed",
            compute: function (e, d) {
                var a = new Date(e.date),
                    c = (g_serverTime - a) / 1000;
                var b = $WH.ce("span");
                g_formatDate(b, c, a, 0, 1);
                $WH.ae(d, b)
            }
        }],
        getItemLink: function (a) {
            return g_getCommentDomain(a.domain) + wowheadUrl + "/" + (a.url ? a.url : g_types[a.type] + "=" + a.typeId) + (a.id != null ? "#comments:id=" + a.id : "")
        }
    },
    screenshot: {
        sort: [],
        mode: 3,
        nItemsPerPage: 40,
        nItemsPerRow: 4,
        poundable: 2,
        columns: [],
        compute: function (k, e, l) {
            var u, o = new Date(k.date),
                f = (g_serverTime - o) / 1000;
            e.className = "screenshot-cell";
            e.vAlign = "bottom";
            var q = $WH.ce("a");
            q.href = "#screenshots:id=" + k.id;
            q.onclick = $WH.rf2;
            var v = $WH.ce("img"),
                t = Math.min(150 / k.width, 150 / k.height);
            v.src = g_staticUrl + "/uploads/screenshots/thumb/" + k.id + ".jpg";
            $WH.ae(q, v);
            $WH.ae(e, q);
            var p = $WH.ce("div");
            p.className = "screenshot-cell-user";
            var m = (k.user != null && k.user.length);
            if (m) {
                q = $WH.ce("a");
                q.href = wowheadUrl + "/user=" + k.user;
                $WH.ae(q, $WH.ct(k.user));
                $WH.ae(p, $WH.ct(LANG.lvscreenshot_from));
                $WH.ae(p, q);
                $WH.ae(p, $WH.ct(" "))
            }
            var j = $WH.ce("span");
            if (m) {
                g_formatDate(j, f, o)
            } else {
                g_formatDate(j, f, o, 0, 1)
            }
            $WH.ae(p, j);
            $WH.ae(p, $WH.ct(" " + LANG.dash + " "));
            var q = $WH.ce("a");
            q.href = "javascript:;";
            q.onclick = ContactTool.show.bind(ContactTool, {
                mode: 3,
                screenshot: k
            });
            if (!$WH.isset("g_thottbot") || !g_thottbot) {
                q.className = "icon-report"
            }
            g_addTooltip(q, LANG.report_tooltip, "q2");
            $WH.ae(q, $WH.ct(LANG.report));
            $WH.ae(p, q);
            $WH.ae(e, p);
            p = $WH.ce("div");
            p.style.position = "relative";
            p.style.height = "1em";
            if (Locale.getId() != LOCALE_ENUS && k.caption) {
                k.caption = ""
            }
            var h = (k.caption != null && k.caption.length);
            var g = (k.subject != null && k.subject.length);
            if (h || g) {
                var r = $WH.ce("div");
                r.className = "screenshot-caption";
                if (g) {
                    var c = $WH.ce("small");
                    $WH.ae(c, $WH.ct(LANG.types[k.type][0] + LANG.colon));
                    var b = $WH.ce("a");
                    $WH.ae(b, $WH.ct(k.subject));
                    b.href = g_getCommentDomain(k.domain) + "/" + g_types[k.type] + "=" + k.typeId;
                    $WH.ae(c, b);
                    $WH.ae(r, c);
                    if (h && k.caption.length) {
                        $WH.ae(c, $WH.ct(" (...)"))
                    }
                    $WH.ae(c, $WH.ce("br"))
                }
                if (h) {
                    $WH.aE(e, "mouseover", Listview.funcBox.ssCellOver.bind(r));
                    $WH.aE(e, "mouseout", Listview.funcBox.ssCellOut.bind(r));
                    var n = $WH.ce("span");
                    n.innerHTML = Markup.toHtml(k.caption, {
                        mode: Markup.MODE_SIGNATURE
                    });
                    $WH.ae(r, n)
                }
                $WH.ae(p, r)
            }
            $WH.aE(e, "click", Listview.funcBox.ssCellClick.bind(this, l));
            $WH.ae(e, p)
        },
        createNote: function (d) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var c = $WH.ce("small");
                var b = $WH.ce("a");
                if (g_user.id > 0) {
                    b.href = "javascript:;";
                    b.onclick = ss_submitAScreenshot
                } else {
                    b.href = wowheadUrl + "/account=signin"
                }
                $WH.ae(b, $WH.ct(LANG.lvscreenshot_submit));
                $WH.ae(c, b);
                $WH.ae(d, c)
            }
        },
        onNoData: function (c) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var a = "<b>" + LANG.lvnodata_ss1 + '</b><div class="pad2"></div>';
                if (g_user.id > 0) {
                    var b = LANG.lvnodata_ss2;
                    b = b.replace("<a>", '<a href="javascript:;" onclick="ss_submitAScreenshot()" onmousedown="return false">');
                    a += b
                } else {
                    var b = LANG.lvnodata_ss3;
                    b = b.replace("<a>", '<a href="' + wowheadUrl + '/account=signin">');
                    b = b.replace("<a>", '<a href="' + wowheadUrl + '/account=signup">');
                    a += b
                }
                c.style.padding = "1.5em 0";
                c.innerHTML = a
            } else {
                return -1
            }
        },
        onBeforeCreate: function () {
            if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
                var a = $WH.in_array(this.data, parseInt(RegExp.$1), function (b) {
                    return b.id
                });
                this.rowOffset = this.getRowOffset(a);
                return a
            }
        },
        onAfterCreate: function (a) {
            if (a != null) {
                setTimeout((function () {
                    ScreenshotViewer.show({
                        screenshots: this.data,
                        pos: a
                    })
                }).bind(this), 1)
            }
        }
    },
    video: {
        sort: [],
        mode: 3,
        nItemsPerPage: 40,
        nItemsPerRow: 4,
        poundable: 2,
        columns: [],
        compute: function (e, f, j) {
            var q, k = new Date(e.date),
                r = (g_serverTime - k) / 1000;
            f.className = "screenshot-cell";
            f.vAlign = "bottom";
            var p = $WH.ce("a");
            p.href = "#videos:id=" + e.id;
            p.onclick = $WH.rf2;
            var h = $WH.ce("img");
            h.src = $WH.sprintf(vi_thumbnails[e.videoType], e.videoId);
            $WH.ae(p, h);
            $WH.ae(f, p);
            var l = $WH.ce("div");
            l.className = "screenshot-cell-user";
            var t = (e.user != null && e.user.length);
            if (t) {
                p = $WH.ce("a");
                p.href = wowheadUrl + "/user=" + e.user;
                $WH.ae(p, $WH.ct(e.user));
                $WH.ae(l, $WH.ct(LANG.lvvideo_from));
                $WH.ae(l, p);
                $WH.ae(l, $WH.ct(" "))
            }
            var u = $WH.ce("span");
            if (t) {
                g_formatDate(u, r, k)
            } else {
                g_formatDate(u, r, k, 0, 1)
            }
            $WH.ae(l, u);
            $WH.ae(f, l);
            l = $WH.ce("div");
            l.style.position = "relative";
            l.style.height = "1em";
            if (Locale.getId(true) != LOCALE_ENUS && e.caption) {
                e.caption = ""
            }
            var c = (e.caption != null && e.caption.length);
            var g = (e.subject != null && e.subject.length);
            if (c || g) {
                var b = $WH.ce("div");
                b.className = "screenshot-caption";
                if (g) {
                    var o = $WH.ce("small");
                    $WH.ae(o, $WH.ct(LANG.types[e.type][0] + LANG.colon));
                    var n = $WH.ce("a");
                    $WH.ae(n, $WH.ct(e.subject));
                    n.href = g_getCommentDomain(e.domain) + "/" + g_types[e.type] + "=" + e.typeId;
                    $WH.ae(o, n);
                    $WH.ae(b, o);
                    if (c && e.caption.length) {
                        $WH.ae(o, $WH.ct(" (...)"))
                    }
                    $WH.ae(o, $WH.ce("br"))
                }
                if (c) {
                    $WH.aE(f, "mouseover", Listview.funcBox.ssCellOver.bind(b));
                    $WH.aE(f, "mouseout", Listview.funcBox.ssCellOut.bind(b));
                    var m = $WH.ce("span");
                    m.innerHTML = Markup.toHtml(e.caption, {
                        mode: Markup.MODE_SIGNATURE
                    });
                    $WH.ae(b, m)
                }
                $WH.ae(l, b)
            }
            $WH.aE(f, "click", Listview.funcBox.viCellClick.bind(this, j));
            $WH.ae(f, l)
        },
        createNote: function (d) {
            if (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)) {
                if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                    var c = $WH.ce("small");
                    var b = $WH.ce("a");
                    if (g_user.id > 0) {
                        b.href = "javascript:;";
                        b.onclick = vi_submitAVideo
                    } else {
                        b.href = wowheadUrl + "/account=signin"
                    }
                    $WH.ae(b, $WH.ct(LANG.lvvideo_suggest));
                    $WH.ae(c, b);
                    $WH.ae(d, c)
                }
            }
        },
        onNoData: function (c) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var a = "<b>" + LANG.lvnodata_vi1 + '</b><div class="pad2"></div>';
                if (g_user.id > 0) {
                    var b = LANG.lvnodata_vi2;
                    b = b.replace("<a>", '<a href="javascript:;" onclick="vi_submitAVideo()" onmousedown="return false">');
                    a += b
                } else {
                    var b = LANG.lvnodata_vi3;
                    b = b.replace("<a>", '<a href="' + wowheadUrl + '/account=signin">');
                    b = b.replace("<a>", '<a href="' + wowheadUrl + '/account=signup">');
                    a += b
                }
                c.style.padding = "1.5em 0";
                c.innerHTML = a
            } else {
                return -1
            }
        },
        onBeforeCreate: function () {
            if (location.hash && location.hash.match(/:id=([0-9]+)/) != null) {
                var a = $WH.in_array(this.data, parseInt(RegExp.$1), function (b) {
                    return b.id
                });
                this.rowOffset = this.getRowOffset(a);
                return a
            }
        },
        onAfterCreate: function (a) {
            if (a != null) {
                setTimeout((function () {
                    VideoViewer.show({
                        videos: this.data,
                        pos: a,
                        displayAd: true
                    })
                }).bind(this), 1)
            }
        }
    },
    pet: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function (b, k, g) {
                var e = $WH.ce("td");
                e.style.width = "1px";
                e.style.padding = "0";
                e.style.borderRight = "none";
                $WH.ae(e, Icon.create(b.icon, 0));
                $WH.ae(g, e);
                k.style.borderLeft = "none";
                var j = $WH.ce("div");
                var c = $WH.ce("a");
                c.style.fontFamily = "Verdana, sans-serif";
                c.href = this.getItemLink(b);
                $WH.ae(c, $WH.ct(b.name));
                if (b.expansion) {
                    var f = $WH.ce("span");
                    f.className = g_GetExpansionClassName(b.expansion);
                    $WH.ae(f, c);
                    $WH.ae(j, f)
                } else {
                    $WH.ae(j, c)
                }
                if (b.exotic) {
                    j.style.position = "relative";
                    var h = $WH.ce("div");
                    h.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                    h.style.fontStyle = "italic";
                    h.style.position = "absolute";
                    h.style.right = "3px";
                    h.style.bottom = "0px";
                    var c = $WH.ce("a");
                    c.href = wowheadUrl + "/spell=53270";
                    $WH.ae(c, $WH.ct(LANG.lvpet_exotic));
                    $WH.ae(h, c);
                    $WH.ae(j, h)
                }
                $WH.ae(k, j)
            },
            getVisibleText: function (a) {
                var b = a.name + Listview.funcBox.getExpansionText(a);
                if (a.exotic) {
                    b += " " + LANG.lvpet_exotic
                }
                return b
            }
        }, {
            id: "level",
            name: LANG.level,
            type: "range",
            getMinValue: function (a) {
                return a.minlevel
            },
            getMaxValue: function (a) {
                return a.maxlevel
            },
            compute: function (a, b) {
                if (a.minlevel > 0 && a.maxlevel > 0) {
                    if (a.minlevel != a.maxlevel) {
                        return a.minlevel + LANG.hyphen + a.maxlevel
                    } else {
                        return a.minlevel
                    }
                } else {
                    return -1
                }
            },
            sortFunc: function (d, c, e) {
                if (e > 0) {
                    return $WH.strcmp(d.minlevel, c.minlevel) || $WH.strcmp(d.maxlevel, c.maxlevel)
                } else {
                    return $WH.strcmp(d.maxlevel, c.maxlevel) || $WH.strcmp(d.minlevel, c.minlevel)
                }
            }
        }, {
            id: "abilities",
            name: LANG.abilities,
            type: "text",
            getValue: function (b) {
                if (!b.spells) {
                    return ""
                }
                if (b.spells.length > 0) {
                    var d = "";
                    for (var c = 0, a = b.spells.length; c < a; ++c) {
                        if (b.spells[c]) {
                            d += g_spells[b.spells[c]]["name_" + Locale.getName()]
                        }
                    }
                    return d
                }
            },
            compute: function (a, b) {
                if (!a.spells) {
                    return ""
                }
                if (a.spells.length > 0) {
                    b.style.padding = "0";
                    Listview.funcBox.createCenteredIcons(a.spells, b, "", 1)
                }
            },
            sortFunc: function (d, c) {
                if (!d.spells || !c.spells) {
                    return 0
                }
                return $WH.strcmp(d.spellCount, c.spellCount) || $WH.strcmp(d.spells, c.spells)
            },
            hidden: true
        }, {
            id: "diet",
            name: LANG.diet,
            type: "text",
            compute: function (a, e) {
                if (e) {
                    e.className = "small"
                }
                var b = 0,
                    c = "";
                for (var d in g_pet_foods) {
                    if (a.diet & d) {
                        if (b++ > 0) {
                            c += LANG.comma
                        }
                        c += g_pet_foods[d]
                    }
                }
                return c
            },
            sortFunc: function (d, c) {
                return $WH.strcmp(c.foodCount, d.foodCount) || Listview.funcBox.assocArrCmp(d.diet, c.diet, g_pet_foods)
            }
        }, {
            id: "type",
            name: LANG.type,
            type: "text",
            compute: function (b, d) {
                if (b.type != null) {
                    d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                    var c = $WH.ce("a");
                    c.href = wowheadUrl + "/pets=" + b.type;
                    $WH.ae(c, $WH.ct(g_pet_types[b.type]));
                    $WH.ae(d, c)
                }
            },
            getVisibleText: function (a) {
                if (a.type != null) {
                    return g_pet_types[a.type]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_pet_types[d.type], g_pet_types[c.type])
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/pet=" + a.id
        },
        getStatPct: function (b) {
            var a = $WH.ce("span");
            if (!isNaN(b) && b > 0) {
                a.className = "q2";
                $WH.ae(a, $WH.ct("+" + b + "%"))
            } else {
                if (!isNaN(b) && b < 0) {
                    a.className = "q10";
                    $WH.ae(a, $WH.ct(b + "%"))
                }
            }
            return a
        }
    },
    achievement: {
        sort: [1, 2],
        nItemsPerPage: 100,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            span: 2,
            compute: function (c, j, g) {
                var b = null;
                if (c.who && c.completed) {
                    b = "who=" + c.who + "&when=" + c.completed.getTime()
                }
                var f = $WH.ce("td");
                f.style.width = "1px";
                f.style.padding = "0";
                f.style.borderRight = "none";
                $WH.ae(f, g_achievements.createIcon(c.id, 1));
                Icon.getLink(f.firstChild).href = this.getItemLink(c);
                Icon.getLink(f.firstChild).rel = b;
                $WH.ae(g, f);
                j.style.borderLeft = "none";
                var e = $WH.ce("a");
                e.style.fontFamily = "Verdana, sans-serif";
                e.href = this.getItemLink(c);
                e.rel = b;
                $WH.ae(e, $WH.ct(c.name));
                $WH.ae(j, e);
                if (c.description != null) {
                    var h = $WH.ce("div");
                    h.className = "small";
                    $WH.ae(h, $WH.ct(c.description));
                    $WH.ae(j, h)
                }
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.description) {
                    b += " " + a.description
                }
                return b
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function (a, c) {
                if (a.side && a.side != 3) {
                    var b = $WH.ce("span");
                    b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
                    b.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(c, b)
                }
            },
            getVisibleText: function (a) {
                if (a.side) {
                    return g_sides[a.side]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "points",
            name: LANG.points,
            type: "number",
            width: "10%",
            value: "points",
            compute: function (a, b) {
                if (a.points) {
                    Listview.funcBox.appendMoney(b, 0, null, 0, 0, a.points)
                }
            }
        }, {
            id: "rewards",
            name: LANG.rewards,
            type: "text",
            width: "20%",
            compute: function (h, d) {
                if (h.rewards) {
                    var c = [];
                    var b = [];
                    var f = [];
                    for (var e = 0; e < h.rewards.length; e++) {
                        if (h.rewards[e][0] == 11) {
                            f.push(h.rewards[e][1])
                        } else {
                            if (h.rewards[e][0] == 3) {
                                c.push(h.rewards[e][1])
                            } else {
                                if (h.rewards[e][0] == 6) {
                                    b.push(h.rewards[e][1])
                                }
                            }
                        }
                    }
                    if (c.length > 0) {
                        for (var e = 0; e < c.length; e++) {
                            if (!g_items[c[e]]) {
                                return
                            }
                            var l = g_items[c[e]];
                            var j = $WH.ce("a");
                            j.href = wowheadUrl + "/item=" + c[e];
                            j.className = "q" + l.quality + " icontiny";
                            j.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + l.icon.toLowerCase() + ".gif)";
                            $WH.ae(j, $WH.ct(l["name_" + Locale.getName()]));
                            var k = $WH.ce("span");
                            $WH.ae(k, j);
                            $WH.ae(d, k);
                            $WH.ae(d, $WH.ce("br"))
                        }
                    }
                    if (b.length > 0) {
                        for (var e = 0; e < b.length; e++) {
                            if (!g_spells[b[e]]) {
                                return
                            }
                            var l = g_spells[b[e]];
                            var j = $WH.ce("a");
                            j.href = wowheadUrl + "/spell=" + b[e];
                            j.className = "q8 icontiny";
                            j.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + l.icon.toLowerCase() + ".gif)";
                            $WH.ae(j, $WH.ct(l["name_" + Locale.getName()]));
                            var k = $WH.ce("span");
                            $WH.ae(k, j);
                            $WH.ae(d, k);
                            $WH.ae(d, $WH.ce("br"))
                        }
                    }
                    if (f.length > 0) {
                        for (var e = 0; e < f.length; e++) {
                            if (!g_titles[f[e]]) {
                                return
                            }
                            var g = g_titles[f[e]]["name_" + Locale.getName()];
                            g = g.replace("%s", '<span class="q0">&lt;' + LANG.name + "&gt;</span>");
                            var k = $WH.ce("a");
                            k.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                            k.href = wowheadUrl + "/title=" + f[e];
                            k.innerHTML = g;
                            $WH.ae(d, k);
                            $WH.ae(d, $WH.ce("br"))
                        }
                    }
                } else {
                    if (h.reward) {
                        var k = $WH.ce("span");
                        k.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                        $WH.ae(k, $WH.ct(h.reward));
                        $WH.ae(d, k)
                    }
                }
            },
            getVisibleText: function (a) {
                var c = "";
                if (a.rewards) {
                    for (var b = 0; b < a.rewards.length; b++) {
                        if (a.rewards[b][0] == 11) {
                            c += " " + g_titles[a.rewards[b][1]]["name_" + Locale.getName()].replace("%s", "<" + LANG.name + ">")
                        } else {
                            if (a.rewards[b][0] == 3) {
                                c += " " + g_items[a.rewards[b][1]]["name_" + Locale.getName()]
                            } else {
                                if (a.rewards[b][0] == 6) {
                                    c += " " + g_spells[a.rewards[b][1]]["name_" + Locale.getName()]
                                }
                            }
                        }
                    }
                } else {
                    if (a.reward) {
                        c += " " + a.reward
                    }
                }
                return c
            },
            sortFunc: function (d, c) {
                var f = this.getVisibleText(d);
                var e = this.getVisibleText(c);
                if (f != "" && e == "") {
                    return -1
                }
                if (e != "" && f == "") {
                    return 1
                }
                return $WH.strcmp(f, e)
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function (d, g) {
                g.className = "small";
                var c = {
                    "1": -1,
                    "2": 1,
                    "3": 15076
                },
                    f = wowheadUrl + "/achievements=";
                if (d.category != c[d.type] && d.parentcat != c[d.type]) {
                    var b = $WH.ce("a");
                    b.className = "q0";
                    b.href = wowheadUrl + "/achievements=" + d.type + "." + d.parentcat;
                    $WH.ae(b, $WH.ct(g_achievement_categories[d.parentcat]));
                    $WH.ae(g, b);
                    $WH.ae(g, $WH.ce("br"));
                    f = b.href + "."
                }
                var e = $WH.ce("a");
                e.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                e.href = f + d.category;
                $WH.ae(e, $WH.ct(g_achievement_categories[d.category]));
                $WH.ae(g, e)
            },
            getVisibleText: function (a) {
                return g_achievement_categories[a.category]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_achievement_categories[d.category], g_achievement_categories[c.category])
            },
            hidden: true
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/achievement=" + a.id
        }
    },
    title: {
        sort: [1],
        nItemsPerPage: -1,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            value: "name",
            compute: function (e, g, d) {
                var c = $WH.ce("a"),
                    f = $WH.ce("span"),
                    b = $WH.ct($WH.str_replace(e.name, "%s", ""));
                g.style.fontFamily = "Verdana, sans-serif";
                c.href = this.getItemLink(e);
                if (e.who) {
                    $WH.ae(f, $WH.ct(e.who))
                } else {
                    $WH.ae(f, $WH.ct("<" + LANG.name + ">"));
                    f.className = "q0"
                }
                if (e.name.indexOf("%s") > 0) {
                    $WH.ae(c, b);
                    $WH.ae(c, f)
                } else {
                    if (e.name.indexOf("%s") == 0) {
                        $WH.ae(c, f);
                        $WH.ae(c, b)
                    }
                }
                if (e.expansion) {
                    var a = $WH.ce("span");
                    a.className = g_GetExpansionClassName(e.expansion);
                    $WH.ae(a, c);
                    $WH.ae(g, a)
                } else {
                    $WH.ae(g, c)
                }
            },
            sortFunc: function (d, c, e) {
                var f = $WH.trim(d.name.replace("%s", "").replace(/^[\s,]*(,|the |of the |of )/i, ""));
                bName = $WH.trim(c.name.replace("%s", "").replace(/^[\s,]*(,|the |of the |of )/i, ""));
                return $WH.strcmp(f, bName)
            },
            getVisibleText: function (a) {
                var b = a.name + Listview.funcBox.getExpansionText(a);
                return b
            }
        }, {
            id: "gender",
            name: LANG.gender,
            type: "text",
            value: "gender",
            compute: function (c, d) {
                if (c.gender && c.gender != 3) {
                    var a = g_file_genders[c.gender - 1];
                    var b = $WH.ce("span");
                    b.className = "icon-" + a;
                    b.onmouseover = function (f) {
                        $WH.Tooltip.showAtCursor(f, LANG[a], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(d, b)
                }
            },
            getVisibleText: function (a) {
                if (a.gender && a.gender != 3) {
                    return LANG[g_file_genders[a.gender - 1]]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(d.gender, c.gender)
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function (b, c) {
                if (b.side && b.side != 3) {
                    var a = $WH.ce("span");
                    a.className = (b.side == 1 ? "icon-alliance" : "icon-horde");
                    a.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_sides[b.side], 0, 0, "q")
                    };
                    a.onmousemove = $WH.Tooltip.cursorUpdate;
                    a.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(c, a)
                }
            },
            getVisibleText: function (a) {
                if (a.side) {
                    return g_sides[a.side]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "source",
            name: LANG.source,
            type: "text",
            compute: function (j, d) {
                if (j.source) {
                    $WH.nw(d);
                    d.className = "small";
                    d.style.lineHeight = "18px";
                    var b = 0;
                    for (var k in j.source) {
                        j.source[k].sort(function (l, i) {
                            return i.s - l.s
                        });
                        for (var e = 0, f = j.source[k].length; e < f; ++e) {
                            var c = j.source[k][e];
                            var g = 0;
                            if (j.faction && typeof c != "string" && c.s !== undefined && c.s != -1 && c.s != 2 - j.faction) {
                                continue
                            }
                            if (b++ > 0) {
                                $WH.ae(d, $WH.ce("br"))
                            }
                            if (typeof c == "string") {
                                $WH.ae(d, $WH.ct(c))
                            } else {
                                if (c.t) {
                                    g = c.t;
                                    var h = $WH.ce("a");
                                    h.href = wowheadUrl + "/" + g_types[c.t] + "=" + c.ti;
                                    h.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                                    if (c.s == 1) {
                                        h.className += " icon-alliance"
                                    }
                                    if (c.s == 0) {
                                        h.className += " icon-horde"
                                    }
                                    if (c.t == 5) {
                                        h.className += " icontiny";
                                        h.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_start.gif)"
                                    }
                                    $WH.ae(h, $WH.ct(c.n));
                                    $WH.ae(d, h)
                                }
                            }
                        }
                    }
                }
            },
            getVisibleText: function (d) {
                var f = "";
                if (d.source) {
                    for (var c in d.source) {
                        for (var b = 0, a = d.source[c].length; b < a; ++b) {
                            var e = d.source[c][b];
                            if (typeof e == "string") {
                                f += " " + e
                            } else {
                                if (e.t) {
                                    f += " " + e.n
                                }
                            }
                        }
                    }
                }
                return f
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(this.getVisibleText(d), this.getVisibleText(c))
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function (c, d) {
                $WH.nw(d);
                d.className = (($WH.isset("g_thottbot") && g_thottbot) ? "small q" : "small q1");
                var b = $WH.ce("a");
                b.href = wowheadUrl + "/titles=" + c.category;
                $WH.ae(b, $WH.ct(g_title_categories[c.category]));
                $WH.ae(d, b)
            },
            getVisibleText: function (a) {
                return g_title_categories[a.category]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_title_categories[d.category], g_title_categories[c.category])
            },
            hidden: true
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/title=" + a.id
        }
    },
    profile: {
        sort: [],
        nItemsPerPage: 50,
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            value: "name",
            type: "text",
            align: "left",
            span: 2,
            compute: function (f, c, h) {
                if (f.level) {
                    var e = $WH.ce("td");
                    e.style.width = "1px";
                    e.style.padding = "0";
                    e.style.borderRight = "none";
                    $WH.ae(e, Icon.create($WH.g_getProfileIcon(f.race, f.classs, f.gender, f.level, f.icon ? f.icon : f.id, "medium"), 1, null, this.getItemLink(f)));
                    $WH.ae(h, e);
                    c.style.borderLeft = "none"
                } else {
                    c.colSpan = 2
                }
                var b = $WH.ce("div");
                b.style.position = "relative";
                var k = $WH.ce("a");
                k.style.fontFamily = "Verdana, sans-serif";
                k.href = this.getItemLink(f);
                if (f.pinned) {
                    k.className = "icon-star-right"
                }
                $WH.ae(k, $WH.ct(f.name));
                $WH.ae(b, k);
                var g = $WH.ce("div");
                g.className = "small";
                g.style.marginRight = "20px";
                if (f.guild) {
                    var k = $WH.ce("a");
                    k.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                    k.href = wowheadUrl + "/profiles=" + f.region + "." + f.realm + "?filter=cr=9;crs=0;crv=" + $WH.str_replace($WH.urlencode(f.guild), "%20", "+") + "&roster=1";
                    $WH.ae(k, $WH.ct(f.guild));
                    $WH.ae(g, $WH.ct("<"));
                    $WH.ae(g, k);
                    $WH.ae(g, $WH.ct(">"))
                } else {
                    if (f.description) {
                        $WH.ae(g, $WH.ct(f.description))
                    }
                }
                var l = $WH.ce("span"),
                    j = "";
                l.className = "q10";
                if (f.deleted) {
                    j = LANG.lvcomment_deleted
                }
                $WH.ae(l, $WH.ct(j));
                $WH.ae(g, l);
                $WH.ae(b, g);
                var g = $WH.ce("div");
                g.className = "small";
                g.style.fontStyle = "italic";
                g.style.position = "absolute";
                g.style.right = "3px";
                g.style.bottom = "0px";
                h.__status = g;
                if (f.published === 0) {
                    $WH.ae(g, $WH.ct(LANG.privateprofile))
                }
                $WH.ae(b, g);
                $WH.ae(c, b)
            },
            getVisibleText: function (a) {
                var b = a.name;
                if (a.guild) {
                    b += " " + a.guild
                }
                return b
            }
        }, {
            id: "faction",
            name: LANG.faction,
            type: "text",
            compute: function (a, f) {
                if (!a.size && a.members === undefined && !a.level) {
                    return
                }
                var e = $WH.ce("div"),
                    c = $WH.ce("div"),
                    b;
                b = Icon.create("faction_" + g_file_factions[a.faction + 1], 0);
                b.onmouseover = function (d) {
                    $WH.Tooltip.showAtCursor(d, g_sides[a.faction + 1], 0, 0, "q")
                };
                b.onmousemove = $WH.Tooltip.cursorUpdate;
                b.onmouseout = $WH.Tooltip.hide;
                b.style.cssFloat = b.style.syleFloat = "left";
                e.style.margin = "0 auto";
                e.style.textAlign = "left";
                e.style.width = "26px";
                c.className = "clear";
                $WH.ae(e, b);
                $WH.ae(f, e);
                $WH.ae(f, c)
            },
            getVisibleText: function (a) {
                return g_sides[a.faction + 1]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(this.getVisibleText(d), this.getVisibleText(c))
            }
        }, {
            id: "members",
            name: LANG.members,
            value: "members",
            hidden: 1
        }, {
            id: "size",
            name: "Size",
            value: "size",
            hidden: 1
        }, {
            id: "rank",
            name: "Rank",
            value: "rank",
            hidden: 1
        }, {
            id: "race",
            name: LANG.race,
            type: "text",
            compute: function (a, f) {
                if (a.race) {
                    var e = $WH.ce("div"),
                        c = $WH.ce("div"),
                        b;
                    b = Icon.create("race_" + g_file_races[a.race] + "_" + g_file_genders[a.gender], 0, null, wowheadUrl + "/race=" + a.race);
                    b.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_chr_races[a.race], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    b.style.cssFloat = b.style.syleFloat = "left";
                    e.style.margin = "0 auto";
                    e.style.textAlign = "left";
                    e.style.width = "26px";
                    c.className = "clear";
                    $WH.ae(e, b);
                    $WH.ae(f, e);
                    $WH.ae(f, c)
                }
            },
            getVisibleText: function (a) {
                return g_file_genders[a.gender] + " " + g_chr_races[a.race]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_chr_races[d.race], g_chr_races[c.race])
            },
            hidden: 1
        }, {
            id: "classs",
            name: LANG.classs,
            type: "text",
            compute: function (a, f) {
                if (a.classs) {
                    var e = $WH.ce("div"),
                        c = $WH.ce("div"),
                        b;
                    b = Icon.create("class_" + g_file_classes[a.classs], 0, null, wowheadUrl + "/class=" + a.classs);
                    b.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_chr_classes[a.classs], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    b.style.cssFloat = b.style.syleFloat = "left";
                    e.style.margin = "0 auto";
                    e.style.textAlign = "left";
                    e.style.width = "26px";
                    c.className = "clear";
                    $WH.ae(e, b);
                    $WH.ae(f, e);
                    $WH.ae(f, c)
                } else {
                    return -1
                }
            },
            getVisibleText: function (a) {
                if (a.classs) {
                    return g_chr_classes[a.classs]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(this.getVisibleText(d), this.getVisibleText(c))
            },
            hidden: 1
        }, {
            id: "level",
            name: LANG.level,
            value: "level",
            hidden: 1
        }, {
            id: "talents",
            name: LANG.talents,
            type: "text",
            compute: function (c, f) {
                if (!c.level) {
                    return
                }
                var e = [c.talenttree1, c.talenttree2, c.talenttree3];
                var d = pr_getSpecFromTalents(c.classs, e);
                var b = $WH.ce("a");
                b.className = "icontiny tip " + (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                b.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + d.icon.toLowerCase() + ".gif)";
                b.href = this.getItemLink(c) + "#talents";
                b.rel = "np";
                b.onmouseover = function (a) {
                    $WH.Tooltip.showAtCursor(a, d.name, 0, 0, "q")
                };
                b.onmousemove = $WH.Tooltip.cursorUpdate;
                b.onmouseout = $WH.Tooltip.hide;
                $WH.ae(b, $WH.ct(c.talenttree1 + "/" + c.talenttree2 + "/" + c.talenttree3));
                $WH.ae(f, b)
            },
            getVisibleText: function (a) {
                if (a.talenttree1 || a.talenttree2 || a.talenttree3) {
                    if (a.talentspec > 0) {
                        return g_chr_specs[a.classs][a.talentspec - 1]
                    } else {
                        return g_chr_specs[0]
                    }
                } else {
                    return g_chr_specs["-1"]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(this.getVisibleText(d), this.getVisibleText(c))
            },
            hidden: 1
        }, {
            id: "gearscore",
            name: LANG.gearscore,
            tooltip: LANG.gearscore_real,
            value: "gearscore",
            compute: function (a, c) {
                var b = (a.level ? a.level : (a.members !== undefined ? 80 : 0));
                if (isNaN(a.gearscore) || !b) {
                    return
                }
                c.className = "q" + pr_getGearScoreQuality(b, a.gearscore, ($WH.in_array([2, 6, 7, 11], a.classs) != -1));
                return (a.gearscore ? $WH.number_format(a.gearscore) : 0)
            },
            hidden: 1
        }, {
            id: "achievementpoints",
            name: LANG.points,
            value: "achievementpoints",
            tooltip: LANG.tooltip_achievementpoints,
            compute: function (a, b) {
                if (a.achievementpoints) {
                    Listview.funcBox.appendMoney(b, 0, null, 0, 0, a.achievementpoints)
                }
            },
            hidden: 1
        }, {
            id: "wins",
            name: LANG.wins,
            value: "wins",
            hidden: 1
        }, {
            id: "losses",
            name: LANG.losses,
            compute: function (a, b) {
                return a.games - a.wins
            },
            hidden: 1
        }, {
            id: "guildrank",
            name: LANG.guildrank,
            value: "guildrank",
            compute: function (c, d) {
                if (c.guildrank > 0) {
                    return $WH.sprintf(LANG.rankno, c.guildrank)
                } else {
                    if (c.guildrank == 0) {
                        var a = $WH.ce("b");
                        $WH.ae(a, $WH.ct(LANG.guildleader));
                        $WH.ae(d, a)
                    }
                }
            },
            getVisibleText: function (a) {
                if (a.guildrank > 0) {
                    return $WH.sprintf(LANG.rankno, a.guildrank)
                } else {
                    if (a.guildrank == 0) {
                        return LANG.guildleader
                    }
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp((d.guildrank >= 0 ? d.guildrank : 11), (c.guildrank >= 0 ? c.guildrank : 11))
            },
            hidden: 1
        }, {
            id: "rating",
            name: LANG.rating,
            value: "rating",
            compute: function (a, b) {
                if (a.roster && a.arenateam[a.roster]) {
                    return a.arenateam[a.roster].rating
                }
                return a.rating
            },
            sortFunc: function (d, c, e) {
                if (d.roster && d.arenateam[d.roster] && c.roster && c.arenateam[c.roster]) {
                    return $WH.strcmp(d.arenateam[d.roster].rating, c.arenateam[c.roster].rating)
                }
                return $WH.strcmp(d.rating, c.rating)
            },
            hidden: 1
        }, {
            id: "location",
            name: LANG.location,
            type: "text",
            compute: function (c, e) {
                var b;
                if (c.region) {
                    if (c.realm) {
                        b = $WH.ce("a");
                        b.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                        b.href = wowheadUrl + "/profiles=" + c.region + "." + c.realm;
                        $WH.ae(b, $WH.ct(c.realmname));
                        $WH.ae(e, b);
                        $WH.ae(e, $WH.ce("br"))
                    }
                    var d = $WH.ce("small");
                    b = $WH.ce("a");
                    b.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                    b.href = wowheadUrl + "/profiles=" + c.region;
                    $WH.ae(b, $WH.ct(c.region.toUpperCase()));
                    $WH.ae(d, b);
                    if (c.battlegroup) {
                        $WH.ae(d, $WH.ct(LANG.hyphen));
                        b = $WH.ce("a");
                        b.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                        b.href = wowheadUrl + "/profiles=" + c.region + "." + c.battlegroup;
                        $WH.ae(b, $WH.ct(c.battlegroupname));
                        $WH.ae(d, b)
                    }
                    $WH.ae(e, d)
                }
            },
            getVisibleText: function (a) {
                var b = "";
                if (a.region) {
                    b += " " + a.region
                }
                if (a.battlegroup) {
                    b += " " + a.battlegroup
                }
                if (a.realm) {
                    b += " " + a.realm
                }
                return $WH.trim(b)
            },
            sortFunc: function (d, c, e) {
                if (d.region != c.region) {
                    return $WH.strcmp(d.region, c.region)
                }
                if (d.battlegroup != c.battlegroup) {
                    return $WH.strcmp(d.battlegroup, c.battlegroup)
                }
                return $WH.strcmp(d.realm, c.realm)
            }
        }, {
            id: "guild",
            name: LANG.guild,
            value: "guild",
            type: "text",
            compute: function (c, d) {
                if (!c.region || !c.battlegroup || !c.realm || !c.guild) {
                    return
                }
                var b = $WH.ce("a");
                b.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                b.href = wowheadUrl + "/profiles=" + c.region + "." + c.realm + "?filter=cr=9;crs=0;crv=" + $WH.str_replace($WH.urlencode(c.guild), "%20", "+") + "&roster=1";
                $WH.ae(b, $WH.ct(c.guild));
                $WH.ae(d, b)
            }
        }],
        getItemLink: function (a) {
            if (a.size !== undefined) {
                return wowheadUrl + "/profiles=" + a.region + "." + a.realm + "?filter=cr=" + (a.size == 2 ? 12 : (a.size == 3 ? 15 : 18)) + ";crs=0;crv=" + $WH.str_replace($WH.urlencode(a.name), "%20", "+") + "&roster=" + (a.size == 5 ? 4 : a.size)
            } else {
                if (a.members !== undefined) {
                    return wowheadUrl + "/profiles=" + a.region + "." + a.realm + "?filter=cr=9;crs=0;crv=" + $WH.str_replace($WH.urlencode(a.name), "%20", "+") + "&roster=1"
                } else {
                    return g_getProfileUrl(a)
                }
            }
        }
    },
    model: {
        sort: [],
        mode: 3,
        nItemsPerPage: 40,
        nItemsPerRow: 4,
        poundable: 2,
        columns: [],
        compute: function (e, k, f) {
            k.className = "screenshot-cell";
            k.vAlign = "bottom";
            var b = $WH.ce("a");
            b.href = "javascript:;";
            b.onclick = this.template.modelShow.bind(this.template, e.npcId, e.displayId, false);
            var c = $WH.ce("img");
            c.src = g_staticUrl + "/modelviewer/thumbs/npc/" + e.displayId + ".png";
            $WH.ae(b, c);
            $WH.ae(k, b);
            var j = $WH.ce("div");
            j.className = "screenshot-cell-user";
            b = $WH.ce("a");
            b.href = wowheadUrl + "/npcs=1?filter=" + (e.family ? "fa=" + e.family + ";" : "") + "minle=1;cr=35;crs=0;crv=" + e.skin;
            $WH.ae(b, $WH.ct(e.skin));
            $WH.ae(j, b);
            $WH.ae(j, $WH.ct(" (" + e.count + ")"));
            $WH.ae(k, j);
            j = $WH.ce("div");
            j.style.position = "relative";
            j.style.height = "1em";
            var h = $WH.ce("div");
            h.className = "screenshot-caption";
            var g = $WH.ce("small");
            $WH.ae(g, $WH.ct(LANG.level + ": "));
            $WH.ae(g, $WH.ct(e.minLevel + (e.minLevel == e.maxLevel ? "" : LANG.hyphen + (e.maxLevel == 9999 ? "??" : e.maxLevel))));
            $WH.ae(g, $WH.ce("br"));
            $WH.ae(h, g);
            $WH.ae(j, h);
            $WH.ae(k, j);
            $WH.aE(k, "click", this.template.modelShow.bind(this.template, e.npcId, e.displayId, true))
        },
        modelShow: function (d, b, f, g) {
            if (f) {
                g = $WH.$E(g);
                if (g.shiftKey || g.ctrlKey) {
                    return
                }
                var a = 0,
                    c = g._target;
                while (c && a < 3) {
                    if (c.nodeName == "A") {
                        return
                    }
                    if (c.nodeName == "IMG") {
                        break
                    }
                    c = c.parentNode
                }
            }
            ModelViewer.show({
                type: 1,
                typeId: d,
                displayId: b,
                noPound: 1
            })
        }
    },
    currency: {
        sort: [1],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function (c, g, e) {
                var d = $WH.ce("td");
                d.style.width = "1px";
                d.style.padding = "0";
                d.style.borderRight = "none";
                $WH.ae(d, Icon.create(c.icon, 0, null, this.getItemLink(c)));
                $WH.ae(e, d);
                g.style.borderLeft = "none";
                var f = $WH.ce("div");
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.name));
                $WH.ae(f, b);
                $WH.ae(g, f)
            }
        }, {
            id: "category",
            name: LANG.category,
            type: "text",
            width: "15%",
            compute: function (c, d) {
                d.className = "small";
                var b = $WH.ce("a");
                b.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                b.href = wowheadUrl + "/currencies=" + c.category;
                $WH.ae(b, $WH.ct(g_currency_categories[c.category]));
                $WH.ae(d, b)
            },
            getVisibleText: function (a) {
                return g_currency_categories[a.category]
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_currency_categories[d.category], g_currency_categories[c.category])
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/currency=" + a.id
        }
    },
    classs: {
        sort: [1],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function (e, k, g) {
                var c = $WH.ce("td");
                c.style.width = "1px";
                c.style.padding = "0";
                c.style.borderRight = "none";
                $WH.ae(c, Icon.create("class_" + g_file_classes[e.id], 0, null, this.getItemLink(e)));
                $WH.ae(g, c);
                k.style.borderLeft = "none";
                var j = $WH.ce("div");
                var b = $WH.ce("a");
                b.className = "c" + e.id;
                b.style.fontFamily = "Verdana, sans-serif";
                b.href = this.getItemLink(e);
                $WH.ae(b, $WH.ct(e.name));
                if (e.expansion) {
                    var f = $WH.ce("span");
                    f.className = g_GetExpansionClassName(e.expansion);
                    $WH.ae(f, b);
                    $WH.ae(j, f)
                } else {
                    $WH.ae(j, b)
                }
                if (e.hero) {
                    j.style.position = "relative";
                    var h = $WH.ce("div");
                    h.className = "small";
                    h.style.fontStyle = "italic";
                    h.style.position = "absolute";
                    h.style.right = "3px";
                    h.style.bottom = "0px";
                    $WH.ae(h, $WH.ct(LANG.lvclass_hero));
                    $WH.ae(j, h)
                }
                $WH.ae(k, j)
            }
        }, {
            id: "races",
            name: LANG.races,
            type: "text",
            compute: function (e, g) {
                if (e.races) {
                    var f = Listview.funcBox.assocBinFlags(e.races, g_chr_races);
                    g.className = (($WH.isset("g_thottbot") && g_thottbot) ? "q" : "q1");
                    for (var d = 0, b = f.length; d < b; ++d) {
                        if (d > 0) {
                            $WH.ae(g, $WH.ct(LANG.comma))
                        }
                        var c = $WH.ce("a");
                        c.href = wowheadUrl + "/race=" + f[d];
                        $WH.ae(c, $WH.ct(g_chr_races[f[d]]));
                        $WH.ae(g, c)
                    }
                }
            },
            getVisibleText: function (a) {
                if (a.races) {
                    return Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(a.races, g_chr_races), g_chr_races)
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.races, g_chr_races), Listview.funcBox.assocBinFlags(c.races, g_chr_races), g_chr_races)
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/class=" + a.id
        }
    },
    race: {
        sort: [1],
        searchable: 1,
        filtrable: 1,
        columns: [{
            id: "name",
            name: LANG.name,
            type: "text",
            align: "left",
            span: 2,
            value: "name",
            compute: function (g, e, j) {
                var h = $WH.ce("div"),
                    k;
                h.style.margin = "0 auto";
                h.style.textAlign = "left";
                h.style.width = "52px";
                k = Icon.create("race_" + g_file_races[g.id] + "_" + g_file_genders[0], 0, null, this.getItemLink(g));
                k.style.cssFloat = k.style.styleFloat = "left";
                $WH.ae(h, k);
                k = Icon.create("race_" + g_file_races[g.id] + "_" + g_file_genders[1], 0, null, this.getItemLink(g));
                k.style.cssFloat = k.style.styleFloat = "left";
                $WH.ae(h, k);
                var f = $WH.ce("td");
                f.style.width = "1px";
                f.style.padding = "0";
                f.style.borderRight = "none";
                $WH.ae(f, h);
                $WH.ae(j, f);
                e.style.borderLeft = "none";
                var b = $WH.ce("div");
                var l = $WH.ce("a");
                l.style.fontFamily = "Verdana, sans-serif";
                l.href = this.getItemLink(g);
                $WH.ae(l, $WH.ct(g.name));
                if (g.expansion) {
                    var c = $WH.ce("span");
                    c.className = g_GetExpansionClassName(g.expansion);
                    $WH.ae(c, l);
                    $WH.ae(b, c)
                } else {
                    $WH.ae(b, l)
                }
                $WH.ae(e, b)
            }
        }, {
            id: "side",
            name: LANG.side,
            type: "text",
            compute: function (a, c) {
                if (a.side && a.side != 3) {
                    var b = $WH.ce("span");
                    b.className = (a.side == 1 ? "icon-alliance" : "icon-horde");
                    b.onmouseover = function (d) {
                        $WH.Tooltip.showAtCursor(d, g_sides[a.side], 0, 0, "q")
                    };
                    b.onmousemove = $WH.Tooltip.cursorUpdate;
                    b.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(c, b)
                }
            },
            getVisibleText: function (a) {
                if (a.side) {
                    return g_sides[a.side]
                }
            },
            sortFunc: function (d, c, e) {
                return $WH.strcmp(g_sides[d.side], g_sides[c.side])
            }
        }, {
            id: "classes",
            name: LANG.classes,
            type: "text",
            compute: function (e, h) {
                if (e.classes) {
                    var c = Listview.funcBox.assocBinFlags(e.classes, g_chr_classes);
                    var g = $WH.ce("div");
                    g.style.width = (26 * c.length) + "px";
                    g.style.margin = "0 auto";
                    for (var b = 0, a = c.length; b < a; ++b) {
                        var f = Icon.create("class_" + g_file_classes[c[b]], 0, null, "/class=" + c[b]);
                        f.style.cssFloat = f.style.styleFloat = "left";
                        $WH.ae(g, f)
                    }
                    $WH.ae(h, g)
                }
            },
            getVisibleText: function (a) {
                if (a.classes) {
                    return Listview.funcBox.arrayText(Listview.funcBox.assocBinFlags(a.classes, g_chr_classes), g_chr_classes)
                }
            },
            sortFunc: function (d, c, e) {
                return Listview.funcBox.assocArrCmp(Listview.funcBox.assocBinFlags(d.classes, g_chr_classes), Listview.funcBox.assocBinFlags(c.classes, g_chr_classes), g_chr_classes)
            }
        }],
        getItemLink: function (a) {
            return wowheadUrl + "/race=" + a.id
        }
    },
    relatedlinks: {
        sort: [1],
        nItemsPerPage: 75,
        columns: [{
            id: "subject",
            name: LANG.subject,
            align: "left",
            value: "subject",
            compute: function (c, f) {
                var b = $WH.ce("a");
                b.style.fontFamily = "Verdana, sans-serif";
                if (c.blog) {
                    $(b).addClass("icon-book")
                } else {
                    if (c.guide) {
                        $(b).addClass("icon-star")
                    } else {
                        $(b).addClass("icon-sticky")
                    }
                }
                b.href = this.getItemLink(c);
                $WH.ae(b, $WH.ct(c.subject));
                $WH.ae(f, b);
                if (LANG.foboards[c.board]) {
                    var e = $WH.ce("div");
                    e.className = "small";
                    b = $WH.ce("a");
                    b.className = "q1";
                    b.href = wowheadUrl + "/forums&board=" + c.board;
                    $WH.ae(b, $WH.ct(LANG.foboards[c.board]));
                    $WH.ae(e, b);
                    $WH.ae(f, e)
                }
            },
            sortFunc: function (d, c, e) {
                return -$WH.strcmp(d.guide, c.guide) || -$WH.strcmp(d.blog, c.blog) || $WH.strcmp(d.subject, c.subject)
            }
        }, {
            id: "preview",
            name: LANG.preview,
            align: "left",
            width: "50%",
            value: "preview",
            compute: function (c, f) {
                var e = $WH.ce("div");
                e.className = "crop";
                $WH.ae(e, $WH.ct(Markup.removeTags(c.preview, {
                    mode: Markup.MODE_ARTICLE,
                    uid: c.id
                })));
                $WH.ae(f, e);
                if (c.user) {
                    e = $WH.ce("div");
                    e.className = "small3";
                    $WH.ae(e, $WH.ct(LANG.lvtopic_by));
                    var b = $WH.ce("a");
                    b.href = wowheadUrl + "/user=" + c.user;
                    $WH.ae(b, $WH.ct(c.user));
                    $WH.ae(e, b);
                    $WH.ae(f, e)
                }
            }
        }],
        getItemLink: function (a) {
            if (a.blog) {
                return wowheadUrl + "/blog=" + a.id
            }
            return wowheadUrl + "/" + a.url
        }
    }
};
var LiveSearch = new function () {
        var currentTextbox, lastSearch = {},
            lastDiv, timer, prepared, container, cancelNext, hasData, summary, selection, LIVESEARCH_DELAY = 500;

        function setText(textbox, txt) {
            textbox.value = txt;
            textbox.selectionStart = textbox.selectionEnd = txt.length
        }
        function colorDiv(div, fromOver) {
            if (lastDiv) {
                lastDiv.className = lastDiv.className.replace("live-search-selected", "")
            }
            lastDiv = div;
            lastDiv.className += " live-search-selected";
            selection = div.i;
            if (!fromOver) {
                show();
                setTimeout(setText.bind(0, currentTextbox, g_getTextContent(div.firstChild.firstChild.childNodes[1])), 1);
                cancelNext = 1
            }
        }
        function aOver() {
            colorDiv(this.parentNode.parentNode, 1)
        }
        function isVisible() {
            if (!container) {
                return false
            }
            return container.style.display != "none"
        }
        function adjust(fromResize) {
            if (fromResize == 1 && !isVisible()) {
                return
            }
            if (currentTextbox == null) {
                return
            }
            var c = $WH.ac(currentTextbox);
            container.style.left = (c[0] - 2) + "px";
            container.style.top = (c[1] + currentTextbox.offsetHeight + 1) + "px";
            container.style.width = currentTextbox.offsetWidth + "px"
        }
        function prepare() {
            if (prepared) {
                return
            }
            prepared = 1;
            container = $WH.ce("div");
            container.className = "live-search";
            container.style.display = "none";
            $WH.ae(document.body, container);
            $WH.aE(window, "resize", adjust.bind(0, 1));
            $WH.aE(document, "click", hide)
        }
        function show() {
            if (container && !isVisible()) {
                adjust();
                $(container).css({
                    opacity: "0"
                }).show().animate({
                    opacity: "1"
                }, "fast", null, doneShowing)
            }
        }
        function doneShowing(a) {
            $(this).css("opacity", "")
        }
        function hide(e) {
            if (e && !g_isLeftClick(e)) {
                return
            }
            if (container) {
                container.style.display = "none"
            }
        }
        function highlight(match, $1) {
            return ($1 ? match : "<b><u>" + match + "</u></b>")
        }
        function display(textbox, search, suggz, dataz) {
            prepare();
            show();
            lastA = null;
            hasData = 1;
            selection = null;
            while (container.firstChild) {
                $WH.de(container.firstChild)
            }
            search = search.replace(/[^a-z0-9\-]/gi, " ");
            search = $WH.trim(search.replace(/\s+/g, " "));
            var regex = g_createOrRegex(search, (search == "s" ? "[%]" : null));
            for (var i = 0, len = suggz.length; i < len; ++i) {
                var pos = suggz[i].lastIndexOf("(");
                if (pos != -1) {
                    suggz[i] = suggz[i].substr(0, pos - 1)
                }
                var type = dataz[i][0],
                    typeId = dataz[i][1],
                    param1 = dataz[i][2],
                    param2 = dataz[i][3],
                    a = $WH.ce("a"),
                    sp = $WH.ce("i"),
                    sp2 = $WH.ce("span"),
                    div = $WH.ce("div"),
                    div2 = $WH.ce("div");
                div.i = i;
                a.onmouseover = aOver;
                a.href = wowheadUrl + "/" + (type == 10 && param2 ? "statistic" : g_types[type]) + "=" + typeId;
                if (textbox._append) {
                    a.rel += textbox._append
                }
                if (type == 1 && param1 != null) {
                    div.className += " live-search-icon-boss"
                } else {
                    if (type == 3 && param2 != null) {
                        a.className += " q" + param2
                    } else {
                        if (type == 4 && param1 != null) {
                            a.className += " q" + param1
                        } else {
                            if (type == 13) {
                                a.className += " c" + typeId
                            }
                        }
                    }
                }
                if ((type == 3 || type == 6 || type == 9 || type == 10 || type == 13 || type == 14 || type == 15 || type == 17) && param1) {
                    div.className += " live-search-icon";
                    div.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/small/" + param1.toLowerCase() + ".jpg)"
                } else {
                    if ((type == 5 || type == 11) && param1 >= 1 && param1 <= 2) {
                        div.className += " live-search-icon-quest-" + (param1 == 1 ? "alliance" : "horde")
                    }
                }
                $WH.ae(sp, $WH.ct(LANG.types[type][0]));
                $WH.ae(a, sp);
                var buffer = suggz[i];
                buffer = buffer.replace(regex, highlight);
                if (type == 11) {
                    buffer = buffer.replace("%s", '<span class="q0">&lt;' + LANG.name + "&gt;</span>")
                }
                sp2.innerHTML = buffer;
                $WH.ae(a, sp2);
                if (type == 6 && param2) {
                    $WH.ae(a, $WH.ct(" (" + param2 + ")"))
                }
                $WH.ae(div2, a);
                $WH.ae(div, div2);
                $WH.ae(container, div)
            }
        }
        function receive(xhr, opt) {
            var text = xhr.responseText;
            if (text.charAt(0) != "[" || text.charAt(text.length - 1) != "]") {
                return
            }
            var a = eval(text);
            var search = a[0];
            if (search == opt.search) {
                if (a.length == 8) {
                    display(opt.textbox, search, a[1], a[7])
                } else {
                    hide()
                }
            }
        }
        function fetch(textbox, search) {
            var url = wowheadUrl + "/search?q=" + $WH.urlencode(search);
            if (textbox._type) {
                url += "&json&type=" + textbox._type
            } else {
                url += "&opensearch"
            }
            new Ajax(url, {
                onSuccess: receive,
                textbox: textbox,
                search: search
            })
        }
        function preFetch(textbox, search) {
            if (cancelNext) {
                cancelNext = 0;
                return
            }
            hasData = 0;
            if (timer > 0) {
                clearTimeout(timer);
                timer = 0
            }
            timer = setTimeout(fetch.bind(0, textbox, search), LIVESEARCH_DELAY)
        }
        function cycle(dir) {
            if (!isVisible()) {
                if (hasData) {
                    show()
                }
                return
            }
            var firstNode = (container.childNodes[0].nodeName == "EM" ? container.childNodes[3] : container.firstChild);
            var bakDiv = dir ? firstNode : container.lastChild;
            if (lastDiv == null) {
                colorDiv(bakDiv)
            } else {
                var div = dir ? lastDiv.nextSibling : lastDiv.previousSibling;
                if (div) {
                    if (div.nodeName == "STRONG") {
                        div = container.lastChild
                    }
                    colorDiv(div)
                } else {
                    colorDiv(bakDiv)
                }
            }
        }
        function onKeyUp(e) {
            e = $WH.$E(e);
            var textbox = e._target;
            var search = $WH.trim(textbox.value.replace(/\s+/g, " "));
            if (search == lastSearch[textbox.id]) {
                return
            }
            lastSearch[textbox.id] = search;
            if (search.length) {
                preFetch(textbox, search)
            } else {
                hide()
            }
        }
        function onKeyDown(e) {
            e = $WH.$E(e);
            var textbox = e._target;
            switch (e.keyCode) {
            case 27:
                hide();
                break;
            case 38:
                cycle(0);
                break;
            case 40:
                cycle(1);
                break
            }
        }
        function onFocus(e) {
            e = $WH.$E(e);
            var textbox = e._target;
            if (textbox != document) {
                currentTextbox = textbox
            }
        }
        this.attach = function (textbox) {
            textbox = $(textbox);
            if (!textbox.length) {
                return
            }
            textbox = textbox[0];
            if (textbox.getAttribute("autocomplete") == "off") {
                return
            }
            textbox.setAttribute("autocomplete", "off");
            $WH.aE(textbox, "focus", onFocus);
            $WH.aE(textbox, "keyup", onKeyUp);
            $WH.aE(textbox, "keydown", onKeyDown)
        };
        this.reset = function (textbox) {
            lastSearch[textbox.id] = null;
            textbox.value = "";
            hasData = 0;
            hide()
        };
        this.hide = function () {
            hide()
        }
    };
var LOCALE_ENUS = 0;
var LOCALE_FRFR = 2;
var LOCALE_DEDE = 3;
var LOCALE_ESES = 6;
var LOCALE_RURU = 8;
var Locale = {
    current: {},
    locales: {
        0: {
            id: LOCALE_ENUS,
            name: "enus",
            domain: "locale=en",
            description: "English"
        },
        2: {
            id: LOCALE_FRFR,
            name: "frfr",
            domain: "locale=fr",
            description: "Fran" + String.fromCharCode(231) + "ais"
        },
        3: {
            id: LOCALE_DEDE,
            name: "dede",
            domain: "locale=de",
            description: "Deutsch"
        },
        6: {
            id: LOCALE_ESES,
            name: "eses",
            domain: "locale=es",
            description: "Espa" + String.fromCharCode(241) + "ol"
        },
        7: {
            id: LOCALE_RURU,
            name: "ruru",
            domain: "locale=ru",
            description: String.fromCharCode(1056, 1091, 1089, 1089, 1082, 1080, 1081)
        }
    },
    getAll: function () {
        var a = [];
        for (var b in Locale.locales) {
            a.push(Locale.locales[b])
        }
        return a
    },
    getAllByName: function () {
        var a = Locale.getAll();
        a.sort(function (d, c) {
            return $WH.strcmp(d.description, c.description)
        });
        return a
    },
    getId: function () {
        return Locale.current.id
    },
    getName: function () {
        var a = Locale.getId();
        return Locale.locales[a].name
    },
    get: function () {
        var a = Locale.getId();
        return Locale.locales[a]
    },
    set: function (a) {
        $.extend(Locale.current, Locale.locales[a])
    }
};
Locale.set(LOCALE_ENUS);

function Mapper(b, c) {
    $WH.cO(this, b);
    if (this.parent && !this.parent.nodeName) {
        this.parent = $WH.ge(this.parent)
    } else {
        if (!this.parent) {
            return
        }
    }
    var a;
    this.mouseX = this.mouseY = 0;
    this.editable = this.editable || false;
    this.overlay = this.overlay || false;
    if (this.editable) {
        this.zoomable = this.toggle = false;
        this.show = this.mouse = true
    } else {
        this.zoomable = (this.zoomable == null ? true : this.zoomable);
        this.toggle = (this.toggle == null ? true : this.toggle);
        this.show = (this.show == null ? true : this.show);
        this.mouse = (this.mouse == null ? false : this.mouse)
    }
    this.buttons = (this.buttons == null ? true : this.buttons);
    this.zoneLink = (this.zoneLink == null ? true : this.zoneLink);
    if (location.href.indexOf("zone=") != -1) {
        this.zoneLink = false
    }
    this.zoom = (this.zoom == null ? 0 : this.zoom);
    this.zone = (this.zone == null ? 0 : this.zone);
    this.level = (this.level == null ? (Mapper.zoneDefaultLevel[this.zone] ? Mapper.zoneDefaultLevel[this.zone] : 0) : this.level);
    this.pins = [];
    this.nCoords = 0;
    this.tempWidth = null;
    this.tempHeight = null;
    this.parent.className = "mapper";
    this.parent.appendChild(this.span = $WH.ce("span"));
    a = this.span.style;
    a.display = "block";
    a.position = "relative";
    $WH.ns(this.span);
    this.overlaySpan = a = $WH.ce("div");
    a.style.display = "block";
    a.style.width = "100%";
    a.style.height = "100%";
    this.span.appendChild(a);
    this.buttonDiv = a = $WH.ce("div");
    a.style.position = "absolute";
    a.style.top = a.style.right = "3px";
    if (this.buttons) {
        this.parent.appendChild(a)
    }
    if (this.editable) {
        this.span.onmouseup = this.addPin.bind(this);
        a = g_createGlow(LANG.mapper_tippin);
        a.style.fontSize = "11px";
        a.style.position = "absolute";
        a.style.bottom = a.style.right = "0";
        $WH.ns(a);
        this.parent.appendChild(a)
    } else {
        this.sToggle = a = RedButton.create(LANG.mapper_hidepins, true, this.toggleShow.bind(this));
        a.style["float"] = "right";
        a.style.display = "none";
        $WH.ns(a);
        this.buttonDiv.appendChild(a)
    }
    if (this.zoomable) {
        this.span.onclick = this.toggleZoom.bind(this);
        this.span.id = "sjdhfkljawelis" + (this.unique !== undefined ? this.unique : "");
        this.sZoom = a = g_createGlow(LANG.mapper_tipzoom);
        a.style.fontSize = "11px";
        a.style.position = "absolute";
        a.style.bottom = a.style.right = "0";
        $WH.ns(a);
        this.span.appendChild(a)
    }
    this.sZoneLink = a = g_createGlow("");
    a.style.display = "none";
    a.style.position = "absolute";
    a.style.top = a.style.left = "0";
    this.parent.appendChild(a);
    if (this.mouse) {
        this.parent.onmouseout = (function () {
            this.timeout = setTimeout((function () {
                this.sMouse.style.display = "none"
            }).bind(this), 1)
        }).bind(this);
        this.parent.onmouseover = (function () {
            clearTimeout(this.timeout);
            this.sMouse.style.display = ""
        }).bind(this);
        this.span.onmousemove = this.span.onmousedown = this.getMousePos.bind(this);
        this.sMouse = a = g_createGlow("(0.0, 0.0)");
        a.style.display = "none";
        a.style.position = "absolute";
        a.style.bottom = a.style.left = "0";
        a.onmouseup = $WH.sp;
        $WH.ns(a);
        this.span.appendChild(a)
    }
    this.floorPins = {};
    if (b.coords != null) {
        this.setCoords(b.coords)
    } else {
        if (b.link != null) {
            this.setLink(b.link)
        }
    }
    if (b.objectives) {
        this.setObjectives(b.objectives)
    }
    if (b.zoneparent && b.zones) {
        this.setZones(b.zoneparent, b.zones)
    }
    this.updateMap(c)
}
Mapper.sizes = [
    [488, 325, "normal"],
    [772, 515, "zoom"],
    [1002, 668, "original"],
    [224, 149, "small"]
];
Mapper.onlyOneFloor = {
    4120: true,
    4264: true,
    4375: true,
    4415: true,
    4493: true,
    4500: true,
    4603: true,
    4723: true,
    4809: true,
    4813: true,
    4820: true
};
Mapper.zoneLevelOffset = {
    4273: 0
};
Mapper.zoneDefaultLevel = {
    616: 1,
    4714: 2,
    4720: 2,
    3456: 4,
    4812: 4,
    4922: 1,
    5034: 1
};
Mapper.remappedLevels = {
    4273: {
        6: 5
    }
};
Mapper.multiLevelZones = {};
Mapper.zonePhased = {};
Mapper.prototype = {
    getMap: function () {
        return this.parent
    },
    update: function (b, f) {
        if (b.zoom != null) {
            this.zoom = b.zoom
        }
        if (b.zone != null) {
            this.zone = b.zone
        }
        if (b.show != null) {
            this.show = b.show
        }
        this.pins = [];
        this.nCoords = 0;
        for (var e in this.floorPins) {
            if (this.floorPins[e].parentNode) {
                $WH.de(this.floorPins[e])
            }
        }
        this.floorPins = {};
        if (this.floorButton) {
            $WH.de(this.floorButton);
            this.floorButton = null
        }
        var a = (b.level === undefined ? 0 : this.fixLevel(parseInt(b.level)));
        if (!b.preservelevel) {
            this.level = 0
        } else {
            a = this.level
        }
        var c = false;
        if ($WH.isset("g_mapperData")) {
            c = g_mapperData
        } else {
            if ($WH.isset("g_mapper_data")) {
                c = g_mapper_data
            }
        }
        if (c && c[this.zone] && !b.coords) {
            var h = c[this.zone];
            var d = -1;
            for (var e in h) {
                e = parseInt(e);
                var j = this.fixLevel(e);
                if (b.level === undefined && h[e].count > d) {
                    a = parseInt(j);
                    d = h[e].count
                }
                if (h[e].coords) {
                    this.setCoords(h[e].coords, j)
                }
            }
            this.level = a;
            if (this.floorPins[this.level]) {
                $WH.ae(this.span, this.floorPins[this.level])
            }
        } else {
            if (b.coords != null) {
                var g = 999;
                for (var e in b.coords) {
                    e = parseInt(e);
                    var j = this.fixLevel(e);
                    this.setCoords(b.coords[e], j);
                    if (j < g) {
                        g = j
                    }
                }
                if (g != 999 && !b.preservelevel) {
                    this.level = g
                }
                if (this.floorPins[this.level]) {
                    $WH.ae(this.span, this.floorPins[this.level])
                }
            } else {
                if (b.link != null) {
                    this.setLink(b.link)
                }
            }
        }
        this.updateMap(f)
    },
    fixLevel: function (a) {
        if (Mapper.zoneLevelOffset[this.zone] !== undefined) {
            a += Mapper.zoneLevelOffset[this.zone]
        } else {
            if (Mapper.multiLevelZones[this.zone] && a > 0) {
                a += -1
            } else {
                if (Mapper.multiLevelZones[this.zone] == undefined) {
                    a = 0
                }
            }
        }
        if (Mapper.remappedLevels[this.zone] && Mapper.remappedLevels[this.zone][a] !== undefined) {
            a = Mapper.remappedLevels[this.zone][a]
        }
        return a
    },
    getZone: function () {
        return this.zone
    },
    setZone: function (a, c, b) {
        this.pins = [];
        this.nCoords = 0;
        if (this.floorPins[this.level]) {
            $WH.de(this.floorPins[this.level])
        }
        this.floorPins = {};
        if (this.floorButton) {
            $WH.de(this.floorButton);
            this.floorButton = null
        }
        this.zone = a;
        this.level = c | 0;
        this.updateMap(b);
        return true
    },
    showFloors: function (d) {
        if (!Mapper.multiLevelZones[this.zone]) {
            return
        }
        var f = [];
        var b = Mapper.multiLevelZones[this.zone];
        var e = (Mapper.zonePhased[this.zone] ? g_zone_phases : g_zone_areas);
        for (var c = 0; c < b.length; ++c) {
            var a;
            if (!e[this.zone]) {
                a = [c, (Mapper.zonePhased[this.zone] ? "[Phase " : "[Level ") + (c + 1) + "]", this.setMap.bind(this, b[c], c, true)]
            } else {
                a = [c, e[this.zone][c], this.setMap.bind(this, b[c], c, true)]
            }
            if (c == this.level || (this.level === undefined && c == 0)) {
                a.checked = true
            }
            f.push(a)
        }
        Menu.showAtCursor(f, d)
    },
    setMap: function (b, c, h) {
        if (c != this.level) {
            if (this.floorPins[this.level]) {
                $WH.de(this.floorPins[this.level])
            }
            if (this.floorPins[c]) {
                $WH.ae(this.span, this.floorPins[c])
            }
            this.level = c
        }
        var g = Locale.getName();
        if ($WH.isset("g_ptr") && g_ptr) {
            g = "ptr"
        } else {
            if ($WH.isset("g_beta") && g_beta) {
                g = "beta"
            } else {
                if ($WH.isset("g_old") && g_old) {
                    g = "old"
                }
            }
        }
        this.span.style.background = "url(" + g_staticUrl + "/images/wow/maps/" + g + "/" + Mapper.sizes[this.zoom][2] + "/" + b + ".jpg)";
        if (this.overlay) {
            this.overlaySpan.style.background = "url(" + g_staticUrl + "/images/wow/maps/overlay/" + Mapper.sizes[this.zoom][2] + "/" + b + ".png)"
        }
        if (this.sZoneLink) {
            var f = "";
            var e = parseInt(this.zone);
            var j = g_zones[e] != null;
            var a = (Mapper.zonePhased[this.zone] ? g_zone_phases : g_zone_areas);
            if (j) {
                if (this.zoneLink) {
                    f += '<a href="' + wowheadUrl + '/zone=' + e + '">' + g_zones[e] + "</a>"
                }
                if (Mapper.multiLevelZones[e]) {
                    if (this.zoneLink) {
                        f += ": "
                    }
                    f += (a[e] ? a[e][this.level] : (Mapper.zonePhased[e] ? "Phase " : "Level ") + (this.level + 1))
                }
                g_setInnerHtml(this.sZoneLink, f, "div");
                if (this.zoneLink) {
                    for (var d = 0; d < 9; ++d) {
                        if (d == 4) {
                            continue
                        }
                        this.sZoneLink.childNodes[d].firstChild.style.color = "black"
                    }
                }
            }
            this.sZoneLink.style.display = j ? "" : "none"
        }
        if (h) {
            this.onMapUpdate && this.onMapUpdate(this)
        }
    },
    setObjectives: function (h) {
        var b = {
            start: 1,
            end: 1,
            startend: 1,
            sourcestart: 1,
            sourceend: 1
        };
        for (var m in h) {
            var k = h[m];
            if (g_mapperData[m] === undefined) {
                g_mapperData[m] = {}
            }
            var g = {};
            var j = 0;
            for (var c in k.levels) {
                var a = k.levels[c];
                var f = ShowOnMap.combinePins(a);
                var d = f[0];
                g_mapperData[m][c] = {
                    count: d.length,
                    coords: []
                };
                for (var e = 0; e < d.length; ++e) {
                    var n = ShowOnMap.buildTooltip(d[e].list);
                    g_mapperData[m][c].coords.push([d[e].coord[0], d[e].coord[1],
                    {
                        type: n[1],
                        url: n[2],
                        menu: n[3],
                        label: n[0]
                    }])
                }
            }
        }
    },
    setZones: function (m, n) {
        m = $("#" + m);
        if (!m || !n || n.length == 0 || !this.objectives) {
            return
        }
        var r = function (C, H, B, I) {
                var G = [false, -1];
                for (var E = 0; E < B.length; ++E) {
                    if (E > 0) {
                        u.append((E == B.length - 1 ? LANG.and : LANG.comma))
                    }
                    var F = null;
                    if (C.objectives[B[E][0]].mappable > 0) {
                        F = $("<a/>", {
                            href: "javascript:;",
                            text: C.objectives[B[E][0]].zone
                        });
                        F.click(function (J, i) {
                            C.update({
                                zone: i
                            });
                            g_setSelectedLink(J, "mapper")
                        }.bind(C, F[0], B[E][0]));
                        F.isLink = true
                    } else {
                        F = $("<a/>", {
                            href: wowheadUrl + "/zone=" + B[E][0],
                            text: C.objectives[B[E][0]].zone
                        });
                        g_addTooltip(F[0], LANG.tooltip_zonelink)
                    }
                    if (n.length > 1) {
                        var D = I[B[E][0]];
                        if (D.start && D.end) {
                            F.addClass("icontiny");
                            F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_startend.gif)");
                            F.css("padding-left", "20px")
                        } else {
                            if (D.start) {
                                F.addClass("icontiny");
                                F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_start.gif)");
                                F.css("padding-left", "14px")
                            } else {
                                if (D.end) {
                                    F.addClass("icontiny");
                                    F.css("background-image", "url(" + g_staticUrl + "/images/wow/icons/tiny/quest_end.gif)");
                                    F.css("padding-left", "16px")
                                }
                            }
                        }
                    }
                    H.append(F);
                    if (B[E][1] > G[1]) {
                        G = [F, B[E][1]]
                    }
                }
                return G[0]
            };
        var j = function (B, F, E) {
                var C = [];
                for (var D = 0; D < B.length; ++D) {
                    if (F[B[D][0]][E]) {
                        C.push(B[D])
                    }
                }
                return C
            };
        var e = {};
        var k = {
            start: [],
            end: [],
            objective: []
        };
        for (var c in this.objectives) {
            if (e[c] === undefined) {
                e[c] = {}
            }
            var v = this.objectives[c];
            for (var o in v.levels) {
                var b = v.levels[o];
                for (var t = 0; t < b.length; ++t) {
                    if (b[t].point == "start" || b[t].point == "sourcestart") {
                        k.start.push(c);
                        e[c].start = true
                    } else {
                        if (b[t].point == "end" || b[t].point == "sourceend") {
                            k.end.push(c);
                            e[c].end = true
                        } else {
                            if (b[t].point == "requirement" || b[t].point == "sourcerequirement") {
                                k.objective.push(c);
                                e[c].objective = true
                            }
                        }
                    }
                }
            }
        }
        var f = $("<h3/>", {
            text: LANG.mapper_relevantlocs
        });
        m.append(f);
        if (n.length == 1 && this.missing == 0) {
            var u = $("<span/>", {
                html: LANG.mapper_entiretyinzone.replace("$$", "<b>" + this.objectives[n[0][0]].zone + "</b>.")
            });
            m.append(u);
            this.update({
                zone: n[0][0]
            })
        } else {
            if (this.missing > 0) {
                var u = $("<span/>");
                var l = false,
                    h = false,
                    w = false;
                k.objective = $WH.array_unique(k.objective);
                k.start = $WH.array_unique(k.start);
                k.end = $WH.array_unique(k.end);
                var z = k.start.length > 0 && $WH.array_compare(k.start, k.end);
                var d = k.start.length > 0 && $WH.array_compare(k.start, k.objective);
                var p = k.end.length > 0 && $WH.array_compare(k.end, k.objective);
                var A = j(n, e, "objective");
                var a = j(n, e, "start");
                var g = j(n, e, "end");
                if (z && d) {
                    var q = LANG.mapper_happensin.split("$$");
                    u.text(q[0]);
                    l = r(this, u, n, e);
                    u.append(q[1])
                } else {
                    if (z && k.objective.length == 0) {
                        var q = LANG.mapper_objectives.sex.split("$$");
                        u.text(q[0]);
                        l = r(this, u, n, e);
                        u.append(q[1])
                    } else {
                        if (z) {
                            var q = LANG.mapper_objectives.ox_sey.split("$$");
                            u.text(q[0]);
                            l = r(this, u, a, e);
                            u.append(q[1]);
                            h = r(this, u, A, e);
                            u.append(q[2])
                        } else {
                            if (d && k.end.length == 0) {
                                var q = LANG.mapper_objectives.osx.split("$$");
                                u.text(q[0]);
                                l = r(this, u, n, e);
                                u.append(q[1])
                            } else {
                                if (d) {
                                    var q = LANG.mapper_objectives.osx_ey.split("$$");
                                    u.text(q[0]);
                                    l = r(this, u, A, e);
                                    u.append(q[1]);
                                    h = r(this, u, g, e);
                                    u.append(q[2])
                                } else {
                                    if (p && k.start.length == 0) {
                                        var q = LANG.mapper_objectives.oex.split("$$");
                                        u.text(q[0]);
                                        l = r(this, u, n, e);
                                        u.append(q[1])
                                    } else {
                                        if (p) {
                                            var q = LANG.mapper_objectives.oex_sy.split("$$");
                                            u.text(q[0]);
                                            l = r(this, u, a, e);
                                            u.append(q[1]);
                                            h = r(this, u, A, e);
                                            u.append(q[2])
                                        } else {
                                            if (k.start.length > 0 && k.end.length > 0 && k.objective.length > 0) {
                                                var q = LANG.mapper_objectives.ox_sy_ez.split("$$");
                                                u.text(q[0]);
                                                l = r(this, u, a, e);
                                                u.append(q[1]);
                                                h = r(this, u, A, e);
                                                u.append(q[2]);
                                                w = r(this, u, g, e);
                                                u.append(q[3])
                                            } else {
                                                if (k.start.length > 0 && k.end.length > 0) {
                                                    var q = LANG.mapper_objectives.sx_ey.split("$$");
                                                    u.text(q[0]);
                                                    l = r(this, u, a, e);
                                                    u.append(q[1]);
                                                    h = r(this, u, g, e);
                                                    u.append(q[2])
                                                } else {
                                                    if (k.start.length > 0 && k.objective.length > 0) {
                                                        var q = LANG.mapper_objectives.ox_sy.split("$$");
                                                        u.text(q[0]);
                                                        l = r(this, u, a, e);
                                                        u.append(q[1]);
                                                        h = r(this, u, A, e);
                                                        u.append(q[2])
                                                    } else {
                                                        if (k.end.length > 0 && k.objective.length > 0) {
                                                            var q = LANG.mapper_objectives.ox_ey.split("$$");
                                                            u.text(q[0]);
                                                            l = r(this, u, A, e);
                                                            u.append(q[1]);
                                                            h = r(this, u, g, e);
                                                            u.append(q[2])
                                                        } else {
                                                            if (k.start.length > 0) {
                                                                var q = LANG.mapper_objectives.sx.split("$$");
                                                                u.text(q[0]);
                                                                l = r(this, u, n, e);
                                                                u.append(q[1])
                                                            } else {
                                                                if (k.end.length > 0) {
                                                                    var q = LANG.mapper_objectives.ex.split("$$");
                                                                    u.text(q[0]);
                                                                    l = r(this, u, n, e);
                                                                    u.append(q[1])
                                                                } else {
                                                                    if (k.objective.length > 0) {
                                                                        var q = LANG.mapper_objectives.ox.split("$$");
                                                                        u.text(q[0]);
                                                                        l = r(this, u, n, e);
                                                                        u.append(q[1])
                                                                    } else {
                                                                        var q = LANG.mapper_happensin.split("$$");
                                                                        u.text(q[0]);
                                                                        l = r(this, u, n, e);
                                                                        u.append(q[1])
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                m.append(u);
                if (l && l.isLink) {
                    l.click()
                } else {
                    if (h && h.isLink) {
                        h.click()
                    } else {
                        if (w && w.isLink) {
                            w.click()
                        }
                    }
                }
            } else {
                var q = LANG.mapper_happensin.split("$$");
                var u = $("<span/>", {
                    text: q[0]
                });
                var l = r(this, u, n, e);
                u.append(q[1]);
                m.append(u);
                if (l && l.isLink) {
                    l.click()
                }
            }
        }
    },
    setSize: function (a, b) {
        this.tempWidth = a;
        this.tempHeight = b;
        this.updateMap(true)
    },
    getZoom: function () {
        return this.zoom
    },
    setZoom: function (a, b) {
        this.zoom = a;
        this.tempWidth = this.tempHeight = null;
        this.updateMap(b)
    },
    toggleZoom: function (a) {
        this.zoom = 1 - this.zoom;
        this.updateMap(true);
        if (a) {
            this.getMousePos(a)
        }
        if (this.sZoom) {
            if (this.sZoom.style.display == "none") {
                this.sZoom.style.display = ""
            } else {
                this.sZoom.style.display = "none"
            }
        }
        if (this.zoom) {
            MapViewer.show({
                mapper: this
            })
        }
    },
    getShow: function () {
        return this.show
    },
    setShow: function (a) {
        this.show = a;
        var c = this.show ? "" : "none";
        for (var b in this.floorPins) {
            this.floorPins[b].style.display = c
        }
        RedButton.setText(this.sToggle, (this.show ? LANG.mapper_hidepins : LANG.mapper_showpins))
    },
    toggleShow: function () {
        this.setShow(!this.show)
    },
    getCoords: function () {
        var b = [];
        for (var c in this.pins) {
            if (!this.pins[c].free) {
                b.push([this.pins[c].x, this.pins[c].y])
            }
        }
        return b
    },
    clearPins: function () {
        for (var a in this.pins) {
            this.pins[a].style.display = "none";
            this.pins[a].free = true
        }
    },
    setCoords: function (n, k) {
        var m;
        var b, h;
        if (k === undefined) {
            this.clearPins();
            if (n.length) {
                h = true;
                b = 0
            } else {
                for (var g in n) {
                    b = g;
                    break
                }
                if (b == null) {
                    return
                }
                n = n[b]
            }
            b = parseInt(b);
            if (!h) {
                b = this.fixLevel(b);
                this.level = b
            }
        } else {
            b = k
        }
        this.nCoords = n.length;
        for (var g in n) {
            var l = n[g],
                d = l[2];
            if (l[0] === undefined || l[1] === undefined) {
                continue
            }
            m = this.getPin(b);
            m.x = l[0];
            m.y = l[1];
            m.style.left = m.x + "%";
            m.style.top = m.y + "%";
            if (this.editable) {
                m.a.onmouseup = this.delPin.bind(this, m)
            } else {
                if (d && d.url) {
                    m.a.href = Markup._fixUrl(d.url);
                    m.a.rel = "np";
                    m.a.style.cursor = "pointer"
                }
            }
            if (d && d.tooltip) {
                m.a.tt = "";
                var j = false;
                for (var a in d.tooltip) {
                    if (m.a.tt != "") {
                        m.a.tt += "<br />"
                    }
                    m.a.tt += '<b class="q">' + a + "</b> ($)<br />";
                    for (var r in d.tooltip[a].info) {
                        m.a.tt += "<div>" + d.tooltip[a].info[r] + "</div>"
                    }
                    if (!j && d.tooltip[a].footer) {
                        m.a.tt += d.tooltip[a].footer + "<br />";
                        j = true
                    }
                }
            } else {
                if (d && d.label) {
                    m.a.tt = d.label
                } else {
                    m.a.tt = "$"
                }
            }
            if (d && d.menu) {
                m.a.menu = d.menu;
                Menu.add(m.a, m.a.menu, {
                    showAtCursor: true
                })
            }
            if (d && d.type) {
                m.className += " pin-" + d.type
            }
            m.a.tt = $WH.str_replace(m.a.tt, "$", m.x.toFixed(1) + ", " + m.y.toFixed(1));
            if (d && d.lines) {
                for (var c = 0, f = d.lines.length; c < f; ++c) {
                    if (l[0] == d.lines[c][0] && l[1] == d.lines[c][1]) {
                        continue
                    }
                    for (var q = 0, e = Mapper.sizes.length; q < e; ++q) {
                        var o = Mapper.sizes[q];
                        m = Line(l[0] * o[0] / 100, l[1] * o[1] / 100, d.lines[c][0] * o[0] / 100, d.lines[c][1] * o[1] / 100, d.type);
                        m.className += " " + o[2];
                        $WH.ae(this.floorPins[b], m)
                    }
                }
            }
        }
        this.onPinUpdate && this.onPinUpdate(this)
    },
    getLink: function () {
        var b = "";
        for (var a in this.pins) {
            if (!this.pins[a].free && this.pins[a].floor == this.level) {
                b += (this.pins[a].x < 10 ? "0" : "") + (this.pins[a].x < 1 ? "0" : "") + (this.pins[a].x * 10).toFixed(0) + (this.pins[a].y < 10 ? "0" : "") + (this.pins[a].y < 1 ? "0" : "") + (this.pins[a].y * 10).toFixed(0)
            }
        }
        return (this.zone ? this.zone : "") + (Mapper.multiLevelZones[this.zone] && this.level != 0 ? "." + this.level : "") + (b ? ":" + b : "")
    },
    setLink: function (h, e) {
        var k = [];
        h = h.split(":");
        var f = h[0];
        var b = 0;
        if (f.indexOf(".") != -1) {
            var d = f.split(".");
            f = d[0];
            b = parseInt(d[1])
        }
        if (!this.setZone(f, b, e)) {
            return false
        }
        if (h.length == 2) {
            for (var c = 0; c < h[1].length; c += 6) {
                var j = h[1].substr(c, 3) / 10;
                var g = h[1].substr(c + 3, 3) / 10;
                if (isNaN(j) || isNaN(g)) {
                    break
                }
                k.push([j, g])
            }
        }
        this.setCoords(k, b);
        return true
    },
    updateMap: function (a) {
        this.parent.style.width = this.span.style.width = (this.tempWidth ? this.tempWidth : Mapper.sizes[this.zoom][0]) + "px";
        this.parent.style.height = this.span.style.height = (this.tempHeight ? this.tempHeight : Mapper.sizes[this.zoom][1]) + "px";
        if (!this.editable) {
            this.parent.style.cssFloat = this.parent.style.styleFloat = "left"
        }
        if (this.zone == "0") {
            this.span.style.background = "black"
        } else {
            var c = this.level;
            if (c == 1 && Mapper.onlyOneFloor[this.zone]) {
                c = 0
            }
            var b = this.zone + (c ? "-" + c : "");
            if (Mapper.multiLevelZones[this.zone]) {
                b = Mapper.multiLevelZones[this.zone][c]
            }
            this.setMap(b, c);
            if (!this.floorButton && Mapper.multiLevelZones[this.zone]) {
                this.floorButton = _ = RedButton.create((Mapper.zonePhased[this.zone] ? LANG.mapper_phase : LANG.mapper_floor), true, this.showFloors.bind(this));
                _.style["float"] = "right";
                $WH.ns(_);
                this.buttonDiv.appendChild(_)
            } else {
                if (this.floorButton) {
                    this.floorButton.style.display = Mapper.multiLevelZones[this.zone] ? "" : "none"
                }
            }
        }
        if (this.sToggle) {
            this.sToggle.style.display = (this.toggle && this.nCoords ? "" : "none")
        }
        $(".line", this.floorPins[c]).hide();
        $(".line." + Mapper.sizes[this.zoom][2], this.floorPins[c]).show();
        this.onMapUpdate && this.onMapUpdate(this)
    },
    cleanPin: function (b, c) {
        var a = this.pins[b];
        a.style.display = "";
        a.free = false;
        a.className = "pin";
        a.a.onmousedown = $WH.rf;
        a.a.onmouseup = $WH.rf;
        a.a.href = "javascript:;";
        a.a.style.cursor = "default";
        a.floor = c;
        return a
    },
    getPin: function (e) {
        for (var d = 0; d < this.pins.length; ++d) {
            if (this.pins[d].free) {
                return this.cleanPin(d, e)
            }
        }
        var c = $WH.ce("div"),
            b = $WH.ce("a");
        c.className = "pin";
        c.appendChild(b);
        c.a = b;
        c.floor = e;
        b.onmouseover = this.pinOver;
        b.onmouseout = $WH.Tooltip.hide;
        b.onclick = $WH.sp;
        this.pins.push(c);
        this.cleanPin(this.pins.length - 1, e);
        if (!this.floorPins[e]) {
            this.floorPins[e] = $WH.ce("div");
            this.floorPins[e].style.display = this.show ? "" : "none";
            if (e == this.level) {
                $WH.ae(this.span, this.floorPins[e])
            }
        }
        $WH.ae(this.floorPins[e], c);
        return c
    },
    addPin: function (b) {
        b = $WH.$E(b);
        if (b._button >= 2) {
            return
        }
        this.getMousePos(b);
        var a = this.getPin(this.level);
        a.x = this.mouseX;
        a.y = this.mouseY;
        a.style.left = a.x.toFixed(1) + "%";
        a.style.top = a.y.toFixed(1) + "%";
        a.a.onmouseup = this.delPin.bind(this, a);
        a.a.tt = a.x.toFixed(1) + ", " + a.y.toFixed(1);
        this.onPinUpdate && this.onPinUpdate(this);
        return false
    },
    delPin: function (a, b) {
        b = $WH.$E(b);
        a.style.display = "none";
        a.free = true;
        $WH.sp(b);
        this.onPinUpdate && this.onPinUpdate(this);
        return
    },
    pinOver: function () {
        $WH.Tooltip.show(this, this.tt, 4, 0)
    },
    getMousePos: function (b) {
        b = $WH.$E(b);
        var d = $WH.ac(this.parent);
        var a = $WH.g_getScroll();
        this.mouseX = Math.floor((b.clientX + a.x - d[0] - 3) / Mapper.sizes[this.zoom][0] * 1000) / 10;
        this.mouseY = Math.floor((b.clientY + a.y - d[1] - 3) / Mapper.sizes[this.zoom][1] * 1000) / 10;
        if (this.mouseX < 0) {
            this.mouseX = 0
        } else {
            if (this.mouseX > 100) {
                this.mouseX = 100
            }
        }
        if (this.mouseY < 0) {
            this.mouseY = 0
        } else {
            if (this.mouseY > 100) {
                this.mouseY = 100
            }
        }
        if (this.mouse) {
            g_setTextNodes(this.sMouse, "(" + this.mouseX.toFixed(1) + ", " + this.mouseY.toFixed(1) + ")")
        }
    }
};
var g_zone_areas = {};
var MapViewer = new function () {
        var f, t, z, b, u, d, l, i, v, c, m, a, o, k, q;

        function h() {
            var A = Math.max(50, Math.min(618, $WH.g_getWindowSize().h - 72));
            b = 1;
            z = 1;
            if (b > 1) {
                b = 1
            }
            if (z > 1) {
                z = 1
            }
            f = Math.round(z * 772);
            t = Math.round(z * 515);
            var B = Math.max(480, f);
            Lightbox.setSize(B + 20, t + 52)
        }
        function e(A) {
            var B = function (E, D) {
                    D += ":" + E.zone;
                    if (E.level) {
                        D += "." + E.level
                    }
                    return D
                };
            var C = "#map";
            if (c) {
                C += "=" + u.getLink()
            } else {
                if (Mapper.zoneDefaultLevel[u.zone]) {
                    if (Mapper.zoneDefaultLevel[u.zone] != u.level) {
                        C = B(u, C)
                    }
                } else {
                    if (u.level != 0) {
                        C = B(u, C)
                    } else {
                        if ((!$WH.isset("g_mapperData") || !g_mapperData[u.zone]) && (!$WH.isset("g_mapper_data") || !g_mapper_data[u.zone])) {
                            C = B(u, C)
                        }
                    }
                }
            }
            return C
        }
        function r() {
            if (l) {
                l(u)
            }
            location.replace(e(true))
        }
        function p(A) {
            if (A && (z == b) && $WH.g_getWindowSize().h > a.offsetHeight) {
                return
            }
            a.style.visibility = "hidden";
            h(0);
            if (!A) {
                if (!m) {
                    m = $WH.ce("div");
                    m.style.height = "325px";
                    m.style.padding = "3px";
                    m.style.marginTop = "10px"
                }
                u.parent.style.borderWidth = "0px";
                u.parent.style.marginTop = "0px";
                u.span.style.cursor = "pointer";
                if (u.span.onclick) {
                    d = u.span.onclick
                }
                u.span.onclick = Lightbox.hide;
                u.span.onmouseover = function () {
                    q.style.display = "block"
                };
                u.span.onmouseout = function () {
                    setTimeout(function () {
                        if (!q.hasMouse) {
                            q.style.display = "none"
                        }
                    }, 10)
                };
                if (u.onMapUpdate) {
                    l = u.onMapUpdate
                }
                u.onMapUpdate = r;
                if (!c) {
                    i = u.parent.parentNode;
                    v = u.parent.nextSibling;
                    i.insertBefore(m, u.parent);
                    $WH.de(u.parent);
                    $WH.ae(mapDiv, u.parent)
                } else {
                    $WH.de(c);
                    $WH.ae(mapDiv, c)
                }
                if (location.hash.indexOf("#show") == -1) {
                    location.replace(e(false))
                } else {
                    if ($WH.isset("mapShower")) {
                        mapShower.onExpand()
                    }
                }
            }
            Lightbox.reveal();
            a.style.visibility = "visible"
        }
        function g() {
            p(1)
        }
        function n() {
            if (d) {
                u.span.onclick = d
            } else {
                u.span.onclick = null
            }
            d = null;
            if (l) {
                u.onMapUpdate = l
            } else {
                u.onMapUpdate = null
            }
            l = null;
            u.span.style.cursor = "";
            u.span.onmouseover = null;
            u.span.onmouseout = null;
            if (!c) {
                $WH.de(m);
                $WH.de(u.parent);
                u.parent.style.borderWidth = "";
                u.parent.style.marginTop = "";
                if (v) {
                    i.insertBefore(u.parent, v)
                } else {
                    $WH.ae(i, u.parent)
                }
                i = v = null
            } else {
                $WH.de(c);
                c = null
            }
            u.toggleZoom();
            if (location.hash.indexOf("#show") == -1) {
                location.replace("#.")
            } else {
                if ($WH.isset("mapShower")) {
                    mapShower.onCollapse()
                }
            }
        }
        function w(B, E, C) {
            u = C.mapper;
            a = B;
            if (E) {
                B.className = "mapviewer";
                o = $WH.ce("div");
                o.style.width = "772px";
                o.style.height = "515px";
                o.className = "mapviewer-screen";
                q = $WH.ce("a");
                q.className = "mapviewer-cover";
                q.href = "javascript:;";
                q.onclick = Lightbox.hide;
                q.onmouseover = function () {
                    q.hasMouse = true
                };
                q.onmouseout = function () {
                    q.hasMouse = false
                };
                var G = $WH.ce("span");
                var A = $WH.ce("b");
                $WH.ae(A, $WH.ct(LANG.close));
                $WH.ae(G, A);
                $WH.ae(q, G);
                $WH.ae(o, q);
                mapDiv = $WH.ce("div");
                $WH.ae(o, mapDiv);
                $WH.ae(B, o);
                var F = $WH.ce("a");
                F.className = "dialog-x";
                F.href = "javascript:;";
                F.onclick = Lightbox.hide;
                $WH.ae(F, $WH.ct(LANG.close));
                $WH.ae(B, F);
                var D = $WH.ce("div");
                D.className = "clear";
                $WH.ae(B, D)
            }
            j()
        }
        function j() {
            p()
        }
        this.checkPound = function () {
            if (location.hash && location.hash.indexOf("#map") == 0) {
                var E = location.hash.split("=");
                if (E.length == 2) {
                    var C = E[1];
                    if (C) {
                        MapViewer.show({
                            link: C
                        })
                    }
                } else {
                    E = location.hash.split(":");
                    var D = $WH.ge("sjdhfkljawelis");
                    if (D) {
                        D.onclick()
                    }
                    if (E.length == 2) {
                        if (!D) {
                            MapViewer.show({
                                link: E[1]
                            })
                        }
                        var A = E[1].split(".");
                        var B = {
                            zone: A[0]
                        };
                        if (A.length == 2) {
                            B.level = parseInt(A[1]) + 1
                        }
                        u.update(B)
                    }
                }
            }
        };
        this.show = function (A) {
            if (A.link) {
                c = $WH.ce("div");
                c.id = "fewuiojfdksl";
                $WH.ae(document.body, c);
                var B = new Mapper({
                    parent: c.id
                });
                B.setLink(A.link, true);
                B.toggleZoom()
            } else {
                Lightbox.show("mapviewer", {
                    onShow: w,
                    onHide: n,
                    onResize: g
                }, A)
            }
        };
        $(document).ready(this.checkPound)
    };
var MARKUP_MODE_COMMENT = 1,
    MARKUP_MODE_ARTICLE = 2,
    MARKUP_MODE_QUICKFACTS = 3,
    MARKUP_MODE_SIGNATURE = 4,
    MARKUP_CLASS_ADMIN = 40,
    MARKUP_CLASS_STAFF = 30,
    MARKUP_CLASS_PREMIUM = 20,
    MARKUP_CLASS_USER = 10,
    MARKUP_CLASS_PENDING = 1;
var MARKUP_SOURCE_LIVE = 1,
    MARKUP_SOURCE_PTR = 2,
    MARKUP_SOURCE_BETA = 3;
var MarkupModeMap = {};
MarkupModeMap[MARKUP_MODE_COMMENT] = "comment";
MarkupModeMap[MARKUP_MODE_ARTICLE] = "article";
MarkupModeMap[MARKUP_MODE_QUICKFACTS] = "quickfacts";
MarkupModeMap[MARKUP_MODE_SIGNATURE] = "signature";
var MarkupSourceMap = {};
MarkupSourceMap[MARKUP_SOURCE_LIVE] = "live";
MarkupSourceMap[MARKUP_SOURCE_PTR] = "ptr";
MarkupSourceMap[MARKUP_SOURCE_BETA] = "beta";
var MarkupIconPath = "";
if ($WH.isset("g_thottbot") && g_thottbot) {
    MarkupIconPath = wowheadUrl + "/tb"
}
var Markup = {
    MODE_COMMENT: MARKUP_MODE_COMMENT,
    MODE_ARTICLE: MARKUP_MODE_ARTICLE,
    MODE_QUICKFACTS: MARKUP_MODE_QUICKFACTS,
    MODE_SIGNATURE: MARKUP_MODE_SIGNATURE,
    SOURCE_LIVE: MARKUP_SOURCE_LIVE,
    SOURCE_PTR: MARKUP_SOURCE_PTR,
    SOURCE_BETA: MARKUP_SOURCE_BETA,
    CLASS_ADMIN: MARKUP_CLASS_ADMIN,
    CLASS_STAFF: MARKUP_CLASS_STAFF,
    CLASS_PREMIUM: MARKUP_CLASS_PREMIUM,
    CLASS_USER: MARKUP_CLASS_USER,
    CLASS_PENDING: MARKUP_CLASS_PENDING,
    whitelistedWebsites: [/(.*\.)?wowhead.com/i, /(.*\.)?thottbot.com/i, /(.*\.)?mmoui.com/i, /(.*\.)?tankspot.com/i, /(.*\.)?guildfans.com/i, /(.*\.)?allakhazam.com/i, /(.*\.)?zam.com/i, /(.*\.)?blizzard.com/i, /(.*\.)?worldofwarcraft.com/i, /(.*\.)?wow-europe.com/i, /(.*\.)?battle.net/i, /(.*\.)?sc2ranks.com/i, /(.*\.)?torchlightarmory.com/i, /(.*\.)?vindictusdb.com/i, /(.*\.)?wowinterface.com/i, /(.*\.)?vginterface.com/i, /(.*\.)?lotrointerface.com/i, /(.*\.)?eq2interface.com/i, /(.*\.)?eqinterface.com/i, /(.*\.)?mmo-champion.com/i, /(.*\.)?joystiq.com/i, /(.*\.)?wow-heroes.com/i, /(.*\.)?be-imba.hu/i, /(.*\.)?wowpedia.org/i, /(.*\.)?curse.com/i, /(.*\.)?elitistjerks.com/i, /(.*\.)?wowwiki.com/i, /(.*\.)?worldoflogs.com/i, /(.*\.)?wowinsider.com/i, /(.*\.)?guildwork.com/i],
    rolesToClass: function (a) {
        if (a & (U_GROUP_ADMIN | U_GROUP_VIP | U_GROUP_DEV)) {
            return Markup.CLASS_ADMIN
        } else {
            if (a & U_GROUP_STAFF) {
                return Markup.CLASS_STAFF
            } else {
                if (a & U_GROUP_PREMIUM) {
                    return Markup.CLASS_PREMIUM
                } else {
                    if (a & U_GROUP_PENDING) {
                        return Markup.CLASS_PENDING
                    } else {
                        return Markup.CLASS_USER
                    }
                }
            }
        }
    },
    defaultSource: false,
    nameCol: "name_enus",
    domainToLocale: {
        www: "enus",
        ptr: "ptr",
        beta: "beta",
        cata: "beta",
        fr: "frfr",
        de: "dede",
        es: "eses",
        ru: "ruru"
    },
    maps: [],
    firstTags: {},
    postTags: [],
    collectTags: {},
    excludeTags: {},
    tooltipTags: {},
    tooltipBare: {},
    attributes: {
        id: {
            req: false,
            valid: /^[a-z0-9_-]+$/i
        },
        title: {
            req: false,
            valid: /[\S ]+/
        },
        "class": {
            req: false,
            valid: /\S+/
        }
    },
    IsLinkAllowed: function (d) {
        var e = d.match("[a-z]+://([a-z0-9.-]+)");
        if (!e) {
            return true
        }
        var a = e[1];
        var f = false;
        for (var b in Markup.whitelistedWebsites) {
            var c = Markup.whitelistedWebsites[b];
            if (a.search(c) == 0) {
                f = true
            }
        }
        return f
    },
    tags: {
        "<text>": {
            empty: true,
            toHtml: function (b, a) {
                a = a || $.noop;
                if (b._text == " " && !a.noNbsp) {
                    b._text = "&nbsp;"
                }
                b._text = b._text.replace(/\\\[/g, "[");
                if (a && a.noLink) {
                    return b._text
                } else {
                    if (a && a.needsRaw) {
                        return b._rawText
                    } else {
                        var d = [];
                        var e = Markup._preText(b._rawText.replace(/(https?:\/\/|www\.)([\/_a-z0-9\%\?#@\-\+~&=;:']|\.[a-z0-9\-])+/gi, function (f) {
                            matchUrl = Markup._preText(f.replace(/^www/, "http://www"));
                            f = Markup._preText(f);
                            var g = d.length;
                            d.push([matchUrl, f]);
                            return "$L" + g
                        }));
                        e = e.replace(/\$L([\d+]) /gi, "$L$1&nbsp;");
                        for (var c in d) {
                            e = e.replace("$L" + c, function (g) {
                                if (Markup.allow < Markup.CLASS_USER && !Markup.IsLinkAllowed(d[c][0])) {
                                    return $WH.sprintf('<span class="tip" onmouseover="$WH.Tooltip.showAtCursor(event, LANG.linkremoved_tip, 0, 0, \'q\')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">[$1]</span>', LANG.linkremoved)
                                }
                                var f = '<a href="' + d[c][0] + '"';
                                if (Markup._isUrlExternal(d[c][0])) {
                                    f += ' target="_blank"'
                                }
                                f += ">" + d[c][1] + "</a>";
                                return f
                            })
                        }
                        return e
                    }
                }
            },
            toText: function (a) {
                return a._text
            }
        },
        achievement: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                diff: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var g = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var d = f[0];
                var e = f[1];
                var a = [];
                if (b.diff) {
                    a.push("diff=" + b.diff)
                }
                if (g_achievements[g] && g_achievements[g][e]) {
                    var c = g_achievements[g];
                    return '<a href="' + d + wowheadUrl + "/achievement=" + g + '"' + (!b.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + c.icon.toLowerCase() + '.gif)"' : "") + Markup._addGlobalAttributes(b) + (a.length ? ' rel="' + a.join("&") + '"' : "") + ">" + Markup._safeHtml(c[e]) + "</a>"
                }
                return '<a href="' + d + wowheadUrl + "/achievement=" + g + '"' + Markup._addGlobalAttributes(b) + (a.length ? ' rel="' + a.join("&") + '"' : "") + ">(" + LANG.types[10][0] + " #" + g + ")</a>"
            },
            toText: function (a) {
                var e = a.unnamed;
                var d = Markup._getDatabaseDomainInfo(a);
                var b = d[0];
                var c = d[1];
                if (g_achievements[e] && g_achievements[e][c]) {
                    return Markup._safeHtml(g_achievements[e][c])
                }
                return LANG.types[10][0] + " #" + e
            }
        },
        achievementpoints: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var b = '<span class="moneyachievement tip" onmouseover="Listview.funcBox.moneyAchievementOver(event)" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()"' + Markup._addGlobalAttributes(a) + ">" + a.unnamed + "</span>";
                return b
            }
        },
        anchor: {
            empty: true,
            ltrim: true,
            rtrim: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /\S+/
                }
            },
            validate: function (a) {
                if (!a.unnamed && !a.id) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                if (!a.unnamed && a.id) {
                    a.unnamed = a.id;
                    a.id = null
                }
                return '<a name="' + a.unnamed + '"' + Markup._addGlobalAttributes(a) + "></a>"
            }
        },
        b: {
            empty: false,
            toHtml: function (a) {
                return ["<b" + Markup._addGlobalAttributes(a) + ">", "</b>"]
            },
            fromHtml: function (a) {
                return a.replace(/<(b|big|strong)\b[\s\S]*?>([\s\S]*?)<\/\1>/gi, "[b]$2[/b]")
            }
        },
        blip: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var b = "http://blip.tv/play/" + a.unnamed;
                var d = 600;
                var e = 368;
                var c = "";
                c += '<embed width="' + d + '" height="' + e + '" src="' + b + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>';
                return c
            }
        },
        br: {
            empty: true,
            toHtml: function (a) {
                return "<br />"
            },
            fromHtml: function (a) {
                return a.replace(/<br\b[\s\S]*?>/gi, "\n")
            }
        },
        "class": {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                if (a.unnamed >= 1 && a.unnamed <= 11 && a.unnamed != 10) {
                    return true
                }
                return false
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var c = e[0];
                var d = e[1];
                if (g_classes[f] && g_classes[f][d]) {
                    var b = g_classes[f];
                    return '<a href="' + c + wowheadUrl + "/class=" + f + '"' + (!a.icon ? ' class="icontiny c' + f + '" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_classes.getIcon(f) + '.gif)"' : "") + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
                }
                return '<a href="' + c + wowheadUrl + "/class=" + f + '" class="c' + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[13][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_classes[d] && g_classes[d][b]) {
                    return Markup._safeHtml(g_classes[d][b])
                }
                return LANG.types[13][0] + " #" + d
            }
        },
        code: {
            block: true,
            empty: false,
            rtrim: true,
            itrim: true,
            allowedChildren: {
                "<text>": 1
            },
            toHtml: function (a) {
                var b = '<pre class="code';
                if (a.first) {
                    b += " first"
                }
                if (a.last) {
                    b += " last"
                }
                b += '"' + Markup._addGlobalAttributes(a) + ">";
                return [b, "</pre>"]
            }
        },
        color: {
            empty: false,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^.*/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            extraColors: {
                deathknight: "c6",
                dk: "c6",
                druid: "c11",
                hunter: "c3",
                mage: "c8",
                paladin: "c2",
                priest: "c5",
                rogue: "c4",
                shaman: "c7",
                warlock: "c9",
                warrior: "c1",
                poor: "q0",
                common: "q1",
                uncommon: "q2",
                rare: "q3",
                epic: "q4",
                legendary: "q5",
                artifact: "q6",
                heirloom: "q7"
            },
            toHtml: function (a) {
                var c = /^(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|c\d+|r\d+|q\d*?|#[a-f0-9]{6})$/i;
                var d = "<span ";
                if (a.unnamed.match(c)) {
                    if (a.unnamed == "#00C0FF") {
                        d += 'class="blizzard-blue"' + Markup._addGlobalAttributes(a)
                    } else {
                        var b = a.unnamed.charAt(0);
                        d += ((b == "q" || b == "c" || (b == "r" && a.unnamed != "red")) ? 'class="' : 'style="color: ') + a.unnamed + '"' + Markup._addGlobalAttributes(a)
                    }
                } else {
                    if (Markup.tags.color.extraColors[a.unnamed]) {
                        d += 'class = "' + Markup.tags.color.extraColors[a.unnamed] + '"'
                    }
                }
                d += ">";
                return [d, "</span>"]
            }
        },
        currency: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                amount: {
                    req: false,
                    valid: /^[0-9\:]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var b = e[0];
                var c = e[1];
                if (g_gatheredcurrencies[f] && g_gatheredcurrencies[f][c]) {
                    var d = g_gatheredcurrencies[f];
                    if (a.amount) {
                        return '<a href="' + b + wowheadUrl + "/currency=" + f + '"' + (!a.icon ? ' class="icontinyr tip q1" onmouseover="$WH.Tooltip.showAtCursor(event, \'' + Markup._safeHtml(d[c]) + '\', 0, 0, \'q1\');" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + d.icon[0].toLowerCase() + '.gif)"' : "") + Markup._addGlobalAttributes(a) + ">" + a.amount.split(":").join(" - ") + "</a>"
                    } else {
                        return '<a href="' + b + wowheadUrl + "/currency=" + f + '"' + (!a.icon ? ' class="icontiny q1" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + d.icon[0].toLowerCase() + '.gif)"' : "") + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(d[c]) + "</a>"
                    }
                }
                return '<a href="' + b + "/currency=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[17][0] + " #" + f + ")</a>" + (a.amount > 0 ? " x" + a.amount : "")
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_gatheredcurrencies[d] && g_gatheredcurrencies[d][b]) {
                    return Markup._safeHtml(g_gatheredcurrencies[d][b])
                }
                return LANG.types[17][0] + " #" + d
            }
        },
        db: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^(live|ptr|beta|cata)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                if (a.unnamed == "live") {
                    Markup.defaultSource = Markup.SOURCE_LIVE
                } else {
                    if (a.unnamed == "ptr") {
                        Markup.defaultSource = Markup.SOURCE_PTR
                    } else {
                        if (a.unnamed == "beta" || a.unnamed == "cata") {
                            Markup.defaultSource = Markup.SOURCE_BETA
                        }
                    }
                }
                return ""
            },
            toText: function (a) {
                if (a.unnamed == "live") {
                    Markup.defaultSource = Markup.SOURCE_LIVE
                } else {
                    if (a.unnamed == "ptr") {
                        Markup.defaultSource = Markup.SOURCE_PTR
                    } else {
                        if (a.unnamed == "beta" || a.unnamed == "cata") {
                            Markup.defaultSource = Markup.SOURCE_BETA
                        }
                    }
                }
                return ""
            }
        },
        del: {
            empty: false,
            attr: {
                copy: {
                    req: false,
                    valid: /^true$/
                }
            },
            toHtml: function (a) {
                var b = '<del class="diffmod"' + Markup._addGlobalAttributes(a);
                if (!a.copy) {
                    b += ' unselectable="on"'
                }
                b += ">";
                return [b, "</del>"]
            }
        },
        div: {
            empty: false,
            block: true,
            ltrim: true,
            rtrim: true,
            itrim: true,
            attr: {
                clear: {
                    req: false,
                    valid: /^(left|right|both)$/i
                },
                unnamed: {
                    req: false,
                    valid: /^hidden$/i
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                align: {
                    req: false,
                    valid: /^(left|right|center)$/i
                },
                margin: {
                    req: false,
                    valid: /^\d+$/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var d = "<div" + Markup._addGlobalAttributes(a);
                var b = [];
                var c = [];
                if (a.clear) {
                    b.push("clear: " + a.clear)
                }
                if (a.unnamed) {
                    b.push("display: none")
                }
                if (a.width) {
                    b.push("width: " + a.width)
                }
                if (a["float"]) {
                    b.push("float: " + a["float"]);
                    if (a.margin === undefined) {
                        if (a["float"] == "left") {
                            b.push("margin: 0 10px 10px 0")
                        } else {
                            b.push("margin: 0 0 10px 10px")
                        }
                    }
                }
                if (a.align) {
                    b.push("text-align: " + a.align)
                }
                if (a.margin) {
                    b.push("margin: " + a.margin)
                }
                if (a.first) {
                    c.push("first")
                }
                if (a.last) {
                    c.push("last")
                }
                if (b.length > 0) {
                    d += ' style="' + b.join(";") + '"'
                }
                if (c.length > 0) {
                    d += ' class="' + c.join(" ") + '"'
                }
                d += ">";
                return [d, "</div>"]
            },
            fromHtml: function (e, d) {
                d = d || 0;
                var a;
                if (a = Markup.matchOuterTags(e, "<div\\b[\\s\\S]*?>", "</div>", "g")) {
                    for (var b = 0; b < a.length; ++b) {
                        var f = a[b][1].match(/float:\s*(left|right)"/i),
                            c = a[b][1].match(/width[:="]+\s*([0-9]+)/i);
                        e = e.replace(a[b][1] + a[b][0] + a[b][2], "\n" + Array(d + 1).join("\t") + "[div" + (f ? " float=" + f[1] : "") + (c ? " width=" + c[1] : "") + "]" + Markup.tags.div.fromHtml(a[b][0], d + 1) + "[/div]")
                    }
                }
                return e
            }
        },
        event: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var c = e[0];
                var d = e[1];
                if (g_holidays[f] && g_holidays[f][d]) {
                    var b = g_holidays[f];
                    return '<a href="' + c + wowheadUrl + "/event=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
                }
                return '<a href="' + c + wowheadUrl + "/event=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[12][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_holidays[d] && g_holidays[d][b]) {
                    return Markup._safeHtml(g_holidays[d][b])
                }
                return LANG.types[12][0] + " #" + d
            }
        },
        faction: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var b = e[0];
                var c = e[1];
                if (g_factions[f] && g_factions[f][c]) {
                    var d = g_factions[f];
                    return '<a href="' + b + wowheadUrl + "/faction=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(d[c]) + "</a>"
                }
                return '<a href="' + b + wowheadUrl + "/faction=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[8][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_factions[d] && g_factions[d][b]) {
                    return Markup._safeHtml(g_factions[d][b])
                }
                return LANG.types[8][0] + " #" + d
            }
        },
        feedback: {
            empty: true,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                mailto: {
                    req: false,
                    valid: /^true$/i
                }
            },
            toHtml: function (a) {
                return '<b><span class="icontiny" style="background-image: url(' + g_staticUrl + "/images/icons" + MarkupIconPath + '/email.gif)"><a href="' + (a.mailto ? "mailto:feedback@wowhead.com" : 'javascript:;" onclick="ContactTool.show();') + '">feedback@wowhead.com</a></span></b>'
            }
        },
        forumrules: {
            empty: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                return '<b><span class="icontiny" style="background-image: url(' + g_staticUrl + "/images/icons" + MarkupIconPath + '/favicon.gif)"><a href="' + wowheadUrl + '/forums&topic=2">forum rules</a></span></b>'
            }
        },
        hr: {
            empty: true,
            trim: true,
            allowedModes: {
                article: 1,
                quickfacts: 1,
                comment: 1
            },
            toHtml: function (a) {
                return "<hr />"
            },
            fromHtml: function (a) {
                return a.replace(/<hr\b[\s\S]*?>/gi, "[hr]")
            }
        },
        h2: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^first$/i
                },
                clear: {
                    req: false,
                    valid: /^(true|both|left|right)$/i
                },
                toc: {
                    req: false,
                    valid: /^false$/i
                }
            },
            toHtml: function (a) {
                if (!a.id) {
                    a.id = g_urlize(a._textContents)
                }
                str = "<h2" + Markup._addGlobalAttributes(a);
                var b = [];
                if (a.first || a.unnamed) {
                    b.push("first")
                }
                if (a.last) {
                    b.push("last")
                }
                if (b.length > 0) {
                    str += ' class="' + b.join(" ") + '"'
                }
                if (a.clear) {
                    if (a.clear == "true" || a.clear == "both") {
                        str += ' style="clear: both"'
                    } else {
                        str += ' style="clear: ' + a.clear + '"'
                    }
                }
                return [str + ">", "</h2>"]
            },
            fromHtml: function (a) {
                return a.replace(/<h2\b[\s\S]*?>([\s\S]*?)<\/h2>/gi, "\n[h2]$1[/h2]")
            }
        },
        h3: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^first$/i
                },
                toc: {
                    req: false,
                    valid: /^false$/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                if (!a.id) {
                    a.id = g_urlize(a._textContents)
                }
                var c = "<h3" + Markup._addGlobalAttributes(a);
                var b = [];
                if (a.first || a.unnamed) {
                    b.push("first")
                }
                if (a.last) {
                    b.push("last")
                }
                if (b.length > 0) {
                    c += ' class="' + b.join(" ") + '"'
                }
                return [c + ">", "</h3>"]
            },
            fromHtml: function (a) {
                return a.replace(/<h3\b[\s\S]*?>([\s\S]*?)<\/h3>/gi, "\n[h3]$1[/h3]")
            }
        },
        html: {
            empty: false,
            allowedClass: MARKUP_CLASS_ADMIN,
            allowedChildren: {
                "<text>": 1
            },
            rawText: true,
            taglessSkip: true,
            toHtml: function (a) {
                return [a._contents]
            }
        },
        i: {
            empty: false,
            toHtml: function (a) {
                return ["<i" + Markup._addGlobalAttributes(a) + ">", "</i>"]
            },
            fromHtml: function (a) {
                return a.replace(/<(i|em)\b[\s\S]*?>([\s\S]*?)<\/\1>/gi, "[i]$1[/i]")
            }
        },
        icon: {
            empty: false,
            itrim: true,
            attr: {
                align: {
                    req: false,
                    valid: /^right$/i
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                name: {
                    req: false,
                    valid: /\S+/
                },
                size: {
                    req: false,
                    valid: /^(tiny|small|medium|large)$/
                },
                unnamed: {
                    req: false,
                    valid: /^class$/i
                },
                url: {
                    req: false,
                    valid: /\S+/
                },
                preset: {
                    req: false,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            presets: {
                boss: g_staticUrl + "/images/icons" + MarkupIconPath + "/boss.gif",
                heroic: g_staticUrl + "/images/icons" + MarkupIconPath + "/heroic.gif"
            },
            validate: function (a) {
                if (!a.name && !a.url && !a.preset) {
                    return false
                }
                if (a.preset && !Markup.tags.icon.presets[a.preset]) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var c = (a.size ? a.size : "tiny");
                if (!a.name) {
                    a.name = ""
                }
                if (c == "tiny") {
                    var f = "<span" + Markup._addGlobalAttributes(a) + ' class="';
                    if (a.unnamed == undefined) {
                        f += "icontiny";
                        if (a.align) {
                            f += "r"
                        }
                        var e = "";
                        if (a.name) {
                            e = g_staticUrl + "/images/wow/icons/tiny/" + a.name.toLowerCase() + ".gif"
                        } else {
                            if (a.preset) {
                                e = Markup.tags.icon.presets[a.preset]
                            } else {
                                if (a.url && Markup._isUrlSafe(a.url)) {
                                    e = a.url
                                } else {
                                    return ""
                                }
                            }
                        }
                        f += '" style="background-image: url(' + e + ')">'
                    } else {
                        f += a.name + '">'
                    }
                    return [f, "</span>"]
                } else {
                    var f = "<div" + Markup._addGlobalAttributes(a) + ' onclick="Icon.showIconName(this)" class="icon' + c + (a["float"] ? '" style="float: ' + a["float"] + ';">' : '">');
                    var d = {
                        small: 0,
                        medium: 1,
                        large: 2
                    };
                    var b = null;
                    if (a.url && Markup._isUrlSafe(a.url)) {
                        b = a.url
                    } else {
                        if (a._textContents && Markup._isUrlSafe(a._textContents)) {
                            b = a._textContents
                        }
                    }
                    icon = Icon.create(a.name.toLowerCase(), d[c], null, b);
                    f += icon.innerHTML + "</div>";
                    return [f]
                }
            }
        },
        iconlist: {
            empty: false,
            block: true,
            ltrim: true,
            rtrim: true,
            attr: {
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedChildren: {
                b: 1,
                achievement: 1,
                currency: 1,
                faction: 1,
                holiday: 1,
                item: 1,
                itemset: 1,
                npc: 1,
                object: 1,
                pet: 1,
                quest: 1,
                spell: 1,
                title: 1,
                zone: 1
            },
            toHtml: function (g) {
                var d = Markup._getDatabaseDomainInfo(g)[2];
                var j = "",
                    b;
                for (var e = 0; e < g._nodes.length; ++e) {
                    var c = $WH.dO(g._nodes[e]);
                    c.attr.domain = d;
                    var f = Markup.tags[c.name].toHtml(c.attr),
                        h = c.name,
                        a = "",
                        k = "";
                    if (typeof f != "string") {
                        f = f[0] + c.attr._contents + f[1]
                    } else {
                        if (typeof f == "string" && (b = f.match(/href="(.+?)".+?url\(\/images\/wow\/icons\/tiny\/(.+?)\.gif\)/))) {
                            c.attr.icon = "false";
                            f = Markup.tags[c.name].toHtml(c.attr);
                            a = b[1];
                            k = b[2]
                        }
                    }
                    if (f) {
                        j += "<tr><th>" + (k ? Markup.toHtml("[icon name=" + k + " size=small url=" + a + "]", {
                            skipReset: true
                        }) : "<ul><li>&nbsp;</li></ul>") + "</th><td>" + f + "</td></tr>"
                    }
                }
                if (j) {
                    j = '<div class="iconlist-col"><table class="iconlist">' + j + "</table></div>"
                }
                return [j]
            }
        },
        img: {
            empty: true,
            attr: {
                src: {
                    req: false,
                    valid: /\S+/
                },
                icon: {
                    req: false,
                    valid: /\S+/
                },
                id: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                blog: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                size: {
                    req: false,
                    valid: /^(thumb|resized|normal|large|medium|small|tiny)$/i
                },
                width: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                height: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                "float": {
                    req: false,
                    valid: /^(left|right|center)$/i
                },
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                margin: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            blogSize: /^(thumb|normal)$/i,
            idSize: /^(thumb|resized|normal)$/i,
            iconSize: /^(large|medium|small|tiny)$/i,
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (a) {
                if (a.src) {
                    return true
                } else {
                    if (a.id) {
                        return (a.size ? Markup.tags.img.idSize.test(a.size) : true)
                    } else {
                        if (a.icon) {
                            return (a.size ? Markup.tags.img.iconSize.test(a.size) : true)
                        } else {
                            if (a.blog) {
                                return (a.size ? Markup.tags.img.blogSize.test(a.size) : true)
                            }
                        }
                    }
                }
                return false
            },
            toHtml: function (a) {
                var e = "<img" + Markup._addGlobalAttributes(a);
                var d = "";
                if (a.src) {
                    e += ' src="' + a.src + '"'
                } else {
                    if (a.id) {
                        e += ' src="' + g_staticUrl + "/uploads/screenshots/" + (a.size ? a.size : "normal") + "/" + a.id + '.jpg"'
                    } else {
                        if (a.icon) {
                            e += ' src="' + g_staticUrl + "/images/wow/icons/" + (a.size ? a.size : "large") + "/" + a.icon + '.jpg"'
                        } else {
                            if (a.blog) {
                                if (g_blogimages[a.blog]) {
                                    var b = g_blogimages[a.blog];
                                    if (a.size && a.size == "thumb") {
                                        var c = g_staticUrl + "/uploads/blog/images/" + a.blog + (b.type == 3 ? ".png" : ".jpg");
                                        e += ' src="' + g_staticUrl + "/uploads/blog/thumbs/" + a.blog + (b.type == 3 ? ".png" : ".jpg") + '" alt="' + Markup._safeHtml(b.alt) + '" width="' + b.thumbwidth + '" height="' + b.thumbheight + '"';
                                        if (!g_screenshots[Markup.uid]) {
                                            g_screenshots[Markup.uid] = []
                                        }
                                        e = '<a href="' + c + '" onclick="if(!g_isLeftClick(event)) return; ScreenshotViewer.show({screenshots: \'' + Markup.uid + "', pos: " + g_screenshots[Markup.uid].length + '}); return false;">' + e;
                                        d = "</a>";
                                        var f = {
                                            url: c,
                                            caption: b.alt,
                                            width: b.width,
                                            height: b.height,
                                            noMarkup: true
                                        };
                                        g_screenshots[Markup.uid].push(f)
                                    } else {
                                        e += ' src="' + g_staticUrl + "/uploads/blog/images/" + a.blog + (b.type == 3 ? ".png" : ".jpg") + '" alt="' + Markup._safeHtml(b.alt) + '" width="' + b.width + '" height="' + b.height + '"'
                                    }
                                } else {
                                    return ("Image #" + a.blog)
                                }
                            }
                        }
                    }
                }
                if (a.width) {
                    e += ' width="' + a.width + '"'
                }
                if (a.height) {
                    e += ' height="' + a.height + '"'
                }
                if (a["float"]) {
                    if (a["float"] == "center") {
                        e = '<div style="text-align: center">' + e + ' style="margin: 10px auto"';
                        d = "</div>"
                    } else {
                        e += ' style="float: ' + a["float"] + ";";
                        if (!a.margin) {
                            a.margin = 10
                        }
                        if (a["float"] == "left") {
                            e += " margin: 0 " + a.margin + "px " + a.margin + 'px 0"'
                        } else {
                            e += " margin: 0 0 " + a.margin + "px " + a.margin + 'px"'
                        }
                    }
                }
                if (a.border != 0) {
                    e += ' class="border"'
                }
                if (a.title) {
                    e += ' alt="' + a.title + '"'
                } else {
                    e += ' alt=""'
                }
                e += " />" + d;
                return e
            },
            fromHtml: function (g) {
                var b;
                if (b = g.match(/<img\b[\s\S]*?src="[\s\S]+?"[\s\S]*?>/gi)) {
                    for (var d = 0; d < b.length; ++d) {
                        var a = b[d].match(/src="([\s\S]+?)"/i),
                            e = b[d].match(/width[:="]+\s*([0-9]+)/i),
                            f = b[d].match(/height[:="]+\s*([0-9]+)/i),
                            c = b[d].match(/border[:="]+\s*([0-9]+)/i);
                        g = g.replace(b[d], "[img src=" + a[1] + (e ? " width=" + e[1] : "") + (f ? " height=" + f[1] : "") + " border=" + (c ? c[1] : 0) + "]")
                    }
                }
                return g
            }
        },
        ins: {
            empty: false,
            toHtml: function (a) {
                return ['<ins class="diffmod"' + Markup._addGlobalAttributes(a) + ">", "</ins>"]
            }
        },
        item: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/i
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var g = a.unnamed;
                var f = Markup._getDatabaseDomainInfo(a);
                var b = f[0];
                var c = f[1];
                if (g_items[g] && g_items[g][c]) {
                    var d = g_items[g];
                    var e = "<a" + Markup._addGlobalAttributes(a) + ' href="' + b + wowheadUrl + "/item=" + g + '" class="q' + d.quality + (!a.icon ? ' icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + d.icon.toLowerCase() + ".gif)" : "") + '">';
                    e += Markup._safeHtml(d[c]) + "</a>";
                    return e
                }
                return '<a href="' + b + wowheadUrl + "/item=" + g + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[3][0] + " #" + g + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_items[d] && g_items[d][b]) {
                    return Markup._safeHtml(g_items[d][b])
                }
                return LANG.types[3][0] + " #" + d
            }
        },
        itemset: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^-?[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var d = Markup._getDatabaseDomainInfo(a);
                var b = d[0];
                var c = d[1];
                if (g_itemsets[f] && g_itemsets[f][c]) {
                    var e = g_itemsets[f];
                    return '<a href="' + b + wowheadUrl + "/itemset=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(e[c]) + "</a>"
                }
                return '<a href="' + b + wowheadUrl + "/itemset=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[4][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_itemsets[d] && g_itemsets[d][b]) {
                    return Markup._safeHtml(g_itemsets[d][b])
                }
                return LANG.types[4][0] + " #" + d
            }
        },
        li: {
            empty: false,
            itrim: true,
            allowedParents: {
                ul: 1,
                ol: 1
            },
            toHtml: function (a) {
                return ["<li" + Markup._addGlobalAttributes(a) + "><div>", "</div></li>"]
            },
            fromHtml: function (d, c) {
                c = c || 0;
                var a;
                if (a = Markup.matchOuterTags(d, "<li\\b[\\s\\S]*?>", "</li>", "g")) {
                    for (var b = 0; b < a.length; ++b) {
                        d = d.replace(a[b][1] + a[b][0] + a[b][2], "\n\t" + Array(c + 1).join("\t") + "[li]" + Markup.tags.li.fromHtml(a[b][0], c + 1) + "[/li]")
                    }
                }
                return d
            }
        },
        lightbox: {
            empty: false,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^(map|model|screenshot)$/
                },
                zone: {
                    req: false,
                    valid: /^-?[0-9]+[a-z]?$/i
                },
                floor: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                pins: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            validate: function (a) {
                switch (a.unnamed) {
                case "map":
                    if (a.zone) {
                        return true
                    }
                    break;
                case "model":
                    break;
                case "screenshot":
                    break
                }
                return false
            },
            toHtml: function (a) {
                var b = "";
                var c = "";
                switch (a.unnamed) {
                case "map":
                    b = wowheadUrl + "/maps=" + a.zone;
                    if (a.floor) {
                        b += "." + a.floor
                    }
                    if (a.pins) {
                        b += ":" + a.pins
                    }
                    var d = b.substr(6);
                    c = "if(!g_isLeftClick(event)) return; MapViewer.show({ link: '" + d + "' }); return false;";
                    break
                }
                if (b && c) {
                    return ['<a href="' + b + '" onclick="' + c + '"' + Markup._addGlobalAttributes(a) + ">", "</a>"]
                }
                return ""
            }
        },
        map: {
            empty: false,
            attr: {
                zone: {
                    req: true,
                    valid: /^-?[0-9a-z\-_]+$/i
                },
                source: {
                    req: false,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            allowedChildren: {
                pin: 1
            },
            toHtml: function (b) {
                var a = b._contents;
                b.id = "dsgdfngjkfdg" + (Markup.maps.length);
                var c = "<div" + Markup._addGlobalAttributes(b) + '></div><div style="clear: left"></div>';
                Markup.maps.push([b.id, b.zone, a]);
                return [c]
            }
        },
        pin: {
            empty: false,
            attr: {
                url: {
                    req: false,
                    valid: /\S+/
                },
                type: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                x: {
                    req: true,
                    valid: /^[0-9]{1,2}(\.[0-9])?$/
                },
                y: {
                    req: true,
                    valid: /^[0-9]{1,2}(\.[0-9])?$/
                },
                path: {
                    req: false,
                    valid: /^([0-9]{1,2}(\.[0-9])?[,:]?)+$/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedParents: {
                map: 1
            },
            toHtml: function (c) {
                if (c.url && !Markup._isUrlSafe(c.url)) {
                    c.url = ""
                }
                var e = c._contents;
                if (c.url && c.url.indexOf("npc=") != -1) {
                    e = '<b class="q">' + e + '</b><br /><span class="q2">Click to view this NPC</span>'
                }
                var d = null;
                if (c.path) {
                    var b = c.path.split(":"),
                        d = [];
                    for (var f = 0, a = b.length; f < a; ++f) {
                        var g = b[f].split(",");
                        if (g.length == 2) {
                            d.push([parseFloat(g[0] || 0), parseFloat(g[1] || 0)])
                        }
                    }
                }
                return [[parseFloat(c.x || 0), parseFloat(c.y || 0),
                {
                    label: e,
                    url: c.url,
                    type: c.type,
                    lines: d
                }]]
            }
        },
        markupdoc: {
            empty: true,
            attr: {
                tag: {
                    req: false,
                    valid: /[a-z0-9]+/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (a) {
                if (a.tag && !Markup.tags[a.tag]) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var c = "";
                if (b.tag) {
                    c = Markup._generateTagDocs(b.tag)
                } else {
                    for (var a in Markup.tags) {
                        if (c != "") {
                            c += '<div class="pad3"></div>'
                        }
                        c += Markup._generateTagDocs(a)
                    }
                }
                return c
            }
        },
        menu: {
            empty: true,
            trim: true,
            ltrim: true,
            rtrim: true,
            attr: {
                tab: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                path: {
                    req: true,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var b = a.path.split(",");
                PageTemplate.set({
                    activeTab: a.tab,
                    breadcrumb: b
                })
            }
        },
        minibox: {
            empty: false,
            rtrim: true,
            itrim: true,
            attr: {
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var b = "<div" + Markup._addGlobalAttributes(a) + ' class="minibox';
                if (a["float"] == "left") {
                    b += " minibox-left"
                }
                b += '">';
                return [b, "</div>"]
            }
        },
        model: {
            empty: false,
            attr: {
                item: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                object: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                npc: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                itemset: {
                    req: false,
                    valid: /^[0-9,]+$/
                },
                slot: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                humanoid: {
                    req: false,
                    valid: /^1$/
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                img: {
                    req: false,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            skipSlots: {
                4: 1,
                5: 1,
                6: 1,
                7: 1,
                8: 1,
                9: 1,
                10: 1,
                16: 1,
                19: 1,
                20: 1
            },
            toHtml: function (a) {
                var b = "";
                if (a.npc) {
                    b = "<a" + Markup._addGlobalAttributes(a) + ' href="#modelviewer:1:' + a.npc + ":" + (a.humanoid ? "1" : "0") + '" onclick="ModelViewer.show({ type: 1, displayId: ' + a.npc + ", slot: " + a.slot + ", " + (a.humanoid ? "humanoid: 1, " : "") + 'displayAd: 1, fromTag: 1 });"><img alt="' + Markup._safeHtml(a._contents) + '" title="' + Markup._safeHtml(a._contents) + '" src="' + (a.img ? a.img : g_staticUrl + "/modelviewer/thumbs/npc/" + a.npc + '.png" width="150" height="150') + '" class="border" ';
                    if (a["float"]) {
                        b += 'style="float: ' + a["float"] + "; ";
                        if (a["float"] == "left") {
                            b += 'margin: 0 10px 10px 0" '
                        } else {
                            b += 'margin: 0 0 10px 10px" '
                        }
                    }
                    b += "/></a>";
                    return [b]
                } else {
                    if (a.object) {
                        b = "<a" + Markup._addGlobalAttributes(a) + ' href="#modelviewer:2:' + a.object + '" onclick="ModelViewer.show({ type: 2, displayId: ' + a.object + ', displayAd: 1, fromTag: 1 });"><img alt="' + Markup._safeHtml(a._contents) + '" title="' + Markup._safeHtml(a._contents) + '" src="' + (a.img ? a.img : g_staticUrl + "/modelviewer/thumbs/obj/" + a.object + '.png" width="150" height="150') + '" class="border" ';
                        if (a["float"]) {
                            b += 'style="float: ' + a["float"] + "; ";
                            if (a["float"] == "left") {
                                b += 'margin: 0 10px 10px 0" '
                            } else {
                                b += 'margin: 0 0 10px 10px" '
                            }
                        }
                        b += "/></a>";
                        return [b]
                    } else {
                        if (a.item && a.slot) {
                            b = "<a" + Markup._addGlobalAttributes(a) + ' href="#modelviewer:3:' + a.item + ":" + a.slot + '" onclick="ModelViewer.show({ type: 3, displayId: ' + a.item + ", slot: " + a.slot + ', displayAd: 1, fromTag: 1 });"><img alt="' + Markup._safeHtml(a._contents) + '" title="' + Markup._safeHtml(a._contents) + '" src="' + (a.img ? a.img : g_staticUrl + "/modelviewer/thumbs/item/" + a.item + '.png" width="150" height="150') + '" class="border" ';
                            if (a["float"]) {
                                b += 'style="float: ' + a["float"] + "; ";
                                if (a["float"] == "left") {
                                    b += 'margin: 0 10px 10px 0" '
                                } else {
                                    b += 'margin: 0 0 10px 10px" '
                                }
                            }
                            b += "/></a>";
                            return [b]
                        } else {
                            if (a.itemset) {
                                b = "<a" + Markup._addGlobalAttributes(a) + ' href="javascript:;" onclick="ModelViewer.show({ type: 4, equipList: [' + a.itemset + '], displayAd: 1, fromTag: 1 });">'
                            } else {
                                return ["[model]", "[/model]"]
                            }
                        }
                    }
                }
                return [b, "</a>"]
            }
        },
        money: {
            empty: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                side: {
                    req: false,
                    valid: /^(alliance|horde|both)$/i
                },
                items: {
                    req: false,
                    valid: /^[0-9,]+$/
                },
                currency: {
                    req: false,
                    valid: /^[0-9,]+$/
                },
                achievement: {
                    req: false,
                    valid: /\S+/
                },
                arena: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                honor: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                conquest: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                justice: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                valor: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var c = [],
                    b = [];
                if (a.items) {
                    var e = a.items.split(",");
                    if (e.length >= 2) {
                        for (var d = 0; d < e.length - 1; d += 2) {
                            c.push([e[d], e[d + 1]])
                        }
                    }
                }
                if (a.currency) {
                    var e = a.currency.split(",");
                    if (e.length >= 2) {
                        for (var d = 0; d < e.length - 1; d += 2) {
                            b.push([e[d], e[d + 1]])
                        }
                    }
                }
                if (a.arena && !a.conquest) {
                    a.conquest = a.arena
                }
                if (a.honor) {
                    b.push([392, a.honor])
                }
                if (a.conquest) {
                    b.push([390, a.conquest])
                }
                if (a.justice) {
                    b.push([395, a.justice])
                }
                if (a.valor) {
                    b.push([396, a.valor])
                }
                return g_getMoneyHtml(a.unnamed, a.side, c, b, a.achievement)
            }
        },
        npc: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var c = e[0];
                var d = e[1];
                if (g_npcs[f] && g_npcs[f][d]) {
                    var b = g_npcs[f];
                    return '<a href="' + c + wowheadUrl + "/npc=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
                }
                return '<a href="' + c + wowheadUrl + "/npc=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[1][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_npcs[d] && g_npcs[d][b]) {
                    return Markup._safeHtml(g_npcs[d][b])
                }
                return LANG.types[1][0] + " #" + d
            }
        },
        object: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var b = e[0];
                var c = e[1];
                if (g_objects[f] && g_objects[f][c]) {
                    var d = g_objects[f];
                    return '<a href="' + b + wowheadUrl + "/object=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(d[c]) + "</a>"
                }
                return '<a href="' + b + wowheadUrl + "/object=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[2][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_objects[d] && g_objects[d][b]) {
                    return Markup._safeHtml(g_objects[d][b])
                }
                return LANG.types[2][0] + " #" + d
            }
        },
        ol: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedChildren: {
                li: 1
            },
            toHtml: function (a) {
                var b = "<ol";
                var c = [];
                if (a.first) {
                    c.push("first")
                }
                if (a.last) {
                    c.push("last")
                }
                if (c.length > 0) {
                    b += ' class="' + c.join(" ") + '"'
                }
                b += Markup._addGlobalAttributes(a) + ">";
                return [b, "</ol>"]
            },
            fromHtml: function (d, c) {
                c = c || 0;
                var a;
                if (a = Markup.matchOuterTags(d, "<ol\\b[\\s\\S]*?>", "</ol>", "g")) {
                    for (var b = 0; b < a.length; ++b) {
                        d = d.replace(a[b][1] + a[b][0] + a[b][2], "\n" + Array(c + 1).join("\t") + "[ol]" + Markup.tags.ol.fromHtml(a[b][0], c + 1) + "\n" + Array(c + 1).join("\t") + "[/ol]")
                    }
                }
                return d
            }
        },
        p: {
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                return ['<p style="line-height: 1.4em; margin: 1em 0px 0px 0px;"' + Markup._addGlobalAttributes(a) + ">", "</p>"]
            },
            fromHtml: function (a) {
                return a.replace(/<p\b[\s\S]*?>([\s\S]*?)<\/p>/gi, "\n\n$1\n\n")
            }
        },
        pad: {
            empty: true,
            block: true,
            trim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var b = '<div class="pad';
                if (a.first) {
                    b += " first"
                }
                if (a.last) {
                    b += " last"
                }
                b += '"' + Markup._addGlobalAttributes(a) + "></div>";
                return b
            }
        },
        pet: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var b = e[0];
                var c = e[1];
                if (g_pet_families && g_pet_families[f] && g_pets && g_pets[f]) {
                    var d = "<span" + (!a.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_pets[f]["icon"].toLowerCase() + ".gif)" : "") + '">';
                    d += '<a href="' + b + wowheadUrl + "/pet=" + f + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(g_pet_families[f]) + "</a></span>";
                    return d
                }
                return '<a href="' + b + wowheadUrl + "/pet=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[9][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var b = a.unnamed;
                if (g_pet_families && g_pet_families[b]) {
                    return Markup._safeHtml(g_pet_families[b])
                }
                return LANG.types[9][0] + " #" + b
            }
        },
        pre: {
            empty: false,
            block: true,
            rtrim: true,
            toHtml: function (a) {
                var b = '<pre class="code';
                if (a.first) {
                    b += " first"
                }
                if (a.last) {
                    b += " last"
                }
                b += '"' + Markup._addGlobalAttributes(a) + ">";
                return [b, "</pre>"]
            },
            fromHtml: function (a) {
                return a.replace(/<pre\b[\s\S]*?>([\s\S]*?)<\/pre>/gi, "[pre]$1[/pre]")
            }
        },
        quest: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var c = e[0];
                var d = e[1];
                if (g_quests[f] && g_quests[f][d]) {
                    var b = g_quests[f];
                    return '<a href="' + c + wowheadUrl + "/quest=" + f + '"' + (!a.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + (b.daily ? "quest_start_daily" : "quest_start") + '.gif)"' : "") + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
                }
                return '<a href="' + c + wowheadUrl + "/quest=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[5][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_quests[d] && g_quests[d][b]) {
                    return Markup._safeHtml(g_quests[d][b])
                }
                return LANG.types[5][0] + " #" + d
            }
        },
        quote: {
            block: true,
            empty: false,
            rtrim: true,
            ltrim: true,
            itrim: true,
            attr: {
                unnamed: {
                    req: false,
                    valid: /[\S ]+/
                },
                url: {
                    req: false,
                    valid: /\S+/
                },
                blizzard: {
                    req: false,
                    valid: /^true$/
                },
                wowhead: {
                    req: false,
                    valid: /^true$/
                },
                display: {
                    req: false,
                    valid: /^block$/
                },
                align: {
                    req: false,
                    valid: /^(left|right|center)$/i
                },
                collapse: {
                    req: false,
                    valid: /^true$/
                }
            },
            allowedModes: {
                article: 1,
                quickfacts: 1,
                comment: 1
            },
            validate: function (a) {
                if (a.blizzard || a.wowhead || a.collapse || a.url) {
                    if (Markup.allow < Markup.CLASS_STAFF) {
                        return false
                    }
                }
                return true
            },
            toHtml: function (a) {
                var d = "<div" + Markup._addGlobalAttributes(a);
                var b = [];
                if (a.display) {
                    b.push("display: " + a.display)
                }
                if (a.align) {
                    b.push("text-align: " + a.align)
                }
                if (b.length) {
                    d += ' style="' + b.join("; ") + '" '
                }
                d += ' class="quote';
                if (a.first) {
                    d += " first"
                }
                if (a.last) {
                    d += " last"
                }
                if (a.blizzard) {
                    if (a.unnamed && a.blizzard) {
                        var c = a.unnamed.trim();
                        if (c.length <= 0) {
                            return ["", ""]
                        }
                        d = d.replace('class="quote', 'class="quote-blizz');
                        d += (a.collapse ? " collapse" : "") + '"><div class="quote-header">' + (a.url && Markup._isUrlSafe(a.url) ? '<a href="' + Markup._fixUrl(a.url) + '" target="_blank">originally posted by</a><h2><a href="' + Markup._fixUrl(a.url) + '" target="_blank">' + c + "</a></h2>" : "<h2>" + c + "</h2>") + '</div><div class="quote-body">';
                        return [d, "</div></div>"]
                    }
                    return ["", ""]
                } else {
                    if (a.wowhead) {
                        d = d.replace('class="quote', 'class="quote-wh');
                        d += (a.collapse ? " collapse" : "") + '">';
                        d += '<div class="quote-body">';
                        return [d, "</div></div>"]
                    } else {
                        d += '">';
                        if (a.unnamed) {
                            var c = a.unnamed.trim();
                            if (c.length > 0) {
                                d += "<small><b>";
                                if (a.url && Markup._isUrlSafe(a.url)) {
                                    d += '<a href="' + Markup._fixUrl(a.url) + '"' + (Markup._isUrlExternal(a.url) ? ' target="_blank"' : "") + ">" + c + "</a>"
                                } else {
                                    if (g_isUsernameValid(c)) {
                                        d += '<a href="' + wowheadUrl + '/user=' + c + '">' + c + "</a>"
                                    } else {
                                        d += c
                                    }
                                }
                                d += "</b> " + LANG.markup_said + '</small><div class="pad"></div>'
                            }
                        }
                        return [d, "</div>"]
                    }
                }
            }
        },
        race: {
            empty: true,
            valid: {
                1: true,
                2: true,
                3: true,
                4: true,
                5: true,
                6: true,
                7: true,
                8: true,
                9: true,
                10: true,
                11: true,
                22: true
            },
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                gender: {
                    req: false,
                    valid: /^(0|1)$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                if (Markup.tags.race.valid[a.unnamed]) {
                    return true
                }
                return false
            },
            toHtml: function (a) {
                var g = a.unnamed;
                var b = a.gender | 0;
                var f = Markup._getDatabaseDomainInfo(a);
                var c = f[0];
                var e = f[1];
                if (g_races[g] && g_races[g][e]) {
                    var d = g_races[g];
                    return '<a href="' + c + wowheadUrl + "/race=" + g + '"' + (!a.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_races.getIcon(g, b) + '.gif)"' : "") + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(d[e]) + "</a>"
                }
                return '<a href="' + c + wowheadUrl + "/race=" + g + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[14][0] + " #" + g + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_races[d] && g_races[d][b]) {
                    return Markup._safeHtml(g_races[d][b])
                }
                return LANG.types[14][0] + " #" + d
            }
        },
        reveal: {
            empty: false,
            rtrim: true,
            ltrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                if (!Markup.inBlog || Markup.inBlog > 1) {
                    return ["", ""]
                }
                return ['<span id="reveal-' + Markup.reveals + '" style="display: none">', '</span> <a id="revealtoggle-' + Markup.reveals + '" class="revealtoggle" href="javascript:;" onclick="Markup.toggleReveal(' + Markup.reveals + ');">(read more)</a>'];
                Markup.reveals++
            }
        },
        s: {
            empty: false,
            toHtml: function (a) {
                return ["<del" + Markup._addGlobalAttributes(a) + ">", "</del>"]
            },
            fromHtml: function (a) {
                return a.replace(/<del\b[\s\S]*?>([\s\S]*?)<\/del>/gi, "[s]$1[/s]")
            }
        },
        screenshot: {
            empty: false,
            attr: {
                id: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                url: {
                    req: false,
                    valid: /\S+/
                },
                thumb: {
                    req: false,
                    valid: /\S+/
                },
                size: {
                    req: false,
                    valid: /^(thumb|resized|normal)$/i
                },
                width: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                height: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (a) {
                if (a.url && !a.thumb) {
                    return false
                } else {
                    if (!a.id && !a.url) {
                        return false
                    }
                }
                return true
            },
            toHtml: function (a) {
                var d = "";
                var c = "";
                if (a.id) {
                    d = g_staticUrl + "/uploads/screenshots/normal/" + a.id + ".jpg";
                    var e = a.id;
                    if (a.thumb && a.thumb.match(/^[0-9]+$/)) {
                        e = a.thumb;
                        a.thumb = null
                    }
                    c = g_staticUrl + "/uploads/screenshots/" + (a.size ? a.size : "thumb") + "/" + e + ".jpg"
                } else {
                    if (a.url) {
                        d = a.url
                    }
                }
                if (a.thumb) {
                    c = a.thumb
                }
                var b = a._contents.replace(/\n/g, "<br />");
                if (!g_screenshots[Markup.uid]) {
                    g_screenshots[Markup.uid] = []
                }
                var f = '<a href="' + d + '" onclick="if(!g_isLeftClick(event)) return; ScreenshotViewer.show({screenshots: \'' + Markup.uid + "', pos: " + g_screenshots[Markup.uid].length + '}); return false;"' + Markup._addGlobalAttributes(a) + ">";
                f += '<img src="' + c + '" ';
                if (a.size && a.width) {
                    f += ' width="' + a.width + '"'
                }
                if (a.size && a.height) {
                    f += ' height="' + a.height + '"'
                }
                if (a.border != 0) {
                    f += 'class="border" '
                }
                if (a["float"]) {
                    f += 'style="float: ' + a["float"] + "; ";
                    if (a["float"] == "left") {
                        f += "margin: 0 10px 10px 0"
                    } else {
                        f += "margin: 0 0 10px 10px"
                    }
                    f += '" '
                }
                f += 'alt="" ';
                var g = {
                    caption: b,
                    width: (a.size ? null : a.width),
                    height: (a.size ? null : a.height),
                    noMarkup: true
                };
                if (a.id) {
                    g.id = a.id
                } else {
                    g.url = a.url
                }
                g_screenshots[Markup.uid].push(g);
                return [f + "/></a>"]
            }
        },
        script: {
            ltrim: true,
            rtrim: true,
            empty: false,
            attr: {
                src: {
                    req: false,
                    valid: /^\S+$/
                }
            },
            allowedClass: MARKUP_CLASS_ADMIN,
            allowedChildren: {
                "<text>": 1
            },
            rawText: true,
            taglessSkip: true,
            toHtml: function (a) {
                if (a.src) {
                    $.getScript(a.src, function () {
                        $.globalEval(a._contents)
                    })
                } else {
                    $.globalEval(a._contents)
                }
                return [""]
            }
        },
        section: {
            empty: false,
            ltrim: true,
            rtrim: true,
            trim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {},
            toHtml: function (a) {
                return ['<div class="secheader"><var></var>', "</div>"]
            }
        },
        skill: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var c = e[0];
                var d = e[1];
                if (g_skills[f] && g_skills[f][d]) {
                    var b = g_skills[f];
                    return '<a href="' + c + wowheadUrl + "/skill=" + f + '"' + (!a.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + g_skills.getIcon(f) + '.gif)"' : "") + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
                }
                return '<a href="' + c + wowheadUrl + "/skill=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[15][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_skills[d] && g_skills[d][b]) {
                    return Markup._safeHtml(g_skills[d][b])
                }
                return LANG.types[15][0] + " #" + d
            }
        },
        sig: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                }
            },
            allowedClass: MARKUP_CLASS_PREMIUM,
            allowedModes: {
                signature: 1
            },
            toHtml: function (a) {
                return;
                return "<img" + Markup._addGlobalAttributes(a) + ' src="' + wowheadUrl + '/signature=generate&id=' + a.unnamed + '.png" alt="" />'
            }
        },
        small: {
            empty: false,
            toHtml: function (a) {
                return ["<small" + Markup._addGlobalAttributes(a) + ">", "</small>"]
            },
            fromHtml: function (a) {
                return a.replace(/<small\b[\s\S]*?>([\s\S]*?)<\/small>/gi, "[small]$1[/small]")
            }
        },
        span: {
            empty: false,
            attr: {
                unnamed: {
                    req: false,
                    valid: /^(hidden|invisible)$/
                },
                tooltip: {
                    req: false,
                    valid: /\S+/
                },
                tooltip2: {
                    req: false,
                    valid: /\S+/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var c = "<span" + Markup._addGlobalAttributes(a);
                var b = [];
                if (a.unnamed == "hidden") {
                    b.push("display: none")
                } else {
                    if (a.unnamed == "invisible") {
                        b.push("visibility: hidden")
                    }
                }
                if (b.length > 0) {
                    c += ' style="' + b.join(";") + '"'
                }
                if (a.tooltip && Markup.tooltipTags[a.tooltip]) {
                    c += " onmouseover=\"$WH.Tooltip.showAtCursor(event, Markup.tooltipTags['" + a.tooltip + "'], 0, 0, " + (Markup.tooltipBare[a.tooltip] ? "null" : "'q'") + ", " + (a.tooltip2 && Markup.tooltipTags[a.tooltip2] ? "Markup.tooltipTags['" + a.tooltip2 + "']" : "null") + ')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()"'
                }
                c += ">";
                return [c, "</span>"]
            }
        },
        spell: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                diff: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                buff: {
                    req: false,
                    valid: /^true$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (b) {
                var g = b.unnamed;
                var f = Markup._getDatabaseDomainInfo(b);
                var d = f[0];
                var e = f[1];
                var a = [];
                if (b.buff) {
                    a.push("buff")
                }
                if (b.diff) {
                    a.push("diff=" + b.diff)
                }
                if (g_spells[g] && g_spells[g][e]) {
                    var c = g_spells[g];
                    return '<a href="' + d + wowheadUrl + "/spell=" + g + '"' + (!b.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + c.icon.toLowerCase() + '.gif)"' : "") + (a.length ? ' rel="' + a.join("&") + '"' : "") + Markup._addGlobalAttributes(b) + ">" + Markup._safeHtml(c[e]) + "</a>"
                }
                return '<a href="' + d + wowheadUrl + "/spell=" + g + '"' + (a.length ? ' rel="' + a.join("&") + '"' : "") + ">(" + LANG.types[6][0] + " #" + g + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_spells[d] && g_spells[d][b]) {
                    return Markup._safeHtml(g_spells[d][b])
                }
                return LANG.types[6][0] + " #" + d
            }
        },
        spoiler: {
            block: true,
            empty: false,
            rtrim: true,
            ltrim: true,
            itrim: true,
            toHtml: function (a) {
                return ['<div class="pad"></div><small><b>' + LANG.markup_spoiler + "</b></small><div" + Markup._addGlobalAttributes(a) + ' class="spoiler">', "</div>"]
            }
        },
        statistic: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                icon: {
                    req: false,
                    valid: /^false$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var f = a.unnamed;
                var e = Markup._getDatabaseDomainInfo(a);
                var c = e[0];
                var d = e[1];
                if (g_achievements[f] && g_achievements[f][d]) {
                    var b = g_achievements[f];
                    return '<a href="' + c + wowheadUrl + "/achievement=" + f + '"' + (!a.icon ? ' class="icontiny" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + b.icon.toLowerCase() + '.gif)"' : "") + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(b[d]) + "</a>"
                }
                return '<a href="' + c + wowheadUrl + "/achievement=" + f + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[10][0] + " #" + f + ")</a>"
            },
            toText: function (a) {
                var e = a.unnamed;
                var d = Markup._getDatabaseDomainInfo(a);
                var b = d[0];
                var c = d[1];
                if (g_achievements[e] && g_achievements[e][c]) {
                    return Markup._safeHtml(g_achievements[e][c])
                }
                return LANG.types[10][0] + " #" + e
            }
        },
        style: {
            ltrim: true,
            rtrim: true,
            empty: false,
            allowedClass: MARKUP_CLASS_ADMIN,
            allowedChildren: {
                "<text>": 1
            },
            rawText: true,
            taglessSkip: true,
            toHtml: function (a) {
                g_addCss(a._contents);
                return [""]
            }
        },
        sub: {
            empty: false,
            toHtml: function (a) {
                return ["<sub" + Markup._addGlobalAttributes(a) + ">", "</sub>"]
            },
            fromHtml: function (a) {
                return a.replace(/<sub\b[\s\S]*?>([\s\S]*?)<\/sub>/gi, "[sub]$1[/sub]")
            }
        },
        sup: {
            empty: false,
            toHtml: function (a) {
                return ["<sup" + Markup._addGlobalAttributes(a) + ">", "</sup>"]
            },
            fromHtml: function (a) {
                return a.replace(/<sup\b[\s\S]*?>([\s\S]*?)<\/sup>/gi, "[sup]$1[/sup]")
            }
        },
        tabs: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedChildren: {
                tab: 1
            },
            attr: {
                name: {
                    req: true,
                    valid: /\S+/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            toHtml: function (b) {
                b.id = g_urlize(b.name);
                var a = Markup.preview;
                var f = '<div class="clear"></div><div id="dsf67g4d-' + b.id + (a ? "-preview" : "") + '"></div>';
                f += "<div";
                if (b.width) {
                    f += ' style="width: ' + b.width + '"'
                }
                f += ">";
                f += '<div class="tabbed-contents">';
                var d = b._contents;
                for (var c = 0; c < d.length; ++c) {
                    var e = d[c];
                    f += '<div id="tab-' + b.id + "-" + e.id + '" style="display: none">';
                    f += e.content;
                    f += '<div class="clear"></div>';
                    f += "</div>"
                }
                f += "</div>";
                f += "</div>";
                setTimeout(Markup.createTabs.bind(null, b, d, (a ? "preview" : "")), 100);
                return [f]
            }
        },
        tab: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            allowedParents: {
                tabs: 1
            },
            attr: {
                name: {
                    req: true,
                    valid: /[\S ]+/
                },
                icon: {
                    req: false,
                    valid: /\S+/
                }
            },
            toHtml: function (a) {
                a.id = g_urlize(a.name);
                a.name = $WH.str_replace(a.name, "_", " ");
                if (typeof (a["class"]) != "undefined") {
                    a["class"] = $WH.str_replace(a["class"], "_", " ")
                }
                return [{
                    content: a._contents,
                    id: a.id,
                    name: a.name,
                    icon: a.icon,
                    "class": a["class"]
                }]
            }
        },
        table: {
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedChildren: {
                tr: 1
            },
            attr: {
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                cellspacing: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                cellpadding: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            toHtml: function (a) {
                var b = "<table" + Markup._addGlobalAttributes(a);
                if (a.border != undefined) {
                    b += ' border="' + a.border + '"'
                }
                if (a.cellspacing != undefined) {
                    b += ' cellspacing="' + a.cellspacing + '"'
                }
                if (a.cellpadding != undefined) {
                    b += ' cellpadding="' + a.cellpadding + '"'
                }
                if (a.width != undefined) {
                    b += ' style="width: ' + a.width + '"'
                }
                b += "><tbody>";
                return [b, "</tbody></table>"]
            },
            fromHtml: function (g, f) {
                f = f || 0;
                var a;
                if (a = Markup.matchOuterTags(g, "<table\\b[\\s\\S]*?>", "</table>", "g")) {
                    for (var c = 0; c < a.length; ++c) {
                        var b = a[c][1].match(/border[:="]+\s*([0-9]+)/i),
                            d = a[c][1].match(/width[:="]+\s*([0-9]+)/i),
                            e = a[c][1].match(/cellspacing="([\s\S]+?)"/i),
                            h = a[c][1].match(/cellpadding="([\s\S]+?)"/i);
                        g = g.replace(a[c][1] + a[c][0] + a[c][2], "\n" + Array(f + 1).join("\t") + "[table" + (b ? " border=" + b[1] : "") + (d ? " width=" + d[1] : "") + (e ? " cellspacing=" + e[1] : "") + (h ? " cellpadding=" + h[1] : "") + "]" + Markup.tags.table.fromHtml(a[c][0], f + 1) + "\n" + Array(f + 1).join("\t") + "[/table]")
                    }
                }
                return g
            }
        },
        tr: {
            empty: false,
            itrim: true,
            allowedChildren: {
                td: 1
            },
            allowedParents: {
                table: 1
            },
            toHtml: function (a) {
                return ["<tr" + Markup._addGlobalAttributes(a) + ">", "</tr>"]
            },
            fromHtml: function (d, c) {
                c = c || 0;
                var a;
                if (a = Markup.matchOuterTags(d, "<tr\\b[\\s\\S]*?>", "</tr>", "g")) {
                    for (var b = 0; b < a.length; ++b) {
                        d = d.replace(a[b][1] + a[b][0] + a[b][2], "\n\t" + Array(c + 1).join("\t") + "[tr]" + Markup.tags.tr.fromHtml(a[b][0], c + 1) + "\n" + Array(c + 1).join("\t") + "[/tr]")
                    }
                }
                return d
            }
        },
        td: {
            empty: false,
            itrim: true,
            allowedParents: {
                tr: 1
            },
            attr: {
                unnamed: {
                    req: false,
                    valid: /^header$/
                },
                align: {
                    req: false,
                    valid: /^(right|left|center|justify)$/i
                },
                valign: {
                    req: false,
                    valid: /^(top|middle|bottom|baseline)$/i
                },
                colspan: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                rowspan: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+(px|em|\%)$/
                }
            },
            toHtml: function (a) {
                var b = "<" + (a.unnamed ? "th" : "td") + Markup._addGlobalAttributes(a);
                if (a.align != undefined) {
                    b += ' align="' + a.align + '"'
                }
                if (a.valign != undefined) {
                    b += ' valign="' + a.valign + '"'
                }
                if (a.colspan != undefined) {
                    b += ' colspan="' + a.colspan + '"'
                }
                if (a.rowspan != undefined) {
                    b += ' rowspan="' + a.rowspan + '"'
                }
                if (a.width != undefined) {
                    b += ' style="width: ' + a.width + '"'
                }
                b += ">";
                return [b, "</" + (a.unnamed ? "th" : "td") + ">"]
            },
            fromHtml: function (k, g) {
                g = g || 0;
                var n = ["td", "th"],
                    c;
                for (var e = 0; e < n.length; ++e) {
                    if (c = Markup.matchOuterTags(k, "<" + n[e] + "\\b[\\s\\S]*?>", "</" + n[e] + ">", "g")) {
                        for (var f = 0; f < c.length; ++f) {
                            var a = c[f][1].match(/width[:="]+\s*([0-9]+)/i),
                                h = c[f][1].match(/align="([\s\S]+?)"/i),
                                l = c[f][1].match(/valign="([\s\S]+?)"/i),
                                b = c[f][1].match(/colspan="([\s\S]+?)"/i),
                                d = c[f][1].match(/rowspan="([\s\S]+?)"/i);
                            k = k.replace(c[f][1] + c[f][0] + c[f][2], "\n\t\t" + Array(g + 1).join("\t") + "[td" + (n[e] == "th" ? "=header" : "") + (a ? " width=" + a[1] : "") + (h ? " align=" + h[1] : "") + (l ? " valign=" + l[1] : "") + (b ? " colspan=" + b[1] : "") + (d ? " rowspan=" + d[1] : "") + "]" + Markup.tags.td.fromHtml(c[f][0], g + 1) + "[/td]")
                        }
                    }
                }
                return k
            }
        },
        time: {
            empty: true,
            count: 0,
            attr: {
                until: {
                    req: false,
                    valid: /^\d+$/
                },
                since: {
                    req: false,
                    valid: /^\d+$/
                },
                server: {
                    req: false,
                    valid: /^true$/
                }
            },
            validate: function (a) {
                if (!a.until && !a.since) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var c = Markup.tags.time.count++;
                var b = '<span title="' + (new Date((a.until ? a.until : a.since) * 1000)).toLocaleString() + '" id="markupTime' + c + '">' + Markup.tags.time.getTime(a) + "</span>";
                setInterval(Markup.tags.time.updateTime.bind(null, c, a), 5000);
                return b
            },
            getTime: function (a) {
                var c;
                if (a.server) {
                    c = g_serverTime.getTime() / 1000
                } else {
                    c = (new Date()).getTime() / 1000
                }
                var b = 0;
                if (a.until) {
                    b = a.until - c
                } else {
                    b = c - a.since
                }
                if (b > 0) {
                    return g_formatTimeElapsed(b)
                } else {
                    return "0 " + LANG.timeunitspl[6]
                }
            },
            updateTime: function (c, a) {
                var b = $WH.ge("markupTime" + c);
                if (!b) {
                    return
                }
                b.firstChild.nodeValue = Markup.tags.time.getTime(a)
            }
        },
        toc: {
            block: true,
            post: true,
            trim: true,
            ltrim: true,
            rtrim: true,
            collect: {
                h2: 1,
                h3: 1
            },
            exclude: {
                tabs: {
                    h2: 1,
                    h3: 1
                },
                minibox: {
                    h2: 1,
                    h3: 1
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            attr: {
                h3: {
                    req: false,
                    valid: /^false$/
                }
            },
            postHtml: function (g, a) {
                var j = "<h3";
                var d = [];
                if (g.first) {
                    d.push("first")
                }
                if (g.last) {
                    d.push("last")
                }
                if (d.length > 0) {
                    j += ' class="' + d.join(" ") + '"'
                }
                j += Markup._addGlobalAttributes(g) + ">" + LANG.markup_toc + "</h3><ul>";
                var h = "";
                var f = 1;
                var k = (g.h3 != "false");
                var b = [];
                for (var c in a.h2) {
                    b.push(a.h2[c])
                }
                for (var c in a.h3) {
                    b.push(a.h3[c])
                }
                b.sort(function (l, i) {
                    return l.offset - i.offset
                });
                for (var e in b) {
                    c = b[e];
                    if (c.name == "h2" && c.attr.toc != "false") {
                        if (h == "h3") {
                            j += "</ul>";
                            f--
                        }
                        j += "<li><b><a href='#" + (c.attr.id ? g_urlize(c.attr.id) : g_urlize(c.attr._textContents)) + "'>" + c.attr._textContents + "</a></b></li>";
                        h = "h2"
                    }
                    if (c.name == "h3" && k && c.attr.toc != "false" && (h != "" || a.h2.length == 0)) {
                        if (h == "h2") {
                            j += "<ul>";
                            f++
                        }
                        j += "<li><b><a href='#" + (c.attr.id ? g_urlize(c.attr.id) : g_urlize(c.attr._textContents)) + "'>" + c.attr._textContents + "</a></b></li>";
                        h = "h3"
                    }
                }
                for (var e = 0; e < f; e++) {
                    j += "</ul>"
                }
                return j
            }
        },
        toggler: {
            empty: false,
            attr: {
                id: {
                    req: true,
                    valid: /^[a-z0-9_-]+$/i
                },
                unnamed: {
                    req: false,
                    valid: /^hidden$/i
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var b = '<a href="javascript:;" class="disclosure-' + (a.unnamed ? "off" : "on") + '" onclick="return g_disclose($WH.ge(\'' + a.id + "'), this)\">";
                return [b, "</a>"]
            }
        },
        tooltip: {
            empty: false,
            attr: {
                unnamed: {
                    req: false,
                    valid: /\S+/
                },
                name: {
                    req: false,
                    valid: /\S+/
                },
                bare: {
                    req: false,
                    valid: /^true$/i
                },
                label: {
                    req: false,
                    valid: /[\S ]+/
                }
            },
            taglessSkip: true,
            allowedClass: MARKUP_CLASS_STAFF,
            validate: function (a) {
                if (!a.unnamed && !a.name) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                if (a.unnamed) {
                    return ['<span class="tip" onmouseover="$WH.Tooltip.showAtCursor(event, LANG[\'' + a.unnamed + '\'], 0, 0, \'q\')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">', "</span>"]
                } else {
                    Markup.tooltipTags[a.name] = (a.label ? '<table><tr><td class="q0" style="width: 300px"><small>' + a.label + "</small></td></tr></table>" : "") + a._contents;
                    if (a.bare) {
                        Markup.tooltipBare[a.name] = true
                    }
                    return [""]
                }
            }
        },
        u: {
            empty: false,
            toHtml: function (a) {
                return ["<ins" + Markup._addGlobalAttributes(a) + ">", "</ins>"]
            },
            fromHtml: function (a) {
                return a.replace(/<(ins|u)\b[\s\S]*?>([\s\S]*?)<\/\1>/gi, "[u]$2[/u]")
            }
        },
        ul: {
            block: true,
            empty: false,
            ltrim: true,
            rtrim: true,
            itrim: true,
            allowedChildren: {
                li: 1
            },
            toHtml: function (a) {
                var b = "<ul";
                var c = [];
                if (a.first) {
                    c.push("first")
                }
                if (a.last) {
                    c.push("last")
                }
                if (c.length > 0) {
                    b += ' class="' + c.join(" ") + '"'
                }
                b += Markup._addGlobalAttributes(a) + ">";
                return [b, "</ul>"]
            },
            fromHtml: function (d, c) {
                c = c || 0;
                var a;
                if (a = Markup.matchOuterTags(d, "<ul\\b[\\s\\S]*?>", "</ul>", "g")) {
                    for (var b = 0; b < a.length; ++b) {
                        d = d.replace(a[b][1] + a[b][0] + a[b][2], "\n" + Array(c + 1).join("\t") + "[ul]" + Markup.tags.ul.fromHtml(a[b][0], c + 1) + "\n" + Array(c + 1).join("\t") + "[/ul]")
                    }
                }
                return d
            }
        },
        url: {
            allowedClass: MARKUP_CLASS_USER,
            empty: false,
            attr: {
                unnamed: {
                    req: false,
                    valid: /\S+/
                },
                rel: {
                    req: false,
                    valid: /(item|quest|spell|achievement|npc|object)=([0-9]+)/
                },
                onclick: {
                    req: false,
                    valid: /[\S ]+/
                },
                tooltip: {
                    req: false,
                    valid: /\S+/
                },
                tooltip2: {
                    req: false,
                    valid: /\S+/
                }
            },
            validate: function (a) {
                if (a.onclick && Markup.allow < Markup.CLASS_ADMIN) {
                    return false
                }
                if (a.tooltip && Markup.allow < Markup.CLASS_STAFF) {
                    return false
                }
                var b = "";
                if (a.unnamed && /^(mailto:|irc:)/i.test(a.unnamed.trim()) && Markup.allow < Markup.CLASS_STAFF) {
                    return false
                }
                if (a.unnamed && /^(javascript:)/i.test(a.unnamed.trim())) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var c;
                if (a.unnamed) {
                    c = a.unnamed;
                    c = c.replace(/&amp;/, "&");
                    if (!c.match(/^([^:\\.\/]+):/i) && c.charAt(0) != "/" && c.charAt(0) != "#") {
                        c = "/" + c
                    }
                    if (Markup._isUrlSafe(c, true)) {
                        var b = "<a" + Markup._addGlobalAttributes(a) + ' href="' + Markup._fixUrl(c) + '"';
                        if (Markup._isUrlExternal(c)) {
                            b += ' target="_blank"'
                        }
                        if (a.rel) {
                            b += ' rel="' + a.rel + '"'
                        }
                        if (a.onclick) {
                            b += ' onclick="' + a.onclick + '"'
                        }
                        if (a.tooltip && Markup.tooltipTags[a.tooltip]) {
                            b += " onmouseover=\"$WH.Tooltip.showAtCursor(event, Markup.tooltipTags['" + a.tooltip + "'], 0, 0, " + (Markup.tooltipBare[a.tooltip] ? "null" : "'q'") + ", " + (a.tooltip2 && Markup.tooltipTags[a.tooltip2] ? "Markup.tooltipTags['" + a.tooltip2 + "']" : "null") + ')" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()"'
                        }
                        b += ">";
                        return [b, "</a>"]
                    } else {
                        return ["", ""]
                    }
                } else {
                    c = a._textContents;
                    c = c.replace(/&amp;/, "&");
                    if (Markup._isUrlSafe(c)) {
                        var b = "<a" + Markup._addGlobalAttributes(a) + ' href="' + Markup._fixUrl(c) + '"';
                        if (Markup._isUrlExternal(c)) {
                            b += ' target="_blank"'
                        }
                        if (a.rel) {
                            b += ' rel="' + a.rel + '"'
                        }
                        if (a.onclick) {
                            b += ' onclick="' + a.onclick + '"'
                        }
                        b += ">";
                        return [b + c + "</a>"]
                    } else {
                        return ["", ""]
                    }
                }
            },
            fromHtml: function (a) {
                return a.replace(/<a\b[\s\S]*?href=\"(.+?)\"[\s\S]*?>([\s\S]*?)<\/a>/gi, "[url=$1]$2[/url]")
            }
        },
        video: {
            empty: true,
            attr: {
                id: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                unnamed: {
                    req: false,
                    valid: /^embed$/i
                },
                "float": {
                    req: false,
                    valid: /^(left|right)$/i
                },
                border: {
                    req: false,
                    valid: /^[0-9]+$/
                }
            },
            ltrim: true,
            rtrim: true,
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                if (g_videos[a.id]) {
                    var b = "",
                        c = g_videos[a.id];
                    if (a.unnamed) {
                        if (c.videoType == 1) {
                            b += Markup.toHtml("[youtube=" + c.videoId + "]", {
                                skipReset: true
                            })
                        }
                    } else {
                        if (!g_videos[Markup.uid]) {
                            g_videos[Markup.uid] = []
                        }
                        b += '<div style="position: relative; display: -moz-inline-stack; display: inline-block; zoom: 1; *display: inline"><a href="' + $WH.sprintf(vi_siteurls[c.videoType], c.videoId) + '" onclick="if(!g_isLeftClick(event)) return; VideoViewer.show({videos: \'' + Markup.uid + "', pos: " + g_videos[Markup.uid].length + '}); return false;"' + Markup._addGlobalAttributes(a) + ">";
                        b += '<img src="' + $WH.sprintf(vi_thumbnails[c.videoType], c.videoId) + '" ';
                        if (a.border != 0) {
                            b += 'class="border" '
                        }
                        if (a["float"]) {
                            b += 'style="float: ' + a["float"] + "; ";
                            if (a["float"] == "left") {
                                b += "margin: 0 10px 10px 0"
                            } else {
                                b += "margin: 0 0 10px 10px"
                            }
                            b += '" '
                        }
                        if (c.hasCaption) {
                            b += 'alt="' + Markup.removeTags(c.caption, {
                                mode: Markup.MODE_SIGNATURE,
                                skipReset: true
                            }) + '" '
                        }
                        b += '/><img src="' + g_staticUrl + "/images/icons" + MarkupIconPath + '/play-sm.png" style="opacity: 0.6; filter:alpha(opacity=60); position: absolute; width: 48px; height: 48px; top: 23px; left: 38px" />';
                        b += "</a></div>";
                        g_videos[Markup.uid].push($WH.dO(c))
                    }
                    return b
                }
                return "<b>Video #" + a.id + "</b>"
            }
        },
        visitedpage: {
            empty: false,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                $.post(wowheadUrl + "/visited-page", {
                    id: a.unnamed
                }, function () {
                    AchievementCheck()
                });
                return ""
            }
        },
        wowheadresponse: {
            block: true,
            empty: false,
            rtrim: true,
            ltrim: true,
            itrim: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /[\S ]+/
                },
                roles: {
                    req: true,
                    valid: /[0-9]+/
                }
            },
            allowedModes: {
                article: 1,
                quickfacts: 1,
                comment: 1
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var e = "<div" + Markup._addGlobalAttributes(a);
                var c = [];
                e += ' class="quote ';
                if (a.first) {
                    e += "firstmargin "
                }
                if (a.last) {
                    e == "last "
                }
                var d = a.unnamed.trim();
                if (d.length <= 0) {
                    return ["", ""]
                }
                var b = "";
                if (a.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) {
                    b = "comment-blue"
                } else {
                    b = "comment-green"
                }
                if (g_customColors[d]) {
                    b = "comment-" + g_customColors[d]
                }
                e += b + '"><small class="icon-wowhead"><b class="' + b + '"><a href="' + wowheadUrl + '/user=' + d + '">' + d + "</a></b> " + LANG.markup_said + '</small><div class="pad"></div>';
                return [e, "</div>"]
            }
        },
        youtube: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /\S+/
                },
                width: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                height: {
                    req: false,
                    valid: /^[0-9]+$/
                },
                autoplay: {
                    req: false,
                    valid: /^true$/
                }
            },
            allowedClass: MARKUP_CLASS_STAFF,
            toHtml: function (a) {
                var b = "http://www.youtube.com/v/" + a.unnamed + "&fs=1&rel=0" + (a.autoplay ? "&autoplay=1" : "");
                var d = a.width ? a.width : 640;
                var e = a.height ? a.height : 385;
                var c = "";
                c += '<object width="' + d + '" height="' + e + '"' + Markup._addGlobalAttributes(a) + '><param name="movie" value="' + b + '">';
                c += '<param name="allowfullscreen" value="true"></param>';
                c += '<param name="allowscriptaccess" value="always"></param>';
                c += '<param name="wmode" value="opaque"></param>';
                c += '<embed width="' + d + '" height="' + e + '" src="' + b + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque"></embed>';
                c += "</object>";
                return c
            }
        },
        zone: {
            empty: true,
            attr: {
                unnamed: {
                    req: true,
                    valid: /^[0-9]+$/
                },
                domain: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                },
                site: {
                    req: false,
                    valid: /^(beta|cata|ptr|www|de|es|fr|ru)$/
                }
            },
            validate: function (a) {
                if ((a.domain || a.site) && Markup.dbpage) {
                    return false
                }
                return true
            },
            toHtml: function (a) {
                var e = a.unnamed;
                var d = Markup._getDatabaseDomainInfo(a);
                var b = d[0];
                var c = d[1];
                if (g_gatheredzones[e] && g_gatheredzones[e][c]) {
                    return '<a href="' + b + wowheadUrl + "/zone=" + e + '"' + Markup._addGlobalAttributes(a) + ">" + Markup._safeHtml(g_gatheredzones[e][c]) + "</a>"
                }
                return '<a href="' + b + wowheadUrl + "/zone=" + e + '"' + Markup._addGlobalAttributes(a) + ">(" + LANG.types[7][0] + " #" + e + ")</a>"
            },
            toText: function (a) {
                var d = a.unnamed;
                var c = Markup._getDatabaseDomainInfo(a);
                var b = c[1];
                if (g_gatheredzones[d] && g_gatheredzones[d][b]) {
                    return Markup._safeHtml(g_gatheredzones[d][b])
                }
                return LANG.types[7][0] + " #" + d
            }
        }
    },
    _addGlobalAttributes: function (a) {
        var b = "";
        if (Markup.allow < Markup.CLASS_STAFF) {
            return b
        }
        if (a.id) {
            b += ' id="' + a.id + '"'
        }
        if (a.title) {
            b += ' title="' + Markup._safeQuotes(a.title) + '"'
        }
        if (a["class"]) {
            b += ' class="' + a["class"] + '"'
        }
        if (a["data-highlight"]) {
            b += ' data-highlight="' + a["data-highlight"] + '"'
        }
        return b
    },
    _generateTagDocs: function (d) {
        var b = Markup.tags[d];
        if (!b) {
            return ""
        }
        var g = '<div><h3 class="first">Tag: [' + Markup._safeHtml(d) + "]</h3>";
        g += '<table class="grid">';
        if (b.attr) {
            g += '<tr><td align="right" width="200">Attributes:</td><td>';
            for (var c in b.attr) {
                g += '<div style="margin: 5px; display: inline-block"><table><tr><th style="background-color: #242424; font-weight: bolder" colspan="2">';
                if (c == "unnamed") {
                    g += "Self ([" + d + "=???])"
                } else {
                    g += c
                }
                g += "</th></tr>";
                g += '<tr><td align="right">Required:</td><td>' + (b.attr[c].req ? "Yes" : "No") + "</td></tr>";
                g += '<tr><td align="right">Valid:</td><td>' + (b.attr[c].valid ? Markup._safeHtml(b.attr[c].valid.toString()) : "--") + "</td></tr></table></div>"
            }
            g += "</td></tr>"
        }
        g += '<tr><td align="right" width="200">Has closing tag:</td><td>' + (b.empty ? "No" : "Yes") + "</td></tr>";
        g += '<tr><td align="right">Required group:</td><td>';
        if (b.allowedClass == MARKUP_CLASS_ADMIN) {
            g += "Administrator"
        } else {
            if (b.allowedClass == MARKUP_CLASS_STAFF) {
                g += "Staff"
            } else {
                if (b.allowedClass == MARKUP_CLASS_PREMIUM) {
                    g += "Premium"
                } else {
                    if (b.allowedClass != MARKUP_CLASS_PENDING) {
                        g += "Not pending"
                    } else {
                        g += "None"
                    }
                }
            }
        }
        g += "</td></tr>";
        if (b.allowedChildren) {
            g += '<tr><td align="right">Allowed children:</td><td>';
            for (var e in b.allowedChildren) {
                g += Markup._safeHtml(e) + "<br />"
            }
            g += "</td></tr>"
        }
        if (b.allowedParents) {
            g += '<tr><td align="right">Allowed parents:</td><td>';
            for (var e in b.allowedParents) {
                g += Markup._safeHtml(e) + "<br />"
            }
            g += "</td></tr>"
        }
        if (b.presets) {
            g += '<tr><td align="right">Preset values:</td><td><table>';
            for (var f in b.presets) {
                g += '<tr><td align="right">' + f + "</td><td>" + Markup._safeHtml(b.presets[f]) + "</td></tr>"
            }
            g += "</table></td></tr>"
        }
        if (b.trim) {
            g += '<tr><td colspan="2">Trim whitespace</td></tr>'
        }
        if (b.ltrim) {
            g += '<tr><td colspan="2">Trim preceding whitespace</td></tr>'
        }
        if (b.rtrim) {
            g += '<tr><td colspan="2">Trim following whitespace</td></tr>'
        }
        if (b.itrim) {
            g += '<tr><td colspan="2">Trim whitespace around interior content</td></tr>'
        }
        if (b.block) {
            g += '<tr><td colspan="2">Automatically remove top padding if not the first item</td></tr>'
        }
        g += "</table></div>";
        return g
    },
    _init: function () {
        if (!this.inited) {
            var b = [],
                c = [],
                e = [];
            for (var a in Markup.tags) {
                if (Markup.tags[a].block) {
                    this.firstTags[a] = true
                }
                if (Markup.tags[a].exclude) {
                    for (var d in Markup.tags[a].exclude) {
                        if (!this.excludeTags[d]) {
                            this.excludeTags[d] = {}
                        }
                        this.excludeTags[d][a] = Markup.tags[a].exclude[d]
                    }
                }
                if (Markup.tags[a].post) {
                    this.postTags.push(a)
                }
                if (Markup.tags[a].trim) {
                    e.push(a)
                }
                if (Markup.tags[a].ltrim) {
                    b.push(a)
                }
                if (Markup.tags[a].rtrim) {
                    c.push(a)
                }
            }
            if (b.length > 0) {
                this.ltrimRegex = new RegExp("\\s*\\[(" + b.join("|") + ")([^a-z0-9]+.*)?]", "ig")
            }
            if (c.length > 0) {
                this.rtrimRegex = new RegExp("\\[/(" + c.join("|") + ")\\]\\s*", "ig")
            }
            if (e.length > 0) {
                this.trimRegex = new RegExp("\\s*\\[(" + e.join("|") + ")([^\\[]*)?\\]\\s*", "ig")
            }
            this.inited = true;
            $("[data-highlight]").live("mouseenter", function () {
                var f = $(this).attr("data-highlight").split(":");
                if (f.length != 2) {
                    return
                }
                var g = $("#" + f[0]).get(0),
                    j = parseInt(f[1]),
                    i = $(g).val();
                if (!g || !j || !i) {
                    return
                }
                var h = $(g).val(i.substr(0, j))[0].scrollHeight;
                $(g).val(i).animate({
                    scrollTop: h
                }, 250);
                g.selectionStart = j;
                g.selectionEnd = j
            })
        }
    },
    _safeJsString: function (a) {
        return a.replace(/'/g, "'")
    },
    _safeQuotes: function (a) {
        return a.replace('"', '"').replace("'", "'")
    },
    _safeHtml: function (a) {
        var b = ["nbsp", "ndash"];
        a = a.replace(/&/g, "&amp;");
        if (b.length > 0) {
            a = a.replace(new RegExp("&amp;(" + b.join("|") + ");", "g"), "&$1;")
        }
        return a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    },
    _preText: function (a) {
        a = Markup._safeHtml(a);
        a = a.replace(/\n/g, "<br />");
        return a
    },
    _getDatabaseDomainInfo: function (b) {
        var c = "";
        var d = Markup.nameCol;
        var a = false;
        if (b.domain) {
            a = b.domain
        } else {
            if (b.site) {
                a = b.site
            } else {
                if (Markup.defaultSource) {
                    a = MarkupSourceMap[Markup.defaultSource]
                }
            }
        }
        if (a) {
            if (a == "beta") {
                a = "cata"
            }
            c = "http://" + a + ".wowhead.com";
            d = "name_" + Markup.domainToLocale[a]
        } else {
            if (location.href.indexOf("wowheadnews.com") != -1) {
                c = "http://www.wowhead.com"
            }
        }
        return [c, d, a]
    },
    _isUrlSafe: function (d, a) {
        if (!d) {
            return true
        }
        if (d == "javascript:;") {
            return true
        }
        var b = d.match(/^([^:\\./]+):/i);
        if (b && b[1]) {
            var c = b[1];
            if (c == "http" || c == "https") {
                return true
            }
            if (a && (c == "mailto" || c == "irc")) {
                return true
            }
            if (c != "mailto" && d.indexOf("://") == -1) {
                return true
            }
            return false
        }
        return true
    },
    _fixUrl: function (a) {
        if (!a) {
            return ""
        }
        var b = a.charAt(0);
        if (b == "/" || b == "?") {
            a = a.replace(/^[\/\?]+/, "");
            a = "/" + a
        }
        return a
    },
    _isUrlExternal: function (a) {
        if (!a) {
            return false
        }
        return (a.indexOf("wowhead.com") == -1 && a.match(/^([^:\\./]+):/i))
    },
    _nodeSearch: function (b, a, c) {
        if (!c) {
            c = 0
        }
        if (c >= 3) {
            return
        }
        if (b.name == a) {
            return true
        } else {
            if (b.parent) {
                return Markup._nodeSearch(b.parent, a, c + 1)
            }
        }
    },
    _parse: function (p, f) {
        Markup.nameCol = "name_" + Locale.getName();
        if (f && f.locale) {
            Markup.nameCol = "name_" + Markup.domainToLocale[f.locale]
        } else {
            if ($WH.isset("g_beta") && g_beta) {
                Markup.nameCol = "name_beta"
            } else {
                if ($WH.isset("g_ptr") && g_ptr) {
                    Markup.nameCol = "name_ptr"
                } else {
                    if ($WH.isset("g_old") && g_old) {
                        Markup.nameCol = "name_old"
                    }
                }
            }
        }
        p = p.replace(/\r/g, "");
        if (!f) {
            f = {}
        }
        if (!f.skipReset) {
            Markup.uid = f.uid || "abc";
            Markup.root = f.root;
            Markup.preview = f.preview || false;
            Markup.dbpage = f.dbpage || false;
            Markup.defaultSource = false;
            if (Markup.uid != "abc") {
                g_screenshots[Markup.uid] = []
            }
        }
        if (f.roles && (f.roles & (U_GROUP_ADMIN | U_GROUP_EDITOR | U_GROUP_MOD | U_GROUP_BUREAU | U_GROUP_DEV | U_GROUP_BLOGGER)) && f.mode != Markup.MODE_SIGNATURE) {
            f.mode = Markup.MODE_ARTICLE
        }
        Markup.mode = f.mode || Markup.MODE_ARTICLE;
        Markup.allow = f.allow || Markup.CLASS_STAFF;
        Markup.inBlog = f.inBlog ? f.inBlog : 0;
        if (f.stopAtBreak) {
            var v = p.indexOf("[break]");
            if (v != -1) {
                p = p.substring(0, v)
            }
        } else {
            p = p.replace("[break]", "")
        }
        var m = new MarkupTree();
        p = p.trim();
        if (this.postTags.length) {
            for (var t in this.postTags) {
                var F = this.postTags[t];
                if (p.indexOf("[" + F) != -1) {
                    if (!(Markup.tags[F].allowedModes && Markup.tags[F].allowedModes[MarkupModeMap[f.mode]] == undefined)) {
                        for (var j in Markup.tags[F].collect) {
                            this.collectTags[j] = true
                        }
                    }
                }
            }
        }
        p = p.replace(/\n(\s*)\n/g, "\n\n");
        var u = p.length;
        var z = 0,
            k = 0,
            g = -1,
            l = -1,
            b = true,
            q = false;
        var c = function (I) {
                var i, H, G;
                if (I.charAt(0) == '"' || I.charAt(0) == "'") {
                    i = I.charAt(0);
                    var a = I.indexOf(i, 1);
                    if (a > -1) {
                        G = I.substring(1, a);
                        I = I.substring(a + 1).trim();
                        return {
                            value: Markup._safeHtml(G),
                            str: I
                        }
                    }
                }
                H = I.indexOf(" ");
                if (H > -1) {
                    G = I.substring(0, H);
                    I = I.substring(H + 1).trim()
                } else {
                    G = I;
                    I = ""
                }
                return {
                    value: G,
                    str: I
                }
            };
        var r = /^\s*[a-z0-9]+\s*=/;
        while (k < u) {
            g = p.indexOf("[", k);
            if (g > -1) {
                k = g + 1;
                if (g > 0 && p.charAt(g - 1) == "\\") {
                    b = false;
                    g = -1
                } else {
                    l = p.indexOf("]", k)
                }
            } else {
                k = u
            }
            var d, n = {};
            if (f.highlight && $(f.highlight)) {
                n["data-highlight"] = f.highlight + ":" + g
            }
            if (l > -1) {
                var B = p.substring(g + 1, l);
                if (B.charAt(0) == "/") {
                    q = true;
                    d = B.substr(1).trim().toLowerCase()
                }
                if (!q) {
                    var A = B.indexOf(" "),
                        w = B.indexOf("=");
                    var C;
                    if ((w < A || A == -1) && w > -1) {
                        d = B.substring(0, w).toLowerCase();
                        B = B.substring(w + 1).trim();
                        var E = c(B);
                        B = E.str;
                        if (Markup.tags[d] == undefined || Markup.tags[d].attr == undefined || Markup.tags[d].attr.unnamed == undefined) {
                            b = false
                        } else {
                            n.unnamed = E.value
                        }
                    } else {
                        if (A > -1) {
                            d = B.substring(0, A).toLowerCase();
                            B = B.substring(A + 1).trim();
                            if (B.indexOf("=") == -1) {
                                if (Markup.tags[d] == undefined || Markup.tags[d].attr == undefined || Markup.tags[d].attr.unnamed == undefined) {
                                    b = false
                                } else {
                                    n.unnamed = B
                                }
                                B = ""
                            }
                        } else {
                            d = B.toLowerCase();
                            B = ""
                        }
                    }
                    if (Markup.tags[d] == undefined) {
                        b = false
                    } else {
                        if (b) {
                            var F = Markup.tags[d];
                            while (B != "") {
                                var o = "";
                                if (!r.test(B)) {
                                    o = "unnamed"
                                } else {
                                    w = B.indexOf("=");
                                    if (w == -1) {
                                        b = false;
                                        break
                                    }
                                    o = B.substring(0, w).trim().toLowerCase();
                                    B = B.substring(w + 1).trim()
                                }
                                var E = c(B);
                                B = E.str;
                                if (F.attr == undefined || F.attr[o] == undefined) {
                                    if (Markup.attributes[o] == undefined || (Markup.attributes[o].valid != undefined && !Markup.attributes[o].valid.test(E.value))) {
                                        b = false;
                                        break
                                    }
                                }
                                n[o] = E.value
                            }
                            if (b && F.attr) {
                                for (var D in F.attr) {
                                    if (F.attr[D].req && n[D] == undefined) {
                                        b = false;
                                        break
                                    } else {
                                        if (n[D] == undefined) {
                                            continue
                                        }
                                    }
                                    if (F.attr[D].valid != undefined && !F.attr[D].valid.test(n[D])) {
                                        b = false;
                                        break
                                    }
                                }
                                if (b && F.validate != undefined) {
                                    b = F.validate(n)
                                }
                            }
                        }
                    }
                } else {
                    if (Markup.tags[d] == undefined) {
                        b = false
                    }
                }
            } else {
                b = false
            }
            if (b) {
                if (z != g) {
                    var h = p.substring(z, g).replace(/\\\[/g, "[");
                    var e = {
                        _rawText: h
                    };
                    m.openTag("<text>", e)
                }
                if (q) {
                    b = m.closeTag(d)
                } else {
                    b = m.openTag(d, n)
                }
                if (b) {
                    z = k = l + 1
                } else {
                    z = g
                }
            }
            b = true;
            q = false;
            g = l = -1
        }
        if (z < u) {
            var h = p.substr(z).replace(/\\\[/g, "[");
            var e = {
                _rawText: h
            };
            m.openTag("<text>", e)
        }
        return m
    },
    createMaps: function () {
        for (var b = 0; b < Markup.maps.length; ++b) {
            var a = Markup.maps[b];
            new Mapper({
                parent: a[0],
                zone: a[1],
                coords: a[2],
                unique: b
            })
        }
        Markup.maps = []
    },
    toHtml: function (d, c) {
        if (!c) {
            c = {}
        }
        if (!c.allow) {
            if (c.roles) {
                c.allow = Markup.rolesToClass(c.roles)
            } else {
                c.allow = Markup.CLASS_STAFF
            }
        }
        var a = Markup._parse(d, c);
        var b = a.toHtml();
        if (c.prepend) {
            b = c.prepend + b
        }
        if (c.append) {
            b += c.append
        }
        setTimeout(Markup.createMaps, 250);
        return b
    },
    fromHtml: function (c, b) {
        c = c.replace(/\n+/g, "");
        c = c.replace(/\s+/g, " ");
        c = c.replace(/> </g, "><");
        c = c.replace(/<br\b[\s\S]*?></gi, "<");
        c = c.replace(/&amp;/gi, "&");
        for (var a in Markup.tags) {
            if (Markup.tags[a].fromHtml) {
                c = Markup.tags[a].fromHtml(c, b)
            }
        }
        c = c.replace(/<\/?[a-z][a-z0-9]*\b[\s\S]*?>/g, " ");
        c = c.replace(/<!--(.*?)-->/g, "");
        c = c.replace(/\n[\n]+/g, "\n\n");
        c = c.replace(/[ ]+/g, " ");
        c = c.replace(/\t/g, "  ");
        return $WH.trim(c)
    },
    removeTags: function (c, b) {
        var a = Markup._parse(c, b);
        return a.tagless()
    },
    matchOuterTags: function (k, e, q, c) {
        var i = c.indexOf("g") > -1,
            j = c.replace(/g/g, ""),
            p = new RegExp(e + "|" + q, "g" + j),
            h = new RegExp(e, j),
            o = [],
            r, u, d, b;
        do {
            r = 0;
            while (d = p.exec(k)) {
                if (h.test(d[0])) {
                    if (!r++) {
                        u = p.lastIndex;
                        b = d
                    }
                } else {
                    if (r) {
                        if (!--r) {
                            o.push([k.slice(u, d.index), b[0], d[0]]);
                            if (!i) {
                                return o
                            }
                        }
                    }
                }
            }
        } while (r && (p.lastIndex = u));
        return (o.length ? o : false)
    },
    getImageUploadIds: function (c, b) {
        var a = Markup._parse(c, b);
        return a.imageUploadIds()
    },
    printHtml: function (c, d, b) {
        d = $WH.ge(d);
        var a = Markup.toHtml(c, b);
        d.innerHTML = a;
        Markup.createMaps()
    },
    toggleReveal: function (c) {
        var a = $("#reveal-" + c);
        if (a.length == 0) {
            return
        }
        var b = $("#revealtoggle-" + c);
        if (a.is(":visible")) {
            a.hide();
            b.text("(read more)")
        } else {
            a.show();
            b.text("(hide)")
        }
    },
    mapperPreview: function (c) {
        try {
            window.mapper = Markup.maps[c];
            var b = window.open(wowheadUrl + "/edit=mapper-preview", "mapperpreview", "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no,width=800,height=540");
            b.focus()
        } catch (a) {}
    },
    createTabs: function (a, d, f) {
        var b = new Tabs({
            parent: $WH.ge("dsf67g4d-" + a.id + (f ? "-preview" : "")),
            forum: 1,
            noScroll: (f ? true : false)
        });
        for (var c = 0; c < d.length; ++c) {
            var e = d[c];
            b.add(e.name, {
                id: a.id + "-" + e.id,
                icon: e.icon,
                "class": e["class"]
            })
        }
        b.flush()
    }
};
var MarkupUtil = {
    ltrimText: function (a) {
        a._rawText = a._rawText.ltrim();
        return a
    },
    rtrimText: function (a) {
        a._rawText = a._rawText.rtrim();
        return a
    },
    checkSiblingTrim: function (a, b) {
        if (b.name == "<text>" && (Markup.tags[a.name].rtrim || Markup.tags[a.name].trim)) {
            b.attr = MarkupUtil.ltrimText(b.attr)
        } else {
            if (a.name == "<text>" && (Markup.tags[b.name].ltrim || Markup.tags[b.name].trim)) {
                a.attr = MarkupUtil.rtrimText(a.attr)
            }
        }
        return [a, b]
    }
};
var MarkupTree = function () {
        this.nodes = [];
        this.currentNode = null
    };
MarkupTree.prototype = {
    openTag: function (b, c) {
        if (b != "<text>" && Markup.tags[b] && !Markup.tags[b].allowedClass) {
            Markup.tags[b].allowedClass = MARKUP_CLASS_PENDING
        }
        if (!Markup.tags[b]) {
            return false
        } else {
            if (Markup.tags[b].allowedModes && Markup.tags[b].allowedModes[MarkupModeMap[Markup.mode]] == undefined) {
                return false
            } else {
                if (Markup.tags[b].allowedClass && Markup.tags[b].allowedClass > Markup.allow) {
                    return false
                }
            }
        }
        var d = {
            name: b,
            attr: c,
            parent: null,
            nodes: []
        };
        if (this.currentNode) {
            d.parent = this.currentNode
        }
        if (Markup.tags[b].allowedParents) {
            if (d.parent != null) {
                if (Markup.tags[b].allowedParents[d.parent.name] === undefined) {
                    return false
                }
            } else {
                if (Markup.root == undefined || Markup.tags[b].allowedParents[Markup.root] == undefined) {
                    return false
                }
            }
        }
        if (d.parent && Markup.tags[d.parent.name].allowedChildren && Markup.tags[d.parent.name].allowedChildren[b] == undefined) {
            return false
        }
        if (this.currentNode) {
            if (this.currentNode.nodes.length == 0 && d.name == "<text>" && Markup.tags[this.currentNode.name].itrim) {
                d.attr = MarkupUtil.ltrimText(d.attr)
            } else {
                if (this.currentNode.nodes.length > 0) {
                    var a = this.currentNode.nodes.length - 1;
                    var e = MarkupUtil.checkSiblingTrim(this.currentNode.nodes[a], d);
                    this.currentNode.nodes[a] = e[0];
                    d = e[1]
                }
            }
            if (d.name == "<text>") {
                d.attr._text = Markup._preText(d.attr._rawText);
                if (d.attr._text.length > 0) {
                    this.currentNode.nodes.push(d)
                }
            } else {
                this.currentNode.nodes.push(d)
            }
        } else {
            if (this.nodes.length > 0) {
                var a = this.nodes.length - 1;
                var e = MarkupUtil.checkSiblingTrim(this.nodes[a], d);
                this.nodes[a] = e[0];
                d = e[1]
            }
            if (d.name == "<text>") {
                d.attr._text = Markup._preText(d.attr._rawText);
                if (d.attr._text.length > 0) {
                    this.nodes.push(d)
                }
            } else {
                this.nodes.push(d)
            }
        }
        if (!Markup.tags[b].empty && !Markup.tags[b].post) {
            this.currentNode = d
        }
        return true
    },
    closeTag: function (c) {
        if (Markup.tags[c].empty || Markup.tags[c].post) {
            return false
        }
        if (!this.currentNode) {
            return false
        } else {
            if (this.currentNode.name == c) {
                if (this.currentNode.nodes.length > 0) {
                    var b = this.currentNode.nodes.length - 1;
                    if (Markup.tags[this.currentNode.name].itrim && this.currentNode.nodes[b].name == "<text>") {
                        var e = this.currentNode.nodes[b];
                        e.attr = MarkupUtil.rtrimText(e.attr);
                        e.attr._text = Markup._preText(e.attr._rawText);
                        this.currentNode.nodes[b] = e
                    }
                }
                this.currentNode = this.currentNode.parent
            } else {
                var d = function (g, f) {
                        for (var h = f.length - 1; h >= 0; --h) {
                            if (f[h].name == g) {
                                return h
                            }
                        }
                        return -1
                    };
                var a;
                if (this.currentNode.parent) {
                    a = d(c, this.currentNode.parent.nodes)
                } else {
                    a = d(c, this.nodes)
                }
                if (a == -1) {
                    return false
                }
            }
        }
        return true
    },
    toHtml: function () {
        var d = [];
        var c = {};
        for (var j in Markup.collectTags) {
            c[j] = []
        }
        this.tagless(true);
        var h = 0;
        var a = function (k, n, r) {
                var v = "";
                for (var m = 0; m < k.length; ++m) {
                    var l = k[m];
                    if (n == 0 && m == 0 && Markup.firstTags[l.name]) {
                        l.attr.first = true
                    } else {
                        if (n > 0 && m == 0 && Markup.firstTags[l.parent.name]) {
                            l.attr.first = true
                        }
                    }
                    if (m == k.length - 1 && Markup.firstTags[l.name]) {
                        l.attr.last = true
                    }
                    if (Markup.excludeTags[l.name]) {
                        r[l.name] = (r[l.name] ? r[l.name] + 1 : 1)
                    }
                    for (var u in r) {
                        for (var w in Markup.excludeTags[u]) {
                            if (Markup.excludeTags[u][w][l.name]) {
                                l.attr[w] = false
                            }
                        }
                    }
                    if (Markup.collectTags[l.name]) {
                        l.offset = h++;
                        c[l.name].push(l)
                    }
                    if (Markup.tags[l.name].post) {
                        var q = "<!--" + Math.random() + "-->";
                        v += q;
                        d.push([l, q])
                    } else {
                        if (Markup.tags[l.name].empty) {
                            var p;
                            if (l.parent && Markup.tags[l.parent.name].rawText) {
                                p = Markup.tags[l.name].toHtml(l.attr, {
                                    needsRaw: true
                                })
                            } else {
                                p = Markup.tags[l.name].toHtml(l.attr)
                            }
                            if (typeof p == "string") {
                                v += p
                            } else {
                                if (p !== undefined) {
                                    if (v == "") {
                                        v = []
                                    }
                                    v.push(p)
                                }
                            }
                        } else {
                            var o = arguments.callee(l.nodes, n + 1, r);
                            l.attr._contents = o;
                            l.attr._nodes = l.nodes;
                            var z = Markup.tags[l.name].toHtml(l.attr);
                            if (z.length == 2) {
                                v += z[0] + o + z[1]
                            } else {
                                if (z.length == 1) {
                                    if (typeof z[0] == "string") {
                                        v += z[0]
                                    } else {
                                        if (v == "") {
                                            v = []
                                        }
                                        v.push(z[0])
                                    }
                                }
                            }
                        }
                    }
                    if (r[l.name]) {
                        r[l.name]--;
                        if (r[l.name] == 0) {
                            delete r[l.name]
                        }
                    }
                }
                return v
            };
        str = a(this.nodes, 0, []);
        for (var f = 0; f < d.length; ++f) {
            var e = d[f][0];
            var b = d[f][1];
            var g = Markup.tags[e.name].postHtml(e.attr, c);
            if (typeof g == "string") {
                str = str.replace(b, g)
            }
        }
        return str
    },
    tagless: function (c) {
        var a = function (e) {
                var h = "";
                for (var f = 0; f < e.length; ++f) {
                    var g = e[f];
                    var d = arguments.callee(g.nodes);
                    if (c) {
                        g.attr._textContents = d
                    } else {
                        g.attr._contents = d
                    }
                    if (g.name == "<text>") {
                        h += Markup.tags[g.name].toHtml(g.attr, {
                            noLink: true,
                            noNbsp: true
                        })
                    } else {
                        if (Markup.tags[g.name].toText) {
                            h += Markup.tags[g.name].toText(g.attr)
                        }
                    }
                    if (!Markup.tags[g.name].taglessSkip) {
                        h += d
                    }
                }
                return h
            };
        if (c) {
            a(this.nodes)
        } else {
            var b = a(this.nodes);
            b = b.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
            return b
        }
    },
    imageUploadIds: function () {
        var b = [];
        var a = function (c) {
                for (var d = 0; d < c.length; ++d) {
                    var e = c[d];
                    if (e.name == "img" && e.attr.upload) {
                        b.push(e.attr.upload)
                    }
                    arguments.callee(e.nodes)
                }
            };
        a(this.nodes);
        return b
    }
};
Markup.tags.modelviewer = Markup.tags.model;
Markup.reveals = 0;
Markup._init();
$(document).ready(function () {
    $(".quote-header").each(function (c) {
        var e = $(this);
        var d = e.siblings();
        if (d.hasClass("quote-body")) {
            var b = $("<a/>", {
                href: "javascript:;",
                "class": "toggle"
            });
            b.click(function (g) {
                var a = $(g);
                var f = a.parent();
                f.toggleClass("collapse");
                if (f.hasClass("collapse")) {
                    $(this).html("Expand")
                } else {
                    $(this).html("Collapse")
                }
            }.bind(b, this));
            if ($(this).parent().hasClass("collapse")) {
                b.html("Expand")
            } else {
                b.html("Collapse")
            }
            e.append(b)
        }
    });
    $(".quote-wh").each(function (c) {
        var d = $(this);
        var b = $("<a/>", {
            href: "javascript:;",
            "class": "toggle"
        });
        b.click(function (e) {
            var a = $(e);
            a.toggleClass("collapse");
            if (a.hasClass("collapse")) {
                $(this).html("Expand")
            } else {
                $(this).html("Collapse")
            }
        }.bind(b, this));
        if ($(this).hasClass("collapse")) {
            b.html("Expand")
        } else {
            b.html("Collapse")
        }
        d.append(b)
    })
});
var MENU_IDX_ID = 0;
var MENU_IDX_NAME = 1;
var MENU_IDX_URL = 2;
var MENU_IDX_SUB = 3;
var MENU_IDX_OPT = 4;
var Menu = new function () {
        var l = this;
        l.add = function (am, an, al) {
            if (!al) {
                al = $.noop
            }
            var ak = $(am);
            ak.data("menu", an);
            if (al.showAtCursor) {
                ak.click(ah)
            } else {
                ak.mouseover(w).mouseout(n)
            }
        };
        l.remove = function (ak) {
            $(ak).data("menu", null).unbind("click", ah).unbind("mouseover", w).unbind("mouseout", n)
        };
        l.show = function (am, al) {
            var ak = $(al);
            W(am, ak)
        };
        l.showAtCursor = function (al, ak) {
            B(al, ak.pageX, ak.pageY)
        };
        l.showAtXY = function (al, ak, am) {
            B(al, ak, am)
        };
        l.hide = function () {
            n()
        };
        l.addButtons = function (ak, am) {
            var an = $(ak);
            if (!an.length) {
                return
            }
            var al = $('<span class="menu-buttons"></span>');
            $.each(am, function (ao, aq) {
                if (ae(aq)) {
                    return
                }
                var ar = $("<a></a>");
                var ap = $("<span></span>", {
                    text: aq[MENU_IDX_NAME]
                }).appendTo(ar);
                l.linkifyItem(aq, ar);
                if (P(aq)) {
                    ap.addClass("hassubmenu");
                    l.add(ar, aq[MENU_IDX_SUB])
                }
                al.append(ar)
            });
            an.append(al)
        };
        l.linkifyItem = function (ak, an) {
            var am = l.getItemOpt(ak);
            if (!ak[MENU_IDX_URL]) {
                an.attr("href", "javascript:;");
                an.addClass("unlinked");
                return
            }
            if (typeof ak[MENU_IDX_URL] == "function") {
                an.attr("href", "javascript:;");
                an.click(ac);
                an.click(ak[MENU_IDX_URL])
            } else {
                var al = l.getItemUrl(ak);
                an.attr("href", al);
                if (am.newWindow || g_isExternalUrl(al)) {
                    an.attr("target", "_blank")
                }
                if (am.rel) {
                    an.attr("rel", am.rel)
                }
            }
        };
        l.updateItem = function (al) {
            var an = al.$a;
            if (!an) {
                return
            }
            var am = l.getItemOpt(al);
            an.removeClass("checked tinyicon icon");
            an.css("background-image", "");
            if (al.checked) {
                an.addClass("checked")
            } else {
                if (am.tinyIcon) {
                    an.addClass("tinyicon");
                    an.css("background-image", "url(" + (am.tinyIcon.indexOf("/") != -1 ? am.tinyIcon : g_staticUrl + "/images/wow/icons/tiny/" + am.tinyIcon.toLowerCase() + ".gif") + ")")
                } else {
                    if (am.icon) {
                        an.addClass("icon");
                        an.css("background-image", "url(" + am.icon + ")")
                    } else {
                        if (am.socketColor && g_file_gems[am.socketColor]) {
                            an.addClass("socket-" + g_file_gems[am.socketColor])
                        }
                    }
                }
            }
            var ak = (am["class"] || am.className);
            if (ak) {
                an.addClass(ak)
            }
        };
        l.hasMenu = function (al) {
            var ak = $(al);
            return ak.data("menu") != null
        };
        l.modifyUrl = function (ak, an, am) {
            var al = {
                params: an,
                opt: am
            };
            p(ak, function (ao) {
                ao.modifyUrl = al
            });
            PageTemplate.updateBreadcrumb()
        };
        l.fixUrls = function (am, ak, al) {
            al = al || {};
            al.hash = (al.hash ? "#" + al.hash : "");
            f(am, ak, al, 0)
        };
        l.sort = function (ak) {
            if (T(ak)) {
                Q(ak)
            } else {
                h(ak)
            }
        };
        l.sortSubmenus = function (al, ak) {
            $.each(ak, function (am, ao) {
                var an = l.findItem(al, ao);
                if (an && an[MENU_IDX_SUB]) {
                    l.sort(an[MENU_IDX_SUB])
                }
            })
        };
        l.implode = function (an, ak) {
            if (!ak) {
                ak = $.noop
            }
            var am = [];
            var al;
            if (ak.createHeadinglessGroup) {
                al = [];
                am.push([0, "", null, al])
            }
            $.each(an, function (ao, ap) {
                if (ae(ap)) {
                    al = [];
                    am.push([0, ap[MENU_IDX_NAME], null, al])
                } else {
                    if (al) {
                        al.push(ap)
                    } else {
                        am.push(ap)
                    }
                }
            });
            return am
        };
        l.findItem = function (al, ak) {
            return l.getFullPath(al, ak).pop()
        };
        l.getFullPath = function (ao, an) {
            var am = [];
            for (var al = 0; al < an.length; ++al) {
                var ap = X(ao, an[al]);
                if (ap != -1) {
                    var ak = ao[ap];
                    ak.parentMenu = ao;
                    ao = ak[MENU_IDX_SUB];
                    am.push(ak)
                }
            }
            return am
        };
        l.getItemUrl = function (ak) {
            var al = ak[MENU_IDX_URL];
            if (!al) {
                return null
            }
            var am = l.getItemOpt(ak);
            if (ak.modifyUrl) {
                al = g_modifyUrl(al, ak.modifyUrl.params, ak.modifyUrl.opt)
            }
            return al
        };
        l.getItemOpt = function (ak) {
            if (!ak[MENU_IDX_OPT]) {
                ak[MENU_IDX_OPT] = {}
            }
            return ak[MENU_IDX_OPT]
        };
        l.removeItemById = function (ak, am) {
            var al = X(ak, am);
            if (al != -1) {
                ak.splice(al, 1)
            }
        };
        var Y = 25;
        var M = 333;
        var g = 4;
        var t = 6;
        var U = 6;
        var R = 3;
        var H = 26;
        var o = false;
        var L;
        var C;
        var O = {};
        var J = {};
        var c = {};
        var k = {};
        var N = 0;

        function af() {
            if (o) {
                return
            }
            o = true;
            var ak = $('<div class="menu"><a href="#"><span>ohai</span></a></div>').css({
                left: "-1000px",
                top: "-1000px"
            }).appendTo(document.body);
            var al = ak.children("a").outerHeight();
            ak.remove();
            if (al > 15) {
                H = al
            }
        }
        function W(al, ak) {
            if (C) {
                C.removeClass("open")
            }
            C = ak;
            C.addClass("open");
            d(al)
        }
        function ac() {
            if (C) {
                C.removeClass("open");
                C = null
            }
            j(0)
        }
        function B(al, ak, am) {
            clearTimeout(L);
            d(al, ak, am)
        }
        function d(al, ak, am) {
            ad(0);
            q(al, 0, ak, am);
            j(1)
        }
        function q(am, ao, at, ar) {
            af();
            S(am);
            var ap = Z(ao);
            var al = ag(am);
            var ak = u(al, ao);
            ap.append(ak);
            var an = !K(ao);
            O[ao] = ap;
            var aq = I(ap, ao, at, ar);
            ap.css({
                left: aq.x + "px",
                top: aq.y + "px"
            });
            var au = $WH.g_createRect(aq.x, aq.y, ap.width(), ap.height());
            Ads.intersect(au, true);
            z(ap, an)
        }
        function Z(al) {
            if (c[al]) {
                var ak = c[al];
                ak.children().detach();
                return ak
            }
            var ak = $('<div class="menu"></div>').mouseover(V).mouseleave(i).delegate("a", "mouseenter", {
                depth: al
            }, D).delegate("a", "click", r);
            if ($WH.isset("g_thottbot") && g_thottbot) {
                ak.hide()
            }
            ak.appendTo(document.body);
            c[al] = ak;
            return ak
        }
        function ag(an) {
            var al = b(an);
            if (k[al]) {
                return k[al]
            }
            var ao;
            var ak = [];
            $.each(an, function (ap, aq) {
                if (!G(aq)) {
                    return
                }
                $a = F(aq);
                if (ae(aq)) {
                    ao = $a;
                    return
                }
                if (ao) {
                    ak.push(ao);
                    ao = null
                }
                ak.push($a)
            });
            var am = $(ak);
            k[an] = am;
            return am
        }
        function F(al) {
            ai(al);
            var am = $("<a></a>");
            al.$a = am;
            am.data("menuItem", al);
            l.linkifyItem(al, am);
            l.updateItem(al);
            if (ae(al)) {
                am.addClass("separator");
                am.text(al[MENU_IDX_NAME]);
                return am
            }
            var ak = $("<span></span>");
            ak.text(al[MENU_IDX_NAME]);
            ak.appendTo(am);
            if (P(al)) {
                ak.addClass("hassubmenu")
            }
            return am
        }
        function u(ak, aw) {
            var aq = C;
            var at = $(window);
            var aA = ak.length;
            var ao = at.height() - (R * 2) - U;
            var av = Math.floor(Math.max(0, ao) / H);
            if (av >= aA) {
                var ay = $('<div class="menu-outer"></div>');
                var al = $('<div class="menu-inner"></div>');
                ak.appendTo(al);
                ay.append(al);
                return ay
            }
            var an = Math.min(g, Math.ceil(aA / av));
            var az = Math.ceil(aA / an);
            var ap = 0;
            var aB = aA;
            var ar = $("<div></div>");
            while (aB > 0) {
                var ay = $('<div class="menu-outer"></div>');
                var al = $('<div class="menu-inner"></div>');
                var ax = Math.min(aB, az);
                var am = ap;
                var au = am + ax;
                ak.slice(am, au).appendTo(al);
                ay.append(al);
                ar.append(ay);
                ap += ax;
                aB -= ax
            }
            return ar
        }
        function I(al, am, ak, an) {
            if (am == 0) {
                return aa(al, am, ak, an)
            }
            return m(al, am)
        }
        function aa(au, ap, ax, aw) {
            var at = g_getViewport();
            var al = au.width();
            var aq = au.height();
            var an = al + t;
            var ak = aq + U;
            var ar = (ax != null && aw != null);
            if (ar) {
                if (aw + ak > at.b) {
                    aw = Math.max(at.t, at.b - ak)
                }
            } else {
                var am = C;
                var ao = am.offset();
                var av = false;
                ax = ao.left;
                aw = ao.top + am.outerHeight();
                if (aw + ak > at.b && ao.top >= ak) {
                    aw = ao.top - ak
                }
                var ay = $WH.g_createRect(ax, aw, an, ak);
                if (Ads.intersect(ay)) {
                    av = true
                }
                if (av) {
                    ax = ao.left + am.outerWidth() - al
                }
            }
            if (ax + an > at.r) {
                ax = Math.max(at.l, at.r - an)
            }
            return {
                x: ax,
                y: aw
            }
        }
        function m(at, ap) {
            var ar = g_getViewport();
            var al = at.width();
            var aq = at.height();
            var an = al + t;
            var ak = aq + U;
            var am = J[ap - 1];
            var ao = am.offset();
            var au = false;
            x = ao.left + am.outerWidth() - 5;
            y = ao.top - 2;
            if (x + an > ar.r) {
                au = true
            }
            if (au) {
                x = Math.max(ar.l, ao.left - al)
            }
            if (y + ak > ar.b) {
                y = Math.max(ar.t, ar.b - ak)
            }
            return {
                x: x,
                y: y
            }
        }
        function z(al, ak) {
            if (ak) {
                al.css({
                    opacity: "0"
                }).show().animate({
                    opacity: "1"
                }, "fast", null, ab)
            } else {
                al.show()
            }
        }
        function ab(ak) {
            $(this).css("opacity", "")
        }
        function j(ak) {
            while (O[ak]) {
                O[ak].stop().hide();
                O[ak] = null;
                ++ak
            }
            if (!O[0]) {
                Ads.restoreHidden()
            }
        }
        function ad(ak) {
            while (J[ak]) {
                J[ak].removeClass("open");
                J[ak] = null;
                ++ak
            }
        }
        function K(ak) {
            return O[ak || 0] != null
        }
        function aj(ak) {
            return ak[MENU_IDX_ID]
        }
        function ae(ak) {
            return ak[MENU_IDX_ID] == null
        }
        function T(ak) {
            return $WH.in_array(ak, true, ae) != -1
        }
        function P(ak) {
            return ak[MENU_IDX_SUB] != null
        }
        function X(ak, al) {
            return $WH.in_array(ak, al, aj)
        }
        function e(ak) {
            var al = l.getItemOpt(ak);
            if (al.requiredAccess && !User.hasPermissions(al.requiredAccess)) {
                return false
            }
            return true
        }
        function G(ak) {
            if (!e(ak)) {
                return false
            }
            if (P(ak)) {
                if (!a(ak[MENU_IDX_SUB])) {
                    return false
                }
            }
            return true
        }
        function a(ak) {
            return $WH.in_array(ak, true, E) != -1
        }
        function E(ak) {
            return !ae(ak) && e(ak)
        }
        function b(ak) {
            if (ak.uniqueId == null) {
                ak.uniqueId = N++
            }
            return ak.uniqueId
        }
        function A(al, ak) {
            $.each(al, function (am, an) {
                p(an, ak)
            })
        }
        function p(ak, al) {
            al(ak);
            if (P(ak)) {
                A(ak[MENU_IDX_SUB], al)
            }
        }
        function f(an, ak, al, am) {
            $.each(an, function (ap, aq) {
                if (aq === undefined) {
                    return
                }
                if (ae(aq)) {
                    return
                }
                if (aq[MENU_IDX_URL] == null) {
                    aq[MENU_IDX_URL] = ak + aq[MENU_IDX_ID] + al.hash
                }
                if (P(aq)) {
                    var ao = true;
                    if (al.useSimpleIds) {
                        ao = false
                    } else {
                        if (al.useSimpleIdsAfter != null && am >= al.useSimpleIdsAfter) {
                            ao = false
                        }
                    }
                    var ar = ak;
                    if (ao) {
                        ar += aq[MENU_IDX_ID] + "."
                    }
                    f(aq[MENU_IDX_SUB], ar, al, am + 1)
                }
            })
        }
        function h(ak) {
            ak.sort(function (am, al) {
                return $WH.strcmp(am[MENU_IDX_NAME], al[MENU_IDX_NAME])
            })
        }
        function Q(al) {
            var ak = l.implode(al, {
                createHeadinglessGroup: true
            });
            $.each(ak, function (am, an) {
                h(an[MENU_IDX_SUB])
            });
            v(al, ak)
        }
        function v(al, ak) {
            al.splice(0, al.length);
            $.each(ak, function (am, an) {
                if (an[MENU_IDX_NAME]) {
                    al.push([, an[MENU_IDX_NAME]])
                }
                $.each(an[MENU_IDX_SUB], function (ao, ap) {
                    al.push(ap)
                })
            })
        }
        function ai(ak) {
            var al = l.getItemOpt(ak);
            if (al.checkedUrl && location.href.match(al.checkedUrl)) {
                ak.checked = true
            }
        }
        function S(ak) {
            if (ak.onBeforeShow) {
                ak.onBeforeShow(ak)
            }
            $.each(ak, function (al, am) {
                var an = l.getItemOpt(am);
                if (an.onBeforeShow) {
                    an.onBeforeShow(am)
                }
            })
        }
        function w(al) {
            clearTimeout(L);
            var ak = $(this);
            if (!K()) {
                L = setTimeout(W.bind(null, ak.data("menu"), ak), Y);
                return
            }
            W(ak.data("menu"), ak)
        }
        function n(ak) {
            clearTimeout(L);
            if (K()) {
                L = setTimeout(ac, M)
            }
        }
        function ah(ak) {
            clearTimeout(L);
            l.showAtCursor($(this).data("menu"), ak)
        }
        function V(ak) {
            clearTimeout(L)
        }
        function i(ak) {
            clearTimeout(L);
            L = setTimeout(ac, M)
        }
        function D(al) {
            clearTimeout(L);
            var am = $(this);
            var an = al.data.depth;
            ad(an);
            var ak = am.data("menuItem");
            var ao = an;
            if (ak && P(ak)) {
                am.addClass("open");
                J[an] = am;
                q(ak[MENU_IDX_SUB], an + 1);
                ++ao
            }
            j(ao + 1)
        }
        function r(am) {
            var an = $(this);
            var ak = an.data("menuItem");
            if (!ak) {
                return
            }
            var al = l.getItemOpt(ak);
            if (al.onClick) {
                al.onClick()
            }
        }
    };
Menu.fixUrls(mn_achievements, wowheadUrl + "/achievements=");
Menu.fixUrls(mn_bluetracker, wowheadUrl + "/bluetracker=");
Menu.fixUrls(mn_classes, wowheadUrl + "/class=");
Menu.fixUrls(mn_currencies, wowheadUrl + "/currencies=");
Menu.fixUrls(mn_factions, wowheadUrl + "/factions=");
Menu.fixUrls(mn_forums, wowheadUrl + "/forums?board=", {
    useSimpleIds: true
});
Menu.fixUrls(mn_items, wowheadUrl + "/items=");
Menu.fixUrls(mn_itemSets, wowheadUrl + "/itemsets?filter=cl=", {
    hash: "0-2+1"
});
Menu.fixUrls(mn_npcs, wowheadUrl + "/npcs=");
Menu.fixUrls(mn_objects, wowheadUrl + "/objects=");
Menu.fixUrls(mn_petCalc, wowheadUrl + "/petcalc=");
Menu.fixUrls(mn_pets, wowheadUrl + "/pets=");
Menu.fixUrls(mn_quests, wowheadUrl + "/quests=");
Menu.fixUrls(mn_races, wowheadUrl + "/race=");
Menu.fixUrls(mn_spells, wowheadUrl + "/spells=");
Menu.fixUrls(mn_titles, wowheadUrl + "/titles=");
Menu.fixUrls(mn_zones, wowheadUrl + "/zones=");
$(document).ready(function () {
    if (Locale.getId() == LOCALE_ENUS) {
        return
    }
    Menu.sort(mn_classes);
    Menu.sort(mn_database);
    Menu.sortSubmenus(mn_forums, [
        [-2]
    ]);
    Menu.sortSubmenus(mn_items, [
        [4, 1],
        [4, 2],
        [4, 3],
        [4, 4],
        [1],
        [0],
        [16],
        [7],
        [6],
        [9]
    ]);
    Menu.sort(mn_itemSets);
    Menu.sort(mn_npcs);
    Menu.sort(mn_objects);
    Menu.sort(mn_talentCalc);
    Menu.sort(mn_petCalc);
    Menu.sort(mn_pets);
    Menu.sort(mn_races);
    Menu.sort(mn_skills);
    Menu.sortSubmenus(mn_spells, [
        [7],
        [-2],
        [-3],
        [11],
        [9]
    ])
});
var ModelViewer = new function () {
        this.validSlots = [1, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26];
        this.slotMap = {
            1: 1,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10,
            13: 21,
            14: 22,
            15: 22,
            16: 16,
            17: 21,
            19: 19,
            20: 5,
            21: 21,
            22: 22,
            23: 22,
            25: 21,
            26: 21
        };
        var e, F, I = [],
            i, C, r, E, h, G, p, u, v, f, q, A, z, o, c = false,
            t = [{
                id: 10,
                name: g_chr_races[10],
                model: "bloodelf"
            }, {
                id: 11,
                name: g_chr_races[11],
                model: "draenei"
            }, {
                id: 3,
                name: g_chr_races[3],
                model: "dwarf"
            }, {
                id: 7,
                name: g_chr_races[7],
                model: "gnome"
            }, {
                id: 9,
                name: g_chr_races[9],
                model: "goblin"
            }, {
                id: 1,
                name: g_chr_races[1],
                model: "human"
            }, {
                id: 4,
                name: g_chr_races[4],
                model: "nightelf"
            }, {
                id: 2,
                name: g_chr_races[2],
                model: "orc"
            }, {
                id: 6,
                name: g_chr_races[6],
                model: "tauren"
            }, {
                id: 8,
                name: g_chr_races[8],
                model: "troll"
            }, {
                id: 5,
                name: g_chr_races[5],
                model: "scourge"
            }, {
                id: 22,
                name: g_chr_races[22],
                model: "worgen"
            }],
            j = [{
                id: 0,
                name: LANG.male,
                model: "male"
            }, {
                id: 1,
                name: LANG.female,
                model: "female"
            }];

        function D() {
            C.hide();
            r.hide();
            E.hide()
        }
        function a() {
            var J, K;
            if (u.is(":visible")) {
                J = (u[0].selectedIndex >= 0 ? u.val() : "")
            } else {
                J = (v[0].selectedIndex >= 0 ? v.val() : "")
            }
            K = (f[0].selectedIndex >= 0 ? f.val() : 0);
            return {
                r: J,
                s: K
            }
        }
        function d(J, K) {
            return (!isNaN(J) && J > 0 && $WH.in_array(t, J, function (L) {
                return L.id
            }) != -1 && !isNaN(K) && K >= 0 && K <= 1)
        }
        function B() {
            var K = 600;
            if (z.displayAd && g_user.ads) {
                K = 725
            }
            G.css("width", K + "px");
            if (A == 2 && !g()) {
                A = 0
            }
            if (A == 2) {
                var O = '<object id="3dviewer-plugin" type="application/x-zam-wowmodel" width="' + K + '" height="400"><param name="model" value="' + e + '" /><param name="modelType" value="' + F + '" /><param name="contentPath" value="' + g_staticUrl + '/modelviewer/" />';
                if (F == 16 && I.length) {
                    O += '<param name="equipList" value="' + I.join(",") + '" />'
                }
                O += '<param name="bgColor" value="#181818" /></object>';
                E.html(O);
                E.show();
                p.hide()
            } else {
                if (A == 1) {
                    var O = '<applet id="3dviewer-java" code="org.jdesktop.applet.util.JNLPAppletLauncher" width="' + K + '" height="400" archive="' + g_staticUrl + "/modelviewer/applet-launcher.jar,http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jar,http://download.java.net/media/gluegen/webstart/gluegen-rt.jar,http://download.java.net/media/java3d/webstart/release/vecmath/latest/vecmath.jar," + g_staticUrl + '/modelviewer/ModelView1000.jar"><param name="jnlp_href" value="' + g_staticUrl + '/modelviewer/ModelView1000.jnlp"><param name="codebase_lookup" value="false"><param name="cache_option" value="no"><param name="subapplet.classname" value="modelview.ModelViewerApplet"><param name="subapplet.displayname" value="Model Viewer Applet"><param name="progressbar" value="true"><param name="jnlpNumExtensions" value="1"><param name="jnlpExtension1" value="http://download.java.net/media/jogl/builds/archive/jsr-231-webstart-current/jogl.jnlp"><param name="contentPath" value="' + g_staticUrl + '/modelviewer/"><param name="model" value="' + e + '"><param name="modelType" value="' + F + '">';
                    if (F == 16 && I.length) {
                        O += '<param name="equipList" value="' + I.join(",") + '">'
                    }
                    O += '<param name="bgColor" value="#181818"></applet>';
                    r.html(O);
                    r.show();
                    p.show()
                } else {
                    var L = {
                        model: e,
                        modelType: F,
                        contentPath: g_staticUrl + "/modelviewer/",
                        blur: ($WH.OS.mac ? "0" : "1")
                    };
                    var N = {
                        quality: "high",
                        allowscriptaccess: "always",
                        allowfullscreen: true,
                        menu: false,
                        bgcolor: "#181818"
                    };
                    var M = {};
                    if (F == 16 && I.length) {
                        L.equipList = I.join(",")
                    }
                    swfobject.embedSWF(g_staticUrl + "/modelviewer/ModelView.swf", "dsjkgbdsg2346", K, "400", "10.0.0", g_staticUrl + "/modelviewer/expressInstall.swf", L, N, M);
                    C.show();
                    p.hide()
                }
            }
            var R = a(),
                P = R.r,
                Q = R.s;
            if (!i.noPound) {
                var J = "#modelviewer";
                var R = $("#dsgndslgn464d");
                if (R.length == 0) {
                    switch (i.type) {
                    case 1:
                        J += ":1:" + i.displayId + ":" + (i.humanoid | 0);
                        break;
                    case 2:
                        J += ":2:" + i.displayId;
                        break;
                    case 3:
                        J += ":3:" + i.displayId + ":" + (i.slot | 0);
                        break;
                    case 4:
                        J += ":4:" + I.join(";");
                        break
                    }
                }
                if (P && Q) {
                    J += ":" + P + "+" + Q
                } else {
                    J += ":"
                }
                if (i.extraPound != null) {
                    J += ":" + i.extraPound
                }
                c = false;
                location.replace($WH.rtrim(J, ":"))
            }
        }
        function b() {
            var N = a(),
                K = N.r,
                L = N.s;
            if (!K) {
                if (!f.is(":visible")) {
                    return
                }
                f.hide();
                e = I[1];
                switch (i.slot) {
                case 1:
                    F = 2;
                    break;
                case 3:
                    F = 4;
                    break;
                default:
                    F = 1
                }
            } else {
                if (!f.is(":visible")) {
                    f.show()
                }
                var N = function (O) {
                        return O.id
                    };
                var M = $WH.in_array(t, K, N);
                var J = $WH.in_array(j, L, N);
                if (M != -1 && J != -1) {
                    e = t[M].model + j[J].model;
                    F = 16
                }
                g_setWowheadCookie("temp_default_3dmodel", K + "," + L)
            }
            D();
            B()
        }
        function k(J) {
            if (J == A) {
                return
            }
            g_setSelectedLink(this, "modelviewer-mode");
            D();
            if (A == null) {
                A = J;
                setTimeout(B, 50)
            } else {
                A = J;
                $WH.sc("modelviewer_mode", 7, J, "/", wowheadDomain);
                B()
            }
        }
        function n() {
            var K = $("#3dviewer-java");
            if (K.length == 0) {
                return
            }
            K = K[0];
            var J = $("select", p);
            if (J.val() && K.isLoaded && K.isLoaded()) {
                K.setAnimation(J.val())
            }
        }
        function m() {
            if (c) {
                return
            }
            var O = $("#3dviewer-java");
            if (O.length == 0) {
                return
            }
            O = O[0];
            var L = $("select", p);
            L.empty();
            if (!O.isLoaded || !O.isLoaded()) {
                L.append($("<option/>", {
                    text: LANG.tooltip_loading,
                    val: 0
                }));
                return
            }
            var J = {};
            var N = O.getNumAnimations();
            for (var M = 0; M < N; ++M) {
                var K = O.getAnimation(M);
                if (K) {
                    J[K] = 1
                }
            }
            var P = [];
            for (var K in J) {
                P.push(K)
            }
            P.sort();
            for (var M = 0; M < P.length; ++M) {
                L.append($("<option/>", {
                    text: P[M],
                    val: P[M]
                }))
            }
            c = true
        }
        function w(P, K) {
            var R = -1,
                T = -1,
                L, O;
            if (K.race != null && K.sex != null) {
                R = K.race;
                T = K.sex;
                h.hide();
                P = 0
            } else {
                h.show()
            }
            if (R == -1 && T == -1) {
                if (location.hash) {
                    var Q = location.hash.match(/modelviewer:.*?([0-9]+)\+([0-9]+)/);
                    if (Q != null) {
                        if (d(Q[1], Q[2])) {
                            R = Q[1];
                            T = Q[2];
                            f.show()
                        }
                    }
                }
            }
            if (P) {
                L = u;
                O = 1;
                u.show();
                u[0].selectedIndex = -1;
                v.hide();
                if (T == -1) {
                    f.hide()
                }
            } else {
                if (R == -1 && T == -1) {
                    var W = 1,
                        N = 0;
                    if (g_user && g_user.cookies.default_3dmodel) {
                        var J = g_user.cookies.default_3dmodel.split(",");
                        if (J.length == 2) {
                            W = J[0];
                            N = J[1] - 1
                        }
                    } else {
                        var S = g_getWowheadCookie("temp_default_3dmodel");
                        if (S) {
                            var J = S.split(",");
                            if (J.length == 2) {
                                W = J[0];
                                N = J[1]
                            }
                        }
                    }
                    if (d(W, N)) {
                        R = W;
                        T = N
                    } else {
                        R = 1;
                        T = 0
                    }
                }
                L = v;
                O = 0;
                u.hide();
                v.show();
                f.show()
            }
            if (T != -1) {
                f[0].selectedIndex = T
            }
            if (R != -1 && T != -1) {
                var V = function (X) {
                        return X.id
                    };
                var U = $WH.in_array(t, R, V);
                var M = $WH.in_array(j, T, V);
                if (U != -1 && M != -1) {
                    e = t[U].model + j[M].model;
                    F = 16;
                    U += O;
                    L[0].selectedIndex = U;
                    f[0].selectedIndex = M
                }
            }
        }
        function g() {
            var K = navigator.mimeTypes["application/x-zam-wowmodel"];
            if (K) {
                var J = K.enabledPlugin;
                if (J) {
                    return true
                }
            }
            return false
        }
        function l() {
            if (!i.noPound) {
                if (!i.fromTag && q && q.indexOf("modelviewer") == -1) {
                    location.replace(q)
                } else {
                    location.replace("#.")
                }
            }
            if (i.onHide) {
                i.onHide()
            }
        }
        function H(O, L, J) {
            var ad, ac;
            z = J;
            if (!J.displayAd || !g_user.ads) {
                Lightbox.setSize(620, 452)
            } else {
                Lightbox.setSize(749, 546)
            }
            if (L) {
                O = $(O);
                O.addClass("modelviewer");
                var N = $("<div/>", {
                    "class": "modelviewer-screen"
                });
                C = $("<div/>", {
                    css: {
                        display: "none"
                    }
                });
                r = $("<div/>", {
                    css: {
                        display: "none"
                    }
                });
                E = $("<div/>", {
                    css: {
                        display: "none"
                    }
                });
                var W = $("<div/>", {
                    id: "dsjkgbdsg2346"
                });
                C.append(W);
                N.append(C);
                N.append(r);
                N.append(E);
                var R = $("<div/>", {
                    css: {
                        "background-color": "#181818",
                        margin: "0"
                    }
                });
                R.append(N);
                O.append(R);
                G = N;
                var Q = $("<div/>", {
                    css: {
                        "float": "right"
                    }
                });
                var Z = $("<div/>", {
                    css: {
                        "float": "left"
                    }
                });
                p = $("<div/>", {
                    "class": "modelviewer-animation"
                });
                var P = $("<var/>", {
                    text: LANG.animation
                });
                p.append(P);
                var aa = $("<select/>", {
                    change: n,
                    mouseenter: m
                });
                aa.append($("<option/>", {
                    text: LANG.dialog_mouseovertoload
                }));
                p.append(aa);
                Q.append(p);
                var ad = $("<a/>", {
                    "class": "dialog-question",
                    href: wowheadUrl + "/help=modelviewer",
                    target: "_blank",
                    text: LANG.help
                }),
                    ac = $("<a/>", {
                        "class": "dialog-x",
                        href: "javascript:;",
                        click: Lightbox.hide,
                        text: LANG.close
                    });
                Q.append(ac);
                Q.append(ad);
                O.append(Q);
                var X = $("<div/>", {
                    "class": "modelviewer-quality"
                }),
                    T = $("<span/>"),
                    ad = $("<a/>", {
                        href: "javascript:;",
                        text: "Flash"
                    }),
                    ac = $("<a/>", {
                        href: "javascript:;",
                        text: "Java"
                    });
                ad.click(k.bind(ad[0], 0));
                ac.click(k.bind(ac[0], 1));
                T.append(ad);
                T.append(" " + String.fromCharCode(160));
                T.append(ac);
                if (g()) {
                    var ab = $("<a/>", {
                        href: "javascript:;",
                        text: "Plugin"
                    });
                    ab.click(k.bind(ab[0], 2));
                    T.append(" " + String.fromCharCode(160));
                    T.append(ab)
                }
                var P = $("<var/>", {
                    text: LANG.quality
                });
                X.append(P);
                X.append(T);
                Z.append(X);
                h = $("<div/>", {
                    "class": "modelviewer-model"
                });
                var W = function (af, ae) {
                        return $WH.strcmp(af.name, ae.name)
                    };
                t.sort(W);
                u = $("<select/>", {
                    change: b
                });
                v = $("<select/>", {
                    change: b
                });
                f = $("<select/>", {
                    change: b
                });
                u.append($("<option/>"));
                for (var U = 0, V = t.length; U < V; ++U) {
                    var S = $("<option/>", {
                        val: t[U].id,
                        text: t[U].name
                    });
                    u.append(S)
                }
                for (var U = 0, V = t.length; U < V; ++U) {
                    var S = $("<option/>", {
                        val: t[U].id,
                        text: t[U].name
                    });
                    v.append(S)
                }
                for (var U = 0, V = j.length; U < V; ++U) {
                    var S = $("<option/>", {
                        val: j[U].id,
                        text: j[U].name
                    });
                    f.append(S)
                }
                f.hide();
                var P = $("<var/>", {
                    text: LANG.model
                });
                h.append(P);
                h.append(u);
                h.append(v);
                h.append(f);
                Z.append(h);
                O.append(Z);
                X = $("<div/>", {
                    "class": "clear"
                });
                O.append(X);
                X = $("<div/>", {
                    id: "modelviewer-msg",
                    "class": "sub",
                    css: {
                        display: "none",
                        "margin-top": "-6px",
                        color: "#ccc",
                        "font-size": "11px"
                    }
                });
                O.append(X);
                if (J.displayAd) {
                    X.css("padding-bottom", "4px");
                    X = $("<div/>", {
                        id: "modelviewer-ad",
                        css: {
                            "padding-bottom": "10px"
                        }
                    });
                    O.append(X)
                }
            }
            switch (J.type) {
            case 1:
                h.hide();
                if (J.humanoid) {
                    F = 32
                } else {
                    F = 8
                }
                e = J.displayId;
                break;
            case 2:
                h.hide();
                F = 64;
                e = J.displayId;
                break;
            case 3:
            case 4:
                if (J.type == 3) {
                    I = [J.slot, J.displayId]
                } else {
                    I = J.equipList
                }
                if (I.length > 2 || $WH.in_array([4, 5, 6, 7, 8, 9, 10, 16, 19, 20], I[0]) != -1) {
                    w(0, J)
                } else {
                    switch (I[0]) {
                    case 1:
                        F = 2;
                        break;
                    case 3:
                        F = 4;
                        break;
                    default:
                        F = 1
                    }
                    e = I[1];
                    w(1, J)
                }
                break
            }
            var Y = $("#modelviewer-ad");
            if (L) {
                if ($WH.gc("modelviewer_mode") == "2" && g()) {
                    ab.click()
                } else {
                    if ($WH.gc("modelviewer_mode") == "0") {
                        ad.click()
                    } else {
                        ac.click()
                    }
                }
            } else {
                Y.empty();
                D();
                setTimeout(B, 1)
            }
            if (J.displayAd && Y.length > 0) {
                Ads.fillSpot("leaderboard", Y[0])
            }
            var K = $("#modelviewer-msg");
            if (J.message && K.length > 0) {
                K.html(J.message);
                K.show()
            } else {
                K.hide()
            }
            var M = "";
            if (J.fromTag) {
                M += "Custom ";
                switch (J.type) {
                case 1:
                    M += "NPC " + J.displayId + (J.humanoid ? " humanoid" : "");
                    break;
                case 2:
                    M += "Object " + J.displayId;
                    break;
                case 3:
                    M += "Item " + J.displayId + " Slot " + (J.slot | 0);
                    break;
                case 4:
                    M += "Item set " + I.join(".");
                    break
                }
            } else {
                switch (J.type) {
                case 1:
                    M += "NPC " + (J.typeId ? J.typeId : " DisplayID " + J.displayId);
                    break;
                case 2:
                    M += "Object " + J.typeId;
                    break;
                case 3:
                    M += "Item " + J.typeId;
                    break;
                case 4:
                    M += "Item set " + I.join(".");
                    break
                }
            }
            g_trackEvent("Model Viewer", "Show", g_urlize(M));
            q = location.hash
        }
        this.checkPound = function () {
            if (location.hash && location.hash.indexOf("#modelviewer") == 0) {
                var N = location.hash.split(":");
                if (N.length >= 3) {
                    N.shift();
                    var L = parseInt(N.shift());
                    var K = {
                        type: L,
                        displayAd: 1
                    };
                    switch (L) {
                    case 1:
                        K.displayId = parseInt(N.shift());
                        var J = parseInt(N.shift());
                        if (J == 1) {
                            K.humanoid = 1
                        }
                        break;
                    case 2:
                        K.displayId = parseInt(N.shift());
                        break;
                    case 3:
                        K.displayId = parseInt(N.shift());
                        K.slot = parseInt(N.shift());
                        break;
                    case 4:
                        var M = N.shift();
                        K.equipList = M.split(";");
                        break
                    }
                    if (K.displayId || K.equipList) {
                        ModelViewer.show(K)
                    }
                    if (o != null) {
                        if (N.length > 0 && N[N.length - 1]) {
                            o(N[N.length - 1])
                        }
                    }
                } else {
                    if (o != null && N.length == 2 && N[1]) {
                        o(N[1])
                    } else {
                        var O = $("#dsgndslgn464d");
                        if (O.length > 0) {
                            O.click()
                        }
                    }
                }
            }
        };
        this.addExtraPound = function (J) {
            o = J
        };
        this.show = function (J) {
            i = J;
            Lightbox.show("modelviewer", {
                onShow: H,
                onHide: l
            }, J)
        };
        $(document).ready(this.checkPound)
    };
var PageTemplate = new function () {
        var t = this;
        var d = "";
        if ($WH.isset("g_thottbot") && g_thottbot) {
            d = wowheadUrl + "/tb"
        }
        t.init = function () {
            o();
            k();
            w();
            g();
            p();
            j();
            a();
            $(document).ready(A);
            B = true
        };
        t.get = function (G) {
            return c[G]
        };
        t.set = function (H) {
            if (!H) {
                return
            }
            var G = {};
            $.extend(G, c);
            $.extend(c, H);
            c.activeTab = parseInt(c.activeTab);
            if (B) {
                if (c.activeTab != G.activeTab) {
                    b();
                    r()
                }
                if (c.breadcrumb != G.breadcrumb) {
                    n()
                }
            }
        };
        t.getBreadcrumb = function () {
            return C
        };
        t.updateBreadcrumb = function () {
            n()
        };
        t.expandBreadcrumb = function () {
            return q()
        };
        var B = false;
        var c = {};
        var C;
        var e;
        var h = [];

        function F() {
            z();
            l()
        }
        function z() {
            C = $('<div class="breadcrumb"></div>')
        }
        function l() {
            if ($WH.Browser.ie6) {
                $(document.documentElement).addClass("ie6 ie67 ie678")
            }
            if ($WH.Browser.ie7) {
                $(document.documentElement).addClass("ie7 ie67 ie678")
            }
            if ($WH.Browser.ie8) {
                $(document.documentElement).addClass("ie8 ie678")
            }
        }
        function o() {
            var G = $("#toplinks-user");
            if (!G.length) {
                return
            }
            G.attr("href", wowheadUrl + "/user=" + g_user.name);
            var K = [];
            var J = ["user-page", LANG.userpage, wowheadUrl + "/user=" + g_user.name, null,
            {
                checkedUrl: new RegExp("user=" + g_user.name + "$", "i")
            }];
            K.push(J);
            var H = ["settings", LANG.settings, "https://" + window.location.hostname + "/account", null,
            {
                icon: g_staticUrl + "/images/icons" + d + "/cog.gif",
                checkedUrl: /account/i
            }];
            K.push(H);
            m(K);
            i(K);
            var I;
            if (!g_user.premium) {
                I = ["premium-upgarde", LANG.premiumupgrade, wowheadUrl + "/premium", null,
                {
                    className: "q7",
                    checkedUrl: /premium/i
                }];
                K.push(I)
            }
            K.push(["sign-out", LANG.signout, wowheadUrl + "/account=signout"]);
            Menu.add(G, K);
            G.addClass("hassubmenu")
        }
        function m(H) {
            if (!g_user.characters || !g_user.characters.length) {
                return
            }
            var G = ["characters", LANG.tab_characters, wowheadUrl + "/user=" + g_user.name + "#characters", null,
            {
                onBeforeShow: E
            }];
            H.push(G)
        }
        function i(G) {
            if (!g_user.profiles || !g_user.profiles.length) {
                return
            }
            var H = ["profiles", LANG.tab_profiles, wowheadUrl + "/user=" + g_user.name + "#profiles", null,
            {
                onBeforeShow: f
            }];
            G.push(H)
        }
        function E(H) {
            var G = [];
            g_user.characters.sort(function (K, J) {
                return $WH.strcmp(K.realmname, J.realmname) || $WH.strcmp(K.region, J.region) || $WH.strcmp(K.name, J.name)
            });
            var I;
            $.each(g_user.characters, function (J, M) {
                var L = M.region + M.realm;
                if (L != I) {
                    var N = [, M.realmname + " (" + M.region.toUpperCase() + ")", g_getProfileRealmUrl(M)];
                    G.push(N);
                    I = L
                }
                var K = [M.id, M.name, g_getProfileUrl(M), null,
                {
                    className: (M.pinned ? "icon-star-right " : "") + "c" + M.classs,
                    tinyIcon: $WH.g_getProfileIcon(M.race, M.classs, M.gender, M.level, M.id, "tiny")
                }];
                G.push(K)
            });
            H[MENU_IDX_SUB] = G
        }
        function f(H) {
            var G = [];
            g_user.profiles.sort(function (J, I) {
                return $WH.strcmp(J.name, I.name)
            });
            $.each(g_user.profiles, function (I, K) {
                var J = [K.id, K.name, g_getProfileUrl(K), null,
                {
                    className: "c" + K.classs,
                    tinyIcon: $WH.g_getProfileIcon(K.race, K.classs, K.gender, K.level, K.icon, "tiny")
                }];
                G.push(J)
            });
            G.push([0, LANG.menu_newprofile, wowheadUrl + "/profile&new", null,
            {
                tinyIcon: "inv_misc_questionmark"
            }]);
            H[MENU_IDX_SUB] = G
        }
        function k() {
            $("#toplinks-feedback").attr("href", "javascript:;").click(function () {
                ContactTool.show()
            })
        }
        function w() {
            var H = "http://";
            var K = currentPage;
            var G = Locale.getId();
            var J = [];
            var I;
            $.each(Locale.getAllByName(), function (L, N) {
                if (currentPage.indexOf("?") > 0) {
                    var M = [N.id, N.description, "http://" + currentPage + "&" + N.domain];
                }
                else {
                    var M = [N.id, N.description, "http://" + currentPage + "?" + N.domain];
                }
                if (N.id == wowheadLocaleID) {
                    M.checked = true;
                    I = N
                }
                J.push(M)
            });
            D($("#toplinks-language"), J, I);
            $(document).ready(function () {
                D($("#footer-links-language"), J, I)
            })
        }
        function D(G, I, H) {
            G.attr("href", "javascript:;");
            G.text(H.description);
            G.addClass("hassubmenu");
            Menu.add(G, I)
        }
        function g() {
            $("#header-expandsite").attr("href", "javascript:;").click(v)
        }
        function A() {
            var G = Facebook.getCurrentOpenGraphUrl();
            if (G && !C.is(":empty") && !{
                blog: 1
            }[c.pageName]) {
                $("<div></div>", {
                    className: "header-facebook-like"
                }).append(Facebook.createLikeButton(G, {
                    simple: true
                })).appendTo($("#wrapper-right"))
            }
        }
        function p() {
            var G = $("#toptabs");
            if (!G.length) {
                return
            }
            e = $("<dl/>");
            $.each(mn_path, function (H, I) {
                var J = $("<dt><a><span><big>" + I[MENU_IDX_NAME].charAt(0) + "</big>" + I[MENU_IDX_NAME].substr(1) + "</span></a></dt>");
                var K = J.children("a");
                Menu.linkifyItem(I, K);
                J.appendTo(e)
            });
            b();
            e.appendTo(G)
        }
        function j() {
            var H = $("#topbar");
            if (!H.length) {
                return
            }
            var I = $("div.topbar-search", H);
            var G;
            if ($WH.isset("g_thottbot") && g_thottbot) {
                G = $("<button>&gt;</button>")
            } else {
                G = $("<a></a>").attr("href", "javascript:;")
            }
            G.click(u).appendTo(I);
            $("form", I).submit(g_preventEmptyFormSubmission);
            LiveSearch.attach($("input", I));
            r()
        }
        function a() {
            n();
            C.appendTo($("#main-precontents"))
        }
        function b() {
            if (!e) {
                return
            }
            var G = $("a", e);
            $.each(mn_path, function (H, J) {
                var K = $(G.get(H));
                var I = (J[MENU_IDX_ID] == c.activeTab);
                if (I) {
                    K.addClass("active");
                    Menu.remove(K)
                } else {
                    K.removeClass("active");
                    if (J[MENU_IDX_SUB]) {
                        Menu.add(K, J[MENU_IDX_SUB])
                    }
                }
            })
        }
        function r() {
            var H = $("#topbar div.topbar-buttons");
            if (!H.length) {
                return
            }
            H.empty();
            switch (c.activeTab) {
            case 0:
                Menu.addButtons(H, [
                    [0, LANG.menu_browse, null, mn_database], Menu.findItem(mn_tools, [8]), Menu.findItem(mn_tools, [8, 4])]);
                break;
            case 1:
                var G = [
                    [, LANG.calculators], Menu.findItem(mn_tools, [0]), Menu.findItem(mn_tools, [2]), Menu.findItem(mn_tools, [3])];
                Menu.addButtons(H, Menu.implode(G));
                Menu.addButtons(H, Menu.implode(mn_tools.slice(3)));
                break;
            case 2:
                Menu.addButtons(H, Menu.implode(mn_more));
                break;
            case 3:
                Menu.addButtons(H, Menu.implode(mn_community));
                Menu.addButtons(H, [Menu.findItem(mn_tools, [8])]);
                break;
            case 4:
                Menu.addButtons(H, Menu.implode(mn_staff));
                break
            }
        }
        function n() {
            if (!c.breadcrumb || !c.breadcrumb.length) {
                C.hide();
                return
            }
            C.empty();
            if (h.length) {
                $.each(h, function () {
                    this.checked = false;
                    Menu.updateItem(this)
                });
                h = []
            }
            var G = Menu.getFullPath(mn_path, c.breadcrumb);
            if (!G.length) {
                return
            }
            var H = (G.length - 1);
            $.each(G, function (I, M) {
                var L = Menu.getItemOpt(M);
                M.checked = true;
                h.push(M);
                Menu.updateItem(M);
                var K = q();
                var J = K;
                if (M[MENU_IDX_URL]) {
                    J = $("<a/>", {
                        href: Menu.getItemUrl(M)
                    }).appendTo(K)
                }
                if (L.breadcrumb) {
                    J.text(L.breadcrumb)
                } else {
                    J.text(M[MENU_IDX_NAME])
                }
                Menu.add(J, M.parentMenu);
                K.appendTo(C);
                if (I == H && M[MENU_IDX_SUB]) {
                    K.addClass("breadcrumb-arrow");
                    var N = $('<span class="breadcrumb-ellipsis">...</span>');
                    Menu.add(N, M[MENU_IDX_SUB]);
                    N.appendTo(C)
                }
            });
            C.trigger("update");
            C.show()
        }
        function q() {
            if ($WH.isset("g_thottbot") && g_thottbot) {
                C.children("span:last").append(" &gt; ")
            } else {
                C.children("span:last").addClass("breadcrumb-arrow")
            }
            return $("<span/>").appendTo(C)
        }
        function v() {
            Ads.removeAll();
            $("#sidebar, #header-expandsite").remove();
            if ($("#layout").hasClass("nosidebar")) {
                return
            }
            $("#wrapper").animate({
                "margin-right": "10px"
            }, 333, null, function () {
                $("#wrapper").css("margin-right", "0px");
                $("#layout").addClass("nosidebar")
            })
        }
        function u() {
            $(this).prev("form").submit().children("input").focus()
        }
        F()
    };

function g_getViewport() {
    var a = $(window);
    return new Rectangle(a.scrollLeft(), a.scrollTop(), a.width(), a.height())
}
var PoundChecker = new function () {
        var b = null;
        var d = null;
        var c = 1000;
        var a = function () {
                if (!d) {
                    PoundChecker.stop();
                    return
                }
                if (location.hash) {
                    d()
                }
            };
        this.start = function (e, g) {
            if (d) {
                if ($WH.isset("g_dev")) {
                    alert("Multiple pound checkers are bad, mmkay?")
                }
                return
            }
            d = e;
            if (g) {
                c = g
            }
            b = setInterval(a, c)
        };
        this.stop = function () {
            clearInterval(b);
            b = d = null;
            c = 1000
        };
        this.pause = function () {
            clearInterval(b)
        };
        this.resume = function () {
            if (d) {
                b = setInterval(d, c)
            }
        }
    };

function g_cleanCharacterName(a) {
    return (a.match && a.match(/^[A-Z]/) ? a.charAt(0).toLowerCase() + a.substr(1) : a)
}
function g_getProfileUrl(a) {
    if (a.region) {
        return wowheadUrl + "/profile=" + a.region + "." + a.realm + "." + g_cleanCharacterName(a.name)
    } else {
        return wowheadUrl + "/profile=" + a.id
    }
}
function g_getProfileRealmUrl(a) {
    return wowheadUrl + "/profiles=" + a.region + "." + a.realm
}
var ProgressBar = function (a) {
        this.opts = {
            text: "",
            hoverText: "",
            color: "rep6",
            width: 0,
            progress: 0
        };
        this.elements = {
            text: null,
            hoverText: null,
            textContainer: null,
            progress: null,
            container: null
        };
        $WH.cO(this.opts, a);
        this.build()
    };
ProgressBar.prototype.build = function () {
    var b = $("<a/>", {
        "class": "progressbar",
        href: "javascript:;"
    });
    if (this.opts.width > 0) {
        b.css("width", this.opts.width + "px")
    } else {
        b.css("width", "auto")
    }
    var a = $("<div/>", {
        "class": "progressbar-text"
    });
    if (this.opts.text) {
        this.elements.text = $("<del/>", {
            text: this.opts.text
        });
        a.append(this.elements.text)
    }
    if (this.opts.hoverText) {
        this.elements.hoverText = $("<ins/>", {
            text: this.opts.hoverText
        });
        a.append(this.elements.hoverText)
    }
    b.append(a);
    var c = $("<div/>", {
        "class": "progressbar-" + this.opts.color,
        css: {
            width: this.opts.progress + "%"
        },
        text: String.fromCharCode(160)
    });
    b.append(c);
    if (this.opts.text) {
        a.append($("<div/>", {
            "class": "progressbar-text progressbar-hidden",
            text: this.opts.text
        }))
    }
    this.elements.container = b;
    this.elements.progress = c;
    this.elements.textContainer = a;
    return b
};
ProgressBar.prototype.setText = function (a) {
    this.opts.text = a;
    if (this.elements.text) {
        this.elements.text.text(this.opts.text)
    } else {
        this.elements.text = $("<del/>", {
            text: this.opts.text
        });
        if (this.opts.hoverText) {
            this.opts.hoverText.before(this.elements.text)
        } else {
            this.elements.textContainer.append(this.elements.text)
        }
    }
};
ProgressBar.prototype.setHoverText = function (a) {
    this.opts.hoverText = a;
    if (this.elements.hoverText) {
        this.elements.hoverText.text(this.opts.hoverText)
    } else {
        this.elements.hoverText = $("<ins/>", {
            text: this.opts.hoverText
        });
        this.elements.textContainer.append(this.elements.hoverText)
    }
};
ProgressBar.prototype.setProgress = function (a) {
    this.opts.progress = a;
    this.elements.progress.css("width", this.opts.progress + "%")
};
ProgressBar.prototype.setWidth = function (a) {
    this.opts.width = a;
    if (this.opts.width > 0) {
        this.elements.container.css("width", this.opts.width + "px")
    } else {
        this.elements.container.css("width", "auto")
    }
};
ProgressBar.prototype.getText = function () {
    return this.opts.text
};
ProgressBar.prototype.getHoverText = function () {
    return this.opts.hoverText
};
ProgressBar.prototype.getWidth = function () {
    return this.opts.width
};
ProgressBar.prototype.getContainer = function () {
    return this.elements.container
};

function Rectangle(d, c, a, b) {
    this.l = d;
    this.t = c;
    this.r = d + a;
    this.b = c + b
}
Rectangle.prototype = {
    intersectWith: function (a) {
        var b = !(this.l >= a.r || a.l >= this.r || this.t >= a.b || a.t >= this.b);
        return b
    },
    contains: function (a) {
        var b = (this.l <= a.l && this.t <= a.t && this.r >= a.r && this.b >= a.b);
        return b
    },
    containedIn: function (a) {
        return a.contains(this)
    }
};
var RedButton = {
    create: function (k, g, j) {
        var d = $WH.ce("a"),
            f, c, e, h = $WH.ce("span");
        if (!($WH.isset("g_thottbot") && g_thottbot)) {
            f = $WH.ce("em");
            c = $WH.ce("b");
            e = $WH.ce("i")
        }
        d.href = "javascript:;";
        d.className = "button-red";
        if (!($WH.isset("g_thottbot") && g_thottbot)) {
            $WH.ae(c, e);
            $WH.ae(f, c);
            $WH.ae(f, h);
            $WH.ae(d, f)
        } else {
            $WH.ae(d, h)
        }
        RedButton.setText(d, k);
        RedButton.enable(d, g);
        RedButton.setFunc(d, j);
        return d
    },
    setText: function (a, b) {
        if (!($WH.isset("g_thottbot") && g_thottbot)) {
            $WH.st(a.firstChild.childNodes[0].firstChild, b);
            $WH.st(a.firstChild.childNodes[1], b)
        } else {
            $WH.st(a.firstChild, b)
        }
    },
    enable: function (a, b) {
        if (b || b == null) {
            a.className = a.className.replace("button-red-disabled", "")
        } else {
            if (a.className.indexOf("button-red-disabled") == -1) {
                a.className += " button-red-disabled"
            }
        }
    },
    setFunc: function (a, b) {
        $(a).unbind();
        if (b) {
            $(a).click(b)
        }
    }
};

function ss_submitAScreenshot() {
    tabsContribute.focus(1)
}
function ss_validateForm(a) {
    if (!a.elements.screenshotfile.value.length) {
        alert(LANG.message_noscreenshot);
        return false
    }
    return true
}
function ss_appendSticky() {
    var j = $WH.ge("infobox-sticky-ss");
    var g = g_pageInfo.type;
    var f = g_pageInfo.typeId;
    var h = $WH.in_array(lv_screenshots, 1, function (a) {
        return a.sticky
    });
    if (h != -1) {
        var b = lv_screenshots[h];
        var i = $WH.ce("a");
        i.href = "#screenshots:id=" + b.id;
        i.onclick = function (a) {
            ScreenshotViewer.show({
                screenshots: lv_screenshots,
                pos: h
            });
            return $WH.rf2(a)
        };
        var l = (lv_videos && lv_videos.length ? [120, 90] : [150, 150]);
        var e = $WH.ce("img"),
            d = Math.min(l[0] / b.width, l[1] / b.height);
        e.src = g_staticUrl + "/uploads/screenshots/thumb/" + b.id + ".jpg";
        e.width = Math.round(d * b.width);
        e.height = Math.round(d * b.height);
        e.className = "border";
        $WH.ae(i, e);
        $WH.ae(j, i);
        var c = $("#infobox-screenshots");
        if (!c) {
            var k = $("th", j.parentNode);
            c = k[k.length - (lv_videos && lv_videos.length ? 2 : 1)]
        }
        c.append(" (" + lv_screenshots.length + ")").wrapInner($('<a href="#screenshots"></a>').click(function () {
            tabsRelated.focus((lv_videos && lv_videos.length) || (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)) ? -2 : -1);
            return false
        }))
    } else {
        var i;
        if (g_user.id > 0) {
            i = '<a href="javascript:;" onclick="ss_submitAScreenshot(); return false">'
        } else {
            i = '<a href="' + wowheadUrl + '/account=signin">'
        }
        j.innerHTML = $WH.sprintf(LANG.infobox_noneyet, i + LANG.infobox_submitone + "</a>")
    }
}
var g_screenshots = {};
var ScreenshotViewer = new function () {
        var G, m, e, E, J, c, r, u = 0,
            A, b, q, k, C, D, z, h, B, l, o, F;

        function g(K) {
            var N = G[m];
            var L = Math.max(50, Math.min(618, $WH.g_getWindowSize().h - 72 - K));
            if (u != 1 || N.id || N.resize) {
                c = Math.min(772 / N.width, 618 / N.height);
                J = Math.min(772 / N.width, L / N.height)
            } else {
                c = J = 1
            }
            if (c > 1) {
                c = 1
            }
            if (J > 1) {
                J = 1
            }
            e = Math.round(J * N.width);
            E = Math.round(J * N.height);
            var M = Math.max(480, e);
            Lightbox.setSize(M + 20, E + 52 + K);
            if (K) {
                k.firstChild.width = e;
                k.firstChild.height = E
            }
        }
        function d(M) {
            var L = G[M],
                K = "#screenshots:";
            if (u == 0) {
                K += "id=" + L.id
            } else {
                K += A + ":" + (M + 1)
            }
            return K
        }
        function w(N) {
            if (N && (J == c) && $WH.g_getWindowSize().h > b.offsetHeight) {
                return
            }
            b.style.visibility = "hidden";
            var K = G[m],
                Q = (K.width > 772 || K.height > 618);
            g(0);
            var M = (K.url ? K.url : g_staticUrl + "/uploads/screenshots/" + (Q ? "resized/" : "normal/") + K.id + ".jpg");
            var R = '<img src="' + M + '" width="' + e + '" height="' + E + '">';
            k.innerHTML = R;
            if (!N) {
                g_trackEvent("Screenshots", "Show", K.id + ((K.caption && K.caption.length) ? " (" + K.caption + ")" : ""));
                if (K.url) {
                    h.href = M
                } else {
                    h.href = g_staticUrl + "/uploads/screenshots/normal/" + K.id + ".jpg"
                }
                if (!K.user && typeof g_pageInfo == "object") {
                    K.user = g_pageInfo.username
                }
                var T = (K.date && K.user),
                    S = (G.length > 1);
                if (T) {
                    var P = new Date(K.date),
                        V = (g_serverTime - P) / 1000;
                    var U = B.firstChild.childNodes[1];
                    U.href = "/user=" + K.user;
                    U.innerHTML = K.user;
                    var X = B.firstChild.childNodes[3];
                    $WH.ee(X);
                    g_formatDate(X, V, P);
                    B.firstChild.style.display = ""
                } else {
                    B.firstChild.style.display = "none"
                }
                var X = B.childNodes[1];
                $WH.ee(X);
                if (K.user) {
                    if (T) {
                        $WH.ae(X, $WH.ct(" " + LANG.dash + " "))
                    }
                    var U = $WH.ce("a");
                    U.href = "javascript:;";
                    U.onclick = ContactTool.show.bind(ContactTool, {
                        mode: 3,
                        screenshot: K
                    });
                    U.className = "icon-report";
                    g_addTooltip(U, LANG.report_tooltip, "q2");
                    $WH.ae(U, $WH.ct(LANG.report));
                    $WH.ae(X, U)
                }
                X = B.childNodes[2];
                if (S) {
                    var W = "";
                    if (K.user) {
                        W = LANG.dash
                    }
                    W += (m + 1) + LANG.lvpage_of + G.length;
                    X.innerHTML = W;
                    X.style.display = ""
                } else {
                    X.style.display = "none"
                }
                B.style.display = (T || S ? "" : "none");
                if (Locale.getId() != LOCALE_ENUS && K.caption) {
                    K.caption = ""
                }
                var L = (K.caption != null && K.caption.length);
                var O = (K.subject != null && K.subject.length && K.type && K.typeId);
                if (L || O) {
                    var R = "";
                    if (O) {
                        R += LANG.types[K.type][0] + LANG.colon;
                        R += '<a href="' + wowheadUrl +  '/' + g_types[K.type] + "=" + K.typeId + '">';
                        R += K.subject;
                        R += "</a>"
                    }
                    if (L) {
                        if (O) {
                            R += LANG.dash
                        }
                        R += (K.noMarkup ? K.caption : Markup.toHtml(K.caption, {
                            mode: Markup.MODE_SIGNATURE
                        }))
                    }
                    l.innerHTML = R;
                    l.style.display = ""
                } else {
                    l.style.display = "none"
                }
                if (G.length > 1) {
                    C.href = d(v(-1));
                    D.href = d(v(1));
                    C.style.display = D.style.display = "";
                    z.style.display = "none"
                } else {
                    C.style.display = D.style.display = "none";
                    z.style.display = ""
                }
                location.replace(d(m))
            }
            Lightbox.reveal();
            if (l.offsetHeight > 18) {
                g(l.offsetHeight - 18)
            }
            b.style.visibility = "visible"
        }
        function v(K) {
            var L = m;
            L += K;
            if (L < 0) {
                L = G.length - 1
            } else {
                if (L >= G.length) {
                    L = 0
                }
            }
            return L
        }
        function a() {
            m = v(-1);
            j();
            return false
        }
        function t() {
            m = v(1);
            j();
            return false
        }
        function p(K) {
            K = $WH.$E(K);
            switch (K.keyCode) {
            case 37:
                a();
                break;
            case 39:
                t();
                break
            }
        }
        function f() {
            w(1)
        }
        function n() {
            I();
            if (G.length > 1) {
                $WH.dE(document, "keyup", p)
            }
            if (r && u == 0) {
                if (r.indexOf(":id=") != -1) {
                    r = "#screenshots"
                }
                location.replace(r)
            } else {
                location.replace("#.")
            }
        }
        function H(L, P, M) {
            if (typeof M.screenshots == "string") {
                G = g_screenshots[M.screenshots];
                u = 1;
                A = M.screenshots
            } else {
                G = M.screenshots;
                u = 0;
                A = null
            }
            b = L;
            m = 0;
            if (M.pos && M.pos >= 0 && M.pos < G.length) {
                m = M.pos
            }
            if (P) {
                L.className = "screenshotviewer";
                q = $WH.ce("div");
                q.className = "screenshotviewer-screen";
                C = $WH.ce("a");
                D = $WH.ce("a");
                C.className = "screenshotviewer-prev";
                D.className = "screenshotviewer-next";
                C.href = "javascript:;";
                D.href = "javascript:;";
                var R = $WH.ce("span");
                var K = $WH.ce("b");
                $WH.ae(K, $WH.ct(LANG.previous));
                $WH.ae(R, K);
                $WH.ae(C, R);
                var R = $WH.ce("span");
                var K = $WH.ce("b");
                $WH.ae(K, $WH.ct(LANG.next));
                $WH.ae(R, K);
                $WH.ae(D, R);
                C.onclick = a;
                D.onclick = t;
                z = $WH.ce("a");
                z.className = "screenshotviewer-cover";
                z.href = "javascript:;";
                z.onclick = Lightbox.hide;
                var R = $WH.ce("span");
                var K = $WH.ce("b");
                $WH.ae(K, $WH.ct(LANG.close));
                $WH.ae(R, K);
                $WH.ae(z, R);
                $WH.ae(q, C);
                $WH.ae(q, D);
                $WH.ae(q, z);
                k = $WH.ce("div");
                $WH.ae(q, k);
                $WH.ae(L, q);
                var Q = $WH.ce("a");
                Q.className = "dialog-x";
                Q.href = "javascript:;";
                Q.onclick = Lightbox.hide;
                $WH.ae(Q, $WH.ct(LANG.close));
                $WH.ae(L, Q);
                h = $WH.ce("a");
                h.className = "dialog-arrow";
                h.href = "javascript:;";
                h.target = "_blank";
                $WH.ae(h, $WH.ct(LANG.original));
                $WH.ae(L, h);
                B = $WH.ce("div");
                B.className = "screenshotviewer-from";
                var N = $WH.ce("span");
                $WH.ae(N, $WH.ct(LANG.lvscreenshot_from));
                $WH.ae(N, $WH.ce("a"));
                $WH.ae(N, $WH.ct(" "));
                $WH.ae(N, $WH.ce("span"));
                $WH.ae(B, N);
                $WH.ae(B, $WH.ce("span"));
                $WH.ae(B, $WH.ce("span"));
                $WH.ae(L, B);
                l = $WH.ce("div");
                l.className = "screenshotviewer-caption";
                $WH.ae(L, l);
                var O = $WH.ce("div");
                O.className = "clear";
                $WH.ae(L, O)
            }
            r = location.hash;
            if (G.length > 1) {
                $WH.aE(document, "keyup", p)
            }
            j()
        }
        function j() {
            var L = G[m];
            if (!L.width || !L.height) {
                if (o) {
                    o.onload = null;
                    o.onerror = null
                } else {
                    b.className = "";
                    F = [];
                    while (b.firstChild) {
                        F.push(b.firstChild);
                        $WH.de(b.firstChild)
                    }
                }
                var K = setTimeout(function () {
                    L.width = 126;
                    L.height = 22;
                    g(0);
                    L.width = null;
                    L.height = null;
                    var N = $WH.ce("div");
                    N.style.margin = "0 auto";
                    N.style.width = "126px";
                    var M = $WH.ce("img");
                    M.src = g_staticUrl + "/images/ui/misc/progress-anim.gif";
                    M.width = 126;
                    M.height = 22;
                    $WH.ae(N, M);
                    $WH.ae(b, N);
                    Lightbox.reveal();
                    b.style.visiblity = "visible"
                }, 150);
                o = new Image();
                o.onload = (function (M, N) {
                    clearTimeout(N);
                    M.width = this.width;
                    M.height = this.height;
                    o = null;
                    i();
                    w()
                }).bind(o, L, K);
                o.onerror = (function (M) {
                    clearTimeout(M);
                    o = null;
                    Lightbox.hide();
                    i()
                }).bind(o, K);
                o.src = (L.url ? L.url : g_staticUrl + "/uploads/screenshots/normal/" + L.id + ".jpg")
            } else {
                w()
            }
        }
        function I() {
            if (!o) {
                return
            }
            o.onload = null;
            o.onerror = null;
            o = null;
            i()
        }
        function i() {
            if (!F) {
                return
            }
            $WH.ee(b);
            b.className = "screenshotviewer";
            for (var K = 0; K < F.length; ++K) {
                $WH.ae(b, F[K])
            }
            F = null
        }
        this.checkPound = function () {
            if (location.hash && location.hash.indexOf("#screenshots") == 0) {
                if (!g_listviews.screenshots) {
                    var L = location.hash.split(":");
                    if (L.length == 3) {
                        var M = g_screenshots[L[1]],
                            K = parseInt(L[2]);
                        if (M && K >= 1 && K <= M.length) {
                            ScreenshotViewer.show({
                                screenshots: L[1],
                                pos: K - 1
                            })
                        }
                    }
                }
            }
        };
        this.show = function (K) {
            Lightbox.show("screenshotviewer", {
                onShow: H,
                onHide: n,
                onResize: f
            }, K)
        };
        $(document).ready(this.checkPound)
    };
var ShowOnMap = function (b, c) {
        var a = this;
        a.data = b;
        if (c == null) {
            c = myMapper
        }
        a.mapper = c;
        a._legend = null;
        a._legendLabel = null;
        a._legendContents = null;
        a._legendHorde = null;
        a._legendAlliance = null;
        a._menu = [];
        a.construct()
    };
ShowOnMap.prototype.onExpand = function () {
    this.expanded = true;
    location.replace(this.pound + ".map")
};
ShowOnMap.prototype.onCollapse = function () {
    this.expanded = false;
    var a = g_getHash();
    if (a.indexOf("#show") == 0 && a.indexOf(".map") > 0) {
        this.pound = a.substr(0, a.indexOf(".map"));
        location.replace(this.pound)
    }
};
ShowOnMap.prototype.construct = function () {
    if (!this.data) {
        return
    }
    var ad = $("#lenrlkn4");
    var b = function (i, d) {
            return $WH.strcmp(i[1], d[1])
        };
    var I = [];
    var Z = [];
    for (var Y in this.data) {
        if (this.data[Y].length === undefined) {
            var g = [];
            var h = [];
            var K = {};
            var A = this.data[Y];
            for (var R in A) {
                var a = false;
                for (var V = 0, w = A[R].length; V < w; ++V) {
                    if (A[R][V].paths) {
                        a = true;
                        break
                    }
                }
                var j = g_urlize(R);
                if (A[R][0].name_enus !== undefined) {
                    j = g_urlize(A[R][0].name_enus)
                }
                var N = {};
                var o = {};
                var G = [j];
                var f = ShowOnMap.combinePins(A[R], false, a);
                var M = f[0];
                var D = f[1];
                var af = 0;
                for (var V = 0; V < M.length; ++V) {
                    var H = M[V];
                    var r = ShowOnMap.buildTooltip(H.list);
                    var c = r[2];
                    var W = null;
                    if (c == "javascript:;") {
                        W = r[3]
                    }
                    if (H.list.length == 1) {
                        c = (g_types[H.list[0].type] && H.list[0].id ? wowheadUrl + "/" + g_types[H.list[0].type] + "=" + H.list[0].id : "")
                    }
                    if (Y == "rare" || Y == "herb" || Y == "vein") {
                        r[1] = g.length + 1
                    }
                    if (N[H.level] == undefined) {
                        N[H.level] = []
                    }
                    N[H.level].push([H.coord[0], H.coord[1],
                    {
                        url: c,
                        label: r[0],
                        menu: W,
                        type: r[1],
                        lines: H.list[0].paths
                    }]);
                    af++
                }
                if (af > 0) {
                    var c = (g_types[A[R][0].type] && A[R][0].id ? wowheadUrl + "/" + g_types[A[R][0].type] + "=" + A[R][0].id : "");
                    o[g.length + 1] = [R, c];
                    G.push(R + $WH.sprintf(LANG.qty, D));
                    G.push(this.showStuff.bind(this, N, [Y, j], o));
                    g.push(G);
                    for (var X in N) {
                        if (h[X]) {
                            h[X] = h[X].concat(N[X])
                        } else {
                            h[X] = N[X]
                        }
                    }
                    K[g.length] = [R, c]
                }
            }
            if (g.length > 0) {
                g.sort(b);
                var G = [Y, LANG.som[Y], this.showStuff.bind(this, h, [Y], K), g];
                this._menu.push(G)
            }
        } else {
            if (this.data[Y].length == 0) {
                continue
            }
            var a = false;
            for (var V = 0, w = this.data[Y].length; V < w; ++V) {
                if (this.data[Y][V].paths) {
                    a = true;
                    break
                }
            }
            var G = [Y];
            var N = {};
            var S = {},
                B = {};
            var k = {},
                q = {};
            var o = {};
            var t = {};
            var L = {};
            var f = ShowOnMap.combinePins(this.data[Y], false, a);
            var D = f[1];
            var af = 0,
                e = 0,
                E = 0,
                Q = 0,
                ac = 0;
            var u = function (l, ah) {
                    for (var p = 0; p < ah.length; ++p) {
                        var d = ah[p];
                        var ak = l;
                        d.list.key = Y;
                        var aj = ShowOnMap.buildTooltip(d.list, (l == "hordedailyquests" || l == "alliancedailyquests") ? true : false);
                        var i = aj[2];
                        var ag = null;
                        if (i == "javascript:;") {
                            ag = aj[3]
                        }
                        if (d.list.length == 1) {
                            i = (g_types[d.list[0].type] && d.list[0].id ? wowheadUrl + "/" + g_types[d.list[0].type] + "=" + d.list[0].id : "")
                        }
                        var ai = [d.coord[0], d.coord[1],
                        {
                            url: i,
                            label: aj[0],
                            menu: ag,
                            type: aj[1],
                            lines: d.list[0].paths
                        }];
                        if (N[d.level] == undefined) {
                            N[d.level] = [];
                            S[d.level] = [];
                            B[d.level] = [];
                            k[d.level] = [];
                            q[d.level] = []
                        }
                        if (ak != "rare" && ak != "spirithealer" && ak != "book" && ak != "forge" && ak != "anvil" && ak != "hordequests" && ak != "alliancequests" && ak != "hordedailyquests" && ak != "alliancedailyquests" && ak != "boss") {
                            if (aj[1] == 2 || aj[1] == 0) {
                                if (aj[1] == 2) {
                                    t[2] = [LANG.som_legend_horde, null]
                                } else {
                                    t[0] = [LANG.som_legend_neutral, null]
                                }
                                S[d.level].push(ai);
                                e++
                            }
                            if (aj[1] == 3 || aj[1] == 0) {
                                if (aj[1] == 3) {
                                    L[3] = [LANG.som_legend_alliance, null]
                                } else {
                                    L[0] = [LANG.som_legend_neutral, null]
                                }
                                k[d.level].push(ai);
                                Q++
                            }
                        } else {
                            if (ak == "hordequests") {
                                ak = "quest";
                                if (aj[1] == 2) {
                                    t[2] = [LANG.som_legend_horde, null]
                                } else {
                                    t[0] = [LANG.som_legend_neutral, null]
                                }
                                S[d.level].push(ai);
                                e++
                            } else {
                                if (ak == "hordedailyquests") {
                                    ak = "daily";
                                    if (aj[1] == 2) {
                                        t[2] = [LANG.som_legend_horde, null]
                                    } else {
                                        t[0] = [LANG.som_legend_neutral, null]
                                    }
                                    B[d.level].push(ai);
                                    E++
                                } else {
                                    if (ak == "alliancequests") {
                                        ak = "quest";
                                        if (aj[1] == 3) {
                                            L[3] = [LANG.som_legend_alliance, null]
                                        } else {
                                            L[0] = [LANG.som_legend_neutral, null]
                                        }
                                        k[d.level].push(ai);
                                        Q++
                                    } else {
                                        if (ak == "alliancedailyquests") {
                                            ak = "daily";
                                            if (aj[1] == 3) {
                                                L[3] = [LANG.som_legend_alliance, null]
                                            } else {
                                                L[0] = [LANG.som_legend_neutral, null]
                                            }
                                            q[d.level].push(ai);
                                            ac++
                                        } else {
                                            N[d.level].push(ai);
                                            af++
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return ak
                };
            var ab = u(Y, f[0]);
            if (Y == "alliancequests") {
                var z = ShowOnMap.combinePins(this.data[Y], true);
                if (z[1] > 0) {
                    u("alliancedailyquests", z[0])
                }
            } else {
                if (Y == "hordequests") {
                    var O = ShowOnMap.combinePins(this.data[Y], true);
                    if (O[1] > 0) {
                        u("hordedailyquests", O[0])
                    }
                }
            }
            if (ab == "rare") {
                D = this.data[ab].length
            } else {
                if (ab == "forge" || ab == "anvil") {
                    D = f[0].length
                }
            }
            if (af > 0) {
                var G = [ab, LANG.som[ab] + $WH.sprintf(LANG.qty, D), this.showStuff.bind(this, N, [ab], o)];
                this._menu.push(G)
            }
            if (e > 0) {
                var G = [ab, LANG.som[ab] + $WH.sprintf(LANG.qty, e), this.showStuff.bind(this, S, ["horde", ab], t), null];
                if (ab == "quest") {
                    G.push({
                        tinyIcon: "quest_start"
                    });
                    if (E > 0) {
                        Z.push(G);
                        G = ["daily", LANG.som.daily + $WH.sprintf(LANG.qty, E), this.showStuff.bind(this, B, ["horde", "daily"], t), null,
                        {
                            tinyIcon: "quest_start_daily"
                        }]
                    }
                }
                Z.push(G)
            }
            if (Q > 0) {
                var G = [ab, LANG.som[ab] + $WH.sprintf(LANG.qty, Q), this.showStuff.bind(this, k, ["alliance", ab], L), null];
                if (ab == "quest") {
                    G.push({
                        tinyIcon: "quest_start"
                    });
                    if (ac > 0) {
                        I.push(G);
                        G = ["daily", LANG.som.daily + $WH.sprintf(LANG.qty, ac), this.showStuff.bind(this, q, ["alliance", "daily"], L), null,
                        {
                            tinyIcon: "quest_start_daily"
                        }]
                    }
                }
                I.push(G)
            }
        }
    }
    I.sort(b);
    Z.sort(b);
    this._menu.sort(b);
    if (Z.length > 0) {
        this._menu.unshift(["horde", LANG.som.horde, "", Z,
        {
            tinyIcon: "side_horde"
        }])
    }
    if (I.length > 0) {
        this._menu.unshift(["alliance", LANG.som.alliance, "", I,
        {
            tinyIcon: "side_alliance"
        }])
    }
    var v = [-1, LANG.som_nothing, this.showStuff.bind(this, [], [-1], {})];
    v.checked = true;
    this._menu.push(v);
    var F = RedButton.create(LANG.showonmap, true);
    F.className += " mapper-som-button";
    Menu.add(F, this._menu, {
        showAtCursor: true
    });
    ad.append(F);
    var J;
    if (!this._legend) {
        this._legend = $("<div/>", {
            "class": "mapper-legend",
            css: {
                display: "none"
            }
        });
        var U = $("<div/>", {
            "class": "mapper-legend-container"
        });
        this._legendLabel = $("<b/>", {
            text: LANG.som_legend
        });
        U.append(this._legendLabel);
        this._legendContents = $("<div/>", {
            css: {
                "float": "right"
            }
        });
        U.append(this._legendContents);
        var J = $("<div/>", {
            css: {
                clear: "right"
            }
        });
        U.append(J);
        this._legend.append(U)
    }
    ad.append(this._legend);
    J = $("<div/>", {
        css: {
            clear: "left"
        }
    });
    ad.append(J);
    var C = [];
    var T = g_getHash();
    if (T.indexOf("#show:") != -1) {
        C = T.split(".")
    } else {
        if (this.data.instance) {
            C.push("#show:boss")
        }
    }
    if (C.length > 0) {
        if (C.length == 2 && C[1] == "map") {
            this.expanded = true;
            this.mapper.toggleZoom()
        }
        var P = C[0].split(":");
        if (P.length < 2) {
            return
        }
        var aa = this._menu;
        for (var V = 1; V < P.length; ++V) {
            var ae = P.length - 1;
            for (var R = 0; R < aa.length; ++R) {
                if (aa[R][0] == P[V]) {
                    if (aa[R][3] && V < ae) {
                        aa = aa[R][3]
                    } else {
                        aa = aa[R]
                    }
                    break
                }
            }
        }
        if (aa && aa[2] && jQuery.isFunction(aa[2])) {
            aa[2]()
        }
    }
};
ShowOnMap.prototype.setLegend = function (f) {
    this._legendContents.empty();
    var g = $("<div/>");
    var d = 0;
    for (var c in f) {
        var e = $("<span/>", {
            "class": ("mapper-pin mapper-pin-" + c + " mapper-legend-pin")
        });
        if (f[c][1]) {
            var b = $("<a/>", {
                href: f[c][1],
                text: f[c][0]
            });
            e.append(b)
        } else {
            e.text(f[c][0])
        }
        g.append(e);
        if ((++d) % 4 == 0) {
            g.append($("<br/>"))
        }
    }
    this._legendContents.append(g)
};
ShowOnMap.prototype.showStuff = function (a, c, b) {
    this.mapper.update({
        zone: g_pageInfo.id,
        coords: a,
        preservelevel: true
    });
    this.setLegend(b);
    this.checkMenu(c);
    if (c.length == 1 && c[0] == -1) {
        this.pound = "";
        location.replace("#.");
        return
    }
    this.pound = "#show:" + c.join(":");
    if (this.pound != "#show:boss") {
        location.replace(this.pound + (this.expanded ? ".map" : ""))
    }
};
ShowOnMap.prototype.clearChecks = function (b) {
    for (var a = 0; a < b.length; ++a) {
        b[a].checked = false;
        if (b[a][3] && b[a][3].length > 0) {
            this.clearChecks(b[a][3])
        }
    }
    this._legend.hide()
};
ShowOnMap.prototype.checkMenu = function (k) {
    this.clearChecks(this._menu);
    if (k[0] != -1) {
        this._legend.show()
    } else {
        this._legend.hide()
    }
    var a = this._menu;
    var g = [];
    for (var c = 0; c < k.length; ++c) {
        for (var b = 0; b < a.length; ++b) {
            if (a[b][0] == k[c]) {
                a[b].checked = true;
                g.push([a[b][0], a[b][1]]);
                a = a[b][3];
                break
            }
        }
    }
    var d = g.length - 1;
    var f = "";
    var e = {
        rare: true,
        herb: true,
        vein: true
    };
    for (var c = 0; c < g.length; ++c) {
        if (c > 0 && e[g[0][0]]) {
            var h = $("span", this._legendContents);
            h.removeClass("mapper-legend-pin");
            h.append($("<b/>", {
                text: " " + g[c][1].substr(g[c][1].lastIndexOf("("))
            }))
        } else {
            if (c == d) {
                f += "<span>"
            } else {
                f += '<span class="breadcrumb-arrow">'
            }
            f += g[c][1] + "</span>"
        }
    }
    this._legendLabel.html(f)
};
ShowOnMap.combinePins = function (r, k, e) {
    var d = {};
    var o = null,
        a = null;
    var j, h;
    var u = 0;
    var b = function (p, i) {
            var c = Math.floor(p[0]);
            var n = Math.floor(p[1]);
            if (!i) {
                if (c % 2 == 1) {
                    c += 1
                }
                if (n % 2 == 1) {
                    n += 1
                }
            }
            if (d[c] === undefined) {
                d[c] = {}
            }
            if (d[c][n] === undefined) {
                d[c][n] = []
            }
            return [c, n]
        };
    for (var l = 0; l < r.length; ++l) {
        var f = r[l];
        if (k) {
            if (!f.quests) {
                continue
            }
            var q = true;
            for (var m = 0; m < f.quests.length; ++m) {
                if (f.quests[m].daily) {
                    q = false;
                    break
                }
            }
            if (q) {
                continue
            }
        } else {
            if (e) {
                o = b([f.id, 0], true);
                j = o[0];
                h = o[1];
                var g = $WH.dO(f);
                g.coord = f.coords[0];
                d[j][h].push(g);
                u++;
                continue
            }
        }
        if (f.point == "start" || f.point == "end") {
            o = b(f.coord);
            j = o[0];
            h = o[1];
            if (d[j][h].length > 3) {
                var v = d[j][h];
                d[j][h] = [];
                for (var t = 0; t < v.length; ++t) {
                    a = b(v[t].coord, true);
                    d[a[0]][a[1]].push(v[t])
                }
            }
            d[j][h].push(f);
            u++
        } else {
            for (var w = 0; w < f.coords.length; ++w) {
                o = b(f.coords[w]);
                j = o[0];
                h = o[1];
                var g = $WH.dO(f);
                g.coord = f.coords[w];
                if (d[j][h].length > 3) {
                    var v = d[j][h];
                    d[j][h] = [];
                    for (var t = 0; t < v.length; ++t) {
                        a = b(v[t].coord, true);
                        d[a[0]][a[1]].push(v[t])
                    }
                }
                d[j][h].push(g);
                u++
            }
        }
    }
    var z = [];
    for (j in d) {
        for (h in d[j]) {
            z.push({
                coord: [d[j][h][0].coord[0], d[j][h][0].coord[1]],
                level: d[j][h][0].level,
                list: d[j][h]
            })
        }
    }
    return [z, u]
};
ShowOnMap.buildTooltip = function (u, j) {
    var p = "";
    var d = "";
    var b = [];
    var k = -1;
    var f = {};
    var e = 0;
    var a = {};
    var v = 1;
    for (var m = 0; m < u.length; ++m) {
        var g = u[m];
        d = (g_types[g.type] && g.id ? wowheadUrl + "/" + g_types[g.type] + "=" + g.id : "");
        var z = d + g.item;
        var h = d + g.point;
        if (!f[z]) {
            f[z] = {
                url: d,
                obj: g,
                coords: [g.coord],
                all: [g]
            };
            e++
        } else {
            if (!a[h]) {
                f[z].all.push(g)
            }
            f[z].coords.push(g.coord)
        }
        a[h] = 1
    }
    var m = 0;
    for (var z in f) {
        var d = f[z].url;
        var c = f[z].all;
        var g = f[z].obj;
        var t = f[z].coords;
        if (m > 0) {
            p += "<br />"
        }
        b.push([m++, g.name, d]);
        v = g.type;
        if (!g.point) {
            if ((g.reacthorde == 1 && g.reactalliance < 1) || g.side == 2) {
                if (k == 2 || k == -1) {
                    k = 2
                } else {
                    k = 0
                }
            } else {
                if ((g.reactalliance == 1 && g.reacthorde < 1) || g.side == 1) {
                    if (k == 3 || k == -1) {
                        k = 3
                    } else {
                        k = 0
                    }
                } else {
                    k = 0
                }
            }
        }
        p += '<b class="q' + (k == 2 ? " icon-horde" : "") + (k == 3 ? " icon-alliance" : "") + '">' + g.name + "</b>";
        if (t.length > 0) {
            p += " (" + t[0][0] + ", " + t[0][1] + ")<br />"
        }
        if (g.quests) {
            if (g.quests.length > 1) {
                p += LANG.som_startsquestpl
            } else {
                p += LANG.som_startsquest
            }
            p += '<div class="indent">';
            for (var i = 0; i < g.quests.length; ++i) {
                var r = g.quests[i];
                if (j && !r.daily) {
                    continue
                }
                p += '<span class="q0">[' + r.level + "]</span> " + r.name + ((r.series && !r.first) ? '<sup style="font-size: 8px">(*)</sup>' : "") + ((r.category < 0 && g_quest_sorts[r.category]) ? ' <i class="q0">' + g_quest_sorts[r.category] + "</i>" : "") + "<br />"
            }
            p += "</div>"
        } else {
            if (g.description) {
                p += g.description + "<br />"
            } else {
                if (g.point) {
                    for (var m = 0; m < c.length; ++m) {
                        var l = c[m];
                        switch (l.point) {
                        case "start":
                            p += LANG.mapper_startsquest + "<br />";
                            if (k == "end") {
                                k = "startend"
                            } else {
                                if (k != "startend") {
                                    k = "start"
                                }
                            }
                            break;
                        case "end":
                            p += LANG.mapper_endsquest + "<br />";
                            if (k == "start") {
                                k = "startend"
                            } else {
                                if (k != "startend") {
                                    k = "end"
                                }
                            }
                            break;
                        case "sourcestart":
                            p += LANG.mapper_sourcestart + "<br />";
                            p += '<div class="indent">' + l.item + "</div>";
                            if (k == "end") {
                                k = "startend"
                            } else {
                                if (k != "startend") {
                                    k = "start"
                                }
                            }
                            break;
                        case "sourceend":
                            p += LANG.mapper_sourceend + "<br />";
                            p += '<div class="indent">' + l.item + "</div>";
                            if (k == "start") {
                                k = "startend"
                            } else {
                                if (k != "startend") {
                                    k = "end"
                                }
                            }
                            break;
                        case "requirement":
                            p += LANG.mapper_requiredquest + "<br />";
                            if (k == -1) {
                                k = l.objective
                            }
                            break;
                        case "sourcerequirement":
                            p += LANG.mapper_sourcereq + "<br />";
                            p += '<div class="indent">' + l.item + "</div>";
                            if (k == -1) {
                                k = l.objective
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    p += '<div class="q2">';
    if (u.length == 1) {
        p += (u[0].type == 1 ? LANG.som_viewnpc : (u[0].type == 2 ? LANG.som_viewobj : ""))
    } else {
        if (e == 1) {
            p += (v == 1 ? LANG.som_viewnpc : (v == 2 ? LANG.som_viewobj : ""))
        } else {
            p += "<br />" + LANG.som_view
        }
    }
    p += "</div>";
    var w = [];
    w.push(p);
    w.push(k);
    if (u.length == 1 || e == 1) {
        w.push(d);
        w.push(null)
    } else {
        w.push("javascript:;");
        w.push(b)
    }
    return w
};
var Slider = new function () {
        var a, f;

        function g(j) {
            j = $WH.$E(j);
            f = this;
            a = $WH.g_getCursorPos(j);
            $WH.aE(document, "mousemove", b);
            $WH.aE(document, "mouseup", c);
            return false
        }
        function b(j) {
            j = $WH.$E(j);
            if (!a || !f) {
                return
            }
            var k = $WH.g_getCursorPos(j),
                m = k[f._dir] - a[f._dir],
                l = h(f, f._pos + m);
            if (!l) {
                a = k
            }
            if (f.onMove) {
                f.onMove(j, f, e(f))
            }
        }
        function c(j) {
            j = $WH.$E(j);
            f = null;
            a = null;
            $WH.dE(document, "mousemove", b);
            $WH.dE(document, "mouseup", c);
            return false
        }
        function i(l, k) {
            k = $WH.$E(k);
            f = l;
            a = $WH.g_getCursorPos(k);
            var m = $WH.ac(f.parentNode),
                j = Math.floor((f._dir == "y" ? f.offsetHeight : f.offsetWidth) / 2);
            h(l, a[f._dir] - m[f._dir] - j);
            if (l.onMove) {
                l.onMove(k, l, e(l))
            }
            $WH.aE(document, "mousemove", b);
            $WH.aE(document, "mouseup", c);
            return false
        }
        function h(j, k) {
            var l = false;
            if (k < 0) {
                k = 0;
                l = true
            } else {
                if (k > d(j)) {
                    k = d(j);
                    l = true
                }
            }
            j.style[(j._dir == "y" ? "top" : "left")] = k + "px";
            j._pos = k;
            return l
        }
        function d(j) {
            if (j._dir == "y") {
                return j.parentNode.offsetHeight - j.offsetHeight + 2
            }
            return j.parentNode.offsetWidth - j.offsetWidth + 2
        }
        function e(m) {
            var j = m._pos / d(m),
                l = Math.round((j * (m._max - m._min)) + m._min),
                k = [j, l];
            k.percent = j;
            k.value = l;
            return k
        }
        this.setPercent = function (k, j) {
            h(k, parseInt(j * d(k)))
        };
        this.setValue = function (k, j) {
            if (j < k._min) {
                j = k._min
            } else {
                if (j > k._max) {
                    j = k._max
                }
            }
            this.setPercent(k, (j - k._min) / (k._max - k._min))
        };
        this.setSize = function (m, j) {
            var l = e(m),
                k = d(m);
            m.parentNode.style[(m._dir == "y" ? "height" : "width")] = j + "px";
            if (k != d(m)) {
                this.setValue(m, l.value)
            }
        };
        this.init = function (l, k) {
            var m = $WH.ce("a");
            m.href = "javascript:;";
            m.onmousedown = g;
            m.className = "handle";
            var j = $WH.ce("a");
            j.href = "javascript:;";
            j.onmousedown = i.bind(0, m);
            j.className = "track";
            $WH.ae(l, $WH.ce("span"));
            $WH.ae(l, j);
            $WH.ae(l, m);
            m._dir = "x";
            m._min = 1;
            m._max = 100;
            m._pos = 0;
            if (k != null) {
                if (k.direction == "y") {
                    m._dir = "y"
                }
                if (k.minValue) {
                    m._min = k.minValue
                }
                if (k.maxValue) {
                    m._max = k.maxValue
                }
                if (k.onMove) {
                    m.onMove = k.onMove
                }
            }
            l.className = "slider-" + m._dir;
            return m
        }
    };
var suDialog;

function su_addToSaved(c, d, a, e) {
    if (!c) {
        return
    }
    if (!suDialog) {
        suDialog = new Dialog()
    }
    var b = function (h) {
            var g = g_getWowheadCookie("compare_groups"),
                f = wowheadUrl + "/compare";
            if (h.action > 1) {
                if (g) {
                    c = g + ";" + c
                }
                g_setWowheadCookie("compare_groups", c, true);
                if (e) {
                    g_setWowheadCookie("compare_level", e, true)
                }
            } else {
                f += "?items=" + c + (e ? "&l=" + e : "")
            }
            if (h.action < 3) {
                if (a) {
                    window.open(f)
                } else {
                    location.href = f
                }
            }
        };
    suDialog.show("docompare", {
        data: {
            selecteditems: d,
            action: 1
        },
        onSubmit: b
    })
}
Dialog.templates.docompare = {
    title: LANG.dialog_compare,
    width: 400,
    buttons: [
        ["check", LANG.ok],
        ["x", LANG.cancel]
    ],
    fields: [{
        id: "selecteditems",
        type: "caption",
        compute: function (c, b, a, d) {
            d.innerHTML = $WH.sprintf((b == 1 ? LANG.dialog_selecteditem : LANG.dialog_selecteditems), b)
        }
    }, {
        id: "action",
        type: "radio",
        label: "",
        value: 3,
        submitOnDblClick: 1,
        options: {
            1: LANG.dialog_nosaveandview,
            2: LANG.dialog_saveandview,
            3: LANG.dialog_saveforlater
        }
    }]
};
var swfobject = function () {
        var aq = "undefined",
            aD = "object",
            ab = "Shockwave Flash",
            X = "ShockwaveFlash.ShockwaveFlash",
            aE = "application/x-shockwave-flash",
            ac = "SWFObjectExprInst",
            ax = "onreadystatechange",
            af = window,
            aL = document,
            aB = navigator,
            aa = false,
            Z = [aN],
            aG = [],
            ag = [],
            al = [],
            aJ, ad, ap, at, ak = false,
            aU = false,
            aH, an, aI = true,
            ah = function () {
                var a = typeof aL.getElementById != aq && typeof aL.getElementsByTagName != aq && typeof aL.createElement != aq,
                    e = aB.userAgent.toLowerCase(),
                    c = aB.platform.toLowerCase(),
                    h = c ? /win/.test(c) : /win/.test(e),
                    j = c ? /mac/.test(c) : /mac/.test(e),
                    g = /webkit/.test(e) ? parseFloat(e.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                    d = !+"\v1",
                    f = [0, 0, 0],
                    k = null;
                if (typeof aB.plugins != aq && typeof aB.plugins[ab] == aD) {
                    k = aB.plugins[ab].description;
                    if (k && !(typeof aB.mimeTypes != aq && aB.mimeTypes[aE] && !aB.mimeTypes[aE].enabledPlugin)) {
                        aa = true;
                        d = false;
                        k = k.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                        f[0] = parseInt(k.replace(/^(.*)\..*$/, "$1"), 10);
                        f[1] = parseInt(k.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                        f[2] = /[a-zA-Z]/.test(k) ? parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
                    }
                } else {
                    if (typeof af.ActiveXObject != aq) {
                        try {
                            var i = new ActiveXObject(X);
                            if (i) {
                                k = i.GetVariable("$version");
                                if (k) {
                                    d = true;
                                    k = k.split(" ")[1].split(",");
                                    f = [parseInt(k[0], 10), parseInt(k[1], 10), parseInt(k[2], 10)]
                                }
                            }
                        } catch (b) {}
                    }
                }
                return {
                    w3: a,
                    pv: f,
                    wk: g,
                    ie: d,
                    win: h,
                    mac: j
                }
            }(),
            aK = function () {
                if (!ah.w3) {
                    return
                }
                if ((typeof aL.readyState != aq && aL.readyState == "complete") || (typeof aL.readyState == aq && (aL.getElementsByTagName("body")[0] || aL.body))) {
                    aP()
                }
                if (!ak) {
                    if (typeof aL.addEventListener != aq) {
                        aL.addEventListener("DOMContentLoaded", aP, false)
                    }
                    if (ah.ie && ah.win) {
                        aL.attachEvent(ax, function () {
                            if (aL.readyState == "complete") {
                                aL.detachEvent(ax, arguments.callee);
                                aP()
                            }
                        });
                        if (af == top) {
                            (function () {
                                if (ak) {
                                    return
                                }
                                try {
                                    aL.documentElement.doScroll("left")
                                } catch (a) {
                                    setTimeout(arguments.callee, 0);
                                    return
                                }
                                aP()
                            })()
                        }
                    }
                    if (ah.wk) {
                        (function () {
                            if (ak) {
                                return
                            }
                            if (!/loaded|complete/.test(aL.readyState)) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            aP()
                        })()
                    }
                    aC(aP)
                }
            }();

        function aP() {
            if (ak) {
                return
            }
            try {
                var b = aL.getElementsByTagName("body")[0].appendChild(ar("span"));
                b.parentNode.removeChild(b)
            } catch (a) {
                return
            }
            ak = true;
            var d = Z.length;
            for (var c = 0; c < d; c++) {
                Z[c]()
            }
        }
        function aj(a) {
            if (ak) {
                a()
            } else {
                Z[Z.length] = a
            }
        }
        function aC(a) {
            if (typeof af.addEventListener != aq) {
                af.addEventListener("load", a, false)
            } else {
                if (typeof aL.addEventListener != aq) {
                    aL.addEventListener("load", a, false)
                } else {
                    if (typeof af.attachEvent != aq) {
                        aM(af, "onload", a)
                    } else {
                        if (typeof af.onload == "function") {
                            var b = af.onload;
                            af.onload = function () {
                                b();
                                a()
                            }
                        } else {
                            af.onload = a
                        }
                    }
                }
            }
        }
        function aN() {
            if (aa) {
                Y()
            } else {
                am()
            }
        }
        function Y() {
            var d = aL.getElementsByTagName("body")[0];
            var b = ar(aD);
            b.setAttribute("type", aE);
            var a = d.appendChild(b);
            if (a) {
                var c = 0;
                (function () {
                    if (typeof a.GetVariable != aq) {
                        var e = a.GetVariable("$version");
                        if (e) {
                            e = e.split(" ")[1].split(",");
                            ah.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)]
                        }
                    } else {
                        if (c < 10) {
                            c++;
                            setTimeout(arguments.callee, 10);
                            return
                        }
                    }
                    d.removeChild(b);
                    a = null;
                    am()
                })()
            } else {
                am()
            }
        }
        function am() {
            var g = aG.length;
            if (g > 0) {
                for (var h = 0; h < g; h++) {
                    var c = aG[h].id;
                    var l = aG[h].callbackFn;
                    var a = {
                        success: false,
                        id: c
                    };
                    if (ah.pv[0] > 0) {
                        var i = aS(c);
                        if (i) {
                            if (ao(aG[h].swfVersion) && !(ah.wk && ah.wk < 312)) {
                                ay(c, true);
                                if (l) {
                                    a.success = true;
                                    a.ref = av(c);
                                    l(a)
                                }
                            } else {
                                if (aG[h].expressInstall && au()) {
                                    var e = {};
                                    e.data = aG[h].expressInstall;
                                    e.width = i.getAttribute("width") || "0";
                                    e.height = i.getAttribute("height") || "0";
                                    if (i.getAttribute("class")) {
                                        e.styleclass = i.getAttribute("class")
                                    }
                                    if (i.getAttribute("align")) {
                                        e.align = i.getAttribute("align")
                                    }
                                    var f = {};
                                    var d = i.getElementsByTagName("param");
                                    var k = d.length;
                                    for (var j = 0; j < k; j++) {
                                        if (d[j].getAttribute("name").toLowerCase() != "movie") {
                                            f[d[j].getAttribute("name")] = d[j].getAttribute("value")
                                        }
                                    }
                                    ae(e, f, c, l)
                                } else {
                                    aF(i);
                                    if (l) {
                                        l(a)
                                    }
                                }
                            }
                        }
                    } else {
                        ay(c, true);
                        if (l) {
                            var b = av(c);
                            if (b && typeof b.SetVariable != aq) {
                                a.success = true;
                                a.ref = b
                            }
                            l(a)
                        }
                    }
                }
            }
        }
        function av(b) {
            var d = null;
            var c = aS(b);
            if (c && c.nodeName == "OBJECT") {
                if (typeof c.SetVariable != aq) {
                    d = c
                } else {
                    var a = c.getElementsByTagName(aD)[0];
                    if (a) {
                        d = a
                    }
                }
            }
            return d
        }
        function au() {
            return !aU && ao("6.0.65") && (ah.win || ah.mac) && !(ah.wk && ah.wk < 312)
        }
        function ae(f, d, h, e) {
            aU = true;
            ap = e || null;
            at = {
                success: false,
                id: h
            };
            var a = aS(h);
            if (a) {
                if (a.nodeName == "OBJECT") {
                    aJ = aO(a);
                    ad = null
                } else {
                    aJ = a;
                    ad = h
                }
                f.id = ac;
                if (typeof f.width == aq || (!/%$/.test(f.width) && parseInt(f.width, 10) < 310)) {
                    f.width = "310"
                }
                if (typeof f.height == aq || (!/%$/.test(f.height) && parseInt(f.height, 10) < 137)) {
                    f.height = "137"
                }
                aL.title = aL.title.slice(0, 47) + " - Flash Player Installation";
                var b = ah.ie && ah.win ? "ActiveX" : "PlugIn",
                    c = "MMredirectURL=" + af.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + b + "&MMdoctitle=" + aL.title;
                if (typeof d.flashvars != aq) {
                    d.flashvars += "&" + c
                } else {
                    d.flashvars = c
                }
                if (ah.ie && ah.win && a.readyState != 4) {
                    var g = ar("div");
                    h += "SWFObjectNew";
                    g.setAttribute("id", h);
                    a.parentNode.insertBefore(g, a);
                    a.style.display = "none";
                    (function () {
                        if (a.readyState == 4) {
                            a.parentNode.removeChild(a)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                }
                aA(f, d, h)
            }
        }
        function aF(a) {
            if (ah.ie && ah.win && a.readyState != 4) {
                var b = ar("div");
                a.parentNode.insertBefore(b, a);
                b.parentNode.replaceChild(aO(a), b);
                a.style.display = "none";
                (function () {
                    if (a.readyState == 4) {
                        a.parentNode.removeChild(a)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                a.parentNode.replaceChild(aO(a), a)
            }
        }
        function aO(b) {
            var d = ar("div");
            if (ah.win && ah.ie) {
                d.innerHTML = b.innerHTML
            } else {
                var e = b.getElementsByTagName(aD)[0];
                if (e) {
                    var a = e.childNodes;
                    if (a) {
                        var f = a.length;
                        for (var c = 0; c < f; c++) {
                            if (!(a[c].nodeType == 1 && a[c].nodeName == "PARAM") && !(a[c].nodeType == 8)) {
                                d.appendChild(a[c].cloneNode(true))
                            }
                        }
                    }
                }
            }
            return d
        }
        function aA(e, g, c) {
            var d, a = aS(c);
            if (ah.wk && ah.wk < 312) {
                return d
            }
            if (a) {
                if (typeof e.id == aq) {
                    e.id = c
                }
                if (ah.ie && ah.win) {
                    var f = "";
                    for (var i in e) {
                        if (e[i] != Object.prototype[i]) {
                            if (i.toLowerCase() == "data") {
                                g.movie = e[i]
                            } else {
                                if (i.toLowerCase() == "styleclass") {
                                    f += ' class="' + e[i] + '"'
                                } else {
                                    if (i.toLowerCase() != "classid") {
                                        f += " " + i + '="' + e[i] + '"'
                                    }
                                }
                            }
                        }
                    }
                    var h = "";
                    for (var j in g) {
                        if (g[j] != Object.prototype[j]) {
                            h += '<param name="' + j + '" value="' + g[j] + '" />'
                        }
                    }
                    a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
                    ag[ag.length] = e.id;
                    d = aS(e.id)
                } else {
                    var b = ar(aD);
                    b.setAttribute("type", aE);
                    for (var k in e) {
                        if (e[k] != Object.prototype[k]) {
                            if (k.toLowerCase() == "styleclass") {
                                b.setAttribute("class", e[k])
                            } else {
                                if (k.toLowerCase() != "classid") {
                                    b.setAttribute(k, e[k])
                                }
                            }
                        }
                    }
                    for (var l in g) {
                        if (g[l] != Object.prototype[l] && l.toLowerCase() != "movie") {
                            aQ(b, l, g[l])
                        }
                    }
                    a.parentNode.replaceChild(b, a);
                    d = b
                }
            }
            return d
        }
        function aQ(b, d, c) {
            var a = ar("param");
            a.setAttribute("name", d);
            a.setAttribute("value", c);
            b.appendChild(a)
        }
        function aw(a) {
            var b = aS(a);
            if (b && b.nodeName == "OBJECT") {
                if (ah.ie && ah.win) {
                    b.style.display = "none";
                    (function () {
                        if (b.readyState == 4) {
                            aT(a)
                        } else {
                            setTimeout(arguments.callee, 10)
                        }
                    })()
                } else {
                    b.parentNode.removeChild(b)
                }
            }
        }
        function aT(a) {
            var b = aS(a);
            if (b) {
                for (var c in b) {
                    if (typeof b[c] == "function") {
                        b[c] = null
                    }
                }
                b.parentNode.removeChild(b)
            }
        }
        function aS(a) {
            var c = null;
            try {
                c = aL.getElementById(a)
            } catch (b) {}
            return c
        }
        function ar(a) {
            return aL.createElement(a)
        }
        function aM(a, c, b) {
            a.attachEvent(c, b);
            al[al.length] = [a, c, b]
        }
        function ao(a) {
            var b = ah.pv,
                c = a.split(".");
            c[0] = parseInt(c[0], 10);
            c[1] = parseInt(c[1], 10) || 0;
            c[2] = parseInt(c[2], 10) || 0;
            return (b[0] > c[0] || (b[0] == c[0] && b[1] > c[1]) || (b[0] == c[0] && b[1] == c[1] && b[2] >= c[2])) ? true : false
        }
        function az(b, f, a, c) {
            if (ah.ie && ah.mac) {
                return
            }
            var e = aL.getElementsByTagName("head")[0];
            if (!e) {
                return
            }
            var g = (a && typeof a == "string") ? a : "screen";
            if (c) {
                aH = null;
                an = null
            }
            if (!aH || an != g) {
                var d = ar("style");
                d.setAttribute("type", "text/css");
                d.setAttribute("media", g);
                aH = e.appendChild(d);
                if (ah.ie && ah.win && typeof aL.styleSheets != aq && aL.styleSheets.length > 0) {
                    aH = aL.styleSheets[aL.styleSheets.length - 1]
                }
                an = g
            }
            if (ah.ie && ah.win) {
                if (aH && typeof aH.addRule == aD) {
                    aH.addRule(b, f)
                }
            } else {
                if (aH && typeof aL.createTextNode != aq) {
                    aH.appendChild(aL.createTextNode(b + " {" + f + "}"))
                }
            }
        }
        function ay(a, c) {
            if (!aI) {
                return
            }
            var b = c ? "visible" : "hidden";
            if (ak && aS(a)) {
                aS(a).style.visibility = b
            } else {
                az("#" + a, "visibility:" + b)
            }
        }
        function ai(b) {
            var a = /[\\\"<>\.;]/;
            var c = a.exec(b) != null;
            return c && typeof encodeURIComponent != aq ? encodeURIComponent(b) : b
        }
        var aR = function () {
                if (ah.ie && ah.win) {
                    window.attachEvent("onunload", function () {
                        var a = al.length;
                        for (var b = 0; b < a; b++) {
                            al[b][0].detachEvent(al[b][1], al[b][2])
                        }
                        var d = ag.length;
                        for (var c = 0; c < d; c++) {
                            aw(ag[c])
                        }
                        for (var e in ah) {
                            ah[e] = null
                        }
                        ah = null;
                        for (var f in swfobject) {
                            swfobject[f] = null
                        }
                        swfobject = null
                    })
                }
            }();
        return {
            registerObject: function (a, e, c, b) {
                if (ah.w3 && a && e) {
                    var d = {};
                    d.id = a;
                    d.swfVersion = e;
                    d.expressInstall = c;
                    d.callbackFn = b;
                    aG[aG.length] = d;
                    ay(a, false)
                } else {
                    if (b) {
                        b({
                            success: false,
                            id: a
                        })
                    }
                }
            },
            getObjectById: function (a) {
                if (ah.w3) {
                    return av(a)
                }
            },
            embedSWF: function (k, e, h, f, c, a, b, i, g, j) {
                var d = {
                    success: false,
                    id: e
                };
                if (ah.w3 && !(ah.wk && ah.wk < 312) && k && e && h && f && c) {
                    ay(e, false);
                    aj(function () {
                        h += "";
                        f += "";
                        var q = {};
                        if (g && typeof g === aD) {
                            for (var o in g) {
                                q[o] = g[o]
                            }
                        }
                        q.data = k;
                        q.width = h;
                        q.height = f;
                        var n = {};
                        if (i && typeof i === aD) {
                            for (var p in i) {
                                n[p] = i[p]
                            }
                        }
                        if (b && typeof b === aD) {
                            for (var l in b) {
                                if (typeof n.flashvars != aq) {
                                    n.flashvars += "&" + l + "=" + b[l]
                                } else {
                                    n.flashvars = l + "=" + b[l]
                                }
                            }
                        }
                        if (ao(c)) {
                            var m = aA(q, n, e);
                            if (q.id == e) {
                                ay(e, true)
                            }
                            d.success = true;
                            d.ref = m
                        } else {
                            if (a && au()) {
                                q.data = a;
                                ae(q, n, e, j);
                                return
                            } else {
                                ay(e, true)
                            }
                        }
                        if (j) {
                            j(d)
                        }
                    })
                } else {
                    if (j) {
                        j(d)
                    }
                }
            },
            switchOffAutoHideShow: function () {
                aI = false
            },
            ua: ah,
            getFlashPlayerVersion: function () {
                return {
                    major: ah.pv[0],
                    minor: ah.pv[1],
                    release: ah.pv[2]
                }
            },
            hasFlashPlayerVersion: ao,
            createSWF: function (a, b, c) {
                if (ah.w3) {
                    return aA(a, b, c)
                } else {
                    return undefined
                }
            },
            showExpressInstall: function (b, a, d, c) {
                if (ah.w3 && au()) {
                    ae(b, a, d, c)
                }
            },
            removeSWF: function (a) {
                if (ah.w3) {
                    aw(a)
                }
            },
            createCSS: function (b, a, c, d) {
                if (ah.w3) {
                    az(b, a, c, d)
                }
            },
            addDomLoadEvent: aj,
            addLoadEvent: aC,
            getQueryParamValue: function (b) {
                var a = aL.location.search || aL.location.hash;
                if (a) {
                    if (/\?/.test(a)) {
                        a = a.split("?")[1]
                    }
                    if (b == null) {
                        return ai(a)
                    }
                    var c = a.split("&");
                    for (var d = 0; d < c.length; d++) {
                        if (c[d].substring(0, c[d].indexOf("=")) == b) {
                            return ai(c[d].substring((c[d].indexOf("=") + 1)))
                        }
                    }
                }
                return ""
            },
            expressInstallCallback: function () {
                if (aU) {
                    var a = aS(ac);
                    if (a && aJ) {
                        a.parentNode.replaceChild(aJ, a);
                        if (ad) {
                            ay(ad, true);
                            if (ah.ie && ah.win) {
                                aJ.style.display = "block"
                            }
                        }
                        if (ap) {
                            ap(at)
                        }
                    }
                    aU = false
                }
            }
        }
    }();

function Tabs(a) {
    $WH.cO(this, a);
    if (this.parent) {
        this.parent = $WH.ge(this.parent)
    } else {
        return
    }
    this.selectedTab = -1;
    this.uls = [];
    this.tabs = [];
    this.nShows = 0;
    if (this.poundable == null) {
        this.poundable = 1
    }
    this.poundedTab = null;
    if (this.onLoad == null) {
        this.onLoad = Tabs.onLoad.bind(this)
    }
    if (this.onShow == null) {
        this.onShow = Tabs.onShow.bind(this)
    }
    if (this.onHide) {
        this.onHide = this.onHide.bind(this)
    }
    this.trackClick = Tabs.trackClick.bind(this)
}
Tabs.prototype = {
    add: function (a, d) {
        var c, b = this.tabs.length;
        c = {
            caption: a,
            index: b,
            owner: this
        };
        $WH.cO(c, d);
        this.tabs.push(c);
        return b
    },
    hide: function (c, e) {
        if (this.tabs[c]) {
            var b = this.selectedTab;
            if (c == 0 && b == -1) {
                this.poundedTab = this.selectedTab = b = 0
            }
            if (c != this.poundedTab) {
                this.selectedTab = -1
            }
            this.tabs[c].hidden = !e;
            this.flush();
            if (!e && c == b) {
                this.selectedTab = b;
                for (var d = 0, a = this.tabs.length; d < a; ++d) {
                    if (d != c && !this.tabs[d].hidden) {
                        return this.show(d, 1)
                    }
                }
            }
        }
    },
    unlock: function (b, d) {
        if (this.tabs[b]) {
            this.tabs[b].locked = d;
            for (var c = 0; c <= 3; ++c) {
                a = $WH.gE(this.uls[c], "a");
                $(".icon-lock", a[b]).remove();
                if (d) {
                    $("div, b", a[b]).prepend('<span class="icon-lock" />')
                }
            }
            var a = location.hash.substr(1).split(":")[0];
            if (this.tabs[b].id == a) {
                this.show(b, 1)
            }
        }
    },
    focus: function (a) {
        if (a < 0) {
            a = this.tabs.length + a
        }
        this.forceScroll = 1;
        $WH.gE(this.uls[2], "a")[a].onclick({}, true);
        this.forceScroll = null
    },
    show: function (b, d) {
        var a;
        if (isNaN(b) || b < 0) {
            b = 0
        } else {
            if (b >= this.tabs.length) {
                b = this.tabs.length - 1
            }
        }
        if ((d == null && b == this.selectedTab) || this.tabs[b].hidden) {
            return
        }
        if (this.tabs[b].locked) {
            return this.onShow(this.tabs[b], this.tabs[this.selectedTab])
        }
        if (this.selectedTab != -1) {
            a = this.tabs[this.selectedTab];
            if (this.onHide && !this.onHide(a)) {
                return
            }
            if (a.onHide && !a.onHide()) {
                return
            }
        }++this.nShows;
        for (var c = 0; c <= 3; ++c) {
            a = $WH.gE(this.uls[c], "a");
            if (this.selectedTab != -1) {
                a[this.selectedTab].className = ""
            }
            a[b].className = "selected"
        }
        a = this.tabs[b];
        if (a.onLoad) {
            a.onLoad();
            a.onLoad = null
        }
        this.onShow(this.tabs[b], this.tabs[this.selectedTab]);
        if (a.onShow) {
            a.onShow(this.tabs[this.selectedTab])
        }
        this.selectedTab = b
    },
    flush: function (o) {
        var t, f, r, q, p, c;
        var n = ($WH.isset("g_thottbot") && g_thottbot);
        var m = $WH.ce("div");
        m.className = "tabs-container";
        p = $WH.ce("div");
        if (n) {
            p.style.display = "none"
        } else {
            p.style.visibility = "hidden"
        }
        var k = (n ? "div" : "ul");
        this.uls[0] = $WH.ce(k);
        this.uls[0].className = "tabs";
        $WH.ae(p, this.uls[0]);
        $WH.ae(m, p);
        p = $WH.ce("div");
        p.className = "tabs-levels";
        for (var h = 1; h <= 3; ++h) {
            c = $WH.ce("div");
            c.className = "tabs-level";
            this.uls[h] = $WH.ce(k);
            this.uls[h].className = "tabs";
            this.uls[h].style.top = (-30 * (3 - h)) + "px";
            $WH.ae(c, this.uls[h]);
            $WH.ae(p, c)
        }
        $WH.ae(m, p);
        for (var h = 0; h < this.tabs.length; ++h) {
            var e = this.tabs[h];
            for (var g = 0; g <= 3; ++g) {
                if (n) {
                    f = $WH.ce("span")
                } else {
                    f = $WH.ce("li");
                    q = $WH.ce("b")
                }
                r = $WH.ce("a");
                if (e.hidden) {
                    f.style.display = "none"
                }
                if (this.poundable) {
                    r.href = "#" + e.id
                } else {
                    r.href = "javascript:;"
                }
                if (g > 0) {
                    $WH.ns(r);
                    r.onclick = Tabs.onClick.bind(e, r)
                }
                p = $WH.ce("div");
                if (e.locked) {
                    s = $WH.ce("span");
                    s.className = "icon-lock";
                    if (n) {
                        $WH.ae(r, s)
                    } else {
                        $WH.ae(p, s)
                    }
                } else {
                    if (e.icon) {
                        s = $WH.ce("span");
                        s.className = "icontiny";
                        s.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + e.icon.toLowerCase() + ".gif)";
                        if (n) {
                            $WH.ae(r, s)
                        } else {
                            $WH.ae(p, s)
                        }
                    }
                }
                if (e.tooltip) {
                    r.onmouseover = (function (a, b) {
                        $WH.Tooltip.showAtCursor(b, a, 0, 0, "q")
                    }).bind(r, e.tooltip);
                    r.onmousemove = $WH.Tooltip.cursorUpdate;
                    r.onmouseout = $WH.Tooltip.hide
                }
                if (e["class"]) {
                    p.className = e["class"]
                }
                $WH.ae(p, $WH.ct(e.caption));
                $WH.ae(r, p);
                if (e.locked) {
                    s = $WH.ce("span");
                    s.className = "icon-lock";
                    if (n) {
                        $WH.ae(r, s)
                    } else {
                        $WH.ae(q, s)
                    }
                } else {
                    if (e.icon) {
                        s = $WH.ce("span");
                        s.className = "icontiny";
                        s.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/tiny/" + e.icon.toLowerCase() + ".gif)";
                        if (n) {
                            $WH.ae(r, s)
                        } else {
                            $WH.ae(q, s)
                        }
                    }
                }
                if (n) {
                    $WH.ae(r, $WH.ct(e.caption))
                } else {
                    $WH.ae(q, $WH.ct(e.caption));
                    $WH.ae(r, q)
                }
                $WH.ae(f, r);
                $WH.ae(this.uls[g], f)
            }
        }
        $WH.ee(this.parent);
        $WH.ae(this.parent, m);
        if (this.onLoad) {
            t = this.onLoad();
            if (t != null) {
                this.poundedTab = o = t
            }
        }
        this.show(o)
    },
    setTabName: function (c, b) {
        this.tabs[c].caption = b;
        for (var d = 0; d <= 3; ++d) {
            var a = $WH.gE(this.uls[d], "a");
            g_setTextNodes(a[c], b)
        }
    },
    setTabPound: function (c, a) {
        if (!this.poundable) {
            return
        }
        for (var d = 0; d <= 3; ++d) {
            var b = $WH.gE(this.uls[d], "a");
            b[c].href = "#" + this.tabs[c].id + (a ? ":" + a : "")
        }
    },
    setTabTooltip: function (b, d) {
        this.tabs[b].tooltip = d;
        for (var c = 0; c <= 3; ++c) {
            var a = $WH.gE(this.uls[c], "a");
            if (d == null) {
                a[b].onmouseover = a[b].onmousemove = a[b].onmouseout = null
            } else {
                a[b].onmouseover = function (f) {
                    $WH.Tooltip.showAtCursor(f, d, 0, 0, "q2")
                };
                a[b].onmousemove = $WH.Tooltip.cursorUpdate;
                a[b].onmouseout = $WH.Tooltip.hide
            }
        }
    },
    getSelectedTab: function () {
        return this.selectedTab
    }
};
Tabs.onClick = function (b, g, f) {
    if (f == null && this.index == this.owner.selectedTab) {
        return
    }
    var d = $WH.rf2(g);
    if (d == null) {
        return
    }
    this.owner.show(this.index, f);
    if (this.owner.poundable && !this.locked) {
        var c = b.href.indexOf("#");
        c != -1 && location.replace(b.href.substr(c))
    }
    return d
};
Tabs.onLoad = function () {
    if (!this.poundable || !location.hash.length) {
        return
    }
    var a = location.hash.substr(1).split(":")[0];
    if (a) {
        return $WH.in_array(this.tabs, a, function (b) {
            if (!b.locked) {
                return b.id
            }
        })
    }
};
Tabs.onShow = function (d, e) {
    var b;
    if (d.hidden || d.locked) {
        return
    }
    if (e) {
        $WH.ge("tab-" + e.id).style.display = "none"
    }
    if (this.poundedTab != null || e) {
        this.trackClick(d)
    }
    b = $WH.ge("tab-" + d.id);
    b.style.display = "";
    if (((this.nShows == 1 && this.poundedTab != null && this.poundedTab >= 0) || this.forceScroll) && !this.noScroll) {
        var c, a;
        if (this.__st) {
            c = this.__st;
            a = 15
        } else {
            c = b;
            a = this.parent.offsetHeight + 15
        }
        setTimeout($WH.g_scrollTo.bind(null, c, a), 10)
    }
};
Tabs.trackClick = function (a) {
    if (!this.trackable || a.tracked) {
        return
    }
    g_trackEvent("Tabs", "Show", this.trackable + ": " + a.id);
    a.tracked = 1
};

function g_trackPageview(a) {
    function b() {
        if ($WH.isset("pageTracker")) {
            pageTracker._trackPageview(a)
        }
    }
    $(document).ready(b)
}
function g_trackEvent(d, a, c, e) {
    function b() {
        if ($WH.isset("pageTracker")) {
            pageTracker._trackEvent(d, a, c, e)
        }
    }
    $(document).ready(b)
}
function g_attachTracking(e, d, a, c, f) {
    var b = $(e);
    b.click(function () {
        g_trackEvent(d, a, c, f)
    })
}
function g_addAnalytics() {
    var c = {
        "home-logo": {
            category: "Homepage Logo",
            actions: {
                "Click image": function (d) {
                    return true
                }
            }
        },
        "home-featuredbox": {
            category: "Featured Box",
            actions: {
                "Follow link": function (d) {
                    return (d.parentNode.className != "home-featuredbox-links")
                },
                "Click image": function (d) {
                    return (d.parentNode.className == "home-featuredbox-links")
                }
            }
        },
        "home-oneliner": {
            category: "Oneliner",
            actions: {
                "Follow link": function (d) {
                    return true
                }
            }
        },
        "sidebar-container": {
            category: "Page sidebar",
            actions: {
                "Click image": function (d) {
                    return true
                }
            }
        },
        "toptabs-promo": {
            category: "Page header",
            actions: {
                "Click image": function (d) {
                    return true
                }
            }
        }
    };
    for (var a in c) {
        var b = $WH.ge(a);
        if (b) {
            g_addAnalyticsToNode(b, c[a])
        }
    }
}
function g_getNodeTextId(a) {
    var c = null;
    var b = g_getFirstTextContent(a);
    if (b) {
        c = g_urlize(b)
    } else {
        if (a.title) {
            c = g_urlize(a.title)
        } else {
            if (a.id) {
                c = g_urlize(a.id)
            }
        }
    }
    return c
}
function g_addAnalyticsToNode(d, b, g) {
    if (!b || !b.actions || !b.category) {
        if ($WH.isset("g_dev") && g_dev) {
            console.log("Tried to add analytics event without appropriate parameters.");
            console.log(d);
            console.log(b)
        }
        return
    }
    var c = b.category;
    var k = $WH.gE(d, "a");
    for (var f = 0; f < k.length; ++f) {
        var d = k[f];
        var e = "Follow link";
        for (var j in b.actions) {
            if (b.actions[j] && b.actions[j](d)) {
                e = j;
                break
            }
        }
        var h = (g ? g + "-" : "") + g_getNodeTextId(d);
        g_attachTracking(d, c, e, h)
    }
}
$(document).ready(g_addAnalytics);

function g_getAchievementText(a, b, e, c) {
    var d = $("<span>").addClass("wsach-pts");
    d.mouseover(function (g) {
        $WH.Tooltip.showAtCursor(g, LANG.userachcount_tip, 0, 0, "q")
    }).mousemove(function (g) {
        $WH.Tooltip.cursorUpdate(g)
    }).mouseout(function () {
        $WH.Tooltip.hide()
    });
    var f = " ";
    if (!c) {
        f += " ("
    }
    if (a) {
        f += "<i>" + a + "</i>&middot;"
    }
    if (b) {
        f += "<b>" + b + "</b>&middot;"
    }
    if (!e) {
        e = 0
    }
    f += "<u>" + e + "</u>";
    if (!c) {
        f += ")"
    }
    d.html(f);
    return d
}
function g_addTooltip(b, c, a) {
    if (!a && c.indexOf("<table>") == -1) {
        a = "q"
    }
    b.onmouseover = function (d) {
        $WH.Tooltip.showAtCursor(d, c, 0, 0, a)
    };
    b.onmousemove = $WH.Tooltip.cursorUpdate;
    b.onmouseout = $WH.Tooltip.hide
}
function g_addStaticTooltip(b, c, a) {
    if (!a && c.indexOf("<table>") == -1) {
        a = "q"
    }
    b.onmouseover = function (d) {
        $WH.Tooltip.show(b, c, 0, 0, a)
    };
    b.onmouseout = $WH.Tooltip.hide
}
function g_formatTimeElapsed(f, b) {
    function d(n, m, i) {
        if (i && LANG.timeunitsab[m] == "") {
            i = 0
        }
        if (i) {
            return n + " " + LANG.timeunitsab[m]
        } else {
            return n + " " + (n == 1 ? LANG.timeunitssg[m] : LANG.timeunitspl[m])
        }
    }
    var h = [31557600, 2629800, 604800, 86400, 3600, 60, 1];
    var a = [1, 3, 3, -1, 5, -1, -1];
    f = Math.max(f, 1);
    for (var g = 3, j = h.length; g < j; ++g) {
        if (f >= h[g]) {
            var e = g;
            var l = Math.floor(f / h[e]);
            if (a[e] != -1) {
                var c = a[e];
                f %= h[e];
                var k = Math.floor(f / h[c]);
                if (k > 0) {
                    return d(l, e, 1) + " " + d(k, c, 1)
                }
            }
            return d(l, e, 0)
        }
    }
    return "(n/a)"
}
function g_formatDate(c, j, a, d, k) {
    var f = new Date();
    var b = new Date();
    b.setTime(f.getTime() - (1000 * j));
    var e;
    var g = new Date(b.getYear(), b.getMonth(), b.getDate());
    var l = new Date(f.getYear(), f.getMonth(), f.getDate());
    var i = (l.getTime() - g.getTime());
    i /= 1000;
    i /= 86400;
    i = Math.round(i);
    if (j >= 2592000) {
        e = LANG.date_on + g_formatDateSimple(a, d)
    } else {
        if (i > 1) {
            e = $WH.sprintf(LANG.ddaysago, i);
            if (c) {
                var h = new Date();
                h.setTime(a.getTime() + (g_localTime - g_serverTime));
                c.className += (($WH.isset("g_thottbot") && g_thottbot) ? "" : " tip");
                c.title = h.toLocaleString()
            }
        } else {
            if (j >= 43200) {
                if (f.getDay() == b.getDay()) {
                    e = LANG.today
                } else {
                    e = LANG.yesterday
                }
                e = g_formatTimeSimple(b, e);
                if (c) {
                    var h = new Date();
                    h.setTime(a.getTime() + (g_localTime - g_serverTime));
                    c.className += " tip";
                    c.title = h.toLocaleString()
                }
            } else {
                var e = $WH.sprintf(LANG.date_ago, g_formatTimeElapsed(j));
                if (c) {
                    var h = new Date();
                    h.setTime(a.getTime() + (g_localTime - g_serverTime));
                    c.className += " tip";
                    c.title = h.toLocaleString()
                }
            }
        }
    }
    if (k == 1) {
        e = e.substr(0, 1).toUpperCase() + e.substr(1)
    }
    if (c) {
        $WH.ae(c, $WH.ct(e))
    } else {
        return e
    }
}
function g_formatDateSimple(i, h) {
    function e(b) {
        return (b < 10 ? "0" + b : b)
    }
    var a = "",
        c = i.getDate(),
        g = i.getMonth() + 1,
        f = i.getFullYear();
    a += $WH.sprintf(LANG.date_simple, e(c), e(g), f);
    if (h != null) {
        a = g_formatTimeSimple(i, a)
    }
    return a
}
function g_formatTimeSimple(g, a, e) {
    function c(d) {
        return (d < 10 ? "0" + d : d)
    }
    var b = g.getHours(),
        f = g.getMinutes();
    if (a == null) {
        a = ""
    }
    a += (e ? " " : LANG.date_at);
    if (b == 12) {
        a += LANG.noon
    } else {
        if (b == 0) {
            a += LANG.midnight
        } else {
            if (b > 12) {
                a += (b - 12) + ":" + c(f) + " " + LANG.pm
            } else {
                a += b + ":" + c(f) + " " + LANG.am
            }
        }
    }
    return a
}
function g_createGlow(a, h) {
    var e = $WH.ce("span");
    for (var c = -1; c <= 1; ++c) {
        for (var b = -1; b <= 1; ++b) {
            var g = $WH.ce("div");
            g.style.position = "absolute";
            g.style.whiteSpace = "nowrap";
            g.style.left = c + "px";
            g.style.top = b + "px";
            if (c == 0 && b == 0) {
                g.style.zIndex = 4
            } else {
                g.style.color = "black";
                g.style.zIndex = 2
            }
            g.innerHTML = a;
            $WH.ae(e, g)
        }
    }
    e.style.position = "relative";
    e.className = "glow" + (h != null ? " " + h : "");
    var f = $WH.ce("span");
    f.style.visibility = "hidden";
    $WH.ae(f, $WH.ct(a));
    $WH.ae(e, f);
    return e
}
function g_createProgressBar(c) {
    if (c == null) {
        c = {}
    }
    if (typeof c.text == "undefined") {
        c.text = " "
    }
    if (c.color == null) {
        c.color = "rep0"
    }
    if (c.width == null || c.width > 100) {
        c.width = 100
    }
    var d, e;
    if (c.hoverText) {
        d = $WH.ce("a");
        d.href = "javascript:;"
    } else {
        d = $WH.ce("span")
    }
    d.className = "progressbar";
    if (c.text || c.hoverText) {
        e = $WH.ce("div");
        e.className = "progressbar-text";
        if (c.text) {
            var a = $WH.ce("del");
            $WH.ae(a, $WH.ct(c.text));
            $WH.ae(e, a)
        }
        if (c.hoverText) {
            var b = $WH.ce("ins");
            $WH.ae(b, $WH.ct(c.hoverText));
            $WH.ae(e, b)
        }
        $WH.ae(d, e)
    }
    e = $WH.ce("div");
    e.className = "progressbar-" + c.color;
    e.style.width = c.width + "%";
    if (c.height) {
        e.style.height = c.height
    }
    $WH.ae(e, $WH.ct(String.fromCharCode(160)));
    $WH.ae(d, e);
    if (c.text) {
        var e = $WH.ce("div");
        e.className = "progressbar-text progressbar-hidden";
        $WH.ae(e, $WH.ct(c.text));
        $WH.ae(d, e)
    }
    return d
}
function g_createReputationBar(g) {
    var f = g_createReputationBar.P;
    if (!g) {
        g = 0
    }
    g += 42000;
    if (g < 0) {
        g = 0
    } else {
        if (g > 84999) {
            g = 84999
        }
    }
    var e = g,
        h, b = 0;
    for (var d = 0, a = f.length; d < a; ++d) {
        if (f[d] > e) {
            break
        }
        if (d < a - 1) {
            e -= f[d];
            b = d + 1
        }
    }
    h = f[b];
    var c = {
        text: g_reputation_standings[b],
        hoverText: e + " / " + h,
        color: "rep" + b,
        width: parseInt(e / h * 100)
    };
    return g_createProgressBar(c)
}
g_createReputationBar.P = [36000, 3000, 3000, 3000, 6000, 12000, 21000, 999];

function g_createAchievementBar(b, d, a, e) {
    if (!b) {
        b = 0
    }
    var c = {
        text: b + (e > 0 ? "(+" + e + ")" : "") + (d > 0 ? " / " + d : ""),
        color: (a ? "rep7" : "ach" + (d > 0 ? 0 : 1)),
        width: (d > 0 ? parseInt(b / d * 100) : 100)
    };
    return g_createProgressBar(c)
}
function g_createCaptcha(g, f) {
    if (g_captchaType == 1) {
        var b = {
            0: "en",
            2: "fr",
            3: "de",
            6: "es",
            7: "ru"
        };
        Recaptcha.create("6Lf127oSAAAAAJ4QhB9VuZPCEyt7jA1xLd2TFEjh", g, {
            theme: "blackglass",
            lang: b[Locale.getId()]
        })
    } else {
        var d = $("#" + g);
        var c = $("<a/>", {
            href: "javascript:;",
            "class": "captcha",
            title: LANG.tooltip_captcha,
            css: {
                "background-image": "url(" + wowheadUrl + "/captcha?foo=" + Math.random() + ")"
            },
            click: function () {
                this.style.backgroundImage = "url(" + wowheadUrl + "/captcha?foo=" + Math.random() + ")"
            }
        });
        if (f === true) {
            c.css({
                "margin-left": "auto",
                "margin-right": "auto"
            })
        } else {
            c.css("margin-left", "15px")
        }
        d.append($("<div/>").append(c));
        var e = $("<input/>", {
            type: "text",
            name: "captcha",
            maxlength: 5,
            css: {
                width: "3.3em",
                "text-align": "center"
            }
        });
        d.append("<small>" + LANG.ct_dialog_captcha + "</small>");
        d.append(e)
    }
}
function g_revealCaptcha(e, b, d) {
    if (g_requireCaptcha() || b) {
        var a = $("#" + e);
        if (a.length == 0 || a.has("#recaptcha_area").length > 0 || a.has("a.captcha").length > 0) {
            return
        }
        g_createCaptcha(e, d)
    } else {
        if (!b) {
            var a = $("#" + e);
            var c = $("<input/>", {
                type: "hidden",
                name: "skipcaptcha",
                val: 1
            });
            a.append(c)
        }
    }
}
function g_getMoneyHtml(a, g, e, b, m) {
    var k = 0,
        d = "";
    if (g == 1 || g == "alliance") {
        g = 1
    } else {
        if (g == 2 || g == "horde") {
            g = 2
        } else {
            g = 3
        }
    }
    if (a >= 10000) {
        k = 1;
        var h = Math.floor(a / 10000);
        d += '<span class="moneygold">' + $WH.number_format(h) + "</span>";
        a %= 10000
    }
    if (a >= 100) {
        if (k) {
            d += " "
        } else {
            k = 1
        }
        var h = Math.floor(a / 100);
        d += '<span class="moneysilver">' + h + "</span>";
        a %= 100
    }
    if (a >= 1) {
        if (k) {
            d += " "
        } else {
            k = 1
        }
        d += '<span class="moneycopper">' + a + "</span>"
    }
    if (e != null) {
        for (var c = 0; c < e.length; ++c) {
            if (k) {
                d += " "
            } else {
                k = 1
            }
            var n = e[c][0];
            var f = e[c][1];
            var j = (g_items[n] && g_items[n].icon ? g_items[n].icon : "inv_misc_questionmark");
            d += '<a href="' + wowheadUrl + '/item=' + n + '" class="moneyitem" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + j.toLowerCase() + '.gif)">' + f + "</a>"
        }
    }
    if (b != null) {
        for (var c = 0; c < b.length; ++c) {
            if (k) {
                d += " "
            } else {
                k = 1
            }
            var l = b[c][0];
            var f = b[c][1];
            var j = (g_gatheredcurrencies[l] && g_gatheredcurrencies[l].icon ? g_gatheredcurrencies[l].icon : ["inv_misc_questionmark", "inv_misc_questionmark"]);
            if (g == 3 && j[0] == j[1]) {
                g = 1
            }
            d += '<a href="' + wowheadUrl + '/currency=' + l + '" class="icontinyr tip q1" onmouseover="Listview.funcBox.moneyCurrencyOver(' + l + ", " + f + ', event)" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + j[(g == 3 ? 1 : g - 1)].toLowerCase() + '.gif)">' + (g == 3 ? '<span class="icontinyr" style="background-image: url(' + g_staticUrl + "/images/wow/icons/tiny/" + j[0].toLowerCase() + '.gif)">' : "") + f + (g == 3 ? "</span>" : "") + "</a>"
        }
    }
    if (m > 0) {
        if (k) {
            d += " "
        } else {
            k = 1
        }
        d += '<span class="moneyachievement tip" onmouseover="Listview.funcBox.moneyAchievementOver(event)" onmousemove="$WH.Tooltip.cursorUpdate(event)" onmouseout="$WH.Tooltip.hide()">' + $WH.number_format(m) + "</span>"
    }
    return d
}
function g_pickerWheel(a) {
    a = $WH.$E(a);
    if (a._wheelDelta < 0) {
        this.scrollTop += 27
    } else {
        this.scrollTop -= 27
    }
}
function g_setSelectedLink(c, b) {
    if (!g_setSelectedLink.groups) {
        g_setSelectedLink.groups = {}
    }
    var a = g_setSelectedLink.groups;
    if (a[b]) {
        a[b].className = a[b].className.replace("selected", "")
    }
    c.className += " selected";
    a[b] = c
}
function g_setCheckedRow(c, b) {
    if (!g_setCheckedRow.groups) {
        g_setCheckedRow.groups = {}
    }
    var a = g_setCheckedRow.groups;
    if (a[b]) {
        a[b].className = a[b].className.replace("checked", "")
    }
    c.className += " checked";
    a[b] = c
}
function g_addPages(l, b) {
    function o(q, d) {
        var i;
        if (q == b.page) {
            i = $WH.ce("span");
            i.className = "selected"
        } else {
            i = $WH.ce("a");
            i.href = (q > 1 ? b.url + b.sep + q + b.pound : b.url + b.pound)
        }
        $WH.ae(i, $WH.ct(d != null ? d : q));
        return i
    }
    if (!b.pound) {
        b.pound = ""
    }
    if (!b.sep) {
        b.sep = "."
    }
    if (b.allOrNothing && b.nPages <= 1) {
        return
    }
    var c = (b.align && b.align == "left");
    var e = $WH.ce("div"),
        k, p = $WH.ce("var");
    e.className = "pages";
    if (c) {
        e.className += " pages-left"
    }
    if (b.nPages > 1) {
        k = $WH.ce("div");
        k.className = "pages-numbers";
        var n = Math.max(2, b.page - 2);
        var h = Math.min(b.nPages - 1, b.page + 2);
        var m = [];
        if (b.page != b.nPages) {
            m.push(o(b.page + 1, String.fromCharCode(187)))
        }
        m.push(o(b.nPages));
        if (h < b.nPages - 1) {
            var a = $WH.ce("span");
            $WH.ae(a, $WH.ct("..."));
            m.push(a)
        }
        for (var g = h; g >= n; --g) {
            m.push(o(g))
        }
        if (n > 2) {
            var a = $WH.ce("span");
            $WH.ae(a, $WH.ct("..."));
            m.push(a)
        }
        m.push(o(1));
        if (b.page != 1) {
            m.push(o(b.page - 1, String.fromCharCode(171)))
        }
        if (c) {
            m.reverse()
        }
        for (var g = 0, j = m.length; g < j; ++g) {
            $WH.ae(k, m[g])
        }
        k.firstChild.style.marginRight = "0";
        k.lastChild.style.marginLeft = "0"
    }
    var p = $WH.ce("var");
    $WH.ae(p, $WH.ct($WH.sprintf(LANG[b.wording[b.nItems == 1 ? 0 : 1]], b.nItems)));
    if (b.nPages > 1) {
        var a = $WH.ce("span");
        $WH.ae(a, $WH.ct(String.fromCharCode(8211)));
        $WH.ae(p, a);
        var f = $WH.ce("a");
        f.className = "gotopage";
        f.href = "javascript:;";
        $WH.ns(f);
        f.onclick = function () {
            var d = prompt($WH.sprintf(LANG.prompt_gotopage, 1, b.nPages), b.page);
            if (d != null) {
                d |= 0;
                if (d != b.page && d >= 1 && d <= b.nPages) {
                    document.location.href = (d > 1 ? b.url + b.sep + d + b.pound : b.url + b.pound)
                }
            }
        };
        f.onmouseover = function (d) {
            $WH.Tooltip.showAtCursor(d, LANG.tooltip_gotopage, 0, 0, "q2")
        };
        f.onmousemove = $WH.Tooltip.cursorUpdate;
        f.onmouseout = $WH.Tooltip.hide;
        $WH.ae(p, f)
    }
    if (c) {
        $WH.ae(e, p);
        if (k) {
            $WH.ae(e, k)
        }
    } else {
        if (k) {
            $WH.ae(e, k)
        }
        $WH.ae(e, p)
    }
    $WH.ae(l, e)
}
function g_disclose(a, b) {
    b.className = "disclosure-" + (g_toggleDisplay(a) ? "on" : "off");
    return false
}
function g_setupChangeWarning(f, c, b) {
    if ($.browser.msie) {
        return
    }
    if (!f) {
        return
    }
    function e() {
        return b
    }
    f.submit(function () {
        window.onbeforeunload = null
    });
    var d = [];
    for (var a in c) {
        var g = c[a];
        if (!g) {
            continue
        }
        d[a] = g.val();
        g.keydown(function () {
            for (var h in c) {
                var i = c[h];
                if (!i) {
                    continue
                }
                if (i.val() != d[h]) {
                    window.onbeforeunload = e;
                    return
                }
                window.onbeforeunload = null
            }
        })
    }
}
$(document).ready(function () {
    $("dfn").each(function () {
        var a = $(this).attr("title");
        $(this).attr("title", "").addClass("tip").mouseover(function (b) {
            $WH.Tooltip.showAtCursor(b, a, 0, 0, "q")
        }).mousemove(function (b) {
            $WH.Tooltip.cursorUpdate(b)
        }).mouseout(function () {
            $WH.Tooltip.hide()
        })
    });
    $(".text").bind("copy", function () {
        $("*[unselectable]", this).each(function (c, b) {
            var a = $(b).text();
            $(b).text("");
            setTimeout(function () {
                $(b).text(a)
            }, 1)
        })
    })
});

function g_GetExpansionClassName(a) {
    switch (a) {
    case 0:
        return null;
    case 1:
        return "icon-bc-right";
    case 2:
        return "icon-wotlk-right";
    case 3:
        return "icon-cata-right"
    }
    return "icon-unknown" + a + "-right"
}
function UpdateProgressBar(a, c) {
    if (!b || c < 0 || c > 100) {
        return
    }
    var b = $(a);
    b.find("b").text(c + "%");
    b.find("img").css("background-position", (-120 + Math.floor(c * 1.2)) + "px 50%")
}
var UrlShortener = {
    get: function (a) {
        var b = "http://ggl-shortener.appspot.com/?url=" + $WH.urlencode2(a) + "&jsonp=UrlShortener.callback";
        $.getScript(b)
    },
    callback: function (a) {
        if (a && a.short_url) {
            prompt(LANG.message_sharetheurlbelow, a.short_url)
        }
    }
};

function g_createRange(c, a) {
    range = {};
    for (var b = c; b <= a; ++b) {
        range[b] = b
    }
    return range
}
function g_sortIdArray(a, b, c) {
    a.sort(c ?
    function (e, d) {
        return $WH.strcmp(b[e][c], b[d][c])
    } : function (e, d) {
        return $WH.strcmp(b[e], b[d])
    })
}
function g_sortJsonArray(e, d, f, a) {
    var c = [];
    for (var b in e) {
        if (d[b] && (a == null || a(d[b]))) {
            c.push(b)
        }
    }
    if (f != null) {
        c.sort(f)
    } else {
        g_sortIdArray(c, d)
    }
    return c
}
function g_urlize(b, c) {
    var a = $WH.ce("textarea");
    a.innerHTML = b.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    b = a.value;
    b = $WH.str_replace(b, " / ", "-");
    b = $WH.str_replace(b, "'", "");
    b = $WH.trim(b);
    if (c) {
        b = $WH.str_replace(b, " ", "-")
    } else {
        b = b.replace(/[^a-z0-9]/ig, "-")
    }
    b = $WH.str_replace(b, "--", "-");
    b = $WH.str_replace(b, "--", "-");
    b = $WH.rtrim(b, "-");
    b = b.replace(/[A-Z]/g, function (d) {
        return d.toLowerCase()
    });
    return b
}
function g_isDateValid(b) {
    var a = /^(20[0-2]\d)-([01]\d)-([0-3]\d) ([0-2]\d):([0-5]\d):([0-5]\d)$/.exec(b);
    return a
}
function g_isIpAddress(a) {
    return /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/.test(a)
}
function g_isEmailValid(a) {
    return a.match(/^([a-z0-9._-]+)(\+[a-z0-9._-]+)?(@[a-z0-9.-]+\.[a-z]{2,4})$/i) != null
}
function g_getCurrentDomain() {
    if (g_getCurrentDomain.CACHE) {
        return g_getCurrentDomain.CACHE
    }
    var a = location.hostname;
    if (!g_isIpAddress(a)) {
        var b = a.split(".");
        if (b.length > 2) {
            b.splice(0, b.length - 2)
        }
        a = b.join(".")
    }
    g_getCurrentDomain.CACHE = a;
    return a
}
function g_getCommentDomain(a) {
    if (!$WH.isset("g_ptr") && a == "ptr") {
        return "http://ptr.wowhead.com"
    } else {
        if (!$WH.isset("g_beta") && a == "beta") {
            return "http://cata.wowhead.com"
        } else {
            if (!$WH.isset("g_old") && a == "old") {
                return "http://old.wowhead.com"
            }
        }
    }
    return ""
}
function g_isExternalUrl(a) {
    if (!a) {
        return false
    }
    return (a.indexOf("http") == 0 && a.indexOf(g_getCurrentDomain()) == -1)
}
function g_createOrRegex(c, d) {
    c = c.replace(/(\(|\)|\|\+|\*|\?|\$|\^)/g, "\\$1");
    var f = c.split(" "),
        e = "";
    for (var b = 0, a = f.length; b < a; ++b) {
        if (b > 0) {
            e += "|"
        }
        e += f[b]
    }
    return new RegExp((d != null ? "(" + d + ")?" : "") + "(" + e + ")", "gi")
}
function g_getHash() {
    return "#" + decodeURIComponent(location.href.split("#")[1] || "")
}
function g_modifyUrl(a, d, b) {
    if (!b) {
        b = $.noop
    }
    var c = "";
    if (a.match(/(#.+)$/)) {
        c = RegExp.$1;
        a = a.replace(c, "")
    }
    $.each(d, function (i, h) {
        var k;
        var e;
        var j;
        var g = a.match(new RegExp("(&|\\?)?" + i + "=?([^&]+)?"));
        if (g != null) {
            k = g[0];
            e = g[1];
            j = decodeURIComponent(g[2])
        }
        if (h == null) {
            if (!k) {
                return
            }
            j = null
        } else {
            if (h.substr(0, 2) == "+=") {
                if (j && b.onAppendCollision) {
                    j = b.onAppendCollision(j, h.substr(2), b.menuUrl)
                } else {
                    if (!j && b.onAppendEmpty) {
                        j = b.onAppendEmpty(h.substr(2), b.menuUrl)
                    } else {
                        if (!j) {
                            j = ""
                        }
                        j += $.trim(h.substr(2))
                    }
                }
            } else {
                j = h
            }
        }
        if (k) {
            var f = "";
            if (e) {
                f += e
            }
            if (j != null) {
                f += i;
                if (j) {
                    f += "=" + $WH.urlencode2(j)
                }
            }
            a = a.replace(k, f)
        } else {
            if (j || h == null || h.substr(0, 2) != "+=") {
                a += (a.indexOf("?") == -1 ? "?" : "&") + i;
                if (j) {
                    a += "=" + $WH.urlencode2(j)
                }
            }
        }
    });
    a = a.replace("?&", "?");
    a = a.replace(/&&/g, "&");
    a = a.replace(/\/\?/g, "/");
    a = a.replace(/(&|\?)+$/, "");
    return a + c
}
var vi_thumbnails = {
    1: "http://i3.ytimg.com/vi/$1/default.jpg"
};
var vi_siteurls = {
    1: "http://www.youtube.com/watch?v=$1"
};
var vi_sitevalidation = {
    1: /^http:\/\/www\.youtube\.com\/watch\?v=([^& ]{11})/
};

function vi_submitAVideo() {
    tabsContribute.focus(2)
}
function vi_validateForm(b) {
    if (!b.elements.videourl.value.length) {
        alert(LANG.message_novideo);
        return false
    }
    var c = false;
    for (var a in vi_sitevalidation) {
        if (b.elements.videourl.value.match(vi_sitevalidation[a])) {
            c = true;
            break
        }
    }
    if (!c) {
        alert(LANG.message_novideo);
        return false
    }
    return true
}
function vi_appendSticky() {
    var i = $WH.ge("infobox-sticky-vi");
    var f = g_pageInfo.type;
    var e = g_pageInfo.typeId;
    var g = $WH.in_array(lv_videos, 1, function (a) {
        return a.sticky
    });
    if (g != -1) {
        var c = lv_videos[g];
        var h = $WH.ce("a");
        h.href = "#videos:id=" + c.id;
        h.onclick = function (a) {
            VideoViewer.show({
                videos: lv_videos,
                pos: g
            });
            return $WH.rf2(a)
        };
        var d = $WH.ce("img");
        d.src = $WH.sprintf(vi_thumbnails[c.videoType], c.videoId);
        d.className = "border";
        $WH.ae(h, d);
        $WH.ae(i, h);
        var b = $("#infobox-videos");
        if (!b) {
            var j = $("th", i.parentNode);
            b = j[j.length - (lv_videos && lv_videos.length ? 2 : 1)]
        }
        b.append(" (" + lv_videos.length + ")").wrapInner($('<a href="#videos"></a>').click(function () {
            tabsRelated.focus(-1);
            return false
        }))
    } else {
        if (g_user && g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU | U_GROUP_VIDEO)) {
            var h;
            if (g_user.id > 0) {
                h = '<a href="javascript:;" onclick="vi_submitAVideo(); return false">'
            } else {
                h = '<a href="' + wowheadUrl + '/account=signin">'
            }
            i.innerHTML = $WH.sprintf(LANG.infobox_noneyet, h + LANG.infobox_suggestone + "</a>")
        } else {
            $("#infobox-videos,#infobox-sticky-vi").closest("tr").css("display", "none")
        }
    }
}
var g_videos = [];
var VideoViewer = new function () {
        var d, k, c, C, G, p, q = 0,
            v, h, D, a, o, i, z, B, u, g, w, j;

        function f() {
            var J = d[k];
            var H = Math.max(j.offsetHeight - 18, 0),
                I = Math.max(50, Math.min(520, $WH.g_getWindowSize().h - 72 - H)),
                K = Math.min(1, I / 520);
            c = Math.round(K * 880);
            C = Math.round(K * 520);
            z.style.height = B.style.height = u.style.height = (C - 95) + "px";
            Lightbox.setSize(Math.max(480, c) + 20, C + 52 + H + (D ? 96 : 0))
        }
        function b(J) {
            var H = d[J],
                I = "#videos:";
            if (q == 0) {
                I += "id=" + H.id
            } else {
                I += v + ":" + (J + 1)
            }
            return I
        }
        function t(I) {
            if (I && (G == 1) && $WH.g_getWindowSize().h > a.offsetHeight) {
                return
            }
            a.style.visibility = "hidden";
            var J = d[k];
            f();
            if (!I) {
                g_trackEvent("Videos", "Show", J.id + (J.caption.length ? " (" + J.caption + ")" : ""));
                if (J.videoType == 1) {
                    i.innerHTML = Markup.toHtml("[youtube=" + J.videoId + " width=" + c + " height=" + C + " autoplay=true]")
                }
                g.href = $WH.sprintf(vi_siteurls[J.videoType], J.videoId);
                if (!J.user && typeof g_pageInfo == "object") {
                    J.user = g_pageInfo.username
                }
                var O = (J.date && J.user),
                    N = (d.length > 1);
                if (O) {
                    var M = new Date(J.date),
                        Q = (g_serverTime - M) / 1000;
                    var P = w.firstChild.childNodes[1];
                    P.href = wowheadUrl + "/user=" + J.user;
                    P.innerHTML = J.user;
                    var S = w.firstChild.childNodes[3];
                    $WH.ee(S);
                    g_formatDate(S, Q, M);
                    w.firstChild.style.display = ""
                } else {
                    w.firstChild.style.display = "none"
                }
                var S = w.childNodes[1];
                $WH.ee(S);
                S = w.childNodes[2];
                if (N) {
                    var R = "";
                    if (J.user) {
                        R = LANG.dash
                    }
                    R += (k + 1) + LANG.lvpage_of + d.length;
                    S.innerHTML = R;
                    S.style.display = ""
                } else {
                    S.style.display = "none"
                }
                w.style.display = (O || N ? "" : "none");
                var H = (J.caption != null && J.caption.length);
                var K = (J.subject != null && J.subject.length && J.type && J.typeId);
                if (H || K) {
                    var L = "";
                    if (K) {
                        L += LANG.types[J.type][0] + LANG.colon;
                        L += '<a href="' + wowheadUrl + '/' + g_types[J.type] + "=" + J.typeId + '">';
                        L += J.subject;
                        L += "</a>"
                    }
                    if (H) {
                        if (K) {
                            L += LANG.dash
                        }
                        L += (J.noMarkup ? J.caption : Markup.toHtml(J.caption, {
                            mode: Markup.MODE_SIGNATURE
                        }))
                    }
                    j.innerHTML = L;
                    j.style.display = ""
                } else {
                    j.style.display = "none"
                }
                if (d.length > 1) {
                    z.href = b(r(-1));
                    B.href = b(r(1));
                    z.style.display = B.style.display = "";
                    u.style.display = "none"
                } else {
                    z.style.display = B.style.display = "none";
                    u.style.display = ""
                }
                location.replace(b(k))
            } else {
                $("object, embed", i).each(function () {
                    this.width = c;
                    this.height = C
                })
            }
            Lightbox.reveal();
            a.style.visibility = "visible";
            setTimeout(m, 1)
        }
        function r(H) {
            var I = k;
            I += H;
            if (I < 0) {
                I = d.length - 1
            } else {
                if (I >= d.length) {
                    I = 0
                }
            }
            return I
        }
        function A() {
            k = r(-1);
            t();
            return false
        }
        function E() {
            k = r(1);
            t();
            return false
        }
        function m() {
            if (h) {
                document.title = h
            }
        }
        function n(H) {
            H = $WH.$E(H);
            switch (H.keyCode) {
            case 37:
                A();
                break;
            case 39:
                E();
                break
            }
        }
        function e() {
            t(1)
        }
        function l() {
            $WH.ee(i);
            if (d.length > 1) {
                $WH.dE(document, "keyup", n)
            }
            if (p && q == 0) {
                if (p.indexOf(":id=") != -1) {
                    p = "#videos"
                }
                location.replace(p)
            } else {
                location.replace("#.")
            }
            m()
        }
        function F(O, K, H) {
            if (typeof H.videos == "string") {
                d = g_videos[H.videos];
                q = 1;
                v = H.videos
            } else {
                d = H.videos;
                q = 0;
                v = null
            }
            a = O;
            k = 0;
            if (H.pos && H.pos >= 0 && H.pos < d.length) {
                k = H.pos
            }
            if (K) {
                O.className = "screenshotviewer";
                o = $WH.ce("div");
                o.className = "screenshotviewer-screen";
                z = $WH.ce("a");
                B = $WH.ce("a");
                z.className = "screenshotviewer-prev";
                B.className = "screenshotviewer-next";
                z.href = "javascript:;";
                B.href = "javascript:;";
                var N = $WH.ce("span");
                var M = $WH.ce("b");
                $WH.ae(M, $WH.ct(LANG.previous));
                $WH.ae(N, M);
                $WH.ae(z, N);
                var N = $WH.ce("span");
                var M = $WH.ce("b");
                $WH.ae(M, $WH.ct(LANG.next));
                $WH.ae(N, M);
                $WH.ae(B, N);
                z.onclick = A;
                B.onclick = E;
                u = $WH.ce("a");
                u.className = "screenshotviewer-cover";
                u.href = "javascript:;";
                u.onclick = Lightbox.hide;
                var N = $WH.ce("span");
                var M = $WH.ce("b");
                $WH.ae(M, $WH.ct(LANG.close));
                $WH.ae(N, M);
                $WH.ae(u, N);
                $WH.ae(o, z);
                $WH.ae(o, B);
                $WH.ae(o, u);
                i = $WH.ce("div");
                $WH.ae(o, i);
                $WH.ae(O, o);
                var J = $WH.ce("a");
                J.className = "dialog-x";
                J.href = "javascript:;";
                J.onclick = Lightbox.hide;
                $WH.ae(J, $WH.ct(LANG.close));
                $WH.ae(O, J);
                g = $WH.ce("a");
                g.className = "dialog-arrow";
                g.href = "javascript:;";
                g.target = "_blank";
                $WH.ae(g, $WH.ct(LANG.original));
                $WH.ae(O, g);
                w = $WH.ce("div");
                w.className = "screenshotviewer-from";
                var I = $WH.ce("span");
                $WH.ae(I, $WH.ct(LANG.lvscreenshot_from));
                $WH.ae(I, $WH.ce("a"));
                $WH.ae(I, $WH.ct(" "));
                $WH.ae(I, $WH.ce("span"));
                $WH.ae(w, I);
                $WH.ae(w, $WH.ce("span"));
                $WH.ae(w, $WH.ce("span"));
                $WH.ae(O, w);
                j = $WH.ce("div");
                j.className = "screenshotviewer-caption";
                $WH.ae(O, j);
                var L = $WH.ce("div");
                L.className = "clear";
                $WH.ae(O, L);
                if (H.displayAd) {
                    L.style.paddingBottom = "4px";
                    L = $WH.ce("div");
                    L.id = "videoviewer-ad";
                    L.style.paddingBottom = "10px";
                    L.style.margin = "0px auto";
                    $WH.ae(O, L);
                    D = true
                }
            }
            var P = $WH.ge("videoviewer-ad");
            if (!K && P) {
                $WH.ee(P)
            }
            if (H.displayAd && P) {
                Ads.fillSpot("leaderboard", P)
            }
            p = location.hash;
            if (d.length > 1) {
                $WH.aE(document, "keyup", n)
            }
            t()
        }
        this.checkPound = function () {
            h = $("title").html();
            if (location.hash && location.hash.indexOf("#videos") == 0) {
                if (!g_listviews.videos) {
                    var I = location.hash.split(":");
                    if (I.length == 3) {
                        var J = g_videos[I[1]],
                            H = parseInt(I[2]);
                        if (J && H >= 1 && H <= J.length) {
                            VideoViewer.show({
                                videos: I[1],
                                pos: H - 1,
                                displayAd: true
                            })
                        }
                    }
                }
            }
        };
        this.show = function (H) {
            Lightbox.show("videoviewer", {
                onShow: F,
                onHide: l,
                onResize: e
            }, H);
            return false
        };
        $(document).ready(this.checkPound)
    };
var g_file_races = {
    10: "bloodelf",
    11: "draenei",
    3: "dwarf",
    7: "gnome",
    1: "human",
    4: "nightelf",
    2: "orc",
    6: "tauren",
    8: "troll",
    5: "scourge",
    9: "goblin",
    22: "worgen"
};
var g_file_classes = {
    6: "deathknight",
    11: "druid",
    3: "hunter",
    8: "mage",
    2: "paladin",
    5: "priest",
    4: "rogue",
    7: "shaman",
    9: "warlock",
    1: "warrior"
};
var g_file_genders = {
    0: "male",
    1: "female"
};
var g_file_factions = {
    1: "alliance",
    2: "horde"
};
var g_file_gems = {
    1: "meta",
    2: "red",
    4: "yellow",
    6: "orange",
    8: "blue",
    10: "purple",
    12: "green",
    14: "prismatic",
    16: "hydraulic",
    32: "cogwheel"
};

function g_getPatchVersionIndex(e) {
    var d = g_getPatchVersion;
    var b = 0,
        c = d.T.length - 2,
        a;
    while (c > b) {
        a = Math.floor((c + b) / 2);
        if (e >= d.T[a] && e < d.T[a + 1]) {
            return a
        }
        if (e >= d.T[a]) {
            b = a + 1
        } else {
            c = a - 1
        }
    }
    a = Math.ceil((c + b) / 2);
    return a
}
function g_getPatchVersion(b) {
    var a = g_getPatchVersionIndex(b);
    return g_getPatchVersion.V[a]
}
g_getPatchVersion.V = ["1.12.0", "1.12.1", "1.12.2", "2.0.1", "2.0.3", "2.0.4", "2.0.5", "2.0.6", "2.0.7", "2.0.8", "2.0.10", "2.0.12", "2.1.0", "2.1.1", "2.1.2", "2.1.3", "2.2.0", "2.2.2", "2.2.3", "2.3.0", "2.3.2", "2.3.3", "2.4.0", "2.4.1", "2.4.2", "2.4.3", "3.0.2", "3.0.3", "3.0.8", "3.0.9", "3.1.0", "3.1.1", "3.1.2", "3.1.3", "3.2.0", "3.2.2", "3.3.0", "3.3.2", "3.3.3", "3.3.5", "4.0.1", "4.0.3", "4.0.6", "4.1.0", "?????"];
g_getPatchVersion.T = [1153540800000, 1159243200000, 1160712000000, 1165294800000, 1168318800000, 1168578000000, 1168750800000, 1169528400000, 1171342800000, 1171602000000, 1173157200000, 1175572800000, 1179806400000, 1181016000000, 1182225600000, 1184040000000, 1190692800000, 1191297600000, 1191902400000, 1194930000000, 1199768400000, 1200978000000, 1206417600000, 1207022400000, 1210651200000, 1216094400000, 1223956800000, 1225774800000, 1232427600000, 1234242000000, 1239681600000, 1240286400000, 1242705600000, 1243915200000, 1249358400000, 1253595600000, 1260266400000, 1265104800000, 1269320400000, 1277182800000, 1286834400000, 1289862000000, 1297119600000, 1303768800000, 9999999999999];
var g_npcs = {},
    g_objects = {},
    g_items = {},
    g_itemsets = {},
    g_quests = {},
    g_spells = {},
    g_gatheredzones = {},
    g_factions = {},
    g_pets = {},
    g_achievements = {},
    g_titles = {},
    g_holidays = {},
    g_classes = {},
    g_races = {},
    g_skills = {},
    g_gatheredcurrencies = {};
var g_types = {
    1: "npc",
    2: "object",
    3: "item",
    4: "itemset",
    5: "quest",
    6: "spell",
    7: "zone",
    8: "faction",
    9: "pet",
    10: "achievement",
    11: "title",
    12: "event",
    13: "class",
    14: "race",
    15: "skill",
    17: "currency"
};
$WH.cO(g_items, {
    add: function (b, a) {
        if (g_items[b] != null) {
            $WH.cO(g_items[b], a)
        } else {
            g_items[b] = a
        }
    },
    getIcon: function (a) {
        if (g_items[a] != null && g_items[a].icon) {
            return g_items[a].icon
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_items.getIcon(d), b, null, wowheadUrl + "/item=" + d, a, c)
    }
});
$WH.cO(g_spells, {
    add: function (b, a) {
        if (g_spells[b] != null) {
            $WH.cO(g_spells[b], a)
        } else {
            g_spells[b] = a
        }
    },
    getIcon: function (a) {
        if (g_spells[a] != null && g_spells[a].icon) {
            return g_spells[a].icon
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_spells.getIcon(d), b, null, wowheadUrl + "/spell=" + d, a, c)
    }
});
$WH.cO(g_achievements, {
    getIcon: function (a) {
        if (g_achievements[a] != null && g_achievements[a].icon) {
            return g_achievements[a].icon
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_achievements.getIcon(d), b, null, wowheadUrl + "/achievement=" + d, a, c)
    }
});
$WH.cO(g_classes, {
    getIcon: function (a) {
        if (g_file_classes[a]) {
            return "class_" + g_file_classes[a]
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_classes.getIcon(d), b, null, wowheadUrl + "/class=" + d, a, c)
    }
});
$WH.cO(g_races, {
    getIcon: function (b, a) {
        if (a === undefined) {
            a = 0
        }
        if (g_file_races[b] && g_file_genders[a]) {
            return "race_" + g_file_races[b] + "_" + g_file_genders[a]
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_races.getIcon(d), b, null, wowheadUrl + "/race=" + d, a, c)
    }
});
$WH.cO(g_skills, {
    getIcon: function (a) {
        if (g_skills[a] != null && g_skills[a].icon) {
            return g_skills[a].icon
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_skills.getIcon(d), b, null, wowheadUrl + "/skill=" + d, a, c)
    }
});
$WH.cO(g_gatheredcurrencies, {
    getIcon: function (b, a) {
        if (g_gatheredcurrencies[b] != null && g_gatheredcurrencies[b].icon) {
            if ($WH.is_array(g_gatheredcurrencies[b].icon) && !isNaN(a)) {
                return g_gatheredcurrencies[b].icon[a]
            }
            return g_gatheredcurrencies[b].icon
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_gatheredcurrencies.getIcon(d, (a > 0 ? 0 : 1)), b, null, null, Math.abs(a), c)
    }
});
$WH.cO(g_holidays, {
    getIcon: function (a) {
        if (g_holidays[a] != null && g_holidays[a].icon) {
            return g_holidays[a].icon
        } else {
            return "inv_misc_questionmark"
        }
    },
    createIcon: function (d, b, a, c) {
        return Icon.create(g_holidays.getIcon(d), b, null, wowheadUrl + "/event=" + d, a, c)
    }
});

function g_getIngameLink(a, c, b) {
    prompt(LANG.prompt_ingamelink, '/script DEFAULT_CHAT_FRAME:AddMessage("\\124c' + a + "\\124H" + c + "\\124h[" + b + ']\\124h\\124r");')
}(function (g) {
    var n = 3;
    var a = new Array();
    var h = 2650;
    var e = g("<audio />").get(0),
        b = g_staticUrl + "/sfx/wsa.wav",
        d = 1,
        k = 0,
        j = 3,
        m;

    function f(o, p) {
        if (p <= 0) {
            if (o == true || o == "true") {
                g("#wsa-overflow").fadeOut(1000, function () {
                    g("#wsa-overflow").remove();
                    d = 1
                })
            } else {
                g("#wsa-overflow").remove();
                d = 1
            }
            clearInterval(m)
        }
        return (p - 1)
    }
    function l(p, r, o) {
        var t = new Date();
        t.setDate(t.getDate() + o);
        var q = escape(r) + ((o == null) ? "" : "; expires=" + t.toUTCString());
        document.cookie = p + "=" + q
    }
    function i(q) {
        var p, o, t, r = document.cookie.split(";");
        for (p = 0; p < r.length; p++) {
            o = r[p].substr(0, r[p].indexOf("="));
            t = r[p].substr(r[p].indexOf("=") + 1);
            o = o.replace(/^\s+|\s+$/g, "");
            if (o == q) {
                return unescape(t)
            }
        }
    }
    g(".wsa-vol").live("click", function () {
        g(this).toggleClass("alt");
        if (g(this).hasClass("alt") == true) {
            g.post(wowheadUrl + "/account=setsound", {
                muted: 1
            })
        } else {
            g.post(wowheadUrl + "/account=setsound", {
                muted: 0
            })
        }
    });

    function c() {
        for (key in a) {
            clearTimeout(a[key])
        }
    }
    g(".wsa-notification").live("mouseover mouseout", function (o) {
        if (o.type == "mouseover") {
            c();
            g(".wsa-notification").stop();
            g(this).css("z-index", 1500000);
            if (g(this).attr("data-animated") == "true" && !g.browser.msie) {
                g(".wsa-notification").fadeTo(100, 1)
            }
        } else {
            g(this).css("z-index", 999999);
            if (g(this).attr("data-persistent") != "true") {
                g(".wsa-notification").each(function (q, p) {
                    var r = g(this).attr("id");
                    if (g(this).attr("data-animated") == "true" && !g.browser.msie) {
                        a[r] = setTimeout("$('#" + r + "').fadeOut(3000,function(){ $('#" + r + "').remove(); })", 1000)
                    } else {
                        a[r] = setTimeout("$('#" + r + "').remove()", 3000)
                    }
                })
            }
        }
    }).live("click", function (o) {
        if (!(g(o.target).is("a") || g(o.target).hasClass("wsa-vol"))) {
            g(this).remove()
        }
    });
    g.fn.wsaNotification = function (o) {
        var t = {
            caption: "??? No name",
            rank: 1,
            href: wowheadUrl + "/user#achievements",
            animate: true,
            playsfx: true,
            desc: "",
            persist: false,
            quality: 0
        };
        var o = g.extend(t, o);
        var v = g("body").children("#wsa-overflow").length;
        var q = g("body").children(".wsa-notification").length;
        if (q < n && v == 0) {
            var u = new Date(),
                u = "wsan" + u.getTime();
            if (q != (k % n)) {
                k = 0
            }
            var r = !o.playsfx;
            var p = '<div class="wsa-notification" data-animated="' + o.animate + '" data-persistent="' + o.persist + '" style="bottom: ' + (((k % n) * 125) + 15).toString() + 'px" id="' + u + '"><em></em><ins></ins><span class="wsar' + o.rank + '"></span><div><var><i>' + $WH.sprintf(LANG.achievementunlocked_format, l_achievement_qualities[o.quality]) + '</i><a title="' + o.desc + '" href="' + o.href + '">' + LANG.viewdetails + " &rarr;</a></var><h2>" + o.caption + '</h2></div><div class="wsa-vol' + (r ? " alt" : "") + '"></div></div>';
            g("body").prepend(p);
            if (o.playsfx == true || o.playsfx == "true") {
                if (!g(e).attr("src")) {
                    g(e).attr("src", b)
                }
                if (!g.browser.msie) {
                    e.play()
                } else {
                    g(".wsa-sound").remove();
                    g("body").append('<embed class="wsa-sound" src="' + b + '" autostart="true" hidden="true" loop="false" />')
                }
            }
            if (o.animate == true || o.animate == "true") {
                g("#" + u + " em").css("filter", "");
                g("#" + u + " em").fadeOut(750, function () {
                    g("#" + u + " em").remove()
                });
                g("#" + u + " ins").delay(250).animate({
                    marginLeft: "355px",
                    opacity: 0
                }, 750, function () {
                    g(this).remove();
                    if (!o.persist) {
                        a[u] = setTimeout("$('#" + u + "').fadeOut(3000,function(){ $('#" + u + "').remove(); })", h)
                    }
                })
            } else {
                g("#" + u + " em").remove();
                g("#" + u + " ins").remove();
                if (!o.persist) {
                    a[u] = setTimeout("$('#" + u + "').remove()", h + 1000)
                }
            }
            k++
        } else {
            var p = '<div class="wsa-overflow" id="wsa-overflow" style="bottom: ' + 0 + 'px"><a href="' + wowheadUrl + '/user">' + $WH.sprintf(LANG.wsamore_format, 1) + "</a></div>";
            if (v == 0) {
                g("body").prepend(p);
                j = 3;
                if (o.animate == true || o.animate == "true") {
                    g("#wsa-overflow").slideDown()
                } else {
                    g("#wsa-overflow").show()
                }
                m = setInterval(function () {
                    j = f(o.animate, j)
                }, 1000)
            } else {
                j = 3;
                d++;
                g("#wsa-overflow b").text(d)
            }
        }
    }
})(jQuery);

function AchievementCheck() {
    $.ajax({
        cache: false,
        url: wowheadUrl + "/ajax-achievement-check",
        type: "POST",
        success: function (data) {
            if (data) {
                eval("(" + data + ")")
            }
        }
    })
}
$(document).ready(function () {
    $("a.wsach").each(function () {
        var a = $(this).text();
        var j = $(this).attr("title");
        var d = parseInt($(this).attr("data-earned"));
        var c = $(this).attr("data-user");
        var g = $(this).parent().parent().attr("id") == "user-achievement-list";
        var h = $(this).attr("data-progress");
        var k = $(this).attr("data-quality");
        var f = $(this).attr("data-count");
        $(this).attr("title", "");
        var i = $("<div>");
        i.append('<table><tr><td style="padding-bottom: 0.35em"><b class="q" data-quality="' + k + '"></b></td></tr><tr><td><span></span></td></tr></table>');
        i.find("b").text(a);
        i.find("span").text(j);
        if (d) {
            var e = null;
            var b = (new Date()).getTime() / 1000;
            if (c) {
                if (d > 31 * 24 * 60 * 60) {
                    i.append('<span class="q0"><br />' + $WH.sprintf(f > 1 ? LANG.earnedwsafirsttime4_format : LANG.earnedwsatime4_format, c, g_formatDateSimple(new Date((b - d) * 1000))) + "</span>")
                } else {
                    i.append('<span class="q0"><br />' + $WH.sprintf(f > 1 ? LANG.earnedwsafirsttime2_format : LANG.earnedwsatime2_format, c, g_formatTimeElapsed(d)) + "</span>")
                }
            } else {
                if (!g) {
                    if (d > 31 * 24 * 60 * 60) {
                        i.append('<span class="q0"><br />' + $WH.sprintf(f > 1 ? LANG.earnedwsafirsttime3_format : LANG.earnedwsatime3_format, g_formatDateSimple(new Date((b - d) * 1000))) + "</span>")
                    } else {
                        i.append('<span class="q0"><br />' + $WH.sprintf(f > 1 ? LANG.earnedwsafirsttime_format : LANG.earnedwsatime_format, g_formatTimeElapsed(d)) + "</span>")
                    }
                }
            }
            if (e) {
                i.append('<span class="q0"><br />' + e + "</span>")
            }
        } else {
            if (!g && h) {
                i.append('<span class="q0"><br /><small></small>' + LANG.progress + ": " + h + "</td></tr>")
            }
        }
        $(this).mouseover(function (l) {
            $WH.Tooltip.showAtCursor(l, i.html(), 0, 0)
        }).mousemove(function (l) {
            $WH.Tooltip.cursorUpdate(l)
        }).mouseout(function () {
            $WH.Tooltip.hide()
        })
    })
});