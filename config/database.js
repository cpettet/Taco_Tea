const {
  db: { username, password, database, host },
} = require("./index");
console.log(username, password, database, host);
module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};
