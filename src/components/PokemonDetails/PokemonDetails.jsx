import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
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


function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);

    const navigate = useNavigate();


    useEffect(() => {
        async function downloadPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon({
                    name: response.data.name,
                    image: response.data.sprites.other?.dream_world?.front_default || response.data.sprites.front_default,
                    weight: response.data.weight,
                    height: response.data.height,
                    types: response.data.types.map((t) => t.type.name),
                    stats: response.data.stats.map((s) => ({
                        name: s.stat.name,
                        value: s.base_stat
                    }))
                });
            } catch (error) {
                console.error("Failed to fetch Pokémon details", error);
            }
        }

        downloadPokemon();
    }, [id]);

    if (!pokemon) return <div>Loading...</div>;

    return (
        <div className="card">
            <button className="close-button" onClick={() => navigate(-1)}>❌</button>
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
        </div>
    );
}

export default PokemonDetails;
