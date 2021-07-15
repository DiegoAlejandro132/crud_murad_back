module.exports = (sequelize, Sequelize) => {
    const Contato = sequelize.define("contato", {
      nomeContato: {
        type: Sequelize.STRING
      },
      contato: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Contato;
  };