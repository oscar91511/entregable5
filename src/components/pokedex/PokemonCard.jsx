import axios from "axios"
import React, { useEffect, useState } from "react"


const bordersByType = {
  grass: "border-green-600/40",
  fire: "border-red-500",
}

const backgroundByType = {
  grass: "bg-gradient-to-b from-cyan-400/70  to-lime-200/60",
  fire: "border-red-500",
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
    <article className={`text-center border-8 rounded-xl ${bordersByType[pokemon?.types[0].type.name]}`}>

      {/* Header */}

      <section className={`rounded-t-[5px] relative h-[150px] ${backgroundByType[pokemon?.types[0].type.name] } `}>
        <div className="absolute  w-[200px] -bottom-15 left-1/2 -translate-x-1/2">
          <img src={pokemon?.sprites.other["official-artwork"].
          front_default} alt="" />
        </div>
      </section>

      {/* Footer */}

      <section>
        <h3 className=" text-gray-600 mt-12 capitalize font-bold">{pokemon?.name}</h3>
        <h4 className="capitalize font-bold text-sm">{types}</h4>
        <span className="py-2 text-gray-400 text-xs  ">Type</span>
        

        <hr />
      
        <section className="grid grid-cols-3 gap-2 p-2  ">
          {
            pokemon?.stats.map(stat => (
             <div key={stat.stat.name}>
              <h5 className="uppercase text-gray-400 font-bold text-xs">{stat.stat.name}</h5>
              <span className=" text-black/70 font-bold">{stat.base_stat}</span>
             </div>
            ))
          }
        </section>
      </section>

    </article>
  )
}

export default PokemonCard