# An study about worker threads, parallelism, concurrency and clusters.

### How to run

```
npm i
docker run -p 6379:6379 -it redis/redis-stack-server:latest
npm run start
explorer "http://localhost:3000"
```

### Links

```
I - https://nodejs.org/api/cluster.html
II - https://stackoverflow.com/questions/35532202/how-to-send-a-http-request-to-specified-worker-in-nodejs-cluster-and-do-somethin
III - https://stackoverflow.com/questions/63724844/is-parallelization-of-network-requests-a-good-use-for-node-js-workers
IV - https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html (Good reference)
V - https://www.digitalocean.com/community/tutorials/how-to-use-multithreading-in-node-js
VI - https://nodejs.org/api/worker_threads.html
VII - https://stackoverflow.com/questions/31096309/manipulating-elements-of-an-array-in-parallel-using-node-js
VIII - https://www.arubacloud.com/tutorial/how-to-use-cluster-to-increase-node-js-performance.aspx#:~:text=The%20cluster%20is%20a%20collection,instead%2C%20that%20of%20controlling%20them.

```