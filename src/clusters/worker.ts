import chalk from 'chalk';
import cluster from 'node:cluster';
import constants from '../constants';
import { batchUtils, fileUtils, cputils } from '../utils';
import { getPokemonData, makeInitialBatchRequest } from '../api';
//import * as Store from '../store';

import { getValue, setValue, append, deleteRedis } from '../redis';

interface ProcessBatchProps {
  initialBatch: any;
  index: number;
}

const processBatch = async ({ initialBatch, index }: ProcessBatchProps) => {
  const chunkSize = batchUtils.getChunkSize(initialBatch);
  const batch = batchUtils.sliceChunk({ initialBatch, initialIndex: index, chunkSize });
  const promises = await batch.map(async ({ name, url }) => {
    return getPokemonData({ name, url });
  });

  return (await Promise.all(promises)).filter((item) => item);
};

const processSize = (response: any) => {
  const megaBytes = (Buffer.byteLength(JSON.stringify(response)) / Math.pow(1024, 2)).toFixed(5);
  console.log(chalk.magenta(`Response size em MB: ${megaBytes}`));
};

const worker = () => {
  if (cluster.isWorker) {
    process.on('message', async (msg: { index: number; initialBatch: any; length: number }) => {
      const { index, initialBatch } = msg;

      const response = await processBatch({ initialBatch, index });
      await cputils.measurement().then((data) => console.log(chalk.cyanBright(data)));
      //await setValue({ key: constants.key, value: response });
      await append({ key: constants.key, value: response });
      processSize(response);
      //Store.PokemonStore.vanillaPokemonStore.getState().store(response);
      process.exit(0);
    });
  }
};

const triggerWorker = async () => {
  const initialBatch = await makeInitialBatchRequest();

  await deleteRedis({ key: constants.key });
  await setValue({ key: constants.key, value: [] });

  Array.from({ length: constants.numCPUs }).forEach((_, index) => {
    const worker = cluster.fork();
    console.log(chalk.green(`[${worker.process.pid} - ${worker.id}] Worker process started`));
    worker.send({ index, initialBatch });
  });

  process.on('beforeExit', async () => {
    const { response } = (await getValue({ key: constants.key })) as { response: { [key: string]: any } };
    await fileUtils.writeFile(JSON.stringify(response[constants.key]));
    await fileUtils.launchFile(constants.htmlPath);
  });

  process.on('exit', async (code) => {
    console.log(chalk.white(`Process exit event with code: ${code}`));
  });
};

export { worker, triggerWorker };
