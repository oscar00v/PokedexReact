import React, { useState, useEffect } from 'react';
import styles from './Types.module.css'; // Importa el archivo CSS

function Types({ setSelectedType }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchPokemonTypes() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        if (!response.ok) {
          throw new Error("Error fetching Pokémon types");
        }
        const data = await response.json();
        setTypes(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPokemonTypes();
  }, []);

  return (
    <div>
      <label htmlFor="pokemonType" className={styles.label}>
        Tipo de Pokémon:
      </label>
      <select
        id="pokemonType"
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Todos</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Types;
