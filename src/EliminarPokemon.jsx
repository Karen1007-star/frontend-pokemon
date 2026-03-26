
import React from "react";

function EliminarPokemon({ id, setPokemons }) {

  const eliminar = () => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este Pokémon?");
    if (!confirmar) return;

    fetch(`http://localhost:4000/pokemons/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Error eliminando");
        
        // 🔹 Actualizar estado en React (sin recargar)
        setPokemons(prev => prev.filter(p => p.id !== id));
      })
      .catch(err => {
        console.error(err);
        alert("Error eliminando Pokémon ❌");
      });
  };

  return (
    <>
    <button onClick={eliminar}>
      Eliminar
    </button>
    </>
  );
}

export default EliminarPokemon;