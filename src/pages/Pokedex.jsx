import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";


function Pokedex() {
   //? Array by pokemons before filter
  const [pokemons, setPokemons] = useState([]);

  //? String filter pokemons by name
  const [pokemonName, setPokemonName] = useState("");

  //? Array for type of pokemons
  const [types, setTypes] = useState([]);

  //? String by type pokemonscurrents, change section
  const [currentType, setCurrentType] = useState("");

  //? current page
  const [currentPage, setCurrentPage] = useState(1);

  //? global state whit users names
  const nameTrainer = useSelector((store) => store.nameTrainer);

  const input = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const paginationLogic = () => {
    // pokemons per page
    const POKEMONS_PER_PAGE = 20;

    // pokemos on first page
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    // End Page
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    //current Block
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    // pages on current block

    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i < maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { lastPage, pokemonInPage, pagesInBlock } = paginationLogic();

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    if (!currentType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

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
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

      axios
        .get(URL)
        .then((res) => {
          const pokemonsByType = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1)
  
  }, [pokemonName, currentType])

  useEffect(() => {
    setPokemonName("")
    input.current.value = ""
  }, [currentType])
  
  

  return (
    <section className="min-h-screen mx-auto bg-bottom  ">
      <Header />

      {/* Section of filter and greeting */}
      <section className="py-4   mx-auto flex flex-col md:flex-row justify-between items-center">
        <h3 className="py-4 px-4 font-bold text-red-600">
          Welcome {nameTrainer},{" "}
          <span className="text-black font-semibold">
            here you can find your Favorite Pokemon
          </span>{" "}
        </h3>

        <form onSubmit={handleSubmit} className="flex  p-4 mx-auto gap-2 ">
          <div className="flex border-solid hover:border-dotted ">
            <input ref={input}
              className=" px-2 rounded-xl  w-[80%] sm:w-64 truncate  "
              id="pokemonName"
              type="text"
              placeholder=" Search your Pokemon"
              rel="noopener noreferrer"
            />
            <button className=" bg-red-600 hover:bg-red-500 text-white py-2 w-16 -translate-x-5 inline-block text-sm ">
              Search
            </button>
          </div>

          <select
            className="w-12 rounded-xl -translate-x-5 text-sm cursor-pointer hover:bg-red-600"
            onChange={(e) => setCurrentType(e.target.value)}
          >
            <option className="" value="">
              All
            </option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>
      {/* section of Pokemons*/}

      <section className="px-6 md:px-12 py-12 grid gap-6 auto-rows-auto grid-cols-[repeat(auto-fill,_minmax(220px,_260px))] justify-center ">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>

      {/* pagination */}
      <ul className="flex pb-4 gap-2 justify-center px-2 flex-wrap">

      <li
          onClick={() => setCurrentPage(1)}
          className="p-3 bg-red-600 font-bold
              text-white rounded-md cursor-pointer"
        >
          {"<<"}
        </li>
        <li
          onClick={handleClickPreviusPage}
          className="p-3 bg-red-600 font-bold
              text-white rounded-md cursor-pointer"
        >
          {"<"}
        </li>
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => setCurrentPage(numberPage)}
            className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer
               ${numberPage === currentPage && "bg-red-400"}`}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}
        <li
          onClick={handleClickNextPage}
          className="p-3 bg-red-600 font-bold
              text-white rounded-md cursor-pointer"
        >
          {">"}
        </li>

        <li
          onClick={() => setCurrentPage(lastPage)}
          className="p-3 bg-red-600 font-bold
              text-white rounded-md cursor-pointer"
        >
          {">>"}
        </li>
      </ul>
    </section>
  );
}

export default Pokedex;
