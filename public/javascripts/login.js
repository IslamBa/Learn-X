$("#btnReg").click(function(){
    var name = $("#regName").val();
    var passwort = $("#regPass").val();
    $.ajax({
        url: "/registrieren/neu",
        method: "post",
        data: { nam: name, pass: passwort},
        success (){
            console.log("neuen Benutzer hinzugefügt");
        },
        error(err){
            console.log(err);
        }
    });
});

$(".login").click(function(){
    $.ajax({
        method : "get",
        url : "/login/neu",
        success(res){

        }
    })
})