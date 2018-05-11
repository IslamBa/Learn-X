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
                alert("Benutzername und passwort Stimmen nicht überein");
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
        $(".login").click();
    }
});
