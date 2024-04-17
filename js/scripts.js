let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: 'Grass'},
    {name: 'Charmander', height: 0.6, types: 'Fire'},
    {name: 'Pikachu', height: 0.4, types: 'Electric'},
    {name: 'Charizard', height: 1.7, types: 'Fire, Flying'}

];

for(let i = 0; i < 4; i++){
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
    if(pokemonList[i].height > 1){
        document.write("Wow, that's big!");
    }
    document.write("<br>");
}
