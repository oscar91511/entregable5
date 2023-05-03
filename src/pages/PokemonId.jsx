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
    normal: "bg-gradient-to-b from-normal to-pink-950/70",
  };

  const nameColorByType = {
    grass: "text-green-600",
    fire: "text-orange-600",
    bug: "text-green-700/80",
    water: "text-blue-600",
    electric: "text-yellow-600",
    normal: " text-normal ",
    
  }
  
  const SkillColorByType = {
    grass: "text-green-600",
    fire: "text-orange-600",
    bug: "text-green-700/80",
    water: "text-blue-600",
    electric: "text-yellow-600",
    normal: "text-normal",
  }

  return (
    <section>
      <Header />

      <section className=" px-20 md:px-[400px] py-28  gap-6  grid-col-[repeat(auto-fill,_minmax(200px,_360px))] justify-center">
       
        <article className="max-w-[900px] mx-auto">
          {/* section superior */}

          <section
            className={`rounded-t-[5px] relative h-[80px]  ${
              backgroundByType[pokemon?.types[0].type.name]
            } `}
          >
            <div className="flex justify-center items-center h-full">
              <img
                className="absoluten grid-col-[repeat(auto-fill,_minmax(250px,_360px))] justify-center -translate-y-10 sm:px-[60px] w-[45%]"
                src={
                  pokemon?.sprites.versions["generation-v"]["black-white"]
                    .animated.front_default
                }
                alt=""
              />
            </div>
          </section>

          {/* info General */}

          <section>
            <div>
              <h3>#{pokemon?.id}</h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2 className={` capitalize font-bold ${nameColorByType[pokemon?.types[0].type.name]}`}>{pokemon?.name}</h2>
              <hr />
            </div>

              <div className="flex justify-center gap-6 text-center">
                <div>
                  <div>
                    <h5>Weigth</h5>
                    <span className={`font-semibold  ${SkillColorByType[pokemon?.types[0].type.name]}`}>{pokemon?.weight}</span>
                  </div>
                </div>

                <div>
                  <div>
                    <h5>Height</h5>
                    <span className={`font-semibold  ${SkillColorByType[pokemon?.types[0].type.name]}`}>{pokemon?.height}</span>
                  </div>
                </div>
              </div>


              <section className="grid md:grid-cols-2 gap-4" >
                  {/* types */}

                <section className="text-center">

                  <h3>Types</h3>

                  <section  className="grid grid-cols-2 gap-4 mt-4">
                    {
                      pokemon?.types.map( type =>  <article key={type.type.name} className="p-2
                       px-8 border-[1px] border-gray-300 text-center
                        capitalize">{type.type.name}</article>)
                    }
                  </section>

                </section>

                  {/* abilityes */}

                <section className="text-center">

                  <h3>Abilities</h3>

                  <section  className="grid grid-cols-2 gap-4 mt-4">
                    {
                      pokemon?.abilities.map(ability => <article key={ability.ability.name}
                      className="p-2 px-8 border-[1px] border-gray-300 text-center
                      capitalize">{ability.ability.name}</article>)
                    }
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
