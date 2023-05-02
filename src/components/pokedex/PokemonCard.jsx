import axios from "axios"
import React, { useEffect, useState } from "react"


const bordersByType = {
  grass: "border-green-600/40",
  fire: "border-orange-600/90",
  water: "border-blue-500/90",
  bug: "border-lime-700/70 to-lime-700/80",
  normal: "border-normal",
  
}

const backgroundByType = {
  grass: "bg-gradient-to-b from-cyan-400/70  to-lime-200/60",
  fire: "bg-gradient-to-b from-red-500 to-orange-400",
  water: "bg-gradient-to-b from-blue-600 to-cyan-600",
  bug: "bg-gradient-to-b from-lime-700/80 to-lime-500/70",
  normal: "bg-gradient-to-b from-normal to-pink-950/70",
}

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


const PokemonCard = ({pokemonUrl}) => {
  const [pokemon, setPokemon ] = useState()

  const types = pokemon?.types.slice(0, 2).map(type => type.type.
  name).join(" / ")

  useEffect(() => {
    axios.get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
    
  }, [])
  

  return (
    <article className={`text-center border-8 rounded-[14px] shadow-xl ${bordersByType[pokemon?.types[0].type.name]}`}>

      {/* Header */}

      <section className={`rounded-t-[5px] relative h-[150px] ${backgroundByType[pokemon?.types[0].type.name] } `}>
        <div className="absolute  w-[200px] -bottom-15 left-1/2 -translate-x-1/2">
          <img src={pokemon?.sprites.other["official-artwork"].
          front_default} alt="" />
        </div>
      </section>

      {/* Footer */}

      <section>
      <h3 className={`mt-12 capitalize font-bold ${nameColorByType[pokemon?.types[0].type.name]}`}>
        {pokemon?.name}
        </h3>

        <h4 className="capitalize font-semibold text-sm">{types}</h4>
        <span className="py-2 text-gray-400 text-xs ">Type</span>
        

        <hr />
      
        <section className="grid grid-cols-3 gap-2 p-2  ">
          {
            pokemon?.stats.map(stat => (
             <div key={stat.stat.name}>
              <h5 className="uppercase text-gray-400 font-semibold text-xs">{stat.stat.name}</h5>
              <span className={`font-semibold ${SkillColorByType[pokemon?.types[0].type.name]}`}>{stat.base_stat}</span>
             </div>
            ))
          }
        </section>
      </section>

    </article>
  )
}

export default PokemonCard