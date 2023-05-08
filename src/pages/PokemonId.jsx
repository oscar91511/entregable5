import { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgres}%`;
  };

  const backgroundByType = {
    grass: "bg-gradient-to-b from-cyan-400/70  to-lime-200/60",
    fire: "bg-gradient-to-b from-red-500 to-orange-400",
    water: "bg-gradient-to-b from-blue-600 to-cyan-600",
    bug: "bg-gradient-to-b from-lime-700/80 to-lime-500/70",
    normal: "bg-gradient-to-b from-normal to-pink-950/50",
    fighting: "bg-gradient-to-b from-red-800 to-red-800/80",
    flying: "bg-gradient-to-b from-teal-900/80 to-teal-900/60",
    poison: "bg-gradient-to-b from-purple-800 to-purple-400",
    ground: "bg-gradient-to-b from-yellow-900 to-yellow-800/90",
    rock: "bg-gradient-to-b from-stone-500 to-stone-400",
    ghost: "bg-gradient-to-b from-blue-800 to-indigo-900/9",
    steel: "bg-gradient-to-b from-blue-800 to-blue-700/80",
    electric: "bg-gradient-to-b from-yellow-400 to-amber-200",
    psychic: "bg-gradient-to-b from-fuchsia-600/80 to-yellow-400/90",
    ice: "bg-gradient-to-b from-sky-400/90 to-sky-300/80",
    dragon: "bg-gradient-to-b from-teal-900/80 to-teal-900/60",
    dark: "bg-gradient-to-b from-black to-black/80",
    fairy: "bg-gradient-to-b from-red-300 to-red-200",
    unknown: "",
    shadow: "",
  };

  const nameColorByType = {
    grass: "text-green-600",
    fire: "text-orange-600",
    bug: "text-green-700/80",
    water: "text-blue-600",
    electric: "text-yellow-600",
    normal: " text-normal ",
    fighting: "text-red-800 ",
    flying: " text-teal-900/80 ",
    poison: "text-purple-600 ",
    ground: "text-yellow-900 ",
    rock: "text-stone-500 ",
    ghost: "text-blue-800",
    steel: "text-blue-800",
    electric: "text-yellow-400 ",
    psychic: "text-yellow-600/80",
    ice: "text-sky-400 ",
    dragon: "text-teal-900/80",
    dark: "text-black/90",
    fairy: "text-red-400/80",
    unknown: "",
    shadow: "",
  };

  const SkillColorByType = {
    grass: "text-green-600",
    fire: "text-orange-600",
    bug: "text-green-700/80",
    water: "text-blue-600",
    electric: "text-yellow-600",
    normal: " text-normal ",
    fighting: "text-red-800 ",
    flying: " text-teal-900/80 ",
    poison: "text-purple-600 ",
    ground: "text-yellow-900 ",
    rock: "text-stone-500 ",
    ghost: "text-blue-800",
    steel: "text-blue-800",
    electric: "text-yellow-400 ",
    psychic: "text-yellow-600/80",
    ice: "text-sky-400 ",
    dragon: "text-teal-900/80",
    dark: "text-black/90",
    fairy: "text-red-400/80",
    unknown: "",
    shadow: "",
  };

  return (
    <section>
      <Header />

      <section className="px-2 py-14 bg-[url('/images/stadium.jpg')] bg-cover bg-no-repeat justify-center ">
        <article className="max-w-[750px] mx-auto  p-4 pb-6 rounded-xl bg-white ">
          {/* section superior */}

          <section
            className={`rounded-t-[5px] relative w-full h-[80px]  ${
              backgroundByType[pokemon?.types[0].type.name]
            } `}
          >
            <div className="flex justify-center items-center h-full">
              <img
                className="absoluten grid-col-[repeat(auto-fill,_minmax(250px,_360px))] justify-center -translate-y-10 sm:px-[60px] w-[30%]"
                src={
                  pokemon?.sprites.versions["generation-v"]["black-white"]
                    .animated.front_default
                }
                alt=""
                rel="noopener noreferrer"
              />
            </div>
          </section>

          {/* info General */}

          <section className="pt-[40px]">
            <div className="text-center py-4">
              <h3>#{pokemon?.id}</h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2
                className={`capitalize font-bold ${
                  nameColorByType[pokemon?.types[0].type.name]
                }`}
              >
                {pokemon?.name}
              </h2>
              <hr />
            </div>

            <div className="flex justify-center gap-6 text-center">
              <div>
                <div>
                  <h5 className="text-sm">Weigth</h5>
                  <span
                    className={`font-semibold  ${
                      SkillColorByType[pokemon?.types[0].type.name]
                    }`}
                  >
                    {pokemon?.weight}
                  </span>
                </div>
              </div>

              <div>
                <div>
                  <h5 className="text-sm">Height</h5>
                  <span
                    className={`font-semibold  ${
                      SkillColorByType[pokemon?.types[0].type.name]
                    }`}
                  >
                    {pokemon?.height}
                  </span>
                </div>
              </div>
            </div>

            <section className="grid md:grid-cols-2 gap-4">
              {/* types */}

              <section className="text-center">
                <h3 className="text-xl font-semibold">Types</h3>

                <section className="grid grid-cols-2 gap-4 mt-4">
                  {pokemon?.types.map((type) => (
                    <article
                      key={type.type.name}
                      className={`p-2
                       px-8 border-[1px] text-black font-bold border-gray-300 text-center
                        capitalize rounded-md ${
                          backgroundByType[pokemon?.types[0].type.name]
                        }`}
                    >
                      {type.type.name}
                    </article>
                  ))}
                </section>
              </section>

              {/* abilityes */}

              <section className="text-center">
                <h3 className="text-xl font-semibold">Abilities</h3>

                <section className="grid grid-cols-2 gap-4 mt-4">
                  {pokemon?.abilities.map((ability) => (
                    <article
                      key={ability.ability.name}
                      className={`p-2 text-black font-bold px-8 border-[1px] border-gray-300 text-center
                      capitalize truncate rounded-md ${
                        backgroundByType[pokemon?.types[0].type.name]
                      } `}
                    >
                      {ability.ability.name}
                    </article>
                  ))}
                </section>
              </section>
            </section>
          </section>

          {/* section of stats */}

          <section>
            <h3>Stats</h3>

            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between">
                    <h5 className="capitalize">{stat.stat.name}</h5>

                    <span>{stat.base_stat}/255</span>
                  </section>

                  <div className="bg-gray-100 h-6 rounded-sm">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className="h-full  bg-gradient-to-r from-yellow-300 to-orange-400"
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
