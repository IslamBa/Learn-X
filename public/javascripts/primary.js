var count = 0;

//Damit kann die Antwort angezeigt werden.
$(".drop-icon").click(function () {
    if (count == 0) {
        $(".drop-text").slideDown();
    }

    if (count == 1) {
        $(".drop-text").slideUp();
        count = -1;
    }
    count++;
})


//Durch scrollen kann die Navbar nicht mehr benützt werden.
$('body').bind('touchmove', function (e) {
    if ($(this).scrollTop() == 0) {
        $(".main").disable();
    }

});

/*$(".group_row").click(function () {
    $(this).children().eq(1).children().addClass("group_status");
})*/


//Geht zurück zu der Page von der die Person gekommen ist.
$('.page-back').click(function () {
    parent.history.back();
    return false;
});


//Zeigen des Modals
$(".new-group").click(function () {
   $(".bottomNav").removeClass("fixed-bottom");
})


$(".beitritt-group").click(function () {
    $(".bottomNav").removeClass("fixed-bottom");
 })

 $(".addfrage").click(function () {
    $(".bottomNav").removeClass("fixed-bottom");
 })

//Pop Up öffnen
$(function () {
    //----- OPEN
    $('[data-popup-open]').on('click', function (e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        e.preventDefault();
        $('#new_groupName').val("");
    });
    //----- CLOSE
    $('[data-popup-close]').on('click', function (e) {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        e.preventDefault();
        $(".bottomNav").addClass("fixed-bottom");
    });

});

$(".addGroup").click(function(){
    $(".popup").fadeOut(500);
    $(".bottomNav").addClass("fixed-bottom");
})

$(".joinGroup").click(function(){
    $(".popup").fadeOut(500);
    $(".bottomNav").addClass("fixed-bottom");
})

$(".addQuestion").click(function(){
    $(".popup").fadeOut(500);
    $(".bottomNav").addClass("fixed-bottom");
})

$(".updateInhalt").click(function(){
    $(".popup").fadeOut(500);
    $(".bottomNav").addClass("fixed-bottom");
})

$(".deleteInhalt").click(function(){
    $(".popup").fadeOut(500);
    $(".bottomNav").addClass("fixed-bottom");
})

