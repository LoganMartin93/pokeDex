let pokemonRepository = (function(){
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: 'Grass'},
        {name: 'Charmander', height: 0.6, types: 'Fire'},
        {name: 'Pikachu', height: 0.4, types: 'Electric'},
        {name: 'Charizard', height: 1.7, types: 'Fire, Flying'}

    ];

    function add(pokemon){
        pokemonList.push(pokemon);
    }

    function getAll(){
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})();

pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
    if(pokemon.height > 1){
        document.write("Wow, that's big!");
    }
    document.write("<br>");
});
