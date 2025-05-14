import { usePokemonList} from "../../hooks/usePokemonList";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList({ searchTerm = '' }) {
    const [pokemonListState, setPokemonListState] = usePokemonList();

    // Filter list if searchTerm is passed
    const filteredList = pokemonListState.pokemonList.filter((p) =>
        p.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? 'Loading....' :
                    filteredList.length === 0 ? (
                        <p className="no-results">No related Pokemon found for <span className="search-term">'{searchTerm}'</span> on this page. Please try on different page.</p>
                    ) : (
                        filteredList.map((p) => (
                            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                        ))
                    )
                }
            </div>

                <div className="controls">
                    <button
                        disabled={pokemonListState.prevUrl == null || pokemonListState.isLoading}
                        onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.prevUrl })}
                    >
                        Prev
                    </button>

                    <button
                        disabled={pokemonListState.nextUrl == null || pokemonListState.isLoading}
                        onClick={() => setPokemonListState({ ...pokemonListState, pokedexUrl: pokemonListState.nextUrl })}
                    >
                        Next
                    </button>
                </div>
        </div>
    );
}


export default PokemonList;