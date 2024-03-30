import React, { useState, useEffect } from 'react';
import './App.css';

//test
function App() {
  const [searchText, setSearchText] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [numToShow, setNumToShow] = useState(30);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const firstXPokemon = data.results.slice(0, numToShow);
      const pokemonDataList = await Promise.all(firstXPokemon.map(pokemon => getPokemonData(pokemon.url)));
      setPokemonList(pokemonDataList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const filtered = data.results.filter(pokemon => pokemon.name.includes(searchText.toLowerCase()));
      const firstXPokemon = filtered.slice(0, numToShow);
      const pokemonDataList = await Promise.all(firstXPokemon.map(pokemon => getPokemonData(pokemon.url)));
      setPokemonList(pokemonDataList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  const getPokemonData = async url => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <input type="text" value={searchText} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Type 1</th>
            <th>Type 2</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr key={index}>
              <td>{capitalizeFirstLetter(pokemon.name)}</td>
              <td>
                {pokemon.sprites && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
              </td>
              <td>{pokemon.height / Math.pow(10, 1)}m</td>
              <td>{pokemon.weight / Math.pow(10, 1)}kg</td>
              <td>{capitalizeFirstLetter(pokemon.types[0].type.name)}</td>
              <td>{pokemon.types[1] && capitalizeFirstLetter(pokemon.types[1].type.name)}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;