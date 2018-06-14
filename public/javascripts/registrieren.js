$("#btnReg").click(function () {
    var name = $("#regName").val();
    var passwort = $("#regPass").val();
    if (name == "" || passwort == "") {
        Materialize.toast("Bitte alle Felder ausfüllen !", 1000);
    }
    else {
        $.ajax({
            method: "get",
            url: "/benutzer",
            success(res) {
                $.ajax({
                    url: "/registrieren/neu",
                    method: "post",
                    data: { name: name, passwort: passwort },
                    success(res) {
                        Materialize.toast('Sie wurden registriert !', 1000);
                        function later(){
                            window.location = "/";
                        }

                        setTimeout(later,1000);
                        
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
    }
});

$(document).keypress(function (event) {
    if (event.keyCode == 13) {
        $('#btnReg').click();
    }
});