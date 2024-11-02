// src/components/PokemonGrid/PokemonGrid.jsx
import React from 'react';
import styles from './PokemonGrid.module.css';

function extractPokemonId(url) {
  const idMatch = url.match(/\/(\d+)\/$/);
  return idMatch ? idMatch[1] : 'N/A';
}

function PokemonGrid({ pokemons, onPokemonClick }) {
  console.log("pokemons:", pokemons);
  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon, index) => (
        <div key={index} className={styles.card}>
          <h3>#{extractPokemonId(pokemon.url)}</h3>
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img 
            src={pokemon.sprites?.other['official-artwork'].front_default} 
            alt={pokemon.name} 
          />
          <button onClick={() => onPokemonClick(pokemon.url)}>Más datos</button>
        </div>
      ))}
    </div>
  );
}

export default PokemonGrid;
