$("#btnReg").click(function () {
    var name = $("#regName").val();
    var passwort = $("#regPass").val();

    $.ajax({
        method: "get",
        url: "/benutzer",
        success(res) {
            console.log(res);
        },
        error(err) {
            console.log(err);
        }
    });

    $.ajax({
        url: "/registrieren/neu",
        method: "post",
        data: { name: name, passwort: passwort },
        success() {
            console.log("neuen Benutzer hinzugefügt");
        },
        error(err) {
            console.log(err);
        }
    });
});

$(".login").click(function () {
    $.ajax({
<<<<<<< HEAD
        method : "get",
        url : "/login/neu",
        data : { name : $("#name").val(),
                 passwort : $("#password").val()},
        success(res){
            $(this).attr("href","/home");
=======
        method: "get",
        url: "/benutzer",
        success(res) {
            console.log(res);
        },
        error(err) {
            console.log(err);
>>>>>>> 2e21f68b3fb2c27faf3802850982db0edea2d820
        }
    });
})