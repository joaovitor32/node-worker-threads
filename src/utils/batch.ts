import constants from '../constants';

interface BatchInterface {
  name: string;
  url: string;
}

interface SliceChunkProps {
  initialBatch: any;
  chunkSize: number;
  initialIndex: number;
}

const getChunkSize = (initialBatch: any) => {
  return Math.floor((initialBatch.length - 1) / constants.numCPUs);
};

const sliceChunk = ({ initialBatch, chunkSize, initialIndex }: SliceChunkProps) => {
  return initialBatch.slice(chunkSize * initialIndex, chunkSize * (initialIndex + 1)) as BatchInterface[];
};

export { getChunkSize, sliceChunk };
