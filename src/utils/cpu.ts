import os from 'os';
import constants from '../constants';
import { sleep } from './promisify';

type TimeType = 'user' | 'nice' | 'sys' | 'irq';

const delta = () => {
  const cpus = os.cpus();

  return cpus.map((cpu) => {
    const times = cpu.times;
    return {
      tick: Object.keys(times)
        .filter((time) => time !== 'idle')
        .reduce((tick, time) => {
          tick += times[time as TimeType];
          return tick;
        }, 0),
      idle: times.idle,
    };
  });
};

const measurement = async () => {
  const startMeasures = delta();

  await sleep(constants.delayTime);

  const endMeasures = delta();
  const percentageCPU = endMeasures.map((end, i) => {
    return `CPU ${i}: ${(((end.tick - startMeasures[i].tick) / (end.idle - startMeasures[i].idle)) * 100).toFixed(
      2
    )}% \n`;
  });

  return percentageCPU.join('');
};
export { measurement };
