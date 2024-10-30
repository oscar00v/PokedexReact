import React, { useState } from 'react'
import Input from './components/Input/Input.jsx';
import './styles.css';
import { useEffect } from 'react';

function App() {
  const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  const [busqueda, setBusqueda] = useState('');   
  let [pokemons,setPokemons] = useState([]);
  
  //////////?
  
  async function fetchPokemons() {

    const response = await fetch(URL_BASE);
    console.log("La Respuesta:", response);

    if(!response.ok){
      //!como se pone la respuesta de error en React
      // throw new Error("Error fetching Pokémon data");
    }
    const data = await response.json();
    console.log("data:", data);
    return data.results;
    
  }
  // useEffect para cargar la lista de Pokémon al montar el componente
  useEffect(() => {
    async function getPokemons() {
      const pokemonData = await fetchPokemons();
      setPokemons(pokemonData);
    }

    getPokemons();
  }, []);



  
  return (
    <div>
        
        <Input busqueda = {busqueda} setBusqueda = {setBusqueda} />
        <p>Búsqueda: {busqueda}</p> {/* Muestra el valor de `busqueda` quitar mas adelante*/}
    </div>
  )

}

export default App
