const { MongoClient } = require("mongodb");

let dbConnection;
const url =
  "mongodb+srv://shaktihere:2024shakti@cluster0.e1wzge7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = {
  connectionToDb: (cb) => {
    MongoClient.connect(url)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => {
    return dbConnection;
  },
};
