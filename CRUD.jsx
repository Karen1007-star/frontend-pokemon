import { useEffect, useState } from "react"


function CRUD(){
    const [pokemons, setPokemons] = useState([]);
    const [name, setName] = useState("");
// GET
useEffect(()=>{
       fetch("http://localhost:4000/pokemonsCopy")
      .then(res => res.json())
      .then(data => setPokemons(data));
},[])

// POST
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
        const type = data.types.map(t => t.type.name); 

        return fetch("http://localhost:4000/pokemonsCopy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({name, imagen, type })
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
// DELETE
    const eliminar = (index) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este Pokémon?");
    if (!confirmar) return;

    fetch(`http://localhost:4000/pokemonsCopy/${index}`, {
        method: "DELETE",
    })
        .then(res => {
        if (!res.ok) throw new Error("Error eliminando");

        // 🔥 volver a sincronizar con backend
        return fetch("http://localhost:4000/pokemonsCopy");
        })
        .then(res => res.json())
        .then(data => setPokemons(data))
        .catch(err => {
        console.error(err);
        alert("Error eliminando Pokémon ❌");
        });
    };
return(
    <>
    <div>
        <h2 className="bg-blue-300">POKEMONS</h2>
        <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)} // Se usa para hacer validacion de formulario
        />
        <button onClick={crearPokemon}>Guardar</button>
        

      {pokemons.map((p,index)=> (
        <div key={p.num}>{p.num}-{p.name}
        <img src={p.imagen} alt={p.name} />
        <p>{p.type?.join(", ")}</p>
        <button onClick={() => eliminar(index)}>❌</button>
        </div>
      ))}
    </div>
    </>
)
}

export default CRUD