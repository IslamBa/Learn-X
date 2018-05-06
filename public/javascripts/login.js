$("#btnReg").click(function () {
    var name = $("#regName").val();
    var passwort = $("#regPass").val();

    $.ajax({
        method: "get",
        url: "/benutzer",
        success(res) {
            console.log(res);
            $.ajax({
                url: "/registrieren/neu",
                method: "post",
                data: { name: name, passwort: passwort },
                success(res) {
                    console.log("neuen Benutzer hinzugefügt");
                },
                error(err) {
                    alert(err.responseText);
                    console.log(err.responseText);
                }
            });
        },
        error(err) {
            console.log(err.responseText);
        }
    });


});

$(".login").click(function () {
    let name = $("#name").val();
    let passwort = $("#password").val();

    $.ajax({
        method: "get",
        url: "/benutzer/" + name,
        data: {
            name: name,
            passwort: passwort
        },
        success(res) {
            $(this).attr("href", "/home");
        },
        error(err){
            console.log(err);
        }
    });
})