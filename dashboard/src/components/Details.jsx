import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Details() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
    }
  };

  const capitalizeFirstLetter = str => {
    const words = str.split('-');
    let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    capitalizedWords.reverse();
    const capitalizedString = capitalizedWords.join(' ');
    return capitalizedString;
  };

  if (!pokemon) {
    return <div>Loading...</div>; // Placeholder for when data is being fetched
  }

  return (
    <div className='pokemon_container'>
      <div className='left_container'>
      <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
      <div className='img_container'>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <button><Link to={'/'}>Return Home</Link></button>
      </div>
      <div className='right_container'>
        <h2>Pokemon ID# {pokemon.id}</h2>
        <h2>Type: {capitalizeFirstLetter(pokemon.types[0].type.name)}{pokemon.types.length > 1 ? '/'+capitalizeFirstLetter(pokemon.types[1].type.name) : null}</h2>
        <h2>Ability: {capitalizeFirstLetter(pokemon.abilities[0].ability.name)}</h2>
        <h2>Height: {pokemon.height / Math.pow(10, 1)}m</h2>
        <h2>Weight: {pokemon.weight / Math.pow(10, 1)}kg</h2>

      </div>
    </div>
  );
}

export default Details;