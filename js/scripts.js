let pokemonRepository = (function () {
    // Array to hold Pokémon data
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
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
      let listItemPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listItemPokemon.appendChild(button);
      pokemonListElement.appendChild(listItemPokemon);
  
      // Add event listener to the button
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    }
  
    // Function to show details of the Pokémon in the console
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }
  
    // Function to load the list of Pokémon from the API
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
    }
  
    // Function to load details of a specific Pokémon from the API
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(typeInfo => typeInfo.type.name);
      }).catch(function (e) {
        console.error(e);
      });
    }
  
    // Return functions to be available publicly
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();
  
  // Load the list of Pokémon and add them to the display
  pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  