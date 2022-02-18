//MOBILMENU - YOGA
$(document).ready(function() {

    $('.mobilmenu').click(function() {

        $('.menu').toggleClass("menunyit");
    });

    $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true,
        slideWidth: 1500,
        auto: true,
        autoDirection: 'next',
        autoDelay: 2
    });

    $('.stripe').DataTable({
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Hungarian.json"
        },
        "order": [
            [1, "desc"]
        ],
        "pageLength": 50
    });

});

//SEND DATA
function sendDataAjax(objectData) {

    objectData.method == objectData.method || "GET",
        objectData.contentType == objectData.contentType || "application/x-www-form-urlencoded",
        objectData.data == objectData.data || {},
        objectData.success == objectData.success || function() {}

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        objectData.success(this.responseText);
    }
    var dataString = "";
    var dataArray = [];

    if (objectData.contentType != "application/json") {
        for (let key in objectData.data) {
            dataArray.push = `${key} = ${objectData.data[key]}`;
            dataString = dataArray.join("&");
        }
    } else {
        dataString = JSON.stringify(objectData.data);
    }

    xhttp.open(objectData.method, objectData.url + (objectData.method == "GET" ? "?" + dataString : ""));
    xhttp.send(dataString);
}

document.getElementById('sendDataYoga').onclick = function() {

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    if (name != "" && email != "" && subject != "" && message != "") {

        sendDataAjax({
            method: "POST",
            contentType: "application/json",
            url: "/datasend",
            data: {
                nev: name,
                email: email,
                subject: subject,
                message: message,
            },
            success: function(resp) {
                console.log({ saved: "Ok!" });
                console.log(resp);

                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('subject').value = "";
                document.getElementById('message').value = "";
            }
        });
    } else {
        alert("Nem töltöttél ki minden mezőt!");
    }
};