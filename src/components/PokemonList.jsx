import React, { useContext } from "react";
import { PokemonContext } from "../context/PokemonProvider";
import Loader from "./Loader";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const { filteredPokemons, loading, pokemonsData } =
    useContext(PokemonContext);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-list container">
          {filteredPokemons.length ? (
            <>
              {filteredPokemons.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          ) : (
            <>
              {pokemonsData.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.id} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default PokemonList;
