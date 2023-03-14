import axios from 'axios';
import http from 'http';

const pokemonURL = 'https://pokeapi.co/api/v2/pokemon?limit=20000';

interface PokemonDataProps {
  name: string;
  url: string;
}

const makeInitialBatchRequest = async () => {
  try {
    const { data } = await axios.get(pokemonURL);
    return data.results;
  } catch (err) {
    return err;
  }
};

/**
 * Problems - Axios fails with multiple requests
 * I - cause: Error: read ECONNRESET
 * II - cause: Error: connect ETIMEDOUT 104.21.8.30:443
 * */
const getPokemonData = async ({ name, url }: PokemonDataProps) => {
  try {
    const { data } = await axios({
      method: 'get',
      url,
      timeout: 160000,
      headers: { 'Content-Type': 'application/json' },
    });

    const { height, weight, location_area_encounters, sprites } = data;

    return { name, height, weight, location_area_encounters, images: sprites['front_default'] };
  } catch (err: any) {
    return;
  }
};

export { makeInitialBatchRequest, getPokemonData };
