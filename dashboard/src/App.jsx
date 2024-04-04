import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './App.css';
import { Link } from 'react-router-dom';

//test
function App() {
  const [searchText, setSearchText] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [total, setTotal] = useState(30);
  const [avgWeight, setAvgWeight] = useState(0);
  const [avgHeight, setAvgHeight] = useState(0);
  const [sortBy, setSortBy] = useState('Name');
  const [avgHeights, setavgHeights] = useState([
    {Name: 'Grass', Value: 0},
    {Name: 'Fire', Value: 0},
    {Name: 'Water', Value: 0},
    {Name: 'Electric', Value: 0},
    {Name: 'Normal', Value: 0},
    {Name: 'Bug', Value: 0},
    {Name: 'Flying', Value: 0},
    {Name: 'Poison', Value: 0},
    {Name: 'Ground', Value: 0},
    {Name: 'Rock', Value: 0},
    {Name: 'Steel', Value: 0},
    {Name: 'Fighting', Value: 0},
    {Name: 'Psychic', Value: 0},
    {Name: 'Dark', Value: 0},
    {Name: 'Ghost', Value: 0},
    {Name: 'Ice', Value: 0},
    {Name: 'Fairy', Value: 0},
    {Name: 'Dragon', Value: 0}
  ]);

  const numToShow = 50;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateAverageHeightByType();
  }, [pokemonList]);


  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const firstXPokemon = shuffleArray(data.results).slice(0, numToShow);
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
      const firstXPokemon = shuffleArray(filtered).slice(0, numToShow);
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
    const words = str.split('-');
    let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    capitalizedWords.reverse();
    const capitalizedString = capitalizedWords.join(' ');
    return capitalizedString;
  };

  const calculateAverageHeightByType = () => {
    const typeMap = {};
    const typeCount = {};
  
    pokemonList.forEach(pokemon => {
      pokemon.types.forEach(type => {
        const typeName = type.type.name;
        if (!typeMap[typeName]) {
          typeMap[typeName] = 0;
          typeCount[typeName] = 0;
        }
        typeMap[typeName] += pokemon.height;
        typeCount[typeName]++;
      });
    });
  
    const averageHeights = Object.keys(typeMap).map(type => ({
      Name: capitalizeFirstLetter(type),
      Value: Math.floor(typeMap[type] / typeCount[type]) / Math.pow(10, 1),
    }));

    const updatedAvgHeights = avgHeights.map(avgType => {
      const matchingType = averageHeights.find(type => type.Name === avgType.Name);
      if (matchingType) {
        avgType.Value = matchingType.Value;
      }
      return avgType;
    });
    setavgHeights(updatedAvgHeights);
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
      <div className='graph'>
        <h4>Average Height of each Type (m)</h4>
        <BarChart
          width={1190}
          height={300}
          data={avgHeights}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
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
              <td><Link to={`/pokemon/${pokemon.id}`}>{capitalizeFirstLetter(pokemon.name)}</Link></td>
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