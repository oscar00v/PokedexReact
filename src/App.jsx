import React, { useState } from 'react'
import Input from './components/Input/Input.jsx';
import PokemonDetails from './components/details/pokemonDetails.jsx';
import './styles.css';
import Banner from './components/banner/banner.jsx';
import { useEffect } from 'react';

function App() {
  const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  const [busqueda, setBusqueda] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);//
  const [error, setError] = useState(null);
  //////////?

  async function fetchPokemons() {

    const response = await fetch(URL_BASE);
    console.log("La Respuesta:", response);

    if (!response.ok) {
      //!como se pone la respuesta de error en React
      throw new Error("Error fetching Pokémon data");
    }
    const data = await response.json();
    //todo console.log("data:", data);
    return data.results;

  }
  // useEffect para cargar la lista de Pokémon al montar el componente
  useEffect(() => {
    async function getPokemons() {
      const pokemonData = await fetchPokemons();
      //*pokemons = pokemonData.results;//para poder usar los urls de los pokemons 
      console.log("data:", pokemonData);
      setPokemons(pokemonData);
    }

    getPokemons();
  }, []);

  // Función para obtener detalles de un Pokémon específico
  async function getPokemonDetails(URLPokemon) {
    const response = await fetch(URLPokemon);
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del Pokémon");
    }

    const datapokemon = await response.json();
    setPokemonDetails(datapokemon); // Guardar los detalles en el estado

    return datapokemon;
  }

  useEffect(() => {
    if (busqueda) {
      checkNameOrNomber();
    }
  }, [busqueda]);

  function checkNameOrNomber() {
    setError(null);
    setPokemonDetails(null);
    const isNumber = !isNaN(busqueda);
    let pokemon;

    if (isNumber) {
      // Buscar por ID en la URL
      pokemon = pokemons.find((pokemonItem) => pokemonItem.url.includes(`/${busqueda}/`));
    } else {
      // Buscar por nombre
      pokemon = pokemons.find((pokemonItem) => pokemonItem.name.toLowerCase() === busqueda.toLowerCase());
    }

    // Llamar a getPokemonDetails con la URL del Pokémon encontrado
    console.log(pokemon.url);
    getPokemonDetails(pokemon.url);
  }

  return (
    <div>
      
      <Input busqueda={busqueda} setBusqueda={setBusqueda} />
      

      {/* Mostrar detalles del Pokémon usando el componente PokemonDetails */}
      <PokemonDetails details={pokemonDetails} />
      
      <Banner/>
    </div>
  )

}

export default App
