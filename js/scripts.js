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
        showModal(pokemon);
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
    
    function showModal(pokemon){
        let pokemonListElement = document.querySelector('.pokemon-list');

        //remove any existing modals
        let existingModal = pokemonListElement.querySelector('.modal');
        if(existingModal){
            existingModal.remove();
        }

        //create the modal
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.classList.add('modal-title');
        titleElement.innerText = pokemon.name;
    
        let contentElement = document.createElement('p');
        contentElement.classList.add('modal-text');
        contentElement.innerText = `Height: ${pokemon.height}`;
    
        let imageElement = document.createElement('img');
        imageElement.classList.add('modal-image');
        imageElement.src = pokemon.imageUrl;
        imageElement.alt = pokemon.name;
    
        // Append elements to the modal
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        pokemonListElement.appendChild(modal);

        // Show the modal
        modal.classList.add('is-visible');
    }

    function hideModal() {
        let modal = document.querySelector('.modal');
        if (modal) modal.remove();
      }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
        hideModal();
        }
      }

      window.addEventListener('keydown', handleKeydown);

      //window.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        //let target = e.target;
        //if (target === modal) {
          //hideModal();
        //}
      //});


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
  