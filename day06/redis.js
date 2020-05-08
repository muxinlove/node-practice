const redis = require('redis')
const client = redis.createClient(6379, 'localhost')

client.set('hello', 'this is a value')
client.get('hello', (err, v) => {
  console.log('get v', v);
})