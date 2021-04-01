$(document).ready(function () {
    
    $('.mobilmenu').click(function (){
        
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
        "order": [[ 1, "desc" ]],
        "pageLength": 50
    });

});


