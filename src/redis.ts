import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

interface ValueProps {
  key: string;
  value?: any;
}

const deleteRedis = async ({ key }: ValueProps) => {
  await client.connect();

  await client.del(`noderedis:${key}`);

  await client.quit();
};

const setValue = async ({ key, value }: ValueProps) => {
  await client.connect();

  await client.json.set(`noderedis:${key}`, '$', {
    [key]: value,
  });

  await client.quit();
};

const getValue = async ({ key }: ValueProps) => {
  await client.connect();

  const response = await client.json.get(`noderedis:${key}`);

  await client.quit();
  return { response };
};

const append = async ({ key, value }: ValueProps) => {
  await client.connect();
  const promises = value.map(async (element: any, index: number) => {
    return client.json.arrAppend(`noderedis:${key}`, `$.${key}`, element);
  });

  await Promise.all(promises).then(async () => await client.quit());
};

export { getValue, setValue, append, deleteRedis };
