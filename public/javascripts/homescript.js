$("body").bind("mousewheel", function () { return false; });

$("body").bind("mousewheel", function (evt, chg) {
    this.scrollLeft -= (chg * 50); //need a value to speed up the change
    evt.preventDefault();
});


$(".navLink").click(function () {
    //OnePage wechsel mit unterer Navigation
    var unterschied = Math.abs($(this).index() - $(".activeLink").index());

    if ($(this).index() > $(".activeLink").index()) {
        while (unterschied != 0) {
            $(".main").moveDown();
            unterschied -= 1;
        };
    }
    if ($(this).index() < $(".activeLink").index()) {
        while (unterschied != 0) {
            $(".main").moveUp();
            unterschied -= 1;
        };
    }

    //Untere Navigation Icons/Text wechsel
    $(".navLink").each(function () {
        $(this).removeClass("activeLink");
        $(this).empty();
        if ($(this).attr("id") == "navHome") {
            $(this).append('<i class="material-icons navIcons">home</i>');
        }
        else if ($(this).attr("id") == "navGruppe") {
            $(this).append('<i class="material-icons navIcons">list</i>');
        }
        else if ($(this).attr("id") == "navFrage") {
            $(this).append('<i class="material-icons navIcons">control_point</i>');
        }
        else {
            $(this).append('<i class="material-icons navIcons">info</i>');
        }
    });

    $(this).addClass("activeLink");

    if ($(this).attr("id") == "navHome") {
        $(this).children("i").remove();
        $(this).append("Home");
    }
    else if ($(this).attr("id") == "navGruppe") {
        $(this).children("i").remove();
        $(this).append("Gruppen");
    }
    else if ($(this).attr("id") == "navFrage") {
        $(this).children("i").remove();
        $(this).append("Fragen");
    }
    else {
        $(this).children("i").remove();
        $(this).append("Info");
    }
})

$(".main").onepage_scroll({
    sectionContainer: "section",
    easing: "ease",

    animationTime: 1000,
    pagination: false,
    updateURL: false,
    beforeMove: function (index) {
    },
    afterMove: function (index) {
    },
    loop: false,
    keyboard: true,
    responsiveFallback: false,


    direction: "horizontal"
});

