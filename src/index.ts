import * as clusters from './clusters';

const splitLoad = () => {
  clusters.main();
  clusters.worker();
};

splitLoad();
