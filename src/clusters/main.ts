import chalk from 'chalk';
import cluster from 'node:cluster';
import process from 'node:process';
import { triggerWorker } from './worker';

const main = () => {
  if (cluster.isPrimary) {
    console.log(chalk.yellow(`Primary ${process.pid} is running`));
    triggerWorker();
  }
};

export { main };
