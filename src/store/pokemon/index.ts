import { createStore } from 'zustand/vanilla';
import { pokemonSlice } from './slice';

interface PokemonState {
  pokemons: any;
  store: (by: any) => void;
}

export const vanillaPokemonStore = createStore<PokemonState>(pokemonSlice);
