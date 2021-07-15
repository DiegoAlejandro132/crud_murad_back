const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.contato = require("./contato.model.js")(sequelize, Sequelize);
db.inquilino = require("./inquilino.model.js")(sequelize, Sequelize);
db.endereco = require("./endereco.model.js")(sequelize, Sequelize);

module.exports = db;