import './PokemonCard.css';


function PokemonCard({ name, type, image, types, abilities, stats, height, weight, onClick }) {
 const typeList = types ? types : (type ? (type.includes('/') ? type.split('/') : [type]) : []);
 const typeElements = typeList.map((t) => (
   <p key={t} className={`type-${t.toLowerCase()}`}>{t}</p>
 ));


 return (
   <div onClick={onClick}>
     <h2>{name}</h2>
     <img src={image} alt={name} />
     {typeElements}
     {height && <p>Altura: {height / 10} m</p>}
     {weight && <p>Peso: {weight / 10} kg</p>}
     {abilities && (
       <div>
         <h3>Habilidades:</h3>
         <ul>
           {abilities.map((ability) => (
             <li key={ability}>{ability}</li>
           ))}
         </ul>
       </div>
     )}
     {stats && (
       <div>
         <h3>Estatísticas:</h3>
         <ul>
           {stats.map((stat) => (
             <li key={stat.name}>
               {stat.name}: {stat.value}
             </li>
           ))}
         </ul>
       </div>
     )}
   </div>
 );
}


export default PokemonCard;