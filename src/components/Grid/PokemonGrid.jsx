import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PokemonGrid.module.css';

function PokemonGrid({ pokemons }) {
  const navigate = useNavigate();

  function handlePokemonClick(pokemon) {
    navigate(`/pokedex/${pokemon.id}`);
  }

  return (
    <div className={styles.grid}>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className={styles.card} onClick={() => handlePokemonClick(pokemon)}>
          <h3>#{pokemon.id}</h3>
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img 
            src={pokemon.sprites?.other['official-artwork'].front_default} 
            alt={pokemon.name} 
            onError={(e) => { e.target.src = "fallback-image-url"; }} 
          />
          <div>
            {pokemon.types.map((typeInfo) => (
              <span 
                key={typeInfo.type.name} 
                className={`${styles.type} ${styles[`type-${typeInfo.type.name}`]}`}
              >
                {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
              </span>
            ))}
          </div>
          <button onClick={() => handlePokemonClick(pokemon)}>Más datos</button>
        </div>
      ))}
    </div>
  );
}

export default PokemonGrid;
