import './PokemonCard.css'

function PokemonCard({name, type, image, onClick}){
  const types = type.includes('/') ? type.split('/') : [type]
  const button = types.map((t) => <p className={`type-${t.toLowerCase()}`} > {t} </p>)

  return(
    <div onClick={onClick}>
      <h2>{name}</h2>
      <img src={image} alt={name} />
      { button }
    </div>
  )
}

export default PokemonCard;


