function Book(f) {
    if (!f.parent || !f.pages || f.pages.length == 0) {
        return
    }
    f.parent = $WH.ge(f.parent);
    var g, b, c;
    this.nPages = f.pages.length;
    this.parent = $WH.ge(f.parent);
    this.parent.className += " book";
    g = $WH.ce("div");
    g.className = "paging";
    if (this.nPages == 1) {
        g.style.display = "none"
    }
    $WH.ns(g);
    c = $WH.ce("div");
    c.style.visibility = "hidden";
    c.className = "previous";
    b = $WH.ce("a");
    b.appendChild($WH.ct(String.fromCharCode(8249) + LANG.lvpage_previous));
    b.href = "javascript:;";
    b.onclick = this.previous.bind(this);
    c.appendChild(b);
    g.appendChild(c);
    c = $WH.ce("div");
    c.style.visibility = "hidden";
    c.className = "next";
    b = $WH.ce("a");
    b.appendChild($WH.ct(LANG.lvpage_next + String.fromCharCode(8250)));
    b.href = "javascript:;";
    b.onclick = this.next.bind(this);
    c.appendChild(b);
    g.appendChild(c);
    c = $WH.ce("b");
    c.appendChild($WH.ct("1"));
    g.appendChild(c);
    g.appendChild($WH.ct(LANG.lvpage_of));
    c = $WH.ce("b");
    c.appendChild($WH.ct(this.nPages));
    g.appendChild(c);
    f.parent.appendChild(g);
    for (var e = 0; e < this.nPages; ++e) {
        g = $WH.ce("div");
        g.className = "page";
        g.style.display = "none";
        g.innerHTML = f.pages[e];
        f.parent.appendChild(g)
    }
    this.page = 1;
    this.changePage(f.page || 1)
}
Book.prototype = {
    changePage: function (b) {
        if (b < 1) {
            b = 1
        } else {
            if (b > this.nPages) {
                b = this.nPages
            }
        }
        var a = this.parent.childNodes;
        a[this.page].style.display = "none";
        a[b].style.display = "";
        this.page = b;
        a = a[0].childNodes;
        a[0].style.visibility = (b == 1) ? "hidden" : "visible";
        a[1].style.visibility = (b == this.nPages) ? "hidden" : "visible";
        a[2].innerHTML = b
    },
    next: function () {
        this.changePage(this.page + 1)
    },
    previous: function () {
        this.changePage(this.page - 1)
    }
};