import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useState } from "react";
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'

function Pokedex() {

  const [pokemons, setPokemons] = useState([]);

  const nameTrainer = useSelector(store => store.nameTrainer);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/pokemon";

    axios.get(URL)
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="min-h-screen ">
      <Header />

      {/* Section of filter and greeting */}
      <section className="py-4 px-2">
        <h3>Welcome {nameTrainer}, here you can find your Favorite Pokemon</h3>

        <form>
          <div>
            <input type="text" placeholder="Search your Pokemon" />
            <button>Search</button>
          </div>

          <select>
            <option value="">All</option>
          </select>
        </form>
      </section>
      {/* section of Pokemons*/}

      <section className="px-2 grid gap-6 grid-cols-2">
         {pokemons.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)}
      </section>
      
     
    </section>
  );
}

export default Pokedex;