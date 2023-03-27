import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../context/PokemonProvider";
import { Upp } from "../utils";

function PokemonCard() {
  const { pokemonsData } = useContext(PokemonContext);

  return (
    <>
      <div className="card-list container">
        {pokemonsData.map((pokemon) => (
          <Link
            to={`pokemon/${pokemon.id}`}
            className="pokemon-card"
            key={pokemon.id}
          >
            <div className="card-img">
              <img src={pokemon.sprite} alt={`Pokemon: ${pokemon.name}`} />
            </div>
            <div className="card-info">
              <span className="pokemon-id">#{pokemon.id}</span>
              <h3>{Upp(pokemon.name)}</h3>
              <div className="card-types">
                {pokemon.types.map((type) => (
                  <span className={type} key={type}>
                    {Upp(type)}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default PokemonCard;
