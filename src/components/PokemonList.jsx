import { useState } from "react";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon)
  }

    <div>
      <input type="text" onChange={handlePokemonNameInput()}/>
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
        <PokemonCard
          name="Bulbasaur"
          image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
          type="Grass/Poison"
          onClick={() => handleCardClick({
            name: 'Bulbasaur',
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            type: "Grass/Poison"
          })}
      />
      <PokemonCard
          name="Pikachu"
          image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          type="Electric"
          onClick={() => handleCardClick({
            name: 'Pikachu',
            image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            type: "Eletric"
          })}
      />
    </>
      ) }

</div>
      
  )
}

export default PokemonList;