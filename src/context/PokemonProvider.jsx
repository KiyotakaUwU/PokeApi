import React, { createContext, useEffect, useState } from "react";
import { useForm } from '../hooks'

export const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  // States
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [types, setTypes] = useState([]);
  const [typeSelected, setTypeSelected] = useState({});
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  const baseUrl = "https://pokeapi.co/api/v2/";

  const { valueSearch, onInputChange, onResetForm } = useForm({
		valueSearch: '',
	});

  // Call first pokemons
  useEffect(() => {
    fetch(`${baseUrl}pokemon?limit=50&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        if (pokemons.length < data.count) {
          setPokemons([...pokemons, ...data.results]);
        }
        setLoading(false);
      });
  }, [offset]);
  // Call all pokemons
  useEffect(() => {
    fetch(`${baseUrl}pokemon?limit=100000&offset=0`)
      .then((res) => res.json())
      .then((data) => setAllPokemons(data.results));
  }, []);

  // Set pokemon data
  useEffect(() => {
    Promise.all(
      pokemons.map((pokemon) => {
        return fetch(pokemon.url)
          .then((res) => res.json())
          .then((data) => ({
            id: data.id,
            name: data.name,
            sprite: data.sprites.other.dream_world.front_default,
            types: data.types.map((type) => type.type.name),
            stats: data.stats.map((stat) => ({
              stat: stat.stat.name,
              base: stat.base_stat,
            })),
          }));
      })
    ).then((data) => {
      setPokemonsData(data), setLoading(false);
    });
  }, [pokemons]);

  // get types name
  const getTypesNames = (types) => {
    return types.map((type) => type.name);
  };
  // Create object typeSelected
  useEffect(() => {
    fetch(`${baseUrl}type`)
      .then((res) => res.json())
      .then((data) => {
        const typesNames = getTypesNames(data.results);
        const initialState = typesNames.reduce((acc, type) => {
          acc[type] = false;
          return acc;
        }, {});
        setTypeSelected(initialState);
        setTypes(data.results);
      });
  }, []);

  const handleCheckBox = (e) => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked,
    });
    if (e.target.checked) {
      const filteredResults = pokemonsData.filter((pokemon) =>
        pokemon.types
          .map((type) => type)
          .includes(e.target.name)
      );
      setFilteredPokemons([...filteredPokemons, ...filteredResults]);
    } else {
      const filteredResults = filteredPokemons.filter(
        (pokemon) =>
          !pokemon.types
            .map((type) => type)
            .includes(e.target.name)
      );
      setFilteredPokemons([...filteredResults])
    }
  };

  // Load more function
  const onClickLoadMore = () => {
    setOffset(offset + 50);
  };

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        pokemonsData,
        types,
        onClickLoadMore,
        active,
        setActive,
        loading,
        setLoading,
        baseUrl,
        allPokemons,
        handleCheckBox,
        filteredPokemons,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
