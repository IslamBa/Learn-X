$("#btnReg").click(function(){
    var name = $("#regName").val();
    var passwort = $("#regPass").val();
    $.ajax({
        url: "/registrieren/neu",
        method: "post",
        data: { name: name, passwort: passwort},
        success (){
            console.log("neuen Benutzer hinzugefügt");
        },
        error(err){
            console.log(err);
        }
    });
});