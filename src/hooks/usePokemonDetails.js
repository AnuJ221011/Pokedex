import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonDetails(id, pokemonName) {

    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemon() {
        try {
            let response;
            if(pokemonName){
                // console.log('fetching by name');
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            } else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }

            const pokemonOfSimilarTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`);

            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other?.dream_world?.front_default || response.data.sprites.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name),
                similarPolemons : pokemonOfSimilarTypes.data.pokemon,
                stats: response.data.stats.map((s) => ({
                    name: s.stat.name,
                    value: s.base_stat
                }))
            });
            setPokemonListState({...pokemonListState, type: response.data.types ? response.data.types[0].type.name : '' })
            setIsLoading(false);
        } catch (error) {
            console.log("Failed to fetch Pokémon details", error);
            setIsLoading(false);
        }
    }
    const [pokemonListState, setPokemonListState] = useState({});

    
    useEffect(() => {
        downloadPokemon();
    }, [id]);

    return [pokemon, isLoading];
}

export default usePokemonDetails;