(function () {
    console.log("inicio datos...");

    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/type/",
        success: function (data) {

            var aux = [];

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
    $("#lista-pokemones").empty();
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
                    
                    $("#lista-pokemones").append('<div class="col-1 columnas-principal"><div id="'+pok[i]+'" class="card carta-principal" onclick="obtenerDatoPokemon(id);">' + pok[i] + '</div></div>');

                }
            }
        });
    
}

function obtenerDatoPokemon(nombrePokemon) {

    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/pokemon/"+nombrePokemon+"/",
        success: function (data) {
            var nombre = data.name;
            var peso = data.weight /10;
            var imagen = data.sprites.front_default;
            var habilidades = data.abilities;
            var habilidades_concatenadas = "";

            var stats = data.stats;

            for (i = 0; i < habilidades.length; i++) {
                habilidades_concatenadas = habilidades_concatenadas +"   " + data.abilities[i].ability.name;
            }

            $("#modal").html('<div class="modal" id="modalPokemon" tabindex="-1" role="dialog">'+
                '<div class= "modal-dialog" role = "document" >'+
                '<div class="modal-content" style="height: 820px;">'+
                    '<div class="modal-header header__modalPokemon">'+
                        '<h5 class="modal-title">'+nombre+'</h5>'+
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                            '<span aria-hidden="true">&times;</span>'+
                        '</button>'+
                    '</div>'+
                '<div class="modal-body">' +
                '<div class="modal__contenedor">'+
                    '<img/ src=' + imagen + ' alt="Imagen de pokemon" class="modal__img">' +
                '</div>' +
                    '<p class="text-center"><strong>Nombre:</strong> ' + nombre + '</p>' +
                    '<p class="text-center"><strong>Peso:</strong> ' + peso + ' kg</p>' +
                    '<p class="text-center"><strong>Habilidades:</strong> ' + habilidades_concatenadas + '</p>' +
                '<div id="graficoPokemon">' + +'</div>'+
                    '</div>'+
                '</div>'+
                  '</div>'+
                '</div>');

            $('#modalPokemon').modal('show');
            creaGraficoHabilidades(stats);
        }        
    });
}

function creaGraficoHabilidades(stats) {

    var arregloStats = [];

    for (i = 0; i < stats.length; i++) {
       arregloStats.push({ y: stats[i].base_stat, label: stats[i].stat.name });
    }
    
    var chart = new CanvasJS.Chart("graficoPokemon", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Stats"
        },
        width: 400,
            data: [{
                type: "column",
                showInLegend: false,
                legendMarkerColor: "grey",
                dataPoints: arregloStats
            }]
        });
        chart.render();
}



