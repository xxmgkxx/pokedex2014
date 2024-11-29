// # https://github.com/xxmgkxx/pokedex2014

import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon)
  }
// https://github.com/xxmgkxx/pokedex2014

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
    .then((data) => { setPokemonList (data.results)})
    .catch((error) => console.error("Erro ao buscar os dados", error));
  }, [])
  return(
    <div>
      {selectedPokemon ? (
        <div>
          <h2>Detalhes do Pokemon</h2>
          <PokemonCard
            name={selectedPokemon.name}
            image={selectedPokemon.image}
            type={selectedPokemon.type}
          />
          
          <button onClick={() => setSelectedPokemon(null)}>
           Voltar </button>
        </div>
      ) : (
        <>
        <div className="pokemon-list">
            {currentPokemonList.map((pokemon, index) => (
                <PokemonCard
                  key={index}
                  name={pokemon.name}
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${((currentPage-1)*itemsPerPage) + index + 1 }.png`}
                  type="Desconhecido"
                  />
            ))}
        </div>
        <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === totalPages}>Anterior</button>
            <span>Página {currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Próxima</button>
        </div>
        </>
      ) }

</div>
      
  )
}

export default PokemonList;