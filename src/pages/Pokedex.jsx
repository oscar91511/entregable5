import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setpokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setpokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  useEffect(() => {
    if(!currentType){
      const URL = "https://pokeapi.co/api/v2/pokemon";

      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })

      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(currentType){
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

     axios
        .get(URL)
        .then((res) => {
        const pokemonsByType = res.data.pokemon.map(pokemon => 
          pokemon.pokemon)
          setPokemons(pokemonsByType)
        }) 
       .catch((err) => console.log(err));
  }    
  }, [currentType])

  return (
    <section className="min-h-screen mx-auto bg-bottom  drop-shadow-3xl">
      <Header />

      {/* Section of filter and greeting */}
      <section className="py-4 drop-shadow-xl   mx-auto flex flex-col md:flex-row justify-between items-center">
        <h3 className="py-4 px-4 font-bold text-red-600">Welcome {nameTrainer}, <span className="text-black font-semibold">here you can find your Favorite Pokemon</span> </h3>

        <form onSubmit={handleSubmit} className="flex p-4 mx-auto">
          <div className="flex">
            <input
              className="shadow-xl rounded-sm font-semibold w-40 sm:w-64 truncate"
              id="pokemonName"
              type="text"
              placeholder=" Search your Pokemon"
            />
            <button className=" bg-red-600 text-white py-2 w-16 inline-block rounded-sm">Search</button>
          </div>

          <select
            className="capitalize hover:bg-red-600 hover:text-white ml-2 rounded-sm"
            onChange={(e) => setCurrentType(e.target.value)}
          >
            <option 
             value="">All</option>
            {types.map((type) => (
              <option value={type} key={type} className="capitalize hover:bg-red-600  hover:text-white">
               <span className="text-black hover:text-white ">{type}</span>
              </option>
            ))}
          </select>
        </form>
      </section>
      {/* section of Pokemons*/}

      <section className="px-6 md:px-12 py-12 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_260px))] justify-center ">
        {pokemonsByName.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
    </section>
  );
}

export default Pokedex;
