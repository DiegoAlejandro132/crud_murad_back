module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
      nomeCliente: {
        type: Sequelize.STRING
      },
      cpfCliente: {
        type: Sequelize.STRING
      },
      dataNascimentoCliente: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Cliente;
  };