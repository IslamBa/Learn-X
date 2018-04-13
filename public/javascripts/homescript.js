$(".navLink").click(function(){
    $(".navLink").each(function(){
        $(this).removeClass("activeLink");
        if($(this).attr("id") == "navHome"){
            $(this).append('<i class="material-icons">home</i>');
        }
        else if($(this).attr("id") == "navGruppe"){
            $(this).append('<i class="material-icons">list</i>');
        }
        else if($(this).attr("id") == "navFrage"){
            $(this).append('<i class="material-icons">control_point</i>');
        }
        else{
            $(this).append('<i class="material-icons">info</i>');
        }
    });
    $(this).addClass("activeLink");

    if($(this).attr("id") == "navHome"){
        $(this).children("i").remove();
        $(this).append("Home");
    }
    else if($(this).attr("id") == "navGruppe"){
        $(this).children("i").remove();
        $(this).append("Gruppen");
    }
    else if($(this).attr("id") == "navFrage"){
        $(this).children("i").remove();
        $(this).append("Fragen");
    }
    else{
        $(this).children("i").remove();
        $(this).append("Info");
    }

})