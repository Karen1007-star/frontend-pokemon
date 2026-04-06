function handleEditar(pokemon, setPokemons) {
  const nuevoNombre = prompt("Nuevo nombre:", pokemon.name);
  if (!nuevoNombre) return;

  fetch(`https://pokeapi.co/api/v2/pokemon/${nuevoNombre.toLowerCase()}`)
    .then(res => {
      if (!res.ok) throw new Error("Pokemon no encontrado");
      return res.json();
    })
    .then(data => {
      const imagen = data.sprites.front_default;
      const tipo = data.types.map(t => t.type.name);

      return fetch(`http://localhost:4000/pokemons/${pokemon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nuevoNombre, imagen, tipo })
      });
    })
    .then(res => res.json())
    .then(pokemonActualizado => {
      setPokemons(prev =>
        prev.map(p => (p.id === pokemon.id ? pokemonActualizado : p))
      );
      alert("Pokemon actualizado 🔥");
    })
    .catch(err => {
      console.error(err);
      alert("Error actualizando pokemon ❌");
    });
}

export default handleEditar;