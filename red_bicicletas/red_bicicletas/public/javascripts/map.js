var map = L.map('main_map', {
    center: [6.217, -75.567],
    zoom: 13
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);

$.ajax({
  dataType: "json",
  url: "api/bicicletas",
  success: function(result){
    console.log(result);
    result.bicicletas.forEach(function(bici){
      L.marker(bici.ubicacion, {title.:bici.id}).addTo(map);
    });
  }
})
