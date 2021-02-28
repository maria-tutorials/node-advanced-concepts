const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const url = 'redis://127.0.0.1:6379';
const client = redis.createClient(url);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
    this._cache = true;
    this._hashKey = JSON.stringify(options.key || 'default');

    return this; // chainable
}

mongoose.Query.prototype.exec = async function () {
    if (!this._cache) {
        return exec.apply(this, arguments);
    }

    const key = JSON.stringify(Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }));

    const cached_val =  await client.hget(this._hashKey, key);
    if (cached_val) {
        const doc = JSON.parse(cached_val);

        return Array.isArray(doc) 
        ? doc.map( d => new this.model(d))
        : new this.model(doc);
    }

    const result = await exec.apply(this, arguments);

    client.hset(this._hashKey, key, JSON.stringify(result), 'EX', 10);

    return result;
}
