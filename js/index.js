const pokemonImage = document.querySelector('.pokemon__image');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');

let searchPokemon = 1;


// FUNÇÕES //
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}


const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonName.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.style.display = 'block';
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id;
    input.value = '';
  } else {
    pokemonImage.style.display = 'nome';
    pokemonName.innerHTML = 'Not found :(';
    pokemonNumber.innerHTML = '';
  }
}


form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase()); 
});


prevBtn.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});


nextBtn.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon); 
});


renderPokemon(searchPokemon);
