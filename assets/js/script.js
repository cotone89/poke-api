(function () {
    console.log("inicio datos...");
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/type/",
        success: function (data) {

            for (i = 0; i < data.results.length; i++) {
                var selectTipoNombre = data.results[i].name;
                var selectTipoUrl = data.results[i].url;

                var x = document.getElementById("selectTipo");
                var option = document.createElement("option");
                option.text = selectTipoNombre;
                option.id = selectTipoUrl;
                x.add(option);

            }
        }
    });
})();



function buscaPokemon() {
    $(".section.section-pokemones").empty();
    var url = $("#selectTipo option:selected").attr("id");
    var valor = document.getElementById("selectTipo").value;
    cargaArregloPokemones(url, valor);
}
function cargaArregloPokemones(url, valor) {
    var pokemones = [];
   
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            for (i = 0; i < data.pokemon.length; i++) {
                let pok = [];
                pok[i] = data.pokemon[i].pokemon.name;   
                pokemones[i] = pok[i];
            }


            obtenerDatoPokemon(valor, pokemones);

        }
    });


 
  
   
}

function obtenerDatoPokemon(valor, pokemones) {


    for (i = 0; i < pokemones.length; i++) {
        console.log("entro al for");
        $.ajax({
            type: "GET",
            url: "https://pokeapi.co/api/v2/pokemon/"+pokemones[i]+"/",
            success: function (data) {

         
                $("#lista-pokemones").append('<div class="col-1"><div class="card">' +data.name +'</div></div>');
            }
        });
    }

}

/*
 *  $("#pokemones").append("<h2>Pokemones de tipo " + valor + "</h2>");
 * $("#lista-pokemones").append('<div class="col-1">' +
    '<div class="card">' +
    data.pokemon[i].pokemon.name +
    '</div>' +
    '</div>');*/
