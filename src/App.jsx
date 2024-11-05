import React, { useState, useEffect } from 'react';
import PokemonGrid from './components/Grid/PokemonGrid.jsx';
import Input from './components/Input/Input.jsx';
import PokemonDetails from './components/details/pokemonDetails.jsx';
import './styles.css';
import Banner from './components/banner/banner.jsx';
import Types from './components/typs/Types.jsx';
import { useNavigate } from 'react-router-dom';

function App() {
  const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'; // Cargar todos los Pokémon

  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('');

  async function fetchPokemons() {
    const response = await fetch(URL_BASE);
    if (!response.ok) {
      throw new Error("Error fetching Pokémon data");
    }
    const data = await response.json();
    return data.results;
  }

  // Obtener detalles de cada Pokémon y combinarlos en un solo arreglo
  async function getPokemons() {
    const pokemonData = await fetchPokemons();
    const pokemonDetailsPromises = pokemonData.map(pokemon => getPokemonDetails(pokemon.url));
    const detailedPokemons = await Promise.all(pokemonDetailsPromises);
    setPokemons(detailedPokemons);
  }

  async function getPokemonDetails(URLPokemon) {
    const response = await fetch(URLPokemon);
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del Pokémon");
    }

    const datapokemon = await response.json();
    return datapokemon; // Devolvemos el objeto completo del Pokémon
  }
  //!lo primero que se hacer
  useEffect(() => {
    getPokemons();
  }, []);

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

  // Filtrar los primeros 151 Pokémon
  const pokemonLimitados = pokemons.slice(0, 151);

  return (
    <div>
      <Input busqueda={busqueda} setBusqueda={setBusqueda} />

      <PokemonDetails details={pokemonDetails} />
      <Types setSelectedType={setSelectedType} />
      <PokemonGrid pokemons={pokemonLimitados} onPokemonClick={setPokemonDetails} />
      <Banner />
    </div>
  );
}

export default App;




// import React, { useState, useEffect } from 'react'
// import PokemonGrid from './components/Grid/PokemonGrid.jsx';
// import Input from './components/Input/Input.jsx';
// import PokemonDetails from './components/details/pokemonDetails.jsx';
// import './styles.css';
// import Banner from './components/banner/banner.jsx';
// import { useEffect } from 'react';
// import Types from './components/typs/Types.jsx';



// function App() {
//   const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

//   const [busqueda, setBusqueda] = useState('');
//   const [pokemons, setPokemons] = useState([]);
//   const [pokemonDetails, setPokemonDetails] = useState(null);//
//   const [error, setError] = useState(null);

//   const [types, setTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const pokemonLimitados = pokemons.slice(0, 151);
//   //////////?

//   async function fetchPokemons() {

//     const response = await fetch(URL_BASE);
//     console.log("La Respuesta:", response);

//     if (!response.ok) {
//       //!como se pone la respuesta de error en React
//       throw new Error("Error fetching Pokémon data");
//     }
//     const data = await response.json();
//     //todo console.log("data:", data);
//     return data.results;

//   }
//   // useEffect para cargar la lista de Pokémon al montar el componente
//   useEffect(() => {
//     async function getPokemons() {
//       const pokemonData = await fetchPokemons();
//       //*pokemons = pokemonData.results;//para poder usar los urls de los pokemons 
//       console.log("data:", pokemonData);
//       setPokemons(pokemonData);
//     }

//     getPokemons();
//   }, []);

//   // Función para obtener detalles de un Pokémon específico
//   async function getPokemonDetails(URLPokemon) {
//     const response = await fetch(URLPokemon);
//     if (!response.ok) {
//       throw new Error("Error al obtener los detalles del Pokémon");
//     }

//     const datapokemon = await response.json();
//     setPokemonDetails(datapokemon); // Guardar los detalles en el estado

//     return datapokemon;
//   }

//   useEffect(() => {
//     if (busqueda) {
//       checkNameOrNomber();
//     }
//   }, [busqueda]);

//   function checkNameOrNomber() {
//     setError(null);
//     setPokemonDetails(null);
//     const isNumber = !isNaN(busqueda);
//     let pokemon;

//     if (isNumber) {
//       // Buscar por ID en la URL
//       pokemon = pokemons.find((pokemonItem) => pokemonItem.url.includes(`/${busqueda}/`));
//     } else {
//       // Buscar por nombre
//       pokemon = pokemons.find((pokemonItem) => pokemonItem.name.toLowerCase() === busqueda.toLowerCase());
//     }

//     // Llamar a getPokemonDetails con la URL del Pokémon encontrado
//     console.log(pokemon.url);
//     getPokemonDetails(pokemon.url);
//   }

//   async function fetchPokemonsByType(type) {
//     if (!type) {
//       const response = await fetch(URL_BASE);
//       if (!response.ok) throw new Error("Error fetching Pokémon data");
//       const data = await response.json();
//       return data.results;
//     } else {
//       const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
//       if (!response.ok) throw new Error("Error fetching Pokémon type data");
//       const data = await response.json();
//       return data.pokemon.map((entry) => entry.pokemon);
//     }
//   }
//   useEffect(() => {
//     async function getPokemons() {
//       const pokemonData = await fetchPokemonsByType(selectedType);
//       setPokemons(pokemonData);
//     }

//     getPokemons();
//   }, [selectedType]);



//   return (
//     <div>

//       <Input busqueda={busqueda} setBusqueda={setBusqueda} />


//       {/* Mostrar detalles del Pokémon usando el componente PokemonDetails */}
//       <PokemonDetails details={pokemonDetails} />
//       <Types setSelectedType={setSelectedType} />
//       <PokemonGrid pokemons={pokemonLimitados} onPokemonClick={getPokemonDetails} /> {/* Agregar el grid */}
//       <Banner />
//     </div>
//   )

// }

// export default App