// $(".login").click(function () {
//     let name = $("#name").val();
//     let passwort = $("#password").val();

//     $.ajax({
//         method: "post",
//         url: "/login",
//         data: {
//             name: name,
//             passwort: passwort
//         },
//         success(res) {
//             console.log("login erfolgreich");
//             window.location ="/home/islam";
//         },
//         error(err){
//             console.log(err.responseText);
//             alert(err.responseText);
//         }
//     });
// });

// function Benutzer(name){
//     $.ajax({
//         method:"get",
//         url:"/benutzer/"+name,
//         success(res){
//             console.log(res);
//             return res;
//         },
//         error(err){
//             console.log(err);
//         }
//     });
// }
$(document).keypress(function(event) {
    if (event.keyCode == 13) {
        $(".login").click();
    }
});
