import React, { useContext, useState } from "react";
import { PokemonContext } from "../context/PokemonProvider";

function FilterBar() {
  const { active, types, handleCheckBox } = useContext(PokemonContext);

  return (
    <div className={`container-filters ${active ? "active" : ""}`}>
      <div className="filter-by-type">
        <span>Type</span>
        {types.map((type) => (
          <div className="group-type" key={type.name}>
            <input
              type="checkbox"
              name={type.name}
              id={type.name}
              onChange={handleCheckBox}
            />
            <label htmlFor={type.name}>{type.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
