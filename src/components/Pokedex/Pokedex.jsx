import PokemonDetails from "../PokemonDetails/PokemonDetails";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import './Pokedex.css';
import {useState } from "react";

function Pokedex(){

    const [searchTerm, setSearchTerm] = useState('');


    return(
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading">Pokedex</h1>
            <Search updateSearchTerm={setSearchTerm}/>

            {(!searchTerm.length) ? <PokemonList /> : <PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}  
        </div>
    )
}

export default Pokedex;