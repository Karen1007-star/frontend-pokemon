import { useEffect } from "react";
import handleEditar from "./EditarPokemon";
import EliminarPokemon from "./EliminarPokemon";

function ListaPokemons({ pokemons, setPokemons }) {
  useEffect(() => {
    fetch("http://localhost:4000/pokemons")
      .then(res => res.json())
      .then(data => setPokemons(data))
      .catch(err => console.error(err));
  }, [setPokemons]);

  return (
    <div >
      <h2>Pokédex</h2>
      <div className="pokedex">
        {pokemons.map(p => (
          <div key={p.id} className="pokemon-card">
            <h3>{p.name}</h3>
            <p>{p.id}</p>
            <img src={p.imagen} alt={p.name} />
            <p>{p.tipo.join(", ")}</p>
            <div className="button-group">
              <button onClick={() => handleEditar(p, setPokemons)}>Editar</button>
              <EliminarPokemon id={p.id} setPokemons={setPokemons} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPokemons;