import axios from "axios"
import React, { useEffect, useState } from "react"


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
    <article className="text-center border-8 rounded-xl border-green-600/40 ">

      {/* Header */}

      <section className="bg-gradient-to-b from-cyan-400/70  to-lime-200/60 rounded-t-[5px]">
        <div>
          <img src={pokemon?.sprites.other["official-artwork"].
          front_default} alt="" />
        </div>
      </section>

      {/* Footer */}

      <section>
        <h3>{pokemon?.name}</h3>
        <h4>{types}</h4>
        <span>Type</span>

        <hr />

        <section className="grid grid-cols-3 gap-2 p-2 ">
          {
            pokemon?.stats.map(stat => (
             <div key={stat.stat.name}>
              <h5>{stat.stat.name}</h5>
              <span>{stat.base_stat}</span>
             </div>
            ))
          }
        </section>
      </section>

    </article>
  )
}

export default PokemonCard