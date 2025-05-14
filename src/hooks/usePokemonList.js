import axios from "axios";
import { useEffect, useState } from "react";

export function usePokemonList(){
    // const[pokemonList, setPokemonList] = useState([]);
    // const[isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');


    const [pokemonListState, setPokemonListState] = useState({
        pokemonList : [],
        isLoading : true,
        pokedexUrl : 'https://pokeapi.co/api/v2/pokemon',
        nextUrl : '',
        prevUrl : ''
    });

    async function downloadPokemons(){
        // setIsLoading(true);
        setPokemonListState((state) => ({...state, isLoading : true}));
        const response = await axios.get(pokemonListState.pokedexUrl); // this download the list of 20 pokemons
        const pokemonResults = response.data.results; // We get the array of pokemons from the result

        // console.log(response.data);
        // console.log(pokemonResults);

        setPokemonListState((state) => ({
            ...state, 
            nextUrl : response.data.next, 
            prevUrl : response.data.previous
        }));

        // iterating over the array of pokemons, and using their url, to create an array of promises 
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        //passing that promise to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        console.log(pokemonData);

        //now iterating on the data of each pokemon, and extract id, name, image, types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                 id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.front_default,
                    types: pokemon.types,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    abilities: pokemon.abilities,
                    baseStats: pokemon.stats,
                    baseExperience: pokemon.base_experience,
                }
        });
        // console.log(pokeListResult);
        setPokemonListState((state) => ({
            ...state,
            pokemonList : pokeListResult, 
            isLoading : false
        }));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    return [pokemonListState, setPokemonListState];
}
