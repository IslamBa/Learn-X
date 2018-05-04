var count = 0;

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

$('body').bind('touchmove', function(e) { 
    if($(this).scrollTop() == 0){
        $(".main").disable();
    }
    
});

$(".group_row").click(function(){
    $(this).children().eq(1).children().addClass("group_status");
})
