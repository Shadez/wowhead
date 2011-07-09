var $WowheadTalentCalculator;

function TalentCalc() {
    var bp = 0,
        aZ = 1,
        aT = 10,
        aL = 85,
        al = 85,
        I = 87,
        bh = this,
        y, W = {},
        bi = {},
        R = {},
        k, aU, Y, bq, aW = -1,
        au = -1,
        T = 0,
        ar, aF = false,
        S = false,
        aS, B, bj, aq, az, D = [3, 1, 2],
        aC = {
            1: [],
            2: [],
            3: []
        },
        av, ba, bg, aE, w = 0,
        aa, ad, aj = aL,
        F, aG, n, a2, A, aV, aJ, ae, g, u = {},
        J = {},
        f, E, bm, ai, a8, am, aY, P, ao, t, Q = [],
        X, aP = [],
        aO = [],
        a4 = [],
        p, ax = "0zMcmVokRsaqbdrfwihuGINALpTjnyxtgevElBCDFHJKOPQSUWXYZ123456789",
        V = "Z",
        aX, G = {};
    this.getTalentTrees = function () {
        return W[aW]
    };
    this.addGlyph = function (bw) {
        if (bw) {
            aK(ar, bw)
        } else {
            an(ar)
        }
        Lightbox.hide()
    };
    this.getBlizzBuild = function () {
        if (aW == -1) {
            return
        }
        var bz = W[aW],
            by = "";
        for (var bw = 0; bw < B; ++bw) {
            for (var bx = 0; bx < bz[bw].t.length; ++bx) {
                by += bz[bw].t[bx].k
            }
        }
        by = $WH.rtrim(by, "0");
        return by
    };
    this.getBlizzGlyphs = function () {
        if (aW == -1) {
            return
        }
        var by = W[aW],
            bw = "";
        for (var bx = 0; bx < aq; ++bx) {
            if (bx > 0) {
                bw += ":"
            }
            if (by.glyphs[bx]) {
                bw += by.glyphs[bx]
            } else {
                bw += "0"
            }
        }
        return bw
    };
    this.getGlyphs = function () {
        var bw = [];
        if (aW != -1) {
            var by = W[aW];
            if (by) {
                for (var bx = 0; bx < aq; ++bx) {
                    if (by.glyphs[bx]) {
                        bw.push(g_glyphs[by.glyphs[bx]])
                    }
                }
            }
        }
        return bw
    };
    this.getSpentFromBlizzBuild = function (bD, bB) {
        var bC = W[bB],
            bA = [0, 0, 0];
        if (bC) {
            var bE = 0,
                bw = 0;
            if (bB == 8 && bD.length == 62) {
                bD = bD.substr(0, 15) + bD.substr(16)
            }
            for (var bz = 0; bz < bD.length; ++bz) {
                var bx = Math.min(parseInt(bD.charAt(bz)), bC[bE].t[bw].m);
                if (isNaN(bx)) {
                    continue
                }
                for (var by = 0; by < bx; ++by) {
                    ++bA[bE]
                }
                if (++bw > bC[bE].t.length - 1) {
                    bw = 0;
                    if (++bE > B - 1) {
                        break
                    }
                }
            }
        }
        return bA
    };
    this.getTalents = function () {
        var bx = [];
        if (aW != -1) {
            var by = W[aW];
            if (by) {
                for (var bw = 0; bw < B; ++bw) {
                    for (i = 0; i < by[bw].t.length; ++i) {
                        if (by[bw].t[i].k) {
                            bx.push(by[bw].t[i])
                        }
                    }
                }
            }
        }
        return bx
    };
    this.getTalentRanks = function (bw) {
        if (aW == -1) {
            return
        }
        if (R[bw]) {
            return R[bw].k
        }
        return 0
    };
    this.getWhBuild = function () {
        if (aW == -1) {
            return
        }
        var bB = W[aW],
            bx = "",
            bA, bz;
        for (var bw = 0; bw < B; ++bw) {
            bA = "";
            for (bz = 0; bz < bB[bw].t.length; ++bz) {
                bA += bB[bw].t[bz].k
            }
            bA = $WH.rtrim(bA, "0");
            bx += C(bA);
            bz = bA.length;
            if (bz % 2 == 1) {
                ++bz
            }
            if (bz < bB[bw].t.length) {
                bx += V
            }
        }
        var by;
        if (aS == aZ) {
            by = ax.charAt(Math.floor(aW / 10)) + ax.charAt((2 * (aW % 10)) + (w ? 1 : 0))
        } else {
            by = ax.charAt(aN(aW) * 3 + (w ? 1 : 0))
        }
        by += $WH.rtrim(bx, V);
        return by
    };
    this.getWhGlyphs = function () {
        if (aW == -1) {
            return
        }
        var bD = W[aW],
            by = {};
        for (var bC = 0; bC < aq; ++bC) {
            var bB = a0(bC);
            if (by[bB] == null) {
                by[bB] = ""
            }
            if (bD.glyphs[bC]) {
                by[bB] += ax.charAt(g_glyphs[bD.glyphs[bC]].index)
            }
        }
        var bA = "",
            bx = 0;
        for (var bz = 0, bw = D.length; bz < bw; ++bz) {
            var bB = D[bz];
            bx += aC[bB].length;
            if (by[bB]) {
                bA += by[bB]
            }
            if (bA.length < bx) {
                bA += V
            }
        }
        bA = $WH.rtrim(bA, V);
        return bA
    };
    this.getInGamePreview = function () {
        if (aW == -1) {
            return
        }
        var bC = W[aW],
            bB = [],
            bA = {};
        for (var bw = 0; bw < B; ++bw) {
            bA[bw] = [bw + 1];
            for (var bz = 0; bz < bC[bw].t.length; ++bz) {
                var by = bC[bw].t[bz].k;
                if (by > 0) {
                    bA[bw].push(((bz + 1) * 10) + by)
                }
            }
            if (bw == bC.masteryTree) {
                bB.splice(0, 0, bw)
            } else {
                bB.push(bw)
            }
        }
        var bx = "/run t,p,a={";
        for (var bz = 0; bz < bB.length; ++bz) {
            bx += bA[bB[bz]].join(",") + ","
        }
        bx += "}SetPreviewPrimaryTalentTree(t[1],GetActiveTalentGroup())for i=1,#t do a=t[i]if a<9 then p=a else AddPreviewTalentPoints(p,floor(a/10),a%10)end end";
        prompt(LANG.prompt_ingamepreview, bx)
    };
    this.initialize = function (bx, bw) {
        if (F) {
            return
        }
        bx = $WH.ge(bx);
        if (!bx) {
            return
        }
        F = bx;
        F.className = "talentcalc";
        if (bw == null) {
            bw = {}
        }
        y = bw;
        if (y.onChange) {
            aX = y.onChange
        }
        if (y.mode == aZ) {
            aS = aZ;
            B = 1;
            bj = 6;
            av = 3;
            ba = 17;
            aE = 0;
            aa = 4;
            bg = g_pet_families;
            F.className += " talentcalc-pet";
            L(0)
        } else {
            aS = bp;
            B = 3;
            bj = 7;
            aC = {
                1: [25, 50, 75],
                2: [25, 50, 75],
                3: [25, 50, 75]
            };
            av = 5;
            ba = 36;
            aE = 31;
            aa = 5;
            bg = g_chr_classes;
            ba = 41;
            aa = 0;
            F.className += " talentcalc-default";
            $WowheadTalentCalculator = bh;
            L($WH.isset("g_beta") ? al : aL);
            s()
        }
        ad = ba + w;
        f = $WH.ce("div");
        f.className = "talentcalc-wrapper";
        $WH.ae(F, f);
        m();
        bs();
        aw();
        ac();
        aH();
        at();
        if (y.whBuild) {
            a3(y.whBuild)
        } else {
            if (y.classId > 0 && bg[y.classId]) {
                if (y.blizzBuild) {
                    ab(y.classId, y.blizzBuild)
                } else {
                    v(y.classId)
                }
            }
        }
        if (y.whGlyphs) {
            N(y.whGlyphs)
        } else {
            if (y.blizzGlyphs) {
                br(y.blizzGlyphs)
            }
        }
    };
    this.promptBlizzBuild = function () {
        if (aS == aZ) {
            return
        }
        var by, bw = prompt(LANG.prompt_importblizz, "");
        if (!bw) {
            return
        }
        if (bw.match(/\?cid=([0-9]+)&tal=([0-9]+)/)) {
            by = parseInt(RegExp.$1);
            ab(by, RegExp.$2);
            return
        } else {
            var bz = bw.indexOf("?tal=");
            if (bz != -1) {
                for (var bx in g_file_classes) {
                    if (bw.indexOf(g_file_classes[bx]) != -1) {
                        by = parseInt(bx);
                        break
                    }
                }
                if (by) {
                    ab(by, bw.substring(bz + 5));
                    return
                }
            }
        }
        alert(LANG.alert_invalidurl)
    };
    this.promptWhBuild = function () {
        var bx = prompt(LANG.prompt_importwh, "");
        if (!bx) {
            return
        }
        var bD = bx.indexOf("#");
        if (bD != -1) {
            var bB = bx.substr(bD);
            if (bB.indexOf("-") != -1) {
                var bA = bB.substr(1).split("-"),
                    bw = bA[0] || "",
                    bz = bA[1] || "",
                    bC = -1;
                for (var by in g_file_classes) {
                    if (g_file_classes[by] == bw) {
                        bC = by;
                        break
                    }
                }
                if (bC != -1) {
                    ab(bC, bz)
                }
            } else {
                var bA = bB.substr(1).split(":"),
                    bE = bA[0] || "",
                    bF = bA[1] || "";
                a3(bE);
                N(bF)
            }
        }
    };
    this.registerClass = function (bx, bw) {
        ag(bx, bw)
    };
    this.reset = function (bw) {
        if (aW == -1) {
            return
        }
        if (bw > B - 1) {
            return
        }
        S = false;
        bc(bw, aW, true)
    };
    this.resetAll = function () {
        if (!W[aW]) {
            return
        }
        S = false;
        aB(aW);
        af()
    };
    this.resetBuild = function () {
        if (!W[aW]) {
            return
        }
        S = false;
        bo(aW);
        e(aW);
        af()
    };
    this.resetGlyphs = function () {
        a1();
        af()
    };
    this.setBlizzBuild = function (bw, bx) {
        ab(bw, bx)
    };
    this.setBlizzGlyphs = function (bw) {
        if (aW == -1) {
            return
        }
        br(bw)
    };
    this.setBonusPoints = function () {
        q(-1, aa)
    };
    this.getBonusPoints = function (bw) {
        return w
    };
    this.setClass = function (bw) {
        return v(bw)
    };
    this.setLevelCap = function (bw) {
        bu(bw)
    };
    this.setLock = function (bw) {
        if (aW == -1) {
            return
        }
        ay(bw)
    };
    this.setWhBuild = function (bw) {
        return a3(bw)
    };
    this.setWhGlyphs = function (bw) {
        if (aW == -1) {
            return
        }
        N(bw)
    };
    this.showSummary = function (bA) {
        if (aW == -1) {
            return
        }
        var bB = W[aW],
            by, bx, bw, bz = "<html><head><title>" + document.title + '</title></head><body style="font-family: Arial, sans-serif; font-size: 13px">';
        if (bA) {
            bz += "<h2>";
            if (aS == aZ) {
                bz += $WH.sprintf(LANG.tc_printh, a7(), g_pet_families[bB.n])
            } else {
                bz += $WH.sprintf(LANG.tc_printh, a7(), g_chr_classes[bB.n]) + " (" + bB[0].k + "/" + bB[1].k + "/" + bB[2].k + ")"
            }
            bz += "</h2>";
            bz += "<p></p>";
            for (by = 0; by < B; ++by) {
                bz += "<h3>" + bB[by].n + " (" + bB[by].k + " " + LANG[bB[by].k == 1 ? "tc_point" : "tc_points"] + ")</h3>";
                bz += "<blockquote>";
                bw = 0;
                for (bx = 0; bx < bB[by].t.length; ++bx) {
                    if (bB[by].t[bx].k) {
                        if (bw) {
                            bz += "<br /><br />"
                        }
                        bz += "<b>" + bB[by].t[bx].n + "</b>" + LANG.hyphen + $WH.sprintf(LANG.tc_rank, bB[by].t[bx].k, bB[by].t[bx].m) + "<br />";
                        bz += aI(bB[by].t[bx]);
                        ++bw
                    }
                }
                if (bw == 0) {
                    bz += LANG.tc_none
                }
                bz += "</blockquote>"
            }
            bz += "<h3>" + LANG.tc_glyphs + "</h3>";
            bz += "<blockquote>";
            glyphCount = 0;
            for (by = 0; by < aq; ++by) {
                glyph = g_glyphs[bB.glyphs[by]];
                if (glyph) {
                    if (glyphCount) {
                        bz += "<br /><br />"
                    }
                    bz += "<b>" + glyph.name + "</b> ";
                    bz += "(" + LANG["tc_glyph" + glyph.type] + ")<br />";
                    bz += glyph.description;
                    glyphCount++
                }
            }
            if (glyphCount == 0) {
                bz += LANG.tc_none
            }
            bz += "</blockquote>"
        } else {
            bz += "<pre>";
            for (by = 0; by < B; ++by) {
                bz += "<b>" + bB[by].n + " (" + bB[by].k + " " + LANG[bB[by].k == 1 ? "tc_point" : "tc_points"] + ")</b>\n\n";
                bw = 0;
                for (bx = 0; bx < bB[by].t.length; ++bx) {
                    if (bB[by].t[bx].k) {
                        bz += "&nbsp;&nbsp;&nbsp;&nbsp;" + bB[by].t[bx].k + "/" + bB[by].t[bx].m + " " + bB[by].t[bx].n + "\n";
                        ++bw
                    }
                }
                if (bw == 0) {
                    bz += "&nbsp;&nbsp;&nbsp;&nbsp;" + LANG.tc_none + "\n"
                }
                bz += "\n"
            }
            bz += "</pre>"
        }
        bz += "</body></html>";
        talentSummary = bz;
        window.open(wowheadUrl + "/talent=summary", "", "toolbar=no,menubar=yes,status=yes,scrollbars=yes,resizable=yes")
    };
    this.simplifyGlyphName = function (bw) {
        return aM(bw)
    };
    this.toggleLock = function () {
        if (aW == -1) {
            return
        }
        x()
    };

    function aK(bz, bx, bw) {
        var by = W[aW];
        glyph = g_glyphs[bx];
        if (glyph && r(bz, glyph)) {
            if (by.glyphs[bz]) {
                by.glyphItems[by.glyphs[bz]] = 0
            }
            by.glyphs[bz] = bx;
            by.glyphItems[bx] = 1;
            if (!bw) {
                bf(bz);
                af()
            }
        }
    }
    function z() {
        var bA = W[aW];
        if (bA.k > ad) {
            for (var bw = B - 1; bw >= 0; --bw) {
                for (var bz = bA[bw].t.length - 1; bz >= 0; --bz) {
                    var bx = bA[bw].t[bz].k;
                    for (var by = 0; by < bx; ++by) {
                        l(bA[bw].t[bz]);
                        if (bA.k <= ad) {
                            return
                        }
                    }
                }
            }
        }
    }
    function K(bx, bw) {
        q(-1, (w ? 0 : aa));
        aD(bx, bw)
    }
    function aD(bx, bw) {
        if (aS == aZ) {
            $WH.Tooltip.showAtCursor(bw, LANG[w ? "tc_rembon" : "tc_addbon"], null, null, "q")
        }
    }
    function o(bx, bw) {
        bu(prompt($WH.sprintf(LANG.prompt_ratinglevel, aT, al), aj));
        bd(bx, bw);
        af()
    }
    function bd(bx, bw) {
        $WH.Tooltip.showAtCursor(bw, LANG.tooltip_changelevel, null, null, "q")
    }
    function bn(bw, bx) {
        if (a7() < 80) {
            bw += '<br /><br /><span class="q0">' + LANG.tc_masterytiptrain + "</span>"
        }
        $WH.Tooltip.showAtCursor(bx, bw, null, null, "q")
    }
    function bb(bw, bz, bA) {
        var bB = $WH.ce("div"),
            by, bx;
        bB.className = "talentcalc-arrow";
        switch (bw) {
        case 0:
            bz = 15;
            by = a5(1, 2);
            by.className = "talentcalc-arrow-down";
            bx = by.firstChild.childNodes[0].childNodes[0].style;
            bx.width = "15px";
            bx.height = "4px";
            bx = by.firstChild.childNodes[1].childNodes[0].style;
            bx.backgroundPosition = "bottom";
            bx.height = (bA - 4) + "px";
            break;
        case 1:
            by = a5(2, 2, true);
            by.className = "talentcalc-arrow-leftdown";
            bx = by.firstChild.childNodes[0].childNodes[0].style;
            bx.backgroundPosition = "left";
            bx.width = (bz - 4) + "px";
            bx.height = "11px";
            bx = by.firstChild.childNodes[0].childNodes[1].style;
            bx.backgroundPosition = "right";
            bx.width = "4px";
            bx = by.firstChild.childNodes[1].childNodes[0].style;
            bx.backgroundPosition = "bottom left";
            bx.backgroundRepeat = "no-repeat";
            bx.height = (bA - 11) + "px";
            break;
        case 2:
            by = a5(2, 2, true);
            by.className = "talentcalc-arrow-rightdown";
            bx = by.firstChild.childNodes[0].childNodes[0].style;
            bx.backgroundPosition = "left";
            bx.width = "4px";
            bx = by.firstChild.childNodes[0].childNodes[1].style;
            bx.backgroundPosition = "right";
            bx.width = (bz - 4) + "px";
            bx.height = "11px";
            bx = by.firstChild.childNodes[1].childNodes[0].style;
            bx.backgroundPosition = "bottom right";
            bx.backgroundRepeat = "no-repeat";
            bx.height = (bA - 11) + "px";
            break;
        case 3:
            bA = 15;
            by = a5(2, 1);
            by.className = "talentcalc-arrow-right";
            bx = by.firstChild.childNodes[0].childNodes[0].style;
            bx.backgroundPosition = "left";
            bx.width = "4px";
            bx = by.firstChild.childNodes[0].childNodes[1].style;
            bx.backgroundPosition = "right";
            bx.width = (bz - 4) + "px";
            break;
        case 4:
            bA = 15;
            by = a5(2, 1);
            by.className = "talentcalc-arrow-left";
            bx = by.firstChild.childNodes[0].childNodes[0].style;
            bx.backgroundPosition = "left";
            bx.width = (bz - 4) + "px";
            bx = by.firstChild.childNodes[0].childNodes[1].style;
            bx.backgroundPosition = "right";
            bx.width = "4px";
            break
        }
        bB.style.width = bz + "px";
        bB.style.height = bA + "px";
        $WH.ae(bB, by);
        return bB
    }
    function ac() {
        ao = $WH.ce("div");
        ao.className = "talentcalc-masteries";
        ao.style.display = "none";
        var bw = $WH.ce("div");
        bw.className = "clear";
        $WH.ae(ao, bw);
        $WH.ae(f, ao)
    }
    function at() {
        t = RedButton.create(LANG.tc_viewtalents, true);
        if (aE <= 0) {
            t.style.display = "none"
        }
        t.style.marginTop = "3px";
        t.style.display = "none";
        RedButton.setFunc(t, a9.bind(null, 1));
        $WH.ae(f, t)
    }
    function aw() {
        var bz, bB, by;
        X = $WH.ce("div");
        X.className = "talentcalc-treenames";
        X.style.display = "none";
        for (var bx = 0; bx < B; ++bx) {
            bz = $WH.ce("div");
            bz.className = "talentcalc-treenames-tree" + (bx + 1);
            aP[bx] = bB = $WH.ce("p");
            bB.icon = Icon.create(null, 1);
            bB.className = "locked";
            $WH.ae(bB, bB.icon);
            var bA = $WH.ce("span");
            var bw = $WH.ce("b");
            aO[bx] = bA;
            a4[bx] = bw;
            $WH.ae(bA, bw);
            $WH.ae(bB, bA);
            by = $WH.ce("a");
            by.href = "javascript:;";
            by.onclick = bh.reset.bind(null, bx);
            g_addTooltip(by, LANG.tc_resettree);
            $WH.ae(bB, by);
            by = $WH.ce("em");
            $WH.ae(bB, by);
            $WH.ae(bz, bB);
            $WH.ae(X, bz)
        }
        $WH.ae(f, X)
    }
    function aH() {
        p = $WH.ce("div");
        p.className = "talentcalc-main";
        var bw = $WH.ce("div");
        bw.className = "clear";
        $WH.ae(p, bw);
        $WH.ae(f, p)
    }
    function j() {
        if (aS != aZ) {
            return
        }
        _divModel = $WH.ce("div");
        _divModel.className = "talentcalc-model";
        _swfModel = $WH.ce("div");
        _swfModel.id = "shg09yrhlnk";
        $WH.ae(_divModel, _swfModel);
        var bw = $WH.ce("div");
        bw.className = "clear";
        $WH.ae(_divModel, bw);
        $WH.ae(f, _divModel)
    }
    function bv(bD) {
        var bB = [{}],
            bw, bE;
        for (var bA = 0, bC = g_pet_talents.length; bA < bC; ++bA) {
            var bx = g_pet_talents[bA];
            if ($WH.in_array(bx.f, bD) >= 0) {
                bB[0].n = bx.n;
                bB[0].t = [];
                bB[0].i = bA;
                bB[0].icon = bx.icon;
                for (var bz = 0, by = bx.t.length; bz < by; ++bz) {
                    bw = bx.t[bz];
                    bE = bB[0].t[bz] = {};
                    $WH.cO(bE, bw);
                    if (bw.f && $WH.in_array(bw.f, bD) == -1) {
                        bE.hidden = true
                    }
                }
                break
            }
        }
        return bB
    }
    function m() {
        var bH, bP, bB, bN;
        aG = $WH.ce("div");
        aG.className = "talentcalc-sidebar";
        bH = $WH.ce("div");
        bH.className = "talentcalc-sidebar-inner";
        bP = $WH.ce("a");
        bP.className = "talentcalc-button-help icon-help";
        bP.href = (aS == aZ ? "http://petopia.brashendeavors.net/html/patch30/patch30faq_talents.php" : wowheadUrl + "/help=talent-calculator");
        bP.target = "_blank";
        $WH.ae(bP, $WH.ct(LANG.tc_help));
        $WH.ae(bH, bP);
        n = $WH.ce("div");
        n.className = "talentcalc-sidebar-controls";
        n.style.display = "none";
        bP = $WH.ce("a");
        bP.className = "talentcalc-button-reset icon-delete";
        bP.href = "javascript:;";
        bP.onclick = bh.resetAll;
        $WH.ae(bP, $WH.ct(LANG.tc_resetall));
        $WH.ae(n, bP);
        bP = A = $WH.ce("a");
        bP.className = "icon-lock";
        bP.href = "javascript:;";
        bP.onclick = x;
        $WH.ae(bP, $WH.ct(LANG.tc_lock));
        $WH.ae(n, bP);
        bP = $WH.ce("div");
        bP.className = "clear";
        $WH.ae(n, bP);
        $WH.ae(bH, n);
        bP = $WH.ce("div");
        bP.className = "talentcalc-sidebar-controls2";
        bB = $WH.ce("a");
        bB.className = "talentcalc-button-import";
        bB.href = "javascript:;";
        bB.onclick = (y.profiler ? bh.promptWhBuild : bh.promptBlizzBuild);
        $WH.ae(bB, $WH.ct(LANG.tc_import));
        $WH.ae(bP, bB);
        bB = aV = $WH.ce("a");
        bB.className = "talentcalc-button-print icon-print";
        bB.style.display = "none";
        bB.href = "javascript:;";
        bB.onclick = bh.showSummary.bind(null, 1);
        $WH.ae(bB, $WH.ct(LANG.tc_print));
        $WH.ae(bP, bB);
        bB = aJ = $WH.ce("a");
        bB.className = "icon-link";
        bB.style.display = "none";
        bB.href = "#";
        bB.target = "_blank";
        $WH.ae(bB, $WH.ct(LANG.tc_link));
        $WH.ae(bP, bB);
        if (aS == bp) {
            bB = ae = $WH.ce("a");
            bB.className = "talentcalc-button-print icon-add";
            bB.style.display = "none";
            bB.href = "javascript:;";
            bB.onclick = bh.getInGamePreview.bind(null, 1);
            $WH.ae(bB, $WH.ct(LANG.tc_ingamepreview));
            $WH.ae(bP, bB)
        }
        bB = $WH.ce("div");
        bB.className = "clear";
        $WH.ae(bP, bB);
        $WH.ae(bH, bP);
        a2 = bP = $WH.ce("div");
        var bA = $WH.ce("div");
        bA.className = "block-bg";
        $WH.ae(bA, bP);
        if (Ads.fillSpot("medrect", a2)) {
            //$WH.ae(bH, bA)
        }
        if (aS == bp) {
            g = $WH.ce("div");
            g.style.display = "none";
            bP = $WH.ce("h3");
            $WH.ae(bP, $WH.ct(LANG.tc_glyphs));
            $WH.ae(g, bP);
            bB = $WH.ce("a");
            bB.href = "javascript:;";
            bB.onclick = bh.resetGlyphs;
            g_addTooltip(bB, LANG.tc_resetglyphs);
            $WH.ae(bB, $WH.ct("[x]"));
            $WH.ae(bP, bB);
            var bC = {
                1: "major",
                2: "minor",
                3: "prime"
            },
                bI = 0;
            for (var bJ = 0, bK = D.length; bJ < bK; ++bJ) {
                var bQ = D[bJ];
                if (!aC[bQ].length) {
                    continue
                }
                bP = $WH.ce("div");
                bP.className = "talentcalc-sidebar-" + bC[bQ] + "glyphs";
                bB = $WH.ce("b");
                bB.className = "q9";
                $WH.ae(bB, $WH.ct(g_item_glyphs[bQ]));
                $WH.ae(bP, bB);
                $WH.ae(g, bP);
                var by = 0,
                    bM = $WH.ce("table"),
                    bw = $WH.ce("tbody"),
                    bx, bz, bE, bL, bD, bO;
                bM.className = "icontab";
                for (var bF = 0, bG = aC[bQ].length; bF < bG; ++bF) {
                    bx = $WH.ce("tr");
                    var by = bI + bF;
                    bz = $WH.ce("th");
                    bE = $WH.ce("td");
                    $WH.ae(bx, bz);
                    $WH.ae(bx, bE);
                    if (!aC[bQ][bF]) {
                        continue
                    }
                    bL = Icon.create("inventoryslot_empty", 0, null, "javascript:;");
                    bD = Icon.getLink(bL);
                    u[by] = bL;
                    $WH.ae(bz, bL);
                    bO = $WH.ce("a");
                    J[by] = bO;
                    $WH.ae(bE, bO);
                    bO.target = bD.target = "_blank";
                    bO.rel = bD.rel = "np";
                    bO.onmousedown = bD.onmousedown = $WH.rf;
                    bO.onclick = bD.onclick = $WH.rf;
                    g_onClick(bO, aA.bind(bO, by));
                    bO.onmouseover = M.bind(null, bO, by);
                    bO.onmousemove = $WH.Tooltip.cursorUpdate;
                    bO.onmouseout = $WH.Tooltip.hide;
                    g_onClick(bD, aA.bind(bD, by));
                    bD.onmouseover = M.bind(null, bD, by);
                    bD.onmouseout = $WH.Tooltip.hide;
                    bE.oncontextmenu = $WH.rf;
                    $WH.ae(bw, bx)
                }
                $WH.ae(bM, bw);
                $WH.ae(bP, bM);
                bI += aC[bQ].length
            }
            $WH.ae(bH, g)
        }
        $WH.ae(aG, bH);
        $WH.ae(F, aG)
    }
    function a5(bz, bD, bw) {
        var bF = $WH.ce("table"),
            by = $WH.ce("tbody"),
            bA, bE;
        for (var bB = 0; bB < bD; ++bB) {
            bA = $WH.ce("tr");
            for (var bC = 0; bC < bz; ++bC) {
                if (bw && bB > 0) {
                    bE = $WH.ce("th");
                    bE.colSpan = 2;
                    $WH.ae(bA, bE);
                    break
                } else {
                    var bx = $WH.ce("td");
                    bx.className = "talentcalc-main-cell";
                    $WH.ae(bA, bx)
                }
            }
            $WH.ae(by, bA)
        }
        $WH.ae(bF, by);
        return bF
    }
    function Z(bJ) {
        var b4 = W[bJ],
            b5;
        b4.k = 0;
        b4.div = $WH.ce("div");
        b4.div2 = $WH.ce("div");
        b4.div.style.display = b4.div2.style.display = "none";
        b4.div.style.position = b4.div2.style.position = "relative";
        $WH.aef(p, b4.div);
        $WH.aef(ao, b4.div2);
        for (var bE = 0; bE < B; ++bE) {
            b4[bE].k = 0;
            var b3 = $WH.ce("div"),
                bV = $WH.ce("div"),
                bT;
            b3.style.backgroundRepeat = "no-repeat";
            if (bE > 0) {
                b3.style.borderLeft = "1px solid black"
            }
            b3.style.position = "absolute";
            b3.style.width = (aS == bp ? "204px" : "244px");
            b3.style.left = ((aS == bp ? 204 : 244) * bE) + (bE == 2 ? 1 : 0) + "px";
            bT = $(b3).clone().get(0);
            bV.className = "talent-tree-inner" + (bE + 1);
            var bF = a5(4, bj);
            $WH.ae(bV, bF);
            $WH.ae(b3, bV);
            $WH.ae(b4.div, b3);
            var bP = $.makeArray($(bF).find("td.talentcalc-main-cell")),
                bL, bN = "?" + I,
                bM = ($WH.isset("g_beta") ? "beta" : ($WH.isset("g_ptr") ? "ptr" : ($WH.isset("g_old") ? "old" : "live")));
            if (aS == aZ) {
                b3.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/hunterpettalents/" + bM + "/bg_" + (b4[0].i + 1) + ".jpg" + bN + ")";
                bL = g_staticUrl + "/images/wow/hunterpettalents/" + bM + "/icons_" + (b4[0].i + 1) + ".jpg" + bN
            } else {
                b3.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/talents/backgrounds/" + bM + "/" + g_file_classes[bJ] + "_" + (bE + 1) + ".jpg" + bN + ")";
                bL = g_staticUrl + "/images/wow/talents/icons/" + bM + "/" + g_file_classes[bJ] + "_" + (bE + 1) + ".jpg" + bN
            }
            for (var bZ = b4[bE].t.length - 1; bZ >= 0; --bZ) {
                var bx = b4[bE].t[bZ],
                    bA = Icon.create(bL, 1, null, "javascript:;"),
                    by = Icon.getLink(bA),
                    bI = bP[(bx.y * 4 + bx.x + 1) - 1];
                R[b4[bE].t[bZ].i] = bx;
                if ((typeof g_dev == "undefined" || !g_dev) && bI.childNodes.length) {
                    bx.hidden = true
                }
                by.rel = "np";
                by.target = "_blank";
                by.onmousedown = $WH.rf;
                by.onclick = $WH.rf;
                g_onClick(by, O.bind(by, bx));
                by.onmouseover = ap.bind(null, by, bx);
                by.onmouseout = $WH.Tooltip.hide;
                var bO = $WH.ce("div"),
                    bU = $WH.ce("div");
                $WH.ae(bU, $WH.ct("0"));
                bO.className = "icon-border" + (bx.t != null ? " icon-border-ability" : "");
                bU.className = "icon-bubble";
                $WH.ae(bA, bO);
                $WH.ae(bA, bU);
                bx.k = 0;
                bx.i = bZ;
                bx.tree = bE;
                bx.classId = bJ;
                bx.icon = bA;
                bx.link = by;
                bx.border = bO;
                bx.bubble = bU;
                if (!bx.hidden) {
                    $WH.ae(bI, bA)
                }
                if (bx.r) {
                    var bz = b4[bE].t[bx.r[0]],
                        bH = bx.x - bz.x,
                        bG = bx.y - bz.y,
                        bX, bR, bQ, b0, bW = -1;
                    if (bz.links == null) {
                        bz.links = [bZ]
                    } else {
                        bz.links.push(bZ)
                    }
                    if (bG > 0) {
                        if (bH == 0) {
                            bW = 0
                        } else {
                            if (bH < 0) {
                                bW = 1
                            } else {
                                bW = 2
                            }
                        }
                    } else {
                        if (bG == 0) {
                            if (bH > 0) {
                                bW = 3
                            } else {
                                if (bH < 0) {
                                    bW = 4
                                }
                            }
                        }
                    }
                    if (aS == aZ) {
                        bQ = (Math.abs(bH) - 1) * 60;
                        b0 = (Math.abs(bG) - 1) * 60
                    } else {
                        bQ = (Math.abs(bH) - 1) * 50;
                        b0 = (Math.abs(bG) - 1) * 50
                    }
                    if (aS == aZ) {
                        switch (bW) {
                        case 0:
                            b0 += 27;
                            bX = 21;
                            bR = 6 - b0;
                            break
                        }
                    } else {
                        switch (bW) {
                        case 0:
                            b0 += 17;
                            bX = 16;
                            bR = 6 - b0;
                            break;
                        case 1:
                            bQ += 36;
                            b0 += 42;
                            bX = 16;
                            bR = 6 - b0;
                            break;
                        case 2:
                            bQ += 37;
                            b0 += 42;
                            bX = -6;
                            bR = 6 - b0;
                            break;
                        case 3:
                            bQ += 15;
                            bX = -6;
                            bR = 12;
                            break;
                        case 4:
                            bQ += 15;
                            bX = 37;
                            bR = 12;
                            break
                        }
                    }
                    var bK = bb(bW, bQ, b0);
                    bK.style.left = bX + "px";
                    bK.style.top = bR + "px";
                    var b1 = $WH.ce("div");
                    b1.className = "talentcalc-arrow-anchor";
                    $WH.ae(b1, bK);
                    if (!bx.hidden) {
                        bI.insertBefore(b1, bI.firstChild)
                    }
                    bx.arrow = bK
                }
            }
            if (aE > 0 && b4[bE].mastery) {
                bT.style.borderLeft = "";
                bT.style.left = (204 * bE) + "px";
                var b2 = $WH.ce("div"),
                    bC = $WH.ce("div"),
                    b5;
                b2.className = "talentcalc-masteries-tree";
                b2.style.borderColor = b4[bE].color;
                if (bE > 0) {
                    b2.style.marginLeft = "0"
                }
                $WH.ae(b2, bC);
                Q[bE] = RedButton.create(b4[bE].n, true);
                RedButton.setFunc(Q[bE], ak.bind(null, bE));
                $WH.ae(bC, Q[bE]);
                b5 = $WH.ce("div");
                b5.className = "mastery-icon";
                b5.style.backgroundImage = "url(" + g_staticUrl + "/images/wow/icons/large/" + b4[bE].icon.toLowerCase() + ".jpg)";
                $WH.ae(b5, $WH.ce("ins"));
                $WH.ae(bC, b5);
                if ($WH.Browser.ie) {
                    $WH.aef(b5, $WH.ce("del"))
                } else {
                    bC.className = "mastery-glow";
                    bC.style.backgroundColor = b4[bE].color
                }
                var bY = 0;
                for (var bZ = 2; bZ <= b4[bE].role; bZ *= 2) {
                    if (b4[bE].role & bZ) {
                        b3 = $WH.ce("var", {
                            className: "role" + bZ
                        });
                        if ((b4[bE].role | bZ) != bZ) {
                            b3.style.right = (1 - (12 * bY)) + "px";
                            b3.style.bottom = ((14 * bY) - 8) + "px";
                            bY++
                        }
                        $WH.ae(b5, b3)
                    }
                }
                var bA, by, bw = 176;
                if (b4[bE].mastery.spells) {
                    for (var bZ = 0, bD = b4[bE].mastery.spells.length; bZ < bD; ++bZ) {
                        var b0 = (bZ == 0 ? 44 : 26);
                        bw -= b0;
                        b5 = $WH.ce("div");
                        b5.style.height = b0 + "px";
                        $WH.ae((bZ > 0 ? b2 : bC), b5);
                        if (bZ > 0) {
                            $WH.ae(b5, $WH.ce("small"));
                            b5 = b5.firstChild
                        }
                        bA = Icon.create(b4[bE].mastery.spells[bZ].icon, (bZ == 0 ? 1 : 0), null, wowheadUrl + "/spell=" + b4[bE].mastery.spells[bZ].id);
                        by = Icon.getLink(bA);
                        bA.style.cssFloat = bA.style.styleFloat = "left";
                        a = $WH.ce("a");
                        a.className = "mastery-spell";
                        a.style.height = b0 + "px";
                        $WH.st(a, b4[bE].mastery.spells[bZ].name);
                        a.href = by.href;
                        a.target = by.target = "_blank";
                        $WH.ae(b5, bA);
                        $WH.ae(b5, a)
                    }
                }
                if (b4[bE].mastery.rating) {
                    var bB = LANG.tc_mastery,
                        bS = "";
                    for (var bZ = 0, bD = b4[bE].mastery.rating.length; bZ < bD; ++bZ) {
                        if (bZ > 0) {
                            bB += " / ";
                            bS += "<br /><br />"
                        }
                        bB += '<a href="' + wowheadUrl + '/spell=' + b4[bE].mastery.rating[bZ].id + '" rel="np">' + b4[bE].mastery.rating[bZ].name + "</a>";
                        bS += '<span class="q1">' + b4[bE].mastery.rating[bZ].name + "</span><br />" + b4[bE].mastery.rating[bZ].description
                    }
                    var b0 = 26;
                    bw -= b0;
                    b5 = $WH.ce("div");
                    b5.style.height = b0 + "px";
                    $WH.ae(b2, b5);
                    $WH.ae(b5, $WH.ce("small"));
                    b5 = b5.firstChild;
                    b5.className = "mastery-spell-rating";
                    bA = Icon.create("spell_holy_championsbond", 0);
                    by = Icon.getLink(bA);
                    bA.style.cssFloat = bA.style.styleFloat = "left";
                    a = $WH.ce("span");
                    a.className = "mastery-spell";
                    a.style.height = b0 + "px";
                    a.innerHTML = bB;
                    by.onmouseover = a.onmouseover = bn.bind(null, bS);
                    by.onmousemove = a.onmousemove = $WH.Tooltip.cursorUpdate;
                    by.onmouseout = a.onmouseout = $WH.Tooltip.hide;
                    $WH.ae(b5, bA);
                    $WH.ae(b5, a)
                }
                b5 = $WH.ce("div");
                b5.className = "clear";
                b5.style.paddingBottom = bw + "px";
                $WH.ae(b2, b5);
                b5 = $WH.ce("small");
                $WH.st(b5, b4[bE].mastery.description);
                $WH.ae(b2, b5);
                $WH.ae(bT, b2);
                $WH.ae(b4.div2, bT)
            }
        }
    }
    function bs() {
        var bw, bx;
        E = $WH.ce("div");
        E.className = "talentcalc-upper";
        E.style.display = "none";
        bw = $WH.ce("span");
        bw.className = "talentcalc-upper-class";
        bm = a = $WH.ce("a");
        a.target = "_blank";
        $WH.ae(bw, a);
        $WH.ae(bw, $WH.ct(" "));
        ai = $WH.ce("b");
        $WH.ae(bw, ai);
        $WH.ae(E, bw);
        bw = $WH.ce("span");
        bw.className = "talentcalc-upper-ptsleft";
        $WH.ae(bw, $WH.ct(LANG.tc_ptsleft));
        aY = $WH.ce("b");
        $WH.ae(bw, aY);
        $WH.ae(E, bw);
        if (aS == aZ) {
            bx = P = $WH.ce("a");
            bx.href = "javascript:;";
            bx.onclick = K.bind(null, bx);
            bx.onmouseover = aD.bind(null, bx);
            bx.onmousemove = $WH.Tooltip.cursorUpdate;
            bx.onmouseout = $WH.Tooltip.hide;
            $WH.ae(bw, bx)
        }
        bw = $WH.ce("span");
        bw.className = "talentcalc-upper-reqlevel";
        $WH.ae(bw, $WH.ct(LANG.tc_reqlevel));
        a8 = $WH.ce("b");
        $WH.ae(bw, a8);
        bx = am = $WH.ce("a");
        bx.className = "q1";
        bx.href = "javascript:;";
        bx.onclick = o.bind(null, bx);
        bx.onmouseover = bd.bind(null, bx);
        bx.onmousemove = $WH.Tooltip.cursorUpdate;
        bx.onmouseout = $WH.Tooltip.hide;
        if (!y.profiler) {
            $WH.ae(bw, $WH.ct(" ("));
            $WH.ae(bw, bx);
            $WH.ae(bw, $WH.ct(")"))
        }
        $WH.ae(E, bw);
        bw = $WH.ce("div");
        bw.className = "clear";
        $WH.ae(E, bw);
        $WH.ae(f, E)
    }
    function C(bA) {
        var bw = "";
        var bz = [];
        for (var by = 0; by < bA.length; by += 2) {
            for (var bx = 0; bx < 2; ++bx) {
                bz[bx] = parseInt(bA.substring(by + bx, by + bx + 1));
                if (isNaN(bz[bx])) {
                    bz[bx] = 0
                }
            }
            bw += ax.charAt(bz[0] * 6 + bz[1])
        }
        return bw
    }
    function l(bw, bD, bC) {
        var bE = W[bw.classId];
        if (bw.k > 0) {
            if (bw.links) {
                for (by = 0; by < bw.links.length; ++by) {
                    if (bE[bw.tree].t[bw.links[by]].k) {
                        return
                    }
                }
            }
            bw.k--;
            var bB = 0,
                bA = {},
                bx = 0;
            for (var by = 0; by < bE[bw.tree].t.length; ++by) {
                var bz = bE[bw.tree].t[by];
                if (bA[bz.y] == null) {
                    bA[bz.y] = 0
                }
                bA[bz.y] += bz.k;
                if (bz.k > 0) {
                    bx = Math.max(bx, bz.y)
                }
            }
            for (var by = 0; by <= bx; ++by) {
                if (bB < by * av) {
                    bw.k++;
                    return
                }
                bB += bA[by]
            }
            bE[bw.tree].k--;
            by = bE.k--;
            bt(bw.tree, bD, null, bw.classId);
            if (bD) {
                ap(bC, bw);
                if (bE.k >= ad - 1 || aE > 0) {
                    ak(false)
                }
                af()
            }
        }
    }
    function h(by) {
        var bw = h.L;
        if (bw == null) {
            bw = h.L = {};
            for (var bx in aN.L) {
                bw[aN.L[bx]] = bx
            }
        }
        return bw[by]
    }
    function aN(bw) {
        return aN.L[bw]
    }
    aN.L = {
        6: 9,
        11: 0,
        3: 1,
        8: 2,
        2: 3,
        5: 4,
        4: 5,
        7: 6,
        9: 7,
        1: 8
    };

    function a0(bA) {
        var by = 0;
        for (var bx = 0, bw = D.length; bx < bw; ++bx) {
            var bz = D[bx];
            if (bA >= by && bA < by + aC[bz].length) {
                return bz
            }
            by += aC[bz].length
        }
    }
    function bk(bw) {
        return ($WH.in_array(az[a0(bw)], bw) == -1)
    }
    function U(bA) {
        var bz = 0;
        for (var by in aC) {
            for (var bx = 0, bw = aC[by].length; bx < bw; ++bx) {
                if (bz == bA) {
                    return aC[by][bx]
                }++bz
            }
        }
        return 0
    }
    function a7() {
        var by = W[aW],
            bw;
        if (aS == aZ) {
            bw = Math.max(w ? 60 : 0, by.k > 0 ? (by.k - w) * 4 + 16 : 0)
        } else {
            bw = (by.k > 0 ? Math.max(0, 2 - by.k) + Math.min(36, by.k - 1) * 2 + Math.max(0, by.k - 37) + 9 : 0)
        }
        for (var bx = 0; bx < aq; ++bx) {
            if (g_glyphs[by.glyphs[bx]]) {
                bw = Math.max(bw, U(bx));
                bw = Math.max(bw, g_glyphs[by.glyphs[bx]].level)
            }
        }
        return bw
    }
    function aI(bz, bx) {
        var bw = bz.d;
        var by = Math.max(0, bz.k - 1) + (bx ? 1 : 0);
        return bz.d[by]
    }
    function aA(bx, bw) {
        if (!S && !bk(bx)) {
            if (bw) {
                if (an(bx)) {
                    M(this, bx)
                }
            } else {
                ar = bx;
                Lightbox.show("glyphpicker", {
                    onShow: bl
                })
            }
        } else {
            if (!bw && this.href != "javascript:;") {
                window.open(this.href)
            } else {
                return false
            }
        }
    }
    function bl(bD, bA, bw) {
        Lightbox.setSize(800, 564);
        var by;
        aF = false;
        if (bA) {
            bD.className = "talentcalc-glyphpicker listview";
            var bx = [],
                bB = $WH.ce("div"),
                bC = $WH.ce("a"),
                bz = $WH.ce("div");
            bx.push({
                none: 1
            });
            for (var bE in g_glyphs) {
                bx.push(g_glyphs[bE])
            }
            bB.className = "listview";
            $WH.ae(bD, bB);
            bC.className = "screenshotviewer-close";
            bC.href = "javascript:;";
            bC.onclick = Lightbox.hide;
            $WH.ae(bC, $WH.ce("span"));
            $WH.ae(bD, bC);
            bz.className = "clear";
            $WH.ae(bD, bz);
            by = new Listview({
                template: "glyph",
                id: "glyphs",
                parent: bB,
                data: bx,
                customFilter: r.bind(0, null),
                createNote: aQ
            });
            if ($WH.Browser.firefox) {
                $WH.aE(by.getClipDiv(), "DOMMouseScroll", g_pickerWheel)
            } else {
                by.getClipDiv().onmousewheel = g_pickerWheel
            }
        } else {
            by = g_listviews.glyphs;
            by.clearSearch();
            by.updateFilters(true)
        }
        setTimeout(function () {
            by.createNote(by.noteTop, by.noteBot);
            by.focusSearch()
        }, 1)
    }
    function O(bx, bw) {
        if (!S) {
            if (bw) {
                l(bx, true, this)
            } else {
                c(bx, true, this)
            }
        } else {
            if (!bw) {
                window.open(this.href)
            } else {
                return false
            }
        }
    }
    function c(bz, bw, by) {
        var bx = W[bz.classId];
        if (bx.k < ad) {
            if (bz.enabled && bz.k < bz.m) {
                bx.k++;
                bx[bz.tree].k++;
                bz.k++;
                bt(bz.tree, bw, bz, bz.classId);
                if (bw) {
                    ap(by, bz);
                    if (bx.k == ad || aE > 0) {
                        ak(false)
                    }
                    af()
                }
            }
        } else {
            if (aS == aZ && bx.k == ad && !bw) {
                q(-1, aa, true);
                c(bz, bw, by)
            }
        }
    }
    function s() {
        var bA, bD, by, bz = [];
        for (var bB in g_glyphs) {
            bz.push(bB)
        }
        bz.sort();
        for (var bx = 0, bw = bz.length; bx < bw; ++bx) {
            var bB = bz[bx];
            bA = g_glyphs[bB];
            bD = bA.classs;
            by = bA.type;
            if (!bi[bD]) {
                bi[bD] = {};
                for (var bC in aC) {
                    bi[bD][bC] = []
                }
            }
            if (!bi[bD][by]) {
                continue
            }
            bA.id = bB;
            bA.index = bi[bD][by].length;
            bi[bD][by].push(bA.id)
        }
    }
    function r(bz, bx) {
        if (bx.none) {
            return true
        }
        var by = W[aW];
        var bw = (bx.classs == aW && bx.type == a0(bz != null ? bz : ar) && !by.glyphItems[bx.id]);
        if (bw && bx.level > aj) {
            aF = true
        }
        return bw && (bx.level <= aj)
    }
    function aQ(bw) {
        $(bw).empty();
        if (aF) {
            $(bw).append('<small><b class="q10">' + LANG.tc_glyphnote + "</b></small>")
        }
    }
    function af() {
        var bx = W[aW];
        if (!bx) {
            return
        }
        G.mode = aS;
        G.classId = aW;
        G.locked = S;
        G.requiredLevel = a7();
        G.pointsLeft = ad - bx.k;
        G.pointsSpent = (aS == aZ ? bx[0].k : [bx[0].k, bx[1].k, bx[2].k]);
        G.bonusPoints = w;
        $WH.st(ai, "(" + (aS == aZ ? bx.k : G.pointsSpent.join("/")) + ")");
        $WH.st(a8, G.requiredLevel ? G.requiredLevel : "-");
        $WH.st(am, aj);
        $WH.st(aY, G.pointsLeft);
        if (S) {
            $WH.st(A, LANG.tc_unlock);
            A.className = "icon-unlock"
        } else {
            $WH.st(A, LANG.tc_lock);
            A.className = "icon-lock"
        }
        if (P) {
            if (w) {
                $WH.st(P, "[-]");
                P.className = "q10"
            } else {
                $WH.st(P, "[+]");
                P.className = "q2"
            }
        }
        if (aJ) {
            aJ.href = (aS == aZ ? wowheadUrl + "/petcalc#" : wowheadUrl + "/talent#") + bh.getWhBuild() + (aS == aZ ? "" : ":" + bh.getWhGlyphs())
        }
        for (var bw = 0; bw < B; ++bw) {
            $WH.st(a4[bw], bx[bw].k)
        }
        $(".mastery-spell-rating").removeClass("q0");
        if (a7() < 80) {
            $(".mastery-spell-rating").addClass("q0")
        }
        if (aX) {
            aX(bh, G, bx)
        }
    }
    function ak(bw) {
        var bz = W[aW];
        var by = bz.masteryTree;
        bz.masteryTree = null;
        if (bw !== false) {
            bz.masteryTree = bw
        } else {
            var bx = 0;
            for (var bw = 0; bw < B; ++bw) {
                if (bx > 0 && bz[bw].k == bx) {
                    continue
                }
                if (bz[bw].k > bx) {
                    bx = bz[bw].k;
                    bz.masteryTree = bw
                }
            }
        }
        for (var bw = 0; bw < B; ++bw) {
            bt(bw, true, null, aW)
        }
        $(aP).removeClass("locked mastery");
        $(".talent-tree-inner1, .talent-tree-inner2, .talent-tree-inner3").removeClass("mastery");
        if (aP[bz.masteryTree]) {
            $(aP[bz.masteryTree]).addClass("mastery");
            $(".talent-tree-inner" + (bz.masteryTree + 1), F).addClass("mastery")
        }
        if (bz.k < aE) {
            for (var bw = 0; bw < B; ++bw) {
                if (bw != bz.masteryTree) {
                    $(aP[bw]).addClass("locked")
                }
            }
        }
        a9()
    }
    function a9(bx) {
        var by = W[aW];
        var bw = (aE <= 0 ? false : (bx ? g_toggleDisplay(ao) : by.masteryTree == null));
        p.style.display = (bw ? "none" : "");
        ao.style.display = (bw ? "" : "none");
        RedButton.setText(t, (bw ? LANG.tc_viewtalents : LANG.tc_viewsummary));
        t.style.display = (aW != -1 && aS != aZ ? "" : "none")
    }
    function be() {
        $WH.st(bm, bg[aW]);
        if (aS == aZ) {
            bm.href = wowheadUrl + "/pet=" + aW
        } else {
            bm.href = wowheadUrl + "/class=" + aW;
            bm.className = "c" + aW
        }
        if (T == 0) {
            n.style.display = "";
            aV.style.display = "";
            if (aJ) {
                aJ.style.display = ""
            }
            if (ae) {
                ae.style.display = ""
            }
            if (g) {
                g.style.display = ""
            }
            E.style.display = "";
            if (aE > 0) {
                ao.style.display = ""
            }
            X.style.display = ""
        } else {
            ak(false)
        }
        var bz = W[aW];
        for (var bw = 0; bw < B; ++bw) {
            var by = aO[bw];
            $WH.st(by, bz[bw].n);
            $(aP[bw]).css("background-color", bz[bw].color);
            $(".role2, .role4, .role8", aP[bw]).remove();
            for (var bx = 2; bx <= bz[bw].role; bx *= 2) {
                if (bz[bw].role & bx) {
                    d = $WH.ce("var", {
                        className: "role" + bx
                    });
                    $WH.ae(aP[bw], $WH.ce("var", {
                        className: "role" + bx
                    }))
                }
            }
            Icon.setTexture(aP[bw].icon, 1, bz[bw].icon.toLowerCase())
        }
        z();
        e(aW);
        af();
        ++T
    }
    function a6(bF, bC) {
        var bD = W[bC];
        var bG = 0,
            bw = 0;
        var by = [];
        var bE = aj;
        bu(al);
        ak(-1);
        if (bC == 8 && bF.length == 62) {
            bF = bF.substr(0, 15) + bF.substr(16)
        }
        for (var bA = 0; bA < bF.length; ++bA) {
            var bx = Math.min(parseInt(bF.charAt(bA)), bD[bG].t[bw].m);
            if (isNaN(bx)) {
                continue
            }
            for (var bz = 0; bz < bx; ++bz) {
                c(bD[bG].t[bw])
            }
            for (var bB = 0; bB < by.length; ++bB) {
                if (by[bB][0].enabled && by[bB][1] > 0) {
                    for (var bz = 0; bz < by[bB][1]; ++bz) {
                        c(by[bB][0])
                    }
                    by[bB][1] = 0
                }
            }
            if (bD[bG].t[bw].k < bx) {
                by.push([bD[bG].t[bw], bx - bD[bG].t[bw].k])
            }
            if (++bw > bD[bG].t.length - 1) {
                bw = 0;
                if (++bG > B - 1) {
                    break
                }
            }
        }
        bu(bE)
    }
    function b(by) {
        var bA = ("" + by).split(":"),
            bx = {};
        for (var bz = 0, bw = bA.length; bz < bw; ++bz) {
            var bC = bA[bz],
                bB = g_glyphs[bC];
            if (bB) {
                var bD = -1;
                if (bx[bB.type] == null) {
                    bx[bB.type] = 0
                }
                if (bx[bB.type] < az[bB.type].length) {
                    bD = az[bB.type][bx[bB.type]];
                    ++bx[bB.type]
                }
                if (bD != -1) {
                    aK(bD, bC, true)
                }
            } else {
                ++bx[a0(bz)]
            }
        }
    }
    function aR(bI, bE) {
        var bF = W[bE];
        var bJ = 0,
            bx = 0;
        var bH = [];
        var bz = [];
        var bG = aj;
        bu(al);
        ak(-1);
        for (var bC = 0; bC < bI.length; ++bC) {
            var bw = bI.charAt(bC);
            if (bw != V) {
                var by = ax.indexOf(bw);
                if (by < 0) {
                    continue
                }
                bH[1] = by % 6;
                bH[0] = (by - bH[1]) / 6;
                for (var bB = 0; bB < 2; ++bB) {
                    by = Math.min(bH[bB], bF[bJ].t[bx].m);
                    for (var bA = 0; bA < by; ++bA) {
                        c(bF[bJ].t[bx])
                    }
                    for (var bD = 0; bD < bz.length; ++bD) {
                        if (bz[bD][0].enabled && bz[bD][1] > 0) {
                            for (var bA = 0; bA < bz[bD][1]; ++bA) {
                                c(bz[bD][0])
                            }
                            bz[bD][1] = 0
                        }
                    }
                    if (bF[bJ].t[bx].k < by) {
                        bz.push([bF[bJ].t[bx], by - bF[bJ].t[bx].k])
                    }
                    if (++bx >= bF[bJ].t.length) {
                        break
                    }
                }
            }
            if (bx >= bF[bJ].t.length || bw == V) {
                bx = 0;
                if (++bJ > B - 1) {
                    return
                }
            }
        }
        bu(bG)
    }
    function H(by) {
        var bD = 0,
            bB = 0,
            bx = 0,
            bA;
        for (var bz = 0, bw = by.length; bz < bw && bz < aq; ++bz) {
            if (bA != null && bx >= aC[bA].length) {
                bB++;
                bx = 0
            }
            var bC = by.charAt(bz),
                bA = D[bB];
            if (bC == "Z") {
                bD += aC[bA].length - bx;
                bx = aC[bA].length;
                continue
            }
            aK(bD, bi[aW][bA][ax.indexOf(bC)], true);
            ++bD;
            ++bx
        }
    }
    function e(bx) {
        ah();
        for (var bw = 0; bw < B; ++bw) {
            bt(bw, true, null, bx)
        }
    }
    function ah() {
        if (aS != bp) {
            return
        }
        var bA = 0,
            bC = 0;
        for (var bz = 0, bw = D.length; bz < bw; ++bz) {
            var bB = D[bz];
            for (var by = 0, bx = aC[bB].length; by < bx; ++by) {
                if (bf(bC)) {
                    ++bA
                }++bC
            }
        }
        g.style.display = (bA == 0 && S && y.profiler ? "none" : "")
    }
    function ag(by, bx) {
        if (W[by] == null) {
            bx.n = by;
            W[by] = bx;
            var bz = W[by];
            bz.glyphs = [];
            bz.glyphItems = {};
            Z(by);
            if (k && k.classId == by) {
                for (var bw = 0; bw < B; ++bw) {
                    bt(bw, false, null, by)
                }
                if (k.wh || k.blizz) {
                    S = true;
                    if (k.wh) {
                        aR(k.wh, by)
                    } else {
                        a6(k.blizz, by)
                    }
                }
            } else {
                S = false
            }
            k = null;
            ak(false);
            if (bq && bq.classId == by) {
                if (bq.wh) {
                    H(bq.wh)
                } else {
                    b(bq.blizz)
                }
            }
            bq = null;
            if (by == aW) {
                be();
                bz.div.style.display = bz.div2.style.display = "";
                a9();
                for (var bw = 0; bw < B; ++bw) {
                    bt(bw, true, null, by)
                }
            }
        }
    }
    function an(by, bw) {
        var bx = W[aW];
        if (bx.glyphs[by]) {
            bx.glyphItems[bx.glyphs[by]] = 0;
            bx.glyphs[by] = 0;
            if (!bw) {
                bf(by);
                af()
            }
            return true
        }
    }
    function aB(bw) {
        bo(bw);
        a1();
        e(bw)
    }
    function bo(bx) {
        if (aS == aZ) {
            q(-1, 0, true)
        }
        ak(null);
        for (var bw = 0; bw < B; ++bw) {
            bc(bw, bx, false)
        }
    }
    function a1(bA) {
        var bD = W[aW];
        if (!bD) {
            return
        }
        var bC = 0;
        for (var bz = 0, bw = D.length; bz < bw; ++bz) {
            var bB = D[bz];
            for (var by = 0, bx = aC[bB].length; by < bx; ++by) {
                an(bC, !bA);
                ++bC
            }
        }
        ah()
    }
    function bc(bw, bz, by) {
        var bA = W[bz];
        var bx;
        for (bx = 0; bx < bA[bw].t.length; ++bx) {
            bA[bw].t[bx].k = 0
        }
        bA.k -= bA[bw].k;
        bA[bw].k = 0;
        if (by) {
            if (bA.masteryTree == bw) {
                ak(false)
            }
            for (bw = 0; bw < B; ++bw) {
                bt(bw, true, null, bz)
            }
            af()
        }
    }
    function ab(bw, bx) {
        if (bg[bw] == null) {
            return
        }
        if (!bx) {
            return
        }
        S = true;
        if (!aU) {
            aU = {
                classId: bw,
                blizz: bx
            }
        }
        if (W[bw]) {
            bo(bw);
            e(bw);
            a6(bx, bw);
            e(bw);
            ak(false)
        } else {
            k = {
                classId: bw,
                blizz: bx
            }
        }
        if (!v(bw)) {
            af()
        }
    }
    function br(bw) {
        if (!bw) {
            return
        }
        if (W[aW]) {
            a1();
            b(bw);
            ah();
            af()
        } else {
            bq = {
                classId: aW,
                blizz: bw
            }
        }
    }
    function v(bw) {
        if (bg[bw] == null) {
            return
        }
        if (bw != aW) {
            au = aW;
            aW = bw;
            if (aS == aZ && W[bw] == null) {
                ag(bw, bv(bw))
            } else {
                if (W[bw]) {
                    be();
                    var bx = W[bw];
                    bx.div.style.display = bx.div2.style.display = "";
                    a9()
                } else {
                    $WH.g_ajaxIshRequest( wowheadUrl + "/data=talents?class=" + bw + "&locale=" + Locale.getId() + "&t=" + g_dataKey + "&" + I)
                }
            }
            if (W[au]) {
                W[au].div.style.display = W[au].div2.style.display = "none"
            }
            return true
        }
    }
    function bu(bx) {
        bx = parseInt(bx);
        if (isNaN(bx) || bx < aT || bx > al) {
            return
        }
        aj = bx;
        var bw;
        if (aS == aZ) {
            bw = Math.max(0, Math.floor((bx - 16) / 4))
        } else {
            bw = Math.max(0, Math.min(10, bx) - 9) + Math.max(0, Math.floor((Math.min(80, bx) - 9) / 2)) + Math.max(0, bx - 80)
        }
        q(bw, -1, true);
        L(bx);
        ah()
    }
    function ay(bw) {
        if (S != bw) {
            S = bw;
            e(aW);
            af()
        }
    }
    function q(by, bz, bx) {
        var bw = ad;
        if (by == -1) {
            by = ba
        }
        if (bz == -1) {
            bz = w
        }
        ba = by;
        w = bz;
        ad = by + bz;
        if (aW != -1) {
            if (ad < bw) {
                z()
            }
            e(aW);
            if (!bx) {
                af()
            }
        }
    }
    function L(bC) {
        aq = 0;
        az = {};
        var bB = 0;
        for (var bz = 0, bw = D.length; bz < bw; ++bz) {
            var bA = D[bz];
            az[bA] = [];
            for (var by = 0, bx = aC[bA].length; by < bx; ++by) {
                if (bC >= aC[bA][by]) {
                    az[bA].push(bB);
                    aq++
                }++bB
            }
        }
    }
    function a3(bA) {
        if (!bA) {
            return
        }
        var bw = bA,
            bx = false,
            by;
        if (aS == aZ) {
            var bB = ax.indexOf(bA.charAt(0));
            if (bB >= 0 && bB <= 5) {
                var bz = ax.indexOf(bA.charAt(1));
                if (bz % 2 == 1) {
                    q(-1, aa, true);
                    --bz
                } else {
                    q(-1, 0, true)
                }
                by = bB * 10 + (bz / 2);
                if (g_pet_families[by] != null) {
                    bA = bA.substr(2);
                    bx = true
                }
            }
        } else {
            var bB = ax.indexOf(bA.charAt(0));
            if (bB >= 0 && bB <= 28) {
                var bz = bB % 3;
                var by = (bB - bz) / 3;
                if (bz == 1) {
                    q(-1, aa, true);
                    --bz
                } else {
                    q(-1, 0, true)
                }
                by = h(by);
                if (by != null) {
                    bA = bA.substr(1);
                    bx = true
                }
            }
        }
        if (bx) {
            if (bA.length) {
                S = true;
                if (!aU) {
                    aU = {
                        wh: bw
                    }
                }
            }
            if (W[by]) {
                bo(by);
                aR(bA, by);
                e(by);
                ak(false)
            } else {
                k = {
                    classId: by,
                    wh: bA
                }
            }
            if (!v(by)) {
                af()
            }
            return by
        }
    }
    function N(bw) {
        if (!bw) {
            return
        }
        if (!Y) {
            Y = {
                wh: bw
            }
        }
        if (W[aW]) {
            a1();
            H(bw);
            ah();
            af()
        } else {
            bq = {
                classId: aW,
                wh: bw
            }
        }
    }
    function M(bC, bB) {
        var bA = W[aW],
            by = "",
            bw = "",
            bz = g_glyphs[bA.glyphs[bB]],
            bx = bk(bB);
        if (bz && !bx) {
            by += "<b>" + bz.name + "</b>";
            by += '<br /><span class="q9">' + LANG["tc_glyph" + a0(bB)] + "</span>";
            bw += '<span class="q">' + bz.description + "</span>";
            if (!S) {
                bw += '<br /><span class="q10">' + LANG.tc_remgly + "</span>"
            }
        } else {
            if (!bx) {
                by += '<b class="q0">' + LANG.tc_empty + "</b>";
                by += '<br /><span class="q9">' + LANG["tc_glyph" + a0(bB)] + "</span>";
                if (!S) {
                    bw += '<span class="q2">' + LANG.tc_addgly + "</span>"
                }
            } else {
                by += '<b class="q0">' + LANG.tc_locked + "</b>";
                by += '<br /><span class="q9">' + LANG["tc_glyph" + a0(bB)] + "</span>";
                bw += '<span class="q10">' + $WH.sprintf(LANG.tc_lockgly, U(bB)) + "</span>"
            }
        }
        if (bz && bC.parentNode.className.indexOf("icon") != 0) {
            $WH.Tooltip.setIcon(bz.icon)
        } else {
            $WH.Tooltip.setIcon(null)
        }
        $WH.Tooltip.show(bC, $WH.Tooltip.getMultiPartHtml(by, bw))
    }
    function ap(bz, by) {
        var bx = W[by.classId],
            bw = "<table><tr><td><b>";
        if (by.z) {
            bw += '<span style="float: right" class="q0">' + by.z + "</span>"
        }
        bw += by.n + "</b><br />" + $WH.sprintf(LANG.tc_rank, by.k, by.m) + "<br />";
        if (by.r) {
            if (bx[by.tree].t[by.r[0]].k < by.r[1]) {
                bw += '<span class="q10">';
                bw += $WH.sprintf(LANG[by.r[1] == 1 ? "tc_prereq" : "tc_prereqpl"], by.r[1], bx[by.tree].t[by.r[0]].n);
                bw += "</span><br />"
            }
        }
        if (bx[by.tree].k < by.y * av) {
            bw += '<span class="q10">' + $WH.sprintf(LANG.tc_tier, (by.y * av), bx[by.tree].n) + "</span><br />"
        }
        if (by.t && by.t.length >= 1) {
            bw += by.t[0]
        }
        bw += "</td></tr></table><table><tr><td>";
        if (by.t && by.t.length > 1) {
            bw += by.t[1] + "<br />"
        }
        bw += '<span class="q">' + aI(by) + "</span><br />";
        if (S) {} else {
            if (by.enabled) {
                if (!by.k) {
                    bw += '<span class="q2">' + LANG.tc_learn + "</span><br />"
                } else {
                    if (by.k == by.m) {
                        bw += '<span class="q10">' + LANG.tc_unlearn + "</span><br />"
                    }
                }
                if (by.k && by.k < by.m) {
                    bw += "<br />" + LANG.tc_nextrank + '<br /><span class="q">' + aI(by, 1) + "</span><br />"
                }
            }
        }
        bw += "</td></tr></table>";
        $WH.Tooltip.show(bz, $WH.g_setTooltipLevel(bw, a7()))
    }
    function aM(bw) {
        if (Locale.getId() == LOCALE_ENUS) {
            return bw.replace(/^Glyph of (the )?/i, "")
        }
        return bw
    }
    function x() {
        S = !S;
        e(aW);
        af();
        return S
    }
    function bf(bC) {
        var bB = W[aW],
            by = u[bC],
            bA = Icon.getLink(by),
            bx = bk(bC),
            bw = J[bC],
            bz;
        if (bB.glyphs[bC]) {
            bz = g_glyphs[bB.glyphs[bC]];
            if (bx || bz.level > aj) {
                an(bC)
            }
        }
        if (bz && !bx) {
            Icon.setTexture(by, 0, bz.icon);
            bw.href = bA.href = wowheadUrl + "/item=" + bz.id;
            $WH.st(bw, aM(bz.name));
            bw.className = "q1";
            return true
        } else {
            Icon.setTexture(by, 0, "inventoryslot_empty");
            bw.href = bA.href = "javascript:;";
            $WH.st(bw, (!bx ? LANG.tc_empty : LANG.tc_locked));
            bw.className = "q0";
            return false
        }
    }
    function bt(bE, bz, bw, bA) {
        var bC = W[bA];
        var bB = (aE > 0 && (bC.masteryTree === null || (bC[bC.masteryTree] && bC[bC.masteryTree].k < aE)));
        if (bB && bE != bC.masteryTree && bC[bE].k > 0) {
            return bc(bE, bA, true)
        }
        var by;
        if (!bw || bC.k == ad) {
            by = ad - 21
        } else {
            by = Math.ceil(bC[bE].k / av) * av
        }
        for (var bx = 0; bx < bC[bE].t.length; ++bx) {
            bw = bC[bE].t[bx];
            if (bB && bE != bC.masteryTree) {
                bw.enabled = 0
            } else {
                if (bC.k == ad && !bw.k) {
                    bw.enabled = 0
                } else {
                    if (bC[bE].k >= bw.y * av) {
                        if (bw.r) {
                            if (bC[bE].t[bw.r[0]].k >= bw.r[1]) {
                                bw.enabled = 1
                            } else {
                                bw.enabled = 0
                            }
                        } else {
                            bw.enabled = 1
                        }
                    } else {
                        bw.enabled = 0
                    }
                }
            }
            if (bz) {
                if (bw.enabled && (!S || bw.k)) {
                    if (bw.k == bw.m) {
                        bw.border.style.backgroundPosition = "-42px 0";
                        bw.bubble.style.color = "#E7BA00"
                    } else {
                        bw.border.style.backgroundPosition = "-84px 0";
                        bw.bubble.style.color = "#17FD17"
                    }
                    Icon.moveTexture(bw.icon, 1, bx, 0);
                    bw.link.className = "bubbly";
                    bw.bubble.style.visibility = "visible";
                    if (bw.r) {
                        var bD = bw.arrow.firstChild;
                        if (bD.className.charAt(bD.className.length - 1) != "2") {
                            bD.className += "2"
                        }
                    }
                } else {
                    bw.border.style.backgroundPosition = "0 0";
                    Icon.moveTexture(bw.icon, 1, bx, 1);
                    bw.link.className = "";
                    bw.bubble.style.visibility = "hidden";
                    if (bw.r) {
                        var bD = bw.arrow.firstChild;
                        if (bD.className.charAt(bD.className.length - 1) == "2") {
                            bD.className = bD.className.substr(0, bD.className.length - 1)
                        }
                    }
                }
                bw.bubble.firstChild.nodeValue = bw.k;
                bw.link.href = wowheadUrl + "/spell=" + bw.s[Math.max(0, bw.k - 1)]
            }
        }
    }
}
TalentCalc.MODE_DEFAULT = 0;
TalentCalc.MODE_PET = 1;
Listview.templates.glyph = {
    sort: [1],
    nItemsPerPage: -1,
    hideBands: 2,
    hideNav: 1 | 2,
    hideHeader: 1,
    searchable: 1,
    searchDelay: 100,
    poundable: 0,
    filtrable: 0,
    clip: {
        w: 780,
        h: 486
    },
    onBeforeCreate: function () {
        this.applySort()
    },
    onSearchSubmit: function (b) {
        if (this.nRowsVisible != 1) {
            return
        }
        $WowheadTalentCalculator.addGlyph(b.id)
    },
    columns: [{
        id: "glyph",
        type: "text",
        align: "left",
        value: "name",
        span: 2,
        compute: function (g, j, h) {
            if (g.none) {
                return
            }
            var c = $WH.ce("td");
            c.style.width = "1px";
            c.style.padding = "0";
            c.style.borderRight = "none";
            var e = Icon.create(g.icon, 0, null, wowheadUrl + "/item=" + g.id),
                f = Icon.getLink(e);
            $WH.ae(c, e);
            $WH.ae(h, c);
            j.style.borderLeft = "none";
            f.onclick = $WH.rf;
            var b = $WH.ce("a");
            b.style.fontFamily = "Verdana, sans-serif";
            b.href = wowheadUrl + "/item=" + g.id;
            $WH.ae(b, $WH.ct($WowheadTalentCalculator.simplifyGlyphName(g.name)));
            j.style.whiteSpace = "nowrap";
            $WH.ae(j, b);
            $(h).click(function (k) {
                if (k.which != 2 || k.target != b) {
                    k.preventDefault();
                    ($WowheadTalentCalculator.addGlyph.bind(null, g.id))()
                }
            })
        },
        sortFunc: function (e, c, f) {
            if (e.none) {
                return -1
            }
            return $WH.strcmp(e.name, c.name)
        }
    }, {
        id: "description",
        type: "text",
        align: "left",
        value: "description",
        compute: function (b, e) {
            if (b.none) {
                return
            }
            var c = $WH.ce("div");
            c.className = "small crop";
            e.title = b.description;
            $WH.ae(c, $WH.ct(b.description));
            $WH.ae(e, c)
        }
    }, {
        id: "level",
        type: "text",
        align: "center",
        value: "level",
        compute: function (b, c) {
            if (b.none) {
                return
            }
            c.className = "small q0";
            c.style.whiteSpace = "nowrap";
            return LANG.tc_level.replace("%s", b.level)
        }
    }, {
        id: "skill",
        type: "text",
        align: "center",
        getValue: function (b) {
            if (b.none) {
                return
            }
            return g_spell_skills[b.skill]
        },
        compute: function (b, e, c) {
            if (b.none) {
                $WH.ee(c);
                $(c).click($WowheadTalentCalculator.addGlyph.bind(null, 0));
                e.colSpan = 5;
                e.style.fontWeight = "bold";
                e.style.textAlign = "center";
                return LANG.dash + LANG.tc_nonegly + LANG.dash
            }
            if (b.skill) {
                e.className = "small q0";
                e.style.whiteSpace = "nowrap";
                return g_spell_skills[b.skill]
            }
        }
    }]
};
var talentSummary;