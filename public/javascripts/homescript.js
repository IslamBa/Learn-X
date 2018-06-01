$("body").bind("mousewheel", function () { return false; });

$("body").bind("mousewheel", function (evt, chg) {
    this.scrollLeft -= (chg * 50); //need a value to speed up the change
    evt.preventDefault();
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$(".navLink").click(function () {

    $(".main").enable();
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
});

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

$(".addGroup").click(function () {
    let g_name = $("#new_groupName").val();
    let b_id = $(".b_id").attr("id");
    let rnd_id = makeid();
    if (g_name == "") {
        alert("Bitte alle Felder ausfüllen !");
    }
    else {
        $.ajax({
            method: "post",
            url: "/groups",
            data: {
                g_name: g_name,
                b_id: b_id,
                rnd_id: rnd_id
            },
            success(res) {
                alert("Neue Gruppe hinzugefügt");
                getGroups();
            },
            error(err) {
                console.log(err);
            }
        });
    }

});

function getGroups() {
    let b_id = $(".b_id").attr("id");
    $.ajax({
        method: "get",
        url: "/groups/" + b_id,
        success(res) {
            console.log("gruppen bekommen");
            $(".anyClass").empty();
            res.forEach(element => {
                let htmlString =
                    `<div id="` + element.rnd_id + `" class="row group_row group_name">
                <div class="col-10" align="left">
                    <h4>
                       `+ element.g_name + `
                    </h4>
                    <span class="anzahl" style="display:none;">`+ element.pers_anz + `</span>
                </div>
                <div class="col-2 group_col">
                    <div class="status">
            
                    </div>
                </div>
                </div>`;
                $(".anyClass").append(htmlString);
            });
        },
        error(err) {
            console.log(err);
        }
    });
};

$(".anyClass").on("click", ".group_row", function () {
    for (var i = 0; i <= $(".group_row").length; i++) {
        if ($(".group_row").eq(i).hasClass("border_row")) {
            $(".group_row").eq(i).removeClass("border_row")
        }
        else {
            $(this).addClass("border_row");
        }
    }
})

getGroups();

$(".anyClass").on("click", ".group_name", function () {
    let rnd_id = $(this).attr("id");
    let g_name = $(this).find(".col-10").find("h4").text();
    $("#groupID").text(rnd_id);
    $("#groupName").text(g_name);
    $.ajax({
        method: "get",
        url: "/content/" + rnd_id,
        success(res) {
            alert("gruppe ausgewählt")
            console.log(res);
            $(".gruppe").attr("id", rnd_id);
            var random = Math.floor((Math.random() * res.length) + 0);
            $(".frg").remove();
            $("#groupCount").text("1");
            if (res.length > 0) {
                $("#rndFrage").text(res[random].frage);
                $("#rndAntwort").text(res[random].antwort);
                $("#groupCount").text(res[0].pers_anz);
                res.forEach(element => {
                    let fragen = `<div class="row frg">
                    
                    <div value="`+ element.f_id + `" class="col-lg-12 col-md-12 col-sm-12 frage">
                    <i class="material-icons right bearbeiten">create</i>
                    <p class="frage_element">`+ element.frage + `</p>
                        <div class="antwort" value="`+ element.antwort + `"></div>
                        <hr>
                        
                    </div>
                    </div>`
                    $(".scrollfrage").append(fragen);
                });
            }
        },
        error(err) {
            console.log(err);
        }
    })
});

let fid;
let indexContent;

$(document).on("click", ".bearbeiten", function () {
    $("#popup4").show();
    indexContent = $(this).parent().parent().index($('.frg'));
    let frg = $(this).closest(".frage").find("p").text();
    let ant = $(this).closest(".frage").find(".antwort").attr("value");
    fid = $(this).closest(".frage").attr("value");
    $("#updateFrage").val(frg);
    $("#updateAntwort").val(ant);
    $(".bottomNav").removeClass("fixed-bottom");

});

$("#btnRandom").click(function () {
    if ($("#groupID").text() == "-") alert("Bitte Gruppe auswählen");
    else {
        var g_id = $(".gruppe").attr("id");
        $.ajax({
            method: "get",
            url: "/content/" + g_id,
            success(res) {
                console.log(res);
                var random = Math.floor((Math.random() * res.length) + 0);
                if (res.length > 0) {
                    $("#rndFrage").text(res[random].frage);
                    $("#rndAntwort").text(res[random].antwort);
                }
            },
            error(err) {
                console.log(err);
            }
        })
    }
})

$(".joinGroup").click(function () {
    let rnd_id = $("#join_groupName").val();
    let b_id = $(".b_id").attr("id");
    if (rnd_id == "") {
        alert("Bitte alle Felder ausfüllen !");
    }
    else {
        $.ajax({
            url: "/groups/" + b_id,
            method: "put",
            data: {
                b_id: b_id,
                rnd_id: rnd_id
            },
            success(res) {
                console.log("Gruppe gejoint" + res);
                alert("Gruppe beigetreten");
                getGroups();
            },
            error(err) {
                console.log(err);
            }
        });
    }

});

$(".addInhalt").click(function () {
    let rnd_id = $(".gruppe").attr("id");
    if (rnd_id == undefined) { alert("Bitte Gruppe auswählen"); }
    else if ($("#newFrage").val() == "" || $("#newAntwort").val() == "") {
        alert("Bitte alle Felder ausfüllen !");
    }
    else {
        let frage = $("#newFrage").val();
        let antwort = $("#newAntwort").val();

        $.ajax({
            url: "/content/" + rnd_id,
            method: "post",
            data: {
                frage: frage,
                antwort: antwort,
                rnd_id: rnd_id
            },
            success(res) {
                alert("Inhalt hinzugefügt");
                getContent();
                console.log("Inhalt hinzugefügt");
            },
            error(err) {
                console.log(err);
            }
        })

        $(".popup").fadeOut(500);
        $(".bottomNav").addClass("fixed-bottom");
    }
    $('#newFrage').val('');
    $('#newAntwort').val('');
});

function getContent() {
    let rnd_id = $(".gruppe").attr("id");
    $.ajax({
        method: "get",
        url: "/content/" + rnd_id,
        success(res) {
            console.log(res);
            if (res.length > 0) {
                $(".frg").remove();
                res.forEach(element => {
                    let fragen = `<div class="row frg">
                    <div value="`+ element.f_id + `" class="col-lg-12 col-md-12 col-sm-12 frage">
                    <i class="material-icons bearbeiten right">create</i>
                    <p class="frage_element">`+ element.frage + `</p>
                        <div class="antwort" value="`+ element.antwort + `"></div>
                        <hr>
                    </div>
                    </div>`
                    $(".scrollfrage").append(fragen);
                });
            }
        },
        error(err) {
            console.log(err);
        }
    })
}

$(".updateInhalt").click(function () {
    let frg = $("#updateFrage").val();
    let ant = $("#updateAntwort").val();
    if (frg == "" || ant == "") {
        alert("Bitte alle Felder ausfüllen !");
    }
    else {
        $.ajax({
            method: "put",
            url: "/content/" + fid,
            data: {
                fid: fid,
                frage: frg,
                antwort: ant
            },
            success(res) {
                console.log("Inhalt verändert");
                $(".frg").eq(indexContent).find(".frage_element").text(frg);
                $(".frg").eq(indexContent).find(".antwort").attr("value", ant);
            },
            error(err) {
                console.log(err);
            }
        })
    }

});

$(".deleteInhalt").click(function () {
    $.ajax({
        method: "delete",
        url: "/content/"+fid,
        success(res){
            console.log("Inhalt gelöscht");
            $(".frg").eq(indexContent).remove();
         
        },
        error(err){
            console.log(err);
        }
    })
});




