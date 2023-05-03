import React from "react";
import Footer from "../components/Footer";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setNameTrainer(e.target.nameTrainer.value));
        navigate("/pokedex")
    };
  return (
    
    
    <section className="min-h-screen grid bg-cover bg-no-repeat bg-bottom bg-[url('/images/menu_pokemon.jpg')] grid-rows-[1fr_auto]">
      {/* Header */}
     
      
      <section className="flex flex-col   items-center justify-center gap-4 max-w-[960px] mx-auto px-4">
        <article className="w-full px-12 drop-shadow-3xl ">
          <div>
            <img src="/images/pokedex.png" alt="" className="relative gap-6 md:px-12 sm:w-[900px] w-full py-8 items-center justify-center" />
          </div>
          <h2 className="text-4xl text-red-500 flex font-bold items-center justify-center pb-2 ">¡Hello trainer!</h2>
          <p className="flex justify-center items-center pb-5">Give me your name to start! :</p>
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input id="nameTrainer" type="text" placeholder="Your name ... " className="w-full border border-gray-300 px-2 py-1 focus:outline-none 
            focus:ring-2 focus:ring-red-500" rel="noopener noreferrer" />
            <button className="w-[130px] bg-red-600 text-white px-4 py-2 -ml-4 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500">Start</button>
          </form>
        </article>
      </section>
        <section>
        <footer className="flex gap-2 p-4 justify-center text-white drop-shadow-3xl ">
        <a
          className="text-4xl"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/oscar91511/entregable5"
        >
          <i className="bx bxl-github "></i>
        </a>
        <a
          className="text-4xl"
          target="_blank" // permite abrir en nueva pestaña
          rel="noopener noreferrer" //evita malwares maliciosos al abrir ventanas
          href="https://www.linkedin.com/in/oscar-eduardo-lopez-restrepo-968a91265/"
        >
          <i className="bx bxl-linkedin "></i>
        </a>
        <a
          className="text-4xl"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/oscar915lr/"
        >
          <i className="bx bxl-instagram"></i>
        </a>

        
        
      </footer>
        </section>
      {/*Footer*/} 
      <span className="text-white font-semibold pb-2 flex items-center justify-center">© Todos los derechos reservados 2023 </span>
      <Footer />
    
    </section>
  );
};

export default Home;
