$(".login").click(function(){
    if($("#name").val()=="schueler" && $("#password").val() == "schueler"){
       $(this).attr("href","/home");
    }
})
