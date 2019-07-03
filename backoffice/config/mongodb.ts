export default {
 "url": "mongodb://uai:food@localhost:27017/uaifood?authSource=admin",
 "opts": {
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    socketTimeoutMS: 30000,
    poolSize: 50,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    autoReconnect: false,
  }
}