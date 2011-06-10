$(document).ready(function () {
    Menu.addButtons($("#home-menu"), mn_path);
    var b = $("#home-search form");
    b.submit(g_preventEmptyFormSubmission);
    var a = $("input", b);
    LiveSearch.attach(a);
    a.focus();
    var c;
    if ($WH.isset("g_thottbot") && g_thottbot) {
        c = $("<button></button>").text("Search")
    } else {
        c = $("<a></a>").attr("href", "javascript:;")
    }
    c.click(function () {
        $(this).parent("form").submit().children("input").focus()
    }).appendTo(b);
    $(".home-featuredbox-links a").hover(function () {
        $(this).next("var").addClass("active")
    }, function () {
        $(this).next("var").removeClass("active")
    })
});