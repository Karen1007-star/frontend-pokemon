import React, { useState } from "react";

function CrearPokemon({ setPokemons }) {
  const [name, setName] = useState("");

  const crearPokemon = () => {
    if (!name) {
      alert("Completa el nombre");
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then(res => {
        if (!res.ok) throw new Error("Pokemon no encontrado");
        return res.json();
      })
      .then(data => {
        const imagen = data.sprites.front_default;
        const tipo = data.types.map(t => t.type.name); // ⚡ array plano

        return fetch("http://localhost:4000/pokemons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, imagen, tipo })
        });
      })
      .then(res => res.json())
      .then(pokemonCreado => {
        setPokemons(prev => [...prev, pokemonCreado]);
        setName("");
        alert("Pokemon creado 🔥");
      })
      .catch(err => {
        console.error(err);
        alert("Error creando pokemon ❌");
      });
  };

  return (
    <div className="crear-pokemon">
      <h2>Crear Pokémon</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={crearPokemon}>Guardar</button>
    </div>
  );
}

export default CrearPokemon