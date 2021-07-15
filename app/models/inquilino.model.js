module.exports = (sequelize, Sequelize) => {
    const Inquilino = sequelize.define("inquilino", {
      nomeInquilino: {
        type: Sequelize.STRING
      },
      cpfInquilino: {
        type: Sequelize.STRING
      },
      dataNascimentoInquilino: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Inquilino;
  };