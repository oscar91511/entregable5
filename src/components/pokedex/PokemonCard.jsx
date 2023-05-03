import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  grass: "border-green-600/40",
  fire: "border-orange-600/90",
  water: "border-blue-500/90",
  bug: "border-lime-700/70 to-lime-700/80",
  normal: "border-normal",
  fighting: "border-red-900/80",
  flying: "border-teal-900/80 ",
  poison: "border-purple-800/80 ",
  ground: "border-yellow-900 ",
  rock: "border-stone-600/90 ",
  ghost: "border-blue-900/90",
  steel: "border-blue-800/90",
  electric: "border-yellow-500",
  psychic: "border-yellow-600/80",
  ice: "border-sky-400/90",
  dragon: "border-teal-700/70",
  dark: "border-black/90",
  fairy: " border-red-400/80 ",
  unknown: "",
  shadow: "",
};

const backgroundByType = {
  grass: "bg-gradient-to-b from-cyan-400/70  to-lime-200/60",
  fire: "bg-gradient-to-b from-red-500 to-orange-400",
  water: "bg-gradient-to-b from-blue-600 to-cyan-600",
  bug: "bg-gradient-to-b from-lime-700/80 to-lime-500/70",
  normal: "bg-gradient-to-b from-normal to-pink-950/50",
  fighting: "bg-gradient-to-b from-red-800 to-red-800/80",
  flying: "bg-gradient-to-b from-teal-900/80 to-teal-900/60",
  poison: "bg-gradient-to-b from-purple-600 to-purple-400",
  ground: "bg-gradient-to-b from-yellow-900 to-yellow-800/90",
  rock: "bg-gradient-to-b from-stone-500 to-stone-400",
  ghost: "bg-gradient-to-b from-blue-800 to-indigo-900/90",
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
  normal: "text-normal",
  fighting: "text-red-800",
  flying: "text-teal-900/80",
  poison: "text-purple-600 ",
  ground: "text-yellow-900",
  rock: "text-stone-500 ",
  ghost: "text-blue-800",
  steel: "text-blue-800 ",
  electric: "text-yellow-400",
  psychic: "text-yellow-600/80",
  ice: "text-sky-400",
  dragon: "text-teal-900/80",
  dark: "text-black/90",
  fairy: "text-red-400/80",
  unknown: "",
  shadow: "",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState();

  const types = pokemon?.types
    .slice(0, 2)
    .map((type) => type.type.name)
    .join(" / ");

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link
      to={`/pokedex/${pokemon?.id}`}
      className={`text-center border-8 rounded-[16px] drop-shadow-3xl bg-white ${
        bordersByType[pokemon?.types[0].type.name]
      }`}
    >
      {/* Header */}

      <section
        className={`rounded-t-[5px] relative h-[150px] ${
          backgroundByType[pokemon?.types[0].type.name]
        } `}
      >
        <div className="absolute w-[200px] -bottom-15 left-1/2 -translate-x-1/2 first-letter">
          <img
            className="pokemon-image hover:animate-waving-hand"
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
          />
        </div>
      </section>

      {/* Footer */}

      <section>
        <h3
          className={`mt-12 capitalize font-bold ${
            nameColorByType[pokemon?.types[0].type.name]
          }`}
        >
          {pokemon?.name}
        </h3>

        <h4 className="capitalize font-semibold text-sm">{types}</h4>
        <span className="py-2 text-gray-400 text-xs ">Type</span>

        <hr />

        <section className="grid grid-cols-3 gap-2 p-2  ">
          {pokemon?.stats.map((stat) => (
            <div key={stat.stat.name}>
              <h5 className="uppercase text-gray-400 font-semibold text-xs ">
                {stat.stat.name}
              </h5>
              <span
                className={`font-semibold  ${
                  SkillColorByType[pokemon?.types[0].type.name]
                }`}
              >
                {stat.base_stat}
              </span>
            </div>
          ))}
        </section>
      </section>
    </Link>
  );
};

export default PokemonCard;
