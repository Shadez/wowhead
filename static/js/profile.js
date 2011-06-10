function pr_setRegionRealm(e, h, g) {
    if (!e) {
        return
    }
    var d = e.elements.rg || e.elements[0],
        c = e.elements.sv || e.elements[1];
    if (!d || !c) {
        return
    }
    for (var b = 0, a = d.options.length; b < a; ++b) {
        if (d.options[b].value == h) {
            d.options[b].selected = true;
            break
        }
    }
    pr_onChangeRegion(e, h, g);
    if (c.onchange) {
        c.onchange()
    }
}
function pr_onChangeRegion(k, m, g) {
    if (!k) {
        return
    }
    var a = k.elements.rg || k.elements[0],
        l = k.elements.sv || k.elements[1];
    if (!a || !l) {
        return
    }
    var c = a.options[0];
    c.value = "";
    c.style.color = "#999999";
    $WH.ee(l);
    c = $WH.ce("option");
    c.value = "";
    c.style.color = "#999999";
    $WH.ae(l, c);
    if (l.onchange == null) {
        l.onchange = function () {
            this.className = (this.selectedIndex ? "" : "search-character")
        }
    }
    if (m == null) {
        m = a.options[a.selectedIndex].value
    }
    if (!m) {
        a.className = "search-character";
        l.className = "search-character";
        var c = $WH.ce("option");
        c.disabled = true;
        $WH.ae(c, $WH.ct(LANG.pr_selectregion));
        $WH.ae(l, c)
    } else {
        var d;
        a.className = "";
        l.className = "search-character";
        d = pr_getRealms(m);
        for (var e = 0, j = d.length; e < j; ++e) {
            var b = d[e],
                h = g_realms[b];
            c = $WH.ce("option");
            c.value = g_urlize(h.name, true);
            $WH.ae(c, $WH.ct(h.name));
            if (g != null && h.name == g) {
                l.className = "";
                c.selected = true
            }
            $WH.ae(l, c)
        }
    }
}
pr_onChangeRegion.C = {};

function pr_onChangeRace() {
    if ($("select[name=ra[]] option:selected").length) {
        $("select[name=si]").attr("disabled", true).val("")
    } else {
        $("select[name=si]").attr("disabled", false)
    }
}
function pr_suggestRealms(d, b, a) {
    a.empty();
    if (b.val().length >= 2) {
        var c = pr_getRealms(d.val(), b.val());
        if (c.length) {
            $.each(c, function (f, e) {
                a.append("<span>" + g_realms[e].name + "</span>")
            });
            b.removeClass("oops");
            a.show()
        } else {
            b.addClass("oops");
            a.hide()
        }
    } else {
        b.removeClass("oops");
        a.hide()
    }
}
function pr_highlightRealm(d, b, a) {
    var c = $("span", b),
        e = $(c.get(d - 1));
    c.removeClass("active");
    e.addClass("active");
    a.val(e.text()).focus()
}
function pr_getRealms(b, a) {
    if (pr_onChangeRegion.C[b] != null) {
        realms = pr_onChangeRegion.C[b]
    } else {
        realms = pr_onChangeRegion.C[b] = g_sortJsonArray(g_realms, g_realms, function (d, c) {
            return $WH.strcmp(g_realms[d].name, g_realms[c].name)
        }, function (c) {
            return c.region == b
        })
    }
    if (a != null) {
        realms = $WH.array_filter(realms, function (c) {
            return g_realms[c].name.toLowerCase().match(a.toLowerCase())
        })
    }
    return realms
}
function pr_updateStatus(div, characterId, request, tryAgain, partial) {
    if (tryAgain == null) {
        tryAgain = function (partial, noUpdate) {
            new Ajax(wowheadUrl + "/profile=resync&id=" + characterId, {
                method: "POST",
                onSuccess: function (xhr, opt) {
                    if (!noUpdate) {
                        pr_updateStatus(div, characterId, request, null, partial)
                    }
                }
            })
        }
    }
    new Ajax(wowheadUrl + "/profile=status&id=" + characterId + "&t=" + (new Date().getTime()), {
        onSuccess: function (xhr, opt) {
            var text = xhr.responseText;
            if (text.charAt(0) != "[" || text.charAt(text.length - 1) != "]") {
                return
            }
            var a = eval(text),
                processes = a[0],
                status = a[1],
                refresh = a[2],
                count = a[3],
                errcode = a[4],
                nresyncs = a[5],
                profile = (location.search || location.pathname).substr(1),
                duration;
            if (status == 3 && !nresyncs) {
                request = true
            }
            if (status && (status != 3 || request)) {
                duration = (count && processes ? g_formatTimeElapsed((count * 30 / processes) + 30) : LANG.pr_queue_unknown);
                count = (!isNaN(count) ? $WH.number_format(count) : LANG.pr_queue_unknown);
                div.innerHTML = ((status == 3 && !nresyncs) || partial ? LANG.pr_queue_partial : LANG.pr_queue_resyncreq);
                if (!processes) {
                    div.innerHTML += " " + LANG.pr_queue_noprocess
                }
                div.innerHTML += '<a id="close-profiler-notification" class="announcement-close" href="javascript:;" onclick="$(\'.profiler-message\').remove(); return false;">';
                div.innerHTML += "<br />" + (status < 3 && !refresh && !nresyncs ? LANG.pr_queue_addqueue : (status > 2 && errcode ? $WH.sprintf(LANG["pr_queue_status" + status + (status == 3 ? "p" : "")], LANG["pr_error_armory" + errcode], profile) : $WH.sprintf(LANG["pr_queue_status" + status], count, duration, profile)));
                div.style.backgroundImage = "";
                div.style.display = "";
                if (status == 4) {
                    var a = $WH.gE(div, "a")[1];
                    a.onclick = tryAgain;
                    div.style.backgroundImage = "none"
                } else {
                    if (refresh) {
                        setTimeout(pr_updateStatus.bind(null, div, characterId, request, tryAgain, partial), refresh)
                    } else {
                        if (!nresyncs) {
                            tryAgain(true, !processes)
                        } else {
                            div.style.backgroundImage = "none"
                        }
                    }
                }
            } else {
                div.style.display = "none"
            }
        }
    })
}
function pr_initRosterListview() {
    this.applySort();
    if (g_user.roles & (U_GROUP_ADMIN | U_GROUP_BUREAU)) {
        this.mode = 1;
        this.createCbControls = function (c, b) {
            if (!b && this.data.length < 15) {
                return
            }
            var a = $WH.ce("input");
            a.type = "button";
            a.value = LANG.button_resync;
            a.onclick = (function () {
                var e = this.getCheckedRows();
                if (!e.length) {
                    alert(LANG.message_nocharacterselected)
                } else {
                    var d = "";
                    $WH.array_walk(e, function (f) {
                        d += f.id + ","
                    });
                    d = $WH.rtrim(d, ",");
                    if (d != "") {
                        new Ajax(wowheadUrl + "/profile=resync&id=" + d)
                    }(Listview.cbSelect.bind(this, false))();
                    alert(LANG.message_characterresync)
                }
            }).bind(this);
            $WH.ae(c, a)
        }
    }
}
function pr_getGearScoreQuality(h, e, g, c, a) {
    var f, b = 0,
        d = 5;
    if (!e) {
        return 0
    }
    if (c == null) {
        b = 12.25390625;
        if (h < 55) {
            if (g) {
                b -= 81 / 256
            }
            b -= 18 / 16;
            if (h < 25) {
                b -= 25 / 16;
                if (h < 20) {
                    b -= 30 / 16
                }
            }
        }
    } else {
        switch (c) {
        case 1:
        case 5:
        case 7:
        case 16:
        case 17:
            b = 1;
            break;
        case 3:
        case 10:
        case 6:
        case 8:
            b = 3 / 4;
            break;
        case 9:
        case 2:
        case 15:
        case 11:
        case 12:
        case 13:
        case 14:
            b = 9 / 16;
            break;
        case 18:
            b = 81 / 256;
            break
        }
        if (a) {
            b *= 2
        }
    }
    if (h > 80) {
        f = (((h - 80) * 31.8) + 200) * 1.67
    } else {
        if (h >= 70) {
            f = ((h - 70) * 9.5) + 105
        } else {
            if (h >= 60) {
                f = ((h - 60) * 4.5) + 60
            } else {
                f = h + 5
            }
        }
    }
    while (e < Math.floor(((b * f) / ((6 - d) * 0.6))) && d > 0) {
        d = Math.ceil(d) - 1
    }
    return Math.ceil(d)
}
function pr_getSpecFromTalents(c, g) {
    var a = 0;
    if (g == null || (g[0] == 0 && g[1] == 0 && g[2] == 0)) {
        a = -1
    } else {
        if (g[0] - g[1] > 5 && g[0] - g[2] > 5) {
            a = 1
        } else {
            if (g[1] - g[0] > 5 && g[1] - g[2] > 5) {
                a = 2
            } else {
                if (g[2] - g[0] > 5 && g[2] - g[1] > 5) {
                    a = 3
                }
            }
        }
    }
    var f;
    var d;
    if (a <= 0) {
        f = g_chr_specs[a];
        if (a == -1) {
            d = "spell_shadow_sacrificialshield"
        } else {
            d = "spell_nature_elementalabsorption"
        }
    } else {
        f = g_chr_specs[c][a - 1];
        if (wt_presets && wt_presets[c] && wt_presets[c].pve) {
            var b = 1;
            for (var e in wt_presets[c].pve) {
                if (b++ == a) {
                    d = wt_presets[c].pve[e].__icon;
                    break
                }
            }
        }
    }
    return {
        id: a,
        name: f || "",
        icon: d || ""
    }
}
function pr_getScaleFromSpec(e, c, a) {
    var d = wt_presets[e].pve,
        b = [];
    for (var f in d) {
        b.push(a ? LANG.presets[f] : d[f])
    }
    return (a ? b[c] : $WH.dO(b[c]))
}
function pr_getScaleFilter(h) {
    var d = [];
    if (h) {
        for (var e = 0, c = fi_filters.items.length; e < c; ++e) {
            var g = fi_filters.items[e];
            if (LANG.traits[g.name] && h[g.name]) {
                d.push([g.id, h[g.name]])
            }
        }
    }
    d.sort(function (i, f) {
        return -$WH.strcmp(i[1], f[1])
    });
    var b = [],
        a = [];
    for (var e = 0, c = d.length; e < c; ++e) {
        b.push(d[e][0]);
        a.push(d[e][1])
    }
    if (b.length && a.length) {
        return ";gm=4;rf=1;wt=" + b.join(":") + ";wtv=" + a.join(":")
    }
    return ""
}
function pr_showClassPresetMenu(o, s, q, n, b) {
    var e = [
        [, LANG.menu_chooseclassspec]
    ];
    if (s && q && n) {
        if (g_user.weightscales && g_user.weightscales.length) {
            var r = [0, LANG.ficustom, , []];
            e.push(r);
            for (var h = 0, k = g_user.weightscales.length; h < k; ++h) {
                var f = g_user.weightscales[h];
                r[3].push([f.id, f.name, wowheadUrl + "/items=" + q + "?filter=cr=161;crs=1;crv=0" + pr_getScaleFilter(f) + (q == 2 ? ";gb=1" : "") + ";upg=" + s + (q == 2 && g_item_slots[n] ? "#" + g_urlize(g_item_slots[n]) : "")])
            }
        }
        for (var l in wt_presets) {
            var r = [l, g_chr_classes[l], , [],
            {
                className: "c" + l,
                tinyIcon: "class_" + g_file_classes[l]
            }];
            e.push(r);
            var g = 0;
            for (var d in wt_presets[l].pve) {
                r[3].push([g, LANG.presets[d], wowheadUrl + "/items=" + q + "?filter=ub=" + l + ";cr=161;crs=1;crv=0" + pr_getScaleFilter(wt_presets[l].pve[d]) + (q == 2 ? ";gb=1" : "") + ";upg=" + s + (q == 2 && g_item_slots[n] ? "#" + g_urlize(g_item_slots[n]) : ""), ,
                {
                    tinyIcon: wt_presets[l].pve[d].__icon
                }]);
                g++
            }
        }
        var m = $WH.g_getCursorPos(b);
        Menu.sort(e);
        Menu.showAtXY(e, m.x, m.y)
    }
}
function pr_addEquipButton(b, a) {
    $.each(g_user.characters, function (c, e) {
        if (e.pinned) {
            var d = RedButton.create(LANG.button_equip, true, function () {
                location.href = g_getProfileUrl(e) + "&items=" + a
            });
            g_addTooltip(d, LANG.tooltip_equip, (($WH.isset("g_thottbot") && g_thottbot) ? "w" : "q1"));
            $("#" + b).append(d);
            return
        }
    })
}
function pr_onBreadcrumbUpdate() {
    var j = PageTemplate.get("breadcrumb");
    if (!j || j.length != 6) {
        return
    }
    var h = Menu.getFullPath(mn_path, j);
    var c = h[h.length - 1];
    var e = PageTemplate.expandBreadcrumb()[0];
    var g = $WH.ce("form"),
        d = $WH.ce("input"),
        b = $WH.ce("a");
    e.className = "profiler-charlookup";
    g.onsubmit = pr_DirectLookup.bind(0, g, false);
    d.name = "na";
    d.className = "search-character";
    d.type = "text";
    d.onfocus = function () {
        this.className = ""
    };
    d.onblur = function () {
        if ($WH.trim(this.value) == "") {
            this.className = "search-character";
            this.value = ""
        }
    };
    b.className = "profiler-charlookup-go";
    b.href = "javascript:;";
    b.onclick = g.onsubmit.bind(g);
    $WH.ae(g, d);
    $WH.ae(g, b);
    $WH.ae(e, g)
}
function pr_DirectLookup(c, a) {
    var i = $('*[name="rg"]', c),
        d = $('*[name="sv"]', c),
        b = $('*[name="na"]', c),
        e;
    if (i.length > 1) {
        i = $('*[name="rg"]:checked', c)
    }
    if (a) {
        if (i.val() || d.val() || b.val()) {
            location.href = wowheadUrl + "/profiles" + (i.val() ? "=" + i.val() + (d.val() ? "." + g_urlize(d.val()) : "") : "") + (b.val() ? "?filter=na=" + b.val() + ";ex=on" : "")
        }
        return false
    }
    var f = PageTemplate.get("breadcrumb");
    if (e = (f && f.length == 6)) {
        var h = Menu.getFullPath(mn_path, f),
            g = h[h.length - 1]
    }
    if (!b.val()) {
        alert(LANG.message_missingcharacter);
        b.focus().addClass("oops");
        return false
    }
    if (!i.val() && !e) {
        alert(LANG.message_missingregion);
        i.focus().addClass("oops");
        return false
    }
    if (!d.val() && !e) {
        alert(LANG.message_missingrealm);
        d.focus().addClass("oops");
        return false
    }
    if (i.val() && d.val()) {
        e = false
    }
    location.href = (e ? g[2].replace("profiles", "profile") : wowheadUrl + "/profile=" + i.val() + "." + g_urlize(d.val())) + "." + g_cleanCharacterName(b.val());
    return false
}
function pr_lookupOrSearch(c) {
    if (!c) {
        if ($('input[name="sv"]').val()) {
            var a = $('input[name="sv"]').val().toLowerCase(),
                b = false;
            $.each(g_realms, function (e, d) {
                if (d.name.toLowerCase() == a) {
                    b = true
                }
            });
            if (!b) {
                alert(LANG.message_missingrealm);
                $('input[name="sv"]').focus().addClass("oops");
                return
            }
        }
        c = ($('input[name="na"]').val() && $('input[name="sv"]').val())
    }
    pr_DirectLookup($(".profiler-home"), !c)
}
function pr_initProfilerHome() {
    $('input[name="na"]').keyup(function (a) {
        $(this).removeClass("oops");
        if (a.keyCode == 13) {
            pr_lookupOrSearch(false)
        }
    }).focus();
    $('input[type="radio"]').change(function () {
        $("label").removeClass("selected");
        $('label[for="' + $(this).attr("id") + '"]').addClass("selected");
        pr_suggestRealms($('input[name="rg"]:checked'), $('input[name="sv"]'), $(".profiler-autocomplete"));
        $('input[name="sv"]').focus()
    });
    $('input[name="sv"]').keyup(function (a) {
        switch (a.keyCode) {
        case 13:
            $(".profiler-autocomplete").hide();
            pr_lookupOrSearch(false);
            break;
        case 27:
            $(".profiler-autocomplete").hide();
            break;
        case 38:
            selectedRealm--;
            if (selectedRealm < 0) {
                selectedRealm = $(".profiler-autocomplete span").length - 1
            }
            pr_highlightRealm(selectedRealm, $(".profiler-autocomplete"), $('input[name="sv"]'));
            break;
        case 40:
            selectedRealm++;
            if (selectedRealm >= $(".profiler-autocomplete span").length) {
                selectedRealm = 0
            }
            pr_highlightRealm(selectedRealm, $(".profiler-autocomplete"), $('input[name="sv"]'));
            break;
        default:
            pr_suggestRealms($('input[name="rg"]:checked'), $('input[name="sv"]'), $(".profiler-autocomplete"));
            selectedRealm = 0;
            break
        }
    });
    $(".profiler-autocomplete").delegate("span", "mouseover", function () {
        $(".profiler-autocomplete span").removeClass("active")
    }).delegate("span", "click", function () {
        $('input[name="sv"]').val($(this).text()).focus();
        $(".profiler-autocomplete").hide()
    });
    $("#profiler-lookup, #profiler-search").click(function (a) {
        pr_lookupOrSearch(this.id == "profiler-lookup")
    });
    $("body").click(function () {
        $(".profiler-autocomplete").hide()
    })
}
if ($WH.isset("mn_profiles")) {
    Menu.findItem(mn_path, [1, 5, 0])[MENU_IDX_SUB] = mn_profiles;
    PageTemplate.getBreadcrumb().bind("update", pr_onBreadcrumbUpdate)
};