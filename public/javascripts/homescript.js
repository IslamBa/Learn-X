$("body").bind("mousewheel", function () { return false; });

$("body").bind("mousewheel", function (evt, chg) {
    this.scrollLeft -= (chg * 50); //need a value to speed up the change
    evt.preventDefault();
});


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
    $.ajax({
        method: "post",
        url: "/groups",
        data: {
            g_name: g_name,
            b_id: b_id
        },
        success(res) {
            alert("Neue Gruppe hinzugefügt")
        },
        error(err) {
            console.log(err);
        }
    });
});

function getGroups() {
    let b_id = $(".b_id").attr("id");
    $.ajax({
        method: "get",
        url: "/groups/" + b_id,
        success(res) {
            console.log("gruppen bekommen");
            res.forEach(element => {
                let htmlString = 
                `<div class="row group_row">
                <div class="col-10" align="left">
                    <h4 id="`+element.l_id+`" class="group_name">
                       `+element.g_name+`
                    </h4>s
                </div>
                <div class="col-2 group_col">
                    <div>
            
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

getGroups();

$(".anyClass").on("click",".group_name",function(){
    let g_id = $(this).attr("id");
    let g_name = $(this).text();
    $("#groupID").text(g_id);
    $("#groupName").text(g_name);
    $.ajax({
        method:"get",
        url:"/content/"+g_id,
        success(res){
            console.log(res);
            $("#groupCount").text(res[0].pers_anz);
        },
        error(err){
            console.log(err);
        }
    })
});

