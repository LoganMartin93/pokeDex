let pokemonRepository = (function () {
    // Array to hold Pokémon data
    let pokemonList = [
      { name: 'Bulbasaur', height: 0.7, types: 'Grass' },
      { name: 'Charmander', height: 0.6, types: 'Fire' },
      { name: 'Pikachu', height: 0.4, types: 'Electric' },
      { name: 'Charizard', height: 1.7, types: 'Fire, Flying' }
    ];
  
    // Function to add a new Pokémon to the list
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    // Function to get all Pokémon from the list
    function getAll() {
      return pokemonList;
    }
  
    // Function to add a list item for each Pokémon
    function addListItem(pokemon) {
      let pokemonListElement = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);
  
      // Add event listener to the button
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    }
  
    // Function to show details of the Pokémon in the console
    function showDetails(pokemon) {
      console.log(pokemon);
    }
  
    // Return functions to be available publicly
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
  
  // Adding each Pokémon from the list to the display as a list item
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
  