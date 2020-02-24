(function () {
    console.log("inicio datos...");
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/type/",
        success: function (data) {


            console.log(data);

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
    var url = $("#selectTipo option:selected").attr("id");
    var valor = document.getElementById("selectTipo").value;
    cargaDatos(url, valor);
}
function cargaDatos(url, valor) {
    console.log("cargo datos-- " + url);
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data.pokemon);
            for (i = 0; i < data.pokemon.length; i++) {
                console.log(data.pokemon[i].pokemon.name);
            }
        }
    });
   
    console.log("entro aqui");
    $("section.section-pokemones").html("<h2>Pokemones de tipo "+ valor +"</h2>");
}