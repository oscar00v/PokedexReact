// src/App.jsx
import React, { useState, useEffect } from 'react';
import PokemonGrid from './components/Grid/PokemonGrid.jsx';
import Input from './components/Input/Input.jsx';
import PokemonDetails from './components/details/PokemonDetails.jsx';
import './styles.css';
import Banner from './components/banner/Banner.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import PokemonDetailsPage from './components/pages/PokemonDetailsPage.jsx';
import Layout from './components/Layout/Layout.jsx'
import Types from '../../pokedex2/src/components/typs/Types.jsx';


function App() {
  const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=151'; // Cargar solo los primeros 151 Pokémon
  const [busqueda, setBusqueda] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const location = useLocation(); // Obtiene la ruta actual

  // Función para obtener los datos de los Pokémon
  async function fetchPokemons() {
    const response = await fetch(URL_BASE);
    if (!response.ok) {
      throw new Error("Error fetching Pokémon data");
    }
    const data = await response.json();
    return data.results;
  }

  // Función para obtener detalles de cada Pokémon
  async function getPokemonDetails(URLPokemon) {
    const response = await fetch(URLPokemon);
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del Pokémon");
    }
    const datapokemon = await response.json();
    return datapokemon;
  }

  // Obtener la lista de Pokémon
  async function getPokemons() {
    const pokemonData = await fetchPokemons();
    const detailedPokemons = await Promise.all(pokemonData.map(pokemon => getPokemonDetails(pokemon.url)));
    setPokemons(detailedPokemons);
  }

  // Efecto para cargar los Pokémon al iniciar
  useEffect(() => {
    getPokemons();
  }, []);

  // Efecto para manejar la búsqueda
  useEffect(() => {
    if (busqueda) {
      checkNameOrNumber();
    }
  }, [busqueda]);

  // Función para verificar nombre o número de Pokémon
  function checkNameOrNumber() {
    setError(null);
    setPokemonDetails(null);
    const isNumber = !isNaN(busqueda);
    let pokemon;

    if (isNumber) {
      pokemon = pokemons.find((pokemonItem) => pokemonItem.id === Number(busqueda));
    } else {
      pokemon = pokemons.find((pokemonItem) => pokemonItem.name.toLowerCase() === busqueda.toLowerCase());
    }

    if (pokemon) {
      setPokemonDetails(pokemon);
    } else {
      setError("Pokémon no encontrado");
    }
  }

  async function fetchPokemonsByType(type) {
    if (!type) {
      const response = await fetch(URL_BASE);
      if (!response.ok) throw new Error("Error fetching Pokémon data");
      const data = await response.json();
      return data.results;
    } else {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      if (!response.ok) throw new Error("Error fetching Pokémon type data");
      const data = await response.json();

      // Extraer solo los Pokémon de los primeros 151
      const allPokemons = data.pokemon.map((entry) => entry.pokemon);
      const filteredPokemons = allPokemons.filter((pokemon) => {
        const id = extractPokemonId(pokemon.url);
        return id <= 151; // Filtrar para que solo incluya Pokémon hasta el número 151
      });

      return filteredPokemons; // Retornar solo los Pokémon filtrados
    }
  }

  // Función para extraer el ID del Pokémon de la URL
  function extractPokemonId(url) {
    const idMatch = url.match(/\/(\d+)\//);
    return idMatch ? parseInt(idMatch[1]) : null;
  }

  useEffect(() => {
    async function getPokemonsByType() {
      const pokemonData = await fetchPokemonsByType(selectedType);
      const detailedPokemons = await Promise.all(pokemonData.map(pokemon => getPokemonDetails(pokemon.url)));
      setPokemons(detailedPokemons);
    }

    getPokemonsByType();
  }, [selectedType]);

  return (
    <div>
      <Input busqueda={busqueda} setBusqueda={setBusqueda} />
      {error && <p>{error}</p>}
      <Types setSelectedType={setSelectedType} />
      <Routes>
        <Route path='/' element={<PokemonGrid pokemons={pokemons} onPokemonClick={setPokemonDetails} />}/>
        <Route
          path= "/pokedex/:id"
          element={<PokemonDetailsPage setPokemonDetails={setPokemonDetails} />}
        />

      </Routes>
      
      {pokemonDetails && !location.pathname.includes('/pokedex/') && <PokemonDetails details={pokemonDetails} />}
      {/* <Types setSelectedType={setSelectedType} /> */}
      <Banner />
    </div>
  );
}

export default App;
//done