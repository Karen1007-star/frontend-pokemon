import { useState } from "react";
import CrearPokemon from "./CrearPokemon"
import ListaPokemons from "./ListaPokemons";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  return (
    <div className="main-container">
      <CrearPokemon setPokemons={setPokemons} />
      <ListaPokemons pokemons={pokemons} setPokemons={setPokemons} />
    </div>
  );
}

export default App;