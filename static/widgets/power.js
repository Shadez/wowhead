if (typeof $WH == "undefined") {
    $WH = {
        wowheadRemote: true
    }
}
if (typeof $WowheadPower == "undefined") {
    var $WowheadPower = new function () {
            var W = $WH.wowheadRemote;
            var z = {
                applyto: 3
            },
                t = document.getElementsByTagName("head")[0],
                H = true,
                i, P, T, K, v, aa, N, L, k = 0,
                ae = false,
                O = {},
                j = {},
                A = {},
                I = {},
                U = {},
                ah = {},
                g = {},
                f = {},
                Z = 1,
                C = 1,
                S = 0,
                Q = 1,
                l = 2,
                w = 3,
                R = 4,
                V = 5,
                x = 1,
                n = 2,
                E = 3,
                J = 5,
                y = 6,
                q = 10,
                m = 100,
                s = 15,
                G = 15,
                D = {
                    loading: "Loading...",
                    noresponse: "No response from server :(",
                    achievementcomplete: "Achievement earned by $1 on $2/$3/$4"
                },
                u = {
                    1: [O, "npc", "NPC"],
                    2: [j, "object", "Object"],
                    3: [A, "item", "Item"],
                    5: [I, "quest", "Quest"],
                    6: [U, "spell", "Spell"],
                    10: [ah, "achievement", "Achievement"],
                    100: [f, "profile", "Profile"]
                },
                ag = {
                    3: {
                        url: "/data=item-scaling"
                    },
                    6: {
                        url: "/data=spell-scaling"
                    }
                },
                e = {
                    0: "enus",
                    2: "frfr",
                    3: "dede",
                    6: "eses",
                    7: "ruru",
                    ptr: "ptr",
                    beta: "beta"
                },
                c = {
                    wotlk: "www"
                };
            if (W) {
                var b = {
                    getId: function () {
                        return 0
                    },
                    getName: function () {
                        return "enus"
                    }
                }
            }
            if (H) {} else {
                c.ptr = "www"
            }
            function ab() {
                if (W) {
                    var aj = document.createElement("script");
                    aj.src = "//static.wowhead.com/js/basic.js?5";
                    t.appendChild(aj)
                } else {
                    X()
                }
            }
            function X() {
                if (ae) {
                    return
                }
                ae = true;
                $WH.aE(document, "mouseover", B)
            }
            this.init = function () {
                if (W) {
                    $WH.ae(t, $WH.ce("link", {
                        type: "text/css",
                        href: "//static.wowhead.com/css/basic.css?5",
                        rel: "stylesheet"
                    }))
                }
                X()
            };

            function r(aj) {
                var ak = $WH.g_getCursorPos(aj);
                N = ak.x;
                L = ak.y
            }
            function ad(ax, at) {
                if (ax.nodeName != "A" && ax.nodeName != "AREA") {
                    return -2323
                }
                if (!ax.href.length && !ax.rel) {
                    return
                }
                if (ax.rel && ax.rel.indexOf("np") != -1) {
                    return
                }
                var ao, an, al, ak, ap = {};
                v = ap;
                var aj = function (ay, aA, az) {
                        if (aA == "buff" || aA == "sock" || aA == "map") {
                            ap[aA] = true
                        } else {
                            if (aA == "rand" || aA == "ench" || aA == "lvl" || aA == "c" || aA == "diff") {
                                ap[aA] = parseInt(az)
                            } else {
                                if (aA == "gems" || aA == "pcs" || aA == "forg" || aA == "know") {
                                    ap[aA] = az.split(":")
                                } else {
                                    if (aA == "who" || aA == "domain") {
                                        ap[aA] = az
                                    } else {
                                        if (aA == "when") {
                                            ap[aA] = new Date(parseInt(az))
                                        }
                                    }
                                }
                            }
                        }
                    };
                var ar = false;
                if (z.applyto & 1) {
                    an = 2;
                    al = 3;
                    if (ax.href.indexOf("http://") == 0 || ax.href.indexOf("https://") == 0) {
                        ao = 1;
                        ak = ax.href.match(/^http?:\/\/(.+?)?\.?(?:)\/\??(item|quest|spell|achievement|statistic|npc|object)=([0-9]+)/);
                        if (ak == null) {
                            ak = ax.href.match(/^https?:\/\/(.+?)?\.?(?:)\/\??(profile)=([^&#]+)/)
                        }
                        C = 0
                    } else {
                        ar = true;
                        ak = ax.href.match(/()\/\??(item|quest|spell|achievement|statistic|npc|object)=([0-9]+)/);
                        if (ak == null) {
                            ak = ax.href.match(/()\/\??(profile)=([^&#]+)/)
                        }
                        C = 1
                    }
                }
                if (ak == null && ax.rel && (z.applyto & 2)) {
                    ao = 0;
                    an = 1;
                    al = 2;
                    ak = ax.rel.match(/(item|quest|spell|achievement|statistic|npc|object).?([0-9]+)/);
                    if (ak == null) {
                        ak = ax.rel.match(/(profile).?([^&#]+)/)
                    }
                    C = 1
                }
                ax.href.replace(/([a-zA-Z]+)=?([a-zA-Z0-9:-]*)/g, aj);
                if (ax.rel) {
                    ax.rel.replace(/([a-zA-Z]+)=?([a-zA-Z0-9:-]*)/g, aj)
                }
                if (ap.gems && ap.gems.length > 0) {
                    var aq;
                    for (aq = Math.min(3, ap.gems.length - 1); aq >= 0; --aq) {
                        if (parseInt(ap.gems[aq])) {
                            break
                        }
                    }++aq;
                    if (aq == 0) {
                        delete ap.gems
                    } else {
                        if (aq < ap.gems.length) {
                            ap.gems = ap.gems.slice(0, aq)
                        }
                    }
                }
                if (ak) {
                    var aw, am = "www";
                    aa = ax;
                    if (ap.domain) {
                        am = ap.domain
                    } else {
                        if (ao && ak[ao]) {
                            am = ak[ao].split(".")[0]
                        } else {
                            if (ar) {
                                if ($WH.isset("g_beta") && g_beta) {
                                    am = "cata"
                                } else {
                                    if ($WH.isset("g_ptr") && g_ptr) {
                                        am = "ptr"
                                    } else {
                                        if ($WH.isset("g_old") && g_old) {
                                            am = "old"
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (c[am]) {
                        am = c[am]
                    }
                    aw = $WH.g_getLocaleFromDomain(am);
                    if (am == "ptr") {
                        aw = "ptr"
                    } else {
                        if (am == "beta" || am == "cata") {
                            aw = "beta"
                        }
                    }
                    K = am;
                    if (ax.href.indexOf("#") != -1 && document.location.href.indexOf(ak[an] + "=" + ak[al]) != -1) {
                        return
                    }
                    k = ((ax.parentNode.className.indexOf("icon") == 0 && ax.parentNode.nodeName == "DIV") ? 1 : 0);
                    if (!ax.onmouseout) {
                        if (k == 0) {
                            ax.onmousemove = a
                        }
                        ax.onmouseout = ac
                    }
                    r(at);
                    var av = $WH.g_getIdFromTypeName(ak[an]),
                        au = ak[al];
                    F(av, au, aw, ap)
                }
            }
            function B(al) {
                al = $WH.$E(al);
                var ak = al._target;
                var aj = 0;
                while (ak != null && aj < 5 && ad(ak, al) == -2323) {
                    ak = ak.parentNode;
                    ++aj
                }
            }
            function a(aj) {
                aj = $WH.$E(aj);
                r(aj);
                $WH.Tooltip.move(N, L, 0, 0, s, G)
            }
            function ac() {
                i = null;
                aa = null;
                $WH.Tooltip.hide()
            }
            function Y(aj, ak) {
                return (v && v.buff ? "buff" : "tooltip") + (ak ? ak : "") + "_" + e[aj]
            }
            function ai(aj) {
                return (v && v.buff ? "buff" : "") + "spells_" + e[aj]
            }
            function o(ak, am, al) {
                var aj = u[ak][0];
                if (aj[am] == null) {
                    aj[am] = {}
                }
                if (aj[am].status == null) {
                    aj[am].status = {}
                }
                if (aj[am].response == null) {
                    aj[am].response = {}
                }
                if (aj[am].status[al] == null) {
                    aj[am].status[al] = S
                }
            }
            function F(ak, ao, am, an) {
                if (!an) {
                    an = {}
                }
                var al = h(ao, an);
                i = ak;
                P = al;
                T = am;
                v = an;
                o(ak, al, am);
                var aj = u[ak][0];
                if (aj[al].status[am] == R || aj[al].status[am] == w) {
                    af(aj[al][Y(am)], aj[al].icon, aj[al].map, aj[al][ai(am)], aj[al][Y(am, 2)])
                } else {
                    if (aj[al].status[am] == Q || aj[al].status[am] == V) {
                        af(D.loading)
                    } else {
                        d(ak, ao, am, null, an)
                    }
                }
            }
            function d(at, an, au, al, ao) {
                var aj = h(an, ao);
                var aq = u[at][0];
                if (aq[aj].status[au] != S && aq[aj].status[au] != l) {
                    return
                }
                aq[aj].status[au] = Q;
                if (!al) {
                    aq[aj].timer = setTimeout(function () {
                        p.apply(this, [at, aj, au])
                    }, 333)
                }
                var am = "";
                for (var ap in ao) {
                    if (ap != "rand" && ap != "ench" && ap != "gems" && ap != "sock" && ap != "diff") {
                        continue
                    }
                    if (typeof ao[ap] == "object") {
                        am += "&" + ap + "=" + ao[ap].join(":")
                    } else {
                        if (ao[ap] === true) {
                            am += "&" + ap
                        } else {
                            am += "&" + ap + "=" + ao[ap]
                        }
                    }
                }
                var ar = $WH.g_getDomainFromLocale(au);
                if (au == "ptr") {
                    ar = "ptr"
                } else {
                    if (au == "beta") {
                        ar = "cata"
                    }
                }
                var ak = "";
                if (typeof g_dev == "undefined" || !g_dev) {
                    ak += document.location.protocol + "//" + ar + "." + document.domain
                } else {
                    if (window.location.hostname.indexOf("dev.wowhead.com") != -1) {
                        if (ar != "www" && window.location.hostname.indexOf(ar) != 0) {
                            ak += document.location.protocol + "//" + ar + "." + window.location.hostname
                        }
                    }
                }
                $WH.g_ajaxIshRequest(ak + wowheadUrl + "/" + u[at][1] + "=" + an + "&power" + am + "&pl=" + wowheadLocale);
                if (ag[at] && !ag[at][au]) {
                    $WH.g_ajaxIshRequest(ak + ag[at].url)
                }
            }
            function af(ao, au, aj, at, ar) {
                if (aa && aa._fixTooltip) {
                    ao = aa._fixTooltip(ao, i, P, aa)
                }
                var av = false;
                if (!ao) {
                    ao = u[i][2] + " not found :(";
                    au = "inv_misc_questionmark";
                    av = true
                } else {
                    if (v != null) {
                        if (v.forg && $WH.g_reforgeStats[v.forg]) {
                            var aq = $WH.g_reforgeStats[v.forg];
                            var ax = [aq.i1];
                            for (var an in $WH.g_individualToGlobalStat) {
                                if ($WH.g_individualToGlobalStat[an] == ax[0]) {
                                    ax.push(an)
                                }
                            }
                            var al;
                            if ((al = ao.match(new RegExp("(<!--(stat|rtg)(" + ax.join("|") + ")-->)[+-]?([0-9]+)"))) && !ao.match(new RegExp("<!--(stat|rtg)" + aq.i2 + "-->[+-]?[0-9]+"))) {
                                var aw = Math.floor(al[4] * aq.v),
                                    am = LANG.traits[aq.s2][0];
                                if (aq.i2 == 6) {
                                    ao = ao.replace("<!--rs-->", "<br />+" + aw + " " + am)
                                } else {
                                    ao = ao.replace("<!--rr-->", $WH.sprintfa(LANG.tooltip_genericrating, am.toLowerCase(), aq.i2, aw))
                                }
                                ao = ao.replace(al[0], al[1] + (al[4] - aw));
                                ao = ao.replace("<!--rf-->", '<span class="q2">' + $WH.sprintfa(LANG.tooltip_reforged, aw, LANG.traits[aq.s1][2], LANG.traits[aq.s2][2]) + "</span><br />")
                            }
                        }
                        if (v.pcs && v.pcs.length) {
                            var ay = P.match(/^(\d+)/);
                            ay = ay[1];
                            var ak = 0;
                            for (var an = 0, ap = v.pcs.length; an < ap; ++an) {
                                var al;
                                if (al = ao.match(new RegExp("<span><!--si([0-9]+:)*" + v.pcs[an] + '(:[0-9]+)*--><a href="/??item=(\\d+)">(.+?)</a></span>'))) {
                                    ao = ao.replace(al[0], '<span class="q8"><!--si' + v.pcs[an] + '--><a href="/item=' + al[3] + '">' + (($WH.isset("g_items") && g_items[v.pcs[an]]) ? g_items[v.pcs[an]]["name_" + e[T]] : al[4]) + "</a></span>");
                                    ++ak
                                }
                            }
                            if (ak > 0) {
                                ao = ao.replace("(0/", "(" + ak + "/");
                                ao = ao.replace(new RegExp("<span>\\(([0-" + ak + "])\\)", "g"), '<span class="q2">($1)')
                            }
                        }
                        if (v.know && v.know.length) {
                            ao = $WH.g_setTooltipSpells(ao, v.know, at)
                        }
                        if (v.lvl) {
                            ao = $WH.g_setTooltipLevel(ao, v.lvl, v.buff)
                        }
                        if (v.who && v.when) {
                            ao = ao.replace("<table><tr><td><br />", '<table><tr><td><br /><span class="q2">' + $WH.sprintf(D.achievementcomplete, v.who, v.when.getMonth() + 1, v.when.getDate(), v.when.getFullYear()) + "</span><br /><br />");
                            ao = ao.replace(/class="q0"/g, 'class="r3"')
                        }
                    }
                }
                if (v.map && aj && aj.getMap) {
                    ar = aj.getMap()
                }
                if (k == 1) {
                    $WH.Tooltip.setIcon(null);
                    $WH.Tooltip.show(aa, ao, null, null, null, ar)
                } else {
                    $WH.Tooltip.setIcon(au);
                    $WH.Tooltip.showAtXY(ao, N, L, s, G, ar)
                }
                if (W && $WH.Tooltip.logo) {
                    $WH.Tooltip.logo.style.display = (C ? "block" : "none")
                }
            }
            function p(ak, am, al) {
                if (i == ak && P == am && T == al) {
                    af(D.loading);
                    var aj = u[ak][0];
                    aj[am].timer = setTimeout(function () {
                        M.apply(this, [ak, am, al])
                    }, 3850)
                }
            }
            function M(ak, am, al) {
                var aj = u[ak][0];
                aj[am].status[al] = l;
                if (i == ak && P == am && T == al) {
                    af(D.noresponse)
                }
            }
            function h(ak, aj) {
                return ak + (aj.rand ? "r" + aj.rand : "") + (aj.ench ? "e" + aj.ench : "") + (aj.gems ? "g" + aj.gems.join(",") : "") + (aj.sock ? "s" : "")
            }
            this.loadScales = function (al, am) {
                var aj = u[al][0];
                for (var ak in e) {
                    if (am == ak || (!am && !isNaN(ak))) {
                        ag[al][ak] = 1;
                        for (var an in aj) {
                            if (aj[an].status[ak] == V && aj[an].response[ak]) {
                                aj[an].response[ak]()
                            }
                        }
                    }
                }
            };
            this.register = function (al, an, am, ak) {
                var aj = u[al][0];
                o(al, an, am);
                if (ag[al] && !ag[al][am]) {
                    aj[an].status[am] = V;
                    aj[an].response[am] = this.register.bind(this, al, an, am, ak);
                    return
                }
                if (aj[an].timer) {
                    clearTimeout(aj[an].timer);
                    aj[an].timer = null
                }
                if (!$WH.wowheadRemote && ak.map) {
                    if (aj[an].map == null) {
                        aj[an].map = new Mapper({
                            parent: $WH.ce("div"),
                            zoom: 3,
                            zoomable: false,
                            buttons: false
                        })
                    }
                    aj[an].map.update(ak.map);
                    delete ak.map
                }
                $WH.cO(aj[an], ak);
                if (aj[an].status[am] == Q || aj[an].status[am] == V) {
                    if (aj[an][Y(am)]) {
                        aj[an].status[am] = R
                    } else {
                        aj[an].status[am] = w
                    }
                }
                if (i == al && an == P && T == am) {
                    af(aj[an][Y(am)], aj[an].icon, aj[an].map, aj[an][ai(am)], aj[an][Y(am, 2)])
                }
            };
            this.registerNpc = function (al, ak, aj) {
                this.register(x, al, ak, aj)
            };
            this.registerObject = function (al, ak, aj) {
                this.register(n, al, ak, aj)
            };
            this.registerItem = function (al, ak, aj) {
                this.register(E, al, ak, aj)
            };
            this.registerQuest = function (al, ak, aj) {
                this.register(J, al, ak, aj)
            };
            this.registerSpell = function (al, ak, aj) {
                this.register(y, al, ak, aj)
            };
            this.registerAchievement = function (al, ak, aj) {
                this.register(q, al, ak, aj)
            };
            this.registerProfile = function (al, ak, aj) {
                this.register(m, al, ak, aj)
            };
            this.request = function (aj, an, al, am) {
                if (!am) {
                    am = {}
                }
                var ak = h(an, am);
                o(aj, ak, al);
                d(aj, an, al, 1, am)
            };
            this.requestItem = function (ak, aj) {
                this.request(E, ak, b.getId(), aj)
            };
            this.requestSpell = function (aj) {
                this.request(y, aj, b.getId())
            };
            this.getStatus = function (ak, am, al) {
                var aj = u[ak][0];
                if (aj[am] != null) {
                    return aj[am].status[al]
                } else {
                    return S
                }
            };
            this.getItemStatus = function (ak, aj) {
                this.getStatus(E, ak, aj)
            };
            this.getSpellStatus = function (ak, aj) {
                this.getStatus(y, ak, aj)
            };
            if (W) {
                this.set = function (aj) {
                    $WH.cO(z, aj)
                };
                this.showTooltip = function (al, aj, ak) {
                    r(al);
                    af(aj, ak)
                };
                this.hideTooltip = function () {
                    $WH.Tooltip.hide()
                };
                this.moveTooltip = function (aj) {
                    a(aj)
                }
            }
            ab()
        }
};