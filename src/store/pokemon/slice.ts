export const initialPokemonState = { pokemons: [] };

export const pokemonSlice = (set: any, getState: any) => ({
  ...initialPokemonState,
  store: (by: any) => {
    //Set zustand not working
    set((state: any) => {
      return { pokemons: [...state.pokemons, by][0] };
    });
  },
});
