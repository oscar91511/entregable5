import { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  useEffect(() => {
    const URL = `https:://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section>
      <Header />

      <section className="px-2 py-10">
        <article>
          {/* Everything else */}

          {/* section of stats */}

          <section>
            <h3>Stats</h3>

            <section>
            {
                pokemon.stat.map(stat => (
                    <article>
                        <section>
                            <h5>{stat.stat.name}</h5>

                            <span>{stat.base_stat}/150</span>

                            <div></div>
                        </section>
                    </article>
                ))
            }
            </section>
          </section>
        </article>
      </section>
    </section>
  );
};

export default PokemonId;
