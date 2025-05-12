import { useEffect } from "react";
import axios from 'axios' 
import './PokemonList.css';
import { useState } from "react";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){

    const[pokemonList, setPokemonList] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon')

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(pokedexUrl); // this download the list of 20 pokemons
        const pokemonResults = response.data.results; // We get the array of pokemons from the result

        // console.log(response.data);
        // console.log(pokemonResults);

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

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
        setPokemonList(pokeListResult);

        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return(
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(isLoading) ? 'Loading....' : pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>

            <div className="controls">
                <button disabled = {prevUrl == null } onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled = {nextUrl == null } onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;