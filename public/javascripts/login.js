$(".login").click(function () {
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
})

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