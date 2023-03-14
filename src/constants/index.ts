import os from 'os';

export default {
  numCPUs: os.cpus().length,
  fileName: 'pokemons.json',
  key: 'pokemons',
  htmlPath: './src/html/index.html',
  PORT: 3000,
  delayTime: 1000,
};
