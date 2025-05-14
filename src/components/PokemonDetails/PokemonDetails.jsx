import { useParams } from 'react-router-dom';
import usePokemonDetails from "../../hooks/usePokemonDetails";
import './PokemonDetails.css';
import {useNavigate } from 'react-router-dom';



function getStatColor(value) {
    if (value <= 20) return 'red';
    if (value <= 60) return 'yellow';
    return 'green';
}

function getStatIcon(statName) {
    const icons = {
        hp: '❤️',
        attack: '⚔️',
        defense: '🛡️',
        'special-attack': '🔥',
        'special-defense': '🔮',
        speed: '💨'
    };
    return icons[statName];
}


function PokemonDetails({pokemonName}) {
    const { id } = useParams();
    const [pokemon, isLoading] = usePokemonDetails(id, pokemonName);

    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/', { replace: true });
    };

    if (isLoading || !pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <button className="close-button" onClick={handleClose}>❌</button>
            <img className="pokemon-img" src={pokemon.image} alt={pokemon.name} />
            <h2 className="pokemon-name">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>

            <div className="info-row">
                <div className='height'>
                    <p className='value'>{(pokemon.height / 10).toFixed(1)} M</p>
                    <p><span>📏</span>Altura</p>
                </div>
                <div className='weight'>
                    <p className='value'>{(pokemon.weight / 10).toFixed(1)} Kg</p>
                    <p> <span>⚖️</span>Peso</p>
                </div>
            </div>

            <div className="types">
                {pokemon.types.map((type) => (
                    <span className={`type-badge type-${type}`} key={type}>{type}</span>
                ))}
            </div>

            <div className="stats">
                {pokemon.stats.map(stat => (
                    <div className="stat" key={stat.name}>
                        <span className="stat-icon">{getStatIcon(stat.name)}</span>
                        {/* <span className="stat-name">{stat.name}</span> */}
                        <div className="stat-bar">
                            <div className="stat-fill" style={{ width: `${stat.value *2}px`, backgroundColor: getStatColor(stat.value) }}>
                                {stat.value}
                                <span className="stat-name-tooltip">{stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {
                pokemon.types && pokemon.similarPokemons && 
                <div>
                    more {pokemon.types[0]} type pokemons

                    <ul>
                        {pokemon.similarPokemons.map((p) => <li key={p.pokemon.url}>{p.pokemon.name}</li>)}

                    </ul>
                </div>
            }

        </div>
    );
}

export default PokemonDetails;
