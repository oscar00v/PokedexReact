// src/components/PokemonDetails/PokemonDetails.jsx
import React from 'react';
import styles from './PokemonDetails.module.css';

function PokemonDetails({ details }) {
    if (!details) {
      return <p>Busca un pokemon por nombre o numero para ver mas detalles </p>
    }
  
    return (
      <div className={styles.pokemonCard}>
        <div className={styles.pokemonName}>
          <h1>{details.name.charAt(0).toUpperCase() + details.name.slice(1)} N. º {details.id}</h1>
        </div>
        
        <div className={styles.pokemonDetails}>
          <div className={styles.pokemonColumns1}>
            <img 
              src={details.sprites.other['official-artwork'].front_default} 
              alt={details.name} 
            />
          </div>
          
          <div className={styles.pokemonColumns}>
            <p><strong>Altura:</strong> {details.height / 10} m</p>
            <p><strong>Peso:</strong> {details.weight / 10} kg</p>
            <p><strong>Tipo:</strong> {details.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Habilidades:</strong> {details.abilities.map(ability => ability.ability.name).join(', ')}</p>
          </div>
        </div>
  
        <div className={styles.pokemonSprites}>
          <h2>Sprites</h2>
          <div className={styles.spritesContainer}>
            <div className={styles.spriteColumn}>
              <img src={details.sprites.front_default} alt="Front sprite" />
              <img src={details.sprites.back_default} alt="Back sprite" />
            </div>
            <div className={styles.spriteColumn}>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default PokemonDetails;


  