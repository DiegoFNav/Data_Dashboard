import React, { useState, useEffect } from 'react';
import './App.css';

//test
function App() {
  const [searchText, setSearchText] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [numToShow, setNumToShow] = useState(30);
  const [total, setTotal] = useState(30);
  const [avgWeight, setAvgWeight] = useState(0);
  const [avgHeight, setAvgHeight] = useState(0);
  const [sortBy, setSortBy] = useState('Name');

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
      setAvgHeight(pokemonList.reduce((acc, pokemon) => acc + pokemon.height, 0) / pokemonList.length);
      setAvgWeight(pokemonList.reduce((acc, pokemon) => acc + pokemon.weight, 0) / pokemonList.length);
      setTotal(pokemonList.length);
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
      const pokemonDataList = await Promise.all(data.results.map(pokemon => getPokemonData(pokemon.url)));
      let filtered = [];
      if (sortBy === 'Name') {
        filtered = pokemonDataList.filter(pokemon => pokemon.name.includes(searchText.toLowerCase()));
      } else if (sortBy === 'Type') {
        filtered = pokemonDataList.filter(pokemon => pokemon.types[0].type.name.includes(searchText.toLowerCase()) || (pokemon.types.length > 1 && pokemon.types[1].type.name.includes(searchText.toLowerCase())));
      } else if (sortBy === 'Height') {
        filtered = pokemonDataList.filter(pokemon => pokemon.height >= parseInt(searchText) * 10);
      }
      if (filtered.length === 0) {
        console.log('No results found');
      }
      const firstXPokemon = filtered.slice(0, numToShow);
      setPokemonList(firstXPokemon);
      setAvgHeight(firstXPokemon.reduce((acc, pokemon) => acc + pokemon.height, 0) / pokemonList.length);
      setAvgWeight(firstXPokemon.reduce((acc, pokemon) => acc + pokemon.weight, 0) / pokemonList.length);
      setTotal(firstXPokemon.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = event => {
    setSearchText(event.target.value);
  };

  const handleSortChange = event => {
    setSortBy(event.target.value);
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
    <div className='main_container'>
      <div className='heading_container'><h1>Pokemon Search Dashboard</h1></div>
      <div className='search_container'>
        <label htmlFor="sortBy">Search By:</label>
        <select id="sortBy" onChange={handleSortChange} value={sortBy}>
          <option value="Name">Name</option>
          <option value="Type">Type</option>
          <option value="Height">Min Height</option>
        </select>
      </div>
      <input type="text" value={searchText} onChange={handleChange} />
      <button className="button" onClick={handleSearch}>Search</button>
      <div className='statistics_container'>
        <div className='stat_card'>
          <h3>Total Pokemon: {total}</h3>
        </div>
        <div className='stat_card'>
          <h3>Average Height: {parseInt(avgHeight / Math.pow(10, 1))}m</h3>
        </div>
        <div className='stat_card'>
          <h3>Average Weight: {parseInt(avgWeight / Math.pow(10, 1))}kg</h3>
        </div>

      </div>
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