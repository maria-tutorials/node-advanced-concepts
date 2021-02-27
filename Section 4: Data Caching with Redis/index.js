const redis = require('redis');

const url = 'redis://127.0.0.1:6379';

const client = redis.createClient(url);

client.set('hi', 'there');

client.get('hi', (err, val) => console.log(val));

client.get('hi', console.log);

client.flushall();

client.hset('german', 'blue', 'blau');
client.hset('german', 'red', 'rot');

client.hget('german', 'red', console.log);
client.hget('german', 'blue', console.log);
