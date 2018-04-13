var count = 0;

$(".drop-icon").click(function(){
     if(count == 0){
    $(".drop-text").fadeIn();
    }

    if(count == 1)
    {
    $(".drop-text").fadeOut();
    count = -1;
    }

    count++;

})