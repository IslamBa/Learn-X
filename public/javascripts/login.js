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
        method: "post",
        url: "/benutzer",
        data: {
            name: name,
            passwort: passwort
        },
        success(res) {
            if(typeof res == "object"){
                window.location.href = "/home/"+name;
            }
            else if(res == false){
                alert("Benutzername und passwort stimmen nicht überein");
            }
            else{
                alert("Benutzername nicht bekannt");
            }
        },
        error(err){
            console.log(err.responseText);
            alert(err.responseText);
        }
    });
})

function Benutzer(name){
    $.ajax({
        method:"get",
        url:"/benutzer/"+name,
        success(res){
            console.log(res);
            return res;
        },
        error(err){
            console.log(err);
        }
    });
}
$(document).keypress(function(event) {
    if (event.keyCode == 13) {
        let name = $("#name").val();
        let passwort = $("#password").val();

        $.ajax({
            method: "post",
            url: "/benutzer/" + name,
            data: {
                name: name,
                passwort: passwort
            },
            success(res) {
                if(res == true){
                    window.location.href = "/home";
                }
                else if(res == false){
                    alert("Benutzername und passwort stimmen nicht überein");
                }
                else{
                    alert("Benutzername nicht bekannt");
                }
                
            },
            error(err){
                console.log(err.responseText);
                alert(err.responseText);
            }
        });
    }
});
