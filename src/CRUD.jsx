import { useEffect, useState } from "react"

function CRUD(){
    const [pokemons, setPokemons] = useState([]);
    const [name, setName] = useState("");

// GET
  useEffect(()=>{
        fetch("http://localhost:4000/pokemonsCopy")
        .then(res => res.json()) // RESPUESTA DEL SERVIDOR, es para que JS lo entienda
        .then(data =>{
          setPokemons(data) // los pokemons que llegaron se actualizan en el estado
        }) 
        .catch(err=>console.log("salio error al cargar"))
  },[])

// POST
  const crearPokemon = () => {
    if (!name) {
      alert("Completa el nombre");
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then(res => {
            // la respuesta del HTTP - ok es un valor booleano(200, 400,404,etc)
        if (!res.ok) throw new Error("Pokemon no encontrado"); // lanza el error y deten el flujo
                //si todo sale bien, convierte la respuesta a JSON
        return res.json();
      })
      .then(data => {
        const imagen = 
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.front_default ||
          "https://via.placeholder.com/150"
        const type = data.types.map(t => t.type.name); 

        return fetch("http://localhost:4000/pokemonsCopy", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // EStoy enviado tipo JSON
          body: JSON.stringify({name, imagen, type }) // ahora lo convierto a texto JSON
        });
      })
      .then(res => res.json()) // recibe la respuesta del backend y la convierte a JS
      .then(pokemonCreado => {
        setPokemons(prev => [...prev, pokemonCreado]);
        setName("");
        alert("Pokemon creado");
      })
      .catch(err => {
        console.error(err);
        alert("Error creando pokemon ❌");
        setName("");
      });
  };
  
// PUT
const editarPokemon = (pokemon)=>{

  const nuevoNombre = prompt("Nuevo nombre:", pokemon.name);
  if (!nuevoNombre) return  alert("Completa el nombre");

  fetch(`https://pokeapi.co/api/v2/pokemon/${nuevoNombre.toLowerCase()}`)
    .then(res => {
      if (!res.ok) throw new Error("Pokemon no encontrado");
      return res.json(); // SE OBTIENE EL OBJETO COMPLETO DEL POKEMON
    })
    .then(data => {
        const imagen = 
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.front_default ||
          "https://via.placeholder.com/150"; 
        const type = data.types.map(t => t.type.name);

      return fetch(`http://localhost:4000/pokemonsCopy/${pokemon.num}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nuevoNombre, imagen, type })
      });
    })
    .then(res => res.json())
    .then(pokemonActualizado => {
                  // estado anterior
      setPokemons(prev =>prev.map(p => (p.num === pokemon.num ? pokemonActualizado : p)));
      alert("Pokemon actualizado");
    })
    .catch(err => {
      console.error(err);
      alert("Error actualizando pokemon ❌");
    });
}

// DELETE
    const eliminar = (pokemon) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este Pokémon?");
    if (!confirmar) return;

    fetch(`http://localhost:4000/pokemonsCopy/${pokemon.num}`, {
        method: "DELETE",
    })
        .then(res => {
        if (!res.ok) throw new Error("Error eliminando");

        // Sincronizar con backend
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-100 p-12 rounded shadow m-12 w-full max-w-6xl">
          <h2 className="flex items-center justify-center text-3xl font-bold text-red-500 py-8">POKEMONS</h2>
          <input className="border p-2 w-full mb-2"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)} // Se usa para hacer validacion de formulario
          />
          <button className="bg-blue-500 text-white w-full p-2 rounded mb-4"
          onClick={crearPokemon}>Guardar</button>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {pokemons.map((p,index)=> (
              <div 
                key={p.num} 
                className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col items-center hover:shadow-lg transition"
              >
              {/* {p.nombre} */}
            <img src={p.imagen} alt={p.name} />
            <p>
              {Array.isArray(p.type)? p.type.join(", "): p.type
                  ? [p.type].join(", ")
                  : ""}
            </p>
            <div className="flex gap-2 mt-2">
              <button className="bg-slate-900 rounded px-2"
              onClick={() => eliminar(p)}>❌</button>
              <button className="bg-slate-900 text-white font-bold rounded px-2"
              onClick={() => editarPokemon(p)}>Editar</button>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
)
}

export default CRUD