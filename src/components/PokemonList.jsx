import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";


function PokemonList() {
 const [selectedPokemon, setSelectedPokemon] = useState(null);
 const [isLoading, setIsLoading] = useState(false);


 const handleCardClick = (pokemon) => {
   setIsLoading(true);
   setTimeout(function(){
    fetch(pokemon.url)
     .then((response) => response.json())
     .then((data) => {
       setSelectedPokemon(data);
       setIsLoading(false);
     })
     .catch((error) => {
       console.error("Erro ao buscar os detalhes do Pokémon", error);
       setIsLoading(false);
     });
  }, 2000);
 };


 const [pokemonList, setPokemonList] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 20;


 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;


 const currentPokemonList = pokemonList.slice(
   indexOfFirstItem,
   indexOfLastItem
 );


 const totalPages = Math.ceil(pokemonList.length / itemsPerPage);


 useEffect(() => {
   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
     .then((response) => response.json())
     .then((data) => {
       setPokemonList(data.results);
     })
     .catch((error) => console.error("Erro ao buscar os dados", error));
 }, []);


 return (
   <div>
     {isLoading ? (
       <p>Carregando detalhes do Pokémon...</p>
     ) : selectedPokemon ? (
       <div>
         <h2>Detalhes do Pokémon</h2>
         <PokemonCard
           name={selectedPokemon.name}
           image={selectedPokemon.sprites.front_default}
           types={selectedPokemon.types.map((typeInfo) => typeInfo.type.name)}
           abilities={selectedPokemon.abilities.map((abilityInfo) => abilityInfo.ability.name)}
           stats={selectedPokemon.stats.map((statInfo) => ({
             name: statInfo.stat.name,
             value: statInfo.base_stat,
           }))}
           height={selectedPokemon.height}
           weight={selectedPokemon.weight}
         />
         <button onClick={() => setSelectedPokemon(null)}>Voltar</button>
       </div>
     ) : (
       <>
         <div className="pokemon-list">
           {currentPokemonList.map((pokemon, index) => (
             <PokemonCard
               key={index}
               name={pokemon.name}
               image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${((currentPage - 1) * itemsPerPage) + index + 1}.png`}
               type="Desconhecido"
               onClick={() => handleCardClick(pokemon)}
             />
           ))}
         </div>
         <div className="pagination">
           <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
           <span>Página {currentPage}</span>
           <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Próxima</button>
         </div>
       </>
     )}
   </div>
 );
}


export default PokemonList;
