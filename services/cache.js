const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const url = 'redis://127.0.0.1:6379';
const client = redis.createClient(url);
client.get = util.promisify(client.get);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    const cached_val =  await client.get(key);
    if (cached_val) {
        const doc = JSON.parse(cached_val);

        return Array.isArray(doc) 
        ? doc.map( d => new this.model(d))
        : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);

    client.set(key, JSON.stringify(result));

    return result;
}
