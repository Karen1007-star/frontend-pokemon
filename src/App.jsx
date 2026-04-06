import { useState } from "react";
import CrearPokemon from "./CrearPokemon"
import ListaPokemons from "./ListaPokemons";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
      fetch("http://localhost:4000/pokemons")
        .then(res => res.json())
        .then(data => setPokemons(data))
        .catch(err => console.error(err));
    }, []);

  return (
    <div className="main-container">
      <CrearPokemon setPokemons={setPokemons} />
      <ListaPokemons pokemons={pokemons} setPokemons={setPokemons} />
    </div>
  );
}

export default App;