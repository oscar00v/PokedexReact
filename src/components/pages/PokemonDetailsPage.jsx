import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetails from '../details/PokemonDetails.jsx';

function PokemonDetailsPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Error fetching Pokémon details");
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      
      <PokemonDetails details={pokemon} /> {/* Pasamos el objeto pokemon a PokemonDetails */}
    </div>
  );
}

export default PokemonDetailsPage;
