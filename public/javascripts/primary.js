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