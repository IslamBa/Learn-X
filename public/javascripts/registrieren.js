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

$(document).keypress(function(event) {
    if (event.keyCode == 13) {
        $(".registrieren").click();
    }
});